const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./system.config')
const baseWebpackConfig = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('./utils')

let plugin = utils.createHtmlWebpackPlugin();

plugin = plugin.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env': JSON.stringify(config.dev.env),
        'baseUrl': JSON.stringify(config.dev.baseUrl),
        'ajaxUrl': JSON.stringify(config.dev.ajaxUrl)
    })
]);


module.exports = merge(baseWebpackConfig, {
    devtool: '#cheap-module-eval-source-map',
    plugins: plugin,
    // devServer: {
    //     contentBase: config.dev.assetsRoot,
    //     historyApiFallback: true,
    //     port: config.dev.port,
    //     host: 'localhost',
    //     inline: true
    // }
})
