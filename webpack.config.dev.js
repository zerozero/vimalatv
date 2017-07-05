var path = require('path');

var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
            {
                test: /\.ts$/,
                use: [
                    {loader: 'awesome-typescript-loader', options: {
                        transpileOnly: true
                    }},
                    {loader:'angular2-template-loader'},
                    {loader:'angular-router-loader'}
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
});