import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '清除浮动',
  content: `### 清除浮动\n\n浮动元素脱离文档流后，会导致父元素高度塌陷。必须清除浮动。\n\n**常用清除浮动的方法：**\n1. **额外标签法**：在浮动元素末尾添加一个空标签，设置 \`clear: both\`。\n2. **父级添加 overflow 属性**：将父级 \`overflow\` 设为 \`hidden\`、\`auto\` 等（触发 BFC）。\n3. **使用 ::after 伪元素** (最推荐)：\n\`\`\`css\n.clearfix::after {\n  content: "";\n  display: block;\n  clear: both;\n}\n\`\`\``
};

const questions = [
  { type: 'single', title: '关于浮动元素导致的父容器高度塌陷，以下说法最准确的是？', options: ['A. 浮动元素完全脱离了文档流，不再占据普通流中的空间，因此父容器在计算高度时不会将浮动元素包含在内。', 'B. 浮动元素只脱离了行内格式化上下文，不脱离块级格式化上下文。', 'C. 父容器高度塌陷是因为浮动元素的高度被浏览器默认为0。', 'D. 只要父容器设置了明确的高度，就不会发生高度塌陷，哪怕高度小于浮动元素的高度。'], answer: 'A', explanation: '浮动元素脱离普通文档流，父容器在未明确指定高度且没有其他非浮动子元素撑起高度的情况下，无法自动包含浮动元素的高度，导致高度塌陷。' },
  { type: 'single', title: '使用额外标签法清除浮动时，通常是在浮动元素末尾添加一个什么元素？', options: ['A. 带有 `float: none` 的内联元素', 'B. 带有 `clear: both` 的块级元素', 'C. 带有 `overflow: hidden` 的容器', 'D. 带有 `display: inline-block` 的元素'], answer: 'B', explanation: '额外标签法要求在最后一个浮动元素后添加一个空的块级标签（或将内联元素转换为块级），并设置 `clear: both`，以迫使其下移到浮动元素下方，从而撑开父容器。' },
  { type: 'single', title: '以下哪种 `overflow` 属性值不能触发BFC以清除浮动？', options: ['A. `hidden`', 'B. `auto`', 'C. `scroll`', 'D. `visible`'], answer: 'D', explanation: '`overflow: visible` 是默认值，不能触发块格式化上下文（BFC）。只有非 `visible` 的值（如 `hidden`, `auto`, `scroll`）才能触发BFC，进而包含浮动元素。' },
  { type: 'single', title: '在最经典的 `.clearfix::after` 伪元素清除浮动代码中，`content: ""` 的作用是？', options: ['A. 占据页面的实际空间以撑开高度。', 'B. 伪元素必须有 content 属性才能在 DOM 中生成对应的盒模型。', 'C. 消除伪元素默认的边距。', 'D. 触发 IE 的 hasLayout 机制。'], answer: 'B', explanation: 'CSS伪元素 `::before` 和 `::after` 必须设置 `content` 属性（即使为空字符串），否则它们不会被渲染生成。' },
  { type: 'single', title: '在使用单伪元素清除浮动时，为什么必须将伪元素的 display 设置为 block 或 table？', options: ['A. 因为 `clear` 属性只对块级盒模型（或类似块级的元素）有效。', 'B. 因为内联元素会自动被浮动元素覆盖。', 'C. 只有块级元素才能拥有高度。', 'D. 只有这样才能触发BFC。'], answer: 'A', explanation: '`clear` 属性主要用于块级排版上下文中。如果是内联元素，`clear` 属性不会产生预期的下移效果，因此伪元素需要设置为 `display: block` 或 `display: table`。' },
  { type: 'single', title: 'CSS3 引入的 `display: flow-root` 的主要作用之一是什么？', options: ['A. 创建一个新的行内格式化上下文。', 'B. 创建一个新的无副作用的块格式化上下文(BFC)，非常适合用来清除浮动。', 'C. 将元素转变为弹性容器。', 'D. 取代网格布局。'], answer: 'B', explanation: '`display: flow-root` 会创建一个新的块格式化上下文（BFC），且没有任何其他副作用（不像 `overflow: hidden` 可能会裁剪内容，或 `float` 会改变布局），是现代浏览器中最优雅的清除浮动方式。' },
  { type: 'single', title: '双伪元素清除浮动（Micro Clearfix）的 `.clearfix::before` 主要解决什么问题？', options: ['A. 清除左侧浮动。', 'B. 防止父子元素的顶端外边距（margin-top）发生折叠。', 'C. 兼容更低版本的 IE 浏览器。', 'D. 提供更好的性能。'], answer: 'B', explanation: '双伪元素方法中，`::before` 用于防止由于内部元素设置了 margin-top 导致的外边距折叠，而 `::after` 用于清除浮动撑开父元素高度。' },
  { type: 'single', title: '`clear: both` 的底层执行机制是？', options: ['A. 增加元素的内边距（padding-top），使其移动到浮动元素下方。', 'B. 自动在元素上方增加清除区域（clearance），强制元素的上外边距边界在其相关的浮动元素外边距边界的下方。', 'C. 将元素转换为 BFC 容器。', 'D. 将浮动元素的层叠级别降低。'], answer: 'B', explanation: '`clear` 属性的机制是引入“清除区域（clearance）”，增加元素的上部空间，使其盒子的顶部边缘低于之前所有的左/右浮动元素的底部边缘。' },
  { type: 'single', title: '为什么不推荐使用 `<br clear="all" />` 来清除浮动？', options: ['A. 因为它不能有效清除浮动。', 'B. 违反了结构与表现分离的原则，增加了无语义的 HTML 标签。', 'C. 会导致页面渲染速度变慢。', 'D. 现代浏览器不再支持此属性。'], answer: 'B', explanation: '添加没有实际语义的 HTML 标签仅仅是为了布局样式（清除浮动），严重违背了结构（HTML）与表现（CSS）分离的原则，导致代码难以维护。' },
  { type: 'single', title: '在旧版 IE (IE6/7) 中，清除浮动通常需要触发什么内部机制？', options: ['A. BFC (Block Formatting Context)', 'B. hasLayout', 'C. Stacking Context', 'D. IFC (Inline Formatting Context)'], answer: 'B', explanation: 'IE6/7 不支持 BFC，而是使用私有的 hasLayout 机制。通常通过设置 `zoom: 1` 或特定的宽度/高度来触发 hasLayout 从而闭合浮动。' },
  { type: 'single', title: '关于 BFC 清除浮动的原理，下列说法正确的是？', options: ['A. BFC 容器会自动将其内部的所有浮动元素转换为非浮动元素。', 'B. 计算 BFC 的高度时，浮动元素也参与计算。', 'C. BFC 容器会将浮动元素强制移动到容器底部。', 'D. BFC 会忽略其内部的块级格式化规则。'], answer: 'B', explanation: 'BFC 的一个重要特性是：计算 BFC 容器的高度时，其内部的浮动子元素的高度也会参与计算，从而解决了高度塌陷问题。' },
  { type: 'single', title: '如果一个父容器同时包含了左浮动和右浮动的子元素，为了使父容器完全包裹它们，应该如何设置伪元素？', options: ['A. 设置 `clear: left`', 'B. 设置 `clear: right`', 'C. 设置 `clear: both`', 'D. 两个伪元素分别设置 `clear: left` 和 `clear: right`'], answer: 'C', explanation: '`clear: both` 会确保元素的上边界位于所有左浮动和右浮动元素的下方，因此能一次性清除左右两侧的浮动影响。' },
  { type: 'single', title: '当使用 `overflow: hidden` 清除浮动时，可能带来的最大隐患是？', options: ['A. 影响内部元素的字体渲染。', 'B. 导致父容器失去响应式特性。', 'C. 如果内部存在绝对定位的元素或通过 margin 负值溢出容器的内容，会被无情裁剪，导致内容显示不全。', 'D. 改变内部子元素的层叠上下文。'], answer: 'C', explanation: '`overflow: hidden` 的副作用是会裁剪超出其盒子边界的内容，这在处理下拉菜单、工具提示或绝对定位溢出的设计时会导致致命的显示问题。' },
  { type: 'single', title: '以下哪种 CSS 属性声明无法隐式触发 BFC？', options: ['A. `position: absolute`', 'B. `float: left`', 'C. `display: inline-block`', 'D. `position: relative`'], answer: 'D', explanation: '相对定位 `position: relative` 不会创建 BFC，它仅仅是相对于元素在普通流中的位置进行偏移，且不脱离普通流。' },
  { type: 'single', title: '在双伪元素清除浮动代码中：`.clearfix::before, .clearfix::after { content: ""; display: table; } .clearfix::after { clear: both; }`，为什么使用 `display: table` 而不是 `display: block`？', options: ['A. 为了兼容表格布局。', 'B. `display: table` 本身会创建一个匿名的表格单元格，能有效阻止外边距折叠，同时满足 `clear` 属性的块级要求。', 'C. 渲染性能更好。', 'D. 能够让内部元素居中对齐。'], answer: 'B', explanation: '使用 `display: table` 可以在 `::before` 伪元素上防止子元素和父元素发生外边距折叠（margin collapse），同时在 `::after` 伪元素上作为块级元素响应 `clear: both`。' },
  { type: 'single', title: '如果不清除浮动，紧跟在浮动元素后面的同级非浮动块级元素会发生什么？', options: ['A. 会紧跟在浮动元素的正下方。', 'B. 会与浮动元素重叠，且其内容会围绕浮动元素排版。', 'C. 会被推到下一行。', 'D. 会自动变为浮动元素。'], answer: 'B', explanation: '后面的非浮动块级元素在布局时会无视浮动元素的存在而占据相同位置（导致背景重叠），但其内部的行内内容（如文字）会被浮动元素挤开，形成环绕效果。' },
  { type: 'single', title: '浮动起初被设计出来的目的是什么？', options: ['A. 为了实现复杂的网页网格布局。', 'B. 为了解决多列等高布局。', 'C. 为了实现文字环绕图片的效果。', 'D. 为了制作横向导航菜单。'], answer: 'C', explanation: 'CSS 浮动最初的设计初衷是为了实现像报纸排版那样的文字环绕图片的视觉效果。' },
  { type: 'single', title: '以下哪个属性可以用来取消元素自身的浮动状态？', options: ['A. `clear: none`', 'B. `float: none`', 'C. `display: block`', 'D. `position: static`'], answer: 'B', explanation: '要取消一个元素自身的浮动，需要将其 `float` 属性设置为默认值 `none`。`clear` 属性是用于处理其他浮动元素对当前元素的影响。' },
  { type: 'single', title: '`clear` 属性只能作用于哪种类型的元素？', options: ['A. 行内元素', 'B. 浮动元素本身', 'C. 块级元素（包括被转换为块级的伪元素）', 'D. 绝对定位元素'], answer: 'C', explanation: '`clear` 属性只对块级格式化上下文中的块级元素生效。对于行内元素，设置 `clear` 无效，除非修改其 `display` 属性。' },
  { type: 'single', title: '在 Vue/React 等单页应用中，首选的清除浮动方案是？', options: ['A. 在每个组件模板中手动添加 `<div style="clear:both"></div>`。', 'B. 使用 `overflow: auto`。', 'C. 在全局样式中定义 `.clearfix` 类，并在需要的父容器上应用。', 'D. 不再使用浮动，完全改用 Flexbox 或 Grid。'], answer: 'D', explanation: '在现代前端开发中，Flexbox 和 CSS Grid 提供了更强大且无需处理高度塌陷等副作用的布局机制，因此最专业的做法是尽量用它们替代 float 进行结构布局，float 仅用于文字环绕。但在必须使用 float 时，推荐方案 C 结合 `display: flow-root`。' },
  { type: 'code', title: '请编写 CSS 代码，实现最经典的单伪元素清除浮动类 `.clearfix`。', options: [], answer: '.clearfix::after {\n  content: "";\n  display: block;\n  clear: both;\n}', explanation: '这是目前最常用的清除浮动方法。通过伪元素 `::after` 在父级容器的最后生成一个内容为空的块级元素，并对其应用 `clear: both`，从而撑开父容器高度，不引入多余的 HTML 标签。' },
  { type: 'code', title: '请编写 CSS 代码，实现能够同时解决外边距折叠和清除浮动的双伪元素类 `.clearfix`。', options: [], answer: '.clearfix::before,\n.clearfix::after {\n  content: "";\n  display: table;\n}\n.clearfix::after {\n  clear: both;\n}', explanation: '`::before` 的 `display: table` 创建了匿名表格单元格，阻断了父子元素的 margin-top 折叠；`::after` 配合 `clear: both` 完成清除浮动，撑开父容器。' },
  { type: 'code', title: '请使用现代 CSS 属性，仅用一行核心代码为类 `.modern-clearfix` 实现无副作用的清除浮动（兼容较新浏览器）。', options: [], answer: '.modern-clearfix {\n  display: flow-root;\n}', explanation: '`display: flow-root` 是专门为创建新的 BFC 设计的属性值，它不仅能包含内部的浮动元素，而且不会像 `overflow: hidden` 那样带来裁剪内容的副作用，是现代布局的首选方案。' },
  { type: 'code', title: '使用额外标签法清除浮动。假设父级为 `<div class="parent">`，内部有两个左浮动的 `<div class="child float-left"></div>`。请写出包含清除浮动标签的完整 HTML 结构。', options: [], answer: '<div class="parent">\n  <div class="child float-left"></div>\n  <div class="child float-left"></div>\n  <div style="clear: both;"></div>\n</div>', explanation: '在所有浮动子元素的最后，添加一个空的块级标签（如 div），并设置内联样式 `clear: both`，强制它移动到浮动元素下方，从而把父容器撑开。' },
  { type: 'code', title: '请编写一段 CSS，使一个元素不仅能清除前面的左侧浮动，还能清除右侧浮动，并确保自身不浮动且作为块级元素显示，假设类名为 `.clear-element`。', options: [], answer: '.clear-element {\n  display: block;\n  float: none;\n  clear: both;\n}', explanation: '必须确保 `display` 为块级，且没有自身浮动（`float: none`），同时使用 `clear: both` 来确保其盒子的上边界位于上方任何左右浮动元素的下方。' }
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
