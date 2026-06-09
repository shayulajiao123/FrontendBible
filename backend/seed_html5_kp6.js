import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第一章：HTML5',
  knowledge_point: '标签之超文本链接',
  content: `### 标签之超文本链接

HTML 使用标签 \`<a>\` 来设置超文本链接。超链接可以是一个字，一个词，或者一组词，也可以是一幅图像，您可以点击这些内容来跳转到新的文档或者当前文档中的某个部分。

**1. 基本语法**
\`<a href="url">链接文本</a>\`
* \`href\` (Hypertext Reference) 属性描述了链接的目标地址。
* 在标签 \`<a>\` 和 \`</a>\` 之间包含的内容就是显示在页面上的链接内容。

**2. 默认视觉样式**
默认情况下，链接将以以下形式出现在浏览器中：
* 一个未访问过的链接显示为蓝色字体并带有下划线。
* 访问过的链接显示为紫色并带有下划线。
* 点击链接时，链接显示为红色并带有下划线。

**3. target 属性**
使用 \`target\` 属性，你可以定义被链接的文档在何处显示。
* \`_self\`：默认值。在当前窗口/标签页中打开。
* \`_blank\`：在一个新的空白窗口/标签页中打开。`
};

const questions = [
  // 20 单选题
  {
    type: 'single',
    title: 'HTML 中用于创建超文本链接的标签是？',
    options: ['A. <link>', 'B. <a>', 'C. <href>', 'D. <nav>'],
    answer: 'B',
    explanation: '<a> 标签（Anchor，锚点）是 HTML 中用于创建超链接的标准标签。不要和 <link> 混淆，后者常用于引入外部 CSS 文件。'
  },
  {
    type: 'single',
    title: '`<a>` 标签中，用于指定跳转目标地址的核心属性是？',
    options: ['A. src', 'B. target', 'C. href', 'D. url'],
    answer: 'C',
    explanation: 'href (Hypertext Reference) 是超链接标签最重要的属性，它指定了链接指向的最终地址。'
  },
  {
    type: 'single',
    title: '以下代码的作用是？ `<a href="https://www.baidu.com">百度一下</a>`',
    options: ['A. 在网页上显示“https://www.baidu.com”的纯文本', 'B. 加载百度的图片', 'C. 在网页上显示文字“百度一下”，点击后跳转到百度', 'D. 自动在后台向百度发送一个请求'],
    answer: 'C',
    explanation: '<a> 标签包裹的文字“百度一下”是用户可见的可点击区域，点击后浏览器会导航到 href 属性指向的 URL。'
  },
  {
    type: 'single',
    title: '如果希望点击链接后，**在一个全新的浏览器标签页**中打开目标网页，应该使用哪个属性？',
    options: ['A. target="_self"', 'B. target="_new"', 'C. target="_window"', 'D. target="_blank"'],
    answer: 'D',
    explanation: 'target="_blank" 是在前端开发中强制链接在新窗口/新标签页中打开的标准写法。'
  },
  {
    type: 'single',
    title: '`<a>` 标签 `target` 属性的默认值是什么？（即不写 target 属性时的默认行为）',
    options: ['A. _blank (新窗口打开)', 'B. _self (当前窗口打开)', 'C. _parent (父级窗口打开)', 'D. _top (顶层窗口打开)'],
    answer: 'B',
    explanation: '默认情况下，超链接会在当前所在的浏览器标签页（或 iframe）中直接跳转覆盖当前页面，这就是 _self 的作用。'
  },
  {
    type: 'single',
    title: '在没有任何 CSS 干预的情况下，浏览器默认如何显示一个**从未被点击访问过**的超链接文字？',
    options: ['A. 黑色，无下划线', 'B. 蓝色，带有下划线', 'C. 紫色，带有下划线', 'D. 红色，带有下划线'],
    answer: 'B',
    explanation: '这是各大浏览器的历史默认行为。未访问的链接（:link 伪类状态）默认是蓝色字体加下划线。'
  },
  {
    type: 'single',
    title: '在没有任何 CSS 干预的情况下，浏览器默认如何显示一个**曾经被点击访问过**的超链接文字？',
    options: ['A. 蓝色', 'B. 绿色', 'C. 灰色', 'D. 紫色'],
    answer: 'D',
    explanation: '已访问过的链接（:visited 伪类状态）默认会被浏览器渲染为紫色，以提示用户该链接已被阅读过。'
  },
  {
    type: 'single',
    title: '如果将 `<a>` 标签的 `href` 属性写为一个井号 `#`，如 `<a href="#">回到顶部</a>`，点击它会发生什么？',
    options: ['A. 报错页面 404', 'B. 页面会立刻刷新', 'C. 页面滚动条会瞬间跳转到当前页面的最顶部', 'D. 浏览器会关闭当前页面'],
    answer: 'C',
    explanation: '单独的一个 # 代表一个空锚点。点击它时，浏览器默认行为是将当前页面的滚动条瞬间定位到页面的绝对顶部，且不会刷新页面。'
  },
  {
    type: 'single',
    title: '假设页面中有一个元素的 ID 是 `section-2`。如何使用 `<a>` 标签实现点击后页面平滑滚动（或瞬间跳转）到该元素的位置？（锚点链接）',
    options: ['A. <a href="section-2">', 'B. <a id="section-2">', 'C. <a href="#section-2">', 'D. <a target="section-2">'],
    answer: 'C',
    explanation: '这是页面内“锚点跳转”的标准写法。href 属性值为 "#" 加上目标元素的 ID 值，即可实现页内定位。'
  },
  {
    type: 'single',
    title: '`<a>` 标签属于什么类型的 HTML 元素？',
    options: ['A. 块级元素 (Block)', 'B. 行内元素 (Inline)', 'C. 隐藏元素', 'D. 元数据元素'],
    answer: 'B',
    explanation: '<a> 是典型的行内元素，它包裹在文字外围，不会独占一行。如果要给它设置宽高，通常需要通过 CSS 将其 display 改为 block 或 inline-block。'
  },
  {
    type: 'single',
    title: '是否可以使用 `<a>` 标签包裹一张图片 `<img ...>`？',
    options: ['A. 绝对不可以，行内元素不能包裹行内元素', 'B. 可以，这会让整张图片变成一个可点击的超链接区域', 'C. 可以，但图片会无法显示', 'D. 可以，但点击失效'],
    answer: 'B',
    explanation: '完全可以。<a> 标签不仅可以包裹文本，包裹 <img> 标签是实现“点击图片跳转”的常用且极其规范的做法。'
  },
  {
    type: 'single',
    title: '如果写了 `<a href="mailto:admin@example.com">联系我们</a>`，用户点击这个链接会发生什么？',
    options: ['A. 打开一个名为 mailto 的网页', 'B. 下载一个邮件客户端软件', 'C. 唤起用户操作系统中默认绑定的电子邮件客户端（如 Outlook / Apple Mail）并准备发送邮件', 'D. 弹出一个网页表单'],
    answer: 'C',
    explanation: 'mailto: 是一个特殊的协议前缀。浏览器识别到它后，会呼叫系统底层的默认邮件软件，并将地址填入收件人栏中。'
  },
  {
    type: 'single',
    title: '如果写了 `<a href="tel:10086">拨打电话</a>`，在手机浏览器中点击它通常会？',
    options: ['A. 报错协议不支持', 'B. 跳转到一个号码查询网站', 'C. 唤起手机系统的拨号盘，并自动输入 10086', 'D. 发送一条短信'],
    answer: 'C',
    explanation: 'tel: 协议在移动端 H5 开发中极其常用。点击后可以直接拉起操作系统的原生拨号界面。'
  },
  {
    type: 'single',
    title: '以下代码存在一个非常明显的语法错误，它是？ `<a href="http://test.com" target="_blank" />测试链接</a>`',
    options: ['A. 不能同时使用 href 和 target', 'B. <a> 标签的起始标签被错误地写成了自闭合形式 `/>`', 'C. target 的值不能带有下划线', 'D. 链接文本写在了闭合标签外面'],
    answer: 'B',
    explanation: '<a> 标签是一个必须有起止标签的容器元素，起始标签里绝对不能写成 `/>`。这样会导致浏览器解析混乱，链接文本无法正确被包裹。'
  },
  {
    type: 'single',
    title: '前端单页应用（SPA，如 Vue/React 路由）经常使用 `history` 或 `hash` 模式，但在传统 HTML 中，如果 `<a>` 标签没有写 `href` 属性（即只有 `<a>文本</a>`），会怎样？',
    options: ['A. 它仍然是一个可点击的链接，只是原地刷新', 'B. 它会报错', 'C. 它失去了超链接的所有交互特性（没有手型鼠标、没有下划线），仅仅是一个普通的内联文本包裹元素', 'D. 它会自动跳转到首页'],
    answer: 'C',
    explanation: '在 HTML 规范中，如果没有 href 属性，<a> 标签仅仅代表一个“占位符锚点”，它不再是超链接，也不会有原生的交互样式。'
  },
  {
    type: 'single',
    title: '有时候我们在开发中会看到 `<a href="javascript:void(0);">点击</a>` 这样的写法，它的目的是什么？',
    options: ['A. 执行一段复杂的动画', 'B. 保留超链接的 UI 样式（如手型鼠标），但彻底阻止点击后页面跳转或刷新，以便完全交由 JS 来控制点击事件', 'C. 这是为了绕过浏览器的安全拦截', 'D. 用来跳转到一个叫 void(0) 的页面'],
    answer: 'B',
    explanation: 'javascript:void(0); 是一段特殊的伪协议。执行 void 运算永远返回 undefined，因此浏览器不会发生任何跳转。这是前端劫持 a 标签点击行为的经典手段。'
  },
  {
    type: 'single',
    title: '关于相对路径超链接，当前在 `index.html`，想链接到同级目录下的 `about.html`，正确的写法是？',
    options: ['A. <a href="/about.html">', 'B. <a href="about.html">', 'C. <a href="../about.html">', 'D. <a href="http://about.html">'],
    answer: 'B',
    explanation: '直接写文件名 about.html（或 ./about.html）表示跳转到当前所在目录下的目标文件。'
  },
  {
    type: 'single',
    title: '`<a>` 标签中有一个 `download` 属性，它的作用是？（HTML5 新增）',
    options: ['A. 告诉浏览器这个链接不能被点击', 'B. 指示浏览器在点击时下载目标 URL 的资源，而不是尝试在浏览器中导航或打开它', 'C. 加速链接的下载速度', 'D. 仅仅是为了 SEO'],
    answer: 'B',
    explanation: 'download 属性是 HTML5 的新特性。即使用户点击的是一张图片或一个 PDF 的链接，只要加上 download，浏览器就会弹出文件下载框而不是直接预览。'
  },
  {
    type: 'single',
    title: '在某些场景下，外链（指向别的域名的链接）会增加 `rel="noopener noreferrer"` 属性，主要目的是？',
    options: ['A. 防止对方网站通过 `window.opener` 操控当前页面的对象，防止安全和钓鱼攻击，同时也阻止传递 Referer 来源信息', 'B. 让链接变色', 'C. 让目标网站能够获取当前页面的所有 Cookie', 'D. 让链接永远打不开'],
    answer: 'A',
    explanation: '这是前端极高频的安全考点。尤其是配合 target="_blank" 打开外部未知网站时，强烈建议加上此属性，切断新窗口与旧窗口之间的底层 JS 关联，防止安全风险。'
  },
  {
    type: 'single',
    title: '如果希望超链接在用户鼠标悬停时不要出现默认的下划线，必须使用什么技术手段？',
    options: ['A. 给 a 标签添加属性 no-underline="true"', 'B. 使用 CSS `text-decoration: none;`', 'C. 使用 JS 删除下划线节点', 'D. HTML 无法实现，下划线是永久固定的'],
    answer: 'B',
    explanation: 'a 标签的下划线是由浏览器的 User Agent 默认 CSS 控制的。要去除它，必须使用 CSS 的 text-decoration 属性。'
  },

  // 5 代码题
  {
    type: 'code',
    title: '请编写一段 HTML 代码，创建一个指向苹果官网（https://www.apple.com）的超链接，显示的文字是“访问 Apple”。',
    options: [],
    answer: '<a href="https://www.apple.com">访问 Apple</a>',
    explanation: '使用 a 标签，通过 href 指定外网绝对路径。'
  },
  {
    type: 'code',
    title: '请编写一段代码，创建一个指向谷歌（https://www.google.com）的超链接。要求用户点击后，**强制在一个新的独立窗口或标签页中打开它**。',
    options: [],
    answer: '<a href="https://www.google.com" target="_blank">Google</a>',
    explanation: '必须添加 target="_blank" 属性来实现新窗口打开的功能。'
  },
  {
    type: 'code',
    title: '（结合图片标签知识）请写一段代码，实现**点击图片跳转**：点击名为 `btn.png` 的图片时，跳转到同级目录的 `login.html` 页面。',
    options: [],
    answer: '<a href="login.html">\n  <img src="btn.png" alt="登录按钮">\n</a>',
    explanation: '将 img 标签完整地嵌套在 a 标签的内部即可，此时整张图片都会变成可点击的热区。'
  },
  {
    type: 'code',
    title: '请编写一个锚点跳转代码。要求点击文字“看评论”，页面能瞬间滚动定位到当前页面中 ID 为 `comment-area` 的元素位置。',
    options: [],
    answer: '<a href="#comment-area">看评论</a>',
    explanation: '将 href 属性设置为 # 加上目标元素的 id 值，即可实现页内锚点跳转。'
  },
  {
    type: 'code',
    title: '请编写一段可以拉起用户本地发邮件客户端的联系超链接代码。收件人地址设为 `boss@company.com`，显示的文字为“发邮件给老板”。',
    options: [],
    answer: '<a href="mailto:boss@company.com">发邮件给老板</a>',
    explanation: '使用 mailto: 协议前缀配合邮箱地址，可以唤起系统默认邮件应用。'
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
