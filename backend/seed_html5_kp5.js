import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第一章：HTML5',
  knowledge_point: '图片路径详解',
  content: `### 图片路径详解

在网页中插入图片或引入其他资源时，必须指定正确的路径。路径分为绝对路径和相对路径。

**1. 绝对路径**
绝对路径是指文件在硬盘上真正存在的完整路径。
例如：\`<img src="C:\\Users\\Administrator\\Desktop\\HTML\\images\\logo.png">\`
*注意：在实际的前端网页开发中，极少使用本地磁盘的绝对路径，因为一旦代码转移到服务器或其他电脑上，路径就会失效。*
网络绝对路径（URL）也是一种绝对路径，如：\`<img src="https://www.example.com/logo.png">\`

**2. 相对路径**
相对路径是指相对于当前所在文件位置的路径。这是前端开发中最常用的路径方式。
*   **同级目录**：如果要引用的文件与当前 HTML 文件在同一个文件夹内，直接写文件名即可，或者使用 \`./\` 表示当前目录。
    例如：\`<img src="logo.png">\` 或 \`<img src="./logo.png">\`
*   **下级目录**：如果要引用的文件在当前文件所在文件夹的子文件夹内，需要先写子文件夹的名称，再加上 \`/\`，最后是文件名。
    例如：\`<img src="images/logo.png">\`
*   **上级（父级）目录**：如果要引用的文件在当前文件所在文件夹的上一级文件夹内，必须使用 \`../\` 来表示“向上一级”。如果需要向两上级，则使用 \`../../\`，以此类推。
    例如：\`<img src="../logo.png">\``
};

