import react from "@vitejs/plugin-react";
import { rmSync } from "fs";
import path from "path";
import { defineConfig } from "vite";
import electron from "vite-electron-plugin";
import { customStart, loadViteEnv, copy } from "vite-electron-plugin/plugin";
import renderer from "vite-plugin-electron-renderer";
import pkg from "./package.json";

rmSync(path.join(__dirname, "dist-electron"), { recursive: true, force: true });

export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      common: path.join(__dirname, "common"),
      styles: path.join(__dirname, "src/assets/styles"),
    },
  },
  plugins: [
    react(),
    electron({
      include: ["electron", "preload"],
      transformOptions: {
        sourcemap: !!process.env.VSCODE_DEBUG,
      },
      plugins: [
        copy([
          {
            from: path.resolve(__dirname, "./common/**/*"),
            to: path.resolve(__dirname, "./dist-electron/common"),
          },
        ]),
        ...(process.env.VSCODE_DEBUG
          ? [
              // Will start Electron via VSCode Debug
              customStart(
                debounce(() =>
                  console.log(
                    /* For `.vscode/.debug.script.mjs` */ "[startup] Electron App"
                  )
                )
              ),
            ]
          : []),
        // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
        loadViteEnv(),
      ],
    }),
    // Use Node.js API in the Renderer-process
    renderer({
      nodeIntegration: true,
    }),
  ],
  server: process.env.VSCODE_DEBUG
    ? (() => {
        const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
        return {
          host: url.hostname,
          port: +url.port,
        };
      })()
    : undefined,
  clearScreen: false,
});

function debounce<Fn extends (...args: any[]) => void>(fn: Fn, delay = 299) {
  let t: NodeJS.Timeout;
  return ((...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  }) as Fn;
}
