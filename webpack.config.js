const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
require('@babel/polyfill')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  entry: {
    creditScore: ['./src/controls/credit-score/index.js'],
    studentLoan: ['./src/controls/student-loan/index.js'],
    mortgage: ['./src/controls/mortgage/index.js'],
    mortgage_v2: ['./src/controls/mortgage-v2/index.js']
    // cym: ['@babel/polyfill', './src/chooseyourmortgage/index.js']
  },
  output: {
    filename: '[name]/[name].js',
    library: '[name]'
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name]/[name].css' }),
    new HtmlWebpackPlugin({
      chunks: ['mortgage_v2'],
      template: './src/controls/mortgage-v2/index.html',
      filename: '[name]/index.html'
    })
  ],
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
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ]
  }
}
