# 狮山图鉴小程序后台管理系统

> ## 基于
>
> ## 前端：Vue3.x + Ant Design Vue
>
> ## 后端：NodeJs + Koa2 + Mysql
>
> ## 的一个后台管理系统😶‍🌫️
>
> 狮山图鉴小程序的后台补充，小程序代码移步至：https://github.com/Bluex-xx/HzauAtlas

------

## 版本信息

> 🦄🦄🦄1.1.0 version 功能（2022.7.16）
>
> - 小程序信息的统计
> - 用户评论的删除
> - 图片的上传以及删除
> - 猫咪信息的管理 ( 添加以及信息编辑等 )

## 🥴😵‍💫😵 已知bug：

- [ ] Ant design上传组件删除会再次触发上传
- [ ] 图片过多导致渲染卡顿 （考虑使用长列表优化）
- [ ] 图片删除无法在猫咪信息处直接删除
- [x] 猫咪与花朵页面部分数据遍历出错，图裂


------


## 页面展示

### 👾🤖👽 登录页面

![](http://img.codexx.cc/img/readme/0.png)

### 💕 首页

![](http://img.codexx.cc/img/readme/1.png)

### 😽 猫咪编辑页面

![](http://img.codexx.cc/img/readme/5.png)

### 🐔 评论编辑页面

![](http://img.codexx.cc/img/readme/2.png)

### ❤️ 照片编辑页面

![](http://img.codexx.cc/img/readme/3.png)

### 😺🙀😽 用户页面

![](http://img.codexx.cc/img/readme/4.png)



------



## 🎇 相关配置

### 前端 

请确保安装了 Node.js 以及 npm 包管理工具

```shell
npm --version  6.14.16
node --version  v14.19.0
```

修改 src / network / request.js 

```javascript
const instance = axios.create({
    baseURL: 'http://127.0.0.1:9000',//填写node服务部署的服务器地址，端口默认为9000
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'authorization': localStorage.getItem('token')
    },
    method:'POST'
  })
```

本地调试运行

```shell
npm i 
npm run serve
```

### 后端

修改 utils / db.js

```js
let pool = mysql.createPool({
    host: '127.0.0.1', //数据库地址
    port: 3306, //端口号
    database: 'demo', //数据库名称
    user: 'demo', //数据库用户名
    password: 'demo' //数据库密码
})
```

运行接口

```shell
npm i
npm start
```

> 本地测试完毕打包上传即可，具体可 Google , 关键词 Vue 项目部署 , Node部署
