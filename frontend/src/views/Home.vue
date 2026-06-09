<template>
  <div class="min-h-screen bg-brand-light flex items-center justify-center">
    <div class="text-brand-dark font-bold">加载中...</div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
router.replace('/select-chapter')
</script>
