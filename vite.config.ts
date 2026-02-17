import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    historyApiFallback: true,
    middlewareMode: false,
    // Para garantir fallback SPA em dev
    configureServer: [
      ({ middlewares }) => {
        middlewares.use((req, res, next) => {
          if (req.url && !req.url.startsWith('/@') && !req.url.startsWith('/src') && !req.url.includes('.') && req.method === 'GET') {
            req.url = '/index.html';
          }
          next();
        });
      }
    ]
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
});
