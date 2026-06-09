import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '字体属性',
  content: `### 字体属性\n\n* **color**：规定文本的颜色 (red, #ff0000, rgb, rgba)\n* **font-size**：设置文本大小 (chrome浏览器默认最小接受12px)\n* **font-weight**：设置文本粗细 (normal, bold, bolder, lighter, 100~900)\n* **font-style**：指定字体样式 (normal, italic斜体)\n* **font-family**：指定元素的字体，可设多个备用（包含空格的字体名必须加引号）`
};

const questions = [
  { type: 'single', title: '在CSS中，关于font-weight的数值表示，下列哪个说法是正确的？', options: ['A. 400等同于bold，700等同于normal', 'B. 400等同于normal，700等同于bold', 'C. 100是normal，900是bold', 'D. 数值范围必须是100到900之间的任意整数'], answer: 'B', explanation: '在CSS中，400通常等同于normal，而700等同于bold。数值必须是100到900的整百数。' },
  { type: 'single', title: '关于font-family的备用字体机制，以下哪项描述最准确？', options: ['A. 浏览器会同时加载所有列出的字体', 'B. 浏览器按顺序查找，使用第一个在本地或通过网络可用的字体', 'C. 必须至少提供一个Web安全字体作为首选', 'D. 备用字体只能是同一种字体类族'], answer: 'B', explanation: '浏览器会按照列表顺序依次查找，直到找到用户计算机上安装的或者通过网络加载的可用字体。' },
  { type: 'single', title: '如果一个元素的父元素font-weight为bold，该元素设置font-weight: bolder;，最终的字体粗细可能是？', options: ['A. 400', 'B. 700', 'C. 900', 'D. 100'], answer: 'C', explanation: 'bolder会将字体粗细增加一个级别。如果父元素已经是bold (700)，bolder通常会将其计算为900。' },
  { type: 'single', title: 'Chrome浏览器默认的最小字体大小通常是12px。如果通过CSS设置font-size: 10px;，通常会发生什么？', options: ['A. 字体以10px显示', 'B. 字体以12px显示', 'C. 字体不可见', 'D. 字体大小变为0'], answer: 'B', explanation: '由于Chrome的默认最小字体限制，小于12px的字体通常会被强制渲染为12px。' },
  { type: 'single', title: '在定义font-family时，如果字体名称包含空格（如 Times New Roman），应该如何处理？', options: ['A. 直接书写', 'B. 用破折号连接', 'C. 必须使用单引号或双引号括起来', 'D. 删除空格'], answer: 'C', explanation: '包含空格的字体系列名称必须用引号括起来，防止解析错误。' },
  { type: 'single', title: '关于CSS字体样式，italic和oblique的区别是什么？', options: ['A. 没有区别', 'B. italic是使用字体自带的斜体版本，oblique是强制倾斜常规字体', 'C. oblique是字体自带的斜体版本，italic是强制倾斜', 'D. italic只能用于英文字符'], answer: 'B', explanation: 'italic表示使用字体中专门设计的斜体字形，而oblique则是将常规字体在几何上进行倾斜处理。' },
  { type: 'single', title: 'currentColor关键字在color属性相关的场景中代表什么？', options: ['A. 浏览器的默认文字颜色', 'B. 元素父级的背景颜色', 'C. 元素当前计算出的color属性值', 'D. 透明颜色'], answer: 'C', explanation: 'currentColor关键字代表元素计算后的color属性值，常用于将文字颜色应用于边框或阴影等。' },
  { type: 'single', title: '如果设置 font: 16px/1.5 Arial;，这里的 1.5 代表什么？', options: ['A. 字体粗细为1.5倍', 'B. 字母间距为1.5px', 'C. 行高（line-height）为字体大小的1.5倍', 'D. 字体放大1.5倍'], answer: 'C', explanation: '在font简写属性中，斜杠后面的数值代表line-height。' },
  { type: 'single', title: '下列哪个font-weight属性值可以使字体变细？', options: ['A. bolder', 'B. lighter', 'C. thick', 'D. thin'], answer: 'B', explanation: 'lighter关键字会相对于从父元素继承的字体粗细，使元素的字体变细。' },
  { type: 'single', title: '关于使用 rem 作为 font-size 的单位，以下说法正确的是？', options: ['A. 相对于父元素的字体大小', 'B. 相对于根元素（html）的字体大小', 'C. 相对于视口宽度', 'D. 它是绝对长度单位'], answer: 'B', explanation: 'rem (root em) 是相对于根元素(html)的字体大小的相对单位。' },
  { type: 'single', title: '要定义一个完全透明的文本颜色，以下哪个值是正确的？', options: ['A. color: none;', 'B. color: transparent;', 'C. color: hidden;', 'D. color: opacity(0);'], answer: 'B', explanation: 'transparent关键字在CSS中表示完全透明的颜色。' },
  { type: 'single', title: '以下关于CSS颜色十六进制表示法 #RGB 的说法，正确的是？', options: ['A. 它是 #RRGGBB 的缩写', 'B. 它只支持安全颜色', 'C. 它是无效的CSS值', 'D. 代表包含透明度的颜色'], answer: 'A', explanation: '#RGB 是 #RRGGBB 的简写形式，每个十六进制位会被复制一次。' },
  { type: 'single', title: '当使用多个字体名称作为 font-family 时，推荐将什么放在列表的最后？', options: ['A. 一种特定的自定义字体', 'B. 包含空格的字体', 'C. 一种通用的字体族（如 sans-serif）', 'D. 符号字体'], answer: 'C', explanation: '作为后备方案，应始终在列表末尾提供通用字体族以防找不到指定字体。' },
  { type: 'single', title: '如果一个元素的 color 属性没有被显式设置，它将如何表现？', options: ['A. 默认为黑色', 'B. 默认为白色', 'C. 从其父元素继承 color 值', 'D. 变为透明'], answer: 'C', explanation: 'color 属性在 CSS 中是默认继承的。' },
  { type: 'single', title: '在设置 font-size: 2em; 时，如果父元素字体大小为 16px，该元素的计算字体大小是多少？', options: ['A. 16px', 'B. 24px', 'C. 32px', 'D. 2em'], answer: 'C', explanation: 'em 是相对于父元素字体大小的单位。16px * 2 = 32px。' },
  { type: 'single', title: '以下哪个不属于 font 简写属性可以包含的子属性？', options: ['A. font-style', 'B. font-variant', 'C. font-color', 'D. font-weight'], answer: 'C', explanation: 'CSS中没有 font-color 属性，文字颜色通过 color 属性单独设置。' },
  { type: 'single', title: '要在网页中使用自定义字体（网络字体），需要使用哪个 CSS 规则？', options: ['A. @import', 'B. @font-face', 'C. @media', 'D. @custom-font'], answer: 'B', explanation: '@font-face 规则允许引入自定义网络字体。' },
  { type: 'single', title: '在 font 简写属性中，哪两个值是必须提供的？', options: ['A. font-weight 和 font-size', 'B. font-size 和 font-family', 'C. font-style 和 font-family', 'D. color 和 font-size'], answer: 'B', explanation: 'font 简写必须提供 font-size 和 font-family。' },
  { type: 'single', title: '关于 hsl() 颜色函数，H 代表什么？', options: ['A. 饱和度 (Hue)', 'B. 色相 (Hue)', 'C. 亮度 (Hue)', 'D. 十六进制 (Hex)'], answer: 'B', explanation: 'H 代表 Hue（色相），取值范围为 0-360 的角度值。' },
  { type: 'single', title: '对于不支持 rgba() 的旧版浏览器，最佳的向后兼容写法是？', options: ['A. color: rgba(0,0,0,0.5); color: #000000;', 'B. color: #000000; color: rgba(0,0,0,0.5);', 'C. 不做处理', 'D. 使用 JS 动态赋值'], answer: 'B', explanation: '由于级联规则，前面的颜色会作为不支持后面 rgba 的浏览器的回退方案。' },

  { type: 'code', title: '请编写CSS代码：将元素的文字颜色设置为半透明的红色（50%透明度），使用rgba格式。', options: [], answer: 'color: rgba(255, 0, 0, 0.5);', explanation: 'rgba(255, 0, 0, 0.5) 表示纯红色，50%的不透明度。' },
  { type: 'code', title: '请编写CSS代码：设置字体列表，首选为 "Helvetica Neue"，其次为 Helvetica，最后为系统无衬线字体族。', options: [], answer: 'font-family: "Helvetica Neue", Helvetica, sans-serif;', explanation: '包含空格的字体名需加引号，以通用字体族兜底。' },
  { type: 'code', title: '请编写CSS代码：将文字粗细设置为最粗（使用有效的最大百位数值）。', options: [], answer: 'font-weight: 900;', explanation: 'font-weight 的数值范围从 100 到 900，900 最粗。' },
  { type: 'code', title: '请编写CSS代码：将元素的字体样式设置为强制倾斜效果。', options: [], answer: 'font-style: oblique;', explanation: 'oblique 用于将正常字体通过几何倾斜模拟斜体。' },
  { type: 'code', title: '请编写CSS代码：使用 font 简写属性，同时设置字体大小为 14px，行高为 1.5，字体族为 Arial。', options: [], answer: 'font: 14px/1.5 Arial;', explanation: '大小和行高用斜杠分隔，后面跟字体族。' }
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
