import mysql from 'mysql2/promise';

const questions = [
  {
    category_id: 5,
    knowledge_point: "Vue是什么？",
    type: "single",
    title: "下列关于 Vue.js 的核心特性描述中，最准确的一项是？",
    options: [
      "Vue 是一套用于构建用户界面的渐进式框架，核心库只关注视图层。",
      "Vue 是一个主要用于操作 DOM 的 JavaScript 库，类似于 jQuery。",
      "Vue 是一个重型框架，必须强依赖于 TypeScript 和 Webpack 才能运行。",
      "Vue 仅支持单页面应用（SPA），无法在传统的多页面项目中逐步引入。"
    ],
    answer: "Vue 是一套用于构建用户界面的渐进式框架，核心库只关注视图层。",
    explanation: "> Vue是什么？\n\nVue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库整合。"
  },
  {
    category_id: 5,
    knowledge_point: "文本",
    type: "single",
    title: "在 Vue 模板中，若想将数据绑定到纯文本输出，并且在数据变化时自动更新，应该使用哪种语法？",
    options: [
      "双大括号 (Mustache) 语法，例如 `{{ msg }}`",
      "v-html 指令，例如 `<div v-html=\"msg\"></div>`",
      "单大括号语法，例如 `{ msg }`",
      "v-bind 指令，例如 `<div v-bind=\"msg\"></div>`"
    ],
    answer: "双大括号 (Mustache) 语法，例如 `{{ msg }}`",
    explanation: "> 模板语法 > 文本\n\n数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值：`<span>Message: {{ msg }}</span>`。Mustache 标签将会被替代为对应数据对象上 msg 属性的值。无论何时，绑定的数据对象上 msg 属性发生了改变，插值处的内容都会更新。"
  },
  {
    category_id: 5,
    knowledge_point: "原始 HTML",
    type: "single",
    title: "若需要在 Vue 中将带有 HTML 标签的字符串作为真正的 HTML 元素渲染出来，而不是纯文本，必须使用哪个指令？",
    options: [
      "v-html",
      "v-text",
      "v-bind",
      "v-dom"
    ],
    answer: "v-html",
    explanation: "> 模板语法 > 原始 HTML\n\n双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 `v-html` 指令：\n`<p>Using v-html directive: <span v-html=\"rawHtml\"></span></p>`"
  },
  {
    category_id: 5,
    knowledge_point: "属性 Attribute",
    type: "single",
    title: "Mustache 语法 (双大括号) 无法作用于 HTML 元素的 attribute（如 class、href、id）。若要动态绑定元素的 attribute，应该使用什么？",
    options: [
      "v-bind 指令，如 `v-bind:id=\"dynamicId\"` 或简写 `:id=\"dynamicId\"`",
      "双大括号插值，如 `id=\"{{ dynamicId }}\"`",
      "v-model 指令，如 `v-model:id=\"dynamicId\"`",
      "v-attr 指令，如 `v-attr:id=\"dynamicId\"`"
    ],
    answer: "v-bind 指令，如 `v-bind:id=\"dynamicId\"` 或简写 `:id=\"dynamicId\"`",
    explanation: "> 模板语法 > 属性 Attribute\n\nMustache 语法不能作用在 HTML attribute 上，遇到这种情况应该使用 `v-bind` 指令：\n`<div v-bind:id=\"dynamicId\"></div>`\n对于布尔 attribute，`v-bind` 也能正常工作。"
  },
  {
    category_id: 5,
    knowledge_point: "使用 JavaScript 表达式",
    type: "single",
    title: "关于 Vue 模板中的数据绑定，以下哪种写法是**非法**的 JavaScript 表达式？",
    options: [
      "`{{ var a = 1 }}`",
      "`{{ number + 1 }}`",
      "`{{ ok ? 'YES' : 'NO' }}`",
      "`{{ message.split('').reverse().join('') }}`"
    ],
    answer: "`{{ var a = 1 }}`",
    explanation: "> 模板语法 > 使用 JavaScript 表达式\n\nVue.js 都提供了完全的 JavaScript 表达式支持。但有个限制就是，每个绑定都只能包含**单个表达式**，所以下面的例子都**不会**生效：\n`<!-- 这是语句，不是表达式 -->`\n`{{ var a = 1 }}`\n`<!-- 流控制也不会生效，请使用三元表达式 -->`\n`{{ if (ok) { return message } }}`"
  },
  {
    category_id: 5,
    knowledge_point: "v-if",
    type: "single",
    title: "下列关于 v-if 和 v-show 指令的区别，说法正确的是？",
    options: [
      "v-if 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。",
      "v-show 是通过修改 DOM 元素的结构来实现隐藏和显示的。",
      "如果需要非常频繁地切换显示状态，应该优先使用 v-if 以节省性能。",
      "v-show 支持在 `<template>` 元素上使用，而 v-if 不支持。"
    ],
    answer: "v-if 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。",
    explanation: "> 条件渲染 > `v-if` vs `v-show` 的区别\n\n`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。\n`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 `display` 属性进行切换。\n一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好。"
  }
];

async function run() {
  console.log('🔄 开始清理垃圾数据并导入 AI 人工精编真题...');
  const pool = mysql.createPool({ host: 'localhost', user: 'root', password: '', database: 'frontend_bible' });
  await pool.query('TRUNCATE TABLE questions'); 
  await pool.query('TRUNCATE TABLE mistakes'); 
  
  let count = 0;
  for (const q of questions) {
     const optionsStr = JSON.stringify(q.options.sort(() => 0.5 - Math.random())); 
     await pool.query(
       'INSERT INTO questions (category_id, knowledge_point, type, title, options, answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?)',
       [q.category_id, q.knowledge_point, q.type, q.title, optionsStr, q.answer, q.explanation]
     );
     count++;
  }
  console.log(`✅ 成功导入 ${count} 道 Vue 试机真题！`);
  process.exit(0);
}
run().catch(console.error);
