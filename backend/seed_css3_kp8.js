import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '表格属性',
  content: `### 表格属性\n\n使用 CSS 可以使 HTML 表格更美观。\n\n**1. 表格边框**\n指定 CSS 表格边框，使用 border 属性。\n\`table, td { border: 1px solid black; }\`\n\n**2. 折叠边框**\nborder-collapse 属性设置表格的边框是否被折叠成一个单一的边框。\n\`table { border-collapse: collapse; }\`\n\n**3. 宽高**\n\`width\` 和 \`height\` 定义宽度和高度。`
};

const questions = [
  { type: 'single', title: 'CSS中用于设置表格边框是否合并为单一边框的属性是？', options: ['A. border-spacing', 'B. border-collapse', 'C. empty-cells', 'D. table-layout'], answer: 'B', explanation: 'border-collapse 属性设置表格的边框是否被折叠成一个单一的边框或隔开。' },
  { type: 'single', title: 'border-collapse 属性的默认值是什么？', options: ['A. collapse', 'B. separate', 'C. inherit', 'D. initial'], answer: 'B', explanation: '默认值为 separate，即边框独立。' },
  { type: 'single', title: '当 border-collapse 设置为 separate 时，哪个属性可以用来设置相邻单元格边框之间的距离？', options: ['A. margin', 'B. padding', 'C. border-spacing', 'D. cell-spacing'], answer: 'C', explanation: 'border-spacing 属性在边框分离模式下，用于指定相邻单元格边框之间的距离。' },
  { type: 'single', title: '如果希望隐藏表格中没有内容的单元格边框，应该使用哪个属性？', options: ['A. visibility: hidden', 'B. display: none', 'C. empty-cells: hide', 'D. border: none'], answer: 'C', explanation: 'empty-cells: hide 用于隐藏分离边框模式下空单元格的边框。' },
  { type: 'single', title: 'caption-side 属性用于设置表格标题的位置，它的默认值是？', options: ['A. top', 'B. bottom', 'C. left', 'D. right'], answer: 'A', explanation: 'caption-side 的默认值是 top，即标题位于表格上方。' },
  { type: 'single', title: '使用 table-layout: fixed; 有什么主要作用？', options: ['A. 使表格宽度自适应内容', 'B. 提高表格的渲染速度', 'C. 固定表格的高度', 'D. 合并单元格边框'], answer: 'B', explanation: 'fixed 布局算法比自动布局算法快，因为它不依赖于单元格内容来确定列宽，渲染速度更快。' },
  { type: 'single', title: '在 table-layout: fixed; 模式下，列宽由什么决定？', options: ['A. 单元格内最宽的内容', 'B. 第一行单元格的宽度', 'C. 最后一行单元格的宽度', 'D. 浏览器的默认设置'], answer: 'B', explanation: '在固定表格布局中，列宽由表格宽度和列宽度（通常是第一行的宽度）设定，与单元格内容无关。' },
  { type: 'single', title: '如何通过CSS实现表格行的斑马线效果（交替颜色）？', options: ['A. tr:nth-child(even) { background-color: #f2f2f2; }', 'B. tr:alternate { background-color: #f2f2f2; }', 'C. tr:odd-even { background-color: #f2f2f2; }', 'D. table-row: zebra { background-color: #f2f2f2; }'], answer: 'A', explanation: '使用 :nth-child(even) 或 :nth-child(odd) 伪类可以轻松实现斑马线效果。' },
  { type: 'single', title: '想要让表格在父容器中水平居中，最常用的CSS设置是？', options: ['A. text-align: center;', 'B. margin: 0 auto;', 'C. align-items: center;', 'D. float: center;'], answer: 'B', explanation: '对于块级元素（table默认是块级特征），使用 margin: 0 auto; 可以实现水平居中。' },
  { type: 'single', title: '表格单元格内容默认的垂直对齐方式是？', options: ['A. top', 'B. middle', 'C. bottom', 'D. baseline'], answer: 'B', explanation: '在大多数浏览器中，th 和 td 元素的 vertical-align 默认值通常表现为 middle。' },
  { type: 'single', title: '如果要将单元格内容垂直对齐到顶部，应设置？', options: ['A. align-items: flex-start;', 'B. vertical-align: top;', 'C. text-align: top;', 'D. padding-top: 0;'], answer: 'B', explanation: 'vertical-align: top; 用于设置单元格内容的顶部对齐。' },
  { type: 'single', title: '以下哪个 CSS 属性不是专门针对表格（或其内部元素）设计的？', options: ['A. border-spacing', 'B. empty-cells', 'C. caption-side', 'D. box-sizing'], answer: 'D', explanation: 'box-sizing 是通用的盒模型属性，不是专门针对表格的。' },
  { type: 'single', title: '在表格中，th 元素的默认文本对齐方式（text-align）通常是？', options: ['A. left', 'B. center', 'C. right', 'D. justify'], answer: 'B', explanation: '表头单元格 <th> 默认的文本对齐方式是居中（center），且字体加粗。' },
  { type: 'single', title: '如何设置表格的宽度占满其父容器的 100%？', options: ['A. width: max-content;', 'B. width: auto;', 'C. width: 100%;', 'D. width: fill;'], answer: 'C', explanation: 'width: 100%; 可以让表格宽度自适应铺满父容器。' },
  { type: 'single', title: '当设置了 border-collapse: collapse; 后，哪个属性将失效？', options: ['A. border-color', 'B. border-style', 'C. border-spacing', 'D. border-width'], answer: 'C', explanation: '当边框折叠时，单元格之间没有间隙，因此 border-spacing 属性会被忽略。' },
  { type: 'single', title: 'table-layout: auto; 的特点是什么？', options: ['A. 渲染速度极快', 'B. 列宽由表格总宽度决定', 'C. 列宽由单元格中不折行的最宽内容决定', 'D. 忽略所有设置的宽度'], answer: 'C', explanation: '自动表格布局算法中，列的宽度是由列单元格中没有折行的最宽的内容设定的。' },
  { type: 'single', title: '如果单元格内的文本很长且不希望它换行，应该使用什么CSS属性？', options: ['A. word-wrap: normal;', 'B. white-space: nowrap;', 'C. text-overflow: clip;', 'D. overflow: hidden;'], answer: 'B', explanation: 'white-space: nowrap; 可以强制文本在同一行内显示，直到遇到 <br> 标签。' },
  { type: 'single', title: '结合 table-layout: fixed; 和哪个属性可以实现单元格内容溢出时显示省略号？', options: ['A. text-overflow: ellipsis; overflow: hidden; white-space: nowrap;', 'B. text-overflow: ellipsis;', 'C. overflow: scroll;', 'D. word-break: break-all;'], answer: 'A', explanation: '要实现单行文本溢出省略号，必须同时满足这三个条件，且在表格中通常需要 table-layout: fixed;。' },
  { type: 'single', title: '给 <tr> 元素设置 border 会生效吗（在 border-collapse: separate 时）？', options: ['A. 会生效', 'B. 不会生效', 'C. 仅在部分浏览器生效', 'D. 会导致表格崩溃'], answer: 'B', explanation: '在分离边框模型中（默认情况），不能为行（tr）、行组（tbody等）或列（col）设置边框。' },
  { type: 'single', title: '如何为表格添加外发光效果（阴影）？', options: ['A. table-shadow: 0 0 10px #ccc;', 'B. box-shadow: 0 0 10px #ccc;', 'C. border-shadow: 0 0 10px #ccc;', 'D. outline: 10px solid #ccc;'], answer: 'B', explanation: '使用 box-shadow 属性可以为包括表格在内的块级元素添加阴影效果。' },
  { type: 'code', title: '请编写一段CSS代码，使所有表格元素（table）的边框合并为单一边框。', options: [], answer: 'table { border-collapse: collapse; }', explanation: '使用 border-collapse: collapse; 可以将分离的边框合并。' },
  { type: 'code', title: '请编写CSS代码，隐藏表格中所有没有内容的单元格（需处于分离边框模式）。', options: [], answer: 'table { empty-cells: hide; }', explanation: 'empty-cells: hide 属性用于隐藏空单元格的边框和背景。' },
  { type: 'code', title: '请编写CSS代码，将表格的标题（caption）放置在表格的底部。', options: [], answer: 'caption { caption-side: bottom; }', explanation: '通过设置 caption-side 为 bottom，可以将表格标题移动到表格下方。' },
  { type: 'code', title: '请编写CSS代码，为表格设置固定布局算法，并将宽度设为100%。', options: [], answer: 'table { table-layout: fixed; width: 100%; }', explanation: '固定布局算法可以提高渲染性能，尤其是对于大表格。' },
  { type: 'code', title: '请编写CSS代码，实现表格偶数行的背景颜色为 #f9f9f9。', options: [], answer: 'tr:nth-child(even) { background-color: #f9f9f9; }', explanation: '使用 :nth-child 伪类选择器可以方便地实现条纹表格效果。' }
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
    console.log(`Success`);
  } catch (error) { console.error(error); } finally { await connection.end(); }
}
run();
