import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/index.vue'
import Shop from '../pages/Shop/index.vue'
import Works from '../pages/Works/index.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            name: 'Home',
            path: '/Home',
            component:Home,
        },
        {
            name: 'Works',
            path: '/Works',
            component:Works,
        },
        {
            name:'Shop',
            path: '/Shop',
            component:Shop,
        },
        {
            path: '/',
            redirect:'/Home',
            component:Home,
        },
    ]
})