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
            name:'Register',
            path: '/Register',
            component:Register,
        },
        {
            name:'Login',
            path: '/Login',
            component:Login,
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