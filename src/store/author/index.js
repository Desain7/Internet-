import Vue from 'vue'
import Vuex from 'vuex'
import { reqSaveAuthor, reqUpdateAuthor} from "@/api"

Vue.use(Vuex)

export default {
    state: {
        submitSuccess:false
    },
    mutations: {
        SUBMITSUCCESS(state) {
            state.submitSuccess = true
        },

        
    },
    actions: {
        async submitAuthor({commit}, data) {
            let res = await reqSaveAuthor(data)
            if(res.code == 200) {
                commit('SUBMITSUCCESS')
            }
        },
        async updateAuthor({commit}, data) {
            let res = await reqUpdateAuthor(data)
            if(res.code == 200) {
                commit('')
            }
        },
    },
    getters: {}
}