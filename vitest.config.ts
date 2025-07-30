import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['test/**/*.{test,spec,bench}.ts'],
    exclude: ['node_modules/**', 'dist/**', '.next/**'],
    globals: true,
    environment: 'node',
    testTimeout: 300000, // 30 seconds
    hookTimeout: 60000, // 10 seconds
    teardownTimeout: 60000, // 10 seconds
  },
});
