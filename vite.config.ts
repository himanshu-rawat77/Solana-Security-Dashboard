import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      stream: "stream-browserify",
      buffer: "buffer",
    },
  },
  define: {
    'process.env.SOLANA_RPC_ENDPOINT': JSON.stringify(process.env.SOLANA_RPC_ENDPOINT || 'https://api.devnet.solana.com'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.HELIUS_API_KEY': JSON.stringify(process.env.HELIUS_API_KEY),
    'global': 'globalThis',
  }
});
