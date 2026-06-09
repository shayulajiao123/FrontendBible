import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第一章：HTML5',
  knowledge_point: '标签之表格',
  content: `### 标签之表格

表格由 \`<table>\` 标签来定义。
每个表格均有若干行（由 \`<tr>\` 标签定义，tr 代表 Table Row）。
每行被分割为若干单元格（由 \`<td>\` 标签定义，td 代表 Table Data）。
字母 td 指表格数据（table data），即数据单元格的内容。数据单元格可以包含文本、图片、列表、段落、表单、水平线、表格等等。

**1. 表格的表头**
表格的表头使用 \`<th>\` 标签进行定义。
大多数浏览器会把表头显示为粗体居中的文本。

**2. 基础示例**
\`\`\`html
<table border="1">
  <tr>
    <th>姓名</th>
    <th>年龄</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>25</td>
  </tr>
</table>
\`\`\`
*注：\`border="1"\` 属性用于为表格添加可见的边框，如果不定义 border 属性，表格将不显示边框。*`
};

const questions = [
  // 20 单选题
  {
    type: 'single',
    title: '在 HTML 中，定义一个表格的顶级容器标签是？',
    options: ['A. <tab>', 'B. <grid>', 'C. <table>', 'D. <form>'],
    answer: 'C',
    explanation: '<table> 是 HTML 中用于创建二维数据表格的标准包裹标签。'
  },
  {
    type: 'single',
    title: 'HTML 表格中，用于定义“一行 (Row)”的标签是？',
    options: ['A. <td>', 'B. <tr>', 'C. <th>', 'D. <tl>'],
    answer: 'B',
    explanation: '<tr> 来源于 Table Row 的首字母缩写，代表表格中的一行。'
  },
  {
    type: 'single',
    title: 'HTML 表格中，用于定义“标准数据单元格 (Cell)”的标签是？',
    options: ['A. <td>', 'B. <tr>', 'C. <th>', 'D. <tc>'],
    answer: 'A',
    explanation: '<td> 来源于 Table Data 的首字母缩写，代表表格中存放数据的基本单元格。'
  },
  {
    type: 'single',
    title: '如果要定义一个表格的“表头单元格”，推荐使用哪个标签？',
    options: ['A. <head>', 'B. <th>', 'C. <tr>', 'D. <td>'],
    answer: 'B',
    explanation: '<th> 来源于 Table Header，专门用于定义表头单元格。它具有特殊的语义，可以帮助屏幕阅读器理解表格结构。'
  },
  {
    type: 'single',
    title: '在没有任何 CSS 干预的情况下，浏览器默认如何渲染 `<th>` 标签内的文本？',
    options: ['A. 红色字体，靠右对齐', 'B. 粗体字，且水平居中对齐', 'C. 斜体字，靠左对齐', 'D. 与普通的 <td> 完全一样，没有区别'],
    answer: 'B',
    explanation: '这是各大浏览器对 <th> 的默认 User Agent 样式。为了凸显表头的重要性，默认会将其加粗 (font-weight: bold) 并居中显示 (text-align: center)。'
  },
  {
    type: 'single',
    title: '如果我们写了一个基础的 `<table>` 标签，并且没有添加任何 CSS 样式或传统属性，它在页面上默认显示为什么样子？',
    options: ['A. 默认带有 1px 宽的黑色实线边框', 'B. 没有任何边框，内容紧密挨在一起', 'C. 会有浅灰色的斑马线背景', 'D. 报错，无法显示'],
    answer: 'B',
    explanation: '默认情况下，HTML 表格是没有可见边框的 (border width 默认为 0)。看起来就像是排列整齐的普通文本。'
  },
  {
    type: 'single',
    title: '如果希望在不使用 CSS 的情况下，快速给表格的每一个单元格加上边框线，应该在 `<table>` 标签上添加哪个传统属性？',
    options: ['A. line="solid"', 'B. frame="1"', 'C. border="1"', 'D. outline="1"'],
    answer: 'C',
    explanation: '<table border="1"> 是 HTML 中非常经典的为整个表格及其内部单元格开启默认边框线的写法（虽然现代开发强烈推荐使用 CSS border 属性代替它）。'
  },
  {
    type: 'single',
    title: '关于表格标签的嵌套规则，以下哪一种结构是**正确**且符合逻辑的？',
    options: ['A. <table> 直接嵌套 <td>，不使用 <tr>', 'B. <table> 嵌套 <tr>，<tr> 再嵌套 <td>', 'C. <tr> 嵌套 <table>，<table> 再嵌套 <td>', 'D. <td> 嵌套 <tr>，<tr> 再嵌套 <table>'],
    answer: 'B',
    explanation: '表格是一个二维结构。最外层是 <table>，然后切分为若干行 <tr>，最后每一行再切分为若干列/单元格 <td>。层级绝不能倒置或跳跃。'
  },
  {
    type: 'single',
    title: '在一个 3 行 4 列的普通表格中，一共需要写多少个 `<tr>` 标签？',
    options: ['A. 3个', 'B. 4个', 'C. 7个', 'D. 12个'],
    answer: 'A',
    explanation: '<tr> 代表行（Row）。既然是 3 行，就必然需要定义 3 个 <tr> 标签。'
  },
  {
    type: 'single',
    title: '接着上一题（3 行 4 列的表格），一共需要写多少个 `<td>`（假设没有表头 `<th>`）？',
    options: ['A. 3个', 'B. 4个', 'C. 7个', 'D. 12个'],
    answer: 'D',
    explanation: '每一行 (<tr>) 需要包含 4 个单元格 (<td>)，一共 3 行。因此总共需要 3 * 4 = 12 个 <td> 标签。'
  },
  {
    type: 'single',
    title: '以下关于 `<td>` 标签内部内容的说法，正确的是？',
    options: ['A. 只能包含纯文本和数字，不能包含其他标签', 'B. 不能包含图片，只能包含文字', 'C. 是一个“万能容器”，内部几乎可以嵌套任何 HTML 元素，包括图片、列表、表单，甚至另一个完整的 <table>', 'D. 不能嵌套超链接 <a>'],
    answer: 'C',
    explanation: '单元格 (td) 非常强大，它是一个独立的区域，前端开发者可以在其中塞入任何需要展示的内容，甚至实现极其复杂的表内嵌表布局（早期网页排版的常用黑科技）。'
  },
  {
    type: 'single',
    title: '如果代码如下：`<table><tr><th>姓名</th></tr><tr><td>李四</td><td>张三</td></tr></table>`。这个表格在渲染时会存在什么问题？',
    options: ['A. 会报错导致页面崩溃', 'B. 表格的行列数量不匹配。第一行只有 1 个单元格，而第二行有 2 个，会导致表格结构在视觉上出现残缺', 'C. <th> 标签不能和 <td> 一起用', 'D. 张三会被忽略不显示'],
    answer: 'B',
    explanation: '在编写表格时，通常应保证每一行包含相同数量的单元格（除非使用了合并单元格属性）。行列不均会导致浏览器渲染出一个参差不齐的残缺网格结构。'
  },
  {
    type: 'single',
    title: '在现代 Web 网页开发中，`<table>` 标签的最佳也是最正确的使用场景是？',
    options: ['A. 用来给整个网页进行多栏大版面布局（例如左边菜单右边内容）', 'B. 用来展示“二维的结构化数据”（比如成绩单、财务报表、员工信息列表）', 'C. 用来制作带图片的相册画廊', 'D. 用来代替 <ul> 制作导航菜单'],
    answer: 'B',
    explanation: '在早期的 HTML 时代，CSS 不够发达，开发者滥用 table 进行页面排版（table 布局）。而在现代标准中，table 应该回归它的初心：纯粹用来展示二维交叉的表格化数据。页面排版应交由 CSS (Flex/Grid)。'
  },
  {
    type: 'single',
    title: '为什么现代前端开发强烈反对使用 `<table>` 来进行网页的整体版面布局？',
    options: ['A. 因为表格不支持添加背景颜色', 'B. 因为表格内部不能放图片', 'C. 语义错误；且表格在渲染时往往需要等待整个表格内容加载完毕才会一次性显示（影响首屏速度）；且在移动端响应式适配上极其困难', 'D. 因为表格里的文字无法被搜索引擎抓取'],
    answer: 'C',
    explanation: 'Table 布局不仅破坏了语义化，更致命的是性能和响应式问题。表格的渲染机制比较特殊，复杂的表格会严重拖慢页面的呈现速度，且在手机屏幕上极难折叠变形。'
  },
  {
    type: 'single',
    title: '如果在 `<table>` 中同时使用了 `<tr>` 和 `<br>` 试图在行与行之间换行：`<table><tr><td>1</td></tr><br><tr><td>2</td></tr></table>`，这会导致？',
    options: ['A. 两行之间出现巨大的空隙', 'B. 浏览器报错', 'C. `<br>` 标签被视为非法嵌套并被浏览器自动驱逐出表格区域（DOM 节点被排挤到 table 前面或外面），表格内不生效', 'D. 没有任何影响，正常换行'],
    answer: 'C',
    explanation: 'table 的直接子节点有着极度严格的规定。如果你在 table 内部随意放置其他标签（如文字、br），浏览器会执行容错处理：将这些非法内容“吐出”到 table 标签的外部去渲染。'
  },
  {
    type: 'single',
    title: '对于屏幕阅读器（视障用户使用的软件）而言，表格的 `<th>` 标签有什么极为重要的作用？',
    options: ['A. 让它朗读的声音变大', 'B. 它告诉阅读器这行/这列数据的“字段名”，阅读器会在朗读 `<td>` 数据前先朗读对应的 `<th>` 表头，以确保用户明白数据含义', 'C. 没有作用，它只是为了加粗字体', 'D. 会让阅读器跳过不读'],
    answer: 'B',
    explanation: '这就是语义化标签的伟力。如果没有 th，盲人听到 "25" 这个数据时根本不知道它是年龄还是分数。有了 th，阅读器会提示 "年龄：25"，极大地改善了无障碍体验。'
  },
  {
    type: 'single',
    title: '在传统的 HTML 属性中，用来控制表格“单元格边界与单元格内容之间的空白距离”的属性是？',
    options: ['A. cellspacing', 'B. cellpadding', 'C. border', 'D. margin'],
    answer: 'B',
    explanation: 'cellpadding (单元格内边距) 控制单元格边框与内部文字的距离（相当于 CSS 的 padding）。而 cellspacing 控制的是单元格与单元格之间的距离。'
  },
  {
    type: 'single',
    title: '在 HTML5 标准中，推荐使用什么技术来控制表格的外观（比如边框、文字对齐、背景色、单元格间距等）？',
    options: ['A. 依然使用 border, cellpadding 等 HTML 原生属性', 'B. 使用 JavaScript 动态计算', 'C. 完全通过 CSS 样式表来控制', 'D. 使用 SVG 绘制'],
    answer: 'C',
    explanation: 'HTML5 秉持“结构与表现分离”。原生的 border、align、bgcolor、cellpadding 等外观属性在 HTML5 中已被归类为“不推荐使用”的废弃属性，现代开发应一律使用 CSS（如 padding, border, text-align）。'
  },
  {
    type: 'single',
    title: '如果一个单元格内部没有任何内容（即写成了 `<td></td>`），在一些老旧浏览器中可能会出现什么情况？',
    options: ['A. 浏览器会删除这一列', 'B. 该单元格的边框可能无法正常显示，导致表格出现一个“缺口”', 'C. 会自动填入数字 0', 'D. 会自动填入 NaN'],
    answer: 'B',
    explanation: '在早期的浏览器（如古老的 IE）中，空单元格是不渲染边框的。历史上的经典解决办法是在里面塞一个 `&nbsp;` 空格符。现代浏览器通常已经修复了这个渲染怪癖。'
  },
  {
    type: 'single',
    title: '如果我们想为整个表格添加一个居中显示的“标题”（比如：2023年财务报表），最标准且最具语义化的做法是使用哪个标签配合 table？',
    options: ['A. 在 table 前面加一个 h1', 'B. 在 table 内部的第一个 tr 里写', 'C. 使用 <caption> 标签作为 table 的第一个子元素', 'D. 给 table 加 title 属性'],
    answer: 'C',
    explanation: '<caption> 标签专门用于定义表格标题。它必须直接跟在 <table> 标签之后，默认会居中显示在表格的正上方，且语义非常明确。'
  },

  // 5 代码题
  {
    type: 'code',
    title: '请编写一个最简单的表格（带 1px 默认边框）：包含一行（第一行），该行内只有两个单元格，内容分别是“前端”和“后端”。',
    options: [],
    answer: '<table border="1">\n  <tr>\n    <td>前端</td>\n    <td>后端</td>\n  </tr>\n</table>',
    explanation: '定义 table，开启 border，定义一行 tr，里面包裹两个数据 td。'
  },
  {
    type: 'code',
    title: '请编写一个具有两行的表格代码。第一行是表头（包含“姓名”和“年龄”两个表头单元格）。第二行是数据（包含“小明”和“18”两个普通单元格）。',
    options: [],
    answer: '<table>\n  <tr>\n    <th>姓名</th>\n    <th>年龄</th>\n  </tr>\n  <tr>\n    <td>小明</td>\n    <td>18</td>\n  </tr>\n</table>',
    explanation: '表头行使用 th 标签，数据行使用 td 标签。'
  },
  {
    type: 'code',
    title: '在写表格时，我们要求在 `<table>` 内部的正上方紧挨着显示一个官方居中标题，文字为“成绩单”。请写出这个具有特殊语义的标题标签代码（不需要写外层的 table）。',
    options: [],
    answer: '<caption>成绩单</caption>',
    explanation: 'caption 标签用于定义表格的总标题，必须是 table 内部的第一个子节点。'
  },
  {
    type: 'code',
    title: '请尝试在表格单元格中嵌套标签：编写一个表格行 `<tr>`，里面只有一个单元格。在这个单元格中插入一张本地图片 `logo.png`。',
    options: [],
    answer: '<tr>\n  <td>\n    <img src="logo.png" alt="标志">\n  </td>\n</tr>',
    explanation: '单元格 td 是个万能容器，完全可以将 img 标签作为其子节点放置其中。'
  },
  {
    type: 'code',
    title: '要求写一个纯粹的“一竖列”表格（共 3 行，每行只有 1 列）。这 3 个单元格的内容分别是 1、2、3。',
    options: [],
    answer: '<table>\n  <tr>\n    <td>1</td>\n  </tr>\n  <tr>\n    <td>2</td>\n  </tr>\n  <tr>\n    <td>3</td>\n  </tr>\n</table>',
    explanation: '要实现纵向的一列，就需要定义 3 个 tr（3行），而每个 tr 中只放入一个 td 即可。'
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
