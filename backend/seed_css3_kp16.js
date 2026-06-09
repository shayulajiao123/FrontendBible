import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: 'CSS3新特性',
  content: `### CSS3新特性\n\n**1. 圆角 (border-radius)**\n\`border-radius: 10px;\`\n\n**2. 阴影 (box-shadow / text-shadow)**\n\`box-shadow: 10px 10px 5px #888888;\`\n\n**3. 背景尺寸 (background-size)**\n\n**4. 过渡 (transition)**\n可以在不使用 Flash 动画或 JavaScript 的情况下，当元素从一种样式变换为另一种样式时为元素添加效果。`
};

const questions = [
  {
    type: 'single',
    title: '以下哪个属性用于在 CSS3 中创建圆角边框？',
    options: ['A. border-corner', 'B. border-radius', 'C. corner-radius', 'D. box-radius'],
    answer: 'B',
    explanation: 'CSS3 中使用 border-radius 属性来创建圆角。'
  },
  {
    type: 'single',
    title: '关于 box-shadow 的参数，哪一个表示模糊半径？',
    options: ['A. 第一个长度值', 'B. 第二个长度值', 'C. 第三个长度值', 'D. 第四个长度值'],
    answer: 'C',
    explanation: 'box-shadow 的语法通常是：h-shadow v-shadow blur spread color inset。第三个长度值表示 blur（模糊半径）。'
  },
  {
    type: 'single',
    title: 'CSS3 中哪种颜色模式支持透明度设置？',
    options: ['A. RGB', 'B. HEX', 'C. RGBA', 'D. HSL'],
    answer: 'C',
    explanation: 'RGBA 在 RGB 的基础上增加了 Alpha 通道，用于设置颜色的透明度。'
  },
  {
    type: 'single',
    title: '以下哪个 CSS3 属性用于设置背景图像的大小？',
    options: ['A. background-scale', 'B. background-size', 'C. background-dimension', 'D. background-area'],
    answer: 'B',
    explanation: 'background-size 用于指定背景图像的大小，可以使用长度值或百分比，或者是 cover、contain 等关键字。'
  },
  {
    type: 'single',
    title: '在 CSS3 渐变中，用于创建线性渐变的函数是？',
    options: ['A. linear-gradient()', 'B. radial-gradient()', 'C. gradient-linear()', 'D. line-gradient()'],
    answer: 'A',
    explanation: 'linear-gradient() 函数用于创建一个线性渐变的图像。'
  },
  {
    type: 'single',
    title: '如果要让背景图像完全覆盖内容区域（可能被裁剪），background-size 应该设置为？',
    options: ['A. contain', 'B. cover', 'C. 100% 100%', 'D. auto'],
    answer: 'B',
    explanation: 'cover 会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。'
  },
  {
    type: 'single',
    title: '以下哪个属性用于控制元素在 2D 或 3D 空间中的转换（旋转、缩放等）？',
    options: ['A. transition', 'B. transform', 'C. translate', 'D. animation'],
    answer: 'B',
    explanation: 'transform 属性允许你旋转，缩放，倾斜或平移给定元素。'
  },
  {
    type: 'single',
    title: '关于 CSS3 的 transition，以下哪个属性用于指定过渡效果的持续时间？',
    options: ['A. transition-delay', 'B. transition-property', 'C. transition-duration', 'D. transition-timing-function'],
    answer: 'C',
    explanation: 'transition-duration 属性规定完成过渡效果需要花费的时间（以秒或毫秒计）。'
  },
  {
    type: 'single',
    title: '在 transition-timing-function 中，表示以相同的速度从开始到结束的关键字是？',
    options: ['A. ease', 'B. linear', 'C. ease-in', 'D. ease-out'],
    answer: 'B',
    explanation: 'linear 规定以相同速度开始至结束的过渡效果。'
  },
  {
    type: 'single',
    title: '用于定义动画关键帧的 CSS3 规则是？',
    options: ['A. @animation', 'B. @keyframes', 'C. @transition', 'D. @frames'],
    answer: 'B',
    explanation: '@keyframes 规则用于创建动画。'
  },
  {
    type: 'single',
    title: '要为一个元素添加多个背景图像，如何书写代码？',
    options: ['A. background-image: url(1.png) url(2.png);', 'B. background-image: url(1.png) + url(2.png);', 'C. background-image: url(1.png), url(2.png);', 'D. 不支持多个背景'],
    answer: 'C',
    explanation: 'CSS3 允许元素使用多个背景图像，使用逗号分隔各个 url。'
  },
  {
    type: 'single',
    title: 'text-shadow 属性的作用是什么？',
    options: ['A. 设置文本的字体', 'B. 设置元素的边框阴影', 'C. 向文本添加阴影', 'D. 设置文本的背景'],
    answer: 'C',
    explanation: 'text-shadow 属性向文本设置阴影。'
  },
  {
    type: 'single',
    title: 'CSS3 中引入的 box-sizing 属性，若要让宽度和高度包含内边距（padding）和边框（border），其值应设为？',
    options: ['A. content-box', 'B. border-box', 'C. padding-box', 'D. margin-box'],
    answer: 'B',
    explanation: 'border-box 告诉浏览器去理解你设置的边框和内边距的值是包含在 width 内的。'
  },
  {
    type: 'single',
    title: '在使用 @font-face 引入自定义字体时，哪个属性用于指定字体的名称？',
    options: ['A. src', 'B. font-name', 'C. font-family', 'D. font-style'],
    answer: 'C',
    explanation: '在 @font-face 规则中，font-family 用于指定自定义字体的名称，供后续 CSS 引用。'
  },
  {
    type: 'single',
    title: '要实现元素顺时针旋转 45 度，应使用哪种 transform 函数？',
    options: ['A. rotate(45deg)', 'B. scale(45)', 'C. skew(45deg)', 'D. translate(45deg)'],
    answer: 'A',
    explanation: 'rotate() 函数用于 2D 旋转元素，参数为角度。'
  },
  {
    type: 'single',
    title: '以下关于 CSS3 媒体查询 (Media Queries) 的说法错误的是？',
    options: ['A. 媒体查询可以让我们针对不同的设备特性（如视口宽度）应用不同的样式', 'B. 使用 @media 规则可以引入媒体查询', 'C. 媒体查询只支持屏幕设备（screen），不支持打印机（print）', 'D. 它是实现响应式设计的核心技术之一'],
    answer: 'C',
    explanation: '媒体查询不仅支持 screen，还支持 print（打印预览）、all（所有设备）等多种媒体类型。'
  },
  {
    type: 'single',
    title: 'CSS3 calc() 函数的主要作用是？',
    options: ['A. 计算元素的数量', 'B. 动态计算 CSS 属性值', 'C. 执行 JavaScript 代码', 'D. 处理图像颜色'],
    answer: 'B',
    explanation: 'calc() 函数用于动态计算长度值，支持加减乘除运算。'
  },
  {
    type: 'single',
    title: '要实现元素在 X 轴方向平移 50px，应使用？',
    options: ['A. transform: translateX(50px);', 'B. transform: translateY(50px);', 'C. transform: scaleX(50px);', 'D. transform: skewX(50px);'],
    answer: 'A',
    explanation: 'translateX() 用于沿 X 轴方向平移元素。'
  },
  {
    type: 'single',
    title: '在 CSS3 动画中，哪个属性用于控制动画播放的次数？',
    options: ['A. animation-delay', 'B. animation-duration', 'C. animation-iteration-count', 'D. animation-direction'],
    answer: 'C',
    explanation: 'animation-iteration-count 属性定义动画应该播放多少次，可以设置为具体数字或 infinite（无限次）。'
  },
  {
    type: 'single',
    title: '如果要让一个长单词在容器内自动换行，防止溢出，应使用哪个 CSS3 属性？',
    options: ['A. word-break: break-all;', 'B. white-space: nowrap;', 'C. text-overflow: ellipsis;', 'D. overflow: hidden;'],
    answer: 'A',
    explanation: 'word-break: break-all; 可以允许在单词内换行，防止长单词溢出容器。'
  },
  {
    type: 'code',
    title: '使用 CSS3，为一个 class 为 "box" 的元素设置一个右下方偏移量为 5px、模糊半径为 10px、颜色为半透明黑色 (rgba(0,0,0,0.5)) 的盒子阴影。',
    options: [],
    answer: '.box { box-shadow: 5px 5px 10px rgba(0,0,0,0.5); }',
    explanation: 'box-shadow 的语法为：水平偏移 垂直偏移 模糊半径 扩展半径 颜色。右下方偏移即水平和垂直均为正值。'
  },
  {
    type: 'code',
    title: '使用 CSS3 transform 属性，将一个元素同时缩放到原来的 1.5 倍并逆时针旋转 30 度。',
    options: [],
    answer: 'transform: scale(1.5) rotate(-30deg);',
    explanation: 'transform 可以接受多个变换函数，用空格分隔。逆时针旋转使用负角度。'
  },
  {
    type: 'code',
    title: '为一个元素编写 CSS 代码，使其背景颜色从红色过渡到蓝色，持续时间为 0.5 秒，速度曲线为 ease-in-out。',
    options: [],
    answer: 'transition: background-color 0.5s ease-in-out;',
    explanation: 'transition 简写属性的顺序通常是：property duration timing-function delay。'
  },
  {
    type: 'code',
    title: '使用 @keyframes 编写一个名为 "fade-in" 的动画，从完全透明 (opacity: 0) 变为完全不透明 (opacity: 1)。',
    options: [],
    answer: '@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }',
    explanation: '@keyframes 通过定义不同阶段的样式来创建动画，可以使用 from/to 或百分比（0% 100%）。'
  },
  {
    type: 'code',
    title: '利用 CSS3 background 属性，为元素创建一个从上到下由白色 (#fff) 到黑色 (#000) 的线性渐变背景。',
    options: [],
    answer: 'background: linear-gradient(to bottom, #fff, #000);',
    explanation: 'linear-gradient 函数创建线性渐变，to bottom 表示方向是从上到下。'
  }
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
