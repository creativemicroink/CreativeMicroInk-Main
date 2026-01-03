import { Router, Request, Response } from 'express';
import { query } from '../db/connection';
import { verifyToken, optionalAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Service interface for database results
interface ServiceRow {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  touch_up_price: number | null;
  duration: string | null;
  category: string | null;
  image_url: string | null;
  booking_url: string | null;
  display_order: number;
  is_active: boolean;
}

/**
 * GET /api/services
 * Get all services (public - returns only active services)
 * Admin gets all services
 */
router.get('/', optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const isAdmin = !!req.user;
    const { category, active } = req.query;

    let queryText = 'SELECT * FROM services';
    const params: unknown[] = [];
    const conditions: string[] = [];

    // Filter by active status (public only sees active, admin can filter)
    if (!isAdmin) {
      conditions.push('is_active = true');
    } else if (active !== undefined) {
      params.push(active === 'true');
      conditions.push(`is_active = $${params.length}`);
    }

    // Filter by category
    if (category) {
      params.push(category);
      conditions.push(`category = $${params.length}`);
    }

    if (conditions.length > 0) {
      queryText += ' WHERE ' + conditions.join(' AND ');
    }

    queryText += ' ORDER BY display_order ASC, name ASC';

    const result = await query<ServiceRow>(queryText, params);

    res.json({
      services: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

/**
 * GET /api/services/categories
 * Get all unique service categories
 */
router.get('/categories', async (_req: Request, res: Response) => {
  try {
    const result = await query<{ category: string }>(
      'SELECT DISTINCT category FROM services WHERE category IS NOT NULL AND is_active = true ORDER BY category ASC'
    );

    res.json({
      categories: result.rows.map((row) => row.category),
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

/**
 * GET /api/services/:id
 * Get a single service by ID
 */
router.get('/:id', optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const isAdmin = !!req.user;

    let queryText = 'SELECT * FROM services WHERE id = $1';
    if (!isAdmin) {
      queryText += ' AND is_active = true';
    }

    const result = await query<ServiceRow>(queryText, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    res.json({ service: result.rows[0] });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

/**
 * POST /api/services
 * Create a new service (admin only)
 */
router.post('/', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      touch_up_price,
      duration,
      category,
      image_url,
      booking_url,
      display_order,
      is_active,
    } = req.body;

    // Validate required fields
    if (!name) {
      res.status(400).json({ error: 'Service name is required' });
      return;
    }

    const result = await query<ServiceRow>(
      `INSERT INTO services (
        name, description, price, touch_up_price, duration,
        category, image_url, booking_url, display_order, is_active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        name,
        description || null,
        price || null,
        touch_up_price || null,
        duration || null,
        category || null,
        image_url || null,
        booking_url || null,
        display_order || 0,
        is_active ?? true,
      ]
    );

    res.status(201).json({
      message: 'Service created successfully',
      service: result.rows[0],
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

/**
 * PUT /api/services/:id
 * Update a service (admin only)
 */
router.put('/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      touch_up_price,
      duration,
      category,
      image_url,
      booking_url,
      display_order,
      is_active,
    } = req.body;

    // Check if service exists
    const existing = await query<ServiceRow>('SELECT id FROM services WHERE id = $1', [id]);

    if (existing.rows.length === 0) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    const result = await query<ServiceRow>(
      `UPDATE services SET
        name = COALESCE($1, name),
        description = COALESCE($2, description),
        price = COALESCE($3, price),
        touch_up_price = COALESCE($4, touch_up_price),
        duration = COALESCE($5, duration),
        category = COALESCE($6, category),
        image_url = COALESCE($7, image_url),
        booking_url = COALESCE($8, booking_url),
        display_order = COALESCE($9, display_order),
        is_active = COALESCE($10, is_active)
      WHERE id = $11
      RETURNING *`,
      [
        name,
        description,
        price,
        touch_up_price,
        duration,
        category,
        image_url,
        booking_url,
        display_order,
        is_active,
        id,
      ]
    );

    res.json({
      message: 'Service updated successfully',
      service: result.rows[0],
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

/**
 * DELETE /api/services/:id
 * Delete a service (admin only)
 */
router.delete('/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Check if service exists
    const existing = await query<ServiceRow>('SELECT id FROM services WHERE id = $1', [id]);

    if (existing.rows.length === 0) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    await query('DELETE FROM services WHERE id = $1', [id]);

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

/**
 * PATCH /api/services/reorder
 * Update display order for multiple services (admin only)
 */
router.patch('/reorder', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { orders } = req.body;

    if (!Array.isArray(orders)) {
      res.status(400).json({ error: 'Orders must be an array' });
      return;
    }

    // Update each service's display order
    const updatePromises = orders.map(
      (item: { id: number; display_order: number }) =>
        query('UPDATE services SET display_order = $1 WHERE id = $2', [
          item.display_order,
          item.id,
        ])
    );

    await Promise.all(updatePromises);

    res.json({ message: 'Services reordered successfully' });
  } catch (error) {
    console.error('Reorder services error:', error);
    res.status(500).json({ error: 'Failed to reorder services' });
  }
});

export default router;
