import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Join from '@/components/Join'
import Show from '@/components/Show'
import Write from '@/components/Write'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/join',
      name: 'Join',
      component: Join
    },
    {
      path: '/show',
      name: 'Show',
      component: Show
    },
    {
      path: '/write',
      name: 'Write',
      component: Write
    }
  ]
})
