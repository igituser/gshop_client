import axios from 'axios'
import qs from 'qs'
import router from '../router'

const instance  = axios.create({
    baseURL:'/api',
})
//请求拦截器
instance.interceptors.request.use((config) => {
    if(config.method === 'POST'){
        config.data = qs.stringify(config.data)
    }

    if(config.headers.needToken){
        //获取本地的token信息
        const token = localStorage.getItem('token_key')
        if(token){
            config.headers.Authorization = token
        }else{
            throw Error('请先登录')
        }
    }

    return config
})
//响应拦截器,会加装一层封装服务器的响应response
instance.interceptors.response.use( (response) => {
    return response.data
}, (error) => {
    if(!error.response){
        alert(error.message)
        if(router.currentRoute.path !== '/login'){
            router.replace('/login')
        }
    }else{
        if(error.response.status === 401){
            alert('token过期，请重新登录')
            if(router.currentRoute.path !== '/login'){
                router.replace('/login')
            }
        }else if(error.response.status === 404) {
            alert('请求的资源未找到')
        }else{
            alert('请求出错了')
        }
    }
    alert('请求失败')
    //默认会返回一个成功的promise实例，但是没有数据
    return Promise.reject(error)
})

export default instance