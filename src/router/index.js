import Vue from 'vue'
import VueRouter from 'vue-router'
import VueParticles from "vue-particles";


Vue.use(VueRouter)
// Vue.use(VueParticles)
const routes = [
  {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/manage.vue'),
    redirect:"/teacher",
    children:[
      {path:'teacher',name:'Teacher',component:()=>import('../views/Teacher.vue')},
      {path:'student',name:'Student',component:()=>import('../views/Student.vue')},
      {path:'booking',name:'Booking',component:()=>import('../views/Booking.vue')},
    ],

  },
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue'),
  },
  {
    path: '/login2',
    name: 'login2',
    component: () => import('../views/login2.vue')
  },
  {
    path: '/selectStudent',
    name: 'selectStudent',
    component: () => import('../views/selectStudent.vue')
  },
  {
    path: '/selectTeacher',
    name: 'selectTeacher',
    component: () => import('../views/selectTeacher.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about.vue')
  },
  {
    path: '/person',
    name: 'person',
    component: () => import('../views/person.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
