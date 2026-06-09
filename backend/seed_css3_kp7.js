import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '文本属性',
  content: `### 文本属性\n\n* **text-align**：水平对齐方式 (left, right, center, justify)\n* **text-decoration**：文本修饰 (underline 下划线, overline 上划线, line-through 删除线, none)\n* **text-transform**：控制大小写 (capitalize 首字母大写, uppercase 全大写, lowercase 全小写)\n* **text-indent**：首行文本缩进 (可为负值)`
};

const questions = [
  { type: 'single', title: 'CSS中用于设置文本水平对齐方式的属性是？', options: ['A. text-align', 'B. vertical-align', 'C. text-indent', 'D. text-decoration'], answer: 'A', explanation: 'text-align用于设置文本的水平对齐方式，如left、right、center等。' },
  { type: 'single', title: '以下哪个text-align的值可以使文本两端对齐？', options: ['A. center', 'B. justify', 'C. left', 'D. right'], answer: 'B', explanation: 'justify可以使文本两端对齐，常用于多行文本的排版。' },
  { type: 'single', title: '要去除超链接默认的下划线，应使用哪个CSS属性和值？', options: ['A. text-style: none;', 'B. text-decoration: none;', 'C. font-style: normal;', 'D. text-decoration: underline none;'], answer: 'B', explanation: 'text-decoration: none; 用于去除文本的所有修饰，包括下划线。' },
  { type: 'single', title: 'text-transform: capitalize; 的作用是什么？', options: ['A. 将所有字母转换为大写', 'B. 将所有字母转换为小写', 'C. 将每个单词的首字母转换为大写', 'D. 将首行首字母转换为大写'], answer: 'C', explanation: 'capitalize会将文本中每个单词的首字母转换为大写。' },
  { type: 'single', title: 'text-indent 属性支持负值吗？', options: ['A. 不支持，只能为正值或0', 'B. 支持，通常用于隐藏文本（如-9999px）', 'C. 支持，但只在块级元素中生效', 'D. 不支持，使用负值会导致页面报错'], answer: 'B', explanation: 'text-indent支持负值，以前常用于配合背景图实现SEO友好的图像替换技术（text-indent: -9999px）。' },
  { type: 'single', title: 'CSS3中text-decoration的新增属性text-decoration-line不包括以下哪个值？', options: ['A. underline', 'B. overline', 'C. line-through', 'D. double'], answer: 'D', explanation: 'double是text-decoration-style的值，而非text-decoration-line。' },
  { type: 'single', title: '在HTML中，<del>标签默认的文本修饰效果对应CSS的哪个属性值？', options: ['A. text-decoration: underline;', 'B. text-decoration: overline;', 'C. text-decoration: line-through;', 'D. text-decoration: none;'], answer: 'C', explanation: '<del>标签表示被删除的文本，默认带有删除线，对应 line-through。' },
  { type: 'single', title: '如何将一段包含大小写混合的文本全部强制显示为大写？', options: ['A. text-transform: uppercase;', 'B. text-transform: capitalize;', 'C. text-transform: full-size-kana;', 'D. font-variant: small-caps;'], answer: 'A', explanation: 'uppercase强制所有字母大写。' },
  { type: 'single', title: 'text-align: center; 对以下哪种元素直接生效？', options: ['A. 块级元素本身的居中', 'B. 块级元素内部的行内元素和文本居中', 'C. 绝对定位的元素', 'D. 浮动的元素'], answer: 'B', explanation: 'text-align控制的是容器内部的行内级内容（文本、行内元素、行内块元素）水平对齐。' },
  { type: 'single', title: '关于text-indent的百分比值，它是相对于什么计算的？', options: ['A. 相对于自身的字体大小', 'B. 相对于视口的宽度', 'C. 相对于包含块的宽度', 'D. 相对于包含块的高度'], answer: 'C', explanation: 'text-indent如果使用百分比，是相对于其包含块（通常是父元素）的宽度计算的。' },
  { type: 'single', title: '要实现首字下沉效果，通常结合text-indent与哪个伪元素？', options: ['A. ::before', 'B. ::first-line', 'C. ::first-letter', 'D. ::after'], answer: 'C', explanation: '::first-letter用于选中块级元素的首字母，常用于实现首字下沉。' },
  { type: 'single', title: 'text-transform: lowercase; 的效果是？', options: ['A. 所有字母转小写', 'B. 首字母转小写', 'C. 将小写字母转大写', 'D. 清除大小写转换效果'], answer: 'A', explanation: 'lowercase将文本中所有字母强制转换为小写。' },
  { type: 'single', title: '如果一个元素同时设置了 text-decoration: underline; 和 text-decoration: line-through;，在CSS3中可以通过什么方式简写？', options: ['A. text-decoration: underline line-through;', 'B. 无法同时存在', 'C. text-decoration: all;', 'D. text-decoration: underline, line-through;'], answer: 'A', explanation: '在CSS3中，text-decoration-line可以接受多个值，空格分隔。' },
  { type: 'single', title: 'text-align: justify; 在单行文本中默认会生效吗？', options: ['A. 会生效', 'B. 不会生效，除非搭配text-align-last', 'C. 只在英文中生效', 'D. 只在包含中英文混合时生效'], answer: 'B', explanation: 'justify默认对最后一行（或单行）不生效，需要使用text-align-last: justify来控制最后一行。' },
  { type: 'single', title: '以下哪个属性可以用来改变下划线的颜色？', options: ['A. text-decoration-color', 'B. text-underline-color', 'C. color', 'D. text-line-color'], answer: 'A', explanation: 'CSS3引入了text-decoration-color专门用于设置文本修饰线的颜色。' },
  { type: 'single', title: '关于text-decoration的继承性，以下说法正确的是？', options: ['A. 会被子元素继承且子元素无法取消', 'B. 不会被子元素继承，但视觉上会延伸到子元素', 'C. 会被子元素继承，子元素可以设置none取消', 'D. 仅在行内元素间继承'], answer: 'B', explanation: 'text-decoration严格来说不继承，但祖先元素的装饰线会“穿过”子元素，子元素设置none无法去除祖先画的线。' },
  { type: 'single', title: 'text-indent 属性可以应用于行内元素吗？', options: ['A. 可以', 'B. 不可以，只能应用于块级容器或行内块元素', 'C. 仅当行内元素设置为绝对定位时', 'D. 仅在部分浏览器支持'], answer: 'B', explanation: 'text-indent只对块级元素或inline-block、table-cell等容器生效，对纯inline元素无效。' },
  { type: 'single', title: 'text-transform 设置为 none 的作用是？', options: ['A. 隐藏文本', 'B. 恢复文本在HTML中原本的大小写状态', 'C. 清除文本的下划线', 'D. 将文本变为系统默认字体'], answer: 'B', explanation: 'none是text-transform的默认值，表示不改变文本大小写。' },
  { type: 'single', title: '如何将文本的下划线样式变为波浪线？', options: ['A. text-decoration-style: wavy;', 'B. text-decoration: wavy underline;', 'C. text-decoration-line: wave;', 'D. text-style: wave;'], answer: 'A', explanation: 'text-decoration-style: wavy; 可以将修饰线变为波浪线。' },
  { type: 'single', title: 'text-align 属性的默认值通常是？', options: ['A. left', 'B. start (取决于文档的文字方向)', 'C. right', 'D. justify'], answer: 'B', explanation: '现代浏览器中，text-align默认值是start，如果是从左到右(LTR)语言则表现为left。' },
  { type: 'code', title: '使用CSS将类名为.title的元素文本水平居中，并将其所有字母转换为大写。', options: [], answer: '.title { text-align: center; text-transform: uppercase; }', explanation: '考察text-align和text-transform的基础用法。' },
  { type: 'code', title: '给定一段带有类名.desc的段落，请使用CSS设置其首行缩进2个中文字符的宽度（假设字体大小为16px）。', options: [], answer: '.desc { text-indent: 2em; }', explanation: '使用em单位进行缩进是最合理的，2em即等于当前字体大小的2倍宽。' },
  { type: 'code', title: '请编写CSS代码，为带有.price类名的元素添加红色的删除线。', options: [], answer: '.price { text-decoration: line-through red; }', explanation: 'text-decoration可以作为简写属性，同时设置线型和颜色。' },
  { type: 'code', title: '如何通过CSS使类名为.nav-link的<a>标签在正常状态下没有下划线，在鼠标悬停时显示下划线？', options: [], answer: '.nav-link { text-decoration: none; }\n.nav-link:hover { text-decoration: underline; }', explanation: '考察伪类和text-decoration属性的配合。' },
  { type: 'code', title: '请使用CSS使类名为.justify-text的块级元素内多行文本两端对齐，并且确保最后一行也两端对齐。', options: [], answer: '.justify-text { text-align: justify; text-align-last: justify; }', explanation: 'text-align: justify控制多行对齐，text-align-last: justify控制最后一行的对齐。' }
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
