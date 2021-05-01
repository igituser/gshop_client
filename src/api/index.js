import ajax from './ajax'

//根据经纬度获取地址详情 latitude : 纬度 longitude ：经度
export const getAddress = (latitude, longitude) => ajax({
    url:`/position/${latitude},${longitude}`,
    headers:{
        needToken: true
    }
})

//首页食品分类列表
export const indexCategory = () => ajax({
    url:'/index_category',
    headers:{
        needToken: false,
    }

})

//根据经纬度获取商铺列表
export const shops = (latitude, longitude) => ajax({
    url: '/shops',
    headers:{
        needToken: false
    },
    params:{
        latitude, 
        longitude
    }
})

//发送手机验证码
export const sendCode = ({ phone }) => ajax({
    url:'/sendcode',
    params:{
        phone
    }
})

//用户名密码登录
export const loginWithUserName = ({username, pwd, captcha}) => ajax({
    url:'/login_pwd',
    method:'POST',
    data:{
        name: username,
        pwd,
        captcha,
    }
})

//手机号码登录
export const loginWithPhoen = ({phone, captcha}) => ajax({
    url:'/login_sms',
    method:'POST',
    data:{
        phone,
        code:captcha,
    }
})

//自动登录（使用token信息自动请求用户信息）
export const auto_login = () => ajax({
    url:'/auto_login',
    headers:{
        needToken:true
    },
    method:'GET'
})