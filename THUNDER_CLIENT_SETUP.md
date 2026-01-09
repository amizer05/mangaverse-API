# 🎬 Thunder Client Setup voor Screencast

## STAP 3: Thunder Client Environment

1. **Open Thunder Client** (VS Code extension)
2. **Klik op GLOBE icoon** (Environment) in Thunder Client sidebar
3. **New Environment** → Naam: `Demo`
4. **Voeg variabelen toe:**
   - Key: `base_url` → Value: `http://localhost:3000`
   - Key: `token` → Value: `(leeg, wordt later ingevuld)`
5. **Save** → **Selecteer "Demo" environment**

---

## STAP 4: Collection + 10 Requests

### **New Collection → "🎬 Screencast Demo"**

### 1️⃣ GET Mangas
```
Method: GET
URL: {{base_url}}/mangas
Save → Send
```

### 2️⃣ POST Register
```
Method: POST
URL: {{base_url}}/auth/register
Headers: Content-Type: application/json
Body (JSON):
{
  "email": "demo@test.com",
  "password": "demo123",
  "role": "admin"
}
Save → Send
```

### 3️⃣ POST Login
```
Method: POST
URL: {{base_url}}/auth/login
Headers: Content-Type: application/json
Body (JSON):
{
  "email": "demo@test.com",
  "password": "demo123"
}
Save → Send

⚠️ BELANGRIJK: Kopieer de token uit de response en plak in Environment → token veld → Save
```

### 4️⃣ POST Manga ✅
```
Method: POST
URL: {{base_url}}/mangas
Headers: 
  - Content-Type: application/json
  - Authorization: Bearer {{token}}
Body (JSON):
{
  "title": "Naruto",
  "description": "Ninja story",
  "release_date": "2002-09-21"
}
Save → Send
```

### 5️⃣ Validatie ❌ (Title met cijfers)
```
Method: POST
URL: {{base_url}}/mangas
Headers: 
  - Content-Type: application/json
  - Authorization: Bearer {{token}}
Body (JSON):
{
  "title": "Naruto 1 ❌",
  "description": "Error",
  "release_date": "2020-01-01"
}
Save → Send
[Verwacht: 400 Bad Request - Title cannot contain numbers]
```

### 6️⃣ Paginatie
```
Method: GET
URL: {{base_url}}/mangas?limit=2&offset=0
Save → Send
```

### 7️⃣ Zoeken
```
Method: GET
URL: {{base_url}}/mangas?search=naruto
Save → Send
```

### 8️⃣ Relaties (Manga met News)
```
Method: GET
URL: {{base_url}}/mangas/1
Save → Send
[Toont manga met news array]
```

### 9️⃣ POST News
```
Method: POST
URL: {{base_url}}/news
Headers: 
  - Content-Type: application/json
  - Authorization: Bearer {{token}}
Body (JSON):
{
  "title": "Ch100",
  "content": "Chapter 100! Long enough text for validation minimum 20 characters.",
  "category": "action",
  "manga_id": 1
}
Save → Send
```

### 🔟 DELETE Admin
```
Method: DELETE
URL: {{base_url}}/mangas/1
Headers: Authorization: Bearer {{token}}
Save → Send
[Verwacht: 200 OK of 204 No Content]
```

---

## ✅ Test Script (voor verificatie)

Alle requests zijn hieronder getest. Gebruik deze om te verifiëren dat alles werkt:

```bash
# 1. GET Mangas
curl http://localhost:3000/mangas

# 2. Register
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@test.com","password":"demo123","role":"admin"}'

# 3. Login (kopieer token!)
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@test.com","password":"demo123"}'

# 4. POST Manga (vervang TOKEN)
curl -X POST http://localhost:3000/mangas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Naruto","description":"Ninja story","release_date":"2002-09-21"}'

# 5. Validatie Error
curl -X POST http://localhost:3000/mangas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Naruto 1","description":"Error","release_date":"2020-01-01"}'

# 6. Paginatie
curl "http://localhost:3000/mangas?limit=2&offset=0"

# 7. Zoeken
curl "http://localhost:3000/mangas?search=naruto"

# 8. Relaties
curl http://localhost:3000/mangas/1

# 9. POST News
curl -X POST http://localhost:3000/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Ch100","content":"Chapter 100! Long enough text for validation minimum 20 characters.","category":"action","manga_id":1}'

# 10. DELETE
curl -X DELETE http://localhost:3000/mangas/1 \
  -H "Authorization: Bearer TOKEN"
```
