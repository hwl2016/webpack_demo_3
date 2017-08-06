const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./system.config')
const baseWebpackConfig = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': config.dev.env
        // }),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/app.ejs',
            inject: true,
            chunks: ['vender', 'app']
        }),
        new HtmlWebpackPlugin({
            filename: 'views/aaa/index.html',
            template: './src/views/aaa/index.ejs',
            inject: true,
            chunks: ['vender', 'aaa']
        })
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        port: config.dev.port,
        host: 'localhost',
        inline: true
    }
})
