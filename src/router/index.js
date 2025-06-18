// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Morceau from '../views/Morceau.vue'
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