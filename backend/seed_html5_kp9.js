import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第一章：HTML5',
  knowledge_point: '列表标签之无序列表',
  content: `### 列表标签之无序列表

无序列表是一个项目的列表，此列项目使用粗体圆点（典型的小黑圆圈）进行标记。
无序列表始于 \`<ul>\` 标签。每个列表项始于 \`<li>\`。

**1. 基本语法**
\`\`\`html
<ul>
  <li>咖啡</li>
  <li>牛奶</li>
  <li>茶</li>
</ul>
\`\`\`
浏览器中显示如下：
* 咖啡
* 牛奶
* 茶

**2. type 属性 (HTML5 不推荐)**
在早期的 HTML 中，\`<ul>\` 的 type 属性用来设置列表项前面的标记类型：
* \`disc\`：默认值，实心圆点
* \`circle\`：空心圆圈
* \`square\`：实心方块
*注：在现代开发中，推荐使用 CSS 的 \`list-style-type\` 属性来替代原生的 type 属性控制列表标记。*

**3. 实际应用场景**
在现代前端开发中，无序列表（\`<ul>\`）被极其广泛地应用于制作网页的导航菜单（Navigation bar）。通过配合 CSS 去除圆点 (\`list-style-type: none\`) 和设置浮动或 Flex 布局，\`<ul>\` 能够非常优雅地实现并列的菜单项。`
};

