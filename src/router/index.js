import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import Home from "../views/Home.vue"
import detailArticle from "../views/detailArticle.vue"
import searchArticle from "../views/searchArticle.vue"
import personalCenter from "../views/personalCenter.vue"
import mainSet from "../views/mainSet.vue"
import editPage from "../views/editPage.vue"
import collectionList from "../views/collectionList.vue"
import readList from "../views/readList.vue"

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component: Home,
    meta:{
      keepAlive:true
    }
  },
  {
    path: '/register',
    component: Register,
    
  },
  {
    path: '/login',
    component: Login,
  },
  
  {
    path:'/detailArticle/:id',
    component: detailArticle,
  },
  {
    path:'/searchArticle',
    component: searchArticle,
  },
  {
    path:'/personalCenter',
    component: personalCenter,
  },
  {
    path:'/mainSet',
    component: mainSet,
  },
  {
    path:'/editPage',
    component: editPage,
  },
  {
    path:'/collectionList',
    component: collectionList,
  },
  {
    path:'/readList',
    component: readList,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
