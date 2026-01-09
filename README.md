# 📚 MangaVerse API

Node.js REST API voor het beheren van manga's en nieuws artikelen. Gebouwd met Express.js en MySQL.

## 🎯 Features

- ✅ **Twee CRUD entiteiten**: Manga & News
- ✅ **Validatie**: express-validator met uitgebreide regels
- ✅ **Paginatie**: `?limit=10&offset=20`
- ✅ **Zoeken**: `?search=one+piece`
- ✅ **Sorteren**: `?sort=title&order=asc`
- ✅ **Filteren**: `?category=action` voor news
- ✅ **JWT Authenticatie**: Beschermde endpoints
- ✅ **Admin rechten**: Alleen admins kunnen verwijderen
- ✅ **Relaties**: News gekoppeld aan Manga via `manga_id`
- ✅ **Documentatie**: HTML pagina op root endpoint

## 📋 Vereisten

- Node.js v20+
- MySQL database (hergebruik Laravel `mangaverse` database)
- npm of yarn

## 🚀 Installatie

```bash
# Clone repository
git clone https://github.com/amizer05/mangaverse-API.git
cd mangaverse-API

# Installeer dependencies
npm install

# Kopieer .env.example naar .env
cp .env.example .env

# Vul database credentials in (.env bestand)
# Gebruik dezelfde credentials als je Laravel project
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=mangaverse

# Genereer JWT secret (optioneel, of gebruik een random string)
# Je kunt dit online genereren: https://randomkeygen.com/
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Start server
npm start
```

De API is nu beschikbaar op `http://localhost:3000`

## 📖 API Documentatie

Bekijk de volledige API documentatie op: **http://localhost:3000**

De documentatie bevat:
- Alle endpoints met voorbeelden
- Request/response formats
- Validatie regels
- Authenticatie instructies

## 🔐 Authenticatie

### Registreren
```bash
POST /auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user"  // of "admin"
}
```

### Inloggen
```bash
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

# Response bevat JWT token
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### Gebruik Token
Voeg de token toe aan de `Authorization` header:
```
Authorization: Bearer <jouw-token>
```

## 📡 Endpoints

### Manga Endpoints

| Methode | Endpoint | Beschrijving | Auth |
|---------|----------|--------------|------|
| GET | `/mangas` | Lijst alle mangas (met paginatie/zoeken) | - |
| GET | `/mangas/:id` | Haal specifieke manga op | - |
| POST | `/mangas` | Maak nieuwe manga | ✅ |
| PUT | `/mangas/:id` | Update manga | ✅ |
| DELETE | `/mangas/:id` | Verwijder manga | ✅ Admin |

**Query Parameters voor GET /mangas:**
- `limit` (default: 10): aantal resultaten
- `offset` (default: 0): aantal over te slaan
- `search`: zoekterm voor title/description
- `sort`: sorteer veld (id, title, release_date, created_at)
- `order`: sorteer volgorde (asc, desc)

**Voorbeeld:**
```
GET /mangas?limit=10&offset=20&search=naruto&sort=title&order=asc
```

### News Endpoints

| Methode | Endpoint | Beschrijving | Auth |
|---------|----------|--------------|------|
| GET | `/news` | Lijst alle news (met filters) | - |
| GET | `/news/:id` | Haal specifieke news op | - |
| POST | `/news` | Maak nieuwe news | ✅ |
| PUT | `/news/:id` | Update news | ✅ |
| DELETE | `/news/:id` | Verwijder news | ✅ Admin |

**Query Parameters voor GET /news:**
- `limit`, `offset`, `search`, `sort`, `order` (zie Manga)
- `category`: filter op category (action, romance, comedy, drama)
- `manga_id`: filter op manga ID

**Voorbeeld:**
```
GET /news?category=action&limit=5&manga_id=1
```

## ✅ Validatie Regels

### Manga
- `title`: verplicht, max 255 chars, **geen cijfers**
- `description`: verplicht, max 255 chars
- `release_date`: verplicht, YYYY-MM-DD format, **niet in toekomst**
- `cover_image`: optioneel, moet geldige URL zijn
- `slug`: optioneel, auto-generated als niet opgegeven

### News
- `title`: verplicht, max 255 chars
- `content`: verplicht, **minimaal 20 characters**
- `category`: verplicht, moet zijn: `action`, `romance`, `comedy`, of `drama`
- `manga_id`: optioneel, moet bestaande manga ID zijn

## 🗄️ Database Structuur

De API gebruikt de bestaande Laravel database tabellen:

### `mangas` tabel
```sql
- id (INT, PRIMARY KEY)
- title (VARCHAR 255)
- slug (VARCHAR 255, UNIQUE)
- cover_image (VARCHAR 255, NULL)
- description (TEXT)
- release_date (DATE)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### `news` tabel
```sql
- id (INT, PRIMARY KEY)
- title (VARCHAR 255)
- content (TEXT)
- manga_id (INT, FOREIGN KEY -> mangas.id, NULL)
- category (VARCHAR 50)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### `users` tabel (wordt automatisch aangemaakt indien niet bestaat)
```sql
- id (INT, PRIMARY KEY)
- email (VARCHAR 255, UNIQUE)
- password (VARCHAR 255) -- bcrypt hashed
- role (VARCHAR 50, DEFAULT 'user')
- created_at (TIMESTAMP)
```

## 📁 Project Structuur

```
mangaverse-API/
├── package.json
├── server.js              # Main server file
├── .env                   # Environment variables (niet in git)
├── .env.example           # Environment template
├── .gitignore
├── README.md
├── routes/
│   ├── mangas.js         # Manga routes
│   ├── news.js           # News routes
│   └── auth.js           # Authentication routes
├── controllers/
│   ├── mangaController.js
│   └── newsController.js
├── models/
│   └── db.js             # MySQL connection pool
├── middleware/
│   ├── auth.js           # JWT authentication
│   └── validation.js     # Validation rules
└── public/
    └── index.html        # API documentation
