#!/bin/bash

# Colors voor output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3000"

echo "🧪 Mangaverse API Test Script"
echo "=============================="
echo ""

# Test 1: Server status
echo "1️⃣  Test: Server Status"
if curl -s -o /dev/null -w "%{http_code}" $BASE_URL/ | grep -q "200"; then
    echo -e "${GREEN}✅ Server draait${NC}"
else
    echo -e "${RED}❌ Server draait niet!${NC}"
    echo "   Start de server met: npm start"
    exit 1
fi
echo ""

# Test 2: Documentatie pagina
echo "2️⃣  Test: Documentatie Pagina"
if curl -s $BASE_URL/ | grep -q "Mangaverse API"; then
    echo -e "${GREEN}✅ Documentatie pagina werkt${NC}"
else
    echo -e "${RED}❌ Documentatie pagina werkt niet${NC}"
fi
echo ""

# Test 3: Users - GET alle users
echo "3️⃣  Test: GET /api/users"
RESPONSE=$(curl -s -w "\n%{http_code}" $BASE_URL/api/users)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ GET /api/users werkt${NC}"
    echo "   Response: $(echo "$RESPONSE" | head -n1 | jq -r '.success // "geen JSON"')"
else
    echo -e "${YELLOW}⚠️  GET /api/users geeft code: $HTTP_CODE${NC}"
    echo "   (Dit is normaal als er nog geen users in de database staan)"
fi
echo ""

# Test 4: Users - POST nieuwe user
echo "4️⃣  Test: POST /api/users (nieuwe user aanmaken)"
USER_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST $BASE_URL/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "last_name": "User",
    "email": "test@example.com",
    "phone": "+32 444 44 44 44",
    "role": "user"
  }')
USER_HTTP_CODE=$(echo "$USER_RESPONSE" | tail -n1)
if [ "$USER_HTTP_CODE" = "201" ]; then
    echo -e "${GREEN}✅ POST /api/users werkt${NC}"
    USER_ID=$(echo "$USER_RESPONSE" | head -n1 | jq -r '.data.id // "geen ID"')
    echo "   Gebruiker aangemaakt met ID: $USER_ID"
else
    echo -e "${YELLOW}⚠️  POST /api/users geeft code: $USER_HTTP_CODE${NC}"
    echo "   Response: $(echo "$USER_RESPONSE" | head -n1)"
fi
echo ""

# Test 5: Users - GET user by ID
if [ ! -z "$USER_ID" ] && [ "$USER_ID" != "geen ID" ]; then
    echo "5️⃣  Test: GET /api/users/:id"
    GET_USER_RESPONSE=$(curl -s -w "\n%{http_code}" $BASE_URL/api/users/$USER_ID)
    GET_USER_CODE=$(echo "$GET_USER_RESPONSE" | tail -n1)
    if [ "$GET_USER_CODE" = "200" ]; then
        echo -e "${GREEN}✅ GET /api/users/:id werkt${NC}"
    else
        echo -e "${RED}❌ GET /api/users/:id geeft code: $GET_USER_CODE${NC}"
    fi
    echo ""
fi

# Test 6: Users - Zoeken
echo "6️⃣  Test: GET /api/users?name=Test (zoeken)"
SEARCH_RESPONSE=$(curl -s -w "\n%{http_code}" "$BASE_URL/api/users?name=Test")
SEARCH_CODE=$(echo "$SEARCH_RESPONSE" | tail -n1)
if [ "$SEARCH_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Zoeken op naam werkt${NC}"
else
    echo -e "${YELLOW}⚠️  Zoeken geeft code: $SEARCH_CODE${NC}"
fi
echo ""

# Test 7: Users - Paginatie
echo "7️⃣  Test: GET /api/users?limit=5&offset=0 (paginatie)"
PAGE_RESPONSE=$(curl -s -w "\n%{http_code}" "$BASE_URL/api/users?limit=5&offset=0")
PAGE_CODE=$(echo "$PAGE_RESPONSE" | tail -n1)
if [ "$PAGE_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Paginatie werkt${NC}"
else
    echo -e "${YELLOW}⚠️  Paginatie geeft code: $PAGE_CODE${NC}"
fi
echo ""

# Test 8: Mangas - GET alle mangas
echo "8️⃣  Test: GET /api/mangas"
MANGA_RESPONSE=$(curl -s -w "\n%{http_code}" $BASE_URL/api/mangas)
MANGA_CODE=$(echo "$MANGA_RESPONSE" | tail -n1)
if [ "$MANGA_CODE" = "200" ]; then
    echo -e "${GREEN}✅ GET /api/mangas werkt${NC}"
else
    echo -e "${YELLOW}⚠️  GET /api/mangas geeft code: $MANGA_CODE${NC}"
    echo "   (Dit is normaal als er nog geen mangas in de database staan)"
fi
echo ""

# Test 9: Mangas - POST nieuwe manga (als er een user is)
if [ ! -z "$USER_ID" ] && [ "$USER_ID" != "geen ID" ]; then
    echo "9️⃣  Test: POST /api/mangas (nieuwe manga toevoegen)"
    MANGA_POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST $BASE_URL/api/mangas \
      -H "Content-Type: application/json" \
      -d "{
        \"title\": \"One Piece\",
        \"description\": \"Het verhaal volgt Monkey D. Luffy en zijn piratencrew op hun zoektocht naar de One Piece schat.\",
        \"genre\": \"Action\",
        \"status\": \"ongoing\",
        \"rating\": 9.8,
        \"release_date\": \"1997-07-22\",
        \"added_by_id\": $USER_ID
      }")
    MANGA_POST_CODE=$(echo "$MANGA_POST_RESPONSE" | tail -n1)
    if [ "$MANGA_POST_CODE" = "201" ]; then
        echo -e "${GREEN}✅ POST /api/mangas werkt${NC}"
        MANGA_ID=$(echo "$MANGA_POST_RESPONSE" | head -n1 | jq -r '.data.id // "geen ID"')
        echo "   Manga toegevoegd met ID: $MANGA_ID"
    else
        echo -e "${YELLOW}⚠️  POST /api/mangas geeft code: $MANGA_POST_CODE${NC}"
        echo "   Response: $(echo "$MANGA_POST_RESPONSE" | head -n1)"
    fi
    echo ""
fi

# Test 10: Validatie test - foutieve data
echo "🔟 Test: Validatie (foutieve data)"
VALIDATION_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST $BASE_URL/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "",
    "last_name": "Test",
    "email": "geen-email"
  }')
VALIDATION_CODE=$(echo "$VALIDATION_RESPONSE" | tail -n1)
if [ "$VALIDATION_CODE" = "400" ]; then
    echo -e "${GREEN}✅ Validatie werkt (foutieve data wordt afgewezen)${NC}"
else
    echo -e "${YELLOW}⚠️  Validatie test geeft code: $VALIDATION_CODE${NC}"
fi
echo ""

echo "=============================="
echo "✅ Testen voltooid!"
echo ""
echo "📖 Bekijk de volledige documentatie op: $BASE_URL/"


