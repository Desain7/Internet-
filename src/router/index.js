import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/index.vue'
import Shop from '../pages/Shop/index.vue'
import Works from '../pages/Works/index.vue'
import WorkInform from '../pages/WorkInform/index.vue'
import BackStage from '../pages/BackStage/index.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            name: 'Home',
            path: '/Home',
            component: Home,
            meta: { showNav: true }
        },
        {
            name: 'Works',
            path: '/Works',
            component: Works,
            meta: { showNav: true }
        },
        {
            name: 'Shop',
            path: '/Shop',
            component: Shop,
            meta: { showNav: true }
        },
        {
            name: 'WorkInform',
            path: '/WorkInform',
            component: WorkInform,
            meta: { showNav: true }
        },
        {
            name: 'BackStage',
            path: '/BackStage',
            component: BackStage,
            meta: { showNav: false }
        },
        {
            path: '/',
            redirect: '/Home',
            component: Home,
            meta: { showNav: true }
        },
    ]
})