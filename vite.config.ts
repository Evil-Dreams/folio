import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { allowedHosts: ['elastic-curdle-passing.ngrok-free.dev'] },
  preview: { allowedHosts: ['.ngrok-free.dev'] },
  test: { environment: 'jsdom', setupFiles: './src/test/setup.ts' },
})
