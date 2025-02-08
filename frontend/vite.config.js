import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "./",  // Ensure correct asset paths in production
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
