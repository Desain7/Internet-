import Vue from 'vue'
import Vuex from 'vuex'
import works from './works/index.js'
import login from './login/index.js'
import user from './user/index.js'
import comments from './comments/index.js'


Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        works,
        login,
        user,
        comments
    }
})