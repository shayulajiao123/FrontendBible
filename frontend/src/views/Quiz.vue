<template>
  <div class="min-h-screen bg-brand-light flex flex-col relative pb-32">
    
    <header class="bg-brand-dark text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-20">
      <div class="flex items-center space-x-3">
        <button @click="back" class="text-xl px-2 active:opacity-50">&larr;</button>
        <span class="font-medium truncate max-w-[150px]">{{ store.mode === 'mock' ? '系统服务对比测试' : '章节顺序练习' }}</span>
      </div>
      <div class="text-sm flex items-center">
        <span v-if="store.mode === 'mock'" class="mr-3 font-mono bg-black/20 px-2 py-1 rounded">
          {{ formatTime(store.timeRemaining) }}
        </span>
        <span v-else class="mr-3 text-white/80 font-mono">
          {{ store.currentQuestionIndex + 1 }}/{{ store.questions.length }}题
        </span>
        <button @click="submit" class="bg-white text-brand-dark px-3 py-1.5 rounded text-sm font-bold active:bg-gray-100">交卷</button>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto p-4">
      <div v-if="currentQ" class="bg-white rounded-2xl shadow-sm p-6 relative">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center text-brand-gray text-sm">
            <span class="font-black text-xl text-brand-dark mr-2">{{ store.currentQuestionIndex + 1 }}.</span> 
            <span class="font-bold border border-brand-green text-brand-green px-2 py-0.5 rounded text-xs">
              {{ currentQ.type === 'multiple' ? '多选题' : (currentQ.type === 'single' ? '单选题' : '实操题') }}
            </span>
          </div>
          <!-- 仅练习模式展示评判结果标签 -->
          <div v-if="store.mode !== 'mock' && isEvaluated" class="text-sm font-bold" :class="isCorrect ? 'text-green-500' : 'text-red-500'">
            {{ isCorrect ? '回答正确' : '回答错误' }}
          </div>
        </div>
        
        <h2 class="text-[17px] text-gray-800 leading-relaxed font-medium mb-6 whitespace-pre-wrap">{{ currentQ.title }}</h2>

        <!-- 客观题选项 -->
        <div v-if="currentQ.type !== 'code'" class="space-y-3">
          <div 
            v-for="(opt, idx) in currentQ.options" 
            :key="idx"
            @click="toggleOption(opt, idx)"
            class="flex items-start p-4 rounded-xl border-2 cursor-pointer transition-colors"
            :class="getOptionClass(opt, idx)"
          >
            <div class="mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mr-3"
                 :class="getOptionIconClass(opt, idx)">
              <!-- 选中对勾 -->
              <svg v-if="isSelected(opt, idx) && !isEvaluated" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              <!-- 判卷后的对错图标 -->
              <svg v-if="isEvaluated && isCorrectOption(opt, idx)" class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              <svg v-if="isEvaluated && isSelected(opt, idx) && !isCorrectOption(opt, idx)" class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
            <span class="text-gray-700 leading-relaxed font-medium">{{ getDisplayText(opt) }}</span>
          </div>
        </div>

        <!-- 实操题自评逻辑 -->
        <div v-else class="space-y-4">
          <div class="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 border border-gray-200">
            请在本地 IDE 中完成编码后，点击下方按钮标记本题的掌握情况：
          </div>
          <div class="flex gap-4">
            <button @click="toggleOption('CORRECT')" 
                    :disabled="isEvaluated"
                    class="flex-1 py-3 rounded-lg font-bold border-2 transition disabled:opacity-50"
                    :class="isSelected('CORRECT') ? 'bg-brand-green text-white border-brand-green' : 'border-gray-200 text-brand-green'">
              我已掌握 (答对)
            </button>
            <button @click="toggleOption('WRONG')" 
                    :disabled="isEvaluated"
                    class="flex-1 py-3 rounded-lg font-bold border-2 transition disabled:opacity-50"
                    :class="isSelected('WRONG') ? 'bg-red-500 text-white border-red-500' : 'border-gray-200 text-red-500'">
              不会做 (答错)
            </button>
          </div>
        </div>
        
        <!-- 练习模式操作区：确认按钮 与 解析面板 -->
        <div v-if="store.mode !== 'mock'" class="mt-6">
          <div class="flex space-x-3">
            <!-- 确认答案按钮 -->
            <button v-if="!isEvaluated && currentAns.length > 0" 
                    @click="store.checkAnswer(currentQ.id)" 
                    class="flex-1 bg-brand-dark text-white py-3 rounded-xl font-bold shadow-md active:scale-95 transition">
              确认答案
            </button>
            
            <!-- 错题本专属：手动移除按钮 -->
            <button v-if="store.mode === 'mistake' && isEvaluated" 
                    @click="removeMistake(currentQ.id)"
                    class="flex-1 border-2 border-red-500 text-red-500 py-3 rounded-xl font-bold active:bg-red-50 transition">
              我已彻底掌握，移除该错题
            </button>
          </div>
          
          <!-- 解析面板 -->
          <div v-if="isEvaluated" class="bg-blue-50 border border-blue-100 rounded-xl p-5 mt-4">
            <h3 class="text-blue-800 font-bold mb-2 flex items-center">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              答案解析
            </h3>
            <p v-if="currentQ.type !== 'code'" class="text-gray-800 font-bold mb-2">正确答案：{{ currentQ.answer.join(',') }}</p>
            <div class="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{{ currentQ.explanation || '暂无解析' }}</div>
          </div>
        </div>

      </div>
    </main>

    <footer class="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white border-t p-4 flex flex-col z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
      <div class="flex flex-col items-center mb-4">
        <div class="w-8 h-1 bg-gray-200 rounded-full mb-3"></div>
        <p class="text-xs text-gray-400 font-bold mb-2">答题卡</p>
        <div class="flex space-x-2 overflow-x-auto w-full px-2 pb-3 justify-start scroll-smooth">
          <button v-for="(q, idx) in store.questions" :key="q.id" 
               @click="store.currentQuestionIndex = idx"
               class="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all"
               :class="getGridButtonClass(q, idx)">
            {{ idx + 1 }}
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center px-2">
        <button class="flex items-center text-brand-dark font-medium px-2 active:opacity-50">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>
          标记题目
        </button>
        <div class="flex space-x-3">
          <button @click="prev" :disabled="store.currentQuestionIndex === 0" class="bg-brand-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium disabled:opacity-30 active:scale-95 transition">&larr; 上一题</button>
          <button @click="next" :disabled="store.currentQuestionIndex === store.questions.length - 1" class="bg-brand-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium disabled:opacity-30 active:scale-95 transition">下一题 &rarr;</button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../store/quiz'

