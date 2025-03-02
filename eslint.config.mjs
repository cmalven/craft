import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  eslintConfigPrettier,

  {
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
