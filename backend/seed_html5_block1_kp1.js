import mysql from 'mysql2/promise';

const knowledgeDoc = {
  category_id: 1, 
  parent_title: "第一章：HTML5",
  knowledge_point: "第一个前端程序",
  content: `### 两步完成一个网页程序

**第一步：使用记事本，编写代码**

在目录下保存文件，后缀名为 \`.html\`，例如 \`Welcome.html\`。

\`\`\`html
<html>
	<head>
		<title>我的网页</title>
	</head>
	<body>
		Hello，我的第一个网页
	</body>
</html>
\`\`\`

> **注意事项**
> 1. 文件后缀名必须以 \`.html\` 结尾。
> 2. 在编写代码的过程中，\`<>\` 等标签符号必须在**英文半角状态**下编写。

**第二步：以浏览器方式打开**

右键文件 -> 打开方式 -> 选择浏览器打开即可预览网页效果。`
};

const questions = [
  // 20 道单选题
  { type: "single", title: "编写HTML网页文件的标准后缀名是什么？", options: ["A. .txt", "B. .html", "C. .xml", "D. .js"], answer: "B", explanation: "网页必须以 .html 结尾，浏览器才能正确识别并解析。" },
  { type: "single", title: "如果将网页文件保存为 .txt 后缀并用浏览器打开，会发生什么？", options: ["A. 浏览器会自动转换为网页", "B. 浏览器会将其作为纯文本显示", "C. 电脑会死机", "D. 浏览器会报错无法打开"], answer: "B", explanation: "没有 .html 后缀，浏览器只会将其当成普通文本，显示代码源码而不是渲染页面。" },
  { type: "single", title: "HTML标签通常使用哪种括号包围？", options: ["A. []", "B. {}", "C. <>", "D. ()"], answer: "C", explanation: "HTML标签是由尖括号 <> 包围的关键字。" },
  { type: "single", title: "在编写HTML标签（如 <html>）时，括号 `< >` 必须处于什么输入法状态？", options: ["A. 中文全角", "B. 中文半角", "C. 英文半角", "D. 英文全角"], answer: "C", explanation: "所有的HTML代码标记符号必须使用英文半角状态输入，中文括号会导致语法失效。" },
  { type: "single", title: "写完网页代码后，通常第一步如何查看实际效果？", options: ["A. 在记事本中点击运行", "B. 用浏览器打开该文件", "C. 发送给朋友查看", "D. 必须上传到服务器才能看"], answer: "B", explanation: "本地写完 .html 文件后，直接右键以浏览器方式打开即可预览网页。" },
  { type: "single", title: "以下关于网页制作工具的说法，正确的是？", options: ["A. 必须使用昂贵的专业软件", "B. 必须连接互联网才能编写", "C. 最简单的电脑自带记事本也可以编写网页", "D. 只能在Mac系统上编写"], answer: "C", explanation: "网页本质是纯文本文件，所以即使是系统自带的记事本也可以完成开发。" },
  { type: "single", title: "一个最简单的前端程序，最少需要哪几个步骤？", options: ["A. 编写代码 -> 编译 -> 运行", "B. 编写代码 -> 用浏览器打开", "C. 购买域名 -> 上传代码 -> 访问", "D. 安装数据库 -> 编写代码 -> 运行"], answer: "B", explanation: "前端三剑客是浏览器原生支持的，不需要编译过程，保存为.html后用浏览器打开即可。" },
  { type: "single", title: "以下代码中存在严重输入法错误的是？", options: ["A. <html>", "B. 《head》", "C. <body>", "D. <title>"], answer: "B", explanation: "《》 是中文书名号，不能被浏览器识别为HTML标签尖括号。" },
  { type: "single", title: "保存HTML文件时，如果文件名叫 Welcome，完整的包含后缀的文件名应该是什么？", options: ["A. Welcome.doc", "B. Welcome.txt", "C. Welcome.html", "D. Welcome.exe"], answer: "C", explanation: "只有以.html结尾，操作系统和浏览器才会将其识别为网页。" },
  { type: "single", title: "为什么建议初学者手写HTML代码（如使用记事本）？", options: ["A. 记事本代码运行更快", "B. 帮助熟悉代码基础结构和标签记忆", "C. 记事本会自动修复错误", "D. 记事本排版最好看"], answer: "B", explanation: "虽然有强大的IDE，但用最简单的工具能强制初学者熟悉标签的拼写和结构。" },
  { type: "single", title: "HTML文件中的内容如果发生修改，想要在浏览器看到最新效果，需要做什么？", options: ["A. 重装浏览器", "B. 保存文件并刷新浏览器页面", "C. 重启电脑", "D. 修改文件后缀名"], answer: "B", explanation: "修改代码后必须先保存文件 (Ctrl+S)，然后去浏览器点击刷新 (F5) 才能看到更新。" },
  { type: "single", title: "以下哪个不是HTML标签的组成部分？", options: ["A. 左尖括号 <", "B. 标签名，如 html", "C. 右尖括号 >", "D. 中文冒号 ："], answer: "D", explanation: "标签由左尖括号、标签名和右尖括号组成，不包含中文冒号。" },
  { type: "single", title: "在文档中，`<title>我的网页</title>` 这段代码的作用是？", options: ["A. 在页面正文中显示'我的网页'", "B. 在浏览器标签页上显示网页的标题", "C. 设置页面背景颜色", "D. 弹出一个提示框"], answer: "B", explanation: "title标签的内容会显示在浏览器的最上方标题栏（标签卡）中。" },
  { type: "single", title: "下面说法正确的是：网页文件的扩展名可以是 .htm 吗？", options: ["A. 不可以，完全无法识别", "B. 可以，.htm 是 .html 的缩写，同样被浏览器识别为网页", "C. 可以，但只有IE浏览器能认", "D. 可以，但会变成文本文件"], answer: "B", explanation: ".htm 和 .html 都是合法的网页后缀，历史原因早期的DOS系统只能识别3位后缀，因此有了.htm。" },
  { type: "single", title: "当你在浏览器看到自己写的 'Hello，我的第一个网页' 文本时，这些文本应该存放在哪个标签内部？", options: ["A. <head>", "B. <title>", "C. <body>", "D. <html>"], answer: "C", explanation: "所有在网页可视区域显示的内容，都应该放在 <body> 标签内部。" },
  { type: "single", title: "如果在记事本中保存时没有选择“所有文件”而保持为“文本文档”，文件最终可能会变成什么？", options: ["A. Welcome.html", "B. Welcome.html.txt", "C. Welcome.txt.html", "D. Welcome"], answer: "B", explanation: "Windows记事本默认会自动添加.txt，如果直接写Welcome.html可能最终被存为 Welcome.html.txt，这也是初学者常犯错误。" },
  { type: "single", title: "以下哪一种做法会导致标签无法闭合引发错误？", options: ["A. <html></html>", "B. <body></body>", "C. <head></head>", "D. <title><title>"], answer: "D", explanation: "结束标签必须带有斜杠 /，如 </title>。选项D缺少了斜杠。" },
  { type: "single", title: "对于前端开发，代码中的空格和换行在浏览器中的表现如何？", options: ["A. 写几个空格就显示几个空格", "B. 多个连续空格和换行通常会被浏览器合并显示为一个空格", "C. 换行会导致报错", "D. 浏览器会忽略所有文本"], answer: "B", explanation: "HTML具有空白折叠的特性，源码中的大量空格和换行在渲染时只会变成一个空格。" },
  { type: "single", title: "如果在网页中看到类似 `&lt;html&gt;` 的文字，这是什么原因？", options: ["A. 浏览器中毒", "B. 标签在英文状态下编写正确", "C. 这是HTML的转义字符，用于在页面上显示文本形式的尖括号", "D. 网络延迟"], answer: "C", explanation: "如果想在页面上直接显示 `<` 这个符号而不是被解析为标签，需要使用转义实体 `&lt;`。" },
  { type: "single", title: "对于一个纯静态的 HTML 页面，它是否需要部署到阿里云或腾讯云才能被自己电脑的浏览器打开？", options: ["A. 必须部署", "B. 需要购买域名", "C. 完全不需要，可以本地直接双击打开", "D. 必须安装 Node.js"], answer: "C", explanation: "HTML 是跑在客户端浏览器的，本地的 HTML 文件只需使用 file:// 协议直接在浏览器中打开即可运行。" },

  // 5 道实操题
  {
    type: "code", title: "请用记事本编写一个完整的极其简单的网页结构，并包含 html 标签。", options: [], 
    answer: "<html>\n</html>", explanation: "最基础的开始，包含根节点即可。"
  },
  {
    type: "code", title: "在根节点中添加头部 (head) 和主体 (body) 区域。", options: [], 
    answer: "<html>\n  <head>\n  </head>\n  <body>\n  </body>\n</html>", explanation: "一个合法的HTML必然分为head和body两个大区域。"
  },
  {
    type: "code", title: "在头部区域中添加网页的标题标签，标题内容为：首页。", options: [], 
    answer: "<head>\n  <title>首页</title>\n</head>", explanation: "title标签用于描述网页的标题，放在head标签内。"
  },
  {
    type: "code", title: "在主体区域中添加一段你想展示给用户看的纯文字内容：Hello World。", options: [], 
    answer: "<body>\n  Hello World\n</body>", explanation: "页面主体内容应直接放置在 body 标签中。"
  },
  {
    type: "code", title: "请检查以下这段有输入法错误的残缺代码，并将其修正为正确的英文半角格式：\n《html》\n  《body》我是内容《/body》\n《/html》", options: [], 
    answer: "<html>\n  <body>我是内容</body>\n</html>", explanation: "必须将中文书名号替换为英文的尖括号，浏览器才能正确将其识别为标签。"
  }
];

async function run() {
  const pool = mysql.createPool({ host: 'localhost', user: 'root', password: '', database: 'frontend_bible' });
  let [catRows] = await pool.query('SELECT id FROM categories WHERE name = ?', ['HTML5']);
  let categoryId = catRows[0].id;
  
  await pool.query(
    'INSERT INTO knowledge_docs (category_id, parent_title, knowledge_point, content, created_at) VALUES (?, ?, ?, ?, UNIX_TIMESTAMP())',
    [categoryId, knowledgeDoc.parent_title, knowledgeDoc.knowledge_point, knowledgeDoc.content]
  );
  
  for (const q of questions) {
     let optionsStr = JSON.stringify(q.options);
     await pool.query(
       'INSERT INTO questions (category_id, knowledge_point, type, title, options, answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?)',
       [categoryId, knowledgeDoc.knowledge_point, q.type, q.title, optionsStr, q.answer, q.explanation]
     );
  }
  process.exit(0);
}
run();
