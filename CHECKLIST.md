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


