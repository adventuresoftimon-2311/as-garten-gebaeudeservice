import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gartenpflege: resolve(__dirname, 'gartenpflege.html'),
        gebaeudereinigung: resolve(__dirname, 'gebaeudereinigung.html'),
        preise: resolve(__dirname, 'preise.html'),
        ueberUns: resolve(__dirname, 'ueber-uns.html'),
        kontakt: resolve(__dirname, 'kontakt.html'),
        impressum: resolve(__dirname, 'impressum.html'),
        datenschutz: resolve(__dirname, 'datenschutz.html'),
      },
    },
  },
})
