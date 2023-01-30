import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, "./");
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      modules: {
        generateScopedName: "[local]-[hash]",
        localsConvention: "camelCaseOnly",
      },
      preprocessorOptions: {
        less: {
          modifyVars: {
            "primary-color": "#2F69FF",
          },
          javascriptEnabled: true,
        },
      },
    },
    server: {
      hmr: true,
      proxy: {
        "/api": {
          target: config.VITE_API_HOST,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
