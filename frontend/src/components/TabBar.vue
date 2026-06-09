<template>
  <div class="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white border-t border-gray-100 flex justify-around items-center h-[60px] pb-safe z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
    <router-link to="/select-chapter" class="flex flex-col items-center flex-1 text-gray-400 transition-colors" active-class="text-brand-dark font-bold">
      <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
      <span class="text-[11px]">章节</span>
    </router-link>
    <router-link to="/select-knowledge" class="flex flex-col items-center flex-1 text-gray-400 transition-colors" active-class="text-brand-dark font-bold">
      <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      <span class="text-[11px]">考点</span>
    </router-link>
    <router-link to="/docs" class="flex flex-col items-center flex-1 text-gray-400 transition-colors" active-class="text-brand-dark font-bold">
      <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
      <span class="text-[11px]">文档</span>
    </router-link>
    <router-link to="/mistakes" class="flex flex-col items-center flex-1 text-gray-400 transition-colors" active-class="text-brand-dark font-bold">
      <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
      <span class="text-[11px]">错题</span>
    </router-link>
    <router-link to="/select-mock" class="flex flex-col items-center flex-1 text-gray-400 transition-colors" active-class="text-brand-dark font-bold">
      <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span class="text-[11px]">模拟</span>
    </router-link>
  </div>
</template>
