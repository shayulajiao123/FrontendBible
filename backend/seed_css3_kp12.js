import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '文档流',
  content: `### 文档流\n\n**1. 正常文档流**\n将窗体自上而下分成一行行，并在每行中按从左至右的顺序排放元素。\n\n**2. 脱离文档流**\n元素脱离正常排版，不占据原来的空间。\n触发脱离文档流的三种方式：\n* 浮动 (float)\n* 绝对定位 (position: absolute)\n* 固定定位 (position: fixed)`
};

const questions = [
  { type: 'single', title: '关于CSS正常文档流（Normal Flow），下列说法错误的是？', options: ['A. 正常文档流中，块级元素自上而下排列，每个元素独占一行。', 'B. 正常文档流中，行内元素自左向右排列，直到一行排满后换行。', 'C. 通过设置 `position: relative` 会使元素脱离正常文档流。', 'D. 浮动（float）和绝对定位（absolute）会使元素脱离正常文档流。'], answer: 'C', explanation: '相对定位（relative）不会使元素脱离文档流，它仍然占据原本的空间，只是在视觉上发生了偏移。' },
  { type: 'single', title: '以下哪种CSS属性值不会导致元素脱离文档流？', options: ['A. position: absolute', 'B. float: left', 'C. position: fixed', 'D. transform: translate(10px, 10px)'], answer: 'D', explanation: 'transform 只是视觉上的变换，不会改变元素在文档流中的原始位置，也不会脱离文档流。' },
  { type: 'single', title: '脱离文档流的元素在计算父元素高度时会产生什么影响？', options: ['A. 依然会被计算在内', 'B. 完全不会被计算在内，可能导致父元素高度塌陷', 'C. 只有浮动元素会导致高度塌陷，绝对定位不会', 'D. 只有绝对定位会导致高度塌陷，浮动元素不会'], answer: 'B', explanation: '脱离文档流的元素不再占据原本的空间，因此在默认情况下，父元素在计算高度时不会包含它们，这会导致父元素高度塌陷。' },
  { type: 'single', title: 'BFC（块级格式化上下文）可以解决由哪种脱离文档流方式引起的高度塌陷问题？', options: ['A. position: absolute', 'B. position: fixed', 'C. float', 'D. 都可以'], answer: 'C', explanation: '触发BFC的元素可以包含浮动元素，从而解决由浮动引起的高度塌陷问题。对于absolute和fixed引起的塌陷，BFC无法解决。' },
  { type: 'single', title: '设置了 `float: left` 的元素脱离文档流后，其表现特征是？', options: ['A. 它会覆盖在后续的正常文档流元素之上', 'B. 后续的块级元素会无视它占据原来的位置，但后续的内联元素会环绕它', 'C. 它会被后续的正常文档流元素覆盖', 'D. 后续的元素无论是块级还是内联，都会自动避开它'], answer: 'B', explanation: '浮动元素脱离文档流，后续的块级元素会如同它不存在一样排布，但内联内容（如文字）会感知到浮动元素并环绕它。' },
  { type: 'single', title: '绝对定位（absolute）元素脱离文档流后，其定位基准是？', options: ['A. 始终是浏览器视口', 'B. 距离它最近的块级祖先元素', 'C. 距离它最近的非 static 定位的祖先元素', 'D. 始终是包含块（通常是 html 元素）'], answer: 'C', explanation: '绝对定位元素相对于最近的非 static（即 relative、absolute、fixed 或 sticky）定位的祖先元素进行定位。' },
  { type: 'single', title: '一个内联元素（如 `<span>`）设置了 `position: absolute` 后，其 display 属性的计算值会变成？', options: ['A. inline', 'B. block', 'C. inline-block', 'D. none'], answer: 'B', explanation: '当元素脱离文档流（通过 absolute 或 float）后，如果原先是内联元素，其 display 计算值会变为 block（严格来说是被块级化）。' },
  { type: 'single', title: '对于脱离文档流的元素，margin 的折叠现象（Margin Collapsing）还会发生吗？', options: ['A. 会', 'B. 不会', 'C. 视情况而定', 'D. 仅在两个脱离文档流的元素之间发生'], answer: 'B', explanation: '脱离文档流的元素（如浮动元素、绝对定位元素）不会与其父元素或相邻元素发生 margin 折叠。' },
  { type: 'single', title: '当使用 `position: fixed` 时，元素脱离文档流，它的包含块是？', options: ['A. 距离最近的定位祖先元素', 'B. `<body>` 元素', 'C. 浏览器视口（Viewport）', 'D. `<html>` 元素'], answer: 'C', explanation: '固定定位的元素默认相对于浏览器视口进行定位（除非祖先元素有 transform、perspective 或 filter 属性）。' },
  { type: 'single', title: '以下哪种情况会导致 `position: fixed` 元素相对于祖先元素而不是视口定位？', options: ['A. 祖先元素的 overflow 设为 hidden', 'B. 祖先元素的 z-index 不为 auto', 'C. 祖先元素的 transform 属性不为 none', 'D. 祖先元素的 display 为 flex'], answer: 'C', explanation: '当祖先元素的 transform, perspective, 或 filter 属性非 none 时，该祖先会成为 fixed 定位元素的包含块。' },
  { type: 'single', title: '浮动元素脱离文档流，但依然会影响？', options: ['A. 父元素的背景', 'B. 兄弟块级元素的 margin', 'C. 兄弟块级元素内的文本（Line boxes）', 'D. 绝对定位兄弟元素的位置'], answer: 'C', explanation: '浮动元素虽然脱离了常规的块级排布流，但文本流（Line boxes）会为其让出空间，产生环绕效果。' },
  { type: 'single', title: '如何清除浮动带来的文档流影响？', options: ['A. 为后续元素设置 `clear: both`', 'B. 为父元素设置 `overflow: hidden`', 'C. 使用伪元素 `::after` 清除', 'D. 以上皆可'], answer: 'D', explanation: '这三种方法都可以消除浮动元素带来的影响。B和C都是常用的清除浮动方法。' },
  { type: 'single', title: '在正常文档流中，如果两个相邻的块级元素的垂直 margin 发生折叠，最终的 margin 值是？', options: ['A. 两个 margin 值之和', 'B. 两个 margin 值中的较大者', 'C. 两个 margin 值中的较小者', 'D. 第一个元素的 margin 值'], answer: 'B', explanation: '正常文档流中，垂直相邻块级元素的 margin 会发生折叠，折叠后的边距为两者中较大的那一个。' },
  { type: 'single', title: '绝对定位脱离文档流后，如果不设置 top/right/bottom/left 属性，元素会出现在哪里？', options: ['A. 屏幕左上角', 'B. 父元素左上角', 'C. 保持在它原本在正常文档流中应该出现的位置', 'D. 随机位置'], answer: 'C', explanation: '绝对定位元素如果不设置 TRBL，它会呆在如果不脱离文档流时本来该呆的地方，但不再占据空间。' },
  { type: 'single', title: '关于 z-index，下列说法错误的是？', options: ['A. 它只对定位元素（即 position 不为 static）有效', 'B. 脱离文档流的元素如果不设 z-index，其层叠等级可能高于普通流中的块级元素', 'C. 父元素的 z-index 较低时，子元素的 z-index 再高也无法超过父元素的同级较高 z-index 元素', 'D. 脱离文档流的元素自动获得最高 z-index'], answer: 'D', explanation: '脱离文档流并不意味着 z-index 就是最高，z-index 是由层叠上下文决定的。' },
  { type: 'single', title: '脱离文档流的块级元素，如果未设置 width，其默认宽度是？', options: ['A. 100%', 'B. 由内容撑开 (fit-content)', 'C. 0', 'D. 等同于包含块的宽度'], answer: 'B', explanation: '在脱离文档流（绝对定位或浮动）后，块级元素会变成 "shrink-to-fit"，宽度由内容决定。' },
  { type: 'single', title: '哪种布局方式可以看作是完全替代了传统的浮动和定位来控制页面主体结构的现代方案？', options: ['A. Flexbox 和 Grid', 'B. Table 布局', 'C. Inline-block 布局', 'D. Multi-column 布局'], answer: 'A', explanation: 'Flexbox 和 Grid 是现代 CSS 中用于处理复杂页面结构的主力方案，它们内部的元素依然在某种意义上的流内，但拥有更强的排列控制能力。' },
  { type: 'single', title: '包含块（Containing Block）的概念对于理解文档流很重要。对于 `position: absolute`，如果所有祖先元素都是 static，包含块是？', options: ['A. `<body>`', 'B. `<html>`', 'C. 初始包含块（通常具有视口的尺寸）', 'D. 父元素'], answer: 'C', explanation: '如果没有定位祖先，absolute 元素的包含块是初始包含块（Initial Containing Block）。' },
  { type: 'single', title: '`position: sticky` 元素在滚动过程中的行为与文档流的关系是？', options: ['A. 始终脱离文档流', 'B. 始终在文档流中', 'C. 达到阈值前在文档流中，达到阈值后表现得像 fixed 定位，但依然保留在文档流中的空间', 'D. 达到阈值前在文档流中，达到阈值后脱离文档流'], answer: 'C', explanation: 'sticky 定位元素在跨越特定阈值前表现为 relative（在文档流中），跨越后类似 fixed（视觉上固定），但在正常流中仍占据原来的空间，不会导致其他元素重排。' },
  { type: 'single', title: '下列哪个属性会导致元素建立新的层叠上下文（Stacking Context），这与脱离文档流的元素层叠顺序息息相关？', options: ['A. opacity 小于 1', 'B. transform 不为 none', 'C. z-index 不为 auto 的绝对定位元素', 'D. 以上都是'], answer: 'D', explanation: '这三种情况都会创建新的层叠上下文，影响 z-index 的作用域和渲染顺序。' },
  { type: 'code', title: '父元素包含一个 `float: left` 的子元素，导致父元素高度为 0。请写出使用 `::after` 伪元素清除浮动的经典 CSS 代码。', options: [], answer: '.clearfix::after {\\n  content: "";\\n  display: table;\\n  clear: both;\\n}', explanation: '这是经典的 clearfix 微型实现，利用伪元素和 clear: both 来撑开父元素。' },
  { type: 'code', title: '假设一个 `div` 的 `id="box"`，请写出将其完全脱离文档流，并相对于视口居中显示的 CSS 代码（已知宽高均为 100px）。', options: [], answer: '#box {\\n  position: fixed;\\n  top: 50%;\\n  left: 50%;\\n  margin-top: -50px;\\n  margin-left: -50px;\\n}', explanation: '使用 position: fixed 相对于视口定位，通过 top: 50%; left: 50% 移至中心，再用负 margin 或 transform: translate(-50%, -50%) 回退一半自身尺寸以达到完全居中。' },
  { type: 'code', title: '写出一段 CSS，使一个原本在正常文档流中的 `span` 元素脱离文档流并能够设置宽度和高度。', options: [], answer: 'span {\\n  position: absolute; /* 或 float: left/right */\\n  width: 100px;\\n  height: 100px;\\n}', explanation: '给内联元素设置 position: absolute 或 float 会使其 display 计算值变为 block，从而可以设置宽高。' },
  { type: 'code', title: '写出两行核心 CSS 代码，使一个绝对定位的子元素相对于它的父元素进行定位，而不是浏览器视口。', options: [], answer: '/* 父元素 */\\nposition: relative;\\n/* 子元素 */\\nposition: absolute;', explanation: '必须为父元素设置非 static 的定位（如 relative），这样绝对定位的子元素才会以它为包含块。' },
  { type: 'code', title: '使用 flex 布局（不需要脱离文档流的方法）实现一个子元素在父元素中水平垂直居中，请写出父元素的 CSS 样式。', options: [], answer: 'display: flex;\\njustify-content: center;\\nalign-items: center;', explanation: 'Flexbox 是现代 CSS 居中的首选方案，它在正常文档流的框架内（块级/内联格式化上下文内的新格式化上下文）优雅地解决了居中问题，无需脱离文档流。' }
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
