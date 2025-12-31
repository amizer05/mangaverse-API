#!/bin/bash

echo "🔧 MySQL Starten via Herd..."
echo ""

# Methode 1: Probeer via Herd CLI (als beschikbaar)
if command -v herd &> /dev/null; then
    echo "✅ Herd CLI gevonden, starten MySQL..."
    herd start mysql 2>/dev/null || echo "⚠️  Kon MySQL niet starten via herd CLI"
fi

# Methode 2: Probeer via open command (opent Herd GUI)
echo ""
echo "📱 Probeer Laravel Herd GUI te openen..."
echo "   (Je moet handmatig MySQL aanzetten in Herd)"
open -a "Laravel Herd" 2>/dev/null || open /Applications/Herd.app 2>/dev/null || echo "⚠️  Kon Herd niet openen"

echo ""
echo "⏳ Wacht 3 seconden en check dan of MySQL draait..."
sleep 3

# Check of MySQL nu draait
if lsof -i :3306 > /dev/null 2>&1; then
    echo "✅ MySQL draait nu op poort 3306!"
else
    echo "❌ MySQL draait nog steeds niet"
    echo "   Open Laravel Herd handmatig en zet MySQL aan in Services"
fi