```

## 🧪 Testen

### Met cURL

**Registreren:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","role":"admin"}'
```

**Inloggen:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Manga ophalen:**
```bash
curl "http://localhost:3000/mangas?limit=5"
```

**Manga aanmaken (met token):**
```bash
curl -X POST http://localhost:3000/mangas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jouw-token>" \
  -d '{
    "title": "One Piece",
    "description": "A pirate adventure story",
    "release_date": "1997-07-22"
  }'
```

### Met Postman/Thunder Client

1. Importeer de endpoints in Postman
2. Maak eerst een user aan via `/auth/register`
3. Login via `/auth/login` en kopieer de token
4. Gebruik de token in de Authorization header (Bearer token)
5. Test alle CRUD operaties

## 🎬 Screencast Demo Checklist

Voor je screencast, toon:

- ✅ `npm start` → server start
- ✅ Root docs pagina (`http://localhost:3000`)
- ✅ `GET /mangas` → JSON lijst
- ✅ `POST /mangas` met validatie error (bijv. title met cijfers)
- ✅ `GET /mangas?limit=3&search=naruto` → zoeken + paginatie
- ✅ `GET /mangas?sort=title&order=asc` → sorteren
- ✅ JWT login → token ontvangen
- ✅ Protected CRUD (POST/PUT met token)
- ✅ Admin delete (DELETE met admin token)
- ✅ Relaties: `GET /mangas/:id` toont gerelateerde news
- ✅ News filtering: `GET /news?category=action`

## 🐛 Troubleshooting

**Database connection error:**
- Controleer `.env` bestand
- Zorg dat MySQL draait
- Verifieer database naam (`mangaverse`)
- Test connectie: `mysql -u root -p mangaverse`

**JWT errors:**
- Zorg dat `JWT_SECRET` is ingesteld in `.env`
- Check token format: `Authorization: Bearer <token>`
- Token kan verlopen zijn (default: 24h)

**Port already in use:**
- Verander `PORT` in `.env`
- Of stop andere processen op poort 3000

## 📚 Bronnen

- [Express.js Documentation](https://expressjs.com/)
- [express-validator](https://express-validator.github.io/docs/)
- [mysql2](https://github.com/sidorares/node-mysql2)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## 📝 Licentie

ISC

---

**Gemaakt voor EHB Backend Web - Project 2: Node.js**  
**Deadline: 9 januari 2026**  
**GitHub Repository:** https://github.com/amizer05/mangaverse-API
