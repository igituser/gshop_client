import Vue from 'vue'
import Vuex from 'vuex'

//导入状态模块
import home from './home'
import shop from './shop'
import {
    SAVE_USER_INFO,
    SAVE_TOKEN,
    LOGOUT,
} from './mutation-types'


Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        home,
        shop,
    },
    state:{
        token:'', //token 用户识别
        user_info:{}, //用户登录后的信息
    },
    mutations:{
        [SAVE_USER_INFO](state, user){
            state.user_info = user
        },

        [SAVE_TOKEN](state, token){
            state.token = token
        },

        [LOGOUT](state){
            state.user_info = {}
            state.token = ''
            localStorage.removeItem('token_key')
        }


    },
    actions:{
        getUserInfoAction({commit}, data){
            commit(SAVE_TOKEN, data.token)
            data.token && localStorage.setItem('token_key', data.token)
            data.token && delete data.token
            commit (SAVE_USER_INFO, data)
        }
    },
    getters:{}
})