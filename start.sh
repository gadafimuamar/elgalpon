#!/bin/sh
# ============================================================================
#  El Galpón — Script de inicio unificado
#  Detecta si Bun está instalado y lo usa; si no, usa npm.
#  Uso:
#    chmod +x start.sh
#    ./start.sh
# ============================================================================

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║        El Galpón — Iniciando servidor de desarrollo         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Asegurar que existe el directorio de DB
mkdir -p data

if command -v bun > /dev/null 2>&1; then
  echo "➤ Usando Bun ($(bun --version))"
  echo "➤ Instalando dependencias (si es necesario)..."
  bun install
  echo ""
  echo "➤ Iniciando servidor en http://localhost:5173"
  echo "  (Presioná Ctrl+C para detener)"
  echo ""
  exec bun run dev
else
  echo "➤ Bun no encontrado. Usando npm."
  echo "   (Puedes instalar Bun con: curl -fsSL https://bun.sh/install | sh)"
  echo ""
  echo "➤ Instalando dependencias..."
  npm install
  echo ""
  echo "➤ Iniciando servidor en http://localhost:5173"
  echo "  (Presioná Ctrl+C para detener)"
  echo ""
  exec npm run dev
fi
