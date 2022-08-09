import Vue from 'vue'
import Vuex from 'vuex'
import { reqIdentifyCode, login} from "@/api"

Vue.use(Vuex)

export default {
    state: {
        showLogin: false,
        identifyCode:'',
        loginData:{}
    },
    mutations: {
        SHOWLOGIN(state) {
            state.showLogin = !state.showLogin
        },
        GETCODE(state, identifyCode) {
            state.identifyCode = identifyCode
        },
        LOGIN(state, loginData) {
            state.loginData = loginData
        }
        
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
            let res = await login(params)
            if(res.code == 200) {
                commit('LOGIN',res.data)
            }
        }
    },
    getters: {}
}