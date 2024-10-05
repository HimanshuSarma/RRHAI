import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      Pages: path.resolve(__dirname, "./src/Pages"),
      components: path.resolve(__dirname, "./src/components"),
      api: path.resolve(__dirname, "./src/api"),
      themes: path.resolve(__dirname, "./src/themes"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
  plugins: [react()],
});
