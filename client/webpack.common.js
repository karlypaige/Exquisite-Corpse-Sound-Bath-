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
  
  
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  
  },

};