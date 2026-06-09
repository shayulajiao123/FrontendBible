import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Quiz from '../views/Quiz.vue'
import Result from '../views/Result.vue'
import SelectChapter from '../views/SelectChapter.vue'
import SelectKnowledge from '../views/SelectKnowledge.vue'
import Mistakes from '../views/Mistakes.vue'
import SelectMock from '../views/SelectMock.vue'
import Docs from '../views/Docs.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/quiz', name: 'Quiz', component: Quiz },
  { path: '/result', name: 'Result', component: Result },
  { path: '/select-chapter', name: 'SelectChapter', component: SelectChapter },
  { path: '/select-knowledge', name: 'SelectKnowledge', component: SelectKnowledge },
  { path: '/docs', name: 'Docs', component: Docs },
  { path: '/mistakes', name: 'Mistakes', component: Mistakes },
  { path: '/select-mock', name: 'SelectMock', component: SelectMock }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
