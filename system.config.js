const path = require('path');

module.exports = {
    build: {
        env: 'production',
        assetsRoot: path.resolve(__dirname, './dist'),
        assetsSubDirectory: 'assert',
        assetsPublicPath: '',
        baseUrl: 'http://localhost:9005',
        ajaxUrl: 'http://localhost:3000'
    },
    dev: {
        env: 'development',
        port: 9000,
        assetsRoot: path.resolve(__dirname, './dist'),
        assetsSubDirectory: 'assert',
        assetsPublicPath: '/',
        baseUrl: 'http://localhost:9000',
        ajaxUrl: 'http://localhost:9000'
    }
}
