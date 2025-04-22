import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5175,
//   },
// })

export default defineConfig({
  base: '/ghg-test/',  // ✅ 리포지토리 이름
  plugins: [react()],
})
