const path = require('node:path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'Mana',
      fileName: (format) => `mana.${format}.js`,
    },
  },
})
