
import request from '../network/request'
console.log(request)
const api = {
     async login(data){
        const res = await request({
            url: '/login',
            data: data
        })
        return res.data
        
    }
}
export default api;