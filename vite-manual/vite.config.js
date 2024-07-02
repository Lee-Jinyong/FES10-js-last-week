import { defineConfig } from "vite";
import { resolve } from "node:path";

const env = process.env.NODE_ENV;

console.log(env);

const viteConfig = defineConfig({
  build: {
    outDir: "docs",
  },
  server: {
    host: "localhost",
    port: 3000,
    cors: true,
  },
  css: {
    devSourcemap: true,
    modules: {
      generateScopedName:
        env === "development"
          ? "[name]__[local]__[hash:base64:2]"
          : "[local]__[hash:base64:2]",
    },
  },
  resolve: {
    // alias: { "@": "어떤 경로를 찾아서" }
    alias: { "@": resolve(__dirname, "src") },
  },
});

export default viteConfig;
