import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/index.vue'
import Shop from '../pages/Shop/index.vue'
import Works from '../pages/Works/index.vue'
import WorkInform from '../pages/WorkInform/index.vue'
import BackStage from '../pages/BackStage/index.vue'
import User from '../pages/Personal/index.vue'


import Work from '../pages/BackStage/Work/index.vue'
import Add from '../pages/BackStage/Work/Add/index.vue'
import Worker from '../pages/BackStage/Worker/index.vue'
import Video from '../pages/BackStage/Video/index.vue'
import Comments from '../pages/BackStage/Comments/index.vue'

import UserInfo from '../pages/Personal/info/index.vue'
import Favor from '../pages/Personal/favor/index.vue'
import Collect from '../pages/Personal/collect/index.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            name: 'Home',
            path: '/Home',
            component: Home,
            meta: { showNav: true, showFooter: true }
        },
        {
            name: 'Works',
            path: '/Works',
            component: Works,
            meta: { showNav: true, showFooter: true }
        },
        {
            name: 'Shop',
            path: '/Shop',
            component: Shop,
            meta: { showNav: true, showFooter: true }
        },
        {
            name: 'WorkInform',
            path: '/WorkInform',
            component: WorkInform,
            meta: { showNav: true, showFooter: true }
        },
        {
            name: 'BackStage',
            path: '/BackStage',
            component: BackStage,
            children: [
                {
                    path: '',
                    redirect:'work'
                },
                {
                    name: 'work',
                    path: 'work',
                    component: Work,
                    children:[{
                        name:'add',
                        path:'add',
                        component:Add
                    }]
                },
                {
                    name: 'comments',
                    path: 'comments',
                    component: Comments,
                },
                {
                    name: 'worker',
                    path: 'worker',
                    component: Worker,
                },
                {
                    name: 'video',
                    path: 'video',
                    component: Video,
                },
            ],
            meta: { showNav: false, showFooter: false }
        },
        {
            name: 'User',
            path: '/User',
            component: User,
            children: [
                {
                    path: '',
                    redirect:'info'
                },
                {
                    path: 'info',
                    component: UserInfo,
                    meta: { showNav: true, showFooter: false }
                },
                {
                    path: 'favor',
                    component: Favor,
                    meta: { showNav: true, showFooter: false }
                },
                {
                    path: 'collect',
                    component: Collect,
                    meta: { showNav: true, showFooter: false }
                },

            ],
            meta: { showNav: true, showFooter: false }
        },
        {
            path: '/',
            redirect: '/Home',
            component: Home,
            meta: { showNav: true, showFooter: true }
        },
    ]
})