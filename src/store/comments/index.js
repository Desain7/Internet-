import Vue from 'vue'
import Vuex from 'vuex'
import { reqComment, reqDeleteComment} from "@/api"

Vue.use(Vuex)

export default {
    state: {
        subSuccess: false,
        deleteSuccess:false
    },
    mutations: {
       SUBCOMMENT(state) {
        state.subSuccess = true
       },
       SUCCESSCHANGE(state) {
        state.subSuccess = false
       },
       DELETESUCCESS(state) {
        state.deleteSuccess = true
       },
       DELETECHANGE(state) {
        state.deleteSuccess = false
       }
        
    },
    actions: {
        async subComment({commit}, query) {
            let res = await reqComment(query)
            if(res.code == 200) {
                commit('SUBCOMMENT')
            }
        },
        async deleteComment({commit}, params) {
            let res = await reqDeleteComment(params)
            if (res.code == 200) {
                commit('DELETESUCCESS')
            }
           
        },
        successChange({commit}) {
            commit('SUCCESSCHANGE')
        },
        deleteChange({commit}) {
            commit('DELETECHANGE')
        }
    },
    getters: {}
}