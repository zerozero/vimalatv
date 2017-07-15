var path = require('path');

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');

const ngToolsWebpack = require('@ngtools/webpack');

module.exports = webpackMerge.smart(commonConfig, {
    entry: {
        'app': './assets/app/main.ts'
    },

    output: {
        path: path.resolve(__dirname + '/public/js/app'),
        filename: '[name].bundle.js',
        publicPath: '/js/app/',
        chunkFilename: '[id].[hash].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: '@ngtools/webpack'
            }
        ]
    },

    plugins: [
        new ngToolsWebpack.AotPlugin({
            tsConfigPath: './tsconfig.json',
            entryModule: './assets/app/app.module#AppModule'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
        })
    ]
});