import mysql from 'mysql2/promise';

const knowledgeDoc = {
  category_id: 1, // 假设 HTML5 是 category_id=1, 等下动态查或者插
  parent_title: "第一章：HTML5",
  knowledge_point: "HTML5简介与基础骨架",
  content: `### HTML5简介

HTML5是用来描述网页的一种语言，被称为超文本标记语言。用HTML5编写的文件，后缀以\`.html\`结尾。
HTML是一种标记语言，标记语言是一套标记标签。标签是由尖括号包围的关键字，例如：\`<html>\`
标签有两种表现形式：
1. 双标签，例如：\`<html></html>\`
2. 单标签，例如：\`<img>\`

### HTML5的DOCTYPE声明

DOCTYPE是\`document type\` (文档类型) 的缩写。\`<!DOCTYPE html>\` 是H5的声明，位于文档的最前面，处于html标签之前。它是网页必备的组成部分，可避免浏览器的怪异模式。

### HTML5基本骨架

\`\`\`html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>页面标题</title>
    </head>
    <body>
        页面主体内容
    </body>
</html>
\`\`\`

#### 各骨架标签说明

1. **html标签**：定义 HTML 文档，这个元素限定了文档的开始点和结束点。所有其它元素要包裹在它里面。
2. **head标签**：用于定义文档的头部，描述了文档的各种属性和信息（包括标题、字符集、和其他文档关系等）。这些不会直观显示给读者。
3. **body标签**：定义文档的主体。包含文档的所有直观内容（如文本、图像、链接等）。
4. **title标签**：定义文档的标题，显示在浏览器窗口的标题栏或状态栏。它是 \`<head>\` 中唯一必须包含的标签，有利于 SEO 优化。
5. **meta标签**：用来描述 HTML 网页文档的属性。例如 \`<meta charset="UTF-8">\` 定义了网页使用的是 utf-8 编码格式。`
};

