<template>
  <div class="min-h-screen bg-[#F3F6F5] flex flex-col items-center pb-20">
    <div class="w-full max-w-[480px] bg-brand-dark pt-8 pb-4 px-4 text-center sticky top-0 z-20">
      <div class="flex items-center justify-center text-white">
        <h2 class="text-lg font-bold tracking-widest">章节专练</h2>
      </div>
    </div>
    
    <div class="w-full max-w-[480px] p-4 space-y-4">
      <div v-for="cat in store.categories" :key="cat.id" class="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
         <div class="font-bold text-gray-800 text-lg mb-4 flex items-center">
           <div class="w-2 h-6 bg-brand-green rounded-full mr-3"></div>
           {{ cat.name }}
         </div>
         <div class="flex gap-3">
           <button @click="start(cat.id, 'objective')" class="flex-1 bg-brand-green/10 text-brand-green py-3 rounded-xl font-bold text-sm active:bg-brand-green/20 transition">客观题模式</button>
           <button @click="start(cat.id, 'code')" class="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold text-sm active:bg-gray-200 transition">实操题演练</button>
         </div>
      </div>
    </div>
    <TabBar />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../store/quiz'
import TabBar from '../components/TabBar.vue'

const router = useRouter()
const store = useQuizStore()

onMounted(() => { store.fetchCategories() })

const start = async (catId, type) => {
  const ok = await store.startQuiz('practice', catId, type)
  if(ok) router.push('/quiz')
}
</script>
