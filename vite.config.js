import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          tags: {
            'v-img': ['src'],  //<----- add v-img
            // default values will be overridden if not repeated:
            video: ["src", "poster"],
            source: ["src"],
            img: ["src"],
            image: ["xlink:href", "href"],
            use: ["xlink:href", "href"],
          }
        }
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
