import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: 'CSS简介',
  content: `### CSS简介\n\nCSS（Cascading Style Sheets）层叠样式表，又叫级联样式表。用于HTML文档中元素样式的定义。后缀名为.css。\n\n**语法**\nCSS规则由两个主要的部分构成：选择器，以及一条或多条声明（样式）。\n* 选择器通常是你需要改变样式的 HTML 元素。\n* 每条声明由一个属性和一个值组成，属性与值被冒号分开，声明之间用分号隔开。\n\n\`\`\`css\nh1 {\n  color: blue;\n  font-size: 12px;\n}\n\`\`\``
};

const questions = [
  { type: 'single', title: 'CSS的全称是什么？', options: ['Cascading Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'], answer: 'A', explanation: 'CSS全称为Cascading Style Sheets，即层叠样式表。' },
  { type: 'single', title: 'CSS的主要作用是什么？', options: ['定义网页的结构', '定义网页的样式和布局', '实现网页的交互逻辑', '管理数据库'], answer: 'B', explanation: 'CSS用于定义HTML文档中元素的样式和布局。' },
  { type: 'single', title: 'CSS文件的标准后缀名是什么？', options: ['.html', '.js', '.css', '.style'], answer: 'C', explanation: 'CSS文件的标准后缀名为.css。' },
  { type: 'single', title: 'CSS规则主要由哪两个部分构成？', options: ['标签和属性', '选择器和声明', '头部和主体', '元素和类'], answer: 'B', explanation: 'CSS规则由选择器和一条或多条声明构成。' },
  { type: 'single', title: '在CSS语法中，声明由什么组成？', options: ['属性和值', '选择器和值', '标签和属性', '类和ID'], answer: 'A', explanation: '每条声明由一个属性和一个值组成。' },
  { type: 'single', title: 'CSS声明中，属性与值之间用什么符号分隔？', options: ['分号 (;)', '冒号 (:)', '等号 (=)', '逗号 (,)'], answer: 'B', explanation: '属性与值被冒号分开。' },
  { type: 'single', title: 'CSS中，多条声明之间用什么符号隔开？', options: ['分号 (;)', '冒号 (:)', '等号 (=)', '逗号 (,)'], answer: 'A', explanation: '声明之间用分号隔开。' },
  { type: 'single', title: '以下哪个是正确的CSS语法格式？', options: ['body:color=black', '{body;color:black}', 'body {color: black;}', '{body:color=black;}'], answer: 'C', explanation: '正确的语法是：选择器 { 属性: 值; }。' },
  { type: 'single', title: '在CSS规则 `h1 { color: blue; }` 中，`h1` 称为什么？', options: ['属性', '值', '选择器', '声明'], answer: 'C', explanation: 'h1是选择器，指向需要改变样式的HTML元素。' },
  { type: 'single', title: '在CSS规则 `h1 { color: blue; }` 中，`color` 称为什么？', options: ['选择器', '属性', '值', '声明'], answer: 'B', explanation: 'color是CSS属性。' },
  { type: 'single', title: '在CSS规则 `h1 { color: blue; }` 中，`blue` 称为什么？', options: ['选择器', '属性', '值', '声明'], answer: 'C', explanation: 'blue是属性color的值。' },
  { type: 'single', title: '关于CSS的“层叠”特性，理解错误的是？', options: ['多个样式可以作用于同一个元素', '样式冲突时会根据优先级决定', '后面的样式一定会覆盖前面的样式', '继承也是层叠机制的一部分'], answer: 'C', explanation: '后面的样式不一定会覆盖前面的样式，还要看选择器的优先级。' },
  { type: 'single', title: 'CSS可以用来控制什么？', options: ['文本颜色', '字体大小', '元素间距', '以上都是'], answer: 'D', explanation: 'CSS可以控制颜色、字体、间距等多种外观表现。' },
  { type: 'single', title: '如果要将段落文字设置为红色，正确的CSS是？', options: ['p {text-color: red;}', 'p {color: red;}', '<p style="color:red">', 'p {font-color: red;}'], answer: 'B', explanation: '设置文本颜色的属性是color。' },
  { type: 'single', title: '如果要将元素的字体大小设置为14像素，正确的CSS是？', options: ['font-size: 14px;', 'text-size: 14px;', 'font: 14px;', 'size: 14px;'], answer: 'A', explanation: '设置字体大小的属性是font-size。' },
  { type: 'single', title: 'CSS声明块必须包含在什么符号中？', options: ['圆括号 ()', '方括号 []', '花括号 {}', '尖括号 <>'], answer: 'C', explanation: 'CSS声明块包含在花括号 {} 中。' },
  { type: 'single', title: '可以在一个选择器后写多条声明吗？', options: ['可以，用空格隔开', '可以，用分号隔开', '不可以，必须换行写新的选择器', '可以，用逗号隔开'], answer: 'B', explanation: '多条声明放在一个声明块中，用分号隔开。' },
  { type: 'single', title: 'CSS是否区分大小写？', options: ['完全区分', '选择器区分，属性和值不区分', '属性和值区分，选择器不区分', '通常不区分（但类名/ID可能因HTML版本而异）'], answer: 'D', explanation: 'CSS本身大部分不区分大小写，但HTML中的类名和ID在某些情况下区分大小写。' },
  { type: 'single', title: 'CSS中单行注释的正确语法是？', options: ['// 注释内容', '/* 注释内容 */', '<!-- 注释内容 -->', '# 注释内容'], answer: 'B', explanation: 'CSS注释使用 /* ... */，没有单行 // 注释（除非在预处理器中）。' },
  { type: 'single', title: '以下关于CSS的说法，正确的是？', options: ['CSS必须写在HTML文件中', 'CSS只能用于改变文字颜色', 'CSS使内容与表现分离', 'CSS是编程语言'], answer: 'C', explanation: 'CSS主要作用是实现HTML结构和样式的分离。' },
  { type: 'code', title: '编写一个CSS规则，将所有 `p` 元素的文本颜色设置为绿色（green）。', options: [], answer: 'p { color: green; }', explanation: '选择器为p，属性为color，值为green。' },
  { type: 'code', title: '编写一个CSS规则，将所有 `h2` 元素的字体大小设置为 `24px`。', options: [], answer: 'h2 { font-size: 24px; }', explanation: '选择器为h2，属性为font-size，值为24px。' },
  { type: 'code', title: '编写一个CSS规则，同时设置 `div` 元素的文本颜色为 `#333` 且字体大小为 `16px`。', options: [], answer: 'div { color: #333; font-size: 16px; }', explanation: '在声明块中包含两条声明，用分号隔开。' },
  { type: 'code', title: '编写一个CSS规则，将 `body` 的背景颜色（background-color）设置为 `#f0f0f0`。', options: [], answer: 'body { background-color: #f0f0f0; }', explanation: '设置背景颜色使用background-color属性。' },
  { type: 'code', title: '编写一段包含CSS注释的样式，注释内容为"主标题样式"，并给 `h1` 设置 `font-weight: bold;`。', options: [], answer: '/* 主标题样式 */\nh1 { font-weight: bold; }', explanation: 'CSS注释使用 /* */ 包裹。' }
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
