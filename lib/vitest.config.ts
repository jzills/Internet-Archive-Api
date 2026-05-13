import process from "process";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
    test: {
        env: loadEnv(mode, process.cwd(), ""),
        include: ["test/unit/**/*.test.ts"],
        setupFiles: ["./test/setup.ts", "./test/unit/setup.ts"],
        maxWorkers: 1,
        testTimeout: 15000,
    },
}));
