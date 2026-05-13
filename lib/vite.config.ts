import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        dts({
            outDir: "dist",
            rollupTypes: true
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "InternetArchiveApi",
            fileName: "internet-archive-api",
        },
        rollupOptions: {
            output: [{
                entryFileNames: "internet-archive-api.js",
                format: "esm",
            },
            {
                entryFileNames: "internet-archive-api.cjs",
                format: "cjs",
            }],
            external: ["tslib"],
        },
        target: "esnext"
    }
});
