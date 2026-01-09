import pool from '../models/db.js';

/**
 * Get all news with pagination, search, and filtering
 */
export const getAllNews = async (req, res) => {
  try {
    const { limit = 10, offset = 0, search = '', sort = 'created_at', order = 'desc', category, manga_id } = req.query;
    
    let query = 'SELECT n.*, m.title as manga_title FROM news n LEFT JOIN mangas m ON n.manga_id = m.id WHERE 1=1';
    const params = [];
    
    // Search functionality
    if (search) {
      query += ' AND (n.title LIKE ? OR n.content LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }
    
    // Category filter
    if (category) {
      query += ' AND n.category = ?';
      params.push(category);
    }
    
    // Manga filter
    if (manga_id) {
      query += ' AND n.manga_id = ?';
      params.push(manga_id);
    }
    
    // Get total count
    const [countResult] = await pool.execute(
      query.replace('SELECT n.*, m.title as manga_title', 'SELECT COUNT(*) as total'),
      params
    );
    const total = countResult[0].total;
    
    // Add sorting
    const validSorts = ['id', 'title', 'created_at', 'category'];
    const sortField = validSorts.includes(sort) ? `n.${sort}` : 'n.created_at';
    const sortOrder = order.trim().toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    query += ` ORDER BY ${sortField} ${sortOrder}`;
    
    // Add pagination (LIMIT and OFFSET must be integers, not placeholders)
    const limitNum = parseInt(limit) || 10;
    const offsetNum = parseInt(offset) || 0;
    query += ` LIMIT ${limitNum} OFFSET ${offsetNum}`;
    
    const [news] = await pool.execute(query, params);
    
    res.json({
      data: news,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + parseInt(limit) < total
      }
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

/**
 * Get single news by ID
 */
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [news] = await pool.execute(
      'SELECT n.*, m.title as manga_title, m.slug as manga_slug FROM news n LEFT JOIN mangas m ON n.manga_id = m.id WHERE n.id = ?',
      [id]
    );
    
    if (news.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: `News with ID ${id} not found`
      });
    }
    
    res.json({
      data: news[0]
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

/**
 * Create new news
 */
export const createNews = async (req, res) => {
  try {
    const { title, content, category, manga_id } = req.body;
    
    // Verify manga exists if manga_id provided
    if (manga_id) {
      const [manga] = await pool.execute(
        'SELECT id FROM mangas WHERE id = ?',
        [manga_id]
      );
      
      if (manga.length === 0) {
        return res.status(400).json({
          error: 'Bad Request',
          message: `Manga with ID ${manga_id} not found`
        });
      }
    }
    
    const [result] = await pool.execute(
      'INSERT INTO news (title, content, category, manga_id) VALUES (?, ?, ?, ?)',
      [title, content, category, manga_id || null]
    );
    
    const [newNews] = await pool.execute(
      'SELECT n.*, m.title as manga_title FROM news n LEFT JOIN mangas m ON n.manga_id = m.id WHERE n.id = ?',
      [result.insertId]
    );
    
    res.status(201).json({
      message: 'News created successfully',
      data: newNews[0]
    });
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

/**
 * Update news
 */
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, manga_id } = req.body;
    
    // Check if news exists
    const [existing] = await pool.execute(
      'SELECT * FROM news WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: `News with ID ${id} not found`
      });
    }
    
    // Verify manga exists if manga_id provided
    if (manga_id !== undefined) {
      if (manga_id !== null) {
        const [manga] = await pool.execute(
          'SELECT id FROM mangas WHERE id = ?',
          [manga_id]
        );
        
        if (manga.length === 0) {
          return res.status(400).json({
            error: 'Bad Request',
            message: `Manga with ID ${manga_id} not found`
          });
        }
      }
    }
    
    // Build update query dynamically
    const updates = [];
    const values = [];
    
    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title);
    }
    if (content !== undefined) {
      updates.push('content = ?');
      values.push(content);
    }
    if (category !== undefined) {
      updates.push('category = ?');
      values.push(category);
    }
    if (manga_id !== undefined) {
      updates.push('manga_id = ?');
      values.push(manga_id);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'No fields to update'
      });
    }
    
    values.push(id);
    
    await pool.execute(
      `UPDATE news SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    const [updated] = await pool.execute(
      'SELECT n.*, m.title as manga_title FROM news n LEFT JOIN mangas m ON n.manga_id = m.id WHERE n.id = ?',
      [id]
    );
    
    res.json({
      message: 'News updated successfully',
      data: updated[0]
    });
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

/**
 * Delete news (admin only)
 */
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if news exists
    const [existing] = await pool.execute(
      'SELECT * FROM news WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: `News with ID ${id} not found`
      });
    }
    
    await pool.execute('DELETE FROM news WHERE id = ?', [id]);
    
    res.json({
      message: 'News deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

