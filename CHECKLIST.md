<<<<<<< HEAD
# ✅ Opdracht Checklist - MangaVerse API

## 📋 MINIMUM REQUIREMENTS (10-12/20)

### 1️⃣ TWEE CRUD ENTITEITEN: Manga & News
- [x] GET /mangas → lijst alle mangas
- [x] GET /mangas/:id → detail manga
- [x] POST /mangas → nieuwe manga (validatie!)
- [x] PUT /mangas/:id → update manga
- [x] DELETE /mangas/:id → verwijder manga
- [x] GET /news → lijst alle news
- [x] GET /news/:id → detail news
- [x] POST /news → nieuwe news (validatie!)
- [x] PUT /news/:id → update news
- [x] DELETE /news/:id → verwijder news

### 2️⃣ BASIS VALIDATIE (express-validator)
- [x] title, description: niet leeg, max 255 chars
- [x] release_date: geldige datum (YYYY-MM-DD)
- [x] Manga: title geen cijfers ✅
- [x] Manga: cover_image URL-formaat ✅
- [x] News: content min 20 chars ✅

### 3️⃣ PAGINATIE ENDPOINT
- [x] GET /mangas?limit=10&offset=20 ✅
- [x] GET /news?limit=10&offset=20 ✅

### 4️⃣ ZOEK ENDPOINT
- [x] GET /mangas?search=one+piece ✅
- [x] GET /news?search=... ✅

### 5️⃣ ROOT DOCUMENTATIE
- [x] GET / → HTML pagina met ALLE endpoints ✅
- [x] Methode, URL, params, voorbeeld response ✅
- [x] Twilio docs stijl ✅

## 🔥 EXTRA FEATURES VOOR 18-20/20

### GEAVANCEERDE VALIDATIE
- [x] release_date niet in toekomst voor mangas ✅
- [x] news.category uit enum: ['action','romance','comedy','drama'] ✅

### QUERY FEATURES
- [x] GET /mangas?sort=title&order=asc ✅
- [x] GET /mangas?category=action&limit=5 ✅ (filter op gerelateerde news category)
- [x] GET /news?category=action&limit=5 ✅

### AUTHENTICATIE (JWT)
- [x] Alleen geauthenticeerde users kunnen POST/PUT/DELETE ✅
- [x] Admin-only DELETE (check user.role === 'admin') ✅
- [x] POST /auth/register ✅
- [x] POST /auth/login ✅

### RELATIES
- [x] Manga heeft multiple News (news.manga_id foreign key) ✅
- [x] GET /mangas/:id toont gerelateerde news ✅

## 🛠 TECHNISCHE SPECS
- [x] NODE: v20+ (type: "module" in package.json) ✅
- [x] FRAMEWORK: Express.js ✅
- [x] DATABASE: MySQL (hergebruik Laravel DB: mangaverse database) ✅
- [x] HTTP STATUSCODES: 201, 400, 404, 401, 403, 500 ✅

## 📁 PROJECT STRUCTURE
- [x] manga-api/ folder ✅
- [x] package.json ✅
- [x] server.js (of app.js) ✅
- [x] .env (DB_HOST, DB_USER, etc) ✅
- [x] .gitignore (node_modules/) ✅
- [x] README.md ✅
- [x] routes/mangas.js ✅
- [x] routes/news.js ✅
- [x] controllers/mangaController.js ✅
- [x] controllers/newsController.js ✅
- [x] models/db.js (mysql2 connection) ✅
- [x] middleware/auth.js (JWT) ✅
- [x] middleware/validation.js ✅
- [x] public/index.html (root docs) ✅

## 📄 README.md INHOUD
- [x] MangaVerse API titel ✅
- [x] Installatie instructies ✅
- [x] Endpoints overzicht ✅
- [x] Link naar http://localhost:3000 ✅
- [x] Bronnen (Express docs, express-validator, mysql2, jsonwebtoken) ✅

## 🎥 SCREENCAST DEMO CHECKLIST
- [x] npm start → root docs pagina ✅
- [x] GET /mangas → JSON lijst ✅
- [x] POST /mangas (met validatie error) ✅
- [x] GET /mangas?limit=3&search=naruto ✅
- [x] JWT login → protected CRUD ✅
- [x] Admin delete ✅
- [x] PAGINATIE + SORT ✅
- [x] Relaties (manga met news) ✅

