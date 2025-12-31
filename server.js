import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database.js';
import setupDatabase from './config/setupDatabase.js';
import usersRoutes from './routes/users.js';
import mangasRoutes from './routes/mangas.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database setup (niet-blokkerend, server start ook zonder database)
setupDatabase().catch((error) => {
  console.error('⚠️  Database connectie fout:', error.code || error.message);
  console.log('💡 Tip: Zorg dat MySQL draait en dat je .env configuratie correct is');
  console.log('   De server draait, maar database functionaliteit werkt niet zonder connectie.\n');
});

// Documentatiepagina op root
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node.js API Documentatie</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #1a1a1a;
            margin-bottom: 10px;
            font-size: 2.5em;
        }
        
        .subtitle {
            color: #666;
            margin-bottom: 40px;
            font-size: 1.1em;
        }
        
        h2 {
            color: #2c3e50;
            margin-top: 40px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #3498db;
            font-size: 1.8em;
        }
        
        h3 {
            color: #34495e;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 1.3em;
        }
        
        .endpoint {
            background: #f8f9fa;
            border-left: 4px solid #3498db;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        
        .method {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 0.85em;
            margin-right: 10px;
        }
        
        .method.get { background: #61affe; color: white; }
        .method.post { background: #49cc90; color: white; }
        .method.put { background: #fca130; color: white; }
        .method.patch { background: #fca130; color: white; }
        .method.delete { background: #f93e3e; color: white; }
        
        .path {
            font-family: 'Courier New', monospace;
            font-size: 1.1em;
            color: #2c3e50;
            font-weight: bold;
        }
        
        .description {
            margin: 15px 0;
            color: #555;
        }
        
        .parameters {
            margin: 15px 0;
        }
        
        .parameters h4 {
            color: #34495e;
            margin-bottom: 10px;
            font-size: 1em;
        }
        
        .parameters ul {
            list-style: none;
            padding-left: 0;
        }
        
        .parameters li {
            padding: 5px 0;
            font-family: 'Courier New', monospace;
            color: #666;
        }
        
        .parameters li strong {
            color: #2c3e50;
        }
        
        .example {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
            margin: 15px 0;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        
        .example pre {
            margin: 0;
        }
        
        .response {
            margin: 15px 0;
        }
        
        .response h4 {
            color: #34495e;
            margin-bottom: 10px;
            font-size: 1em;
        }
        
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        
        .note {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        
        .note strong {
            color: #856404;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Mangaverse API Documentatie</h1>
        <p class="subtitle">RESTful API voor gebruikers en manga's beheer</p>
        
        <h2>Basis informatie</h2>
        <p>Deze API biedt volledige CRUD-operaties voor twee entiteiten: <strong>Users</strong> en <strong>Mangas</strong>.</p>
        <p>Base URL: <code>http://localhost:${PORT}</code></p>
        
        <div class="note">
            <strong>Let op:</strong> Datums moeten in ISO 8601 formaat zijn (bijv. 2024-01-15 of 2024-01-15T10:30:00). Telefoonnummers moeten formaat <code>+32 XXX XX XX XX</code> hebben. Manga ratings moeten tussen 0 en 10 liggen.
        </div>
        
        <h2>Users Endpoints</h2>
        
        <div class="endpoint">
            <h3><span class="method get">GET</span> <span class="path">/api/users</span></h3>
            <div class="description">Haalt een lijst van alle gebruikers op met optionele filtering, paginatie en sortering.</div>
            
            <div class="parameters">
                <h4>Query Parameters (optioneel):</h4>
                <ul>
                    <li><strong>limit</strong> (number) - Aantal resultaten per pagina</li>
                    <li><strong>offset</strong> (number) - Aantal resultaten over te slaan</li>
                    <li><strong>name</strong> (string) - Zoek op voornaam of achternaam</li>
                    <li><strong>email</strong> (string) - Zoek op e-mailadres</li>
                    <li><strong>role</strong> (string) - Filter op rol (user of admin)</li>
                    <li><strong>sort</strong> (string) - Sorteer veld (id, first_name, last_name, email, created_at, updated_at)</li>
                    <li><strong>order</strong> (string) - Sorteer volgorde (ASC of DESC, default: DESC)</li>
                </ul>
            </div>
            
            <div class="example">
                <pre>GET /api/users?limit=10&offset=0&name=amine&role=admin&sort=created_at&order=DESC</pre>
            </div>
            
            <div class="response">
                <h4>Response (200 OK):</h4>
                <div class="example">
                    <pre>{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "first_name": "Amine",
      "last_name": "Zerouali",
      "email": "amine@example.com",
      "phone": "+32 444 44 44 44",
      "role": "admin",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}</pre>
                </div>
            </div>
        </div>
        
        <div class="endpoint">
            <h3><span class="method get">GET</span> <span class="path">/api/users/:id</span></h3>
            <div class="description">Haalt details van één specifieke gebruiker op.</div>
            
            <div class="parameters">
                <h4>URL Parameters:</h4>
                <ul>
                    <li><strong>id</strong> (number) - ID van de gebruiker</li>
                </ul>
            </div>
            
            <div class="example">
                <pre>GET /api/users/1</pre>
            </div>
            
            <div class="response">
                <h4>Response (200 OK):</h4>
                <div class="example">
                    <pre>{
  "success": true,
  "data": {
    "id": 1,
    "first_name": "Amine",
    "last_name": "Zerouali",
    "email": "amine@example.com",
    "phone": "+32 444 44 44 44",
    "role": "admin",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}</pre>
                </div>
            </div>
        </div>
        
        <div class="endpoint">
            <h3><span class="method post">POST</span> <span class="path">/api/users</span></h3>
            <div class="description">Maakt een nieuwe gebruiker aan.</div>
            
            <div class="parameters">
                <h4>Request Body (JSON):</h4>
                <ul>
                    <li><strong>first_name</strong> (string, verplicht) - Voornaam (2-100 karakters, alleen letters)</li>
                    <li><strong>last_name</strong> (string, verplicht) - Achternaam (2-100 karakters, alleen letters)</li>
                    <li><strong>email</strong> (string, verplicht) - E-mailadres (moet uniek zijn, geldig e-mail formaat)</li>
                    <li><strong>phone</strong> (string, optioneel) - Telefoonnummer (formaat: +32 XXX XX XX XX)</li>
                    <li><strong>role</strong> (string, optioneel) - Rol (user of admin, default: user)</li>
                </ul>
            </div>
            
            <div class="example">
                <pre>POST /api/users
Content-Type: application/json

{
  "first_name": "Amine",
  "last_name": "Zerouali",
  "email": "amine@example.com",
  "phone": "+32 444 44 44 44",
  "role": "admin"
}</pre>
            </div>
            
            <div class="response">
                <h4>Response (201 Created):</h4>
                <div class="example">
                    <pre>{
  "success": true,
  "message": "Gebruiker succesvol aangemaakt",
  "data": {
    "id": 1,
    "first_name": "Amine",
    "last_name": "Zerouali",
    "email": "amine@example.com",
    "phone": "+32 444 44 44 44",
    "role": "admin",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}</pre>
                </div>
            </div>
        </div>
        
        <div class="endpoint">
            <h3><span class="method put">PUT</span> / <span class="method patch">PATCH</span> <span class="path">/api/users/:id</span></h3>
            <div class="description">Werkt een bestaande gebruiker bij. Alle velden zijn optioneel (alleen opgegeven velden worden bijgewerkt).</div>
            
            <div class="parameters">
                <h4>URL Parameters:</h4>
                <ul>
                    <li><strong>id</strong> (number) - ID van de gebruiker</li>
                </ul>
                <h4>Request Body (JSON, alle velden optioneel):</h4>
                <ul>
                    <li><strong>first_name</strong> (string) - Voornaam</li>
                    <li><strong>last_name</strong> (string) - Achternaam</li>
                    <li><strong>email</strong> (string) - E-mailadres</li>
                    <li><strong>phone</strong> (string) - Telefoonnummer</li>
                    <li><strong>role</strong> (string) - Rol</li>
                </ul>
            </div>
            
            <div class="example">
                <pre>PUT /api/users/1
Content-Type: application/json

{
  "first_name": "Amine",
  "email": "newemail@example.com"
}</pre>
            </div>
            
            <div class="response">
                <h4>Response (200 OK):</h4>
                <div class="example">
                    <pre>{
  "success": true,
  "message": "Gebruiker succesvol bijgewerkt",
  "data": { ... }
}</pre>
                </div>
            </div>
        </div>
        
        <div class="endpoint">
            <h3><span class="method delete">DELETE</span> <span class="path">/api/users/:id</span></h3>
            <div class="description">Verwijdert een gebruiker.</div>
            
            <div class="parameters">
                <h4>URL Parameters:</h4>
                <ul>
                    <li><strong>id</strong> (number) - ID van de gebruiker</li>
                </ul>
            </div>
            
            <div class="example">
                <pre>DELETE /api/users/1</pre>
            </div>
            
            <div class="response">
                <h4>Response (200 OK):</h4>
                <div class="example">
                    <pre>{
  "success": true,
  "message": "Gebruiker succesvol verwijderd"
}</pre>
                </div>
            </div>
        </div>
        
        <h2>Mangas Endpoints</h2>
        
        <div class="endpoint">
            <h3><span class="method get">GET</span> <span class="path">/api/mangas</span></h3>
            <div class="description">Haalt een lijst van alle manga's op met optionele filtering, paginatie en sortering.</div>
            
            <div class="parameters">
                <h4>Query Parameters (optioneel):</h4>
                <ul>
                    <li><strong>limit</strong> (number) - Aantal resultaten per pagina</li>
                    <li><strong>offset</strong> (number) - Aantal resultaten over te slaan</li>
                    <li><strong>title</strong> (string) - Zoek op titel</li>
                    <li><strong>genre</strong> (string) - Filter op genre (bijv. Action, Romance, Fantasy)</li>
                    <li><strong>status</strong> (string) - Filter op status (ongoing, completed, hiatus, cancelled)</li>
                    <li><strong>added_by_id</strong> (number) - Filter op gebruiker die de manga heeft toegevoegd</li>
                    <li><strong>min_rating</strong> (number) - Minimum rating (0-10)</li>
                    <li><strong>max_rating</strong> (number) - Maximum rating (0-10)</li>
                    <li><strong>start_date</strong> (string) - Filter op startdatum release_date (ISO 8601)</li>
                    <li><strong>end_date</strong> (string) - Filter op einddatum release_date (ISO 8601, moet na start_date liggen)</li>
                    <li><strong>sort</strong> (string) - Sorteer veld (id, title, genre, status, rating, release_date, created_at, updated_at)</li>
                    <li><strong>order</strong> (string) - Sorteer volgorde (ASC of DESC, default: DESC)</li>
                </ul>
            </div>
            
            <div class="example">
                <pre>GET /api/mangas?limit=10&offset=0&title=naruto&genre=Action&status=completed&sort=rating&order=DESC</pre>
            </div>
            
            <div class="response">
                <h4>Response (200 OK):</h4>
                <div class="example">
                    <pre>{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Naruto",
      "description": "Het verhaal volgt Naruto Uzumaki...",
      "genre": "Action",
      "status": "completed",
      "rating": 9.5,
      "release_date": "1999-09-21",
      "cover_image_url": "https://example.com/naruto.jpg",
      "added_by_id": 1,
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z",
      "first_name": "Amine",
      "last_name": "Zerouali",
      "added_by_email": "amine@example.com"
    }
  ]
}</pre>
                </div>
            </div>
        </div>
        
        <div class="endpoint">
            <h3><span class="method get">GET</span> <span class="path">/api/mangas/:id</span></h3>
            <div class="description">Haalt details van één specifieke manga op.</div>
            
            <div class="parameters">
                <h4>URL Parameters:</h4>
                <ul>
                    <li><strong>id</strong> (number) - ID van de manga</li>
                </ul>
            </div>
            
            <div class="example">
                <pre>GET /api/mangas/1</pre>
            </div>
            
            <div class="response">
                <h4>Response (200 OK):</h4>
                <div class="example">
                    <pre>{
  "success": true,
  "data": {
    "id": 1,
    "title": "Naruto",
    "description": "Het verhaal volgt Naruto Uzumaki...",
    "genre": "Action",
    "status": "completed",
    "rating": 9.5,
    "release_date": "1999-09-21",
    "cover_image_url": "https://example.com/naruto.jpg",
    "added_by_id": 1,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z",
    "first_name": "Amine",
    "last_name": "Zerouali",
    "added_by_email": "amine@example.com"
  }
}</pre>
                </div>
            </div>
        </div>
        
        <div class="endpoint">
            <h3><span class="method post">POST</span> <span class="path">/api/mangas</span></h3>
            <div class="description">Voegt een nieuwe manga toe aan de database.</div>
            
            <div class="parameters">
                <h4>Request Body (JSON):</h4>
                <ul>
                    <li><strong>title</strong> (string, verplicht) - Titel van de manga (2-255 karakters)</li>
                    <li><strong>description</strong> (string, verplicht) - Beschrijving van de manga (10-5000 karakters)</li>
                    <li><strong>genre</strong> (string, optioneel) - Genre (bijv. Action, Romance, Fantasy, Comedy)</li>
                    <li><strong>status</strong> (string, optioneel) - Status (ongoing, completed, hiatus, cancelled, default: ongoing)</li>
                    <li><strong>rating</strong> (number, optioneel) - Rating tussen 0 en 10</li>
                    <li><strong>release_date</strong> (string, optioneel) - Release datum (YYYY-MM-DD formaat)</li>
                    <li><strong>cover_image_url</strong> (string, optioneel) - URL naar cover afbeelding (max 500 karakters)</li>
                    <li><strong>added_by_id</strong> (number, verplicht) - ID van de gebruiker die de manga toevoegt (moet bestaan)</li>
                </ul>
            </div>
            
            <div class="example">
                <pre>POST /api/mangas
Content-Type: application/json

{
  "title": "One Piece",
  "description": "Het verhaal volgt Monkey D. Luffy...",
  "genre": "Action",
  "status": "ongoing",
  "rating": 9.8,
  "release_date": "1997-07-22",
  "cover_image_url": "https://example.com/onepiece.jpg",
  "added_by_id": 1
}</pre>
            </div>
            
            <div class="response">
                <h4>Response (201 Created):</h4>
                <div class="example">
                    <pre>{
  "success": true,
  "message": "Manga succesvol toegevoegd",
  "data": { ... }
}</pre>
                </div>
            </div>
        </div>
        
        <div class="endpoint">
            <h3><span class="method put">PUT</span> / <span class="method patch">PATCH</span> <span class="path">/api/mangas/:id</span></h3>
            <div class="description">Werkt een bestaande manga bij. Alle velden zijn optioneel.</div>
            
            <div class="parameters">
                <h4>URL Parameters:</h4>
                <ul>
                    <li><strong>id</strong> (number) - ID van de manga</li>
                </ul>
                <h4>Request Body (JSON, alle velden optioneel):</h4>
                <ul>
                    <li><strong>title</strong> (string) - Titel</li>
                    <li><strong>description</strong> (string) - Beschrijving</li>
                    <li><strong>genre</strong> (string) - Genre</li>
                    <li><strong>status</strong> (string) - Status</li>
                    <li><strong>rating</strong> (number) - Rating</li>
                    <li><strong>release_date</strong> (string) - Release datum</li>
                    <li><strong>cover_image_url</strong> (string) - Cover afbeelding URL</li>
                    <li><strong>added_by_id</strong> (number) - ID van gebruiker</li>
                </ul>
            </div>
            
            <div class="example">
                <pre>PUT /api/mangas/1
Content-Type: application/json

{
  "title": "Naruto Shippuden",
  "rating": 9.7,
  "status": "completed"
}</pre>
            </div>
            
            <div class="response">
                <h4>Response (200 OK):</h4>
                <div class="example">
                    <pre>{
  "success": true,
  "message": "Manga succesvol bijgewerkt",
  "data": { ... }
}</pre>
                </div>
            </div>
        </div>
        
        <div class="endpoint">
            <h3><span class="method delete">DELETE</span> <span class="path">/api/mangas/:id</span></h3>
            <div class="description">Verwijdert een manga.</div>
            
            <div class="parameters">
                <h4>URL Parameters:</h4>
                <ul>
                    <li><strong>id</strong> (number) - ID van de manga</li>
                </ul>
            </div>
            
            <div class="example">
                <pre>DELETE /api/mangas/1</pre>
            </div>
            
            <div class="response">
                <h4>Response (200 OK):</h4>
                <div class="example">
                    <pre>{
  "success": true,
  "message": "Manga succesvol verwijderd"
}</pre>
                </div>
            </div>
        </div>
        
        <h2>Status Codes</h2>
        <ul style="list-style: none; padding-left: 0;">
            <li><strong>200 OK</strong> - Succesvolle GET, PUT, PATCH of DELETE operatie</li>
            <li><strong>201 Created</strong> - Succesvolle POST operatie (nieuw record aangemaakt)</li>
            <li><strong>400 Bad Request</strong> - Validatiefout of ongeldige data</li>
            <li><strong>404 Not Found</strong> - Resource niet gevonden</li>
            <li><strong>500 Internal Server Error</strong> - Server fout</li>
        </ul>
        
        <h2>Validatie Regels</h2>
        <ul style="list-style: none; padding-left: 0;">
            <li><strong>Voornaam/Achternaam:</strong> Alleen letters, spaties, apostrofen en streepjes (2-100 karakters)</li>
            <li><strong>E-mail:</strong> Geldig e-mail formaat, moet uniek zijn</li>
            <li><strong>Telefoon:</strong> Formaat +32 XXX XX XX XX</li>
            <li><strong>Manga Titel:</strong> 2-255 karakters</li>
            <li><strong>Manga Beschrijving:</strong> 10-5000 karakters</li>
            <li><strong>Manga Status:</strong> ongoing, completed, hiatus, of cancelled</li>
            <li><strong>Manga Rating:</strong> Tussen 0 en 10</li>
            <li><strong>Datums:</strong> ISO 8601 formaat (YYYY-MM-DD), end_date moet na start_date liggen</li>
        </ul>
    </div>
</body>
</html>
  `);
});

// API Routes
app.use('/api/users', usersRoutes);
app.use('/api/mangas', mangasRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint niet gevonden' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Interne serverfout' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
  console.log(`API documentatie: http://localhost:${PORT}/`);
});

