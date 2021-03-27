const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {

    app: './src/index.jsx',

  },

  plugins: [

    new HtmlWebpackPlugin({

      title: 'Production',

    }),

  ],

  output: {

    filename: '[name].bundle.js',

    path: path.resolve(__dirname, 'dist'),

    clean: true,

  },
};
