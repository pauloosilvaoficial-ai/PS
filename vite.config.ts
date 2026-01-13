
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Permite que o código use process.env como o Netlify espera
    'process.env': process.env
  }
});
