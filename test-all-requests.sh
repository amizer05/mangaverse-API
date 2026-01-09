#!/bin/bash

# 🎬 Test Script voor Screencast Demo
# Voer dit uit om alle requests te testen VOOR opname

BASE_URL="http://localhost:3000"
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🎬 Testing all screencast requests..."
echo ""

# 1. GET Mangas
echo "1️⃣ GET Mangas"
curl -s "$BASE_URL/mangas" | python3 -m json.tool 2>/dev/null | head -10 || curl -s "$BASE_URL/mangas" | head -5
echo ""
echo "---"
echo ""

# 2. Register
echo "2️⃣ POST Register"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@test.com","password":"demo123","role":"admin"}')
echo "$REGISTER_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$REGISTER_RESPONSE"
echo ""
echo "---"
echo ""

# 3. Login
echo "3️⃣ POST Login"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@test.com","password":"demo123"}')
echo "$LOGIN_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$LOGIN_RESPONSE"

# Extract token
TOKEN=$(echo "$LOGIN_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])" 2>/dev/null)

if [ -z "$TOKEN" ]; then
  echo -e "${RED}❌ Token niet gevonden! Check login response.${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}✅ Token: ${TOKEN:0:50}...${NC}"
echo ""
echo "---"
echo ""

# 4. POST Manga
echo "4️⃣ POST Manga ✅"
curl -s -X POST "$BASE_URL/mangas" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Naruto","description":"Ninja story","release_date":"2002-09-21"}' | python3 -m json.tool 2>/dev/null | head -15 || echo "Response received"
echo ""
echo "---"
echo ""

# 5. Validatie Error
echo "5️⃣ Validatie ❌ (Title met cijfers)"
curl -s -X POST "$BASE_URL/mangas" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Naruto 1 ❌","description":"Error","release_date":"2020-01-01"}' | python3 -m json.tool 2>/dev/null || echo "Error response"
echo ""
echo "---"
echo ""

# 6. Paginatie
echo "6️⃣ Paginatie"
curl -s "$BASE_URL/mangas?limit=2&offset=0" | python3 -m json.tool 2>/dev/null | head -15 || echo "Response received"
echo ""
echo "---"
echo ""

# 7. Zoeken
echo "7️⃣ Zoeken"
curl -s "$BASE_URL/mangas?search=naruto" | python3 -m json.tool 2>/dev/null | head -15 || echo "Response received"
echo ""
echo "---"
echo ""

# 8. Relaties
echo "8️⃣ Relaties (Manga met News)"
curl -s "$BASE_URL/mangas/1" | python3 -m json.tool 2>/dev/null | head -20 || echo "Response received"
echo ""
echo "---"
echo ""

# 9. POST News
echo "9️⃣ POST News"
curl -s -X POST "$BASE_URL/news" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Ch100","content":"Chapter 100! Long enough text for validation minimum 20 characters.","category":"action","manga_id":1}' | python3 -m json.tool 2>/dev/null | head -15 || echo "Response received"
echo ""
echo "---"
echo ""

# 10. DELETE (optioneel - skip als je data wilt behouden)
echo "🔟 DELETE Admin (SKIP - comment out om data te behouden)"
# curl -s -X DELETE "$BASE_URL/mangas/1" \
#   -H "Authorization: Bearer $TOKEN" | python3 -m json.tool 2>/dev/null || echo "Deleted"
echo "Skipped (uncomment in script om te testen)"
echo ""

echo -e "${GREEN}✅ Alle requests getest!${NC}"
echo ""
echo "📝 Gebruik deze TOKEN in Thunder Client Environment:"
echo "$TOKEN"
