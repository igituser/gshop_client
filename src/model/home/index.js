import {
    getAddress,
    indexCategory,
    shops,
} from '../../api'
import {
    SAVE_ADDRESS,
    SAVE_CATEGORY,
    SAVE_SHOPS,
} from './mutation-types'

import { uChunkArray } from '../../utils'

export default {
    state:{
        address:{}, //地址信息
        category:[], //食品分类列表
        shops:[], //商家列表
    },
    actions:{
        async getAddr({ commit },{ latitude, longitude }){
            const {code, data} = await getAddress(latitude, longitude)
            code === 0 && commit(SAVE_ADDRESS, data )
        },

        /* 优先在action做数据处理然后放入响应式状态中，尽量不要再组件内做数据处理 */
        async categoryList({ commit }){
            const {code, data} = await indexCategory()
            code === 0 && commit(SAVE_CATEGORY, uChunkArray(data, 8))
        },

        async getShops({ commit }, payload ){
            const { latitude, longitude } = payload
            const { code, data } = await shops(latitude, longitude)
            code === 0 && commit(SAVE_SHOPS, data)
        }


    },
    mutations:{
        [SAVE_ADDRESS](state, address){
            state.address = address
        },

        [SAVE_CATEGORY](state, category){
            state.category = category
        },

        [SAVE_SHOPS](state, shops){
            state.shops = shops
        }
    },
    getters:{}
}