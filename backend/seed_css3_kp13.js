import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '浮动',
  content: `### 浮动\n\n**float属性**\n使元素向左或向右移动，其周围的元素也会重新排列。\n\`float: left | right | none\`\n\n浮动元素的特性：\n1. 浮动元素会脱离文档流，不再占据原来的空间。\n2. 浮动元素会相互贴靠。\n3. 浮动元素具有行内块元素的特性（可设置宽高）。\n\n最常用于：文字环绕图片、多列布局。`
};

const questions = [
  { type: 'single', title: '关于CSS float属性，以下说法正确的是？', options: ['A. 浮动元素不会脱离标准文档流', 'B. 浮动元素默认宽度为其父元素的100%', 'C. 任何元素设置浮动后，都可以设置宽度和高度', 'D. 浮动主要用于垂直居中对齐'], answer: 'C', explanation: '元素设置浮动后，会具有行内块元素的特性，因此无论原先是行内元素还是块级元素，都可以设置宽高。' },
  { type: 'single', title: '当父元素内部所有子元素都浮动时，如果不清除浮动，会发生什么现象？', options: ['A. 父元素高度变为0（高度塌陷）', 'B. 父元素宽度变为0', 'C. 子元素会自动换行显示', 'D. 子元素的外边距会合并'], answer: 'A', explanation: '子元素全部浮动会脱离标准流，导致父元素内部没有内容撑开高度，从而发生高度塌陷现象。' },
  { type: 'single', title: '在CSS中，用于清除浮动的属性是？', options: ['A. clear', 'B. float-clear', 'C. display', 'D. overflow'], answer: 'A', explanation: 'clear属性用于清除浮动，常用值有left、right和both。' },
  { type: 'single', title: '以下哪种方法不属于清除浮动的常用方案？', options: ['A. 在浮动元素末尾添加空div并设置clear:both', 'B. 给父元素设置overflow:hidden（触发BFC）', 'C. 使用after伪元素清除浮动', 'D. 给父元素设置margin: 0 auto'], answer: 'D', explanation: '设置margin: 0 auto用于水平居中，并不能清除浮动或解决高度塌陷。' },
  { type: 'single', title: '以下关于BFC（块级格式化上下文）与浮动的关系，说法错误的是？', options: ['A. BFC可以包含浮动元素，防止高度塌陷', 'B. BFC区域不会与浮动元素的盒子重叠', 'C. 所有的浮动元素都会自动触发父元素的BFC', 'D. 设置float:left/right的元素自身就是一个BFC'], answer: 'C', explanation: '浮动元素本身会形成BFC，但并不会自动触发其父元素的BFC，除非父元素设置了如overflow:hidden等触发BFC的属性。' },
  { type: 'single', title: '两个相邻的左浮动元素，如果父元素宽度不够容纳它们，会发生什么？', options: ['A. 两个元素会重叠', 'B. 第二个元素会被挤到下一行', 'C. 第一个元素会被挤到下一行', 'D. 两个元素的宽度会自动缩小以适应父元素'], answer: 'B', explanation: '浮动元素会尽力向左或向右靠拢，当父级宽度不够时，后面的浮动元素会被挤到下一行显示。' },
  { type: 'single', title: '行内元素设置 float: left 后，其 display 属性的计算值会变成？', options: ['A. inline', 'B. block', 'C. inline-block', 'D. flex'], answer: 'B', explanation: '设置浮动后，元素的 display 计算值通常会变成 block（对于 inline 或 inline-block 元素）。但在实际表现上类似 inline-block（包裹性）。' },
  { type: 'single', title: '关于 clear: both 的作用原理，描述最准确的是？', options: ['A. 删除该元素周围的浮动元素', 'B. 强制该元素不与其他浮动元素在同一行', 'C. 为该元素添加足够的顶部外边距(margin-top)，使其位置低于前面所有的浮动元素', 'D. 隐藏页面上的所有浮动元素'], answer: 'C', explanation: 'clear: both 的原理是通过增加元素的 clearance（清除区域），相当于在元素上方增加了足够的空白，使其排列在浮动元素下方。' },
  { type: 'single', title: '关于“文字环绕图片”效果，最佳的CSS实现方式是？', options: ['A. 使用绝对定位', 'B. 使用Flexbox', 'C. 给图片设置 float: left 或 right', 'D. 使用Grid布局'], answer: 'C', explanation: '浮动最初被设计出来的目的就是为了实现文字环绕图片的排版效果。' },
  { type: 'single', title: '伪元素清除浮动的标准写法中，必须设置哪个属性以保证伪元素不影响布局？', options: ['A. visibility: hidden', 'B. display: block', 'C. content: ""', 'D. 以上都是'], answer: 'D', explanation: '标准的 clearfix 需要 content:"", display:block (或 table), clear:both，有时加上 height:0, visibility:hidden 保证完全不可见。' },
  { type: 'single', title: '绝对定位（absolute）和浮动（float）同时应用在一个元素上时，会发生什么？', options: ['A. 两者都会生效', 'B. 浮动会失效，元素按照绝对定位显示', 'C. 绝对定位会失效，元素按照浮动显示', 'D. 浏览器会忽略这两种属性'], answer: 'B', explanation: '当元素同时设置 absolute/fixed 定位和 float 时，float 会被计算为 none，绝对定位优先。' },
  { type: 'single', title: '以下哪个属性值不会触发元素的BFC（以清除内部浮动）？', options: ['A. overflow: hidden', 'B. display: inline-block', 'C. position: absolute', 'D. display: inline'], answer: 'D', explanation: 'display: inline 属于普通行内元素，不会触发BFC。' },
  { type: 'single', title: '如果一个没有设置宽度的div包含了浮动元素，并且本身触发了BFC，这个div的宽度表现是？', options: ['A. 宽度塌陷为0', 'B. 宽度自动收缩包裹浮动元素（类似于行内块）', 'C. 宽度保持为父元素的100%', 'D. 宽度变为视口的100%'], answer: 'C', explanation: '块级元素触发BFC并不改变其作为块级元素默认占满父级宽度（100%）的特性（除非是float、inline-block或absolute等自带包裹性的属性触发的BFC）。' },
  { type: 'single', title: '浮动元素的margin collapsing（外边距合并）现象如何表现？', options: ['A. 浮动元素与相邻元素的外边距会合并', 'B. 浮动元素与父元素的外边距会合并', 'C. 浮动元素不会发生外边距合并', 'D. 只有垂直方向的外边距会合并'], answer: 'C', explanation: '浮动元素、绝对定位元素和触发了BFC的元素都不会与它们的兄弟元素或父子元素发生外边距合并（margin collapsing）。' },
  { type: 'single', title: '一个元素设置了 float: right，如果在它前面有一个没有浮动的块级元素，这个浮动元素的位置是？', options: ['A. 在未浮动块级元素的左侧', 'B. 在未浮动块级元素的同一行右侧', 'C. 在未浮动块级元素的下方右侧', 'D. 覆盖在未浮动块级元素上方'], answer: 'C', explanation: '浮动元素无法跨越其前面的普通流块级元素，因此它会在未浮动块级元素的下一行进行向右浮动。' },
  { type: 'single', title: '浮动带来的“包裹性（shrink-to-fit）”指的是什么？', options: ['A. 元素高度自动包裹内容', 'B. 未显式设置宽度时，元素宽度由其内容决定', 'C. 元素会自动包裹周围的其他浮动元素', 'D. 元素的边框会自动贴合内容'], answer: 'B', explanation: '包裹性是指如果没有设置宽度，浮动元素的宽度会收缩到刚好能包裹住其内容的最小宽度。' },
  { type: 'single', title: '以下关于 clearfix 类的实现，最简洁现代的写法核心是？', options: ['A. .clearfix::after { content: ""; display: block; clear: both; }', 'B. .clearfix { overflow: scroll; }', 'C. .clearfix::before { clear: both; }', 'D. .clearfix { float: none; }'], answer: 'A', explanation: '这是目前最常用和推荐的 micro clearfix hack 写法，利用 ::after 伪元素在容器末尾插入一个块级元素来清除浮动。' },
  { type: 'single', title: '当有多个左浮动的元素在一行显示时，如果它们的高度不一致，可能会导致什么布局问题？', options: ['A. 高度塌陷', 'B. 外边距合并', 'C. 浮动卡住（后面的元素被前面较高的元素挡住）', 'D. 元素重叠'], answer: 'C', explanation: '当换行时，如果上一行有元素比其他元素高，新一行的浮动元素可能会卡在较高元素的下方，无法浮动到最左边缘。' },
  { type: 'single', title: '要让一个块级元素完全不被前面的浮动元素影响（不环绕），除了 clear 之外还能怎么做？', options: ['A. 设置 margin-top', 'B. 设置 padding-top', 'C. 触发该元素的BFC（如设置 overflow: hidden）', 'D. 设置 z-index'], answer: 'C', explanation: 'BFC 的特性之一是 BFC 区域不会与 float box 重叠，因此触发BFC可以阻止文本环绕并让元素独占空间。' },
  { type: 'single', title: '在现代Web开发中，对于常规的页面整体网格布局，推荐使用什么替代浮动布局？', options: ['A. 绝对定位', 'B. Table布局', 'C. Flexbox或CSS Grid', 'D. Inline-block布局'], answer: 'C', explanation: 'Flexbox和CSS Grid是专门为布局设计的现代CSS特性，比浮动（原本为图文混排设计）更加灵活和可控。' },
  { type: 'code', title: '请手写一个标准的清除浮动的 clearfix 类（现代写法）。', options: [], answer: '.clearfix::after {\n  content: "";\n  display: table;\n  clear: both;\n}', explanation: '标准的 clearfix 通常使用 ::after 伪元素，设置 content为空字符串，display 为 table 或 block，并设置 clear:both。使用 table 还可以顺便防止子元素的 margin-top 塌陷。' },
  { type: 'code', title: '有两个div，类名分别为 left 和 right。使用float实现一个两列布局，左侧固定宽200px并左浮动，右侧自适应占据剩余空间（使用BFC）。请写出CSS。', options: [], answer: '.left {\n  float: left;\n  width: 200px;\n}\n.right {\n  overflow: hidden;\n}', explanation: '左侧浮动并固定宽度，右侧通过设置 overflow: hidden 触发 BFC。由于 BFC 区域不会与浮动元素重叠，右侧会自动占据剩余空间，这是经典的自适应两列布局方案之一。' },
  { type: 'code', title: '现有HTML结构：<div class="box"><img class="img" src="1.jpg"><p>Text</p></div>。请编写CSS，使图片向右浮动，文字在左侧环绕图片。', options: [], answer: '.img {\n  float: right;\n  margin-left: 10px;\n}', explanation: '给图片设置 float: right 即可实现图片右浮动、文字左侧环绕的效果。通常还需要添加一定的 margin 来分隔文字和图片。' },
  { type: 'code', title: '如何通过CSS让一个未设置宽度的浮动元素居中显示（使用相对定位技巧）？', options: [], answer: '.float-container {\n  float: left;\n  position: relative;\n  left: 50%;\n}\n.float-content {\n  position: relative;\n  right: 50%;\n}', explanation: '这是一种经典的浮动居中黑魔法：外层容器左浮动并相对定位向右偏移50%，内层内容也相对定位向左偏移50%，从而实现整体居中。' },
  { type: 'code', title: '请写出一个触发元素BFC的最常见的三种CSS属性及值的组合。', options: [], answer: '1. overflow: hidden; (或 auto, scroll)\n2. position: absolute; (或 fixed)\n3. display: flex; (或 inline-block, grid)', explanation: '触发BFC的常见方式包括改变overflow的默认值、设置绝对定位、浮动元素本身、以及使用特定的display值。' }
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
