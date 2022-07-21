import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/index.vue'
import Login from '../pages/Login/index.vue'
import Register from '../pages/Register/index.vue'
import Shop from '../pages/Shop/index.vue'
import Works from '../pages/Works/index.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            name: 'home',
            path: '/home',
            component:Home,
        },
        {
            name: 'works',
            path: '/works',
            component:Works,
        },
        {
            name:'register',
            path: '/register',
            component:Register,
        },
        {
            name:'login',
            path: '/login',
            component:Login,
        },
        {
            name:'shop',
            path: '/shop',
            component:Shop,
        },
        {
            path: '/',
            redirect:'/home',
            component:Home,
        },
    ]
})