import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv';
var env = dotenv.config(); // Load environment variables from .env file


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    // Define environment variables for your application code
    'process.env.API_HOST': JSON.stringify(env.parsed.API_HOST),
  },
})
