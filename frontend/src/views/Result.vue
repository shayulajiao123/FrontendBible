<template>
  <div class="min-h-screen bg-brand-light flex flex-col relative pb-10">
    <!-- 顶部状态栏 -->
    <header class="bg-brand-dark text-white p-4 flex items-center shadow-md sticky top-0 z-20">
      <button @click="$router.push('/')" class="text-xl px-2 mr-4 active:opacity-50">&larr;</button>
      <span class="font-medium">考试结果</span>
    </header>

    <main class="p-4 flex-1">
      <!-- 得分大卡片 -->
      <div class="bg-white rounded-2xl shadow-sm p-8 text-center mb-6 border border-gray-50">
        <p class="text-gray-500 mb-4 font-medium">您的得分</p>
        
        <!-- 环形进度条 CSS 实现 -->
        <div class="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#F3F6F5" stroke-width="10"></circle>
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1E5E45" stroke-width="10" 
                    :stroke-dasharray="`${store.score * 2.827} 282.7`" 
                    stroke-linecap="round"
                    class="transition-all duration-1000 ease-out"></circle>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-5xl font-black text-brand-dark">{{ store.score }}</span>
            <span class="text-gray-400 font-bold">/100</span>
          </div>
        </div>
        
        <div class="bg-gray-50 rounded-lg inline-block px-4 py-2">
          <p class="text-sm text-brand-gray flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            用时 {{ Math.floor((store.timeLimit - store.timeRemaining)/60) }} 分 {{ (store.timeLimit - store.timeRemaining)%60 }} 秒
          </p>
        </div>
      </div>

      <!-- 解析列表 -->
      <div class="bg-white rounded-2xl shadow-sm p-6">
        <h3 class="font-bold text-brand-dark mb-6 text-lg border-b pb-4">全部题目解析</h3>
        
        <div v-for="(q, idx) in store.questions" :key="q.id" class="mb-8 pb-8 border-b last:border-0 border-gray-100">
          <div class="flex items-start mb-4">
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-bold mr-3 mt-1 flex-shrink-0"
                 :class="isCorrect(q.id) ? 'bg-brand-green' : 'bg-red-500'">
              {{ idx + 1 }}
            </div>
            <h4 class="font-medium text-gray-800 leading-relaxed">{{ q.title }}</h4>
          </div>

          <div class="space-y-2 mb-4 pl-9">
            <div v-for="opt in q.options" :key="opt" class="text-sm p-3 rounded-lg border"
                 :class="[
                   q.answer.includes(opt.charAt(0)) ? 'border-brand-green bg-[#F2F8F5] text-brand-dark font-medium' : 'border-gray-100 text-gray-500',
                   (!q.answer.includes(opt.charAt(0)) && store.userAnswers[q.id]?.includes(opt.charAt(0))) ? 'border-red-200 bg-red-50 text-red-600' : ''
                 ]">
              {{ opt }}
              <span v-if="q.answer.includes(opt.charAt(0))" class="float-right text-brand-green">✓</span>
              <span v-if="!q.answer.includes(opt.charAt(0)) && store.userAnswers[q.id]?.includes(opt.charAt(0))" class="float-right text-red-500">✗</span>
            </div>
          </div>

          <div class="ml-9 bg-gray-50 p-4 rounded-xl text-sm border border-gray-100">
            <p class="font-medium text-gray-800 mb-1">答案解析：</p>
            <p class="text-gray-600 leading-relaxed">{{ q.explanation }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useQuizStore } from '../store/quiz'
const store = useQuizStore()

const isCorrect = (qId) => {
  const q = store.questions.find(item => item.id === qId)
  const uAns = store.userAnswers[qId] || []
  return uAns.length === q.answer.length && uAns.every(val => q.answer.includes(val))
}
</script>
