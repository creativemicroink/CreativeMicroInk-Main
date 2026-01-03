import { Router, Request, Response } from 'express';
import multer from 'multer';
import { query } from '../db/connection';
import { verifyToken, optionalAuth, AuthenticatedRequest } from '../middleware/auth';
import { uploadImage, deleteImage, extractPublicId } from '../utils/cloudinary';

const router = Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Gallery image interface for database results
interface GalleryImageRow {
  id: number;
  image_url: string;
  thumbnail_url: string | null;
  caption: string | null;
  category: string | null;
  display_order: number;
  created_at: Date;
}

/**
 * GET /api/gallery
 * Get all gallery images (public)
 */
router.get('/', optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { category, limit, offset } = req.query;

    let queryText = 'SELECT * FROM gallery_images';
    const params: unknown[] = [];
    const conditions: string[] = [];

    // Filter by category
    if (category) {
      params.push(category);
      conditions.push(`category = $${params.length}`);
    }

    if (conditions.length > 0) {
      queryText += ' WHERE ' + conditions.join(' AND ');
    }

    queryText += ' ORDER BY display_order ASC, created_at DESC';

    // Pagination
    if (limit) {
      params.push(parseInt(limit as string, 10));
      queryText += ` LIMIT $${params.length}`;
    }

    if (offset) {
      params.push(parseInt(offset as string, 10));
      queryText += ` OFFSET $${params.length}`;
    }

    const result = await query<GalleryImageRow>(queryText, params);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM gallery_images';
    if (category) {
      countQuery += ' WHERE category = $1';
    }
    const countResult = await query<{ total: string }>(
      countQuery,
      category ? [category] : []
    );

    res.json({
      images: result.rows,
      count: result.rows.length,
      total: parseInt(countResult.rows[0].total, 10),
    });
  } catch (error) {
    console.error('Get gallery images error:', error);
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

/**
 * GET /api/gallery/categories
 * Get all unique gallery categories
 */
router.get('/categories', async (_req: Request, res: Response) => {
  try {
    const result = await query<{ category: string }>(
      'SELECT DISTINCT category FROM gallery_images WHERE category IS NOT NULL ORDER BY category ASC'
    );

    res.json({
      categories: result.rows.map((row) => row.category),
    });
  } catch (error) {
    console.error('Get gallery categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

/**
 * GET /api/gallery/:id
 * Get a single gallery image by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query<GalleryImageRow>(
      'SELECT * FROM gallery_images WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Gallery image not found' });
      return;
    }

    res.json({ image: result.rows[0] });
  } catch (error) {
    console.error('Get gallery image error:', error);
    res.status(500).json({ error: 'Failed to fetch gallery image' });
  }
});

/**
 * POST /api/gallery
 * Upload a new gallery image (admin only)
 */
router.post(
  '/',
  verifyToken,
  upload.single('image'),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { caption, category, display_order } = req.body;
      const file = req.file;

      if (!file) {
        res.status(400).json({ error: 'Image file is required' });
        return;
      }

      // Upload to Cloudinary
      const uploadResult = await uploadImage(file.buffer, {
        folder: 'creative-micro/gallery',
        tags: category ? [category] : undefined,
      });

      // Save to database
      const result = await query<GalleryImageRow>(
        `INSERT INTO gallery_images (image_url, thumbnail_url, caption, category, display_order, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         RETURNING *`,
        [
          uploadResult.secureUrl,
          uploadResult.thumbnailUrl || null,
          caption || null,
          category || null,
          display_order || 0,
        ]
      );

      res.status(201).json({
        message: 'Image uploaded successfully',
        image: result.rows[0],
      });
    } catch (error) {
      console.error('Upload gallery image error:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  }
);

/**
 * POST /api/gallery/bulk
 * Upload multiple gallery images (admin only)
 */
router.post(
  '/bulk',
  verifyToken,
  upload.array('images', 10),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { category } = req.body;
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        res.status(400).json({ error: 'At least one image file is required' });
        return;
      }

      const uploadedImages: GalleryImageRow[] = [];

      for (const file of files) {
        // Upload to Cloudinary
        const uploadResult = await uploadImage(file.buffer, {
          folder: 'creative-micro/gallery',
          tags: category ? [category] : undefined,
        });

        // Save to database
        const result = await query<GalleryImageRow>(
          `INSERT INTO gallery_images (image_url, thumbnail_url, caption, category, display_order, created_at)
           VALUES ($1, $2, $3, $4, $5, NOW())
           RETURNING *`,
          [
            uploadResult.secureUrl,
            uploadResult.thumbnailUrl || null,
            null,
            category || null,
            0,
          ]
        );

        uploadedImages.push(result.rows[0]);
      }

      res.status(201).json({
        message: `${uploadedImages.length} images uploaded successfully`,
        images: uploadedImages,
      });
    } catch (error) {
      console.error('Bulk upload gallery images error:', error);
      res.status(500).json({ error: 'Failed to upload images' });
    }
  }
);

/**
 * PUT /api/gallery/:id
 * Update a gallery image (admin only)
 */
router.put('/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { caption, category, display_order } = req.body;

    // Check if image exists
    const existing = await query<GalleryImageRow>(
      'SELECT id FROM gallery_images WHERE id = $1',
      [id]
    );

    if (existing.rows.length === 0) {
      res.status(404).json({ error: 'Gallery image not found' });
      return;
    }

    const result = await query<GalleryImageRow>(
      `UPDATE gallery_images SET
        caption = COALESCE($1, caption),
        category = COALESCE($2, category),
        display_order = COALESCE($3, display_order)
      WHERE id = $4
      RETURNING *`,
      [caption, category, display_order, id]
    );

    res.json({
      message: 'Gallery image updated successfully',
      image: result.rows[0],
    });
  } catch (error) {
    console.error('Update gallery image error:', error);
    res.status(500).json({ error: 'Failed to update gallery image' });
  }
});

/**
 * DELETE /api/gallery/:id
 * Delete a gallery image (admin only)
 */
router.delete('/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Get image to delete from Cloudinary
    const existing = await query<GalleryImageRow>(
      'SELECT * FROM gallery_images WHERE id = $1',
      [id]
    );

    if (existing.rows.length === 0) {
      res.status(404).json({ error: 'Gallery image not found' });
      return;
    }

    const image = existing.rows[0];

    // Delete from Cloudinary
    const publicId = extractPublicId(image.image_url);
    if (publicId) {
      try {
        await deleteImage(publicId);
      } catch (cloudinaryError) {
        console.error('Failed to delete from Cloudinary:', cloudinaryError);
        // Continue with database deletion even if Cloudinary fails
      }
    }

    // Delete from database
    await query('DELETE FROM gallery_images WHERE id = $1', [id]);

    res.json({ message: 'Gallery image deleted successfully' });
  } catch (error) {
    console.error('Delete gallery image error:', error);
    res.status(500).json({ error: 'Failed to delete gallery image' });
  }
});

/**
 * PATCH /api/gallery/reorder
 * Update display order for multiple images (admin only)
 */
router.patch('/reorder', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { orders } = req.body;

    if (!Array.isArray(orders)) {
      res.status(400).json({ error: 'Orders must be an array' });
      return;
    }

    // Update each image's display order
    const updatePromises = orders.map(
      (item: { id: number; display_order: number }) =>
        query('UPDATE gallery_images SET display_order = $1 WHERE id = $2', [
          item.display_order,
          item.id,
        ])
    );

    await Promise.all(updatePromises);

    res.json({ message: 'Gallery images reordered successfully' });
  } catch (error) {
    console.error('Reorder gallery images error:', error);
    res.status(500).json({ error: 'Failed to reorder images' });
  }
});

export default router;
