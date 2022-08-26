import Vue from 'vue'
import Vuex from 'vuex'
import { reqIdentifyCode, login, register, reqEmailCode, reqForgetPass} from "@/api"

Vue.use(Vuex)

export default {
    state: {
        isLogin:0,
        showLogin: false,
        identifyCode:'',
        errorMessage:'',
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
            state.errorMessage = ''
            state.isLogin = 1
            localStorage.setItem('feiyiuser', JSON.stringify(loginData))
            localStorage.setItem(`userTimestamp`, Date.now()); 
        },
        LOGINFAIL(state, failMsg) {
            state.errorMessage = failMsg
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
        async getEmailCode({commit},params) {
            let res = await reqEmailCode(params)
            if(res.code == 200) {
                commit('EMAILCODE')
            }
        },
        async login({commit}, params = {}) {
            console.log(params)
            let res = await login(params)

            if(res.code == 200) {
                commit("SHOWLOGIN")
                commit('LOGIN',res.data)
            } else {
                commit('LOGINFAIL',res.data)
            }
        },
        async register({commit}, params) {
            let res = await register(params)
            if(res.code == 200) {
                commit("SHOWLOGIN")
                commit('REGISTER',res.data)
            }
        },
        async forgetPass({commit}, params) {
            let res = await reqForgetPass(params)
            if(res.code == 200) {
                commit("SHOWLOGIN")
                commit('FORGETPASS',res.data)
            }
        }
    },
    getters: {}
}