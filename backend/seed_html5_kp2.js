import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第一章：HTML5',
  knowledge_point: '标签之标题',
  content: `### 标签之标题

标题（Heading）是通过 \`<h1>\` - \`<h6>\` 等标签进行定义的。

* \`<h1>\` 定义最大的标题。
* \`<h6>\` 定义最小的标题。

**示例代码**：
\`\`\`html
<h1>h1标题</h1>
<h2>h2标题</h2>
<h3>h3标题</h3>
<h4>h4标题</h4>
<h5>h5标题</h5>
<h6>h6标题</h6>
\`\`\`

**注意事项**：
* HTML 标题只能用于标题。不要仅仅是为了产生粗体或大号的文本而使用标题。
* 搜索引擎（如百度、Google）使用标题为您的网页的结构和内容编制索引。
* \`<h1>\` 标签通常是页面最重要的标题，在一个页面中通常只使用一次（对 SEO 最为关键）。`
};

const questions = [
  // 20 单选题
  {
    type: 'single',
    title: 'HTML中定义标题的标签一共有几个层级？',
    options: ['A. 3个层级', 'B. 4个层级', 'C. 5个层级', 'D. 6个层级'],
    answer: 'D',
    explanation: 'HTML提供了从 h1 到 h6 共计 6 个层级的标题标签。'
  },
  {
    type: 'single',
    title: '以下哪个标签定义的标题字号默认最大？',
    options: ['A. <title>', 'B. <h1>', 'C. <h6>', 'D. <head>'],
    answer: 'B',
    explanation: '在 h1 到 h6 标题标签中，<h1> 定义了最高级别的标题，默认在浏览器中呈现最大的字号。'
  },
  {
    type: 'single',
    title: '以下哪个标签定义的标题字号默认最小？',
    options: ['A. <h1>', 'B. <h7>', 'C. <h6>', 'D. <h5>'],
    answer: 'C',
    explanation: '<h6> 是 HTML 中所提供的最低级别的标题标签，字号默认也是最小的。HTML 中并不存在 <h7>。'
  },
  {
    type: 'single',
    title: '关于HTML标题标签的使用，以下说法错误的是？',
    options: ['A. 标题标签应仅用于页面标题结构，不应仅为加粗文字而使用', 'B. <h1> 标签对 SEO（搜索引擎优化）极其重要', 'C. 为了让一段文字变大，我们可以直接给它套上 <h2> 标签', 'D. 搜索引擎会根据标题标签来提取页面内容的提纲'],
    answer: 'C',
    explanation: 'HTML的核心理念是语义化，标题标签应当仅仅被用于表示文档的结构和逻辑标题。如果你只需要文字变大变粗，应当使用 CSS 样式来控制，而不是滥用标题标签。'
  },
  {
    type: 'single',
    title: '搜索引擎（如百度、Google）如何利用网页中的标题标签？',
    options: ['A. 用来给网页着色', 'B. 为网页结构和内容编制索引（提取大纲）', 'C. 用来拦截网络攻击', 'D. 用来控制网页加载速度'],
    answer: 'B',
    explanation: '搜索引擎的爬虫会读取 HTML 的标题结构（h1 到 h6）来理解页面的主题和大纲层次，从而编制更准确的索引。'
  },
  {
    type: 'single',
    title: '在一个符合 SEO 规范的标准 HTML 页面中，`<h1>` 标签一般建议出现几次？',
    options: ['A. 0次', 'B. 仅1次', 'C. 最多3次', 'D. 无数次'],
    answer: 'B',
    explanation: '<h1> 代表了当前页面的绝对核心主题，为了达到最佳的 SEO 效果，通常建议一个页面（或者一个独立文章区块）中只保留唯一一个 <h1>。'
  },
  {
    type: 'single',
    title: '如果我们在 HTML 中书写了 `<h7>标题</h7>`，浏览器会如何处理？',
    options: ['A. 报错并停止渲染整个页面', 'B. 将其作为普通文本渲染，不再带有默认的标题加粗加大样式', 'C. 自动将其转化为 <h6>', 'D. 触发跨站脚本攻击警告'],
    answer: 'B',
    explanation: 'HTML 规范中并没有 <h7>。浏览器在遇到不认识的自定义标签时，通常会容错处理，将其作为普通的行内文本节点渲染（类似于 span），因此它不会有内置的标题特权样式。'
  },
  {
    type: 'single',
    title: '以下哪个代码片段的语法是完全正确的？',
    options: ['A. <h1>这是一个标题<h2>', 'B. <h3>这是一个标题</h3>', 'C. <h4>这是一个标题</h3/>', 'D. <h1 这是标题 />'],
    answer: 'B',
    explanation: 'HTML标签通常需要闭合。B选项 <h3>...</h3> 是完全符合规范的。'
  },
  {
    type: 'single',
    title: '在前端开发中，“语义化”是一个重要概念。使用 `<h2>` 代替 `<div class="title">` 的主要好处是？',
    options: ['A. 让代码运行得更快', 'B. 让机器（如屏幕阅读器、爬虫）更容易理解该区块的作用', 'C. 强制让文字变成红色', 'D. 能够自动居中对齐'],
    answer: 'B',
    explanation: '语义化标签（如 h1-h6）最大的作用就是“表意”。它能帮助搜索引擎爬虫分析页面结构，同时帮助盲人等使用“屏幕阅读器”设备的用户更好地浏览网页。'
  },
  {
    type: 'single',
    title: 'HTML 标题标签 `<h1>` 到 `<h6>` 默认的 `display` 属性值是什么？',
    options: ['A. inline', 'B. inline-block', 'C. block', 'D. none'],
    answer: 'C',
    explanation: '所有的 h1-h6 标签默认都是块级元素（block）。它们默认会独占一行，并且上下会有默认的 margin 间距。'
  },
  {
    type: 'single',
    title: '下面代码的渲染效果，哪一行文字会独占一行并且与前后的元素产生明显的上下留白？<br>`<div>文本1</div> <h3>文本2</h3> <span>文本3</span>`',
    options: ['A. 文本1', 'B. 文本2', 'C. 文本3', 'D. 都会独占一行'],
    answer: 'B',
    explanation: '<h3> 是块级元素，且浏览器内置样式库为其设定了默认的 margin-top 和 margin-bottom。<div> 虽是块级但不带上下默认边距，<span> 是行内元素。因此 <h3> 产生明显的上下留白。'
  },
  {
    type: 'single',
    title: '对于一篇博客文章，下列哪种标签层级嵌套最合理？',
    options: ['A. h1 (文章名) -> h2 (小节标题) -> h3 (段落小标题)', 'B. h3 (文章名) -> h1 (小节标题)', 'C. h6 (文章名) -> h5 (小节标题)', 'D. 全部使用 h1'],
    answer: 'A',
    explanation: 'HTML文档结构应该像一本书的目录一样，从最大到最小依次递减嵌套，不能跳跃或倒置。h1 是总标题，h2 是二级标题，依此类推。'
  },
  {
    type: 'single',
    title: '网页源代码中有：`<h1>这是主标题</h1>`。如果想通过 CSS 把它的字体大小改成与普通文本一样大，是否可行？',
    options: ['A. 不可行，h1 的字体大小被浏览器锁死了', 'B. 不可行，CSS 无法选中标题标签', 'C. 可行，但失去 SEO 优势', 'D. 可行，通过 CSS 覆盖浏览器默认样式即可，SEO优势依然保留'],
    answer: 'D',
    explanation: '浏览器的 <h1> 大号字体只是“用户代理样式表”（User Agent Stylesheet）提供的默认样式。开发者可以通过 CSS（如 font-size: 16px）随意覆盖它，但这不会改变它在 HTML 树中的语义地位，爬虫依然认定它是 <h1>。'
  },
  {
    type: 'single',
    title: '如果希望将一个 HTML 文档划分为 3 个并列的主体部分，每个部分使用什么标签作为这三个部分的开头最合适？',
    options: ['A. <h1>', 'B. <h2>', 'C. <h5>', 'D. <span>'],
    answer: 'B',
    explanation: '由于 <h1> 通常用作整个页面的最高总标题（一般1个），所以次一级的 3 个并列的主体部分，最规范的做法是各使用一个 <h2>。'
  },
  {
    type: 'single',
    title: '我们在编写 HTML 页面时，为了省事，是否可以跳过 `<h2>` 和 `<h3>`，直接在 `<h1>` 下使用 `<h4>`？',
    options: ['A. 可以，只要 CSS 写得好就行', 'B. 不推荐，这违反了文档大纲顺序结构的语义连续性', 'C. 会报错，页面无法显示', 'D. 必须跳跃使用以提高性能'],
    answer: 'B',
    explanation: '在 HTML 结构语义学中，应当按顺序使用标题标签（h1->h2->h3）。跳跃层级使用会造成文档大纲结构断层，对可访问性和 SEO 都是不友好的。'
  },
  {
    type: 'single',
    title: '如果要让 `<h1>` 里的文本默认居中显示，仅使用 HTML 的传统标签属性，应当怎么写（不推荐，但存在此历史属性）？',
    options: ['A. <h1 center="true">', 'B. <h1 align="center">', 'C. <h1 valign="middle">', 'D. <h1 justify="center">'],
    answer: 'B',
    explanation: '在早期 HTML 中，常使用 align="center" 属性来使文本居中。虽然在 HTML5 中已被废弃（推荐使用 CSS text-align: center），但这属于历史考察点。'
  },
  {
    type: 'single',
    title: '为什么说“不要仅仅是为了产生粗体或大号的文本而使用标题”？',
    options: ['A. 因为标题标签加载速度慢', 'B. 因为标题标签的粗体效果不如 <b> 标签明显', 'C. 因为这混淆了“结构语义”与“视觉表现”，会误导搜索引擎爬虫和盲人阅读器', 'D. 因为 HTML5 取消了标题标签的加粗效果'],
    answer: 'C',
    explanation: '这是 Web 标准（结构、表现、行为分离）的核心思想。标签负责结构（它是不是一个标题），CSS 负责视觉表现（字该多大多粗）。'
  },
  {
    type: 'single',
    title: '在使用屏幕阅读器的视障用户访问网页时，以下哪种操作与标题标签（h1-h6）息息相关？',
    options: ['A. 用户可以通过快捷键直接在页面内的各个标题之间进行跳转导航', 'B. 屏幕阅读器会自动跳过标题不读', 'C. 屏幕阅读器会把标题标签翻译成英文', 'D. 屏幕阅读器会把标题作为图片处理'],
    answer: 'A',
    explanation: '屏幕阅读器（如 NVDA, JAWS）允许盲人用户通过按下快捷键（如按数字键 1-6）快速浏览页面的各级标题大纲。这是 Web 无障碍访问（a11y）中标题标签最大的价值之一。'
  },
  {
    type: 'single',
    title: '以下哪个标签不属于标题系列标签？',
    options: ['A. <h1>', 'B. <h3>', 'C. <h6>', 'D. <header>'],
    answer: 'D',
    explanation: '<header> 是 HTML5 新增的区块语义标签，用于定义文档或节的页眉，而非代表文本节点的“标题”。'
  },
  {
    type: 'single',
    title: '对比 `<strong>` 标签和 `<h2>` 标签，描述正确的是？',
    options: ['A. 它们在语义上没有任何区别', 'B. strong是块级元素，h2是行内元素', 'C. h2 表达文档的大纲标题级别，strong 表达文本词汇的强烈强调', 'D. strong只能用在 h2 的外部'],
    answer: 'C',
    explanation: 'h2 是结构级的标题。strong 是行内级别的短语元素，表示语气的强调或重要性。两者语义作用维度不同。'
  },

  // 5 代码题
  {
    type: 'code',
    title: '请编写一段简单的 HTML 代码，输出一个最高级别的总标题，其文本内容为“前端开发入门”。',
    options: [],
    answer: '<h1>前端开发入门</h1>',
    explanation: '最高级别的标题是 h1 标签，标签必须成对出现并闭合。'
  },
  {
    type: 'code',
    title: '请编写代码，分别输出三级标题（内容为“章节三”）和五级标题（内容为“附录”）。请分两行书写。',
    options: [],
    answer: '<h3>章节三</h3>\n<h5>附录</h5>',
    explanation: '分别使用 h3 标签和 h5 标签即可实现对应级别的标题输出。'
  },
  {
    type: 'code',
    title: '已知我们要为一个网页排版：总标题是“商品列表”，下面有两个子区块，分别是“最新上架”和“打折专区”。请使用适当的标题标签完成这段骨架结构代码。',
    options: [],
    answer: '<h1>商品列表</h1>\n<h2>最新上架</h2>\n<h2>打折专区</h2>',
    explanation: '页面的总主题使用 1个 h1 标签，其下的并列子主题应依次降级，使用 2个平级的 h2 标签。'
  },
  {
    type: 'code',
    title: '请编写一行 HTML 历史遗留风格的代码：输出一个居中对齐的三级标题，内容为“居中测试”。（提示：使用 align 属性）',
    options: [],
    answer: '<h3 align="center">居中测试</h3>',
    explanation: '在 HTML4 时代，标签通常自带视觉属性。通过给 h3 标签设置 align="center" 可以实现老式浏览器的默认居中。现代开发应当使用 CSS 代替它。'
  },
  {
    type: 'code',
    title: '请使用正确的语义化标签，将下面这种不规范的“大号加粗文本”改写为二级标题：\n`<div style="font-size:24px; font-weight:bold;">这是文章副标题</div>`',
    options: [],
    answer: '<h2>这是文章副标题</h2>',
    explanation: '与其使用没有语义的 div 并强加内联样式，不如直接使用具有完整结构意义和默认视觉样式的 <h2> 标签。'
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
