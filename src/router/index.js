import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/index.vue'
import Shop from '../pages/Shop/index.vue'
import Works from '../pages/Works/index.vue'
import WorkInform from '../pages/WorkInform/index.vue'
import BackStage from '../pages/BackStage/index.vue'

import Work from '../pages/BackStage/Work/index.vue'
import Worker from '../pages/BackStage/Worker/index.vue'
import Video from '../pages/BackStage/Video/index.vue'
import Comments from '../pages/BackStage/Comments/index.vue'


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
            children:[
                {
                    path:'',
                    redirect:'work'
                },
                {
                    name:'work',
                    path:'work',
                    component:Work,
                    // children:[{
                    //     name:'edit',
                    //     path:'edit',
                    //     component:Edit
                    // }]
                },
                {
                    name:'comments',
                    path:'comments',
                    component:Comments,
                },
                {
                    name:'worker',
                    path:'worker',
                    component:Worker,
                },
                {
                    name:'video',
                    path:'video',
                    component:Video,
                },
            ],
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