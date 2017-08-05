const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./system.config')
const baseWebpackConfig = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = merge(baseWebpackConfig, {
    devtool: false,
    output: {
        filename: 'assert/js/[name]-[chunkhash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }),
        new webpack.optimize.UglifyJsPlugin({	//压缩js
            compress: {
                warnings: false
            },
            // beautify: true,
            comments: false,
        }),
        new HtmlWebpackPlugin({
            title: 'aaa',
            template: path.resolve(__dirname, `./src/app.ejs`),
            filename: `index.html`,
            hash: true,
            minify: {	//压缩html代码
                removeComments: true,	//移除注释
                collapseWhitespace: true	//删除空白符与换行符
            },
            chunks: ['vender', 'app']
        })
    ]
})
