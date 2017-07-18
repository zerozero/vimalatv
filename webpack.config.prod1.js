var path = require('path');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const helpers = require('./helpers');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
var aotPlugin = new AotPlugin({
    tsConfigPath: './tsconfig.prod.json',
    entryModule: helpers.root('assets/app/app.module#AppModule'),
    compilerOptions: {
        genDir: helpers.root('aot'),
        skipCodeGeneration: false
    }
});

aotPlugin._compilerHost._resolve = function(path_to_resolve) {
    path_1 = require("path");
    path_to_resolve = aotPlugin._compilerHost._normalizePath(path_to_resolve);
    // console.log("path: "+path_to_resolve);
    if (path_to_resolve[0] == '.') {
        return aotPlugin._compilerHost._normalizePath(path_1.join(aotPlugin._compilerHost.getCurrentDirectory(), path_to_resolve));
    }
    else if (path_to_resolve[0] == '/' || path_to_resolve.match(/^\w:\//)) {
        return path_to_resolve;
    }
    else {
        return aotPlugin._compilerHost._normalizePath(path_1.join(aotPlugin._compilerHost._basePath, path_to_resolve));
    }
};

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
        aotPlugin
    ]
});