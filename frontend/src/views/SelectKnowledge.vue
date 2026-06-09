<template>
  <div class="min-h-screen bg-[#F3F6F5] flex flex-col items-center pb-20">
    <div class="w-full max-w-[480px] bg-brand-dark pt-8 pb-4 px-4 text-center sticky top-0 z-20">
      <div class="flex items-center justify-center text-white">
        <h2 class="text-lg font-bold tracking-widest">知识点专练</h2>
      </div>
    </div>
    
    <div class="w-full max-w-[480px] p-4 flex-1 flex flex-col">
      <!-- 选择章节 -->
      <div class="mb-6">
        <div class="flex flex-wrap gap-2">
          <button v-for="cat in store.categories" :key="cat.id" 
                  @click="selectedCategory = cat.id; loadKnowledgePoints()"
                  class="px-4 py-2 rounded-xl text-sm font-bold transition-all"
                  :class="selectedCategory === cat.id ? 'bg-brand-dark text-white shadow-md transform scale-105' : 'bg-white text-gray-600 border border-gray-200 active:bg-gray-100'">
            {{ cat.name }}
          </button>
        </div>
      </div>
      
      <!-- 选择知识点 -->
      <div v-if="selectedCategory">
        <label class="block text-sm font-bold text-gray-700 mb-2">第 2 步：攻克具体知识点</label>
        <div v-if="loading" class="text-center py-10 text-gray-400">加载中...</div>
        <div v-else-if="kps.length === 0" class="text-center py-10 text-gray-400">该章节暂无细分知识点</div>
        <div v-else class="space-y-3">
          <div v-for="kp in kps" :key="kp" class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between">
             <div class="font-bold text-gray-800 flex items-center text-[15px]">
               <div class="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
               {{ kp }}
             </div>
             <button @click="start(kp)" class="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg font-bold text-sm active:bg-purple-100">开练</button>
          </div>
        </div>
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

const selectedCategory = ref('')
const kps = ref([])
const loading = ref(false)

onMounted(() => { store.fetchCategories() })

const loadKnowledgePoints = async () => {
  if(!selectedCategory.value) return;
  loading.value = true;
  try {
    const res = await fetch(`http://localhost:3000/api/knowledge-points?categoryId=${selectedCategory.value}`)
    kps.value = await res.json()
  } finally { loading.value = false }
}

const start = async (kp) => {
  store.loading = true;
  try {
    const res = await fetch(`http://localhost:3000/api/questions?categoryId=${selectedCategory.value}&knowledgePoint=${encodeURIComponent(kp)}`);
    store.questions = await res.json();
    if(store.questions.length === 0) { alert('暂无题目'); return; }
    
    store.mode = 'practice'
    store.currentQuestionIndex = 0
    store.userAnswers = {}
    store.checkedQuestions = {}
    store.score = 0
    router.push('/quiz')
  } finally { store.loading = false }
}
</script>
