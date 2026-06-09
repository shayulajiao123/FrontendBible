<template>
  <div class="min-h-screen bg-[#F3F6F5] flex flex-col pb-20">
    <!-- Header -->
    <div class="w-full max-w-[480px] mx-auto bg-brand-dark pt-8 pb-4 px-4 text-center sticky top-0 z-20 shadow-sm">
      <h2 class="text-lg font-bold tracking-widest text-white">参阅文档</h2>
    </div>
    
    <div class="w-full max-w-[480px] mx-auto flex-1 flex flex-col h-[calc(100vh-60px)]">
      <!-- 过滤区 -->
      <div class="bg-white p-4 shadow-sm z-10 flex gap-2">
        <input v-model="searchQuery" @input="loadPoints" type="text" placeholder="搜索考点或正文内容..." class="flex-1 bg-gray-50 border border-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm outline-none">
      </div>

      <!-- 内容区 (左右分栏或上下分栏) -->
      <div class="flex-1 flex overflow-hidden relative">
        
        <!-- 左侧目录 -->
        <div class="w-[140px] bg-white border-r border-gray-100 overflow-y-auto hidden md:block lg:block sm:block absolute top-0 bottom-0 left-0 z-10 sm:relative shadow-sm">
          <div v-if="pointsLoading" class="p-4 text-xs text-gray-400">加载目录...</div>
          <div v-else>
            <div v-for="cat in store.categories" :key="cat.id" class="border-b border-gray-50">
              <div class="p-3 text-sm font-bold text-brand-dark cursor-pointer flex justify-between items-center bg-gray-50/50" @click="toggleCategory(cat.id)">
                <span class="truncate">{{ cat.name }}</span>
                <svg :class="{'rotate-180': expandedCategories[cat.id]}" class="w-4 h-4 transition-transform text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <div v-show="expandedCategories[cat.id]" class="bg-white">
                <template v-for="pt in getPointsForCategory(cat.id)" :key="pt.id">
                  <div @click="loadContent(pt.id)"
                       class="p-3 pl-4 text-xs cursor-pointer transition border-l-2"
                       :class="selectedPointId === pt.id ? 'bg-brand-green/10 text-brand-dark font-bold border-brand-dark' : 'text-gray-600 hover:bg-gray-50 border-transparent'">
                    <div class="truncate">{{ pt.knowledge_point }}</div>
                  </div>
                </template>
                <div v-if="getPointsForCategory(cat.id).length === 0" class="p-3 pl-4 text-xs text-gray-400">暂无内容</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 对于极窄屏幕（比如手机），把目录放在上方，正文放在下方 -->
        <div class="flex-1 flex flex-col sm:flex-row w-full h-full relative">
          <!-- 手机端横向滚动的目录 -->
          <div class="w-full bg-white border-b border-gray-100 overflow-x-auto whitespace-nowrap px-2 py-2 sm:hidden shadow-sm flex gap-2 z-10">
            <template v-for="cat in store.categories" :key="'mob-cat-'+cat.id">
              <div v-if="getPointsForCategory(cat.id).length > 0" class="flex gap-2 items-center">
                <span class="text-xs font-bold text-gray-400 px-1">{{ cat.name }}</span>
                <button v-for="pt in getPointsForCategory(cat.id)" :key="pt.id" 
                     @click="loadContent(pt.id)"
                     class="inline-block px-3 py-1.5 text-xs rounded-full border transition-colors shrink-0"
                     :class="selectedPointId === pt.id ? 'bg-brand-dark text-white border-brand-dark shadow-md' : 'bg-gray-50 text-gray-600 border-gray-200'">
                  {{ pt.knowledge_point }}
                </button>
              </div>
            </template>
          </div>

          <!-- 右侧正文 / 下方正文 -->
          <div class="flex-1 overflow-y-auto p-4 bg-white relative">
            <div v-if="!selectedPointId" class="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <svg class="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              <p>请选择一个知识点查看内容</p>
            </div>
            <div v-else-if="contentLoading" class="h-full flex items-center justify-center text-gray-400">
              解析文档中...
            </div>
            <div v-else class="markdown-body text-sm" v-html="renderedContent"></div>
          </div>
        </div>

      </div>
    </div>
    
    <TabBar />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuizStore } from '../store/quiz'
import TabBar from '../components/TabBar.vue'
import { marked } from 'marked'
import 'github-markdown-css/github-markdown-light.css'

const store = useQuizStore()

const selectedCategory = ref('')
const points = ref([])
const pointsLoading = ref(false)
const searchQuery = ref('')

const selectedPointId = ref(null)
const renderedContent = ref('')
const contentLoading = ref(false)
const expandedCategories = ref({})

const toggleCategory = (id) => {
  expandedCategories.value[id] = !expandedCategories.value[id]
}

const getPointsForCategory = (categoryId) => {
  return points.value.filter(pt => pt.category_id === categoryId)
}

onMounted(async () => { 
  await store.fetchCategories() 
  // 默认收起所有类目 (不需要主动设为true)
  loadPoints()
})

const loadPoints = async () => {
  pointsLoading.value = true
  try {
    const url = `http://localhost:3000/api/docs/points?search=${encodeURIComponent(searchQuery.value)}`
    const res = await fetch(url)
    points.value = await res.json()
    // 搜索时，确保有结果的类目被展开
    if (searchQuery.value) {
      store.categories.forEach(c => {
        if (getPointsForCategory(c.id).length > 0) expandedCategories.value[c.id] = true
      })
    }
  } finally {
    pointsLoading.value = false
  }
}

const loadContent = async (id) => {
  selectedPointId.value = id
  contentLoading.value = true
  try {
    const res = await fetch(`http://localhost:3000/api/docs/content?id=${id}`)
    const data = await res.json()
    // 移除所有的 markdown 图片标记
    const noImgContent = data.content.replace(/!\[.*?\]\(.*?\)/g, '')
    renderedContent.value = marked(noImgContent)
  } finally {
    contentLoading.value = false
  }
}
</script>

<style>
/* 微调 markdown 样式以适应手机 */
.markdown-body {
  background-color: transparent !important;
  font-family: inherit !important;
}
.markdown-body h2 {
  font-size: 1.25rem;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
  margin-top: 1em;
}
.markdown-body h3 {
  font-size: 1.1rem;
}
.markdown-body pre {
  background-color: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
}
</style>
