<template>
  <div class="min-h-screen bg-[#F3F6F5] flex flex-col items-center pb-20">
    <div class="w-full max-w-[480px] bg-brand-dark pt-8 pb-4 px-4 text-center sticky top-0 z-20">
      <div class="flex items-center justify-center text-white">
        <h2 class="text-lg font-bold tracking-widest">全真模拟考</h2>
      </div>
    </div>
    
    <div class="w-full max-w-[480px] p-4 flex-1 flex flex-col items-center justify-center space-y-8 pb-20">
       <div class="text-center space-y-2">
         <div class="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green mx-auto mb-4">
           <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
         </div>
         <h3 class="text-xl font-bold text-gray-800">选择考试时长</h3>
         <p class="text-gray-500 text-sm">系统将从全题库随机抽取客观题为您组卷</p>
         <p class="text-red-400 text-sm font-bold">⚠️ 交卷前将不提供答案解析与正误反馈</p>
       </div>
       
       <div class="grid grid-cols-2 gap-4 w-full">
         <button v-for="time in [10, 15, 20, 30]" :key="time" @click="start(time)" class="bg-white border-2 border-transparent hover:border-brand-green text-gray-800 py-6 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center active:scale-95">
            <span class="text-3xl font-black text-brand-dark">{{ time }}</span>
            <span class="text-sm font-medium text-gray-500 mt-1">分钟</span>
         </button>
       </div>
    </div>
    <TabBar />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useQuizStore } from '../store/quiz'
import TabBar from '../components/TabBar.vue'

const router = useRouter()
const store = useQuizStore()

const start = async (timeLimit) => {
  // 传空字符串代表全题库
  const ok = await store.startQuiz('mock', '', 'objective', timeLimit)
  if(ok) router.push('/quiz')
}
</script>