const questions = [
  // 20 单选题
  {
    type: 'single',
    title: '在 HTML 中，定义“无序列表（Unordered List）”的最外层标签是？',
    options: ['A. <ol>', 'B. <ul>', 'C. <li>', 'D. <list>'],
    answer: 'B',
    explanation: '<ul> 代表 Unordered List（无序列表）。<ol> 是有序列表。'
  },
  {
    type: 'single',
    title: '无序列表在浏览器中的默认显示标记是什么形状的？',
    options: ['A. 阿拉伯数字', 'B. 空心圆圈', 'C. 实心小圆点 (disc)', 'D. 实心小方块 (square)'],
    answer: 'C',
    explanation: '如果不进行任何设置，<ul> 列表项前面的默认标记（marker）是实心的黑色小圆点（对应属性值为 disc）。'
  },
  {
    type: 'single',
    title: '以下哪个属性可以用来改变传统 `<ul type="...">` 标签前方圆点的形状（如改成方块）？',
    options: ['A. style-type', 'B. shape', 'C. marker', 'D. type'],
    answer: 'D',
    explanation: '在早期的 HTML 中，可以使用 type 属性（如 type="square"）来改变形状。不过在 HTML5 规范中，推荐统一使用 CSS 的 list-style-type 来控制。'
  },
  {
    type: 'single',
    title: '如果你希望无序列表的前置标记变成一个“空心圆圈”，应该将 type 属性或 CSS 的 list-style-type 设置为什么值？',
    options: ['A. disc', 'B. circle', 'C. square', 'D. none'],
    answer: 'B',
    explanation: 'circle 代表空心圆，disc 是默认的实心圆，square 是实心方块。'
  },
  {
    type: 'single',
    title: '关于 `<ul>` 的嵌套规则，以下说法绝对正确的是？',
    options: ['A. `<ul>` 的直接子元素必须且只能是 `<li>` 标签', 'B. `<ul>` 内部可以直接嵌套 `<div>` 用来分组', 'C. `<li>` 内部只能写纯文本', 'D. 可以在 `<ul>` 内部直接嵌套 `<ol>` 而不使用 `<li>` 包裹'],
    answer: 'A',
    explanation: '这是 HTML 列表的铁律。不管是 ul 还是 ol，它们的直接子节点绝对不允许是 li 以外的任何标签。多级嵌套必须包裹在某个 li 的内部。'
  },
  {
    type: 'single',
    title: '现代前端网页中，网站顶部通常会有一排并列的“导航栏菜单（首页、产品、关于我们等）”。这种结构在语义化 HTML 中，最推荐使用什么标签来构建？',
    options: ['A. 纯文本加上多个空格', 'B. 多个连续的 `<p>` 标签', 'C. 包含多个 `<li>` 的 `<ul>` 无序列表', 'D. 一个带有表格边框的 `<table>`'],
    answer: 'C',
    explanation: '使用 <ul> 和 <li> 来构建导航菜单是前端界的最佳实践（Best Practice）。它语义清晰（表示一组并列的链接项目），非常便于屏幕阅读器理解和搜索引擎抓取。'
  },
  {
    type: 'single',
    title: '如果我们使用 `<ul>` 制作导航菜单，怎么做才能把默认的丑陋“小黑圆点”去掉？',
    options: ['A. 给 ul 添加属性 `hide-dot="true"`', 'B. 通过 CSS 设置 `list-style-type: none;`', 'C. 故意不写 li 标签就能去掉', 'D. 浏览器会自动识别导航栏并隐藏圆点'],
    answer: 'B',
    explanation: '去除列表前缀符号的唯一标准做法是通过 CSS 样式表：`ul { list-style-type: none; }` 或简写为 `list-style: none;`。'
  },
  {
    type: 'single',
    title: '在一个普通的 `<ul>` 列表中，多个 `<li>` 默认是垂直排列还是一排水平排列的？',
    options: ['A. 水平排列，因为它们是行内元素', 'B. 垂直排列，从上到下', 'C. 紧密挨在一起，没有换行', 'D. 取决于文字的多少'],
    answer: 'B',
    explanation: '<li> 是块级元素（在列表上下文中计算为 display: list-item，类似 block），默认会独占一行，因此呈现为从上到下的垂直排列排版。'
  },
  {
    type: 'single',
    title: '如果我们用 `<ul>` 做了导航栏，但是想要这几个 `<li>` 菜单项“水平并列”在一行，通常需要借助什么技术？',
    options: ['A. 只需要删除 li 前面的圆点即可自动水平', 'B. 将 ul 的标签名字改成 <inline-list>', 'C. 必须借助 CSS（如 Float，或者 Flexbox，或者将 li 设为 inline-block）', 'D. 强行把所有 HTML 代码写在一行不要回车'],
    answer: 'C',
    explanation: 'HTML 只负责结构（它是列表），不负责排版样式（它怎么排列）。要改变块级元素的垂直流使其水平排列，必须借助 CSS 布局技术（现代首选 Flexbox）。'
  },
  {
    type: 'single',
    title: '在无序列表中使用图片代替默认的“小圆点”作为前缀标识，最佳的实现方式是？',
    options: ['A. 在每个 `<li>` 的文本最前面手动加一个 `<img>` 标签', 'B. 使用 CSS 属性 `list-style-image: url("...");`', 'C. 用 JavaScript 动态插入图片节点', 'D. HTML 无法实现这种效果'],
    answer: 'B',
    explanation: 'CSS 提供了原生的 list-style-image 属性，可以非常方便地用自定义的图标（如一个打勾的绿色小图标）替换掉无聊的黑圆点，而且这种方式对 HTML 结构的侵入性最小。'
  },
  {
    type: 'single',
    title: '如果在 HTML 代码里写了：`<ul><li>一<ul><li>二</li></ul></li></ul>`，它渲染出来的视觉效果是什么样的？',
    options: ['A. 会报错，列表不能嵌套列表', 'B. 形成一个有明显缩进的树状层级结构，第二级的前缀圆点样式可能与第一级不同', 'C. 所有文字会变成一行显示', 'D. 内部的列表会被忽略不显示'],
    answer: 'B',
    explanation: '这就是多级无序列表（常用于多级下拉菜单或树形目录）。浏览器会自动为内层 <ul> 添加缩进（padding-left），并且通常会自动将第二级的圆点样式（如改成空心圆）以示区分。'
  },
  {
    type: 'single',
    title: '对比 `<ol>` 和 `<ul>` 的使用场景，如果要列出一道菜的烹饪步骤（洗菜 -> 切菜 -> 炒菜），最应该用哪个？',
    options: ['A. <ul>', 'B. <ol>', 'C. 都可以，看心情', 'D. 都不合适'],
    answer: 'B',
    explanation: '烹饪步骤具有严格的逻辑先后顺序，打乱顺序就会出问题。因此必须使用带有强顺序语义的 Ordered List (<ol>)。'
  },
  {
    type: 'single',
    title: '如果要列举一家超市售卖的水果品种（苹果、香蕉、橘子、西瓜），最适合使用什么标签？',
    options: ['A. <ol>', 'B. <ul>', 'C. <table>', 'D. <form>'],
    answer: 'B',
    explanation: '水果列表是并列的关系，没有绝对的先后排序或优劣之分。对于这种并列项目集合，最语义化的标签就是 Unordered List (<ul>)。'
  },
  {
    type: 'single',
    title: 'HTML 的 `<ul>` 标签自带了哪些默认的内外边距（在重置 CSS 之前）？',
    options: ['A. 没有边距', 'B. 自带 margin-top, margin-bottom 和 padding-left', 'C. 只有 padding-right', 'D. 只有边框没有边距'],
    answer: 'B',
    explanation: '浏览器默认样式表中，<ul> 和 <ol> 都会附带上下外边距（通常是 1em）以与前后的段落隔开，并且带有大约 40px 的左内边距（padding-left）用来容纳前缀圆点。'
  },
  {
    type: 'single',
    title: '以下代码段：`<ul> <p><li>测试</li></p> </ul>`，存在什么问题？',
    options: ['A. 没有任何问题', 'B. p 标签不能包含文字', 'C. 严重违反嵌套规则，<ul> 的直接子节点必须是 <li>，而这里变成了 <p>', 'D. 应该写成 </li></p></ul>'],
    answer: 'C',
    explanation: '这是一个经典的错误。开发者试图用 <p> 把 <li> 抱起来，这是绝对禁止的。正确的做法是把 <p> 放在 <li> 的里面：`<ul><li><p>测试</p></li></ul>`。'
  },
  {
    type: 'single',
    title: '如果希望点击无序列表中的某一项就能跳转到另外一个页面，以下正确的写法是？',
    options: ['A. `<ul href="page.html"><li>项目</li></ul>`', 'B. `<li href="page.html">项目</li>`', 'C. `<ul><li><a href="page.html">项目</a></li></ul>`', 'D. `<a><ul><li>项目</li></ul></a>`'],
    answer: 'C',
    explanation: '跳转必须依赖 <a> 标签。正确的结构是在 <li> 内部嵌套 <a> 标签包裹文字。D选项虽然在 HTML5 中勉强合法（a 包裹块元素），但语义上不推荐如此粗暴地包裹整个列表。'
  },
  {
    type: 'single',
    title: '对于一个使用 CSS 设置了 `display: flex` 的 `<ul>`，其内部的 `<li>` 元素会默认发生什么变化？',
    options: ['A. 小圆点会变大一倍', 'B. li 元素将不再显示圆点，且会自动水平并列排开', 'C. 整个列表会隐藏', 'D. li 会变成块级元素独占一行'],
    answer: 'B',
    explanation: '这是现代前端最常用的导航条布局手法。赋予 ul flex 布局后，其子项 li 会变为 flex items 从而默认水平排列（flex-direction: row）。在某些浏览器渲染机制下，它可能还会改变或丢失 marker 的排版位置，通常我们都会手动配合 list-style: none 去除圆点。'
  },
  {
    type: 'single',
    title: '在无序列表中使用 `list-style-position: inside;` 这个 CSS 属性，会产生什么效果？',
    options: ['A. 把列表移动到屏幕中间', 'B. 让前面的小圆点跑到文字内容的右边去', 'C. 小圆点会被拉入列表项的文本块内部，如果文本换行，第二行文本会退回到小圆点的下方，而不再是悬挂缩进对齐', 'D. 会让小圆点变成三角形'],
    answer: 'C',
    explanation: '默认情况下，圆点是挂在 <li> 内容盒子外部的（outside），文字换行能整齐对齐。如果设为 inside，圆点就成了第一行文字的一部分，一旦换行，整体排版会显得参差不齐。'
  },
  {
    type: 'single',
    title: '我们在审查元素（F12）时，发现某网站的导航菜单里有一些奇奇怪怪的空白缝隙。原因是他们使用的是行内块 `display: inline-block` 来横向排列 `<li>` 标签。这缝隙的罪魁祸首通常是？',
    options: ['A. 浏览器的 Bug', 'B. HTML 源代码中两个 <li> 标签之间的回车换行符被解析成了可见的空白文本节点（空格）', 'C. <li> 标签自带了去不掉的 margin', 'D. HTML 不支持 inline-block'],
    answer: 'B',
    explanation: '这是非常经典的历史面试题“如何消除 inline-block 元素间的间隙”。因为它们表现如行内文字，源代码里的换行会被折叠为一个空格。现代开发通常用 Flex 布局避开此坑。'
  },
  {
    type: 'single',
    title: '如果我们需要在 `<ul>` 列表中添加一条横向分隔线，但不影响语义（例如分隔两个不同分组的菜单），除了用 CSS border，还可以插入什么标签作为直接子元素？（HTML5 宽松规范）',
    options: ['A. 只能用 <li>', 'B. 可以在 <li> 之间插入 <hr> 标签或 <script>、<template> 标签（HTML5 允许某些特定元数据元素或 hr 作为直接子元素以增强语义表现）', 'C. 可以插入任意 div', 'D. 可以插入 p 标签'],
    answer: 'B',
    explanation: '在严谨的旧版规范中，ul 只能包含 li。但在较新的 HTML 规范更新中，允许 <hr> 标签直接作为 ul 的子元素出现，专门用于实现列表项在视觉或语义上的分隔（如菜单分割线）。这是一个相对冷门但有用的新特性。'
  },

  // 5 代码题
  {
    type: 'code',
    title: '请编写一段简单的 HTML 代码，创建一个包含三个选项（苹果、香蕉、橙子）的无序列表。',
    options: [],
    answer: '<ul>\n  <li>苹果</li>\n  <li>香蕉</li>\n  <li>橙子</li>\n</ul>',
    explanation: '最基础的无序列表，使用一对 ul 标签包裹，内部使用三个 li 标签。'
  },
  {
    type: 'code',
    title: '请编写一段代码，生成一个无序列表，包含两个列表项：“前端”和“后端”。要求使用老式 HTML 属性，将列表前面的黑圆点强制替换为“实心方块 (square)”。',
    options: [],
    answer: '<ul type="square">\n  <li>前端</li>\n  <li>后端</li>\n</ul>',
    explanation: '在 ul 标签上使用 type="square" 属性可以将前缀圆点改为实心方块。（现代建议用CSS解决）'
  },
  {
    type: 'code',
    title: '请写出一个典型的带有超链接的无序列表导航栏结构代码。包含两项：“首页”指向 `index.html`，“关于”指向 `about.html`。',
    options: [],
    answer: '<ul>\n  <li><a href="index.html">首页</a></li>\n  <li><a href="about.html">关于</a></li>\n</ul>',
    explanation: '这是前端页面中最常见的导航菜单组件结构：外层 ul，内层 li，最里面包裹 a 标签。'
  },
  {
    type: 'code',
    title: '这是一个易错的嵌套题：要求编写一个名为“开发语言”的大列表项（无序），在它内部包含一个小列表（也是无序），里面有“Java”和“Python”两项。请写出这部分代码。',
    options: [],
    answer: '<ul>\n  <li>开发语言\n    <ul>\n      <li>Java</li>\n      <li>Python</li>\n    </ul>\n  </li>\n</ul>',
    explanation: '考察列表嵌套的铁律：内层的 ul 必须放置在外层第一个 li 的内容中且在闭合标签 </li> 之前。'
  },
  {
    type: 'code',
    title: '如果不小心写出了严重违反嵌套规范的代码 `<ul id="menu"> <a href="#">主页</a> </ul>`，你将如何把它修改成符合语义和 DOM 规范的标准结构？',
    options: [],
    answer: '<ul id="menu">\n  <li><a href="#">主页</a></li>\n</ul>',
    explanation: 'ul 的直接子元素绝不能是 a 标签。必须先用一个具有列表语义的 li 标签包裹住它。'
  }
];

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'frontend_bible'
  });

  try {
    const ts = Math.floor(Date.now() / 1000);

    // 写入知识点
    const [kpResult] = await connection.execute(
      'INSERT INTO knowledge_docs (category_id, parent_title, knowledge_point, content, created_at, updated_at, deleted_at, is_del) VALUES (?, ?, ?, ?, ?, ?, 0, 0)',
      [1, knowledgeDoc.parent_title, knowledgeDoc.knowledge_point, knowledgeDoc.content, ts, ts]
    );

    // 写入题目
    for (const q of questions) {
      await connection.execute(
        'INSERT INTO questions (category_id, knowledge_point, type, title, options, answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          1,
          knowledgeDoc.knowledge_point,
          q.type,
          q.title,
          JSON.stringify(q.options),
          q.answer,
          q.explanation
        ]
      );
    }

    console.log(`[成功] 知识点【${knowledgeDoc.knowledge_point}】及 ${questions.length} 道题目已完全注入数据库！`);
  } catch (error) {
    console.error('插入失败:', error);
  } finally {
    await connection.end();
  }
}

run();
