import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    categories: [],
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: {}, 
    checkedQuestions: {}, // 用于练习模式：记录已查看解析的题
    mode: 'practice', 
    timeLimit: 0, 
    timeRemaining: 0,
    timer: null,
    score: 0,
    loading: false
  }),
  actions: {
    async fetchCategories() {
      try {
        const res = await fetch('http://localhost:3000/api/categories')
        this.categories = await res.json()
      } catch (e) {
        console.error('Failed to fetch categories', e)
      }
    },
    async fetchQuestions(categoryId, type) {
      this.loading = true;
      try {
        let url = 'http://localhost:3000/api/questions?';
        if (categoryId) url += `categoryId=${categoryId}&`;
        if (type) url += `type=${type}`;
        
        const res = await fetch(url);
        this.questions = await res.json();
      } catch (e) {
        console.error('Failed to fetch questions', e);
        alert('无法连接到题库服务器，请检查后端是否启动。');
      } finally {
        this.loading = false;
      }
    },
    async startQuiz(mode, categoryId, type, timeLimitMins = 0) {
      await this.fetchQuestions(categoryId, type);
      if (this.questions.length === 0) {
        alert('该分类/类型下暂无题目！');
        return false;
      }

      this.mode = mode
      this.currentQuestionIndex = 0
      this.userAnswers = {}
      this.checkedQuestions = {}
      this.score = 0
      
      if (mode === 'mock' && timeLimitMins > 0) {
        this.timeLimit = timeLimitMins * 60
        this.timeRemaining = this.timeLimit
        this.startTimer()
      }
      return true;
    },
    startTimer() {
      if (this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--
        } else {
          this.submitQuiz()
        }
      }, 1000)
    },
    answerQuestion(questionId, selectedOptions) {
      this.userAnswers[questionId] = selectedOptions
    },
    checkAnswer(questionId) {
      this.checkedQuestions[questionId] = true;
      
      const q = this.questions.find(item => item.id === questionId);
      const uAns = this.userAnswers[questionId] || [];
      let isCorrect = false;
      
      if (q.type === 'code') {
          isCorrect = uAns.includes('CORRECT');
      } else {
          isCorrect = uAns.length === q.answer.length && uAns.every(val => q.answer.includes(val));
      }
      
      // 练习模式下立即记录对错到错题本
      try {
        fetch('http://localhost:3000/api/mistakes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId: q.id, isCorrect })
        });
      } catch(e) {}
    },
    async submitQuiz() {
      if (this.timer) clearInterval(this.timer)
      let correctCount = 0;
      
      for (const q of this.questions) {
        const uAns = this.userAnswers[q.id] || []
        let isCorrect = false;
        if (q.type === 'code') {
           isCorrect = uAns.includes('CORRECT');
        } else {
           isCorrect = uAns.length === q.answer.length && uAns.every(val => q.answer.includes(val));
        }
        
        if (isCorrect) correctCount++;
        
        // 模拟考结束后统一下发错题记录（只下发未在练习时验证过的题）
        if (!this.checkedQuestions[q.id]) {
            try {
              await fetch('http://localhost:3000/api/mistakes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questionId: q.id, isCorrect })
              });
            } catch(e) {}
        }
      }
      
      this.score = Math.round((correctCount / this.questions.length) * 100)
    }
  }
})
