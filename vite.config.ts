import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        // target: 'https://172.16.1.160:9443/gateway', // 孙一平
        // target: 'https://172.16.1.59:9443/gateway', // 曹杰凯锋
        // target: 'https://172.16.1.70:9443/gateway', // 高派
        // target: 'https://172.16.1.69:9443/gateway', // 海虹
        // target: 'https://172.16.1.68:9443/gateway', // 于飞
        // target: 'https://172.16.1.62:9443/gateway', // 许小可
        // target: 'https://172.16.1.171:9443/gateway', // 项磊
        // target: 'https://testapi.ruijiakeyun.com/gateway', // 测试
        target: "https://test-api.ruijiakeyun.com:2643/gateway-app", // 测试环境
        // target: "https://dev-api.ruijiakeyun.com:9443/gateway", // 测试
        // target: 'https://dev-api.ruijiakeyun.com:9443/gateway', // 测试
        // target: 'https://192.168.11.203:9443/gateway', // 项磊2
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/upload": {
        target: "https://api.ruijiakeyun.com:9443/gateway",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/upload/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
        api: "modern-compiler",
      },
    },
  },
  plugins: [uni()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  esbuild: {
    // drop: ['console', 'debugger']
  },
});
