<template>
  <div class="min-h-screen bg-[#F3F6F5] flex flex-col items-center pb-20">
    <div class="w-full max-w-[480px] bg-brand-dark pt-8 pb-4 px-4 text-center sticky top-0 z-20">
      <div class="flex items-center justify-center text-white">
        <h2 class="text-lg font-bold tracking-widest">错题本回顾</h2>
      </div>
    </div>
    
    <div class="w-full max-w-[480px] p-4 flex-1 flex flex-col">
      <div v-if="loading" class="text-center py-20 text-gray-400">正在整理错题集...</div>
      <div v-else-if="questions.length === 0" class="flex-1 flex flex-col items-center justify-center py-20">
        <div class="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-4">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <p class="text-gray-500 font-medium">太棒了！当前没有任何未解决的错题！</p>
      </div>
      <div v-else class="flex flex-col items-center flex-1 justify-center space-y-8 animate-fade-in pb-20">
        <div class="relative">
          <div class="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center text-red-500 border-4 border-white shadow-xl">
            <span class="text-4xl font-black">{{ questions.length }}</span>
          </div>
          <div class="absolute -bottom-2 -right-2 bg-brand-dark text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
            待消灭
          </div>
        </div>
        <p class="text-gray-500 font-medium text-center px-8">
          错题是提分的金钥匙。<br>在错题专练中答题后，必须手动点击【彻底掌握，移除该题】才能将其消灭哦！
        </p>
        <button @click="startPractice" class="w-full bg-red-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-red-500/30 active:scale-95 transition">
          立即开始消灭错题
        </button>
      </div>
    </div>
    <TabBar />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../store/quiz'
import TabBar from '../components/TabBar.vue'

const router = useRouter()
const store = useQuizStore()
const questions = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/mistakes/questions')
    questions.value = await res.json()
  } finally { loading.value = false }
})

const startPractice = () => {
  store.questions = questions.value
  store.mode = 'mistake'
  store.currentQuestionIndex = 0
  store.userAnswers = {}
  store.checkedQuestions = {}
  store.score = 0
  router.push('/quiz')
}
</script>
