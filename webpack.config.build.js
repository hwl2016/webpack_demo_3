const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./system.config')
const baseWebpackConfig = require('./webpack.config.base')

module.exports = merge(baseWebpackConfig, {
    devtool: false,
    output: {
        filename: 'js/[name]-[chunkhash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }),
        new webpack.optimize.CommonsChunkPlugin({
            vender: ['vender']
        }),
        new webpack.optimize.UglifyJsPlugin({	//压缩js
            compress: {
                warnings: false
            },
            // beautify: true,
            comments: false,
        }),
        new ExtractTextPlugin("css/style-[contenthash].css"),	//contenthash
        new htmlWebpackPlugin({
            title: 'aaa',
            // template: path.resolve(__dirname, `./src/aaa/index.ejs`),
            // filename: `views/aaa/index.html`,
            hash: true,
            minify: {	//压缩html代码
                removeComments: true,	//移除注释
                collapseWhitespace: true	//删除空白符与换行符
            },
            chunks: ['jquery', 'lodash', 'moment', 'aaa']
        })
    ]
})
