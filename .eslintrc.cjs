module.exports = {
  env: {
    node: true,
    browser: true, 
    es2022 : true, 
  },
  parser: '@typescript-eslint/parser', 
  parserOptions: {
    ecmaVersion: 2022, 
    sourceType: 'module', 
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', 
    'plugin:vue/vue3-recommended', 
    'prettier', 
  ],
  plugins: [
    '@typescript-eslint/eslint-plugin', 
    'prettier',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: false,
        singleQuote: true,
      },
    ],
    'vue/no-v-html': 'off',

    // --- ИЗМЕНЕНИЕ ЗДЕСЬ ---
    // Отключаем базовое правило ESLint для неиспользуемых переменных
    'no-unused-vars': 'off',
    // Включаем правило TypeScript и устанавливаем уровень "warn" (предупреждение)
    '@typescript-eslint/no-unused-vars': [
      'warn', // <--- Устанавливаем уровень на предупреждение
      {
        argsIgnorePattern: '^_', // Не предупреждать о неиспользуемых аргументах, начинающихся с _
        varsIgnorePattern: '^_', // Не предупреждать о неиспользуемых переменных, начинающихся с _
        caughtErrorsIgnorePattern: '^_', // Не предупреждать о неиспользуемых ошибках в catch, начинающихся с _
      },
    ],
    // --- КОНЕЦ ИЗМЕНЕНИЯ ---

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser', 
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
    },
  ],
}
