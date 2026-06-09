import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '字体图标',
  content: `### 字体图标 (Iconfont)\n\n字体图标是一种使用字体文件来显示图标的技术。相比于图片，它的优势在于：\n1. 矢量图形，无限放大不失真。\n2. 可以像文本一样使用 CSS 修改颜色、大小、阴影等样式。\n3. 体积更小，加载更快。\n\n常用库：阿里巴巴矢量图标库 (Iconfont)、Font Awesome。`
};

const questions = [
  { type: 'single', title: '关于字体图标（Iconfont）相比于传统图片（如PNG）的优势，以下说法错误的是？', options: ['A. 支持无限放大而不失真', 'B. 文件体积通常更小', 'C. 可以原生支持多色渐变图标且兼容性极佳', 'D. 可以直接通过CSS的color属性修改颜色'], answer: 'C', explanation: '传统的字体图标（基于字体绘制）只能支持单色，如果想要多色往往需要依赖SVG或者特定的多色字体技术，并不是原生极其简单的多色完美兼容方案。' },
  { type: 'single', title: '在使用 @font-face 引入自定义字体图标时，以下哪个格式兼容性最好，通常作为现代浏览器的首选格式？', options: ['A. WOFF2', 'B. TTF', 'C. EOT', 'D. SVG'], answer: 'A', explanation: 'WOFF2（Web Open Font Format 2）具有极高的压缩率，是现代浏览器的首选格式，TTF和EOT主要为了兼容旧浏览器。' },
  { type: 'single', title: '在使用伪元素（如 ::before 或 ::after）显示字体图标时，必须设置的 CSS 属性是？', options: ['A. content 和 font-family', 'B. background-image 和 font-family', 'C. text-decoration 和 content', 'D. display 和 font-size'], answer: 'A', explanation: '必须设置 content 属性提供 Unicode 字符，并设置 font-family 指定为相应的图标字体。' },
  { type: 'single', title: '字体图标的本质是？', options: ['A. 矢量图（SVG）', 'B. 栅格图', 'C. Base64 编码的图片', 'D. 特殊编码的文本字符'], answer: 'D', explanation: '字体图标本质上是文本，把特殊的 Unicode 编码字符映射到了特定的图形上。' },
  { type: 'single', title: 'Font Awesome 字体图标库默认通过什么方式给元素添加图标？', options: ['A. 添加特定的类名（如 .fa .fa-user）', 'B. 直接使用 HTML 自定义标签', 'C. 引入 JS 自动渲染', 'D. 设置内联 CSS background'], answer: 'A', explanation: 'Font Awesome 主要通过预设的类名，利用伪元素和预定义的 content 以及 font-family 来渲染图标。' },
  { type: 'single', title: '如果网页中出现的字体图标变成了“小方块”或者乱码，最可能的原因是？', options: ['A. CSS 的 color 属性未设置', 'B. font-family 属性未正确引用或字体文件加载失败', 'C. 字体大小设置得过小', 'D. HTML 标签使用了 div 而不是 i 或 span'], answer: 'B', explanation: '小方块通常表示该字体文件未能正确加载，或者 font-family 拼写错误导致浏览器找不到对应的字体图形。' },
  { type: 'single', title: '在 HTML 中直接使用字体图标的 Unicode 编码时，格式通常是？', options: ['A. &#xXXXX;', 'B. \\uXXXX', 'C. &XXXX;', 'D. %uXXXX'], answer: 'A', explanation: 'HTML 实体字符常使用 `&#x` 加上十六进制编码再加上分号的形式，如 `&#xe601;`。' },
  { type: 'single', title: '若使用 CSS 伪元素的 content 属性插入图标，Unicode 的格式应如何书写？', options: ['A. content: "&#xXXXX;";', 'B. content: "\\XXXX";', 'C. content: "U+XXXX";', 'D. content: "/XXXX";'], answer: 'B', explanation: '在 CSS 的 content 属性中，需使用反斜杠 `\\` 加上十六进制的 Unicode 值，例如 `content: "\\e601";`。' },
  { type: 'single', title: '图标字体文件（如 .ttf、.woff）一般通过哪个 CSS 规则引入？', options: ['A. @import', 'B. @font-face', 'C. @media', 'D. @charset'], answer: 'B', explanation: '@font-face 规则用于引入自定义字体，使得浏览器可以下载并渲染它们。' },
  { type: 'single', title: '在移动端开发中，使用字体图标可以有效解决什么问题？', options: ['A. 屏幕适配与视网膜屏幕(Retina)的模糊问题', 'B. 脚本加载过慢的问题', 'C. HTML 结构嵌套过深的问题', 'D. 浏览器内存泄漏问题'], answer: 'A', explanation: '由于字体图标是矢量图，在高清屏幕（如 Retina 显示屏）下放大不会失真，能很好解决图片模糊的问题。' },
  { type: 'single', title: '阿里巴巴矢量图标库（Iconfont）支持的三种引用方式中，哪一种支持多色图标？', options: ['A. Unicode', 'B. Font class', 'C. Symbol (SVG)', 'D. Base64'], answer: 'C', explanation: 'Symbol 引用方式通过 SVG 实现，支持多色图标，而 Unicode 和 Font class 主要是基于传统的字体渲染，不支持多色。' },
  { type: 'single', title: '在 Symbol (SVG) 方式使用图标时，通常使用哪个 HTML 标签结合 `<use>` 标签？', options: ['A. <svg>', 'B. <canvas>', 'C. <i>', 'D. <span>'], answer: 'A', explanation: '通常在 `<svg>` 标签内嵌套 `<use xlink:href="#icon-name"></use>` 来引用 SVG 图标。' },
  { type: 'single', title: '对于使用 Font class 方式引用的字体图标，要修改其大小，应该修改哪个 CSS 属性？', options: ['A. width 和 height', 'B. background-size', 'C. font-size', 'D. transform: scale()'], answer: 'C', explanation: '因为基于字体渲染，所以使用 font-size 调整其大小最为直接和标准。' },
  { type: 'single', title: '在使用 @font-face 时，src 属性中 format("woff") 的作用是？', options: ['A. 指定图标颜色', 'B. 提示浏览器字体文件的格式以帮助其决定是否下载', 'C. 定义字体的粗细', 'D. 指定字体的版权信息'], answer: 'B', explanation: 'format 提示让浏览器在下载前就知道字体类型，如果浏览器不支持该格式，就可以跳过下载，节省带宽。' },
  { type: 'single', title: '为什么常常建议把字体图标定义在 i 标签或者 span 标签中？', options: ['A. 它们是块级元素', 'B. 它们语义较弱，且默认是内联元素，方便与文字排版', 'C. 只有这两种标签支持伪元素', 'D. 性能更好'], answer: 'B', explanation: 'i (icon) 和 span 通常作为内联元素使用，不会独占一行，且语义化上比较适合用来承载非文本内容的图标。' },
  { type: 'single', title: '使用 SVG symbol 相比于传统的字体图标（Font-face），优点不包括？', options: ['A. 支持多色', 'B. 支持复杂动画', 'C. 兼容 IE8 及以下浏览器', 'D. 语义和可访问性更好'], answer: 'C', explanation: 'SVG 的老旧浏览器（如 IE8）兼容性不如传统的基于 Font-face 的字体图标。' },
  { type: 'single', title: '如果要为字体图标添加投影效果，应该使用哪个 CSS 属性？', options: ['A. box-shadow', 'B. text-shadow', 'C. drop-shadow', 'D. filter'], answer: 'B', explanation: '由于字体图标本质是文本，text-shadow 可以完美地为其添加文字阴影效果。' },
  { type: 'single', title: '在 Iconfont 平台中，若更新了项目中的图标，本地项目需要做什么操作？', options: ['A. 无需操作，自动更新', 'B. 重新下载字体文件或更新在线链接，并替换旧文件/链接', 'C. 修改 HTML 结构', 'D. 重启服务器'], answer: 'B', explanation: '图标项目更新后，会生成新的字体文件或在线 CDN 链接，必须在项目中替换更新后的资源才能生效。' },
  { type: 'single', title: '使用 font-weight 可以改变字体图标的粗细吗？', options: ['A. 所有的字体图标都可以通过 font-weight 自由变粗', 'B. 取决于字体图标文件是否包含了不同粗细的字形（通常不支持）', 'C. 可以，但仅限变细', 'D. 可以，使用 text-stroke 效果更好'], answer: 'B', explanation: '字体图标的字形是在设计时固定的，通常一个字体图标文件只有一种粗细，强行使用 font-weight 并不总是生效或效果很差（某些字体族提供了多种粗细文件例外）。' },
  { type: 'single', title: '在引入外部字体文件时，跨域问题（CORS）通常会导致什么现象？', options: ['A. 字体图标变小', 'B. 字体图标变成乱码或无法显示，浏览器控制台报错', 'C. 字体图标颜色错乱', 'D. 页面加载卡死'], answer: 'B', explanation: '字体文件受到同源策略限制，如果没有配置跨域请求头，浏览器会拒绝加载，导致图标无法显示并报错。' },
  { type: 'code', title: '请使用 CSS 的 @font-face 规则定义一个名为 "my-iconfont" 的字体，其 woff2 格式文件路径为 "./fonts/iconfont.woff2"。', options: [], answer: '@font-face {\n  font-family: "my-iconfont";\n  src: url("./fonts/iconfont.woff2") format("woff2");\n}', explanation: '@font-face 必须包含 font-family 声明名称，并通过 src 和 url 指定路径，使用 format 提示格式。' },
  { type: 'code', title: '假设定义了 "my-iconfont" 字体，请编写 CSS，使得类名为 "icon-home" 的元素的 `::before` 伪元素渲染 Unicode 编码为 "\\e601" 的图标。', options: [], answer: '.icon-home::before {\n  font-family: "my-iconfont";\n  content: "\\e601";\n}', explanation: '在伪元素中插入字体图标需要设置 content 为相应的 Unicode 编码（CSS 中用反斜杠转义），同时声明正确的 font-family。' },
  { type: 'code', title: '在 HTML 中，如何使用一个类名为 "iconfont icon-user" 的 `<span>` 标签，并且为了良好的可访问性（Accessibility），让屏幕阅读器忽略该图标元素？（提示：使用 aria 属性）', options: [], answer: '<span class="iconfont icon-user" aria-hidden="true"></span>', explanation: '添加 aria-hidden="true" 属性可以告诉屏幕阅读器忽略该纯装饰性的元素。' },
  { type: 'code', title: '请编写一段 CSS，使所有的类名包含 "icon-" 的字体图标元素，默认大小为 24px，颜色为红色（#ff0000），并且有一个垂直向下的 2px 灰色投影（#ccc）。', options: [], answer: '[class*="icon-"] {\n  font-size: 24px;\n  color: #ff0000;\n  text-shadow: 0 2px 0 #ccc;\n}', explanation: '使用属性选择器 [class*="icon-"] 匹配类名，font-size 调整大小，color 调整颜色，text-shadow 调整阴影。' },
  { type: 'code', title: '使用 SVG Symbol 的方式在页面中插入一个 id 为 "icon-search" 的图标，要求宽度和高度均为 1em，且填充颜色（fill）跟随父元素的文字颜色。', options: [], answer: '<svg style="width: 1em; height: 1em; fill: currentColor;" aria-hidden="true">\n  <use xlink:href="#icon-search"></use>\n</svg>', explanation: 'SVG Symbol 使用 `<svg>` 和 `<use xlink:href="#id">` 的组合，`fill: currentColor;` 实现了颜色继承，宽度高度设为 1em 与文字排版一致。' }
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
    console.log('Success');
  } catch (error) { console.error(error); } finally { await connection.end(); }
}
run();
