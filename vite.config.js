import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()], // Agrega Tailwind correctamente
    },
  },
  base: './', // Usa rutas relativas para evitar problemas en Vercel
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true, // Permite navegación en Vercel
  },
});
