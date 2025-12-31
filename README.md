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
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

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

