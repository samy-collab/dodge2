import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'node_modules/**',
      '**/dist/**',
      'build/**',
      'coverage/**',
      'backend/generated/**',
      'playwright-report/**',
      'test-results/**',
      '**/*.js',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
];
