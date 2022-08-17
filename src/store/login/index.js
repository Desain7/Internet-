import Vue from 'vue'
import Vuex from 'vuex'
import { reqIdentifyCode, login} from "@/api"

Vue.use(Vuex)

export default {
    state: {
        isLogin:0,
        showLogin: false,
        identifyCode:'',
        userdata:null
    },
    mutations: {
        SHOWLOGIN(state) {
            state.showLogin = !state.showLogin
        },
        GETCODE(state, identifyCode) {
            state.identifyCode = identifyCode
        },
        LOGIN(state, loginData) {
            state.userdata = loginData
            state.isLogin = 1
            localStorage.setItem('feiyiuser', JSON.stringify(loginData))
            localStorage.setItem(`userTimestamp`, Date.now()); 
        }
        
    },
    actions: {
        showLogin({ commit }) {
            commit("SHOWLOGIN")
        },
        async getCode({ commit }) {
            let res = await reqIdentifyCode()
            if(res.code == 200) {
                commit('GETCODE', res.data)
            }
        },
        async login({commit}, params = {}) {
            console.log(params)
            let res = await login(params)

            if(res.code == 200) {
                commit("SHOWLOGIN")
                commit('LOGIN',res.data)
            }
        }
    },
    getters: {}
}