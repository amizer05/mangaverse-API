#!/bin/bash
echo "🔍 MySQL Status Check"
echo "===================="
echo ""

# Check MySQL via Homebrew
if command -v brew &> /dev/null; then
    echo "1. Homebrew MySQL Status:"
    brew services list | grep mysql || echo "   MySQL niet via Homebrew geïnstalleerd"
    echo ""
fi

# Check MySQL process
echo "2. MySQL Process:"
if pgrep -x mysqld > /dev/null; then
    echo "   ✅ MySQL proces draait (mysqld)"
else
    echo "   ❌ MySQL proces draait NIET"
fi
echo ""

# Check poort 3306
echo "3. Poort 3306 Status:"
if lsof -i :3306 > /dev/null 2>&1; then
    echo "   ✅ Poort 3306 is in gebruik (waarschijnlijk MySQL)"
    lsof -i :3306 | head -2
else
    echo "   ❌ Poort 3306 is NIET in gebruik"
fi
echo ""

# Check MySQL command
echo "4. MySQL Command:"
if command -v mysql &> /dev/null; then
    echo "   ✅ MySQL command gevonden: $(which mysql)"
    mysql --version 2>/dev/null || echo "   ⚠️  MySQL command gevonden maar werkt niet"
else
    echo "   ❌ MySQL command niet gevonden"
fi
echo ""

echo "💡 Tips:"
echo "   - Als MySQL niet draait: brew services start mysql (via Homebrew)"
echo "   - Of start MySQL via Laravel Herd / XAMPP / MAMP"
echo "   - Check je .env bestand voor database configuratie"
