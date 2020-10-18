import Vue from 'vue'
import VueRouter from 'vue-router'
import Table from '../views/Table.vue'
import Transactions from '../views/Transactions.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/table' },
  {
    path: '/table',
    name: 'Table',
    component: Table
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
