import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.config.js',
        'dist/',
      ],
    },
  },
  resolve: {
    alias: {
      "#components": resolve(dirname(fileURLToPath(import.meta.url)), 'src/components'),
      "#constants": resolve(dirname(fileURLToPath(import.meta.url)), 'src/constants'),
      "#store": resolve(dirname(fileURLToPath(import.meta.url)), 'src/store'),
      "#hoc": resolve(dirname(fileURLToPath(import.meta.url)), 'src/hoc'),
      "#windows": resolve(dirname(fileURLToPath(import.meta.url)), 'src/windows'),
    }
  }
});