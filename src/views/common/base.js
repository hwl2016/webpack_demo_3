/**
 * 系统的配置模块
 */

let v = 1.0;	//css和js的版本号
const cssEjs = require('./css.ejs')({cssVersion: v});
const scriptEjs = require('./script.ejs')({jsVersion: v});

module.exports = {
    cssEjs: cssEjs,
    scriptEjs: scriptEjs
};