const questions = [
  // 20 单选题
  {
    type: 'single',
    title: '在前端开发中，以下哪种路径类型是极力**不推荐**用来引入项目本地图片的？',
    options: ['A. 基于当前文件的相对路径', 'B. 完整的网络 URL (如 https://...)', 'C. 本地磁盘的绝对路径 (如 C:\\images\\pic.jpg)', 'D. 使用 Base64 编码内嵌图片'],
    answer: 'C',
    explanation: '本地磁盘绝对路径仅在开发者自己的电脑上有效。一旦网站部署到服务器或者其他同事拉取代码，盘符和目录结构发生改变，图片就会加载失败。'
  },
  {
    type: 'single',
    title: '如果在 HTML 中看到路径写法为 `./icon.png`，这里的 `./` 代表什么含义？',
    options: ['A. 代表网站的根目录', 'B. 代表当前 HTML 文件所在的同级目录', 'C. 代表上一级父目录', 'D. 代表一个名为 "." 的文件夹'],
    answer: 'B',
    explanation: './ 是相对路径中的特殊符号，明确表示“当前所在的目录（同级目录）”。通常也可以直接省略不写。'
  },
  {
    type: 'single',
    title: '要在 HTML 中引用**上一级（父级）**目录中的图片文件，必须使用哪个相对路径符号？',
    options: ['A. //', 'B. ./', 'C. ../', 'D. ~/'],
    answer: 'C',
    explanation: '../ 是相对路径中的核心符号，它的固定含义就是“返回到上一级（父级）目录”。'
  },
  {
    type: 'single',
    title: '假设当前 HTML 文件位于 `/project/views/` 目录下，图片位于 `/project/assets/images/logo.png`。在 HTML 中正确的相对路径写法是？',
    options: ['A. assets/images/logo.png', 'B. ./assets/images/logo.png', 'C. ../assets/images/logo.png', 'D. ../../assets/images/logo.png'],
    answer: 'C',
    explanation: '当前在 views 目录，需要先使用 ../ 返回到父级目录 project，然后再依次进入 assets 和 images 目录找到图片。因此正确路径是 ../assets/images/logo.png。'
  },
  {
    type: 'single',
    title: '以下哪一个是标准的网络绝对路径（URL）形式？',
    options: ['A. /images/banner.jpg', 'B. ../../images/banner.jpg', 'C. C:/website/images/banner.jpg', 'D. https://cdn.example.com/images/banner.jpg'],
    answer: 'D',
    explanation: '网络绝对路径包含完整的协议（如 https）、域名和具体的资源位置。不论在哪台电脑、哪个目录下的 HTML 文件调用它，只要网络通畅都能加载成功。'
  },
  {
    type: 'single',
    title: '如果我们需要在相对路径中连续向上跳出三级目录，应该怎么写？',
    options: ['A. .../../', 'B. ../../../', 'C. ~~~/', 'D. /3/'],
    answer: 'B',
    explanation: '每一个 ../ 代表向上一级。如果要跳出三级目录，就需要连续书写三次，即 ../../../。'
  },
  {
    type: 'single',
    title: '当前 HTML 与图片文件 `bg.jpg` 完全在同一个文件夹中。以下哪种写法是**错误**的？',
    options: ['A. <img src="bg.jpg">', 'B. <img src="./bg.jpg">', 'C. <img src="/bg.jpg">', 'D. 以上 A 和 B 都正确'],
    answer: 'C',
    explanation: '/bg.jpg 代表的是当前服务器（或所在硬盘）的“根目录”下的图片，而不是“同级目录”。这在没有正确配置服务器根目录的本地开发环境中极其容易导致图片 404。'
  },
  {
    type: 'single',
    title: '关于路径分隔符，在 HTML 相对路径中，规范要求必须使用什么符号来分隔层级目录？',
    options: ['A. 反斜杠 `\\`', 'B. 正斜杠 `/`', 'C. 点 `.`', 'D. 冒号 `:`'],
    answer: 'B',
    explanation: '在 Web 标准中，无论是在 URL 还是相对路径中，目录层级之间的分隔符规范都是正斜杠（/）。Windows 系统的本地路径默认使用反斜杠（\\），但这不能直接用于 Web 路径。'
  },
  {
    type: 'single',
    title: '假设 HTML 文件在 `src/pages/home.html`，图片在 `src/pages/img/logo.png`。要在 `home.html` 中引入该图片，以下哪一个是正确的“下级目录”写法？',
    options: ['A. src="img/logo.png"', 'B. src="../img/logo.png"', 'C. src="/img/logo.png"', 'D. src="logo.png"'],
    answer: 'A',
    explanation: '图片所在的 img 文件夹与 home.html 处于同级。要引入下级资源，直接从该文件夹名称开始写即可：img/logo.png（等同于 ./img/logo.png）。'
  },
  {
    type: 'single',
    title: '你在本地电脑打开一个 HTML 文件，路径中写着 `<img src="D:/images/test.png">`。你的朋友在他的电脑上也下载了你的 HTML 文件，为什么他看不到图片？',
    options: ['A. 因为 HTML 不支持 png 格式', 'B. 因为这个绝对路径只指向你电脑本地的 D 盘，他电脑 D 盘同样路径下没有这张图', 'C. 因为浏览器版本不同', 'D. 因为路径缺少 ./ 前缀'],
    answer: 'B',
    explanation: '这是本地磁盘绝对路径的典型缺陷：它强依赖于操作系统的盘符和特定的本地文件结构，丧失了代码的跨平台可移植性。'
  },
  {
    type: 'single',
    title: '如果路径写为 `src="~/images/pic.jpg"`，在纯正的静态 HTML 中它代表什么含义？',
    options: ['A. 代表网站的根目录', 'B. 代表操作系统的用户家目录', 'C. 代表上一级目录', 'D. 纯静态 HTML 不认识 `~` 符号，会将其当作普通的文件夹名称或导致 404'],
    answer: 'D',
    explanation: '`~`（波浪号）在某些后端框架（如 ASP.NET）或打包构建工具（如 Webpack、Vite）中可能被配置成了指向项目根目录或源码目录的别名（Alias），但在没有任何预处理的纯静态 Web 标准（浏览器）中，它并不具备此特殊含义。'
  },
  {
    type: 'single',
    title: '以下对于网络绝对路径（URL）的使用场景，哪一种描述是最合理的？',
    options: ['A. 所有的本地样式小图标都应该使用 URL 绝对路径', 'B. 项目自己配套的所有资源必须使用 URL 绝对路径', 'C. 引用第三方 CDN 提供的公共资源库（如 jQuery、Bootstrap、外部字体）时通常使用 URL 绝对路径', 'D. 绝对不能使用 URL，它不安全'],
    answer: 'C',
    explanation: '引入不属于本项目自有、而是由外部服务器（特别是加速 CDN）提供的公共资源时，必须使用带有 https:// 域名的网络绝对路径。'
  },
  {
    type: 'single',
    title: '如果网页中图片的路径不小心多写了一个空格：`<img src="images/ logo.png">`，最可能发生什么？',
    options: ['A. 浏览器会自动删掉空格并正常加载', 'B. 浏览器会弹窗警告', 'C. 服务器会报错 500', 'D. 图片请求返回 404 Not Found'],
    answer: 'D',
    explanation: 'URL 或路径中的空格是一个合法的字符（通常会被转义为 %20）。如果你实际的文件夹或文件名中没有空格，但路径中写了空格，就会导致路径无法匹配真实的物理文件，引发 404 错误。'
  },
  {
    type: 'single',
    title: '假设当前文件所在目录为 `C:/www/html/`，图片目录为 `C:/www/images/`。当前文件的 HTML 应该怎么写相对路径才能引用到图片 `test.jpg`？',
    options: ['A. src="images/test.jpg"', 'B. src="../images/test.jpg"', 'C. src="../../images/test.jpg"', 'D. src="./images/test.jpg"'],
    answer: 'B',
    explanation: '当前在 html 目录。向上一级 (../) 就回到了 www 目录，然后进入 images 目录。因此是 ../images/test.jpg。'
  },
  {
    type: 'single',
    title: '前端开发者在使用相对路径时，为什么推荐在引用同级目录文件时显式写上 `./`？',
    options: ['A. 因为不写 `./` 浏览器就找不到文件', 'B. 能够提高页面的加载速度', 'C. 为了让代码在阅读时明确指示“这是基于当前目录的查找”，增强语义和某些工程化工具（如 Webpack）的识别准确性', 'D. 为了兼容 IE6'],
    answer: 'C',
    explanation: '虽然在纯 HTML 中直接写文件名和写 `./文件名` 效果一样，但在现代前端模块化开发（如 ES Module、Node.js、各种脚手架打包）中，显式的 `./` 常常是强制规范，用来区分相对路径和第三方库依赖。'
  },
  {
    type: 'single',
    title: '当我们把网站从测试服务器部署到正式服务器，如果 HTML 中的图片引用写的是 `src="http://test.server.com/images/a.jpg"`，会发生什么情况？',
    options: ['A. 网站聪明地自动把域名替换成正式服务器域名', 'B. 只要测试服务器还在运行，图片就能正常加载，但图片流量依然走测试服务器', 'C. 图片会变成黑色方块', 'D. 浏览器会拦截该请求'],
    answer: 'B',
    explanation: '这是硬编码网络绝对路径带来的隐患。即使代码部署到新环境，它依然指向老域名。在实际项目内部资源中，通常使用基于根目录的绝对路径（如 /images/a.jpg）或相对路径来避免这个问题。'
  },
  {
    type: 'single',
    title: '关于路径大小写敏感的问题，以下说法最为准确的是？',
    options: ['A. 在任何操作系统下，HTML 路径都是绝对大小写不敏感的', 'B. 在任何操作系统下，HTML 路径都是绝对大小写敏感的', 'C. 在 Windows 本地开发时通常对大小写不敏感，但部署到 Linux 服务器后会严格区分大小写', 'D. HTML 规定所有路径必须全小写'],
    answer: 'C',
    explanation: '这是一个无数新手踩过的惊天大坑。Windows 的文件系统（NTFS）默认不区分大小写，写 Logo.png 还是 logo.png 都能本地显示。但主流 Web 服务器多是 Linux（EXT4等），严格区分大小写。因此在前端开发中，路径必须严谨地保持大小写完全一致，最好统一使用小写。'
  },
  {
    type: 'single',
    title: '如果路径的最前面是以一个单斜杠开头的，如 `src="/assets/img.png"`，这个单斜杠 `/` 代表什么？',
    options: ['A. 代表服务器的根目录（Root Directory）', 'B. 代表当前文件的同级目录', 'C. 代表当前文件的父级目录', 'D. 代表注释掉这行路径'],
    answer: 'A',
    explanation: '以单个正斜杠开头的路径被称为“基于根目录的绝对路径”。它不管当前 HTML 文件在哪个深度的层级，都会直接跳回当前网站域名的最顶层根目录开始重新查找。'
  },
  {
    type: 'single',
    title: '假设你在桌面新建了一个叫 `myweb` 的文件夹，里面放了 `index.html` 和 `logo.png`。在 `index.html` 里要引用图片，哪一种写法是**最稳妥、最便于分享给别人**的代码？',
    options: ['A. <img src="C:/Users/Administrator/Desktop/myweb/logo.png">', 'B. <img src="./logo.png">', 'C. <img src="/logo.png">', 'D. <img src="../myweb/logo.png">'],
    answer: 'B',
    explanation: '只有同级的相对路径 ./logo.png 或者直接写 logo.png，才能保证你把这个文件夹压缩发给任何人，他们解压后打开 index.html 都能正常看到图片。'
  },
  {
    type: 'single',
    title: '在编写网页时，图片路径引用经常引发 404 错误。遇到这种错误时，首先应该怎么排查？',
    options: ['A. 怀疑是 HTML 版本问题，升级到 HTML5', 'B. 按 F12 打开开发者工具，在 Network（网络）或者 Elements（元素）面板检查请求的真实最终 URL，核对与预期文件位置的层级差异', 'C. 立刻重启电脑或重启服务器', 'D. 把所有图片格式全换成 JPG'],
    answer: 'B',
    explanation: '排查路径问题的核心方法是学会使用浏览器 F12 开发者工具的 Network 选项卡，看浏览器到底尝试去哪个具体的 URL 下载该图片，借此推导相对路径哪里写错了几层。'
  },

  // 5 代码题
  {
    type: 'code',
    title: '当前在 `about.html` 文件中，要引入跟它在同一个文件夹内的 `team.jpg` 图片，请写出包含 img 标签的完整 HTML 代码（提示：推荐使用 ./）。',
    options: [],
    answer: '<img src="./team.jpg" alt="团队照片">',
    explanation: '同级目录直接使用 ./ 文件名，或者直接写文件名即可。'
  },
  {
    type: 'code',
    title: '当前 `index.html` 的同级有一个名为 `assets` 的文件夹，该文件夹内有一张图片叫 `banner.png`。请在 `index.html` 中编写代码将其引入。',
    options: [],
    answer: '<img src="assets/banner.png" alt="首页海报">',
    explanation: '引入下级目录资源，先写目录名，然后正斜杠 /，最后写图片名。'
  },
  {
    type: 'code',
    title: '当前 HTML 文件的路径是 `views/user/profile.html`。你需要的头像图片存放在 `views/images/avatar.jpg`。请使用**相对路径**在 `profile.html` 中正确引入该图片。',
    options: [],
    answer: '<img src="../images/avatar.jpg" alt="用户头像">',
    explanation: '从 user 目录退回到父级 views 目录需要用到 ../，然后再进入同一父级下的 images 子目录找到图片。'
  },
  {
    type: 'code',
    title: '要求在网页中直接引用一张位于公共网络 CDN 上的绝对路径图片，图片的 URL 是 `https://cdn.example.com/logo.svg`。请写出 HTML 代码。',
    options: [],
    answer: '<img src="https://cdn.example.com/logo.svg" alt="官方Logo">',
    explanation: '对于外部绝对路径，完整地将带有 https 的 URL 填入 src 属性即可。'
  },
  {
    type: 'code',
    title: '当前 HTML 文件在 `src/pages/admin/dashboard.html`，你需要引用的背景图在项目的公共静态资源根目录 `public/bg.jpg` 下。请写出你需要跳出多少级父目录才能找到该图片的**相对路径代码**？（提示：从 admin 跳出到 pages，再从 pages 跳出到 src，再从 src 跳出到与 public 同级的项目根目录）',
    options: [],
    answer: '<img src="../../../public/bg.jpg" alt="后台背景">',
    explanation: '每一次 ../ 向上跳出一级。dashboard.html 位于三层嵌套下，因此需要连续使用三次 ../../../ 才能到达顶层，然后再进入 public 目录。'
  }
];

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'frontend_bible'
  });

  try {
    const ts = Math.floor(Date.now() / 1000);

    // 写入知识点
    const [kpResult] = await connection.execute(
      'INSERT INTO knowledge_docs (category_id, parent_title, knowledge_point, content, created_at, updated_at, deleted_at, is_del) VALUES (?, ?, ?, ?, ?, ?, 0, 0)',
      [1, knowledgeDoc.parent_title, knowledgeDoc.knowledge_point, knowledgeDoc.content, ts, ts]
    );

    // 写入题目
    for (const q of questions) {
      await connection.execute(
        'INSERT INTO questions (category_id, knowledge_point, type, title, options, answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          1,
          knowledgeDoc.knowledge_point,
          q.type,
          q.title,
          JSON.stringify(q.options),
          q.answer,
          q.explanation
        ]
      );
    }

    console.log(`[成功] 知识点【${knowledgeDoc.knowledge_point}】及 ${questions.length} 道题目已完全注入数据库！`);
  } catch (error) {
    console.error('插入失败:', error);
  } finally {
    await connection.end();
  }
}

run();
