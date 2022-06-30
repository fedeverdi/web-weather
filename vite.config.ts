import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return { 
    build: {
      minify: 'esbuild',
    lib: {
      entry: 'src/web-weather.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: mode === "production" ? "" : /^lit/
    }
  }
}
})
