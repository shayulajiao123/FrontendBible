import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '选择器二',
  content: `### 选择器二\n\n**1. ID选择器 (#)**\n针对某一个特定的标签来使用，只能使用一次。以 # 定义。\n\`#header { color: red; }\`\n\n**2. 合并选择器 (群组选择器)**\n提取共同样式减少代码。用逗号分隔。\n\`.header, .footer { height: 300px; }\`\n\n**3. 选择器的优先级 (权重)**\n行内样式 (1000) > ID选择器 (100) > 类选择器 (10) > 元素选择器 (1)。`
};

const questions = [
  { type: 'single', title: 'CSS选择器优先级中，类选择器的权重是多少？', options: ['1', '10', '100', '1000'], answer: 'B', explanation: '类选择器权重为10。' },
  { type: 'single', title: 'ID选择器在HTML文档中可以使用几次？', options: ['1次', '2次', '不限次数', '取决于标签类型'], answer: 'A', explanation: 'ID具有唯一性，在同一个HTML文档中只能使用一次。' },
  { type: 'single', title: '合并选择器使用什么符号进行分隔？', options: ['空格', '逗号', '加号', '波浪号'], answer: 'B', explanation: '合并选择器（群组选择器）使用逗号进行分隔。' },
  { type: 'single', title: '行内样式的权重是多少？', options: ['1', '10', '100', '1000'], answer: 'D', explanation: '行内样式权重最高，为1000。' },
  { type: 'single', title: '若有 `<div id="box" class="container" style="color: red;">`，则最终文本颜色由哪项决定？', options: ['id选择器', 'class选择器', '行内样式', '元素选择器'], answer: 'C', explanation: '行内样式权重1000大于ID选择器（100）。' },
  { type: 'single', title: '以下哪个是ID选择器的语法？', options: ['.header { }', '#header { }', 'header { }', '*header { }'], answer: 'B', explanation: 'ID选择器以 # 符号开头。' },
  { type: 'single', title: '元素选择器的权重是多少？', options: ['1', '10', '100', '1000'], answer: 'A', explanation: '元素（标签）选择器权重为1。' },
  { type: 'single', title: '关于合并选择器，以下说法错误的是？', options: ['可以将多个选择器用逗号隔开', '主要是为了减少重复的CSS代码', '只能合并类选择器，不能合并ID选择器', '各个选择器的权重是独立计算的'], answer: 'C', explanation: '任何类型的选择器都可以使用逗号进行合并。' },
  { type: 'single', title: '权重比较中，`#id .class` 的总权重是多少？', options: ['11', '110', '101', '100'], answer: 'B', explanation: 'ID选择器100 + 类选择器10 = 110。' },
  { type: 'single', title: '权重比较中，`div p .text` 的总权重是多少？', options: ['12', '11', '21', '110'], answer: 'A', explanation: '两个元素选择器(1+1) + 一个类选择器(10) = 12。' },
  { type: 'single', title: '权重比较中，`div#container` 的总权重是多少？', options: ['11', '101', '110', '111'], answer: 'B', explanation: '元素选择器1 + ID选择器100 = 101。' },
  { type: 'single', title: '以下选择器中权重最高的是？', options: ['.list .item', '#header', 'ul li .active', 'div p a'], answer: 'B', explanation: 'ID选择器权重为100，其他均不足100。' },
  { type: 'single', title: '在同一文档中定义了 `p { color: blue; }` 和 `.text { color: red; }`，`<p class="text">` 的颜色是？', options: ['blue', 'red', '黑色', '报错'], answer: 'B', explanation: '类选择器权重10大于元素选择器权重1，显示红色。' },
  { type: 'single', title: '!important 的作用是？', options: ['将权重增加1000', '提升为最高权重，覆盖行内样式', '降低权重', '仅在IE浏览器生效'], answer: 'B', explanation: '!important 具有最高优先级，超越行内样式。' },
  { type: 'single', title: '以下代码 `.btn, #submit, button { padding: 10px; }` 中，合并了几个选择器？', options: ['1个', '2个', '3个', '4个'], answer: 'C', explanation: '类选择器、ID选择器和元素选择器，共3个。' },
  { type: 'single', title: 'ID选择器对应HTML属性是？', options: ['class', 'name', 'id', 'style'], answer: 'C', explanation: 'ID选择器对应HTML元素的id属性。' },
  { type: 'single', title: '下列关于选择器权重的说法，正确的是？', options: ['10个类选择器的权重等于1个ID选择器', '权重值是按进制进位的，比如逢十进一', '权重比较是逐级比较的，不进位', '元素选择器可以覆盖ID选择器'], answer: 'C', explanation: '权重比较是逐级比较（ID级别、类级别、元素级别），不存在进位现象。' },
  { type: 'single', title: '`div, p, span { display: inline-block; }` 使用了什么选择器？', options: ['ID选择器', '类选择器', '合并选择器', '伪类选择器'], answer: 'C', explanation: '使用逗号分隔，属于合并选择器。' },
  { type: 'single', title: '权重比较中，`.nav ul li` 的总权重是？', options: ['11', '12', '21', '101'], answer: 'B', explanation: '一个类选择器(10) + 两个元素选择器(1+1) = 12。' },
  { type: 'single', title: '如何通过ID选择器为id为"main"的元素设置宽度？', options: ['main { width: 100px; }', '#main { width: 100px; }', '.main { width: 100px; }', '*main { width: 100px; }'], answer: 'B', explanation: 'ID选择器使用#加上id名称。' },
  { type: 'code', title: '请写出一个ID选择器，选中id为"footer"的元素，背景色为黑色。', options: [], answer: '#footer { background-color: black; }', explanation: '使用#footer选中id为footer的元素。' },
  { type: 'code', title: '请使用合并选择器，同时选中h1和h2元素，字体大小设置为20px。', options: [], answer: 'h1, h2 { font-size: 20px; }', explanation: '使用逗号合并h1和h2。' },
  { type: 'code', title: '已知行内样式的权重最高，请计算选择器 `.box #btn span` 的权重值。', options: [], answer: '111', explanation: '类选择器10 + ID选择器100 + 元素选择器1 = 111。' },
  { type: 'code', title: '请写出选择器：选中id为"nav"下的类名为"item"的元素，颜色为红色。', options: [], answer: '#nav .item { color: red; }', explanation: '后代选择器配合ID和类选择器。' },
  { type: 'code', title: '请计算选择器 `div.container ul li` 的权重值。', options: [], answer: '13', explanation: '三个元素选择器(div, ul, li)共3，加一个类选择器(.container)10，总和13。' }
];

async function run() {
  const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'frontend_bible' });
  try {
    const ts = Math.floor(Date.now() / 1000);
    await connection.execute(
      'INSERT INTO knowledge_docs (category_id, parent_title, knowledge_point, content, created_at, updated_at, deleted_at, is_del) VALUES (?, ?, ?, ?, ?, ?, 0, 0)',
      [2, knowledgeDoc.parent_title, knowledgeDoc.knowledge_point, knowledgeDoc.content, ts, ts]
    );
    for (const q of questions) {
      await connection.execute(
        'INSERT INTO questions (category_id, knowledge_point, type, title, options, answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [2, knowledgeDoc.knowledge_point, q.type, q.title, JSON.stringify(q.options), q.answer, q.explanation]
      );
    }
    console.log(`Success`);
  } catch (error) { console.error(error); } finally { await connection.end(); }
}
run();