const router = useRouter()
const store = useQuizStore()

const currentQ = computed(() => store.questions[store.currentQuestionIndex])
const currentAns = computed(() => store.userAnswers[currentQ.value?.id] || [])
const isEvaluated = computed(() => store.checkedQuestions[currentQ.value?.id])

// 判断该题是否完全正确（供展示判卷结果使用）
const isCorrect = computed(() => {
  if (!currentQ.value) return false;
  if (currentQ.value.type === 'code') return currentAns.value.includes('CORRECT');
  return currentAns.value.length === currentQ.value.answer.length && currentAns.value.every(v => currentQ.value.answer.includes(v));
})

const getCharByIndex = (idx) => String.fromCharCode(65 + idx);

const getDisplayText = (opt) => {
  if (/^[A-Z][.、:]\s*/.test(opt)) {
    return opt.replace(/^[A-Z][.、:]\s*/, '');
  }
  return opt;
}

const isSelected = (opt, idx) => {
  if (opt === 'CORRECT' || opt === 'WRONG') return currentAns.value.includes(opt);
  return currentAns.value.includes(getCharByIndex(idx));
}
const isCorrectOption = (opt, idx) => currentQ.value.answer.includes(getCharByIndex(idx))

const getOptionClass = (opt, idx) => {
  if (store.mode === 'mock' || !isEvaluated.value) {
    // 未判卷：普通的选中状态
    return isSelected(opt, idx) ? 'border-brand-green bg-[#F2F8F5]' : 'border-gray-100 hover:bg-gray-50'
  }
  // 已判卷：正确选项标绿，选错的标红，其他置灰
  if (isCorrectOption(opt, idx)) {
    return 'border-green-500 bg-green-50'
  }
  if (isSelected(opt, idx) && !isCorrectOption(opt, idx)) {
    return 'border-red-500 bg-red-50'
  }
  return 'border-gray-100 opacity-60'
}

const getOptionIconClass = (opt, idx) => {
  const shape = currentQ.value.type === 'multiple' ? 'rounded' : 'rounded-full';
  if (store.mode === 'mock' || !isEvaluated.value) {
    return [shape, isSelected(opt, idx) ? 'bg-brand-green border-brand-green text-white' : 'border-gray-300']
  }
  if (isCorrectOption(opt, idx)) {
    return [shape, 'bg-green-500 border-green-500']
  }
  if (isSelected(opt, idx) && !isCorrectOption(opt, idx)) {
    return [shape, 'bg-red-500 border-red-500']
  }
  return [shape, 'border-gray-300']
}

const getGridButtonClass = (q, idx) => {
  if (idx === store.currentQuestionIndex) {
    return 'bg-brand-dark text-white shadow-md scale-110'
  }
  
  const isEval = store.checkedQuestions[q.id]
  const uAns = store.userAnswers[q.id] || []
  
  if (isEval) {
    let correct = false;
    if (q.type === 'code') {
      correct = uAns.includes('CORRECT')
    } else {
      correct = uAns.length === q.answer.length && uAns.every(v => q.answer.includes(v))
    }
    return correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }
  
  if (uAns.length > 0) {
    return 'bg-brand-green text-white'
  }
  
  return 'bg-gray-100 text-gray-500'
}

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

const toggleOption = (optString, idx) => {
  if (isEvaluated.value) return; // 已判卷，锁定选项
  let char;
  if (optString === 'CORRECT' || optString === 'WRONG') {
    char = optString;
  } else {
    char = getCharByIndex(idx);
  }
  let ans = [...currentAns.value]
  if (currentQ.value.type === 'single' || currentQ.value.type === 'code') {
    ans = [char]
  } else {
    if (ans.includes(char)) ans = ans.filter(c => c !== char)
    else ans.push(char)
  }
  store.answerQuestion(currentQ.value.id, ans)
}

const prev = () => { if (store.currentQuestionIndex > 0) store.currentQuestionIndex-- }
const next = () => { if (store.currentQuestionIndex < store.questions.length - 1) store.currentQuestionIndex++ }

const submit = () => {
  if (confirm('是否确认交卷？未作答的题目将被判错。')) {
    store.submitQuiz()
    router.replace('/result')
  }
}

const back = () => {
  router.replace('/')
}

const removeMistake = async (id) => {
  if (confirm('确认从错题本中移除该题吗？')) {
    try {
      await fetch('http://localhost:3000/api/mistakes/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: id })
      });
      alert('已成功移除！');
      next(); // 自动跳下一题
    } catch(e) {}
  }
}
</script>
