import Vue from 'vue'
import Vuex from 'vuex' 
import {reqWorksList,reqSearchWork,reqWorkInform,reqCollectionList,reqSupportList} from "@/api"

Vue.use(Vuex)

export default{
    state:{
        worksList:[],
        searchWork:[],
        workInform:{},
        collectionList:[],
        supportList:[]
    },
    mutations:{
        WORKSLIST(state, worksList) {
            state.worksList = worksList
        },
        SEARCHWORK(state, searchWork) {
            state.searchWork = searchWork
        },
        WORKINFORM(state, workInform) {
            state.workInform = workInform
        },
        GETINFORM(state, workInform) {
            state.workInform = workInform
        },
        COLLECTIONLIST(state, collectionList) {
            state.collectionList = collectionList
        },
        SUPPORTLIST(state, supportList) {
            state.supportList = supportList
        }
    },
    actions:{
        async worksList({commit}, query) {
            let res = await reqWorksList(query)
            if (res.code == 200) {
                commit("WORKSLIST", res.data)
            }
        },
        async searchWork({commit}) {
            let res = await reqSearchWork()
            if(res.code == 200) {
                commit('SEARCHWORK', res.data)
            }
        },
        async workInform({commit}, params) {
            let res = await reqWorkInform(params)
            if(res.code == 200) {
                sessionStorage.setItem('workInform',JSON.stringify(res.data))
                commit('WORKINFORM', res.data)
            }
        },
        getInform({commit}) {
            let res = JSON.parse(sessionStorage.getItem('workInform')) 
            commit('GETINFORM',res)
        },
        async CollectionList({commit}, query) {
            let res = await reqCollectionList(query)
            if(res.code == 200) {
                commit('COLLECTIONLIST', res.data)
            }
        },
        async SupportList({commit}, query) {
            let res = await reqSupportList(query)
            if(res.code == 200) {
                commit('SUPPORTLIST', res.data)
            }
        }
    },
    getters:{}
}