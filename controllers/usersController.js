import pool from '../config/database.js';
import {
  validateNotEmpty,
  validateEmail,
  validateName,
  validatePhone,
  validateLength
} from '../middleware/validation.js';

export const getAllUsers = async (req, res) => {
  try {
    const { limit, offset, name, email, role, sort = 'created_at', order = 'DESC' } = req.query;
    
    let query = 'SELECT * FROM users WHERE 1=1';
    const params = [];

    // Zoeken op naam
    if (name) {
      query += ' AND (first_name LIKE ? OR last_name LIKE ?)';
      params.push(`%${name}%`, `%${name}%`);
    }

    // Zoeken op email
    if (email) {
      query += ' AND email LIKE ?';
      params.push(`%${email}%`);
    }

    // Filteren op role
    if (role) {
      query += ' AND role = ?';
      params.push(role);
    }

    // Sorteren
    const allowedSorts = ['id', 'first_name', 'last_name', 'email', 'created_at', 'updated_at'];
    const sortField = allowedSorts.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    query += ` ORDER BY ${sortField} ${sortOrder}`;

    // Paginatie
    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
      if (offset) {
        query += ' OFFSET ?';
        params.push(parseInt(offset));
      }
    }

    const [users] = await pool.query(query, params);
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    if (error.code === 'ECONNREFUSED' || error.code === 'ER_BAD_DB_ERROR') {
      return res.status(503).json({ 
        error: 'Database niet beschikbaar', 
        message: 'Zorg dat MySQL draait en dat de database correct is geconfigureerd' 
      });
    }
    res.status(500).json({ error: 'Fout bij ophalen van gebruikers' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

    if (users.length === 0) {
      return res.status(404).json({ error: 'Gebruiker niet gevonden' });
    }

    res.status(200).json({
      success: true,
      data: users[0]
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    if (error.code === 'ECONNREFUSED' || error.code === 'ER_BAD_DB_ERROR') {
      return res.status(503).json({ 
        error: 'Database niet beschikbaar', 
        message: 'Zorg dat MySQL draait en dat de database correct is geconfigureerd' 
      });
    }
    res.status(500).json({ error: 'Fout bij ophalen van gebruiker' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, role } = req.body;

    // Validatie
    validateNotEmpty(first_name, 'Voornaam');
    validateNotEmpty(last_name, 'Achternaam');
    validateNotEmpty(email, 'E-mail');
    validateName(first_name, 'Voornaam');
    validateName(last_name, 'Achternaam');
    validateEmail(email);
    validateLength(first_name, 2, 100, 'Voornaam');
    validateLength(last_name, 2, 100, 'Achternaam');
    
    if (phone) {
      validatePhone(phone);
    }

    if (role && !['user', 'admin'].includes(role)) {
      throw new Error('Rol moet "user" of "admin" zijn');
    }

    const [result] = await pool.query(
      'INSERT INTO users (first_name, last_name, email, phone, role) VALUES (?, ?, ?, ?, ?)',
      [first_name.trim(), last_name.trim(), email.trim(), phone || null, role || 'user']
    );

    const [newUser] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);

    res.status(201).json({
      success: true,
      message: 'Gebruiker succesvol aangemaakt',
      data: newUser[0]
    });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'E-mailadres is al in gebruik' });
    }
    res.status(400).json({ error: error.message || 'Fout bij aanmaken van gebruiker' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone, role } = req.body;

    // Check if user exists
    const [existing] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Gebruiker niet gevonden' });
    }

    // Validatie alleen voor opgegeven velden
    if (first_name !== undefined) {
      validateNotEmpty(first_name, 'Voornaam');
      validateName(first_name, 'Voornaam');
      validateLength(first_name, 2, 100, 'Voornaam');
    }

    if (last_name !== undefined) {
      validateNotEmpty(last_name, 'Achternaam');
      validateName(last_name, 'Achternaam');
      validateLength(last_name, 2, 100, 'Achternaam');
    }

    if (email !== undefined) {
      validateNotEmpty(email, 'E-mail');
      validateEmail(email);
    }

    if (phone !== undefined && phone !== null) {
      validatePhone(phone);
    }

    if (role !== undefined && !['user', 'admin'].includes(role)) {
      throw new Error('Rol moet "user" of "admin" zijn');
    }

    // Build update query dynamically
    const updates = [];
    const params = [];

    if (first_name !== undefined) {
      updates.push('first_name = ?');
      params.push(first_name.trim());
    }
    if (last_name !== undefined) {
      updates.push('last_name = ?');
      params.push(last_name.trim());
    }
    if (email !== undefined) {
      updates.push('email = ?');
      params.push(email.trim());
    }
    if (phone !== undefined) {
      updates.push('phone = ?');
      params.push(phone || null);
    }
    if (role !== undefined) {
      updates.push('role = ?');
      params.push(role);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'Geen velden om bij te werken' });
    }

    params.push(id);
    await pool.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, params);

    const [updatedUser] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Gebruiker succesvol bijgewerkt',
      data: updatedUser[0]
    });
  } catch (error) {
    console.error('Error updating user:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'E-mailadres is al in gebruik' });
    }
    res.status(400).json({ error: error.message || 'Fout bij bijwerken van gebruiker' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Gebruiker niet gevonden' });
    }

    await pool.query('DELETE FROM users WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Gebruiker succesvol verwijderd'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({ error: 'Kan gebruiker niet verwijderen omdat er artikelen aan gekoppeld zijn' });
    }
    res.status(500).json({ error: 'Fout bij verwijderen van gebruiker' });
  }
};

