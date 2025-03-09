import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '', // Intenta sin './' para evitar problemas con los estilos
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true, // Asegura que las rutas de React funcionen correctamente
  },
});
