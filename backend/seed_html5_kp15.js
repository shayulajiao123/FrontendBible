import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第一章：HTML5',
  knowledge_point: 'HTML5新增标签',
  content: `### HTML5新增标签\n\nHTML5 引入了许多新的语义化标签，用于替代以前无处不在的 <div> 标签，使得文档结构更加清晰，有利于 SEO 和无障碍访问。\n\n**常见 HTML5 新增语义化标签：**\n* <header>：定义文档或节的页眉。\n* <nav>：定义导航链接的容器。\n* <main>：定义文档的主体内容。\n* <article>：定义独立的、完整的内容区块（如一篇博客文章）。\n* <section>：定义文档中的节（如章节、页眉、页脚或文档中的其他部分）。\n* <aside>：定义页面主区域内容之外的内容（如侧边栏）。\n* <footer>：定义文档或节的页脚。`
};

const questions = [
  { type: 'single', title: 'HTML5中用于定义文档或节的页眉的标签是？', options: ['A. <head>', 'B. <header>', 'C. <heading>', 'D. <top>'], answer: 'B', explanation: '<header> 标签定义文档或节的页眉，通常包含标题。' },
  { type: 'single', title: '哪个HTML5标签专门用于定义导航链接？', options: ['A. <nav>', 'B. <navigation>', 'C. <menu>', 'D. <links>'], answer: 'A', explanation: '<nav> 标签用于定义页面中的主导航链接。' },
  { type: 'single', title: 'HTML5文档中，包含文档主要内容的标签是？', options: ['A. <content>', 'B. <body>', 'C. <main>', 'D. <article>'], answer: 'C', explanation: '<main> 标签定义文档的主体内容，一个页面只能有一个 <main> 元素。' },
  { type: 'single', title: '一篇独立的博客文章，最适合用哪个HTML5标签包裹？', options: ['A. <section>', 'B. <div>', 'C. <article>', 'D. <main>'], answer: 'C', explanation: '<article> 标签定义独立、完整的、可独立分配或重用的内容区块。' },
  { type: 'single', title: '<section>标签的典型用途是？', options: ['A. 定义侧边栏', 'B. 定义文档中的节或区段', 'C. 定义文章内容', 'D. 定义页脚'], answer: 'B', explanation: '<section> 用于定义文档中的通用区块，通常带有一个标题。' },
  { type: 'single', title: '侧边栏内容或与主内容弱相关的广告块，通常使用哪个标签？', options: ['A. <sidebar>', 'B. <section>', 'C. <aside>', 'D. <menu>'], answer: 'C', explanation: '<aside> 标签定义页面主区域之外的内容，如侧边栏、广告或附属信息。' },
  { type: 'single', title: 'HTML5中表示页面或区块底部的标签是？', options: ['A. <bottom>', 'B. <footer>', 'C. <foot>', 'D. <end>'], answer: 'B', explanation: '<footer> 标签定义文档或一个区块的页脚，通常包含版权、联系方式等信息。' },
  { type: 'single', title: '使用HTML5语义化标签的主要优点不包括？', options: ['A. 代码结构清晰', 'B. 增加网页加载速度', 'C. 有利于SEO优化', 'D. 提高无障碍访问性'], answer: 'B', explanation: '语义化标签主要提升结构、SEO和可访问性，并不直接增加加载速度。' },
  { type: 'single', title: '哪个标签用于高亮显示文本？', options: ['A. <highlight>', 'B. <mark>', 'C. <b>', 'D. <em>'], answer: 'B', explanation: '<mark> 标签用于高亮文本，表示这部分文本具有相关性或重要性。' },
  { type: 'single', title: 'HTML5中用于表示日期和时间的标签是？', options: ['A. <date>', 'B. <time>', 'C. <datetime>', 'D. <clock>'], answer: 'B', explanation: '<time> 标签用于定义日期、时间或日期时间，支持 datetime 属性。' },
  { type: 'single', title: '表示图表、插图或代码块的独立流内容，应使用什么标签？', options: ['A. <image>', 'B. <figure>', 'C. <canvas>', 'D. <svg>'], answer: 'B', explanation: '<figure> 标签规定独立的流内容（图像、图表、照片、代码等等）。' },
  { type: 'single', title: '<figcaption>标签的作用是？', options: ['A. 定义图片的标题', 'B. 定义表格的标题', 'C. 定义<figure>元素的标题', 'D. 定义文章的标题'], answer: 'C', explanation: '<figcaption> 标签定义 <figure> 元素的标题或说明文字。' },
  { type: 'single', title: 'HTML5中可以创建交互式小部件，用户可以展开或折叠的标签是？', options: ['A. <accordion>', 'B. <details>', 'C. <summary>', 'D. <menu>'], answer: 'B', explanation: '<details> 标签用于描述文档或文档某个部分的细节，用户可以点击展开或折叠。' },
  { type: 'single', title: '与<details>标签配合使用，定义可见的标题的标签是？', options: ['A. <title>', 'B. <header>', 'C. <summary>', 'D. <caption >'], answer: 'C', explanation: '<summary> 标签为 <details> 元素定义一个可见的标题。' },
  { type: 'single', title: 'HTML5中用于定义对话框或窗口的标签是？', options: ['A. <window>', 'B. <dialog>', 'C. <modal>', 'D. <popup>'], answer: 'B', explanation: '<dialog> 标签定义一个对话框、确认框或窗口。' },
  { type: 'single', title: '下面哪一个不是HTML5新增的结构性标签？', options: ['A. <header>', 'B. <main>', 'C. <span>', 'D. <footer>'], answer: 'C', explanation: '<span> 是HTML早就存在的内联标签，不是HTML5新增的语义化结构标签。' },
  { type: 'single', title: '关于<article>和<section>的区别，描述正确的是？', options: ['A. <article>只能包含<section>', 'B. <section>必须包含<article>', 'C. <article>是完整独立的内容，<section>是普通的逻辑分块', 'D. 两者完全等价'], answer: 'C', explanation: '<article>强调内容的独立性和可复用性，而<section>更侧重于逻辑上的分块。' },
  { type: 'single', title: '在HTML5中，一个页面可以使用多少次<header>标签？', options: ['A. 只能使用1次', 'B. 只能使用2次', 'C. 不能使用', 'D. 可以使用多次'], answer: 'D', explanation: '<header> 标签可以作为整个页面的页眉，也可以作为 <article> 或 <section> 等区块的页眉，因此可以使用多次。' },
  { type: 'single', title: '哪个标签常被用于网页右侧或左侧的栏目？', options: ['A. <aside>', 'B. <article>', 'C. <main>', 'D. <section>'], answer: 'A', explanation: '<aside> 标签经常被用作侧边栏的内容。' },
  { type: 'single', title: '为了让屏幕阅读器更好地理解网页结构，开发者最应该使用？', options: ['A. 大量的<div>和<span>', 'B. 内联样式', 'C. 语义化标签', 'D. JavaScript生成DOM'], answer: 'C', explanation: '语义化标签能向屏幕阅读器等辅助设备提供更清晰的内容结构信息，提高无障碍访问性。' },
  { type: 'code', title: '请使用HTML5语义化标签编写一个包含页眉、主体和页脚的基本网页结构。', options: [], answer: '<header>网站头部</header>\n<main>网页主要内容</main>\n<footer>网站底部</footer>', explanation: '使用 <header>、<main> 和 <footer> 可以构建一个非常基础且语义清晰的页面结构。' },
  { type: 'code', title: '请使用 <article>、<header> 和 <section> 标签编写一篇博客文章的基本结构。', options: [], answer: '<article>\n  <header>\n    <h2>文章标题</h2>\n    <p>作者：张三</p>\n  </header>\n  <section>\n    <p>这是文章的正文内容部分。</p>\n  </section>\n</article>', explanation: '在这段代码中，<article>代表一篇独立的文章，内部的<header>包含了标题和作者信息，<section>包含了文章的正文内容。' },
  { type: 'code', title: '请使用 <nav> 标签编写一个包含三个链接的无序列表导航栏。', options: [], answer: '<nav>\n  <ul>\n    <li><a href="/">首页</a></li>\n    <li><a href="/about">关于我们</a></li>\n    <li><a href="/contact">联系方式</a></li>\n  </ul>\n</nav>', explanation: '<nav> 标签专门用于包裹页面的主要导航链接。' },
  { type: 'code', title: '请使用 <figure> 和 <figcaption> 标签展示一张图片及其图片说明。', options: [], answer: '<figure>\n  <img src="logo.png" alt="网站Logo">\n  <figcaption>这是我们网站的官方Logo</figcaption>\n</figure>', explanation: '<figure> 包裹图片等流内容，<figcaption> 为其提供说明文字。' },
  { type: 'code', title: '请使用 <details> 和 <summary> 标签创建一个可折叠的“查看更多信息”区块。', options: [], answer: '<details>\n  <summary>查看更多信息</summary>\n  <p>这里是隐藏的详细信息，点击即可展开查看。</p>\n</details>', explanation: '<details> 创建一个可展开折叠的区域，<summary> 标签定义了未展开时显示的可见标题。' }
];

async function run() {
  const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'frontend_bible' });
  try {
    const ts = Math.floor(Date.now() / 1000);
    await connection.execute(
      'INSERT INTO knowledge_docs (category_id, parent_title, knowledge_point, content, created_at, updated_at, deleted_at, is_del) VALUES (?, ?, ?, ?, ?, ?, 0, 0)',
      [1, knowledgeDoc.parent_title, knowledgeDoc.knowledge_point, knowledgeDoc.content, ts, ts]
    );
    for (const q of questions) {
      await connection.execute(
        'INSERT INTO questions (category_id, knowledge_point, type, title, options, answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [1, knowledgeDoc.knowledge_point, q.type, q.title, JSON.stringify(q.options), q.answer, q.explanation]
      );
    }
    console.log(`Success KP15`);
  } catch (error) { console.error(error); } finally { await connection.end(); }
}
run();
