import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import mangasRouter from './routes/mangas.js';
import newsRouter from './routes/news.js';
import authRouter from './routes/auth.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML documentation)
app.use(express.static(path.join(__dirname, 'public')));

// Root route - serve documentation
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.use('/auth', authRouter);
app.use('/mangas', mangasRouter);
app.use('/news', newsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'MangaVerse API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'POST /auth/register',
      'POST /auth/login',
      'GET /mangas',
      'GET /mangas/:id',
      'POST /mangas',
      'PUT /mangas/:id',
      'DELETE /mangas/:id',
      'GET /news',
      'GET /news/:id',
      'POST /news',
      'PUT /news/:id',
      'DELETE /news/:id'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MangaVerse API server running on http://localhost:${PORT}`);
  console.log(`📚 Documentation available at http://localhost:${PORT}`);
  console.log(`💾 Database: ${process.env.DB_DATABASE || 'mangaverse'}`);
});
