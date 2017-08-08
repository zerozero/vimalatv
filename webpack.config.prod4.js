const ngToolsWebpack = require('@ngtools/webpack');
var path = require('path');
//var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },

    entry: {
        'app': './assets/app/main.aot.ts',
        'vendor': './assets/app/vendor.ts',
        'styles': './assets/app/style.scss',
        'polyfills': './assets/app/polyfills.ts'
    },
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
        rules: [
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
            {
                test: /\.css$/,
                use: [
                    'to-string-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: true,
                        collapseWhitespace: true,

                        // angular 2 templates break if these are omitted
                        removeAttributeQuotes: false,
                        keepClosingSlash: true,
                        caseSensitive: true,
                        conservativeCollapse: true,
                    }
                }],

            },
            {test: /\.ts$/, loader: '@ngtools/webpack'},
            {
                test: /\.(png|jpeg|jpg|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'file-loader'
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};

