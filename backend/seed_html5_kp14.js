import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第一章：HTML5',
  knowledge_point: '块元素与行内元素（内联元素）',
  content: `### 块元素与行内元素（内联元素）\n\nHTML 元素在显示时主要分为两类：块级元素和行内元素。\n\n**1. 块级元素 (Block-level Elements)**\n* 独占一行，从上到下排列。\n* 可以设置宽度(width)、高度(height)、内边距(padding)和外边距(margin)。\n* 常见块级元素：<div>, <p>, <h1>-<h6>, <ul>, <ol>, <li>, <table> 等。\n\n**2. 行内元素 (Inline Elements)**\n* 不会独占一行，横向排列，直到一行排满才会换行。\n* 不能设置宽度和高度（宽高由内容撑开）。\n* 常见行内元素：<span>, <a>, <strong>, <em>, <img> (img 属于行内替换元素，特殊地可以设置宽高) 等。\n\n**注意**：块级元素内部可以嵌套行内元素，但大多数行内元素内部不允许嵌套块级元素（<a> 标签在 HTML5 中除外）。`
};

const questions = [
  { type: 'single', title: '以下哪个元素是块级元素？', options: ['A. <span>', 'B. <div>', 'C. <a>', 'D. <strong>'], answer: 'B', explanation: '<div> 是典型的块级元素，独占一行。<span>, <a>, <strong> 都是行内元素。' },
  { type: 'single', title: '行内元素的特点是什么？', options: ['A. 独占一行', 'B. 可以随意设置宽度和高度', 'C. 横向排列，直到排满一行才会换行', 'D. 默认带有较大的外边距'], answer: 'C', explanation: '行内元素的特点是不会独占一行，横向排列直到排满才会换行，且不能随意设置宽度和高度。' },
  { type: 'single', title: '以下哪个元素是行内元素？', options: ['A. <p>', 'B. <h1>', 'C. <ul>', 'D. <em>'], answer: 'D', explanation: '<em> 是强调文本的行内元素，而 <p>, <h1>, <ul> 都是块级元素。' },
  { type: 'single', title: '块级元素的默认宽度是多少？', options: ['A. 内容的宽度', 'B. 0', 'C. 父元素的 100%', 'D. 父元素的 50%'], answer: 'C', explanation: '块级元素如果不手动设置宽度，其默认宽度会自动撑满父元素的可用内容区宽度（即 100%）。' },
  { type: 'single', title: '行内元素的默认宽度和高度由什么决定？', options: ['A. 浏览器默认样式中的固定值', 'B. 由其内部的内容撑开', 'C. 由其父元素决定', 'D. 无法确定'], answer: 'B', explanation: '行内元素默认不能设置宽高，它的宽高完全由它所包含的文本或内部行内元素的尺寸撑开。' },
  { type: 'single', title: '是否可以给普通的行内元素（如 span）设置 width 属性？', options: ['A. 可以，完全生效', 'B. 不可以，设置无效', 'C. 可以，但只在垂直方向生效', 'D. 可以，但只在旧版浏览器生效'], answer: 'B', explanation: '普通的行内元素（非替换元素）设置 width 和 height 属性是无效的。' },
  { type: 'single', title: '<img> 元素属于哪种类型的元素？', options: ['A. 块级元素', 'B. 普通行内元素', 'C. 行内替换元素', 'D. 块级替换元素'], answer: 'C', explanation: '<img> 属于行内替换元素，虽然不独占一行，但它可以设置 width 和 height。' },
  { type: 'single', title: '以下关于元素嵌套的说法正确的是？', options: ['A. 行内元素可以随意嵌套块级元素', 'B. 块级元素通常可以嵌套其他块级元素和行内元素', 'C. <a> 标签绝对不能嵌套块级元素', 'D. <p> 标签内部必须嵌套 <div>'], answer: 'B', explanation: '块级元素通常作为容器，可以嵌套其他块级或行内元素。行内元素通常不能嵌套块级元素（除了 HTML5 中的 <a> 在特定情况下）。<p> 标签内部不能嵌套 <div> 等块级元素。' },
  { type: 'single', title: '如何将一个行内元素转换为块级元素显示？', options: ['A. 设置 display: inline;', 'B. 设置 display: block;', 'C. 设置 display: none;', 'D. 设置 visibility: visible;'], answer: 'B', explanation: '通过 CSS 设置 display: block; 可以将行内元素转化为块级元素的显示行为。' },
  { type: 'single', title: '以下哪个属性对普通行内元素的垂直方向外边距（margin-top/bottom）设置表现特殊？', options: ['A. 会完全生效并挤开上下元素', 'B. 不会影响到其他元素的垂直布局', 'C. 会导致元素本身被隐藏', 'D. 会转化为水平方向的外边距'], answer: 'B', explanation: '对行内元素设置垂直外边距在视觉上可能会生效，但不会影响到其他行级框的垂直布局排版（即不会挤开上下行）。' },
  { type: 'single', title: '下列标签中，不属于块级元素的是？', options: ['A. <li>', 'B. <dt>', 'C. <dd>', 'D. <b>'], answer: 'D', explanation: '<b> 是用于文本加粗的行内元素。<li>, <dt>, <dd> 都是列表相关的块级元素。' },
  { type: 'single', title: '块级元素（在已知宽度的前提下）可以通过设置什么属性使其在父元素中水平居中？', options: ['A. margin: 0 auto;', 'B. text-align: center;', 'C. vertical-align: middle;', 'D. float: center;'], answer: 'A', explanation: '设置固定的 width，并使用 margin: 0 auto; 可以让块级元素在其父容器中水平居中。' },
  { type: 'single', title: '<a> 标签在 HTML5 中有什么特殊的嵌套规则？', options: ['A. 只能嵌套文本', 'B. 可以包裹整个块级元素区域（但不能包含其他交互元素）', 'C. 必须嵌套在 <div> 内部', 'D. 不能嵌套图片'], answer: 'B', explanation: '在 HTML5 中，<a> 标签可以包裹诸如 <div>, <p> 等块级元素，以实现大面积可点击区域，但它内部不能嵌套如按钮或其他 <a> 标签等交互性内容。' },
  { type: 'single', title: '当两个垂直相邻的常规块级元素相遇时，它们的外边距会发生什么现象？', options: ['A. 叠加', 'B. 折叠（Margin collapsing）', 'C. 完全抵消', 'D. 消失'], answer: 'B', explanation: '在常规文档流中，两个垂直相邻的块级元素的上下外边距会发生折叠现象，最终的外边距大小取两者中的较大值。' },
  { type: 'single', title: '行内元素设置上下内边距 (padding-top/padding-bottom) 会发生什么？', options: ['A. 影响周围元素的布局', 'B. 设置无效', 'C. 视觉上生效（可能覆盖其他内容），但不影响行高和文档流的垂直布局', 'D. 导致元素自动换行'], answer: 'C', explanation: '行内元素的垂直内边距在视觉上会显示背景和边框的变化，甚至可能覆盖上方或下方的文本，但不会撑开行高，也不会改变周围元素的垂直布局位置。' },
  { type: 'single', title: '下列关于行内元素的说法错误的是？', options: ['A. 默认和其他行内元素在同一行上', 'B. 宽度就是它包含的文字或图片的宽度', 'C. 可以随意设置宽高', 'D. 不推荐嵌套块级元素（除特殊情况外）'], answer: 'C', explanation: '行内元素（非替换元素）不能随意设置宽高。' },
  { type: 'single', title: '想要在一个块级元素内部水平居中所有的行内元素（如文本、图片等），应该给该块级元素设置什么属性？', options: ['A. text-align: center;', 'B. margin: 0 auto;', 'C. align-items: center;', 'D. justify-content: center;'], answer: 'A', explanation: 'text-align: center; 用于使其内部的行内级内容（如文本和行内元素）水平居中。' },
  { type: 'single', title: '以下哪个标签通常被用作纯粹的无语义行内容器？', options: ['A. <div>', 'B. <span>', 'C. <section>', 'D. <article>'], answer: 'B', explanation: '<span> 是没有具体语义的通用行内元素，常用于单独给一段文本或行内内容设置样式。' },
  { type: 'single', title: '怎样可以使一个块级元素与其他元素在同一行显示，并且能够设置宽高？', options: ['A. 设置 display: block;', 'B. 设置 display: inline-block;', 'C. 设置 display: inline;', 'D. 设置 visibility: hidden;'], answer: 'B', explanation: 'display: inline-block; 结合了块级和行内元素的特性：既能和其他元素在同一行，又能设置宽度和高度。' },
  { type: 'single', title: '<strong> 元素的主要作用是什么？', options: ['A. 加粗文本，属于块级元素', 'B. 强调文本，属于行内元素', 'C. 强制换行，属于块级元素', 'D. 插入强调图片，属于行内元素'], answer: 'B', explanation: '<strong> 用于表示重要性或强烈强调，它默认呈现加粗效果，并且是一个行内元素。' },
  { type: 'code', title: '请编写 CSS，将 HTML 中的 `<span>` 元素转换为块级元素显示。', options: [], answer: 'span { display: block; }', explanation: '使用 display: block; 可以将元素的显示类型更改为块级元素。' },
  { type: 'code', title: '请编写 CSS，使类名为 `.box` 的块级元素在其父容器中水平居中显示（假设已设置固定宽度 200px）。', options: [], answer: '.box { width: 200px; margin: 0 auto; }', explanation: '对于有固定宽度的块级元素，设置左右外边距为 auto 可以使其在水平方向居中。' },
  { type: 'code', title: '在一个 `<div>` 中有一段文本和一个 `<span>`，如何通过给 `<div>` 设置 CSS 属性，使得其内部的这些行内内容水平居中？', options: [], answer: 'div { text-align: center; }', explanation: '对块级容器设置 text-align: center; 可以让其内部的所有行内级别内容（文字、行内元素）水平居中。' },
  { type: 'code', title: '请编写 CSS，使一个 `<a>` 标签不仅不独占一行（与其他文本共处一行），而且还可以成功设置宽度为 100px 和高度为 30px。', options: [], answer: 'a { display: inline-block; width: 100px; height: 30px; }', explanation: '使用 display: inline-block; 能让元素保持行内元素的排列特性，同时具备块级元素的盒模型特性（可设宽高）。' },
  { type: 'code', title: '由于 `<p>` 标签内部不能嵌套块级元素，如果要在段落中强调某几个字（不换行显示），通常会使用哪个 HTML 标签将其包裹？', options: [], answer: '<span>', explanation: '<span> 或 <strong> 等行内元素常用于在段落文本中包裹特定的文字，以施加特定样式或语义，而不打断文档的正常流（不换行）。' }
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
    console.log(`Success KP14`);
  } catch (error) { 
    console.error(error); 
  } finally { 
    await connection.end(); 
  }
}
run();
