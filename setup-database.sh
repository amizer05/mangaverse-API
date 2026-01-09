#!/bin/bash

echo "🗄️  Database Setup Script"
echo "========================"
echo ""

# Wacht tot MySQL beschikbaar is (max 30 seconden)
echo "⏳ Wachten tot MySQL beschikbaar is..."
MAX_ATTEMPTS=30
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if mysql -u root -e "SELECT 1" >/dev/null 2>&1; then
        echo "✅ MySQL is bereikbaar!"
        break
    fi
    ATTEMPT=$((ATTEMPT + 1))
    echo "   Poging $ATTEMPT/$MAX_ATTEMPTS..."
    sleep 1
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
    echo "❌ MySQL is niet bereikbaar na 30 seconden"
    echo "   Zorg dat MySQL draait en probeer opnieuw"
    exit 1
fi

# Maak database aan
echo ""
echo "📝 Database aanmaken..."
mysql -u root << 'SQL'
CREATE DATABASE IF NOT EXISTS nodejs_api;
SHOW DATABASES LIKE 'nodejs_api';
SQL

if [ $? -eq 0 ]; then
    echo "✅ Database 'nodejs_api' is aangemaakt of bestaat al!"
else
    echo "❌ Fout bij aanmaken database"
    exit 1
fi

echo ""
echo "🎉 Klaar! Database is gereed."
echo "   Je kunt nu je Node.js server herstarten: npm start"