const questions = [
  // --- 20道选择题 ---
  {
    type: "single",
    title: "HTML5文件标准的后缀名是什么？",
    options: [".txt", ".h5", ".html", ".web"],
    answer: ".html",
    explanation: "用HTML5编写的文件，后缀必须以 `.html` 结尾。"
  },
  {
    type: "single",
    title: "HTML的全称指的是什么？",
    options: ["超文本传输协议", "超文本标记语言", "级联样式表", "浏览器脚本语言"],
    answer: "超文本标记语言",
    explanation: "HTML是一种标记语言，被称为超文本标记语言（HyperText Markup Language）。"
  },
  {
    type: "single",
    title: "以下哪个是HTML单标签的正确写法？",
    options: ["<img/>", "<html></html>", "<p></p>", "<div>"],
    answer: "<img/>",
    explanation: "标签有两种表现形式：单标签和双标签。`<img>`或`<img/>` 是典型的单标签。"
  },
  {
    type: "single",
    title: "以下哪个是HTML双标签？",
    options: ["<img>", "<hr>", "<br>", "<title></title>"],
    answer: "<title></title>",
    explanation: "双标签必须成对出现，包含开始标签和结束标签，例如 `<title></title>`。"
  },
  {
    type: "single",
    title: "在HTML中，标签通常是由什么符号包围的关键字？",
    options: ["中括号 []", "尖括号 <>", "大括号 {}", "小括号 ()"],
    answer: "尖括号 <>",
    explanation: "标签是由尖括号包围的关键字，例如：`<html>`。"
  },
  {
    type: "single",
    title: "DOCTYPE声明在HTML5中的正确书写格式是什么？",
    options: ["<!DOCTYPE HTML PUBLIC>", "<!DOCTYPE html>", "<?xml version=\"1.0\"?>", "<!html>"],
    answer: "<!DOCTYPE html>",
    explanation: "在HTML5中，声明极其简单，统一使用 `<!DOCTYPE html>` 即可。"
  },
  {
    type: "single",
    title: "DOCTYPE声明的完整英文全称缩写代表什么？",
    options: ["Document Title", "Document Type", "Data Type", "Domain Type"],
    answer: "Document Type",
    explanation: "DOCTYPE是 `document type` (文档类型) 的缩写。"
  },
  {
    type: "single",
    title: "在HTML5文档最前方加上DOCTYPE声明的主要作用是什么？",
    options: ["引入CSS样式", "避免浏览器的怪异模式", "运行JavaScript", "连接数据库"],
    answer: "避免浏览器的怪异模式",
    explanation: "它是网页必备的组成部分，主要作用是告知浏览器当前文档使用的标准，避免浏览器进入怪异模式（Quirks Mode）而导致渲染错误。"
  },
  {
    type: "single",
    title: "HTML5文档结构中，所有其它HTML元素（除了DOCTYPE）都必须包裹在哪个根标签内？",
    options: ["<body>", "<head>", "<html>", "<title>"],
    answer: "<html>",
    explanation: "html标签定义 HTML 文档，它限定了文档的开始点和结束点。所有其它元素要包裹在它里面。"
  },
  {
    type: "single",
    title: "head 标签的核心作用是什么？",
    options: ["展示网页的主体内容", "定义文档的头部信息和属性", "在页面中插入图片", "播放网页视频"],
    answer: "定义文档的头部信息和属性",
    explanation: "head标签用于定义文档的头部，描述了文档的各种属性和信息，这些内容绝大多数不会直接显示在页面主体中。"
  },
  {
    type: "single",
    title: "以下哪个标签内的内容不会直观地显示在网页浏览器的主体可视区域中？",
    options: ["<p>", "<head>", "<body>", "<h1>"],
    answer: "<head>",
    explanation: "head 标签中的内容（如 meta、title）是对文档自身的配置和描述，不会在网页的白色画布（可视区）上展示给用户看。"
  },
  {
    type: "single",
    title: "网页中供用户直接观看的所有可视内容（如文本、图像、链接），应该存放在哪个标签中？",
    options: ["<title>", "<body>", "<head>", "<meta>"],
    answer: "<body>",
    explanation: "body 元素定义文档的主体。它会直接在页面中显示出来，也就是用户可以直观看到的内容。"
  },
  {
    type: "single",
    title: "title 标签必须包含在哪个父级标签内部？",
    options: ["<body>", "<head>", "<html>", "<meta>"],
    answer: "<head>",
    explanation: "`<title>` 标签是 `<head>` 标签中唯一必须要求包含的子元素。"
  },
  {
    type: "single",
    title: "以下关于 title 标签的描述，错误的是？",
    options: ["它是<head>中唯一必须包含的标签", "它定义了文档的标题", "它的内容会直接大字显示在网页正文中央", "增加它有利于SEO优化"],
    answer: "它的内容会直接大字显示在网页正文中央",
    explanation: "title 的文本只会显示在浏览器窗口的顶部标题栏或标签页上，而不会显示在网页的主体正文中。"
  },
  {
    type: "single",
    title: "在网页开发中，SEO 的中文全称是指什么？",
    options: ["搜索引擎优化", "网页结构优化", "页面渲染引擎", "数据请求优化"],
    answer: "搜索引擎优化",
    explanation: "SEO（Search Engine Optimization）是搜索引擎优化的英文缩写，通过对网站内容的调整来满足搜索引擎的排名需求。"
  },
  {
    type: "single",
    title: "<meta charset=\"UTF-8\"> 这个标签的作用是什么？",
    options: ["设置网页的可视宽度", "设置网页使用的字符编码格式为 UTF-8", "引入外部中文字体", "加载外部脚本文件"],
    answer: "设置网页使用的字符编码格式为 UTF-8",
    explanation: "charset属性用于指定网页的字符编码。UTF-8是目前最通用、涵盖字符最全的国际编码，可以有效防止乱码。"
  },
  {
    type: "single",
    title: "如果不写 DOCTYPE 声明，浏览器在渲染页面时通常会进入什么模式？",
    options: ["标准模式", "怪异模式(Quirks Mode)", "严格模式", "兼容模式"],
    answer: "怪异模式(Quirks Mode)",
    explanation: "缺少DOCTYPE声明会导致浏览器无法确定HTML标准版本，从而进入怪异模式，以兼容老旧的不规范代码，这常常会导致CSS布局错乱。"
  },
  {
    type: "single",
    title: "以下哪个标签组合构成了一个完整的HTML页面的根节点？",
    options: ["<body></body>", "<html></html>", "<head></head>", "<title></title>"],
    answer: "<html></html>",
    explanation: "<html> 是整个 HTML 文档的根节点，它包含了 <head> 和 <body> 两个主要部分。"
  },
  {
    type: "single",
    title: "想要在浏览器标签页的顶部标题栏上显示“我的网站”字样，应该使用什么标签？",
    options: ["<header>我的网站</header>", "<title>我的网站</title>", "<h1>我的网站</h1>", "<meta name=\"我的网站\">"],
    answer: "<title>我的网站</title>",
    explanation: "title 标签用于定义文档的标题，它正是显示在浏览器顶部标签页上的文本。"
  },
  {
    type: "single",
    title: "meta 标签作为配置项，通常应当写在哪个闭合标签的内部？",
    options: ["<body>", "<html>", "<head>", "<footer>"],
    answer: "<head>",
    explanation: "meta、title、link、style等配置和引入文件的标签，通常都统一放置在 <head> 标签内部。"
  },

  // --- 5道实操题 ---
  {
    type: "code",
    title: "请编写最基础的HTML5骨架，必须包含 DOCTYPE 声明、html根标签、head标签和body标签。",
    options: [], // 实操题无选项
    answer: "<!DOCTYPE html>\n<html>\n    <head>\n    </head>\n    <body>\n    </body>\n</html>",
    explanation: "这是任何HTML5文档必须具备的四大核心基础骨架。缺少任何一个都属于结构不完整。"
  },
  {
    type: "code",
    title: "在 head 标签中，使用 meta 标签为网页添加字符集声明，设置其为最通用的 `UTF-8` 编码。请写出这一行代码。",
    options: [],
    answer: "<meta charset=\"UTF-8\">",
    explanation: "使用 `<meta charset=\"UTF-8\">` 可以确保浏览器按照UTF-8解码网页文本，防止中文字符乱码。"
  },
  {
    type: "code",
    title: "为网页添加一个标题，标题文本要求为 \"我的第一个HTML5页面\"，请写出完整的标签代码（包含开始和结束标签）。",
    options: [],
    answer: "<title>我的第一个HTML5页面</title>",
    explanation: "title 是双标签，文本放置在 `<title>` 和 `</title>` 之间即可。"
  },
  {
    type: "code",
    title: "在页面的可视化主体部分，我们需要输出一段纯文本内容：\"Hello World\"。请写出用于包裹这部分可视内容的父级标签及其内部的代码。",
    options: [],
    answer: "<body>\n    Hello World\n</body>",
    explanation: "所有可视内容必须放置在 <body> 标签内部。普通的文本可以直接写在里面。"
  },
  {
    type: "code",
    title: "综合实战：请徒手默写出一个完整的、标准化的 HTML5 文档代码。要求：带有 HTML5 的类型声明、包含根标签、包含 utf-8 编码声明、网页标题设为 \"尚学堂前端\"，网页主体可视化内容设为 \"欢迎学习\"。",
    options: [],
    answer: "<!DOCTYPE html>\n<html>\n    <head>\n        <meta charset=\"UTF-8\">\n        <title>尚学堂前端</title>\n    </head>\n    <body>\n        欢迎学习\n    </body>\n</html>",
    explanation: "这是一个标准的网页初始模板。从上到下依次是声明文档类型、开启文档根节点、开启头部区域、配置字符集、设置标签页标题、关闭头部、开启主体区域、填入正文、关闭主体、关闭文档根节点。"
  }
];

