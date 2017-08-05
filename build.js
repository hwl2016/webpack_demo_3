const rm = require('rimraf')
const path = require('path')
const webpack = require('webpack')
const webpackConfigProd = require('./webpack.config.build')
const config = require('./system.config')

rm(config.build.assetsRoot, err => {
    if (err) throw err
    webpack(webpackConfigProd, function (err, stats) {
        if (err) throw err
        process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n')
    })
})

