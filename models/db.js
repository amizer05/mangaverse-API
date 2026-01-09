import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'mangaverse',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection (non-blocking)
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    console.error('💡 Zorg dat MySQL draait en de database "mangaverse" bestaat');
    console.error('💡 Start MySQL met: brew services start mysql (of via Herd)');
    console.error('💡 Of maak de database aan: CREATE DATABASE mangaverse;');
  });

export default pool;

