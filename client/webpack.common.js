const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  },

  entry: './src/index.jsx',
  
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })],

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  }

};