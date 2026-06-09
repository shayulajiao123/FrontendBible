import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '关系选择器',
  content: `### 关系选择器\n\n**1. 后代选择器 (空格)**\n选择某元素内部的所有后代元素。\n\`ul li { color: red; }\`\n\n**2. 子代选择器 (>)**\n选择作为某元素直接子元素的元素（不含孙元素）。\n\`div > p { color: blue; }\`\n\n**3. 相邻兄弟选择器 (+)**\n选择紧接在另一元素后的元素，且二者有相同父元素。\n\`h1 + p { margin-top: 50px; }\`\n\n**4. 通用兄弟选择器 (~)**\n选择属于某个元素之后的所有兄弟元素。\n\`h1 ~ p { color: green; }\``
};

const questions = [
  { type: 'single', title: '以下哪个选择器表示选择 div 内部的所有 p 元素（包括子元素和孙元素）？', options: ['A. div > p', 'B. div + p', 'C. div p', 'D. div ~ p'], answer: 'C', explanation: '空格是后代选择器，选择所有层级的后代元素。' },
  { type: 'single', title: '子代选择器的符号是？', options: ['A. >', 'B. +', 'C. ~', 'D. 空格'], answer: 'A', explanation: '> 用于选择直接子元素。' },
  { type: 'single', title: '相邻兄弟选择器 (`h1 + p`) 会选择什么？', options: ['A. 紧跟在 h1 后面的所有 p 元素', 'B. 紧跟在 h1 后面的第一个 p 元素', 'C. h1 内部的第一个 p 元素', 'D. h1 前面的第一个 p 元素'], answer: 'B', explanation: '+ 是相邻兄弟选择器，只选择紧接在后面的第一个同级元素。' },
  { type: 'single', title: '通用兄弟选择器 (`h1 ~ p`) 会选择什么？', options: ['A. h1 之后同级的所有 p 元素', 'B. h1 内部的所有 p 元素', 'C. h1 之前的所有 p 元素', 'D. 紧跟 h1 的第一个 p 元素'], answer: 'A', explanation: '~ 选择指定元素之后的所有同级目标元素。' },
  { type: 'single', title: '对于 `ul > li`，以下说法正确的是？', options: ['A. 选择 ul 中所有的 li 元素', 'B. 仅选择作为 ul 直接子元素的 li', 'C. 选择 ul 旁边的 li 元素', 'D. 选择 ul 后面的所有 li 元素'], answer: 'B', explanation: '> 是子代选择器，只匹配第一级后代。' },
  { type: 'single', title: '如果在 HTML 中有两个相邻的 div，要为第二个 div 设置样式，应使用？', options: ['A. div > div', 'B. div + div', 'C. div ~ div', 'D. div div'], answer: 'B', explanation: '相邻兄弟选择器可以精确选择紧挨着前一个 div 的后一个 div。' },
  { type: 'single', title: '如何选择 class 为 box 的元素内的所有 span？', options: ['A. .box > span', 'B. .box span', 'C. .box + span', 'D. .box ~ span'], answer: 'B', explanation: '使用后代选择器。' },
  { type: 'single', title: '关系选择器中，权重计算时如何处理符号（如 >、+、~）？', options: ['A. 符号本身增加 1 的权重', 'B. 符号本身增加 10 的权重', 'C. 符号本身不增加权重', 'D. 降低整体权重'], answer: 'C', explanation: '结合符（空格、>、+、~）本身不贡献权重。' },
  { type: 'single', title: '在 `div.container > p.text` 中，权重（Specificity）是多少？', options: ['A. 0,1,1', 'B. 0,2,2', 'C. 0,2,1', 'D. 0,1,2'], answer: 'B', explanation: '包含两个类选择器 (20) 和两个标签选择器 (2)，即 0,2,2。' },
  { type: 'single', title: '如果有结构：`<ul><li><p>A</p></li></ul>`，`ul > p` 能选中 A 吗？', options: ['A. 能', 'B. 不能', 'C. 视浏览器而定', 'D. 需要添加 !important'], answer: 'B', explanation: 'p 不是 ul 的直接子元素，所以不能选中。' },
  { type: 'single', title: '以下哪种情况会匹配 `h2 + p`？', options: ['A. <h2>Title</h2><div></div><p>Text</p>', 'B. <h2>Title</h2><p>Text</p>', 'C. <div><h2>Title</h2><p>Text</p></div>', 'D. B 和 C 都匹配'], answer: 'D', explanation: '只要 p 紧挨着 h2 且有共同父级，即可匹配。' },
  { type: 'single', title: '要选择某个表单内所有被禁用的 input 并且它们是 div 的直接子元素，正确的选择器是？', options: ['A. form div > input:disabled', 'B. form div input:disabled', 'C. form > div > input', 'D. form div + input:disabled'], answer: 'A', explanation: 'form 内部的 div 的直接子元素 input，且处于 disabled 状态。' },
  { type: 'single', title: '`p ~ span` 的匹配条件是？', options: ['A. span 在 p 内部', 'B. span 紧跟在 p 后面', 'C. span 在 p 之后且拥有相同的父元素', 'D. span 和 p 必须相邻'], answer: 'C', explanation: '这是通用兄弟选择器的标准定义。' },
  { type: 'single', title: '后代选择器与子代选择器的核心区别是？', options: ['A. 后代选择器性能更好', 'B. 子代选择器支持多级嵌套', 'C. 子代选择器仅限直接子级，后代无限制', 'D. 后代选择器不能包含类名'], answer: 'C', explanation: '深度限制是它们唯一且核心的区别。' },
  { type: 'single', title: '多个相邻兄弟选择器可以链式书写吗？如 `li + li + li`', options: ['A. 可以，表示选择第三个及之后的连续 li', 'B. 不可以，语法错误', 'C. 可以，但无实际意义', 'D. 只能在列表元素中使用'], answer: 'A', explanation: '可以链式调用，常用于为第二个及以后的元素增加间距（如 margin-top）。' },
  { type: 'single', title: '关系选择器中最消耗渲染性能的是？', options: ['A. 后代选择器', 'B. 子代选择器', 'C. 相邻兄弟选择器', 'D. 伪类选择器'], answer: 'A', explanation: '后代选择器需要遍历整个子树，层级越深越消耗性能。' },
  { type: 'single', title: '`#main > .content p` 包含了哪些关系选择器？', options: ['A. 仅子代', 'B. 仅后代', 'C. 子代和相邻兄弟', 'D. 子代和后代'], answer: 'D', explanation: '包含了 > (子代) 和 空格 (后代)。' },
  { type: 'single', title: '如何仅去除列表中第一项的顶部边框，而保留其他项的？', options: ['A. li { border-top: none; }', 'B. li + li { border-top: 1px solid #ccc; }', 'C. li ~ li { border-top: none; }', 'D. ul > li { border-top: 1px; }'], answer: 'B', explanation: '利用 `li + li` 可以为除了第一个之外的所有 `li` 元素设置样式。' },
  { type: 'single', title: '关于选择器匹配方向，浏览器引擎（如 WebKit）通常是？', options: ['A. 从左到右匹配', 'B. 从右到左匹配', 'C. 随机匹配', 'D. 根据权重匹配'], answer: 'B', explanation: '浏览器解析 CSS 选择器时，为了提高效率，通常采用从右向左的方式匹配。' },
  { type: 'single', title: '`div, p` 属于关系选择器吗？', options: ['A. 是的，属于兄弟选择器', 'B. 不是，属于群组（分组）选择器', 'C. 是的，属于后代选择器', 'D. 不是，属于伪类'], answer: 'B', explanation: '逗号是分组选择器，不表示节点间的 DOM 关系。' },
  { type: 'code', title: '请使用相邻兄弟选择器，将紧跟在 h3 元素后的第一个 p 元素的文字颜色设置为红色。', options: [], answer: 'h3 + p { color: red; }', explanation: '使用 + 符号选择紧挨着 h3 的下一个同级 p 元素。' },
  { type: 'code', title: '请使用通用兄弟选择器，将所有跟在 h2 后面的同级 p 元素的 margin-top 设置为 10px。', options: [], answer: 'h2 ~ p { margin-top: 10px; }', explanation: '使用 ~ 符号选择 h2 后面的所有同级 p 元素。' },
  { type: 'code', title: '请编写选择器：选择所有 class 为 nav 的直接子级 ul，并将它们的 padding 设为 0。', options: [], answer: '.nav > ul { padding: 0; }', explanation: '使用 > 符号选择直接子代。' },
  { type: 'code', title: '请编写组合选择器：选择 article 内部所有包含 active 类的子代及后代 p 元素，并隐藏它们。', options: [], answer: 'article p.active { display: none; }', explanation: '空格表示后代元素，结合标签和类选择器即可。' },
  { type: 'code', title: '结合子代和相邻选择器：选择 ID 为 menu 的容器下，直接子级 div 后面的第一个相邻 ul，设置其背景为黑色。', options: [], answer: '#menu > div + ul { background: black; }', explanation: '通过 #menu > div 限定直接子代，再通过 + ul 找到相邻的列表。' }
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
