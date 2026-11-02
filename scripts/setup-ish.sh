#!/bin/sh
# ============================================================================
#  El Galpón — Script de instalación para iSH Shell (iOS)
#  Nota: Bun puede no estar disponible en iSH (musl). Esta versión usa
#        Node.js + Vite directamente. Para usar Bun, instalar manualmente:
#          curl -fsSL https://bun.sh/install | sh
#  Uso:
#    chmod +x setup-ish.sh
#    ./setup-ish.sh
# ============================================================================

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  El Galpón — Instalación para iSH Shell (iOS)              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# 1. Actualizar repositorios
echo "➤ Actualizando repositorios..."
apk update

# 2. Instalar Node.js y npm
echo "➤ Instalando Node.js y npm..."
apk add --no-cache nodejs npm

# 3. Verificar versiones
echo "   Node: $(node --version)"
echo "   npm:  $(npm --version)"

# 4. Si no está clonado, clonar el repositorio
if [ ! -f "package.json" ]; then
  echo ""
  echo "➤ El directorio no parece un repositorio. Clonando..."
  read -p "URL del repositorio [https://github.com/tu-usuario/elgalpon.git]: " REPO_URL
  REPO_URL="${REPO_URL:-https://github.com/tu-usuario/elgalpon.git}"
  git clone "$REPO_URL" .
fi

# 5. Instalar dependencias con npm (usa el lock de Bun pero npm resuelve)
echo ""
echo "➤ Instalando dependencias de proyecto..."
npm install

# 6. Crear directorio de base de datos
mkdir -p data

# 7. (Opcional) Instalar Bun si está disponible
echo ""
echo "➤ (Opcional) Si querés usar Bun en cambio de npm, ejecutá:"
echo "   curl -fsSL https://bun.sh/install | sh"
echo "   Luego: bun install && bun run dev"
echo ""

# 8. Verificar que todo está listo
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ¡Listo! 이제 실행할 수 있습니다.                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Para ejecutar el servidor de desarrollo (con npm):"
echo "  $ npm run dev"
echo ""
echo "Para usar Bun (si instalaste Bun):"
echo "  $ bun run dev"
echo ""
echo "Luego abrí el navegador en:"
echo "  http://localhost:5173"
echo ""
echo "La base de datos SQLite se creará automáticamente en:"
echo "  ./data/orders.sqlite"
echo ""
echo "Para detener el servidor: Ctrl+C"
echo ""
