<<<<<<< HEAD
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
=======
# Mangaverse API - Node.js Backend

Database-driven RESTful API gebouwd met Node.js 20+ en Express, met volledige CRUD-operaties voor Users en Mangas entiteiten. Een API voor het beheren van een manga catalogus.

## 🚀 Vereisten

- Node.js 20 of hoger
- MySQL database (of andere database die compatibel is met mysql2)
- npm of yarn

## 📦 Installatie

1. **Clone de repository:**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Installeer dependencies:**
   ```bash
   npm install
   ```

3. **Configureer de database:**
   
   Maak een `.env` bestand in de root directory (zie `.env.example` voor een voorbeeld):
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=nodejs_api
   DB_PORT=3306
   PORT=3000
   ```

4. **Maak de database aan:**
   
   Maak handmatig een database aan in MySQL met de naam die je hebt opgegeven in `DB_NAME`:
   ```sql
   CREATE DATABASE nodejs_api;
   ```

5. **Start de server:**
   
   De database tabellen worden automatisch aangemaakt bij de eerste start:
   ```bash
   npm start
   ```
   
   Voor development met auto-reload:
   ```bash
   npm run dev
   ```

De server draait nu op `http://localhost:3000` (of de poort die je hebt opgegeven in `.env`).

## 📚 API Documentatie

Bezoek `http://localhost:3000/` voor de volledige API documentatie met alle endpoints, parameters en voorbeelden.

## 🔑 API Endpoints

### Users

- `GET /api/users` - Lijst van alle gebruikers (met filtering, paginatie en sortering)
- `GET /api/users/:id` - Details van één gebruiker
- `POST /api/users` - Nieuwe gebruiker aanmaken
- `PUT/PATCH /api/users/:id` - Gebruiker bijwerken
- `DELETE /api/users/:id` - Gebruiker verwijderen

### Mangas

- `GET /api/mangas` - Lijst van alle manga's (met filtering, paginatie en sortering)
- `GET /api/mangas/:id` - Details van één manga
- `POST /api/mangas` - Nieuwe manga toevoegen
- `PUT/PATCH /api/mangas/:id` - Manga bijwerken
- `DELETE /api/mangas/:id` - Manga verwijderen

## ✨ Features

### Minimale vereisten (geïmplementeerd):

✅ **Twee entiteiten met volledige CRUD** (Users en Mangas)  
✅ **Basisvalidatie** op alle velden  
✅ **Paginatie** met limit en offset  
✅ **Zoeken** op meerdere velden  
✅ **Documentatiepagina** op root endpoint  

### Extra features (voor hoger cijfer):

✅ **Geavanceerde validatie:**
   - Datum validatie (end_date moet na start_date liggen)
   - Telefoonnummer validatie (formaat +32 XXX XX XX XX)
   - Lengte restricties
   - Regex validatie voor namen en e-mails
   - Unieke waarden (e-mail)

✅ **Verbeterde query-mogelijkheden:**
   - Zoeken op meerdere velden tegelijk
   - Sortering in de query (?sort=created_at&order=desc)
   - Combinatie van filteren, sorteren en paginatie
   - Datum filtering voor manga's
   - Filteren op genre, status en rating

## 📋 Validatie Regels

### Users

- **first_name, last_name:** Alleen letters, spaties, apostrofen en streepjes (2-100 karakters)
- **email:** Geldig e-mail formaat, moet uniek zijn
- **phone:** Formaat +32 XXX XX XX XX (optioneel)
- **role:** "user" of "admin" (default: "user")

### Mangas

- **title:** 2-255 karakters
- **description:** 10-5000 karakters
- **genre:** Vrij tekst (optioneel, bijv. Action, Romance, Fantasy)
- **status:** ongoing, completed, hiatus, of cancelled (default: ongoing)
- **rating:** Nummer tussen 0 en 10 (optioneel)
- **release_date:** Datum formaat YYYY-MM-DD (optioneel)
- **cover_image_url:** URL naar cover afbeelding, max 500 karakters (optioneel)
- **added_by_id:** Moet een bestaande gebruiker zijn

## 🗄️ Database Schema

### Users Table

```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- first_name (VARCHAR(100), NOT NULL)
- last_name (VARCHAR(100), NOT NULL)
- email (VARCHAR(255), NOT NULL, UNIQUE)
- phone (VARCHAR(20))
- role (ENUM('user', 'admin'), DEFAULT 'user')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Mangas Table

```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- title (VARCHAR(255), NOT NULL)
- description (TEXT, NOT NULL)
- genre (VARCHAR(100))
- status (ENUM('ongoing', 'completed', 'hiatus', 'cancelled'), DEFAULT 'ongoing')
- rating (DECIMAL(3,1), CHECK rating >= 0 AND rating <= 10)
- release_date (DATE)
- cover_image_url (VARCHAR(500))
- added_by_id (INT, NOT NULL, FOREIGN KEY)
>>>>>>> 59775988cc5591501086a0950bf39b14e17599d8
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

<<<<<<< HEAD
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
manga-api/
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
curl http://localhost:3000/mangas?limit=5
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


=======
## 📝 HTTP Status Codes

- `200 OK` - Succesvolle GET, PUT, PATCH of DELETE
- `201 Created` - Succesvolle POST (nieuw record aangemaakt)
- `400 Bad Request` - Validatiefout of ongeldige data
- `404 Not Found` - Resource niet gevonden
- `500 Internal Server Error` - Server fout

## 🧪 Voorbeeld Requests

### Gebruiker aanmaken

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Amine",
    "last_name": "Zerouali",
    "email": "amine@example.com",
    "phone": "+32 444 44 44 44",
    "role": "admin"
  }'
```

### Manga's ophalen met paginatie en filtering

```bash
curl "http://localhost:3000/api/mangas?limit=10&offset=0&title=naruto&genre=Action&status=completed&sort=rating&order=DESC"
```

### Manga toevoegen

```bash
curl -X POST http://localhost:3000/api/mangas \
  -H "Content-Type: application/json" \
  -d '{
    "title": "One Piece",
    "description": "Het verhaal volgt Monkey D. Luffy en zijn piratencrew...",
    "genre": "Action",
    "status": "ongoing",
    "rating": 9.8,
    "release_date": "1997-07-22",
    "added_by_id": 1
  }'
```

## 📄 Bronvermelding

De volgende bronnen en documentatie zijn gebruikt voor het ontwikkelen van deze API:

- **Express.js Documentatie:** https://expressjs.com/
  - Gebruikt voor het opzetten van de REST API structuur en middleware
  
- **mysql2 Package:** https://github.com/sidorares/node-mysql2
  - Gebruikt voor database connecties en queries met connection pooling
  
- **Node.js Documentatie:** https://nodejs.org/docs/
  - Gebruikt voor Node.js best practices en ES6 modules (import/export)
  
- **MDN Web Docs - JavaScript:** https://developer.mozilla.org/en-US/docs/Web/JavaScript
  - Gebruikt voor JavaScript validatie en string manipulatie functies

Alle code is zelf geschreven met behulp van de bovenstaande documentatie. Geen code is direct gekopieerd van tutorials.

## 🔧 Bekende Issues

Geen bekende issues op dit moment.

## 📞 Contact

Voor vragen over dit project, neem contact op via GitHub Issues.

## 📄 Licentie

ISC

>>>>>>> 59775988cc5591501086a0950bf39b14e17599d8
