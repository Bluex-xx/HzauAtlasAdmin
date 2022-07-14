import request from '../network/request'
//返回值为promise对象，需要异步接收转为普通对象
const api = {
    //获取所有照片
    getAllPhotos(){
        return request({
            url: '/photo'
        })  
    },
    //获取所有用户
    getAllUsers(){
         return request({
            url:'/user'
         })
    },
    //管理员登录接口
    login(data){
        return request({
            url:'/login',
            data:data
       })   
    },
    //小程序统计接口 
    statistics(){
        return request({
            url:'/statistics/all'
        })
    },
    //获取所有评论
    getAllComment(){
        return request({
            url:'/comment/all'
        })
    },
    //删除某条评论
    deleteComment(data){
        return request({
            url:'/comment/delete',
            data:{id:data}
        })
    },
    //获取所有猫咪信息及其图片
    getAllCat(){
        return request({
            url:'/cat/all'
        })
    },
    //添加猫咪
    addCat(data){
        return request({
            url:'/cat/add',
            data:data
        })
    },
    //删除某只猫咪
    deleteCat(data){
        return request({
            url:'/cat/delete',
            data:{
                cid:data
            }
        })
    },
    //修改猫咪信息
    updateCat(data){
        return request({
            url:'/cat/update',
            data:data
        })
    },
    //删除某张猫咪照片
    deleteCatPhoto(data){
        return request({
            url:'/cat/deletePhoto',
            data:{pid:data}
        })
    },
    //添加猫咪照片
    addCatPhoto(data){
        return request({
            url:'/cat/addPhoto',
            data:data
        })
    },
    //获取所有花花及其图片
    getAllFlower(){
        return request({
            url:'/flower/all'
        })
    },
    //添加花花
    addFlower(data){
        return request({
            url:'/flower/add',
            data:data
        })
    },
     //删除某朵花花
    deleteFlower(data){
        return request({
            url:'/flower/delete',
            data:data
        })
    },
    //修改花花信息
    updateFlower(data){
        return request({
            url:'/flower/update',
            data:data
        })
    },
    //删除某张花花照片
    deleteFlowerPhoto(data){
        return request({
            url:'/flower/deletePhoto',
            data:data
        })
    },
    //添加花花照片
    addFlowerPhoto(data){
        return request({
            url:'/flower/addPhoto',
            data:data
        })
    }
}
export default api;