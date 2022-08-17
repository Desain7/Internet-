import Vue from 'vue'
import Vuex from 'vuex'
import { reqComment} from "@/api"

Vue.use(Vuex)

export default {
    state: {
        subSuccess: false
    },
    mutations: {
       SUBCOMMENT(state) {
        state.subSuccess = true
       },
       FLAGCHANGE(state) {
        state.subSuccess = false
       }
        
    },
    actions: {
        async subComment({commit}, query) {
            let res = await reqComment(query)
            if(res.code == 200) {
                commit('SUBCOMMENT')
            }
        },
        flagChange({commit}) {
            commit('FLAGCHANGE')
        }
    },
    getters: {}
}