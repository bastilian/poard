/// <reference types="vitest" />
/// <reference types="vite/client" />

import { join } from "node:path";
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: [
      { find: "~/", replacement: join(__dirname, "./app/") }
    ],
  },
})
