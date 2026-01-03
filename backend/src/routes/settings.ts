import { Router, Response } from 'express';
import { query } from '../db/connection';
import { verifyToken, optionalAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Setting interface for database results
interface SettingRow {
  id: number;
  key: string;
  value: string;
  updated_at: Date;
}

// Public settings that can be accessed without authentication
const PUBLIC_SETTINGS = [
  'site_name',
  'site_description',
  'contact_email',
  'contact_phone',
  'address',
  'business_hours',
  'social_facebook',
  'social_instagram',
  'social_twitter',
  'hero_title',
  'hero_subtitle',
  'about_text',
];

/**
 * GET /api/settings
 * Get all settings (public gets limited settings, admin gets all)
 */
router.get('/', optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const isAdmin = !!req.user;

    let queryText = 'SELECT * FROM site_settings';

    if (!isAdmin) {
      // Only return public settings
      const placeholders = PUBLIC_SETTINGS.map((_, i) => `$${i + 1}`).join(', ');
      queryText += ` WHERE key IN (${placeholders})`;
    }

    queryText += ' ORDER BY key ASC';

    const result = await query<SettingRow>(
      queryText,
      isAdmin ? [] : PUBLIC_SETTINGS
    );

    // Transform to key-value object for easier frontend use
    const settings: Record<string, string> = {};
    result.rows.forEach((row) => {
      settings[row.key] = row.value;
    });

    res.json({
      settings,
      raw: result.rows,
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

/**
 * GET /api/settings/:key
 * Get a single setting by key
 */
router.get('/:key', optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { key } = req.params;
    const isAdmin = !!req.user;

    // Check if non-admin is trying to access non-public setting
    if (!isAdmin && !PUBLIC_SETTINGS.includes(key)) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    const result = await query<SettingRow>(
      'SELECT * FROM site_settings WHERE key = $1',
      [key]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Setting not found' });
      return;
    }

    res.json({ setting: result.rows[0] });
  } catch (error) {
    console.error('Get setting error:', error);
    res.status(500).json({ error: 'Failed to fetch setting' });
  }
});

/**
 * POST /api/settings
 * Create or update a setting (admin only)
 */
router.post('/', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { key, value } = req.body;

    if (!key) {
      res.status(400).json({ error: 'Setting key is required' });
      return;
    }

    if (value === undefined) {
      res.status(400).json({ error: 'Setting value is required' });
      return;
    }

    // Upsert the setting
    const result = await query<SettingRow>(
      `INSERT INTO site_settings (key, value, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()
       RETURNING *`,
      [key, String(value)]
    );

    res.json({
      message: 'Setting saved successfully',
      setting: result.rows[0],
    });
  } catch (error) {
    console.error('Save setting error:', error);
    res.status(500).json({ error: 'Failed to save setting' });
  }
});

/**
 * PUT /api/settings/bulk
 * Update multiple settings at once (admin only)
 */
router.put('/bulk', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { settings } = req.body;

    if (!settings || typeof settings !== 'object') {
      res.status(400).json({ error: 'Settings object is required' });
      return;
    }

    const updatedSettings: SettingRow[] = [];

    for (const [key, value] of Object.entries(settings)) {
      const result = await query<SettingRow>(
        `INSERT INTO site_settings (key, value, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()
         RETURNING *`,
        [key, String(value)]
      );

      updatedSettings.push(result.rows[0]);
    }

    // Transform to key-value object
    const settingsObject: Record<string, string> = {};
    updatedSettings.forEach((row) => {
      settingsObject[row.key] = row.value;
    });

    res.json({
      message: `${updatedSettings.length} settings updated successfully`,
      settings: settingsObject,
      raw: updatedSettings,
    });
  } catch (error) {
    console.error('Bulk update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

/**
 * PUT /api/settings/:key
 * Update a single setting (admin only)
 */
router.put('/:key', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    if (value === undefined) {
      res.status(400).json({ error: 'Setting value is required' });
      return;
    }

    // Check if setting exists
    const existing = await query<SettingRow>(
      'SELECT id FROM site_settings WHERE key = $1',
      [key]
    );

    if (existing.rows.length === 0) {
      res.status(404).json({ error: 'Setting not found' });
      return;
    }

    const result = await query<SettingRow>(
      `UPDATE site_settings SET value = $1, updated_at = NOW()
       WHERE key = $2
       RETURNING *`,
      [String(value), key]
    );

    res.json({
      message: 'Setting updated successfully',
      setting: result.rows[0],
    });
  } catch (error) {
    console.error('Update setting error:', error);
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

/**
 * DELETE /api/settings/:key
 * Delete a setting (admin only)
 */
router.delete('/:key', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { key } = req.params;

    // Check if setting exists
    const existing = await query<SettingRow>(
      'SELECT id FROM site_settings WHERE key = $1',
      [key]
    );

    if (existing.rows.length === 0) {
      res.status(404).json({ error: 'Setting not found' });
      return;
    }

    await query('DELETE FROM site_settings WHERE key = $1', [key]);

    res.json({ message: 'Setting deleted successfully' });
  } catch (error) {
    console.error('Delete setting error:', error);
    res.status(500).json({ error: 'Failed to delete setting' });
  }
});

export default router;
