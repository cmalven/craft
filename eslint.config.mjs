import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  eslintConfigPrettier,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ignores: ['/templates/**/*.twig', '/src/**/*.html'],
    rules: {
      camelcase: 'warn',
      'max-nested-callbacks': ['error', 3],
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
);
