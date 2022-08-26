import Vue from 'vue'
import Vuex from 'vuex'
import { reqUserInfo, reqUpdateUser,reqUserCollection,reqUserFavor} from "@/api"

Vue.use(Vuex)

export default {
    state: {
        userData:{},
        favor:[],
        collection:[]
    },
    mutations: {
        GETUSERDATA(state, userData) {
            state.userData = userData
        },
        GETUSERCOLLECTION(state, collection) {
            state.collection = Object.values(collection)
        },
        GETUSERFAVOR(state,favor) {
            state.favor = Object.values(favor)
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
                commit('')
            }
        },
        async getUserFavor({commit}, params) {
            let res = await reqUserFavor(params)
            if(res.code == 200) {
                commit('GETUSERFAVOR',res.data)
            }
        },
        async getUserCollection({commit}, params) {
            let res = await reqUserCollection(params)
            if(res.code == 200) {
                commit('GETUSERCOLLECTION',res.data)
            }
        }
    },
    getters: {}
}