const AotPlugin = require('@ngtools/webpack').AotPlugin;
const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './assets/app/main.ts',
        styles: './assets/app/style.scss'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: helpers.root('public/js/app'),
        publicPath: '/js/app/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    plugins: [
        new AotPlugin({
            tsConfigPath: './tsconfig.aot.json',
            entryModule: helpers.root('assets/app/app.module#AppModule')
        }),
        new HtmlWebpackPlugin({
            template: 'views/index.hbs'
        }),
        new ExtractTextPlugin({filename: '[name].[contentHash].css'}),
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader' }]
            },
            {
                test: /\.css$/,
                use: [
                    'to-string-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            { test: /\.ts$/, loader: '@ngtools/webpack' },
            {
                test: /\.(png|jpeg|jpg|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader'
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};