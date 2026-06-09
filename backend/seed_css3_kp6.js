import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '背景属性',
  content: `### 背景属性\n\n* **background-color**：设置背景颜色\n* **background-image**：设置元素的背景图像 \`url("...")\`\n* **background-repeat**：平铺方式 (repeat, repeat-x, repeat-y, no-repeat)\n* **background-size**：大小 (100% 100%, cover 覆盖最小大小, contain 适合最大大小)\n* **background-position**：起始位置 (center, left top, x% y% 等)`
};

const questions = [
  { type: 'single', title: '以下关于 background-size: cover 的描述，正确的是？', options: ['A. 保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小', 'B. 保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小', 'C. 图像将被拉伸以填满整个背景区域，不保持比例', 'D. 图像将保持原始大小，超出部分被裁剪'], answer: 'A', explanation: 'cover 会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。' },
  { type: 'single', title: 'background-size: contain 的效果是？', options: ['A. 背景图像完全覆盖元素', 'B. 保持图像纵横比，缩放图像使其宽度和高度完全适应内容区域', 'C. 背景图像拉伸以适应元素', 'D. 背景图像不缩放'], answer: 'B', explanation: 'contain 会保持图像纵横比，并把图像缩放成适合背景定位区域的最大大小。' },
  { type: 'single', title: '如何设置背景图像仅在水平方向平铺？', options: ['A. background-repeat: repeat-y', 'B. background-repeat: no-repeat', 'C. background-repeat: repeat-x', 'D. background-repeat: space'], answer: 'C', explanation: 'repeat-x 表示仅在水平方向（x轴）平铺。' },
  { type: 'single', title: 'background-position: 50% 50% 等同于以下哪个关键字组合？', options: ['A. left top', 'B. center center', 'C. right bottom', 'D. left center'], answer: 'B', explanation: '50% 50% 也就是居中对齐，等同于 center center。' },
  { type: 'single', title: '使用多重背景时，哪一层背景图像显示在最上面？', options: ['A. 列表中最后声明的图像', 'B. 列表中最先声明的图像', 'C. 图像大小最大的那层', 'D. 随机排序'], answer: 'B', explanation: '在 CSS 声明中，最先列出的背景图像在视觉上处于最顶层（z轴最靠近用户）。' },
  { type: 'single', title: 'background-color 的默认值是？', options: ['A. white', 'B. black', 'C. transparent', 'D. inherit'], answer: 'C', explanation: '背景颜色的默认值是透明（transparent）。' },
  { type: 'single', title: '若 background-position 仅提供了一个值，第二个值默认是？', options: ['A. top', 'B. bottom', 'C. center', 'D. left'], answer: 'C', explanation: '如果仅指定一个关键字，其他值将会是 center (即 50%)。' },
  { type: 'single', title: '要将背景图像固定在视口中不随内容滚动，应使用什么属性？', options: ['A. background-attachment: fixed', 'B. background-position: fixed', 'C. background-attachment: scroll', 'D. background-repeat: no-repeat'], answer: 'A', explanation: 'background-attachment: fixed 可以让背景图像相对于视口固定。' },
  { type: 'single', title: '在简写属性 background 中，尺寸(background-size) 必须紧跟在什么之后，并用斜杠 (/) 分隔？', options: ['A. background-color', 'B. background-repeat', 'C. background-position', 'D. background-image'], answer: 'C', explanation: '规范要求 background-size 必须紧跟在 background-position 之后，用 / 分隔，例如 center / cover。' },
  { type: 'single', title: '以下哪个属性可以用来指定背景绘制（clip）的区域？', options: ['A. background-origin', 'B. background-clip', 'C. background-attachment', 'D. background-box'], answer: 'B', explanation: 'background-clip 属性规定背景的绘制区域（如 border-box, padding-box, content-box）。' },
  { type: 'single', title: 'background-origin 的默认值是？', options: ['A. border-box', 'B. padding-box', 'C. content-box', 'D. margin-box'], answer: 'B', explanation: 'background-origin 默认值是 padding-box，即背景图像相对于内边距框来定位。' },
  { type: 'single', title: '如果背景图片使用了渐变（linear-gradient），它属于哪个属性的值？', options: ['A. background-color', 'B. background-image', 'C. background-blend-mode', 'D. background-style'], answer: 'B', explanation: 'CSS 渐变是由浏览器生成的图像，因此应用在 background-image 属性上。' },
  { type: 'single', title: 'background-blend-mode 属性的作用是？', options: ['A. 定义背景图像与背景颜色的混合模式', 'B. 定义元素背景与文字的对比度', 'C. 改变背景颜色的透明度', 'D. 定义边框和背景的重叠方式'], answer: 'A', explanation: 'background-blend-mode 定义该元素的背景图像，以及背景图像与背景颜色如何混合。' },
  { type: 'single', title: '关于 background-size: 100% 100%; 以下说法正确的是？', options: ['A. 图片会被拉伸以完全填满背景定位区域，可能会变形', 'B. 图片会按比例缩放以适应容器', 'C. 相当于 cover', 'D. 图片居中显示不缩放'], answer: 'A', explanation: '100% 100% 会分别强行将宽和高拉伸至容器的尺寸，往往会导致图片失真。' },
  { type: 'single', title: 'background-repeat: space 的表现是？', options: ['A. 图像被拉伸以填满区域', 'B. 图像尽可能多地重复，不被裁剪，空白均匀分布在图像之间', 'C. 图像重复，超出部分被裁剪', 'D. 图像不重复'], answer: 'B', explanation: 'space 值会在不裁剪图像的前提下重复尽可能多的次数，多余的空间平均分布在图像之间。' },
  { type: 'single', title: '在定义多个背景图时，多个属性值之间用什么符号隔开？', options: ['A. 空格', 'B. 分号', 'C. 逗号', 'D. 斜杠'], answer: 'C', explanation: '多重背景声明时，各层之间用逗号 (,) 分隔。' },
  { type: 'single', title: '以下哪个值不是 background-clip 的合法值？', options: ['A. border-box', 'B. padding-box', 'C. content-box', 'D. margin-box'], answer: 'D', explanation: 'background-clip 支持 border-box, padding-box, content-box 以及 text，不支持 margin-box。' },
  { type: 'single', title: '背景颜色 (background-color) 绘制的范围默认是？', options: ['A. content-box', 'B. padding-box', 'C. border-box', 'D. margin-box'], answer: 'C', explanation: '默认情况下，背景颜色延伸到边框（border）的外边缘下（即 border-box）。' },
  { type: 'single', title: 'background-position: right 20px bottom 10px; 的含义是？', options: ['A. 无效语法', 'B. 背景图距离右侧20px，距离底部10px', 'C. 背景图距离左侧20px，距离顶部10px', 'D. 背景图宽度20px，高度10px'], answer: 'B', explanation: '这是四值语法，分别指定从右侧偏移20px，从底部偏移10px。' },
  { type: 'single', title: '如果元素没有指定高度和宽度，只包含文本，它的 background-image 覆盖范围是？', options: ['A. 整个浏览器视口', 'B. 元素内容及其内边距、边框所占的区域', 'C. 仅文本本身', 'D. 无法显示'], answer: 'B', explanation: '背景图像的范围取决于元素的盒模型大小，即内容加上 padding 和 border（如果没有设置高度宽度，由内容撑开）。' },
  { type: 'code', title: '请写出 CSS 规则：为一个类名为 .box 的元素设置背景颜色为 #f00，背景图像为 bg.png，不重复，位置居中。', options: [], answer: '.box { background-color: #f00; background-image: url("bg.png"); background-repeat: no-repeat; background-position: center; }', explanation: '可以通过单独设置各属性，也可以通过简写 `background: #f00 url("bg.png") no-repeat center;` 来实现。' },
  { type: 'code', title: '请写出 CSS 规则：将元素的背景图片设置在距离右边框 10px，距离下边框 20px 的位置（使用 background-position）。', options: [], answer: 'background-position: right 10px bottom 20px;', explanation: '使用 CSS3 的新语法，可以指定从右侧和底部的偏移量。' },
  { type: 'code', title: '请写出 CSS 规则：让类名为 .hero 的背景图片填满整个容器，保持比例不变，且图片水平垂直居中。', options: [], answer: '.hero { background-size: cover; background-position: center; }', explanation: 'cover 可以让图片覆盖整个容器并保持比例，center 则让其居中显示。' },
  { type: 'code', title: '请写出 CSS 规则：为元素设置两层背景图，上层为 top.png，下层为 bottom.png，两张图片均不平铺。', options: [], answer: 'background-image: url("top.png"), url("bottom.png"); background-repeat: no-repeat, no-repeat;', explanation: '使用逗号分隔多个背景图，先声明的在视觉上位于更上层。' },
  { type: 'code', title: '请写出 CSS 规则：使用 background 简写属性同时设置背景颜色为白色，背景图片为 img.jpg，不重复，位置居中并且尺寸为完全覆盖。', options: [], answer: 'background: white url("img.jpg") no-repeat center / cover;', explanation: '在使用简写属性时，background-size 必须用斜杠与 background-position 隔开。' }
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
