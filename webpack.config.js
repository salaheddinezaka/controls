const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    creditScore: ['./src/credit-score-modal/index.js']
  },
  output: {
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  }
}
