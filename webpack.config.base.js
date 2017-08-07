const webpack = require('webpack')
const path = require('path');
const config = require('./system.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require('./utils');

function resolve(dir) {
    return path.join(__dirname, './', dir);
}

let assert = process.env === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;

module.exports = {
    entry: utils.createEntryObj,
    output: {
        path: config.build.assetsRoot,
        filename: `${assert}/js/[name].js`,
        publicPath: process.env === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json', 'css'],
        alias: {
            '@': resolve('src'),
            'assert': resolve('src/assert'),
            'views': resolve('src/views'),
            'common': resolve('src/views/common')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.ejs$/,
                use: [
                    'ejs-loader'
                ]
            },
            {
                test: /\.html/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: `${assert}/images/[name].[ext]`
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            // $: "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vender']
        }),
        new ExtractTextPlugin(`${assert}/css/style-[contenthash].css`),	//contenthash
    ]
}

