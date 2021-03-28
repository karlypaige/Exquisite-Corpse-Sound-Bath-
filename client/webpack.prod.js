const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = merge(common, {
  mode: 'production',
  target:'node',
  entry: './src/App/App.jsx',
  output: {
    path: __dirname + "./client/dist",
    filename: "bundle.js"
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