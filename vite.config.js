import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      // jsx 파일에 대해 올바른 MIME 타입을 설정합니다.
      'application/javascript': ['.jsx'],
    },
  },
})