---

## ✅ CONCLUSIE: ALLES GEÏMPLEMENTEERD!

Alle vereisten uit de opdracht zijn volledig geïmplementeerd en getest.
=======
# ✅ Project Checklist - Mangaverse API

## Functionele Minimum Requirements

- [x] **Twee CRUD interfaces**
  - [x] Users: GET alle, GET één, POST, PUT/PATCH, DELETE
  - [x] Mangas: GET alle, GET één, POST, PUT/PATCH, DELETE

- [x] **Basisvalidatie**
  - [x] Velden mogen niet leeg zijn
  - [x] Numerieke velden accepteren geen strings
  - [x] Voornaam kan geen cijfers bevatten (regex validatie)
  - [x] E-mail validatie
  - [x] Lengte restricties

- [x] **Paginatie met limit en offset**
  - [x] GET /api/users?limit=10&offset=20
  - [x] GET /api/mangas?limit=10&offset=20

- [x] **Zoek-endpoints**
  - [x] GET /api/users?name=amine (zoeken op naam)
  - [x] GET /api/users?email=test@example.com (zoeken op email)
  - [x] GET /api/mangas?title=naruto (zoeken op titel)
  - [x] GET /api/mangas?genre=Action (zoeken op genre)

- [x] **Documentatiepagina op root**
  - [x] HTML pagina op GET /
  - [x] Beschrijving van alle endpoints
  - [x] Parameters en voorbeelden
  - [x] Response voorbeelden

## Extra Features (voor hoger cijfer)

- [x] **Geavanceerde validatie**
  - [x] Datum validatie (end_date moet na start_date liggen)
  - [x] Telefoonnummer formaat (+32 XXX XX XX XX)
  - [x] Lengte restricties (min/max)
  - [x] Regex validatie voor namen
  - [x] Unieke waarden (email)

- [x] **Verbeterde query-mogelijkheden**
  - [x] Zoeken op meerdere velden tegelijk
  - [x] Sorteren (?sort=created_at&order=desc)
  - [x] Combinatie van filteren, sorteren en paginatie
  - [x] Filteren op rating (min/max)
  - [x] Filteren op genre, status, etc.

## Technische Requirements

- [x] **Node.js versie 20 of later**
  - Getest met Node.js v22.19.0

- [x] **Express framework**
  - express ^4.18.2 geïnstalleerd

- [x] **Database gekoppeld**
  - MySQL met mysql2 package
  - Connection pooling geïmplementeerd

- [x] **Correcte HTTP-verbs**
  - GET, POST, PUT, PATCH, DELETE gebruikt

- [x] **Git en GitHub**
  - .gitignore bevat node_modules
  - README.md aanwezig
  - Klaar voor git init en commits

- [x] **README.md**
  - [x] Installatie-instructies
  - [x] Stappen om project te laten werken
  - [x] Bronvermelding
  - [x] Extra informatie (endpoints, validatie, etc.)

## Project Structuur

```
backend/
├── config/
│   ├── database.js          ✅ Database connectie configuratie
│   └── setupDatabase.js     ✅ Database tabellen aanmaken
├── controllers/
│   ├── mangasController.js  ✅ Manga CRUD operaties
│   └── usersController.js   ✅ User CRUD operaties
├── middleware/
│   └── validation.js        ✅ Validatie functies
├── routes/
│   ├── mangas.js            ✅ Manga routes
│   └── users.js             ✅ User routes
├── .env.example             ✅ Voorbeeld configuratie
├── .gitignore               ✅ Bevat node_modules
├── package.json             ✅ Dependencies en scripts
├── README.md                ✅ Volledige documentatie
└── server.js                ✅ Express server en documentatiepagina
```

## Status

✅ **Project is compleet en voldoet aan alle minimumvereisten**
✅ **Extra features geïmplementeerd voor hoger cijfer**
✅ **Klaar voor inzending**

## Nog te doen voor inzending:

1. ⏳ Git repository initialiseren en committen
2. ⏳ GitHub repository aanmaken en pushen
3. ⏳ Screencast opnemen met demonstratie
4. ⏳ API deployen (optioneel, maar aanbevolen)
>>>>>>> 59775988cc5591501086a0950bf39b14e17599d8


