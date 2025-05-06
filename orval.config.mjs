import { defineConfig } from 'orval'

export default defineConfig({
  petstore: {
    output: {
      baseUrl:'https://sharkov.helpfy.ai',
      target: './src/api/helpfy.ts',
      client: 'axios',
      typescript: true,
      mode: 'split',
      clean: true,
    },
    input: {
      target: 'https://sharkov.helpfy.ai/api/docs-json', // Ваш реальный URL
    },
  },
})
