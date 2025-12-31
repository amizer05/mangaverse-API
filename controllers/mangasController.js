import pool from '../config/database.js';
import {
  validateNotEmpty,
  validateNumeric,
  validateLength,
  validateDateRange
} from '../middleware/validation.js';

export const getAllMangas = async (req, res) => {
  try {
    const { 
      limit, 
      offset, 
      title, 
      genre,
      status,
      added_by_id, 
      sort = 'created_at', 
      order = 'DESC',
      start_date,
      end_date,
      min_rating,
      max_rating
    } = req.query;

    let query = `
      SELECT 
        m.*,
        u.first_name,
        u.last_name,
        u.email as added_by_email
      FROM mangas m
      LEFT JOIN users u ON m.added_by_id = u.id
      WHERE 1=1
    `;
    const params = [];

    // Zoeken op titel
    if (title) {
      query += ' AND m.title LIKE ?';
      params.push(`%${title}%`);
    }

    // Filteren op genre
    if (genre) {
      query += ' AND m.genre LIKE ?';
      params.push(`%${genre}%`);
    }

    // Filteren op status
    if (status) {
      const validStatuses = ['ongoing', 'completed', 'hiatus', 'cancelled'];
      if (validStatuses.includes(status)) {
        query += ' AND m.status = ?';
        params.push(status);
      }
    }

    // Filteren op wie de manga heeft toegevoegd
    if (added_by_id) {
      validateNumeric(added_by_id, 'added_by_id');
      query += ' AND m.added_by_id = ?';
      params.push(parseInt(added_by_id));
    }

    // Rating filters
    if (min_rating) {
      validateNumeric(min_rating, 'min_rating');
      query += ' AND m.rating >= ?';
      params.push(parseFloat(min_rating));
    }

    if (max_rating) {
      validateNumeric(max_rating, 'max_rating');
      query += ' AND m.rating <= ?';
      params.push(parseFloat(max_rating));
    }

    // Datum filters
    if (start_date) {
      query += ' AND m.release_date >= ?';
      params.push(start_date);
    }

    if (end_date) {
      query += ' AND m.release_date <= ?';
      params.push(end_date);
    }

    // Valideer datums
    if (start_date && end_date) {
      validateDateRange(start_date, end_date);
    }

    // Sorteren
    const allowedSorts = ['id', 'title', 'genre', 'status', 'rating', 'release_date', 'created_at', 'updated_at'];
    const sortField = allowedSorts.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    query += ` ORDER BY m.${sortField} ${sortOrder}`;

    // Paginatie
    if (limit) {
      validateNumeric(limit, 'limit');
      query += ' LIMIT ?';
      params.push(parseInt(limit));
      if (offset) {
        validateNumeric(offset, 'offset');
        query += ' OFFSET ?';
        params.push(parseInt(offset));
      }
    }

    const [mangas] = await pool.query(query, params);

    res.status(200).json({
      success: true,
      count: mangas.length,
      data: mangas
    });
  } catch (error) {
    console.error('Error fetching mangas:', error);
    if (error.code === 'ECONNREFUSED' || error.code === 'ER_BAD_DB_ERROR') {
      return res.status(503).json({ 
        error: 'Database niet beschikbaar', 
        message: 'Zorg dat MySQL draait en dat de database correct is geconfigureerd' 
      });
    }
    res.status(400).json({ error: error.message || 'Fout bij ophalen van manga\'s' });
  }
};

export const getMangaById = async (req, res) => {
  try {
    const { id } = req.params;
    const [mangas] = await pool.query(
      `SELECT 
        m.*,
        u.first_name,
        u.last_name,
        u.email as added_by_email
      FROM mangas m
      LEFT JOIN users u ON m.added_by_id = u.id
      WHERE m.id = ?`,
      [id]
    );

    if (mangas.length === 0) {
      return res.status(404).json({ error: 'Manga niet gevonden' });
    }

    res.status(200).json({
      success: true,
      data: mangas[0]
    });
  } catch (error) {
    console.error('Error fetching manga:', error);
    if (error.code === 'ECONNREFUSED' || error.code === 'ER_BAD_DB_ERROR') {
      return res.status(503).json({ 
        error: 'Database niet beschikbaar', 
        message: 'Zorg dat MySQL draait en dat de database correct is geconfigureerd' 
      });
    }
    res.status(500).json({ error: 'Fout bij ophalen van manga' });
  }
};

