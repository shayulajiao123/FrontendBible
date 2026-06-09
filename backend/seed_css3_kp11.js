import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '弹性盒模型（flex box）',
  content: `### 弹性盒模型（flex box）\n\n现代网页布局的核心技术。通过 display: flex 启用。\n\n**1. 父元素属性**\n* flex-direction: 主轴方向 (row, column)\n* justify-content: 主轴对齐方式 (flex-start, center, space-between)\n* align-items: 交叉轴对齐方式 (center, stretch)\n* flex-wrap: 是否换行\n\n**2. 子元素属性**\n* flex-grow: 放大比例\n* flex-shrink: 缩小比例\n* align-self: 单独的交叉轴对齐`
};

const questions = [
  { type: 'single', title: '当设置 flex: 1 时，其等同于以下哪个完整的属性缩写？', options: ['A. flex: 1 1 auto', 'B. flex: 1 0 auto', 'C. flex: 1 1 0%', 'D. flex: 1 0 0%'], answer: 'C', explanation: 'flex: 1 实际上是 flex-grow: 1, flex-shrink: 1, flex-basis: 0% 的缩写组合。' },
  { type: 'single', title: '在 flex 容器中，如果设置了一个 flex item 的 margin: auto，会发生什么？', options: ['A. margin 失效', 'B. 元素会占据剩余的全部空间，将其他元素推向边缘', 'C. 元素的宽度会自动变为 100%', 'D. 元素会水平居中，但不影响垂直方向'], answer: 'B', explanation: '在 flex 格式化上下文中，margin: auto 会吸收正向额外的空间，常用于将一个元素推向一侧（类似 float 的效果，但更强大）。' },
  { type: 'single', title: 'Flexbox 中 flex-shrink 的默认值是多少？', options: ['A. 0', 'B. 1', 'C. auto', 'D. inherit'], answer: 'B', explanation: 'flex-shrink 的默认值是 1，这意味着在空间不足时，默认情况下 flex 项目会等比例缩小以防止溢出。' },
  { type: 'single', title: '关于 Flex 容器的交叉轴多行对齐，应使用哪个属性？', options: ['A. align-items', 'B. align-self', 'C. justify-content', 'D. align-content'], answer: 'D', explanation: 'align-content 用于多行项目的交叉轴对齐（只有在 flex-wrap: wrap 且有多行时才生效），align-items 则是针对单行内每个项目的交叉轴对齐。' },
  { type: 'single', title: '当一个图片元素（img）作为 flex item 时，若不设置高度和跨度，它的表现容易出现何种问题？', options: ['A. 图片会被拉伸变形以适应容器高度（align-items: stretch 导致）', 'B. 图片会保持原有比例缩放', 'C. 图片不显示', 'D. 图片会脱离文档流'], answer: 'A', explanation: 'flex 容器默认的 align-items 是 stretch，会导致子元素在交叉轴方向被拉伸。如果没有设置图片的宽高，图片会被拉伸变形。' },
  { type: 'single', title: '如何改变 flex items 的视觉渲染顺序而不影响 DOM 结构和无障碍阅读（如屏幕阅读器）？', options: ['A. 使用 float 属性', 'B. 使用 z-index 属性', 'C. 使用 order 属性', 'D. 使用 tab-index 属性'], answer: 'C', explanation: 'order 属性可以改变 flex items 的排列顺序，默认值为 0，值越小越靠前。但它只改变视觉顺序，不改变 DOM 的逻辑顺序。' },
  { type: 'single', title: '对于 flex 容器内的项目，以下哪个属性默认不起作用？', options: ['A. z-index', 'B. float', 'C. position: relative', 'D. margin'], answer: 'B', explanation: '在 flex 容器中，子元素的 float、clear 和 vertical-align 属性会失效。' },
  { type: 'single', title: 'flex-basis 指定的值和 width 指定的值冲突时，优先级是怎样的？（假设都没有 max/min 限制且没有设置 content）', options: ['A. width 优先级高于 flex-basis', 'B. flex-basis 优先级高于 width', 'C. 后声明的覆盖先声明的', 'D. 表现为两者的平均值'], answer: 'B', explanation: '当设置了 flex-basis 且不为 auto 时，其优先级高于 width。' },
  { type: 'single', title: '当 justify-content 的值为 space-evenly 时，项目的排列效果是？', options: ['A. 项目之间的间隔相等，项目与边框的间隔是项目间间隔的一半', 'B. 项目之间的间隔与项目和边框的间隔完全相等', 'C. 项目紧贴两端，中间项目间隔相等', 'D. 所有项目向主轴起点对齐'], answer: 'B', explanation: 'space-evenly 确保任何两个项目之间以及项目与边缘之间的可用空间分布是完全相等的。' },
  { type: 'single', title: 'Flex 项目中的 min-width 默认值在 Flexbox 环境下变成了什么？', options: ['A. 0', 'B. auto', 'C. 100%', 'D. max-content'], answer: 'B', explanation: 'Flex 项目的 min-width 默认值是 auto，而不是 0。这意味着内容可能撑开盒子，导致它不能缩小到小于其内容大小，常常引起文本截断失效的问题，需要显式设置 min-width: 0 解决。' },
  { type: 'single', title: '如果外层容器的 width 为 500px，内部有两个子元素，flex 都是 1 1 auto，A 的 width 为 200px，B 的 width 为 400px，压缩后 A 和 B 的实际宽度是？', options: ['A. 250px, 250px', 'B. 166.6px, 333.3px', 'C. 200px, 300px', 'D. 100px, 400px'], answer: 'B', explanation: '超出宽度 = 600 - 500 = 100px。收缩比例基于 flex-basis (默认等于 width)，A 的收缩权重是 1*200=200，B是 1*400=400。A 收缩 100 * (200/600) = 33.3px，实际宽度 166.6px；B 实际 333.3px。' },
  { type: 'single', title: '如何让一个设置了 display: flex 的元素本身也具有行内元素的特性（即不独占一行）？', options: ['A. 设置 display: inline-flex', 'B. 设置 display: flex-inline', 'C. 设置 width: auto', 'D. 设置 flex-wrap: wrap'], answer: 'A', explanation: 'display: inline-flex 会创建一个行内级别的 flex 容器，和 inline-block 类似。' },
  { type: 'single', title: '如果 flex-direction 为 column-reverse，justify-content: flex-start 会让项目从哪里开始排列？', options: ['A. 容器的顶部', 'B. 容器的底部', 'C. 容器的左侧', 'D. 容器的右侧'], answer: 'B', explanation: 'column-reverse 将主轴起点从上移到了底部，因此 flex-start 会让元素在底部聚集并往上排列。' },
  { type: 'single', title: '在 flex 容器中，两个相邻子元素的 margin 是否会发生折叠（Margin Collapsing）？', options: ['A. 会折叠，取较大值', 'B. 不会折叠', 'C. 仅垂直方向折叠', 'D. 仅水平方向折叠'], answer: 'B', explanation: '创建了 flex 格式化上下文的容器内，子项目之间的 margin 不会发生折叠现象。' },
  { type: 'single', title: 'flex-basis: content 的作用是什么？', options: ['A. 根据项目的内容自动调整基础大小', 'B. 忽略内部内容，只看指定的 width', 'C. 将宽度强制设置为 100%', 'D. 它是一个无效的属性值'], answer: 'A', explanation: 'flex-basis: content 表示项目的基础尺寸应该基于其内容的大小。' },
  { type: 'single', title: '在弹性布局中，设置绝对定位（position: absolute）的子元素如何表现？', options: ['A. 仍然参与 flex 布局，受 justify-content 控制', 'B. 脱离正常文档流，不再参与弹性布局的分配', 'C. 会被忽略并且不渲染', 'D. 会覆盖容器的全部范围'], answer: 'B', explanation: '绝对定位的元素完全脱离文档流，不占据空间，也不参与 flex 项目的布局和空间分配。' },
  { type: 'single', title: '假设 flex-wrap 的值为 wrap，如果一行中的 flex 项目总宽度超出了容器宽度，会发生什么？', options: ['A. 溢出容器边界', 'B. 自动缩小所有项目的宽度', 'C. 换行显示到下一行', 'D. 将超出的部分截断隐藏'], answer: 'C', explanation: 'flex-wrap: wrap 允许 flex 项目在空间不足时折行到新的一行，而不是被强制压缩在一行内。' },
  { type: 'single', title: '以下哪个属性可以用来统一设置 flex-direction 和 flex-wrap？', options: ['A. flex-group', 'B. flex-flow', 'C. flex-layout', 'D. flex-container'], answer: 'B', explanation: 'flex-flow 是 flex-direction 和 flex-wrap 属性的复合属性。例如 flex-flow: row wrap;。' },
  { type: 'single', title: '当使用 align-items: baseline 时，项目是如何对齐的？', options: ['A. 按照它们内部的第一行文字的基线对齐', 'B. 按照项目盒子的底部边缘对齐', 'C. 按照容器的中线对齐', 'D. 按照最矮的项目顶部对齐'], answer: 'A', explanation: 'baseline 对齐基于 flex 项目内第一行文本内容的基线（baseline）进行对齐，非常适合并排包含不同字号文本的元素。' },
  { type: 'single', title: '要实现传统的 "圣杯布局" (中间内容自适应，两侧固定宽度)，Flexbox 怎么分配 flex 属性最合理？', options: ['A. 两侧 flex: 0 0 200px; 中间 flex: 1;', 'B. 两侧 width: 200px; 中间 width: auto;', 'C. 两侧 flex: 1; 中间 flex: 2;', 'D. 所有都是 flex: 1;'], answer: 'A', explanation: '侧边栏使用 flex: 0 0 [固宽] 防止缩放和扩大，中间主体使用 flex: 1 吸收剩余全部空间，这是标准的 Flex 实现方式。' },
  
  { type: 'code', title: '使用 Flexbox 实现子元素在父容器中的绝对居中（垂直且水平居中）。', options: [], answer: '.parent { display: flex; justify-content: center; align-items: center; height: 100vh; }', explanation: '这是 Flexbox 最经典的应用场景之一，通过给容器设置 display: flex 配合主轴/交叉轴居中属性即可实现。' },
  { type: 'code', title: '使用 Flexbox 实现经典的“粘性页脚”（Sticky Footer），即使内容不够，页脚也固定在屏幕底部。', options: [], answer: 'body { display: flex; flex-direction: column; min-height: 100vh; } main { flex: 1; } footer { /* fixed at bottom */ }', explanation: '让 body 成为 column 方向的 flex 容器，最低高度 100vh。给中间的主内容区赋予 flex: 1 让它撑开所有剩余空间，自然将 footer 挤到底部。' },
  { type: 'code', title: '有一个导航栏里面有三个按钮：首页、关于、登录。使用 Flexbox，如何只需一行代码就能让"登录"按钮靠右对齐，其他靠左？', options: [], answer: '.login-btn { margin-left: auto; }', explanation: '在 Flex 容器中，给特定的子项设置 margin: auto 极其强大。margin-left: auto 会吸收左侧所有多余的剩余空间，将该元素推到最右侧。' },
  { type: 'code', title: '请使用 flex 属性缩写，将一个元素的弹性初始值设为 200px，允许缩小但不允许放大。', options: [], answer: 'flex: 0 1 200px;', explanation: 'flex 缩写依次代表 flex-grow (放大，0表示不允许), flex-shrink (缩小，1表示允许), flex-basis (初始主轴尺寸，200px)。' },
  { type: 'code', title: '实现一个多列等高布局，每列间距 20px。提供容器的关键 CSS。', options: [], answer: '.container { display: flex; align-items: stretch; gap: 20px; }', explanation: 'align-items: stretch（默认值）自动让所有列等高，gap: 20px 提供了干净列间距，替代了繁琐的 margin 计算。' }
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
