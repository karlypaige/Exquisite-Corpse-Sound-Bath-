const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  target:'node',
  entry: './src/index.jsx',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  mode: 'production',
  plugins: [
    new WebpackPwaManifest({
      filename: "manifest.json",
      inject: false,
      fingerpringts: false.valueOf,
      name: "Exquisite Corpse Sound Bath App",
      short_name: "ECSB App",
      start_url: "/",
      display: "standalone"
    })
  ],
})