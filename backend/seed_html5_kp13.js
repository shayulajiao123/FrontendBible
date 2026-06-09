import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第一章：HTML5',
  knowledge_point: '表单元素',
  content: `### 表单元素\n\n表单元素包含在 <form> 标签内部，用于接收用户输入。\n\n**1. <input> 元素**\n是最重要的表单元素，根据 type 属性的不同有很多形态：\n* type="text"：常规文本输入\n* type="password"：密码输入（字符会被掩码隐藏）\n* type="radio"：单选按钮（同一组需要相同的 name）\n* type="checkbox"：复选框\n* type="submit"：提交按钮，点击后触发表单提交\n* type="button"：普通按钮\n\n**2. 其他元素**\n* <textarea>：多行文本输入框\n* <select> & <option>：下拉列表`
};

const questions = [
  { type: 'single', title: '关于 HTML5 表单，哪个元素是表单输入的基础？', options: ['<input>', '<form>', '<select>', '<button>'], answer: 'A', explanation: '<input> 是最重要的表单输入元素。' },
  { type: 'single', title: '以下哪个 type 值可以将 <input> 渲染为密码输入框？', options: ['text', 'password', 'hidden', 'encrypt'], answer: 'B', explanation: 'type="password" 用于密码输入，字符会被掩码隐藏。' },
  { type: 'single', title: '单选按钮需要设置什么相同的属性才能实现互斥选择？', options: ['id', 'class', 'name', 'value'], answer: 'C', explanation: '同一组单选按钮需要相同的 name 属性才能实现互斥。' },
  { type: 'single', title: '想要创建一个复选框，应该将 <input> 的 type 属性设置为？', options: ['check', 'checkbox', 'box', 'multiple'], answer: 'B', explanation: 'type="checkbox" 用于生成复选框。' },
  { type: 'single', title: '下面哪个标签用于创建下拉列表？', options: ['<dropdown>', '<list>', '<select>', '<option>'], answer: 'C', explanation: '<select> 标签用于创建下拉列表。' },
  { type: 'single', title: '<select> 标签内必须嵌套什么标签才能显示选项？', options: ['<item>', '<option>', '<li>', '<choice>'], answer: 'B', explanation: '<select> 中需要使用 <option> 定义每个选项。' },
  { type: 'single', title: '用于接收多行文本输入的标签是？', options: ['<input type="textarea">', '<textarea>', '<text>', '<multiline>'], answer: 'B', explanation: '<textarea> 用于多行文本输入。' },
  { type: 'single', title: '点击后能够触发表单默认提交行为的表单元素类型是？', options: ['type="button"', 'type="submit"', 'type="reset"', 'type="action"'], answer: 'B', explanation: 'type="submit" 为提交按钮，点击后会触发表单提交。' },
  { type: 'single', title: '<input type="text"> 默认提供哪种类型的输入？', options: ['密码输入', '多行文本', '常规文本输入', '数字输入'], answer: 'C', explanation: 'type="text" 是最普通的单行文本输入。' },
  { type: 'single', title: '哪种按钮点击后默认不会进行表单提交？', options: ['<input type="submit">', '<input type="button">', '<button type="submit">', '<input type="image">'], answer: 'B', explanation: '<input type="button"> 只是普通按钮，没有默认的提交行为。' },
  { type: 'single', title: '<input type="radio"> 表示什么？', options: ['单选按钮', '播放电台', '复选框', '提交按钮'], answer: 'A', explanation: 'type="radio" 渲染为单选按钮。' },
  { type: 'single', title: '如果一个页面有两组独立的单选按钮，应该怎么处理？', options: ['两组共用一个 name', '每组使用不同的 name 属性', '不需要 name 属性', '只能使用一组'], answer: 'B', explanation: '不同组的单选按钮应使用不同的 name 属性进行区分。' },
  { type: 'single', title: '下面关于 <input> 标签描述错误的是？', options: ['是最重要的表单元素', '可以根据 type 属性改变形态', '必须包含结束标签 </input>', '常用在 <form> 中'], answer: 'C', explanation: '<input> 是单标签，不需要 </input> 结束标签。' },
  { type: 'single', title: '当 type="password" 时，输入的字符会有什么表现？', options: ['变成红色', '会被掩码隐藏', '自动大写', '无法输入数字'], answer: 'B', explanation: '密码输入框会将字符用圆点或星号等掩码隐藏。' },
  { type: 'single', title: '想要表示一组选项中的多个可选项，应该使用？', options: ['type="radio"', 'type="checkbox"', 'type="text"', '<select> 单选'], answer: 'B', explanation: 'checkbox 复选框允许选择多个选项。' },
  { type: 'single', title: '<form> 标签的主要作用是？', options: ['绘制表格', '包裹表单元素并接收用户输入', '布局页面', '播放视频'], answer: 'B', explanation: '<form> 用于包裹各项表单控件以收集数据。' },
  { type: 'single', title: '<input type="submit"> 的作用是？', options: ['重置表单', '提交表单', '关闭页面', '取消输入'], answer: 'B', explanation: '它的作用是提交所在的表单数据。' },
  { type: 'single', title: '以下哪个元素不属于表单元素？', options: ['<input>', '<textarea>', '<div>', '<select>'], answer: 'C', explanation: '<div> 是块级容器，不是表单元素。' },
  { type: 'single', title: '对于 <textarea>，说法正确的是？', options: ['它是单标签元素', '用于多行文本输入', '不能设置行列大小', '和 <input type="text"> 完全一样'], answer: 'B', explanation: '<textarea> 可以接收多行文本，是双标签。' },
  { type: 'single', title: '下拉列表的每个选项使用哪个标签定义？', options: ['<select>', '<dropdown>', '<optgroup>', '<option>'], answer: 'D', explanation: '下拉列表的选项是由 <option> 定义的。' },
  { type: 'code', title: '请写出一个包含名为 "username" 的普通文本输入框的代码。', options: [], answer: '<input type="text" name="username">', explanation: 'type="text" 指定为文本框，name 属性指定字段名。' },
  { type: 'code', title: '请写出一个包含男、女两个选项的单选按钮组，name 属性均为 "gender"（要求两个 input 标签紧挨着即可）。', options: [], answer: '<input type="radio" name="gender" value="male"><input type="radio" name="gender" value="female">', explanation: '使用 type="radio" 且 name 相同即可组成一组。' },
  { type: 'code', title: '写出一个包含 "北京(beijing)" 和 "上海(shanghai)" 的下拉列表代码，name 属性为 "city"。', options: [], answer: '<select name="city"><option value="beijing">北京</option><option value="shanghai">上海</option></select>', explanation: '<select> 内嵌 <option>。' },
  { type: 'code', title: '如何编写一个多行文本输入框，name 为 "description"？', options: [], answer: '<textarea name="description"></textarea>', explanation: '多行文本框使用 <textarea>。' },
  { type: 'code', title: '请写出一个用于提交表单的 input 按钮，显示文字为 "登录"。', options: [], answer: '<input type="submit" value="登录">', explanation: 'type="submit" 且 value 属性决定按钮文字。' }
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
    console.log(`Success KP13`);
  } catch (error) { console.error(error); } finally { await connection.end(); }
}
run();
