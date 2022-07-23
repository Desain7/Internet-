import Vue from 'vue'
import Vuex from 'vuex'
import works from './works/index.js'


Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        works
    }
})