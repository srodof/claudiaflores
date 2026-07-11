import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const portable = mode === 'portable'
  return {
    plugins: [react(), ...(portable ? [viteSingleFile()] : [])],
    build: portable
      ? {
          // Incrusta también las fotos (WebP) como base64 en vez de archivos aparte,
          // para que el resultado sea un único .html sin dependencias externas.
          assetsInlineLimit: 100 * 1024 * 1024,
          cssCodeSplit: false,
          outDir: 'dist-portable',
        }
      : undefined,
  }
})
