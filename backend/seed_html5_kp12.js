import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第一章：HTML5',
  knowledge_point: 'Form表单',
  content: `### Form表单\n\n表单是一个包含表单元素的区域。表单元素是允许用户在表单中输入内容，比如：文本域(textarea)、下拉列表、单选框(radio-buttons)、复选框(checkboxes)等等。\n表单使用表单标签 <form> 来设置。\n\n**核心属性：**\n* action：规定当提交表单时，向何处发送表单数据。\n* method：规定用于发送 form-data 的 HTTP 方法。(常用：GET, POST)`
};

const questions = [
  { type: 'single', title: 'HTML中定义表单的标签是哪一个？', options: ['A: <form>', 'B: <input>', 'C: <table>', 'D: <fieldset>'], answer: 'A', explanation: '<form> 标签用于创建供用户输入的 HTML 表单。' },
  { type: 'single', title: '表单标签 <form> 的 action 属性作用是什么？', options: ['A: 指定表单提交的 HTTP 方法', 'B: 规定当提交表单时，向何处发送表单数据', 'C: 定义表单的名称', 'D: 设置表单的字符编码'], answer: 'B', explanation: 'action 属性定义了在提交表单时执行的动作，通常是一个处理表单数据的服务器端脚本的URL。' },
  { type: 'single', title: '表单标签 <form> 的 method 属性常用的值有哪些？', options: ['A: IN 和 OUT', 'B: SUBMIT 和 RESET', 'C: GET 和 POST', 'D: ACTION 和 METHOD'], answer: 'C', explanation: 'method 属性规定用于发送表单数据的 HTTP 方法，最常用的是 GET 和 POST。' },
  { type: 'single', title: '使用 GET 方法提交表单时，表单数据会附加在哪里？', options: ['A: HTTP 请求体中', 'B: URL 之后', 'C: HTTP 响应头中', 'D: 浏览器的本地存储中'], answer: 'B', explanation: 'GET 方法会将表单数据附加在 action 属性指定的 URL 之后，以问号分隔。' },
  { type: 'single', title: '关于 POST 方法，下列说法正确的是？', options: ['A: 适合提交大量数据', 'B: 数据会显示在 URL 中', 'C: 只支持 ASCII 字符', 'D: 书签可以保存 POST 请求'], answer: 'A', explanation: 'POST 方法将数据包含在 HTTP 请求体中，没有大小限制，适合提交大量数据或敏感信息，并且数据不会显示在 URL 中。' },
  { type: 'single', title: '如果省略 <form> 的 method 属性，默认值是什么？', options: ['A: POST', 'B: GET', 'C: PUT', 'D: DELETE'], answer: 'B', explanation: '如果没有明确指定 method 属性，浏览器默认使用 GET 方法提交表单。' },
  { type: 'single', title: '包含敏感信息的表单（如密码）应该使用哪种 method？', options: ['A: GET', 'B: POST', 'C: OPTIONS', 'D: HEAD'], answer: 'B', explanation: '因为 GET 会将数据显示在 URL 中，容易被截获或记录在历史记录中，所以敏感信息必须使用 POST。' },
  { type: 'single', title: '哪个属性可以指定表单提交的目标窗口？', options: ['A: name', 'B: target', 'C: rel', 'D: type'], answer: 'B', explanation: 'target 属性规定在何处打开 action URL。例如 _blank 会在新窗口或标签页中打开。' },
  { type: 'single', title: '表单元素通常放在哪个标签内部？', options: ['A: <body>', 'B: <form>', 'C: <input>', 'D: <div>'], answer: 'B', explanation: '表单元素（如 input, select, textarea）被包含在 <form> 标签内部，构成完整的表单。' },
  { type: 'single', title: '提交表单通常使用哪种类型的按钮？', options: ['A: <button type="button">', 'B: <input type="text">', 'C: <input type="submit">', 'D: <a href="#">'], answer: 'C', explanation: '<input type="submit"> 或 <button type="submit"> 会渲染为一个提交按钮，点击后触发表单提交。' },
  { type: 'single', title: '如果要上传文件，<form> 的 enctype 属性必须设置为什么？', options: ['A: application/x-www-form-urlencoded', 'B: multipart/form-data', 'C: text/plain', 'D: application/json'], answer: 'B', explanation: '上传文件时，必须将 enctype 属性设置为 multipart/form-data。' },
  { type: 'single', title: 'GET 和 POST 方法在书签方面有什么区别？', options: ['A: 都可以被收藏为书签', 'B: 都不可以被收藏为书签', 'C: GET 可以被收藏，POST 不能', 'D: POST 可以被收藏，GET 不能'], answer: 'C', explanation: '因为 GET 请求的参数在 URL 中，所以可以将带有参数的页面收藏为书签；而 POST 不能。' },
  { type: 'single', title: '哪种表单提交方法对数据长度没有限制？', options: ['A: GET', 'B: POST', 'C: 都有', 'D: 都没有'], answer: 'B', explanation: 'GET 方法由于 URL 长度限制，对数据长度有限制；而 POST 方法没有大小限制。' },
  { type: 'single', title: '如果 action 属性为空（action=""），表单提交到哪里？', options: ['A: 根目录', 'B: 当前页面', 'C: 404 页面', 'D: 不会提交'], answer: 'B', explanation: '当 action 属性为空或省略时，表单会提交到当前的 URL。' },
  { type: 'single', title: '下列哪个元素不是表单控件？', options: ['A: <textarea>', 'B: <select>', 'C: <input>', 'D: <span>'], answer: 'D', explanation: '<span> 是一个通用的内联容器，本身不具备收集用户输入的功能，不是表单控件。' },
  { type: 'single', title: '想要防止表单自动填充功能，应该设置哪个属性？', options: ['A: autocomplete="off"', 'B: autofill="no"', 'C: readonly="true"', 'D: disabled="disabled"'], answer: 'A', explanation: 'autocomplete 属性规定表单是否应该启用自动完成功能。设置为 off 可以关闭自动填充。' },
  { type: 'single', title: '哪个属性可以规定提交表单时使用的字符编码？', options: ['A: accept-charset', 'B: charset', 'C: encoding', 'D: enctype'], answer: 'A', explanation: 'accept-charset 属性规定服务器处理表单数据所接受的字符集。' },
  { type: 'single', title: '表单中 name 属性的作用是什么？', options: ['A: 为表单提供唯一标识，用于 CSS 样式', 'B: 在提交表单时，作为数据的键（key）', 'C: 设置表单的标题', 'D: 用于在客户端验证表单'], answer: 'B', explanation: '表单控件必须要有 name 属性，在提交时作为键值对的键发送给服务器。' },
  { type: 'single', title: '使用 GET 方法提交时，参数间用什么符号连接？', options: ['A: &', 'B: ?', 'C: =', 'D: #'], answer: 'A', explanation: '在 URL 中，第一个参数前用 ? 连接，后续参数之间用 & 连接。' },
  { type: 'single', title: '表单的 enctype 默认值是什么？', options: ['A: application/x-www-form-urlencoded', 'B: multipart/form-data', 'C: text/plain', 'D: application/json'], answer: 'A', explanation: '如果不指定 enctype，默认值为 application/x-www-form-urlencoded。' },

  { type: 'code', title: '编写一个 HTML 表单代码，提交方法为 POST，提交地址为 "/login"。', options: [], answer: '<form action="/login" method="POST">\n</form>', explanation: '设置 action="/login" 和 method="POST" 即可。' },
  { type: 'code', title: '如果要在表单中包含一个用于输入用户名的文本框，其键名为 "username"，应该怎么写？', options: [], answer: '<input type="text" name="username">', explanation: '使用 <input type="text"> 创建文本框，name="username" 规定提交时的键名。' },
  { type: 'code', title: '如果要在表单中包含一个用于输入密码的输入框，键名为 "pwd"，应该怎么写？', options: [], answer: '<input type="password" name="pwd">', explanation: '使用 <input type="password"> 可以隐藏输入的字符。' },
  { type: 'code', title: '编写一个能够触发上文表单提交的按钮代码。', options: [], answer: '<button type="submit">提交</button> 或 <input type="submit" value="提交">', explanation: '设置 type="submit" 的按钮点击后会自动寻找父级 form 并触发提交。' },
  { type: 'code', title: '编写一个完整的包含用户名、密码输入框及提交按钮的表单代码。', options: [], answer: '<form action="/login" method="POST">\n  <input type="text" name="username">\n  <input type="password" name="pwd">\n  <button type="submit">登录</button>\n</form>', explanation: '结合前面的元素，包含在一个 form 标签内。' }
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
    console.log(`Success KP12`);
  } catch (error) { console.error(error); } finally { await connection.end(); }
}
run();
