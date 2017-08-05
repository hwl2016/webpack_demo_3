const webpack = require('webpack')
const path = require('path');
const config = require('./system.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, './', dir);
}

module.exports = {
    entry: {
        app: './src/main.js',
        vender: ['jquery', 'lodash']
    },
    output: {
        path: config.build.assetsRoot,
        filename: 'assert/js/[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json', 'css'],
        alias: {
            '@': resolve('src'),
            'assert': resolve('src/assert'),
            'views': resolve('src/views')
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
                    name: 'assert/img/[name].[hash:7].[ext]'
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
        new ExtractTextPlugin("assert/css/style-[contenthash].css"),	//contenthash
    ]
}

