import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '雪碧图',
  content: `### 雪碧图 (CSS Sprite)\n\nCSS 雪碧图是一种图像拼合技术，将多张小图标合并成一张大图。\n\n**目的：**\n减少 HTTP 请求数量，提高网页加载速度。\n\n**核心技术：**\n使用 \`background-image\` 引入合并后的大图，然后通过 \`background-position\` 和 \`width\` / \`height\` 定位并截取需要显示的部分。`
};

const questions = [
  { type: 'single', title: 'CSS 雪碧图（Sprite）的主要目的是什么？', options: ['A. 增加图片的色彩饱和度', 'B. 减少 HTTP 请求数量，提高网页加载速度', 'C. 提高图片的分辨率', 'D. 实现图片的动态缩放'], answer: 'B', explanation: '雪碧图通过将多个小图标合并为一张大图，极大地减少了浏览器向服务器发起请求的次数，从而优化了加载性能。' },
  { type: 'single', title: '在 CSS 中，使用雪碧图必备的两个核心属性是？', options: ['A. background-color 和 background-image', 'B. background-image 和 background-position', 'C. background-size 和 background-repeat', 'D. background-clip 和 background-origin'], answer: 'B', explanation: '使用雪碧图的核心在于引入大图（background-image）并通过定位（background-position）来展示特定的图标区域。' },
  { type: 'single', title: '如果雪碧图中某个图标的起始坐标在原图的左上角往右 20px、往下 30px 处，background-position 应该如何设置？', options: ['A. 20px 30px', 'B. -20px -30px', 'C. 30px 20px', 'D. -30px -20px'], answer: 'B', explanation: '背景图像是相对于容器的左上角(0,0)进行定位的。要显示右下的内容，需要将背景图像向左和向上移动，因此使用负值。' },
  { type: 'single', title: '随着技术的发展，哪项技术的普及使得雪碧图的使用频率大幅下降？', options: ['A. HTML5 Canvas', 'B. CSS3 动画', 'C. HTTP/2 多路复用', 'D. WebGL'], answer: 'C', explanation: 'HTTP/2 支持多路复用，可以在一个 TCP 连接上并发发送多个请求，大幅降低了建立连接的开销，使得合并图片的必要性降低。' },
  { type: 'single', title: '在响应式设计中，雪碧图最大的缺点是什么？', options: ['A. 浏览器兼容性差', 'B. 难以根据屏幕尺寸动态缩放图标', 'C. 图片体积过大', 'D. 无法添加 hover 效果'], answer: 'B', explanation: '传统的雪碧图依赖精确的像素定位，当元素尺寸发生变化（如响应式缩放）时，如果不精确调整 background-size 和 position，很容易导致其他图标“漏出”。' },
  { type: 'single', title: '使用雪碧图时，通常将 background-repeat 设置为什么值？', options: ['A. repeat-x', 'B. repeat-y', 'C. no-repeat', 'D. space'], answer: 'C', explanation: '如果不设置 no-repeat，背景图像可能会在容器中平铺，导致相邻的图标被意外显示出来。' },
  { type: 'single', title: '以下哪种图片格式最常用于制作支持透明背景的雪碧图？', options: ['A. JPEG', 'B. GIF', 'C. PNG', 'D. BMP'], answer: 'C', explanation: 'PNG 格式支持 Alpha 通道，能够呈现高质量的透明或半透明边缘，非常适合用于图标的雪碧图合并。' },
  { type: 'single', title: '雪碧图与 Base64 编码图片相比，有什么优势？', options: ['A. 雪碧图不需要单独的 HTTP 请求', 'B. 雪碧图通常更容易被浏览器缓存，且不会增加 CSS 文件的体积', 'C. 雪碧图支持更丰富的颜色', 'D. 雪碧图在 Retina 屏幕上更清晰'], answer: 'B', explanation: 'Base64 会增加 CSS/HTML 文件的体积，阻塞渲染，而雪碧图作为独立的静态资源更容易被浏览器长时间缓存。' },
  { type: 'single', title: '如果要适应高分辨率（Retina）屏幕，雪碧图的设计通常需要怎么做？', options: ['A. 提供一张尺寸小一半的图片', 'B. 提供一张尺寸大一倍的图片，并通过 background-size 缩小到 50%', 'C. 增加图片的 DPI 属性', 'D. 使用 JavaScript 动态渲染'], answer: 'B', explanation: '为 Retina 屏幕提供 2x 尺寸的雪碧图，并利用 background-size 将其缩放至 1x 尺寸，可以确保图标在高清屏上的清晰度。' },
  { type: 'single', title: '在排版雪碧图时，为了避免在缩放或定位不准时“漏出”相邻图标，通常采取什么措施？', options: ['A. 降低图片分辨率', 'B. 在图标之间保留一定的透明间距', 'C. 将所有图标紧凑排列', 'D. 使用不同的颜色填充背景'], answer: 'B', explanation: '保留安全间距（Padding）可以有效防止在特定分辨率下或计算舍入误差时，相邻的图标像素被错误地显示出来。' },
  { type: 'single', title: '关于 SVG Sprite，以下说法错误的是？', options: ['A. SVG Sprite 是矢量的，缩放不失真', 'B. SVG Sprite 可以通过 CSS 改变图标颜色', 'C. SVG Sprite 的体积永远比 PNG 雪碧图大', 'D. 常用的 SVG Sprite 技术包含 <symbol> 和 <use> 标签'], answer: 'C', explanation: '对于线条图标等扁平化图形，SVG 的体积往往比 PNG 还要小，且它不失真。' },
  { type: 'single', title: '在给按钮添加 hover 效果时，如果使用雪碧图，应该如何改变样式？', options: ['A. 更换 background-image 的 URL', 'B. 仅改变 background-position，指向另一状态的图标坐标', 'C. 改变元素的 width 和 height', 'D. 重新加载一个新的雪碧图'], answer: 'B', explanation: '利用雪碧图制作 hover 效果，只需要更改 background-position 属性即可瞬间切换图片状态，无需发起新请求，避免了闪烁问题。' },
  { type: 'single', title: '雪碧图的维护成本相比独立小图来说？', options: ['A. 更低，因为只需要管理一张图', 'B. 更高，每次新增或修改图标都需要重新生成大图并更新定位代码', 'C. 一样，因为工具有自动化功能', 'D. 无法比较'], answer: 'B', explanation: '虽然有自动化工具，但本质上雪碧图的增删改确实比直接替换一张小图的成本要高。' },
  { type: 'single', title: '在使用 CSS 预处理器（如 Sass/Less）时，处理雪碧图的通常做法是？', options: ['A. 手动计算并硬编码每个图标的坐标', 'B. 借助相关插件（如 Compass 或 PostCSS 插件）自动合并并生成包含坐标变量的 CSS 代码', 'C. 禁止使用预处理器处理图片', 'D. 将图片转存为变量放入 JS 中'], answer: 'B', explanation: '利用构建工具或预处理器插件可以自动化生成雪碧图及相应的 CSS 定位代码，极大降低了维护成本。' },
  { type: 'single', title: '雪碧图中 background-position 的百分比值是如何计算的？', options: ['A. 百分比相对于背景图像的尺寸', 'B. 百分比相对于元素的尺寸', 'C. (容器尺寸 - 背景图像尺寸) * 百分比', 'D. 背景图像尺寸 * 百分比'], answer: 'C', explanation: '背景定位百分比计算公式较为特殊，(容器宽度 - 背景图宽度) * 百分比，因此 100% 100% 恰好将背景图的右下角与容器右下角对齐。' },
  { type: 'single', title: '如果某个 icon 所在的 DOM 元素比雪碧图中分配的该 icon 区域还要大，会发生什么？', options: ['A. 图标会自动拉伸填满元素', 'B. 元素的空白区域会显示为透明', 'C. 可能会显示出雪碧图中该图标相邻的其他部分', 'D. 浏览器会报错'], answer: 'C', explanation: '背景图默认是不裁剪的，如果容器过大，不仅会显示目标图标，还会把背景大图里它旁边的内容展示出来，俗称“漏图”。' },
  { type: 'single', title: '对于无障碍访问（a11y），如果一个纯装饰性图标使用雪碧图呈现，最合适的处理方式是？', options: ['A. 在 DOM 中加入一段详细说明文字', 'B. 无需特殊处理，这只是装饰', 'C. 给父元素添加 title 属性', 'D. 将雪碧图转为 img 标签'], answer: 'B', explanation: '纯装饰性的图片如果只是为了视觉美化，通常不需要向屏幕阅读器报告。如果是关键按钮，则应提供隐藏文本或 aria-label。' },
  { type: 'single', title: '如果网络拥堵，加载一个 500KB 的雪碧图与加载 50 个 10KB 的小图相比，前者表现如何？', options: ['A. 前者总能更快显示出页面部分图标', 'B. 后者总能更快显示出所有图标', 'C. 前者会有较长的白屏期，一旦加载完成所有图标同时出现', 'D. 没有任何区别'], answer: 'C', explanation: '雪碧图作为单一文件，加载完成前没有任何图标可用，加载完毕后瞬间全部可用；而多个小图可以逐个加载显示，但总体耗时可能因连接数受限更长。' },
  { type: 'single', title: '目前主流的前端构建工具（如 Webpack, Vite）中，替代传统手动制作雪碧图的常用方案不包括？', options: ['A. Webpack 的 sprite-loader', 'B. 将小图转为 Base64（体积阈值下）', 'C. SVG Sprite 插件（如 svg-sprite-loader）', 'D. 手动使用 Photoshop 拼接图片'], answer: 'D', explanation: '现代前端工程化完全可以由工具（如构建插件或脚本）自动化处理图标打包，手动拼接已经是过时的做法。' },
  { type: 'single', title: 'CSS 变量（Custom Properties）可以用于雪碧图的优化吗？', options: ['A. 可以，常用来集中管理坐标偏移量，使得代码更加清晰和复用', 'B. 不可以，CSS 变量不支持负数', 'C. 不可以，背景属性不能使用变量', 'D. 可以，用来改变图片的色彩'], answer: 'A', explanation: '通过定义 --icon-x 和 --icon-y 变量，可以在通用类中复写 background-position: var(--icon-x) var(--icon-y);，极大地简化了代码结构。' },
  
  { type: 'code', title: '已知有一个图标元素 `.icon-home`，它需要展示 `sprite.png` 中的图标，尺寸为 30x30。该图标在大图中的位置是横向偏移 50px，纵向偏移 100px。请写出正确的 CSS 代码。', options: [], answer: '.icon-home { width: 30px; height: 30px; background-image: url("sprite.png"); background-repeat: no-repeat; background-position: -50px -100px; }', explanation: '使用 width/height 设定视口，通过负的 background-position 值将雪碧图定位至正确区域。' },
  { type: 'code', title: '针对 Retina 屏幕，现有一张 200x200 像素的雪碧图 `sprite@2x.png`，请写出为 100x100 像素普通屏幕设计的 CSS 背景代码（仅要求背景属性相关）。', options: [], answer: 'background-image: url("sprite@2x.png"); background-size: 100px 100px;', explanation: '将双倍图通过 background-size 强行缩小至 1 倍尺寸，能够保证在高像素密度设备上的清晰显示。' },
  { type: 'code', title: '使用 CSS 变量来简化雪碧图代码，请补全下列代码：\n.icon {\n  background: url("sprite.png") no-repeat;\n  ___\n}\n.icon-user {\n  --x: -20px;\n  --y: -40px;\n}', options: [], answer: 'background-position: var(--x, 0) var(--y, 0);', explanation: '通过 var() 引入 CSS 变量，并在基础类里定义，可以在具体修饰类中仅指定坐标变量来实现解耦。' },
  { type: 'code', title: '实现一个按钮图标的 Hover 效果。正常状态的坐标为 `0 0`，Hover 状态的坐标在原图垂直往下移 `50px` 的位置。', options: [], answer: '.btn-icon { background-position: 0 0; }\n.btn-icon:hover { background-position: 0 -50px; }', explanation: '仅需要改变 background-position 的 y 轴偏移量即可实现状态的无缝切换。' },
  { type: 'code', title: '将雪碧图和 `display: inline-block` 结合，用于在文字旁边展示一个 20x20 的小红心，请写出关键的对齐 CSS 代码，保证其不独占一行并能垂直居中于文字。', options: [], answer: '.icon-heart { display: inline-block; width: 20px; height: 20px; vertical-align: middle; background-position: -10px -10px; }', explanation: '使用 inline-block 使得元素能设置宽高又能在一行显示，vertical-align: middle 用于修正与相邻文本的基线对齐问题。' }
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
