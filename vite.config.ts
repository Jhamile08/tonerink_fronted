import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tamaguiPlugin } from '@tamagui/vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    tamaguiPlugin({
      config: './src/tamagui.config.ts',
      components: ['tamagui'],
    }),
  ],
  server: {
    port: 5173,
    // La API vive en otro dominio y no habilita CORS para localhost, así que
    // en desarrollo se consume a través de este proxy (ver src/api/urls.ts).
    proxy: {
      '/api': {
        target: 'https://api.tonerinksas.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    port: 4173,
    proxy: {
      '/api': {
        target: 'https://api.tonerinksas.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