async function run() {
  console.log('🚀 [步骤1] 连接数据库并清空历史表数据...');
  const pool = mysql.createPool({ host: 'localhost', user: 'root', password: '', database: 'frontend_bible' });
  
  // 清空知识点和题库表
  await pool.query('TRUNCATE TABLE knowledge_docs'); 
  await pool.query('TRUNCATE TABLE questions'); 
  await pool.query('TRUNCATE TABLE mistakes'); 
  
  // 查找或创建 HTML5 栏目 (如果不存在)
  let [catRows] = await pool.query('SELECT id FROM categories WHERE name = ?', ['HTML5']);
  let categoryId;
  if (catRows.length > 0) {
    categoryId = catRows[0].id;
  } else {
    const [insertCat] = await pool.query('INSERT INTO categories (name) VALUES (?)', ['HTML5']);
    categoryId = insertCat.insertId;
  }
  
  console.log('📖 [步骤2] 写入 AI 精炼后的【HTML5简介与基础骨架】切片数据...');
  await pool.query(
    'INSERT INTO knowledge_docs (category_id, parent_title, knowledge_point, content, created_at) VALUES (?, ?, ?, ?, UNIX_TIMESTAMP())',
    [categoryId, knowledgeDoc.parent_title, knowledgeDoc.knowledge_point, knowledgeDoc.content]
  );
  
  console.log('💡 [步骤3] 正在为您生成并注入 20道连环拷问选择题 + 5道实操代码题...');
  let count = 0;
  for (const q of questions) {
     let optionsStr = null;
     if (q.type === 'single') {
         // 打乱选项的顺序
         optionsStr = JSON.stringify(q.options.sort(() => 0.5 - Math.random())); 
     } else {
         optionsStr = JSON.stringify([]); // 实操题为空选项
     }
     
     await pool.query(
       'INSERT INTO questions (category_id, knowledge_point, type, title, options, answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?)',
       [categoryId, knowledgeDoc.knowledge_point, q.type, q.title, optionsStr, q.answer, q.explanation]
     );
     count++;
  }
  
  console.log(`✅ 搞定！成功注入 ${count} 道题目（涵盖单选题与代码实操题），全部挂载于知识点【${knowledgeDoc.knowledge_point}】下！`);
  console.log(`\n🎉 现在您可以启动前端服务 (npm run dev)，亲自进入页面检验这 25 道大题了！`);
  process.exit(0);
}

run().catch(err => {
  console.error("❌ 发生错误:", err);
  process.exit(1);
});
