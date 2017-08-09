const http = require('http');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.dev')
const path = require('path');
const user = require('./data/user');
const server = express();

const compiler = webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

});

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
});

compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({action: 'reload'})
        cb()
    })
});

const port = process.env.PORT || '9000';

server.use(devMiddleware);
server.use(hotMiddleware);

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cookieParser());
server.use('/assert', express.static(path.join(__dirname, './dist/assert')));
server.use('/static', express.static(path.join(__dirname, './src/static')));


// CORS, 跨域资源共享
server.all('*', (req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Max-Age': '3600',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Cookie'
    });
    next();
});

// 导入路由
server.use('/user', user);

http.createServer(server).listen(port);

console.log(`Express server start, http://localhost:${port}`)
