import Vue from 'vue'
import Vuex from 'vuex'
import { reqSupportList, reqCollectionList } from "@/api"

Vue.use(Vuex)

export default {
    state: {
        supportSuccess: false,
        collectSuccess: false
    },
    mutations: {
        SUPPORTWORK(state) {
            state.supportSuccess = true
        },
        SUPPORTCHANGE(state) {
            state.supportSuccess = false
        },
        COLLECTWORK(state) {
            state.collectSuccess = true
        },
        COLLECTCHANGE(state) {
            state.collectSuccess = false
        }

    },
    actions: {
        async supportWork({ commit }, query) {
            let res = await reqSupportList(query)
            if (res.code == 200) {
                commit('SUPPORTWORK')
            }
        },
        async collectWork({ commit }, query) {
            let res = await reqCollectionList(query)
            if (res.code == 200) {
                commit('COLLECTWORK')
            }

        },
        supportChange({ commit }) {
            commit('SUPPORTCHANGE')
        },
        collectChange({ commit }) {
            commit('COLLECTCHANGE')
        }
    },
    getters: {}
}