import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT ?? "5173";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

const artifactRoot = path.resolve(import.meta.dirname);

const ensureModuleEntrypoint = (isBuild: boolean) => ({
  name: "ensure-module-entrypoint",
  transformIndexHtml(html: string) {
    if (html.includes('src="/src/main.tsx"')) {
      return html;
    }

    return {
      html,
      tags: [
        {
          tag: "script",
          attrs: {
            type: "module",
            src: isBuild ? "/assets/app.js" : "/src/main.tsx",
          },
          injectTo: "body",
        },
      ],
    };
  },
});

export default defineConfig(async ({ command }) => {
  const isBuild = command === "build";

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      ensureModuleEntrypoint(isBuild),
      runtimeErrorOverlay(),
      ...(process.env.NODE_ENV !== "production" &&
      process.env.REPL_ID !== undefined
        ? [
            await import("@replit/vite-plugin-cartographer").then((m) =>
              m.cartographer({
                root: path.resolve(artifactRoot, ".."),
              }),
            ),
            await import("@replit/vite-plugin-dev-banner").then((m) =>
              m.devBanner(),
            ),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(artifactRoot, "src"),
        "@assets": path.resolve(artifactRoot, "..", "..", "attached_assets"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: artifactRoot,
    build: {
      outDir: path.resolve(artifactRoot, "dist/public"),
      emptyOutDir: true,
      ...(isBuild
        ? {
            rollupOptions: {
              input: {
                index: path.resolve(artifactRoot, "index.html"),
                app: path.resolve(artifactRoot, "src/main.tsx"),
              },
              output: {
                entryFileNames: "assets/[name].js",
              },
            },
          }
        : {}),
    },
    server: {
      port,
      strictPort: true,
      host: "0.0.0.0",
      allowedHosts: true,
      fs: {
        strict: true,
      },
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
