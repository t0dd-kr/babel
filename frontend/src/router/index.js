import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Join from '@/components/Join'
import Show from '@/components/Show'
import Search from '@/components/Search'
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
      path: '/show/:id',
      name: 'Show',
      component: Show
    },
    {
      path: '/write/:id',
      name: 'Write',
      component: Write
    },
    {
      path: '/search/:text',
      name: 'Search',
      component: Search
    }
  ]
})
