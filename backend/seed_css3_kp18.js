import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '媒体查询',
  content: `### 媒体查询\n\n**@media** 规则允许针对不同的媒体类型/屏幕尺寸定制不同的样式。响应式设计的基石。\n\n**语法：**\n\`\`\`css\n@media screen and (max-width: 600px) {\n  body {\n    background-color: lightblue;\n  }\n}\n\`\`\`\n这段代码表示：当屏幕宽度最大为 600px 时，将背景颜色设置为浅蓝色。`
};

const questions = [
  { type: 'single', title: '以下哪个媒体类型表示用于所有设备？', options: ['A. all', 'B. screen', 'C. print', 'D. speech'], answer: 'A', explanation: 'all 表示所有设备。' },
  { type: 'single', title: '在媒体查询中，哪个关键字用于组合多个媒体特性？', options: ['A. or', 'B. and', 'C. not', 'D. only'], answer: 'B', explanation: 'and 关键字用于组合多个媒体特性，只有当所有特性都满足时，规则才适用。' },
  { type: 'single', title: '哪个关键字用于排除特定的媒体类型？', options: ['A. exclude', 'B. not', 'C. only', 'D. without'], answer: 'B', explanation: 'not 关键字用于否定媒体查询，如果它不满足条件，则返回 true。' },
  { type: 'single', title: '为了隐藏不支持媒体查询的旧浏览器的样式表，通常使用哪个关键字？', options: ['A. hide', 'B. only', 'C. not', 'D. all'], answer: 'B', explanation: 'only 关键字用于防止不支持带有媒体特性的媒体查询的旧版浏览器应用给定的样式。' },
  { type: 'single', title: '以下哪个媒体特性用于检测设备是横屏还是竖屏？', options: ['A. direction', 'B. orientation', 'C. aspect-ratio', 'D. view-mode'], answer: 'B', explanation: 'orientation 媒体特性用于检测设备的视口方向（portrait 或 landscape）。' },
  { type: 'single', title: '如果我们要为宽度介于 500px 到 800px 之间的屏幕编写样式，正确的媒体查询是？', options: ['A. @media (min-width: 500px) and (max-width: 800px)', 'B. @media (width >= 500px) and (width <= 800px)', 'C. @media (500px <= width <= 800px)', 'D. A和B和C都可能（取决于浏览器对Level 4规范的支持）'], answer: 'D', explanation: 'A是传统写法，B和C是Media Queries Level 4中引入的新语法，现代浏览器大多已支持。' },
  { type: 'single', title: '在移动优先(Mobile-First)的设计策略中，通常使用哪个媒体特性？', options: ['A. max-width', 'B. min-width', 'C. orientation', 'D. device-width'], answer: 'B', explanation: '移动优先通常先写移动端样式（无媒体查询或较小尺寸），然后用 min-width 逐步增加更大屏幕的样式。' },
  { type: 'single', title: '以下哪个不是标准的媒体类型（Media Type）？', options: ['A. screen', 'B. print', 'C. tv', 'D. speech'], answer: 'C', explanation: '在 CSS Media Queries Level 4 中，tv 等已被废弃，推荐使用 screen。' },
  { type: 'single', title: '如何检测用户是否偏好深色模式？', options: ['A. @media (color-scheme: dark)', 'B. @media (prefers-color-scheme: dark)', 'C. @media (dark-mode: active)', 'D. @media (theme: dark)'], answer: 'B', explanation: 'prefers-color-scheme 媒体特性用于检测用户是否请求了浅色或深色主题。' },
  { type: 'single', title: '哪个媒体查询可以检测设备是否支持悬停（如鼠标）？', options: ['A. @media (hover: hover)', 'B. @media (pointer: fine)', 'C. @media (has-hover: true)', 'D. @media (device-type: mouse)'], answer: 'A', explanation: 'hover 媒体特性用于检测用户的主输入机制是否能方便地在元素上悬停。' },
  { type: 'single', title: '分辨率相关的媒体特性是？', options: ['A. pixel-ratio', 'B. resolution', 'C. density', 'D. dpi'], answer: 'B', explanation: 'resolution 用于查询输出设备的分辨率。' },
  { type: 'single', title: '逗号 (,) 在媒体查询中的作用相当于什么逻辑运算符？', options: ['A. AND', 'B. OR', 'C. NOT', 'D. XOR'], answer: 'B', explanation: '逗号用于分隔多个媒体查询，只要其中一个为真，整个查询就为真，类似于 OR。' },
  { type: 'single', title: '以下哪个用来检测设备的指针精度（如手指点击还是鼠标精确点击）？', options: ['A. hover', 'B. pointer', 'C. touch', 'D. cursor'], answer: 'B', explanation: 'pointer 媒体特性用于查询设备的主输入机制的准确度，如 fine (鼠标) 或 coarse (触摸屏)。' },
  { type: 'single', title: 'aspect-ratio 媒体特性比较的是哪两个值？', options: ['A. 设备宽度和高度', 'B. 视口宽度和高度', 'C. 屏幕物理宽度和高度', 'D. 视口宽度和设备宽度'], answer: 'B', explanation: 'aspect-ratio 描述的是视口（viewport）的宽度和高度的比例。' },
  { type: 'single', title: '如果我想检测用户是否开启了减少动画的功能，应该用？', options: ['A. @media (prefers-reduced-motion: reduce)', 'B. @media (animations: none)', 'C. @media (reduce-motion: true)', 'D. @media (no-motion: active)'], answer: 'A', explanation: 'prefers-reduced-motion 用于检测用户是否在系统中开启了减少动画的偏好设置。' },
  { type: 'single', title: '@media print 的主要用途是？', options: ['A. 改变打印机屏幕颜色', 'B. 针对网页打印效果定制样式，如隐藏导航栏', 'C. 强制网页以PDF格式输出', 'D. 阻止网页被打印'], answer: 'B', explanation: '@media print 用于定义文档在打印机上打印时的样式。' },
  { type: 'single', title: 'CSS 媒体查询中的 vh 和 vw 单位与 @media 规则有何关联？', options: ['A. 没有关联，视口单位可以独立使用', 'B. 必须在 @media 规则内部才能使用', 'C. 视口单位会覆盖 @media 规则', 'D. @media 规则基于视口单位进行判断'], answer: 'A', explanation: '视口单位(vh, vw)是长度单位，可以独立于媒体查询使用，但经常与媒体查询结合进行响应式设计。' },
  { type: 'single', title: '如果同时使用 max-width 和 min-width，它们之间的关系是？', options: ['A. 逻辑或 (OR)', 'B. 逻辑与 (AND)', 'C. 互相冲突，只有最后一个生效', 'D. 视浏览器而定'], answer: 'B', explanation: '当在同一个媒体查询中使用多个特性时（用 and 连接），它们是逻辑与的关系。' },
  { type: 'single', title: '在 HTML 中，如何通过媒体查询条件加载不同的 CSS 文件？', options: ['A. <link rel="stylesheet" href="style.css" media="screen and (max-width: 600px)">', 'B. <style src="style.css" media="...">', 'C. <css href="style.css" condition="...">', 'D. 无法在 HTML 中做到，必须在 CSS 文件里写'], answer: 'A', explanation: '可以在 <link> 标签的 media 属性中使用媒体查询，浏览器会根据条件决定是否应用该样式表。' },
  { type: 'single', title: '关于媒体查询的性能，以下说法正确的是？', options: ['A. 媒体查询会显著减慢页面渲染速度，应尽量少用', 'B. 浏览器会下载所有 <link> 引用的 CSS 文件，即使 media 属性不匹配', 'C. 不匹配 media 属性的 CSS 文件根本不会被下载', 'D. 媒体查询只在页面初始加载时求值，屏幕缩放时不会重新计算'], answer: 'B', explanation: '浏览器通常会下载所有的样式表，但只会应用匹配当前媒体查询的样式。这有助于在设备状态改变时立即应用新样式，而无需额外网络请求。' },
  
  { type: 'code', title: '编写一段CSS代码：默认背景为红色，当屏幕宽度大于等于 768px 时背景变为绿色，当屏幕宽度大于等于 1024px 时背景变为蓝色。', options: [], answer: 'body { background-color: red; }\n@media (min-width: 768px) { body { background-color: green; } }\n@media (min-width: 1024px) { body { background-color: blue; } }', explanation: '移动优先策略，使用 min-width 按断点递增的方式覆盖样式。' },
  { type: 'code', title: '编写一段媒体查询，仅在打印且视口宽度不超过 800px 时，将段落(p)文字颜色设为黑色。', options: [], answer: '@media print and (max-width: 800px) {\n  p { color: black; }\n}', explanation: '使用 and 组合媒体类型 print 和媒体特性 max-width。' },
  { type: 'code', title: '使用 Media Queries Level 4 语法（区间语法），编写媒体查询当视口宽度在 400px 到 600px 之间（包含边界）时，隐藏类名为 .sidebar 的元素。', options: [], answer: '@media (400px <= width <= 600px) {\n  .sidebar { display: none; }\n}', explanation: 'Level 4 引入了更直观的比较运算符语法。' },
  { type: 'code', title: '编写代码，针对支持鼠标悬停的设备，为类名为 .btn 的元素添加悬停效果（背景变为灰色）。', options: [], answer: '@media (hover: hover) {\n  .btn:hover { background-color: gray; }\n}', explanation: '使用 (hover: hover) 媒体特性来增强只在支持 hover 的设备上的交互体验。' },
  { type: 'code', title: '编写一段 CSS，当用户系统开启了深色模式时，将整个页面的背景设为黑色，文字设为白色。', options: [], answer: '@media (prefers-color-scheme: dark) {\n  body {\n    background-color: black;\n    color: white;\n  }\n}', explanation: '使用 prefers-color-scheme 检测深色模式偏好。' }
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
