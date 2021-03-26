const MiniCssExtractPlugin = require('mini-css-extract-plugin')
require('@babel/polyfill')

module.exports = {
  entry: {
    creditScore: ['./src/credit-score/index.js'],
    studentLoan: ['./src/student-loan/index.js'],
    mortgage: ['./src/mortgage/index.js']
    // cym: ['@babel/polyfill', './src/chooseyourmortgage/index.js']
  },
  output: {
    filename: '[name]/[name].js',
    library: '[name]'
  },
  plugins: [new MiniCssExtractPlugin({ filename: '[name]/[name].css' })],
  module: {
    rules: [
      {
        test: /\.js$/,
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
      }
    ]
  }
}
