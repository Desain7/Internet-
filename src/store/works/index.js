import Vue from 'vue'
import Vuex from 'vuex' 
import {reqWorksList,reqWorkInform,reqCollectionList,reqSupportList, reqHotWorks, reqUpdateWork, reqDeleteWork,reqSaveWork,reqDeletePhoto} from "@/api"

Vue.use(Vuex)

export default{
    state:{
        workId:0,
        worksList:[],
        searchWork:[],
        hotWorks:[],
        workInform:{},
        collectionList:[],
        supportList:[]
    },
    mutations:{
        WORKSLIST(state, worksList) {
            state.worksList = worksList
        },
        WORKINFORM(state, workInform) {
            state.workInform = workInform
        },
        GETINFORM(state, workInform) {
            state.workInform = workInform
        },
        HOTWORKS(state, hotWorks) {
            state.hotWorks = hotWorks
        },
        COLLECTIONLIST(state, collectionList) {
            state.collectionList = collectionList
        },
        SUPPORTLIST(state, supportList) {
            state.supportList = supportList
        },
        ADDWORKSUCCESS(state, workId) {
            state.workId = workId
        }
    },
    actions:{
        async worksList({commit}, query) {
            let res = await reqWorksList(query)
            if (res.code == 200) {
                commit("WORKSLIST", res.data)
            }
        },
        async workInform({commit}, params) {
            let res = await reqWorkInform(params)
            if(res.code == 200) {
                sessionStorage.setItem('workInform',JSON.stringify(res.data))
                commit('WORKINFORM', res.data)
            }
        },
        commitWorkEdit({commit},params) {
            reqUpdateWork(params)
            commit('')
        },
        async submitAddWork({commit},data) {
            let res = await reqSaveWork(data)
            if(res.code == 200) {
                commit('ADDWORKSUCCESS', res.data)
            }
            
        },
        async hotWorks({commit}) {
            let res = await reqHotWorks()
            if(res.code == 200) {
                commit('HOTWORKS', res.data)
            }
        },
        getInform({commit}) {
            let res = JSON.parse(sessionStorage.getItem('workInform')) 
            commit('GETINFORM',res)
        },
        async collectionList({commit}, query) {
            let res = await reqCollectionList(query)
            if(res.code == 200) {
                commit('COLLECTIONLIST', res.data)
            }
        },
        async cupportList({commit}, query) {
            let res = await reqSupportList(query)
            if(res.code == 200) {
                commit('SUPPORTLIST', res.data)
            }
        },
        async deleteWorks({commit}, data) {
            let res = await reqDeleteWork(data)
            if(res.code == 200) {
                commit('')
            }
        },
        async deletePhoto({commit},params) {
            let res = await reqDeletePhoto(params)
            if(res.code == 200) {
                commit('')
            }
        }
        
    },
    getters:{}
}