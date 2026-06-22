import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Build optimizations
  build: {
    // Use esbuild for faster minification
    minify: 'esbuild',

    // Target modern browsers for better performance
    target: 'es2015',

    // Disable gzip-computed size reporting to save memory on CI (e.g. Cloudflare Pages)
    reportCompressedSize: false,

    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
            return 'three';
          }
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
            return 'vendor';
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'animations';
          }
          if (id.includes('node_modules/@radix-ui/')) {
            return 'ui';
          }
        },
      },
    },

    // Increase chunk size warning limit (Three.js is large)
    chunkSizeWarningLimit: 1000,

    // Enable source maps for debugging (disable in production if needed)
    sourcemap: mode !== 'production',
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['three'], // Three.js will be loaded on demand
  },
}));