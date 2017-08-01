const ngToolsWebpack = require('@ngtools/webpack');
var path = require('path');
//var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    entry: './assets/app/main.aot.ts',
    output: {
        path: path.resolve(__dirname + '/public/js/app'),
        filename: '[name].bundle.js',
        publicPath: '/js/app/',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new ngToolsWebpack.AotPlugin({
            tsConfigPath: './tsconfig.prod1.json',
            entryModule: __dirname + '/assets/app/app.module#AppModule'
        }),
        //new CopyWebpackPlugin([
        //	{from: './index.html'}
        //]),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: true
        })
    ],
    module: {
        loaders: [
            {test: /\.scss$/, loaders: ['raw-loader', 'sass-loader']},
            {test: /\.css$/, loader: 'raw-loader'},
            {test: /\.html$/, loader: 'raw-loader'},
            {test: /\.ts$/, loader: '@ngtools/webpack'}
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};

