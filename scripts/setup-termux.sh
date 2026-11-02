#!/data/data/com.termux/files/usr/bin/bash
# ============================================================================
#  El Galpón — Script de instalación para Termux (Android)
#  Uso:
#    chmod +x setup-termux.sh
#    ./setup-termux.sh
# ============================================================================

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  El Galpón — Instalación para Termux                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# 1. Actualizar repositorios
echo "➤ Actualizando repositorios..."
pkg update -y

# 2. Instalar dependencias base (git, node, etc.)
echo "➤ Instalando dependencias base..."
pkg install -y git nodejs

# 3. Instalar Bun (binario oficial de la web)
echo "➤ Instalando Bun..."
if ! command -v bun &> /dev/null; then
  curl -fsSL https://bun.sh/install | bash
  # Asegurar que Bun esté en PATH (Termux usa ~/.bashrc o ~/.zshrc)
  export BUN_INSTALL="$HOME/.bun"
  export PATH="$BUN_INSTALL/bin:$PATH"
  echo "export BUN_INSTALL=\"$HOME/.bun\"" >> ~/.bashrc
  echo "export PATH=\"\$BUN_INSTALL/bin:\$PATH\"" >> ~/.bashrc
else
  echo "   ✓ Bun ya instalado: $(bun --version)"
fi

# 4. Verificar Bun
bun --version

# 5. Si no está clonado, clonar el repositorio
if [ ! -f "package.json" ]; then
  echo ""
  echo "➤ El directorio no parece un repositorio. Clonando..."
  echo "   (Usa tu propio URL de repo si es necesario)"
  read -p "URL del repositorio [https://github.com/tu-usuario/elgalpon.git]: " REPO_URL
  REPO_URL="${REPO_URL:-https://github.com/tu-usuario/elgalpon.git}"
  git clone "$REPO_URL" .
fi

# 6. Instalar dependencias de Node
echo ""
echo "➤ Instalando dependencias de proyecto..."
bun install

# 7. Crear directorio de base de datos si no existe
mkdir -p data

# 8. Verificar que todo está listo
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ¡Listo! 이제 실행할 수 있습니다.                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Para ejecutar el servidor de desarrollo:"
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
