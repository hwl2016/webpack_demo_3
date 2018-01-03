### 1、开发环境运行：
    npm run server   // 启动一个Express服务  提供模拟数据接口
    npm run dev      // 启动webpack-dev-server的开发环境

### 2、项目打包
    npm run release  // 生成一个dist目录，就是编译后的静态代码

### 3、开发目录说明
    /src/assert 存放项目的js、css、image目录
    /src/static 静态资源目录 存放公共js、css库
    /src/views  视图页面
    /src/views/common   公共代码块
    /src/views/module*  页面功能模块
    /src/views/module*/page  具体页面
    /src/views/module*/page/index.ejs  具体页面模板
    /src/views/module*/page/index.js   具体页面对应的js
    /data    mock数据目录

### 4、注意事项
> 图片的引入使用 $(require())
> 
    <img src="${require('assert/images/no-data.png')}" alt="">



    
