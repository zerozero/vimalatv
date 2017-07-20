var path = require('path');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const helpers = require('./helpers');
var webpack = require('webpack');
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
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'styles']
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                keep_fnames: true,
                screw_i8: true
            }
        })
    ]
});