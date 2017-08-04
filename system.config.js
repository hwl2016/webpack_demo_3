const path = require('path');

module.exports = {
    build: {
        env: 'production',
        port: 9000,
        index: path.resolve(__dirname, './dist/index.html'),
        assetsRoot: path.resolve(__dirname, './dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: ''
    },
    dev: {
        env: 'development',
        port: 9000,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/'
    }
}
