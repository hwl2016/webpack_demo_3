const http = require('http');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const server = express();
const path = require('path');
const user = require('./data/user');

const port = 3000;

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use('/assert', express.static(path.join(__dirname, './dist/assert')));

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
