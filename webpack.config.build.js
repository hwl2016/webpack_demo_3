const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./system.config')
const baseWebpackConfig = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const utils = require('./utils')

let plugin = utils.createHtmlWebpackPlugin();

plugin = plugin.concat([
    new webpack.DefinePlugin({
        'process.env': JSON.stringify(config.build.env),
        'baseUrl': JSON.stringify(config.build.baseUrl),
        'ajaxUrl': JSON.stringify(config.build.ajaxUrl)
    }),
    new webpack.optimize.UglifyJsPlugin({	//压缩js
        compress: {
            warnings: false
        },
        // beautify: true,
        comments: false,
    }),
]);

module.exports = merge(baseWebpackConfig, {
    devtool: false,
    output: {
        filename: 'assert/js/[name]-[chunkhash].js'
    },
    plugins: plugin
});
