import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  plugins: [
    devtools(),
    TanStackRouterVite(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    viteReact(),
  ],
  build: {
    outDir: '../backend/static',
    emptyOutDir: true,
    target: 'esnext'
  },
  server: {
    proxy: {
      "/content/": "http://localhost:50505",
      "/auth_setup": "http://localhost:50505",
      "/.auth/me": "http://localhost:50505",
      "/ask": "http://localhost:50505",
      "/chat": "http://localhost:50505",
      "/speech": "http://localhost:50505",
      "/config": "http://localhost:50505",
      "/upload": "http://localhost:50505",
      "/delete_uploaded": "http://localhost:50505",
      "/list_uploaded": "http://localhost:50505",
      "/chat_history": "http://localhost:50505"
    }
  }
})

export default config
