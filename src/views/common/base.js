/**
 * 系统的配置模块
 */

let obj = {
    v: 1.0,
    ctx: baseUrl
}
const cssEjs = require('./css.ejs')(obj);
const scriptEjs = require('./script.ejs')(obj);

module.exports = {
    cssEjs: cssEjs,
    scriptEjs: scriptEjs
};
