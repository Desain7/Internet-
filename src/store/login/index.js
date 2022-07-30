import Vue from 'vue'
import Vuex from 'vuex'
import { reqIdentifyCode, login} from "@/api"

Vue.use(Vuex)

export default {
    state: {
        showLogin: false,
        identifyCode:''
    },
    mutations: {
        SHOWLOGIN(state) {
            state.showLogin = !state.showLogin
        },
        GETCODE(state, identifyCode) {
            state.identifyCode = identifyCode
        },
        
    },
    actions: {
        showLogin({ commit }) {
            commit("SHOWLOGIN")
        },
        async getCode({ commit }) {
            let res = await reqIdentifyCode()
            if(res.code == 200) {
                commit('GETCODE', res.msg)
            }
        },
        async login({commit}, params = {}) {
            let result = await login(params)
            if(result.code == 200) {
                commit()
            }
        }
    },
    getters: {}
}