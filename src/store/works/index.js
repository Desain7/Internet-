import Vue from 'vue'
import Vuex from 'vuex' 
import {reqWorksList,} from "@/api"

Vue.use(Vuex)

export default{
    state:{
        worksList:[],

    },
    mutations:{
        WORKSLIST(state, worksList) {
            state.worksList = worksList
            console.log(worksList)
        },
    },
    actions:{
        async worksList({commit}) {
            let result = await reqWorksList()
            if (result.code == 200) {
                commit("WORKSLIST", result.data)
            }
        },
    },
    getters:{}
}