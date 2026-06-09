import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第一章：HTML5',
  knowledge_point: '标签之图片',
  content: `### 标签之图片

\`<img>\` 标签定义 HTML 页面中的图像。

**1. 基本语法**
\`<img src="url" alt="some_text">\`
* \`<img>\` 是空标签，意思是说，它只包含属性，并且没有闭合标签。

**2. 核心属性**
* \`src\` (source): 指定需要显示图像的 URL 或路径。
* \`alt\` (alternate text): 规定图像的替代文本。如果图像无法显示（比如图片链接失效、网络缓慢），或者用户使用了屏幕阅读器，浏览器将显示这个替代文本。这对于 SEO 和无障碍访问极其重要。
* \`width\` / \`height\`: 用于设置图像的宽度和高度，单位默认是像素 (px)。

**3. 显示特性**
\`<img>\` 属于行内替换元素 (inline replaced element)，它不会独占一行，但你可以直接为它设置宽度和高度。`
};

const questions = [
  // 20 单选题
  {
    type: 'single',
    title: '在 HTML 中，用于在网页里插入图片的标签是？',
    options: ['A. <picture>', 'B. <image>', 'C. <img>', 'D. <src>'],
    answer: 'C',
    explanation: '<img> 标签（Image）是 HTML 中用于嵌入图像的唯一标准基础标签。<picture> 则是 HTML5 用于响应式图片的容器。'
  },
  {
    type: 'single',
    title: '以下关于 `<img>` 标签语法的说法，正确的是？',
    options: ['A. 必须写成 `<img src="..."></img>`', 'B. 它是一个空元素，不需要闭合标签', 'C. 它可以包含文字作为其子节点', 'D. 它是块级元素'],
    answer: 'B',
    explanation: '<img> 标签是空元素（Void element），它只包含属性而不包含任何内容，因此不需要也不允许有闭合标签。'
  },
  {
    type: 'single',
    title: '`<img>` 标签中，用于指定图片地址的必填属性是？',
    options: ['A. href', 'B. link', 'C. src', 'D. url'],
    answer: 'C',
    explanation: 'src 代表 source（源），它是 <img> 标签的必需属性，用于指定要加载的图片文件的路径或 URL。'
  },
  {
    type: 'single',
    title: '当图片因为网络原因加载失败时，浏览器会显示哪个属性的值作为文字提示？',
    options: ['A. title', 'B. src', 'C. alt', 'D. placeholder'],
    answer: 'C',
    explanation: 'alt (Alternate text，替代文本) 的主要作用就是在图片无法正常加载时，作为备用内容显示在屏幕上，告诉用户这里原本是什么图片。'
  },
  {
    type: 'single',
    title: '以下哪个做法最有利于网页的 SEO（搜索引擎优化）？',
    options: ['A. 给所有 <img> 标签省略 alt 属性以减少代码体积', 'B. 所有的 alt 属性都填上 "image"', 'C. 为每张具有实际意义的图片编写准确描述内容的 alt 属性', 'D. 使用 CSS 背景图取代所有的 <img> 标签'],
    answer: 'C',
    explanation: '搜索引擎的爬虫无法直接“看懂”图片里的内容，它们高度依赖 <img> 标签的 alt 属性来理解图片的含义。精准的 alt 描述能极大提升图片在搜索引擎中的曝光率。'
  },
  {
    type: 'single',
    title: '盲人用户在使用“屏幕阅读器”浏览网页时，遇到 `<img>` 标签，阅读器会朗读什么？',
    options: ['A. 图片的 URL 地址', 'B. alt 属性中的文本', 'C. 直接跳过不读', 'D. 朗读 "这里有一张图片"'],
    answer: 'B',
    explanation: '对于视障用户，屏幕阅读器会抓取并朗读 alt 属性的值。如果缺失 alt 属性，阅读器可能会直接朗读又长又难懂的 src 文件名，极度影响体验。'
  },
  {
    type: 'single',
    title: '如果你使用 `<img>` 插入了一张纯装饰性的背景花纹图片（对理解内容毫无帮助），最符合无障碍规范的做法是？',
    options: ['A. 不写 alt 属性', 'B. 写上 `alt="装饰图片"`', 'C. 写上 `alt=""` (空字符串)', 'D. 使用 `title="装饰"`'],
    answer: 'C',
    explanation: '对于纯装饰性的图片，标准做法是提供一个空的 alt 属性 (alt="")。这会明确告诉屏幕阅读器“请直接忽略这张图片”，从而不打扰视障用户的正常阅读。如果不写 alt 属性，阅读器可能会错误地朗读文件名。'
  },
  {
    type: 'single',
    title: '`<img>` 标签属于什么类型的元素？',
    options: ['A. 块级元素 (Block)', 'B. 行内替换元素 (Inline replaced element)', 'C. 隐藏元素 (Hidden)', 'D. 纯文本元素 (Text)'],
    answer: 'B',
    explanation: '<img> 不会独占一行（属于行内），但它的尺寸和外观是由外部资源（图片文件）决定的，因此被称为“行内替换元素”。这也解释了为什么它是行内元素却可以直接设置宽高。'
  },
  {
    type: 'single',
    title: '我们在 `<img>` 标签中同时设置了 `width="200"` 和 `height="100"` 属性，此时图片的尺寸单位默认是？',
    options: ['A. %', 'B. em', 'C. px (像素)', 'D. rem'],
    answer: 'C',
    explanation: '在 HTML 标签的原生 width 和 height 属性中，如果只写纯数字，默认单位就是像素 (px)。'
  },
  {
    type: 'single',
    title: '假设一张原图尺寸是 400x400。你在 `<img>` 标签中只设置了 `width="200"`，没有设置 height。浏览器会怎么显示这张图？',
    options: ['A. 宽度 200，高度 400，图片被拉伸变形', 'B. 宽度 200，高度 200，图片等比例缩放', 'C. 无法显示，因为高度缺失', 'D. 宽度 200，高度 0'],
    answer: 'B',
    explanation: '对于 <img> 元素，如果只设置了宽度或高度中的一个属性，浏览器会自动等比例缩放另一边，以保持图片的原始纵横比（Aspect Ratio），防止变形。'
  },
  {
    type: 'single',
    title: '鼠标悬停在图片上时，想要显示一段悬浮提示文字（Tooltip），应该使用哪个属性？',
    options: ['A. alt', 'B. hover', 'C. tooltip', 'D. title'],
    answer: 'D',
    explanation: 'title 属性是 HTML 的全局属性，可以加在任何标签上。加在 <img> 上时，当鼠标悬停，就会出现原生的系统提示框。注意不要把 title 和 alt 的作用搞混。'
  },
  {
    type: 'single',
    title: '以下哪个图片格式支持“透明背景”（Alpha 通道），常被用于网页 logo 或需要叠加在复杂背景上的图标？',
    options: ['A. JPEG / JPG', 'B. PNG', 'C. BMP', 'D. TXT'],
    answer: 'B',
    explanation: 'PNG (Portable Network Graphics) 支持透明和半透明（Alpha 通道）。JPEG 格式不支持透明度，如果有透明区域会被自动填充为白色。'
  },
  {
    type: 'single',
    title: '以下哪个图片格式支持简单的“逐帧动画”，常被用来做网页上的搞笑表情包？',
    options: ['A. GIF', 'B. PNG', 'C. JPEG', 'D. SVG'],
    answer: 'A',
    explanation: 'GIF (Graphics Interchange Format) 原生支持将多帧图像打包在一起形成动画，在网页早期非常流行，至今仍是表情包的主力格式。'
  },
  {
    type: 'single',
    title: '在编写 `<img>` 的 `src` 属性时，如果图片地址是以 `data:image/png;base64,...` 开头的超长字符串，这代表什么？',
    options: ['A. 图片服务器中毒了', 'B. 这是一张使用了 Base64 编码内嵌到 HTML 中的图片', 'C. 这是一个视频的解码流', 'D. 这是一个非法的路径'],
    answer: 'B',
    explanation: 'Base64 编码可以将小图片直接转化为文本代码写在 HTML 或 CSS 中，这样可以减少一次浏览器的 HTTP 外部网络请求。'
  },
  {
    type: 'single',
    title: '如果连续写了 3 个 `<img src="icon.png">`，它们在浏览器中默认会怎么排列？',
    options: ['A. 从上到下排成一列', 'B. 从左到右排在一行', 'C. 互相重叠在一起', 'D. 只会显示第一个'],
    answer: 'B',
    explanation: '因为 <img> 是行内元素（Inline element），它们不会像块级元素那样产生换行，而是会像文字一样从左到右依次排列在一行内。'
  },
  {
    type: 'single',
    title: '在移动端适配中，为了让一张很大的商品图片不溢出手机屏幕，通常会配合 CSS 设置哪个核心属性？',
    options: ['A. max-width: 100%', 'B. float: left', 'C. position: absolute', 'D. display: block'],
    answer: 'A',
    explanation: 'max-width: 100% 是实现响应式图片的核心技巧。它能确保图片的宽度最大不会超过其父容器（比如手机屏幕的宽度），同时保持比例。'
  },
  {
    type: 'single',
    title: 'HTML5 推荐我们在给图片添加详细的图文说明（如新闻图片的下方的文字说明）时，使用哪组标签将 `<img>` 和文本包裹起来？',
    options: ['A. <div> 和 <span>', 'B. <p> 和 <h1>', 'C. <figure> 和 <figcaption>', 'D. <form> 和 <input>'],
    answer: 'C',
    explanation: '<figure> 是 HTML5 新增的独立流内容块，常用于包裹图片；而 <figcaption> 用于为其提供标题或说明。这极大地增强了文档的语义化。'
  },
  {
    type: 'single',
    title: '对于一个使用 `<img src="logo.png">` 的标签，如果不写 width 和 height 属性，页面在弱网环境下加载时会发生什么体验上的问题？',
    options: ['A. 图片永远加载不出来', 'B. 会出现“布局偏移”（Cumulative Layout Shift, CLS）', 'C. 页面会立刻白屏崩溃', 'D. 图片会变成黑色方块'],
    answer: 'B',
    explanation: '如果不显式指定宽高，浏览器在图片下载完成前不知道它占多大空间。当图片突然加载出来并撑开页面时，会导致下方的内容瞬间向下跳动，这叫 CLS（布局偏移），严重影响现代网页的性能评分。'
  },
  {
    type: 'single',
    title: '如果要加载一个矢量图文件（放大绝不失真，非常适合图标），通常使用以下哪种格式的文件后缀？',
    options: ['A. .jpg', 'B. .png', 'C. .gif', 'D. .svg'],
    answer: 'D',
    explanation: 'SVG (Scalable Vector Graphics) 是一种基于 XML 的矢量图像格式。无论放大多少倍，边缘依然锐利，是现代前端图标的绝对主力。'
  },
  {
    type: 'single',
    title: '如果代码写成 `<img src="pic.jpg" alt="风景" title="桂林山水">`，当图片加载失败时，屏幕上显示文字的来源是？',
    options: ['A. src 的文件名', 'B. alt 的值“风景”', 'C. title 的值“桂林山水”', 'D. 不显示任何文字'],
    answer: 'B',
    explanation: '加载失败时的替代区域文字显示的是 alt 属性的内容，而 title 是鼠标悬浮时显示的提示框。'
  },

  // 5 代码题
  {
    type: 'code',
    title: '请编写一段简单的 HTML 代码，在页面中插入一张名为 `banner.jpg` 的图片，并设置它的替代文本为“首页海报”。',
    options: [],
    answer: '<img src="banner.jpg" alt="首页海报">',
    explanation: '使用 img 标签，必须包含 src 指定路径，以及 alt 指定替代文本。'
  },
  {
    type: 'code',
    title: '在页面中插入一张图片 `avatar.png`，要求强制设置其显示宽度为 100 像素，高度为 100 像素。',
    options: [],
    answer: '<img src="avatar.png" alt="头像" width="100" height="100">',
    explanation: '在 img 标签内部直接使用 width="100" height="100" 可以规定尺寸（无需加px单位，默认即为像素）。建议同时保留 alt 属性是一个好习惯。'
  },
  {
    type: 'code',
    title: '请编写一段代码，插入一张纯粹是为了视觉美观的装饰性线条图片 `line.png`。为了照顾视障群体，请书写最规范的 alt 属性。',
    options: [],
    answer: '<img src="line.png" alt="">',
    explanation: '对于纯装饰性的图片，应显式提供空的 alt="" 属性，这样屏幕阅读器就能明确知道直接忽略它，避免误读文件名。'
  },
  {
    type: 'code',
    title: '请编写一段代码：插入一张图片 `logo.png`，并且要求当鼠标悬停在该图片上时，能浮现出“点击返回首页”的黑底白字系统提示框。',
    options: [],
    answer: '<img src="logo.png" alt="网站Logo" title="点击返回首页">',
    explanation: '实现鼠标悬停原生提示框，需要使用全局属性 title="提示文字"。'
  },
  {
    type: 'code',
    title: '（结合上一关知识）请编写代码：让一张图片 `photo.jpg` 在网页中独自占据一整行，且上下有默认的段落间距（不使用CSS）。',
    options: [],
    answer: '<p>\n  <img src="photo.jpg" alt="照片">\n</p>',
    explanation: '因为 img 是行内替换元素，本身不独占一行。最语义化且不用 CSS 的传统做法是，用一个块级段落标签 <p> 将其包裹起来。'
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
