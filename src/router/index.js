import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import menberset from '../views/MenberSet.vue'
import newsSet from '../views/NewsSet.vue'
import newsClassSet from '../views/NewsClassSet.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
      path:'/menber/set',
      component:menberset
    },{
      path:'/news/set',
      component:newsSet
    },{
      path: '/newsClass/set',
      component:newsClassSet
    }]
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
