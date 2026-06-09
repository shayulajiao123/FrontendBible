import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第一章：HTML5',
  knowledge_point: '标签之段落、换行、水平线',
  content: `### 标签之段落、换行、水平线

**段落标签 <p>**：
段落是通过 \`<p>\` 标签定义的。浏览器会自动地在段落的前后添加空行（\`<p>\` 是块级元素）。

**换行标签 <br>**：
如果您希望在不产生一个新段落的情况下进行换行（新行），请使用 \`<br>\` 标签。
\`<br>\` 元素是一个空的 HTML 元素。由于关闭标签没有任何意义，因此它没有结束标签。

**水平线标签 <hr>**：
\`<hr>\` 标签在 HTML 页面中创建水平线。
hr 元素可用于分隔内容。它同样是一个空元素，不需要闭合。`
};

const questions = [
  // 20 单选题
  {
    type: 'single',
    title: 'HTML中定义文本段落的标签是？',
    options: ['A. <div>', 'B. <p>', 'C. <span>', 'D. <text>'],
    answer: 'B',
    explanation: '<p> 标签（Paragraph）是 HTML 中定义文本段落的标准标签。'
  },
  {
    type: 'single',
    title: '关于 `<p>` 标签的显示特性，以下说法正确的是？',
    options: ['A. 它是一个行内元素', 'B. 浏览器会自动在段落前后添加一定的空白间距（Margin）', 'C. 多个连续的 `<p>` 标签会排在同一行', 'D. `<p>` 标签不能包含任何其他 HTML 标签'],
    answer: 'B',
    explanation: '<p> 是块级元素，默认独占一行，并且浏览器内置样式会为其前后添加 margin 来形成段落间距。'
  },
  {
    type: 'single',
    title: '如果我们在 HTML 的 `<p>` 标签内部连续敲击了 10 个空格字符，浏览器会如何渲染？',
    options: ['A. 渲染出 10 个空格的距离', 'B. 渲染出 1 个空格的距离', 'C. 直接报错', 'D. 会将这 10 个空格解析为换行'],
    answer: 'B',
    explanation: 'HTML 的默认解析规则是“空白折叠”，即连续的空格、回车符都会被折叠合并显示为一个单一的空格。如果需要强制多个空格，通常需要用到实体字符 &nbsp; 。'
  },
  {
    type: 'single',
    title: '如果你想在一段文字的中间进行强制换行，但不希望产生段落之间的巨大空隙，应该使用哪个标签？',
    options: ['A. 结束当前的 <p> 并开始一个新的 <p>', 'B. <br>', 'C. <hr>', 'D. <enter>'],
    answer: 'B',
    explanation: '<br> 是一个简单的强制换行符，它不会像 <p> 标签那样产生块级元素的上下外边距。'
  },
  {
    type: 'single',
    title: '以下关于 `<br>` 标签的说法中，正确的是？',
    options: ['A. 必须写成 `<br></br>` 才规范', 'B. 它是块级元素', 'C. 它是一个空元素，不需要结束标签', 'D. 它可以包含文本内容'],
    answer: 'C',
    explanation: '<br> 标签不包含任何内容，它仅仅代表一个换行动作，因此属于 HTML 的“空元素”（Void element），不需要也不允许有闭合标签。'
  },
  {
    type: 'single',
    title: '如果我们需要在网页中插入一条横贯页面的水平分割线，应该使用哪个标签？',
    options: ['A. <line>', 'B. <hr>', 'C. <br>', 'D. <div>'],
    answer: 'B',
    explanation: '<hr> 标签（Horizontal Rule）用于在 HTML 页面中创建一条水平分割线。'
  },
  {
    type: 'single',
    title: '在 HTML5 的语义化规范中，`<hr>` 标签除了表现为一条线之外，还有什么更深层的含义？',
    options: ['A. 表示文章的完结', 'B. 表示段落级别的主题转换（Thematic break）', 'C. 表示这里的文本需要加粗', 'D. 没有任何其他含义，仅为了好看'],
    answer: 'B',
    explanation: '在早期的 HTML 中 hr 仅代表画一条水平线。但在 HTML5 中，它被赋予了“主题转换”的语义，常用于故事中的场景切换或参考文档中的不同部分分隔。'
  },
  {
    type: 'single',
    title: '`<p>` 标签内部是否允许嵌套 `<div>` 标签？',
    options: ['A. 允许，这是极其常见的做法', 'B. 不允许，HTML 规范禁止在 p 标签内嵌套块级元素（如 div）', 'C. 允许，但仅限于 HTML5 标准', 'D. 看浏览器的支持情况'],
    answer: 'B',
    explanation: '在 HTML 规范中，<p> 标签只能包含短语内容（行内元素，如 span, a, strong）。如果在其中强行嵌套 <div>，浏览器会强制将 <p> 标签提前闭合，导致 DOM 结构错乱。这是一个极易踩坑的面试常考题。'
  },
  {
    type: 'single',
    title: '对比 `<p>` 和 `<br>` 的使用场景，哪种做法是不推荐的？',
    options: ['A. 用 <p> 标签来划分小说的每一个自然段', 'B. 用 <br> 标签来书写诗歌的分行', 'C. 为了让两个 <div> 之间产生很大的空白距离，连续使用十几个 <br><br><br>...', 'D. 在表单地址输入框后使用 <br> 换行提示信息'],
    answer: 'C',
    explanation: '控制元素之间的间距（Margin / Padding）是 CSS 的职责。滥用连续的 <br> 标签来强行撑开页面空白是一种极其糟糕的代码习惯。'
  },
  {
    type: 'single',
    title: '以下哪个选项在严格的 XHTML 语法规范下是合法的书写形式（但在现代 HTML5 中可以省略斜杠）？',
    options: ['A. <br>', 'B. </br>', 'C. <br />', 'D. <br></br>'],
    answer: 'C',
    explanation: '在早期的 XHTML 规范中，即使是空元素也必须自闭合，如 <br /> 和 <hr />。虽然 HTML5 允许直接写 <br>，但了解 <br /> 的由来依然是基础必备。'
  },
  {
    type: 'single',
    title: '使用 `<hr>` 标签时，如果想让水平线变红（不使用CSS），早期的 HTML 属性应该怎么写？',
    options: ['A. <hr bg="red">', 'B. <hr color="red">', 'C. <hr background="red">', 'D. <hr style="red">'],
    answer: 'B',
    explanation: '早期 HTML 中，通过 color="red" 可以设置水平线的颜色（注意这种表现属性在现代开发中已经被 CSS 替代）。'
  },
  {
    type: 'single',
    title: '在代码编辑器中，将一行长的 HTML 文本分成多行书写，浏览器会怎么显示？',
    options: ['A. 浏览器会自动把代码中的换行解析为 <br> 进行显示', 'B. 浏览器会原样输出换行符', 'C. 浏览器会报错', 'D. 浏览器会将代码中的换行符视为空格，连续内容依然会合并在同一行显示'],
    answer: 'D',
    explanation: 'HTML 源码中的换行符在渲染时会被当作一个普通的空白符（Space）处理，并不会在页面上产生物理换行效果。要想产生换行效果，必须使用明确的标签如 <br>。'
  },
  {
    type: 'single',
    title: '以下哪一个是块级元素（Block-level element）？',
    options: ['A. <a>', 'B. <p>', 'C. <span>', 'D. <br>'],
    answer: 'B',
    explanation: '<p> 是典型的块级元素，独占一行。<a> 和 <span> 是行内元素，<br> 是一个控制换行的空元素。'
  },
  {
    type: 'single',
    title: '`<p>` 标签的默认对齐方式（text-align）是什么？',
    options: ['A. 居中对齐 (center)', 'B. 右对齐 (right)', 'C. 左对齐 (left，在LTR阅读方向下)', 'D. 两端对齐 (justify)'],
    answer: 'C',
    explanation: '在大多数从左向右（LTR）阅读的语言环境中，<p> 标签的文本默认是左对齐的。'
  },
  {
    type: 'single',
    title: '以下 HTML 代码会在页面上显示几行文本？\n`<p>这是第一段。</p><p>这是第二段。</p>`',
    options: ['A. 1行', 'B. 2行', 'C. 不确定', 'D. 会连在一起变成一行'],
    answer: 'B',
    explanation: '因为 <p> 是块级元素，每个 <p> 都会新起一行，所以会显示为 2 行，并且中间会有空隙。'
  },
  {
    type: 'single',
    title: '如果希望一段文本保持代码中书写的严格排版格式（包含所有空格和回车换行），除了手动加 <br>，最合适使用哪个 HTML 标签将其包裹？',
    options: ['A. <p>', 'B. <div>', 'C. <pre>', 'D. <span>'],
    answer: 'C',
    explanation: '<pre> 标签（Preformatted Text）会保留其中的所有空白字符和换行符，而 <p> 标签会自动折叠空白。这在展示代码片段时极其常用。'
  },
  {
    type: 'single',
    title: '关于 `<hr>` 标签，以下说法错误的是？',
    options: ['A. 它是一条水平线', 'B. 它是一个闭合标签，需要写成 `<hr></hr>`', 'C. 它是空元素', 'D. 它自带一定的上下外边距（margin）'],
    answer: 'B',
    explanation: '<hr> 是空元素，不需要也不能写成 <hr></hr> 这样的闭合形式。'
  },
  {
    type: 'single',
    title: '对于 HTML 中的 `&nbsp;`，它的作用是什么？',
    options: ['A. 产生一个换行', 'B. 产生一条水平线', 'C. 产生一个不会被折叠的空格', 'D. 结束一个段落'],
    answer: 'C',
    explanation: '&nbsp; 是 Non-Breaking Space（不换行空格）的实体编码。因为 <p> 中的普通空格会被折叠，所以当我们需要多个连续空格时必须使用它。'
  },
  {
    type: 'single',
    title: '在一首诗的 HTML 排版中，每一句诗结束，应该使用什么标签最合适（假设整个诗是一段整体的语境）？',
    options: ['A. <p>', 'B. <h1>', 'C. <br>', 'D. <hr>'],
    answer: 'C',
    explanation: '诗歌是一个连贯的整体，每一句只是在视觉和节奏上换行，而不是切分出完全独立的新段落。因此，用一个 <p> 包裹全诗，内部用 <br> 进行换行是最佳实践。'
  },
  {
    type: 'single',
    title: '`<p>` 标签的名称来源于哪个英文单词？',
    options: ['A. Page', 'B. Picture', 'C. Paragraph', 'D. Position'],
    answer: 'C',
    explanation: '<p> 代表 Paragraph，即“段落”。'
  },

  // 5 代码题
  {
    type: 'code',
    title: '请编写 HTML 代码，生成两个完整的段落，第一段内容为“我是前端工程师”，第二段内容为“我热爱写代码”。',
    options: [],
    answer: '<p>我是前端工程师</p>\n<p>我热爱写代码</p>',
    explanation: '需要使用两个完全独立且闭合的 <p> 标签分别包裹这两句话。'
  },
  {
    type: 'code',
    title: '请编写 HTML 代码，在一个段落中输出这两句话：“登鹳雀楼”，紧接着换行输出“白日依山尽”。',
    options: [],
    answer: '<p>登鹳雀楼<br>白日依山尽</p>',
    explanation: '使用单个 <p> 标签包裹整体，内部使用 <br> 标签来实现强制换行。'
  },
  {
    type: 'code',
    title: '在页面上分别输出两句话“上半场”和“下半场”，并在它们中间插入一条水平分割线。',
    options: [],
    answer: '<p>上半场</p>\n<hr>\n<p>下半场</p>',
    explanation: '使用 <hr> 标签可以产生一条水平分割线，它是一个不需要闭合的单标签。'
  },
  {
    type: 'code',
    title: '不使用 CSS，请用 HTML 历史属性编写一条宽度为 50%、居中显示的水平线。',
    options: [],
    answer: '<hr width="50%" align="center">',
    explanation: '早期 HTML 中，hr 标签支持 width 和 align 属性来控制其长度和对齐方式。'
  },
  {
    type: 'code',
    title: '如果要在 HTML 中直接输出这三个字：`<a>` （使其在网页上看到尖括号而不是被当做真正的 a 标签解析），请在一段 p 标签内写出正确的 HTML 代码。',
    options: [],
    answer: '<p>&lt;a&gt;</p>',
    explanation: '在 HTML 文本中，尖括号是保留字符，用于定义标签。如果要原样输出它们，必须使用 HTML 字符实体：&lt; 代表 <，&gt; 代表 >。'
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
