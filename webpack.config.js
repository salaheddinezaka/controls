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
    new HtmlWebpackPlugin({
      chunks: ['mortgage_v2'],
      template: './src/controls/mortgage-v2/index.html',
      filename: 'mortgage_v2/index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['studentLoanV2'],
      template: './src/controls/student-loan-v2/index.html',
      filename: 'studentLoanV2/index.html'
    })
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
