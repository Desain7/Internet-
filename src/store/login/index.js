import Vue from 'vue'
import Vuex from 'vuex'
import { reqIdentifyCode, login} from "@/api"

Vue.use(Vuex)

export default {
    state: {
        showLogin: false,
        identifyCode:'',
        userData:{}
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
                commit('LOGIN',res.data)
                this.$message({
                    message: `[登陆成功]${res.data.webName}`,
                    type: 'success'
                  });
            }
        }
    },
    getters: {}
}