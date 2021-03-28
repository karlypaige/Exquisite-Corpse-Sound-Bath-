// const { merge } = require('webpack-merge');
// const common = require('./webpack.common.js');

// module.exports = merge(common, {
//   mode: 'development',
//   devtool: 'inline-source-map',
//   devServer: {
//     contentBase: './dist',
//   },
// });

var HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
    entry: './client/src/App/App.jsx',
    output: {
        path: __dirname + "./client/dist",
        filename: "bundle.js"
    },
    mode: 'production',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new WebpackPwaManifest({
            filename: "mainfest.json",
            inject: false,
            fingerpringts: false.valueOf,
            name: "Exquisite Corpse Sound Bath App",
            short_name: "ECSB App",
            start_url: "/",
            display: "standalone"
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    // plugins: [new HtmlWebpackPlugin({
    //     template: './src/index.html'
    // })],
    // devServer: {
    //     historyApiFallback: true
    // },
    // externals: {
    //     // global app config object
    //     config: JSON.stringify({
    //         apiUrl: 'http://localhost:4000'
    //     })
    // },
    

}