export const createManga = async (req, res) => {
  try {
    const { title, description, genre, status, rating, release_date, cover_image_url, added_by_id } = req.body;

    // Validatie
    validateNotEmpty(title, 'Titel');
    validateNotEmpty(description, 'Beschrijving');
    validateNotEmpty(added_by_id, 'Toegevoegd door ID');
    validateNumeric(added_by_id, 'Toegevoegd door ID');
    validateLength(title, 2, 255, 'Titel');
    validateLength(description, 10, 5000, 'Beschrijving');

    // Check if user exists
    const [users] = await pool.query('SELECT id FROM users WHERE id = ?', [added_by_id]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'Gebruiker niet gevonden' });
    }

    // Valideer status
    if (status) {
      const validStatuses = ['ongoing', 'completed', 'hiatus', 'cancelled'];
      if (!validStatuses.includes(status)) {
        throw new Error('Status moet een van de volgende zijn: ongoing, completed, hiatus, cancelled');
      }
    }

    // Valideer rating
    if (rating !== undefined && rating !== null) {
      validateNumeric(rating, 'Rating');
      const ratingNum = parseFloat(rating);
      if (ratingNum < 0 || ratingNum > 10) {
        throw new Error('Rating moet tussen 0 en 10 liggen');
      }
    }

    // Valideer release_date als opgegeven
    if (release_date) {
      const releaseDate = new Date(release_date);
      if (isNaN(releaseDate.getTime())) {
        throw new Error('Ongeldig datum formaat voor release_date');
      }
    }

    // Valideer cover_image_url lengte als opgegeven
    if (cover_image_url && cover_image_url.length > 500) {
      throw new Error('Cover image URL mag maximaal 500 karakters zijn');
    }

    const [result] = await pool.query(
      'INSERT INTO mangas (title, description, genre, status, rating, release_date, cover_image_url, added_by_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        title.trim(), 
        description.trim(), 
        genre ? genre.trim() : null,
        status || 'ongoing',
        rating !== undefined && rating !== null ? parseFloat(rating) : null,
        release_date || null,
        cover_image_url ? cover_image_url.trim() : null,
        parseInt(added_by_id)
      ]
    );

    const [newManga] = await pool.query(
      `SELECT 
        m.*,
        u.first_name,
        u.last_name,
        u.email as added_by_email
      FROM mangas m
      LEFT JOIN users u ON m.added_by_id = u.id
      WHERE m.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Manga succesvol toegevoegd',
      data: newManga[0]
    });
  } catch (error) {
    console.error('Error creating manga:', error);
    res.status(400).json({ error: error.message || 'Fout bij toevoegen van manga' });
  }
};

export const updateManga = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, genre, status, rating, release_date, cover_image_url, added_by_id } = req.body;

    // Check if manga exists
    const [existing] = await pool.query('SELECT * FROM mangas WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Manga niet gevonden' });
    }

    // Validatie alleen voor opgegeven velden
    if (title !== undefined) {
      validateNotEmpty(title, 'Titel');
      validateLength(title, 2, 255, 'Titel');
    }

    if (description !== undefined) {
      validateNotEmpty(description, 'Beschrijving');
      validateLength(description, 10, 5000, 'Beschrijving');
    }

    if (status !== undefined && status !== null) {
      const validStatuses = ['ongoing', 'completed', 'hiatus', 'cancelled'];
      if (!validStatuses.includes(status)) {
        throw new Error('Status moet een van de volgende zijn: ongoing, completed, hiatus, cancelled');
      }
    }

    if (rating !== undefined && rating !== null) {
      validateNumeric(rating, 'Rating');
      const ratingNum = parseFloat(rating);
      if (ratingNum < 0 || ratingNum > 10) {
        throw new Error('Rating moet tussen 0 en 10 liggen');
      }
    }

    if (added_by_id !== undefined) {
      validateNotEmpty(added_by_id, 'Toegevoegd door ID');
      validateNumeric(added_by_id, 'Toegevoegd door ID');
      // Check if user exists
      const [users] = await pool.query('SELECT id FROM users WHERE id = ?', [added_by_id]);
      if (users.length === 0) {
        return res.status(404).json({ error: 'Gebruiker niet gevonden' });
      }
    }

    if (release_date !== undefined && release_date !== null) {
      const releaseDate = new Date(release_date);
      if (isNaN(releaseDate.getTime())) {
        throw new Error('Ongeldig datum formaat voor release_date');
      }
    }

    if (cover_image_url !== undefined && cover_image_url !== null && cover_image_url.length > 500) {
      throw new Error('Cover image URL mag maximaal 500 karakters zijn');
    }

    // Build update query dynamically
    const updates = [];
    const params = [];

    if (title !== undefined) {
      updates.push('title = ?');
      params.push(title.trim());
    }
    if (description !== undefined) {
      updates.push('description = ?');
      params.push(description.trim());
    }
    if (genre !== undefined) {
      updates.push('genre = ?');
      params.push(genre ? genre.trim() : null);
    }
    if (status !== undefined) {
      updates.push('status = ?');
      params.push(status || null);
    }
    if (rating !== undefined) {
      updates.push('rating = ?');
      params.push(rating !== null ? parseFloat(rating) : null);
    }
    if (release_date !== undefined) {
      updates.push('release_date = ?');
      params.push(release_date || null);
    }
    if (cover_image_url !== undefined) {
      updates.push('cover_image_url = ?');
      params.push(cover_image_url ? cover_image_url.trim() : null);
    }
    if (added_by_id !== undefined) {
      updates.push('added_by_id = ?');
      params.push(parseInt(added_by_id));
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'Geen velden om bij te werken' });
    }

    params.push(id);
    await pool.query(`UPDATE mangas SET ${updates.join(', ')} WHERE id = ?`, params);

    const [updatedManga] = await pool.query(
      `SELECT 
        m.*,
        u.first_name,
        u.last_name,
        u.email as added_by_email
      FROM mangas m
      LEFT JOIN users u ON m.added_by_id = u.id
      WHERE m.id = ?`,
      [id]
    );

    res.status(200).json({
      success: true,
      message: 'Manga succesvol bijgewerkt',
      data: updatedManga[0]
    });
  } catch (error) {
    console.error('Error updating manga:', error);
    res.status(400).json({ error: error.message || 'Fout bij bijwerken van manga' });
  }
};

export const deleteManga = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.query('SELECT * FROM mangas WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Manga niet gevonden' });
    }

    await pool.query('DELETE FROM mangas WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Manga succesvol verwijderd'
    });
  } catch (error) {
    console.error('Error deleting manga:', error);
    res.status(500).json({ error: 'Fout bij verwijderen van manga' });
  }
};


