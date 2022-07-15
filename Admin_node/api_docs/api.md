# 狮山图鉴小程序后台接口文档

> ## 技术选型

- NodeJS

- Koa2

- Mysql


base url:127.0.0.1:9000

> ## API 详情

### 登录接口

```js
url: "/login"
method："POST"
data:{
account,
password    
}
response:{
    token,
    msg:"success",
    account
}
```

### 小程序统计接口

```js
url: "/statistics/all"
method:"POST"
data:NULL(无需传参)
response:{
    cat_num,
    flower_num,
    user_num,
    photo_num    
}
```

### 获取所有评论

```js
url:"/commment/all"
method:"POST"
data:NULL
response:{
     {
            "cid": 7,
            "fid": null,
            "content": "胖胖橘的一楼，肯定属于俺",
            "uid": "57",
            "date": "2022-04-14 21:25:45",
            "id": 1,
            "user": {
                "openid": "ojCNE5DMzUQRB33ATwaWisklwKcI",
                "profile_photo": "https://thirdwx.qlogo.cn/mmopen/vi_32/1pdpY2sqsZZ5icibpd4v1MDsMe7PShoY5wwEhMUabvg78xyGztlWaovicBRlVVJgicn4lGPGV0j9XE3cS6Pobics8cg/132",
                "name": "bluexx",
                "uid": 57
            }
        },
}
```

### 删除某条评论

```js
url:"/comment/delete"
method:"POST"
data:{
    id:id
}
response:{
    //成功返回值
    msg:'comment delete success'
    //失败返回值
    msg:'comment delete failed'
}
```

### 获取所有的猫咪信息及其图片

```js
url:"/cat/all"
method:"POST"
data:NULL
response:{
     {
            "name": "梅",
            "cid": 5,
            "color": "玳瑁猫",
            "place": "橘园",
            "character1": "不详",
            "liked": null,
            "photo": [
                {
                    "pid": 16,
                    "fid": null,
                    "cid": 5,
                    "store": "https://img.codexx.cc/img/cat/daimao/%E6%A2%85.jpg",
                    "liked": 2,
                    "name": "梅"
                }
            ]
        }
}
```

### 添加猫咪

```js
url:"/cat/add"
method:"POST"
data:{
    name,
    color,
    place,
    character1    
}
reponse:{
    //成功返回值
    msg: 'cat insert success'
    //失败返回值
    msg: 'cat insert fail'
}
```

### 删除猫咪

```js
url:"/cat/delete"
method:"POST"
data:{
    cid
}
response:{
    //删除成功返回
    msg:'cat delete success'
    //删除失败返回
    msg:'cat delete failed'
}
```

### 修改猫咪信息

```js
url:"/cat/update"
method:"POST"
data:{
    name,
    color,
    place,
    character1，
    cid
}
reponse:{
    //成功返回值
    msg: 'cat update success'
    //失败返回值
    msg: 'cat update fail'
}
```

### 删除猫咪照片

```js
url:"/cat/deletePhoto"
method:"POST"
data:{
    pid
}
response:{
    msg:'delete cat photo success'
    // or
    msg:'delete cat photo fail'
}
```

### 添加猫咪图片，使用链接上传方式

```js
url:"/cat/addPhoto"
method:"POST"
data:{
    cid,
    store,
    name    
}
response:{
    msg: 'cat photo insert success'
    // or
    msg: 'cat photo insert fail'
}
```

### 获取所有的花花，及其图片

```js
url:"/flower/all"
method:"POST"
data:NULL
response:{
{
            "fid": 2,
            "name": "紫竹梅",
            "florescence": "7-9月",
            "department": "鸭跖草科",
            "allegory": "勇敢无畏、坚决、无垠力量",
            "liked": null,
            "color": "紫色",
            "photo": [
                {
                    "pid": 88,
                    "fid": 2,
                    "cid": null,
                    "store": "https://img.codexx.cc/img/flower/%E7%B4%AB%E7%AB%B9%E6%A2%85.jpg",
                    "liked": 0,
                    "name": "紫竹梅"
                }
            ]
        },
}
```

### 添加花花

```js
url:"/flower/add"
method:"POST"
data:{
    name,
    florescence,
    department，
    allegory,
    color   
}
reponse:{
    //成功返回值
    msg: 'flower insert success'
    //失败返回值
    msg: 'flower insert fail'
}
```

### 删除花花

```js
url:"/flower/delete"
method:"POST"
data:{
    fid
}
response:{
    //删除成功返回
    msg:'flower delete success'
    //删除失败返回
    msg:'flower delete failed'
}
```

### 更新花花信息

```js
url:"/flower/update"
method:"POST"
data:{
    name,
    florescence,
    department，
    allegory,
    color 
}
reponse:{
    //成功返回值
    msg: 'flower update success'
    //失败返回值
    msg: 'flower update fail'
}
```

### 删除花花图片

```js
url:"/flower/deletePhoto"
method:"POST"
data:{
    pid
}
response:{
    msg:'delete flower photo success'
    // or
    msg:'delete flower photo fail'
}
```

### 添加花花图片,使用链接上传

```js
url:"/flower/addPhoto"
method:"POST"
data:{
    fid,
    store,
    name    
}
response:{
    msg: 'flower photo insert success'
    // or
    msg: 'flower photo insert fail'
}
```

