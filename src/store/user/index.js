import Vue from 'vue'
import Vuex from 'vuex'
import { reqUserInfo, reqUpdateUser} from "@/api"

Vue.use(Vuex)

export default {
    state: {
        userData:{}
    },
    mutations: {
        GETUSERDATA(state, userData) {
            state.userData = userData
        },

        
    },
    actions: {
        async getUserData({commit}, query) {
            let res = await reqUserInfo(query)
            if(res.code == 200) {
                commit('GETUSERDATA', res.data)
            }
        },
        async chageUserInfo({commit}, params) {
            let res = await reqUpdateUser(params)
            if(res.code == 200) {
                commit()
                this.getUserData()
            }
        }
    },
    getters: {}
}