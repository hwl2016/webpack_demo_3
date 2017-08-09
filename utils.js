const fs = require('fs');
const path = require('path');
const join = path.join;
const HtmlWebpackPlugin = require('html-webpack-plugin');

let vender = [];
let modules = ['module1', 'module2', 'module3'];

/**
 * 查找目录下面的所有文件
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
    let result=[];
    function finder(path) {
        let files = fs.readdirSync(path);
        files.forEach((val,index) => {
            let fPath = join(path,val);
            let stats = fs.statSync(fPath);
            if(stats.isDirectory()) finder(fPath);
            if(stats.isFile()) result.push(fPath);
        });
    }
    finder(startPath);
    return result;
}

/**
 * 生成entry对象
 * @returns {{}}
 */
function createEntryObj() {
    let obj = {}
    obj.vender = vender;

    let modules = ['module1', 'module2', 'module3'];

    modules.forEach(function(item, index) {
        let p = join(__dirname, `./src/views/${item}`);
        let files = findSync(p);
        files.forEach(function(f, i) {
            let file = path.parse(f);
            if(file.ext === '.js') {
                let dir = file.dir;
                let sep = dir.split(path.sep);
                let name = sep[sep.length - 1];
                obj[name] = `./src/views/${item}/${name}/${file.base}`;
            }
        });

    });

    return obj;
}

function createHtmlWebpackPlugin() {
    let arr = [];
    modules.forEach(function(item, index) {
        let p = join(__dirname, `./src/views/${item}`);
        let files = findSync(p);

        files.forEach(function(f, i) {
            let file = path.parse(f);
            if(file.ext === '.ejs') {
                let dir = file.dir;
                let sep = dir.split(path.sep);
                let name = sep[sep.length - 1];

                let options = {
                    filename: `views/${item}/${name}.html`,
                    template: `./src/views/${item}/${name}/${file.base}`,
                    inject: true,
                    chunks: [
                        'vender', `${name}`
                    ]
                };
                arr.push(new HtmlWebpackPlugin(options));
            }
        });
    });
    return arr;
}

// console.log(createHtmlWebpackPlugin());

module.exports = {
    createEntryObj,
    createHtmlWebpackPlugin
};
