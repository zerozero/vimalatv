var path = require('path');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const helpers = require('./helpers');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');


module.exports = webpackMerge( commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: path.resolve(__dirname + '/public/js/app'),
        filename: '[name].bundle.js',
        publicPath: '/js/app/',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: '@ngtools/webpack' }
        ]
    },
    plugins: [
        new AotPlugin({
            tsConfigPath: './tsconfig.prod.json',
            entryModule: helpers.root('assets/app/app.module#AppModule')
        })
    ]
});