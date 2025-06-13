// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/accueil.vue'
import Morceau from '../views/morceau.vue'
const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/morceau/:id',
    name: 'Morceau',
    component: Morceau,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router