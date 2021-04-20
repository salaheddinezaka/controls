const fs = require('fs')
const { camelCase } = require('lodash')

const entries = {}

fs.readdirSync('./src/controls').map((file) => {
  if (fs.existsSync(`./src/controls/${file}/index.js`)) {
    entries[camelCase(file)] = [`./src/controls/${file}/index.js`]
  }
})

console.log(entries)
