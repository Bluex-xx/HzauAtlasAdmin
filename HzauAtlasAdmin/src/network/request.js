import axios from 'axios'
import router from '../router/main'
export default function request(config) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:9000',//填写node服务部署的服务器地址，端口默认为9000
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'authorization': localStorage.getItem('token')
    },
    method:'POST'
  })
  axios.interceptors.response.use(
    response => {
      if (response.data.errno === 999) {
        router.replace('/');
        console.log("token过期");
      }
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  )
  return instance(config)
}