export default defineNuxtConfig({
  modules: ['../src/module'],
  radash: {
    prefix: '_',
    prefixSkip: ['string'],
    upperAfterPrefix: true,
    alias: [
      ['snake', 'stringToSnake'], // => stringToCamelCase
    ]
  }
})
