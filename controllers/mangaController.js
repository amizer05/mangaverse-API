import pool from '../models/db.js';

/**
 * Get all mangas with pagination, search, and sorting
 */
export const getAllMangas = async (req, res) => {
  try {
    const { limit = 10, offset = 0, search = '', sort = 'id', order = 'asc', category } = req.query;
    
    let query = 'SELECT * FROM mangas WHERE 1=1';
    const params = [];
    
    // Search functionality
    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }
    
    // Category filter: filter mangas that have news with specific category
    if (category) {
      query += ' AND id IN (SELECT DISTINCT manga_id FROM news WHERE category = ? AND manga_id IS NOT NULL)';
      params.push(category);
    }
    
    // Get total count for pagination
    const [countResult] = await pool.execute(
      query.replace('SELECT *', 'SELECT COUNT(*) as total'),
      params
    );
    const total = countResult[0].total;
    
    // Add sorting
    const validSorts = ['id', 'title', 'release_date', 'created_at'];
    const sortField = validSorts.includes(sort) ? sort : 'id';
    const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    query += ` ORDER BY ${sortField} ${sortOrder}`;
    
    // Add pagination (LIMIT and OFFSET must be integers, not placeholders in some MySQL versions)
    const limitNum = parseInt(limit) || 10;
    const offsetNum = parseInt(offset) || 0;
    query += ` LIMIT ${limitNum} OFFSET ${offsetNum}`;
    
    const [mangas] = await pool.execute(query, params);
    
    res.json({
      data: mangas,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + parseInt(limit) < total
      }
    });
  } catch (error) {
    console.error('Error fetching mangas:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

/**
 * Get single manga by ID
 */
export const getMangaById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [mangas] = await pool.execute(
      'SELECT * FROM mangas WHERE id = ?',
      [id]
    );
    
    if (mangas.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Manga with ID ${id} not found`
      });
    }
    
    // Get related news
    const [news] = await pool.execute(
      'SELECT * FROM news WHERE manga_id = ? ORDER BY created_at DESC',
      [id]
    );
    
    res.json({
      data: {
        ...mangas[0],
        news: news
      }
    });
  } catch (error) {
    console.error('Error fetching manga:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

/**
 * Create new manga
 */
export const createManga = async (req, res) => {
  try {
    const { title, description, release_date, cover_image, slug } = req.body;
    
    // Generate slug if not provided
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const [result] = await pool.execute(
      'INSERT INTO mangas (title, slug, description, release_date, cover_image) VALUES (?, ?, ?, ?, ?)',
      [title, finalSlug, description, release_date, cover_image || null]
    );
    
    const [newManga] = await pool.execute(
      'SELECT * FROM mangas WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json({
      message: 'Manga created successfully',
      data: newManga[0]
    });
  } catch (error) {
    console.error('Error creating manga:', error);
    
    // Handle duplicate entry
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Manga with this title or slug already exists'
      });
    }
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

/**
 * Update manga
 */
export const updateManga = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, release_date, cover_image, slug } = req.body;
    
    // Check if manga exists
    const [existing] = await pool.execute(
      'SELECT * FROM mangas WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Manga with ID ${id} not found`
      });
    }
    
    // Build update query dynamically
    const updates = [];
    const values = [];
    
    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    if (release_date !== undefined) {
      updates.push('release_date = ?');
      values.push(release_date);
    }
    if (cover_image !== undefined) {
      updates.push('cover_image = ?');
      values.push(cover_image);
    }
    if (slug !== undefined) {
      updates.push('slug = ?');
      values.push(slug);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'No fields to update'
      });
    }
    
    values.push(id);
    
    await pool.execute(
      `UPDATE mangas SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    const [updated] = await pool.execute(
      'SELECT * FROM mangas WHERE id = ?',
      [id]
    );
    
    res.json({
      message: 'Manga updated successfully',
      data: updated[0]
    });
  } catch (error) {
    console.error('Error updating manga:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

/**
 * Delete manga (admin only)
 */
export const deleteManga = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if manga exists
    const [existing] = await pool.execute(
      'SELECT * FROM mangas WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Manga with ID ${id} not found`
      });
    }
    
    // Delete related news first (if foreign key constraint allows)
    await pool.execute('DELETE FROM news WHERE manga_id = ?', [id]);
    
    // Delete manga
    await pool.execute('DELETE FROM mangas WHERE id = ?', [id]);
    
    res.json({
      message: 'Manga deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting manga:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

