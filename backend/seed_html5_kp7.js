import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第一章：HTML5',
  knowledge_point: '标签之文本',
  content: `### 标签之文本

在网页排版中，经常需要对段落内的某些词语进行特别处理，这就需要用到文本格式化标签。

**常用文本标签**
* \`<span>\`：**无实际语义的行内标签**。常用于为了应用 CSS 样式或通过 JavaScript 操作而将部分文本包裹起来。
* \`<strong>\`：**粗体**。具有强烈的语义强调作用，告诉搜索引擎这里的文字很重要。
* \`<b>\` (bold)：**粗体**。历史遗留标签，通常只用于视觉上的加粗，没有特别的语义强调。
* \`<em>\` (emphasized)：**斜体**。带有强烈的语气强调语义。
* \`<i>\` (italic)：**斜体**。历史遗留标签，现在常用来包裹字体图标（如 FontAwesome）。
* \`<del>\` (deleted)：**删除线**。表示文档中已被删除的文本。
* \`<u>\` (underline)：**下划线**。现在极少使用，因为容易和超链接混淆。`
};

const questions = [
  // 20 单选题
  {
    type: 'single',
    title: '在 HTML 中，`<span>` 标签的主要作用是？',
    options: ['A. 创建一个独立的新段落', 'B. 强制文字换行', 'C. 作为没有任何默认语义的行内容器，主要为了配合 CSS 和 JS 来钩取特定的局部文本', 'D. 让包围的文字变成红色'],
    answer: 'C',
    explanation: '<span> 标签本身没有任何视觉效果和语义含义，它是最纯粹的行内（内联）容器，完全是为了方便开发者为其添加类名从而进行 CSS 美化或 JS 交互。'
  },
  {
    type: 'single',
    title: '关于 `<strong>` 和 `<b>` 标签的区别，以下说法最准确的是？',
    options: ['A. 它们的显示效果不同，<b> 看起来更粗', 'B. <strong> 具有明确的强调语义（供机器识别），而 <b> 仅代表视觉上的加粗效果', 'C. <b> 是 HTML5 新增的标签，<strong> 已经被废弃', 'D. <strong> 不能嵌套在 <p> 标签里'],
    answer: 'B',
    explanation: '在现代前端开发中，虽然两者默认都会将字体加粗，但在语义学上截然不同。<strong> 是告诉爬虫和盲人阅读器“这部分内容十分重要”，而 <b> 只是单纯的样式表现。'
  },
  {
    type: 'single',
    title: '如果要给一段文字添加强烈的语气强调，并且默认显示为斜体，应该使用哪个标签？',
    options: ['A. <i>', 'B. <em>', 'C. <italic>', 'D. <style>'],
    answer: 'B',
    explanation: '<em> 标签（emphasized）代表强调的文本，它在浏览器中默认会渲染为斜体。与 <i> 相比，它具有强烈的语气语义。'
  },
  {
    type: 'single',
    title: '在许多现代的 UI 框架（如 Element UI、Bootstrap）中，通常约定俗成使用哪个本意为“斜体”的历史标签来作为“字体图标（Icon）”的容器？',
    options: ['A. <icon>', 'B. <span>', 'C. <i>', 'D. <em>'],
    answer: 'C',
    explanation: '由于 <i>（italic）标签的代码非常简短，且在现代网页中几乎不再用作大段的斜体排版，业界便约定俗成地赋予了它一个新使命：作为 Web Font 字体图标的载体（例如 `<i class="iconfont icon-user"></i>`）。'
  },
  {
    type: 'single',
    title: '我们在电商网站上经常会看到商品原价被划了一条“删除线”，这通常使用了哪个 HTML 标签最具有语义化？',
    options: ['A. <s>', 'B. <strike>', 'C. <del>', 'D. <u>'],
    answer: 'C',
    explanation: '<del>（deleted text）具有明确的语义，表示“从文档中被移除的文本”。虽然 <s> 也能画删除线，但 <del> 是更加严谨且被推荐的做法。'
  },
  {
    type: 'single',
    title: '关于 `<u>` 标签（下划线），在现代 Web 开发中，为什么一般不建议对普通文本使用？',
    options: ['A. 因为它会使网页加载变慢', 'B. 因为浏览器已经不再支持这个标签了', 'C. 因为带有下划线的普通文本很容易让用户误以为它是一个可点击的超链接', 'D. 因为它的名字太短了'],
    answer: 'C',
    explanation: '这是 UX（用户体验）设计的常识。在互联网的潜规则中，蓝色或带有下划线的文字代表超链接。如果随意给普通文本加下划线，会给用户带来严重的误导。'
  },
  {
    type: 'single',
    title: '以下哪个文本格式化标签可以把文字变成“上标”（例如数学公式里的平方 $x^2$）？',
    options: ['A. <sub>', 'B. <sup>', 'C. <up>', 'D. <top>'],
    answer: 'B',
    explanation: '<sup>（superscript）表示上标文本，常用于数学指数或脚注。与之对应的是 <sub>（subscript），表示下标文本，如化学方程式 H₂O。'
  },
  {
    type: 'single',
    title: '在一个段落 `<p>` 中连续嵌套 `<span>`，如 `<p><span>A</span><span>B</span></p>`，它们在页面上会如何显示？',
    options: ['A. A 和 B 会各自独占一行', 'B. 浏览器会报错', 'C. A 和 B 会并排显示在同一行，且中间没有巨大的间隙', 'D. 只有 B 会显示出来'],
    answer: 'C',
    explanation: '<span> 是纯粹的行内元素（Inline），它本身不带有任何的外边距或换行特性，因此内部的文本会像普通的词语一样并排流畅显示。'
  },
  {
    type: 'single',
    title: '以下关于 HTML5 文本语义化的描述，**错误**的是？',
    options: ['A. 语义化可以让网页在没有 CSS 的情况下也能呈现出较好的结构', 'B. 语义化只对后端程序员有用，前端不需要关心', 'C. 语义化有助于搜索引擎爬虫（SEO）更好地理解网页内容', 'D. 语义化极大地提升了网页对于视障设备（屏幕阅读器）的友好度'],
    answer: 'B',
    explanation: '语义化是前端开发最基础且最重要的核心思想之一，它直接决定了网页的可访问性（A11y）和 SEO 的质量。'
  },
  {
    type: 'single',
    title: '如果你仅仅是想让一段文字在视觉上变成粗体，且这段文字并没有任何需要向搜索引擎强调的特殊重要性，你应该怎么做最符合规范？',
    options: ['A. 使用 <strong>', 'B. 使用 <h1>', 'C. 用 <span> 包裹并使用 CSS 设置 font-weight: bold', 'D. 使用 <p>'],
    answer: 'C',
    explanation: '既然没有任何语义强调的需要，就不应该滥用 <strong> 等语义标签。正确的做法是使用无语义的 <span> 配合 CSS 来完成单纯的视觉表现。'
  },
  {
    type: 'single',
    title: '在编写一段计算机代码的文档时，如果要在一段文字中混排一个“键盘按键名”（例如让用户按下 Enter 键），使用哪个 HTML 标签最具语义？',
    options: ['A. <kbd>', 'B. <code>', 'C. <key>', 'D. <span>'],
    answer: 'A',
    explanation: '<kbd> (keyboard input) 专门用于表示用户的键盘输入。现代浏览器默认会将其渲染为等宽字体，通常我们还会给它加一点像键盘按键一样的边框 CSS 样式。'
  },
  {
    type: 'single',
    title: '如果要在网页上展示一段长短句形式的程序代码块（要求原样保留源码中的所有空格与换行缩进），应该将 `<code>` 标签包裹在什么标签内最合适？',
    options: ['A. <p>', 'B. <pre>', 'C. <div>', 'D. <span>'],
    answer: 'B',
    explanation: '<pre>（preformatted text）标签能原封不动地保留其中的空白符和换行符，它和 <code> 配合使用是目前所有技术博客展示多行代码的标准姿势。'
  },
  {
    type: 'single',
    title: '在文本排版中，如果要表示一小段来自他人著作的“引用语句”（短引用），应该使用哪个标签？',
    options: ['A. <blockquote>', 'B. <q>', 'C. <cite>', 'D. <ref>'],
    answer: 'B',
    explanation: '<q> (quote) 用于表示短的内联引用。浏览器通常会自动为 <q> 标签包裹的文本加上双引号。如果是大段的块级引用，则使用 <blockquote>。'
  },
  {
    type: 'single',
    title: '如果我们在一个句子中提到了一本书的书名，或者一幅画作的名字，最适合用哪个标签包裹它以表示它是“作品的标题”？',
    options: ['A. <i>', 'B. <b>', 'C. <cite>', 'D. <span>'],
    answer: 'C',
    explanation: '<cite> 标签专用于定义作品的标题（比如书籍、歌曲、电影等）。浏览器默认会以斜体显示它，但更重要的是它赋予了机器可读的精确语义。'
  },
  {
    type: 'single',
    title: '以下哪个标签组合属于“表现与结构分离”的反面教材，在现代 HTML 开发中被极度排斥？',
    options: ['A. <p><span>文本</span></p>', 'B. <font color="red" size="5">文本</font>', 'C. <del>删除文本</del>', 'D. <strong>强调文本</strong>'],
    answer: 'B',
    explanation: '<font> 标签是上个世纪遗留下来的怪物，它纯粹为了控制字体的视觉样式而存在，严重违背了“HTML只负责结构，CSS负责表现”的原则，在 HTML5 中已被彻底废弃。'
  },
  {
    type: 'single',
    title: '如果你使用 `<del>` 标签标记了一段已失效的商品原价，同时你想标出商品的新价格，除了用普通的文本，还可以用哪个语义对应的标签来表示“新增插入的文本”？',
    options: ['A. <add>', 'B. <new>', 'C. <ins>', 'D. <push>'],
    answer: 'C',
    explanation: '<ins> (inserted text) 通常与 <del> 成对使用，表示文档的更新轨迹。浏览器默认会为 <ins> 标签的文本加上下划线。'
  },
  {
    type: 'single',
    title: '以下代码：`<p>水的化学式是 H<sub>2</sub>O</p>`，数字 2 会显示在 H 的哪个相对位置？',
    options: ['A. 正上方', 'B. 右上方（平方的位置）', 'C. 右下方', 'D. 同一水平线，字体变大'],
    answer: 'C',
    explanation: '<sub> 标签代表 subscript（下标），常用于化学式。所以 2 会缩小并显示在主线偏下的位置。'
  },
  {
    type: 'single',
    title: '在阅读网页文章时，如果你看到一个专有名词下方带有虚线下划线，鼠标移上去还会悬浮显示它的完整全称，这通常使用了哪个 HTML 标签并配合了 title 属性？',
    options: ['A. <abbr>', 'B. <title>', 'C. <span>', 'D. <u>'],
    answer: 'A',
    explanation: '<abbr> (abbreviation) 用于定义缩写。将全称写在 title 属性中（如 <abbr title="World Health Organization">WHO</abbr>），既能增强可读性，也是优秀的 SEO 细节。'
  },
  {
    type: 'single',
    title: '关于文本标签的嵌套规则，以下哪一个是违背常理的错误行为？',
    options: ['A. 在 <strong> 里面套用 <em>，表示既加粗又斜体的双重强调', 'B. 在 <span> 里面套用 <a> 链接', 'C. 在 <span> 里面套用一个 <h1> 大标题', 'D. 在 <p> 里面套用多个 <span>'],
    answer: 'C',
    explanation: '这违背了 HTML 嵌套的基本法则：行内元素（如 span）内部绝不允许包含块级元素（如 h1 或 div）。'
  },
  {
    type: 'single',
    title: '对于一段高亮的“记号笔”效果文本，HTML5 提供了一个专门的标签，它默认具有黄色的背景，这个标签是？',
    options: ['A. <yellow>', 'B. <mark>', 'C. <highlight>', 'D. <bg>'],
    answer: 'B',
    explanation: '<mark> 标签定义带有记号的文本。在搜索结果页面中高亮显示用户搜索的关键字时，使用它非常合适。'
  },

  // 5 代码题
  {
    type: 'code',
    title: '请编写一段 HTML 文本，内容为“前端开发十分有趣”。要求只让“十分”这两个字加粗，且**必须使用带有强烈语义强调**的标签。',
    options: [],
    answer: '前端开发<strong>十分</strong>有趣',
    explanation: '使用 <strong> 标签将需要强调的内容单独包裹起来。注意避开纯视觉表现的 <b> 标签。'
  },
  {
    type: 'code',
    title: '在电商商品页面上，需要显示原价 999 元。请使用最具语义化的标签为其添加删除线效果，代码应为？',
    options: [],
    answer: '<del>999</del>',
    explanation: '推荐使用具有明确“已被删除的文档内容”语义的 <del> 标签。'
  },
  {
    type: 'code',
    title: '请写出一段代码：输出“爱因斯坦的质能方程是 E = mc²”。要求使用适当的 HTML 标签来实现字母 c 后面的平方效果。',
    options: [],
    answer: '爱因斯坦的质能方程是 E = mc<sup>2</sup>',
    explanation: '平方是上标效果，必须使用 <sup> (superscript) 标签将数字 2 包裹。'
  },
  {
    type: 'code',
    title: '请编写一段代码，内容为一段普通的警告文字：“不要点击红色的按钮”。但是你想通过 CSS 将其中的“红色”两个字变成纯红色，请使用**无任何特殊语义且最常用于局部 CSS 挂载**的标签将其包裹，以便后续写样式。',
    options: [],
    answer: '不要点击<span>红色</span>的按钮',
    explanation: '<span> 标签就是为此而生的。它是一个透明的行内容器，你可以给它加上 class 或 style 属性来精准控制局部的表现形式，又不会影响整段话的语义。'
  },
  {
    type: 'code',
    title: '某段新闻中需要显示一个缩略词“UN”，并且要求鼠标悬停时出现提示气泡显示“联合国”。请使用专业的缩略词语义标签实现它。',
    options: [],
    answer: '<abbr title="联合国">UN</abbr>',
    explanation: '<abbr> 是专门用于缩写的语义化标签，配合全局属性 title 即可实现完美的无障碍提示。'
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
