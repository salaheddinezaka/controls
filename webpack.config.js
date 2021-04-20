const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
require('@babel/polyfill')
const fs = require('fs')
const { camelCase } = require('lodash')

function getEntries() {
  const entries = {}

  fs.readdirSync('./src/controls').map((file) => {
    if (fs.existsSync(`./src/controls/${file}/index.js`)) {
      entries[camelCase(file)] = [`./src/controls/${file}/index.js`]
    }
  })

  return entries
}

function getHtmlTemplates() {
  const templates = []

  fs.readdirSync('./src/controls').map((file) => {
    if (fs.existsSync(`./src/controls/${file}/index.html`)) {
      templates.push(
        new HtmlWebpackPlugin({
          chunks: [camelCase(file)],
          template: `./src/controls/${file}/index.html`,
          filename: `${camelCase(file)}/index.html`
        })
      )
    }
  })

  return templates
}

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    hot: true,
    port: 9000
  },
  entry: getEntries(),
  output: {
    filename: '[name]/[name].js',
    library: '[name]'
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name]/[name].css' }),
    ...getHtmlTemplates()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ]
  }
}
