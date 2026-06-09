import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: 'CSS的引入方式',
  content: `### CSS的引入方式\n\n**1. 内联样式（行内样式）**\n在标签内使用 style 属性。缺乏整体性和规划性，不利于维护。\n\`<p style="color: red;">CSS</p>\`\n\n**2. 内部样式**\n在文档头部 <head> 使用 <style> 标签。单页面规划性好，多页面易混乱。\n\n**3. 外部样式（推荐）**\n独立的 .css 文件，使用 <link> 标签引入。\n\`<link rel="stylesheet" type="text/css" href="xxx.css">\``
};

const questions = [
  { type: 'single', title: '关于外部样式表（<link>）和 @import 的区别，下列说法错误的是？', options: ['A. <link> 是 XHTML 标签，除了加载 CSS 外，还可以定义 RSS 等其他事务；@import 属于 CSS 范畴，只能加载 CSS。', 'B. <link> 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载。', 'C. <link> 无兼容问题；@import 是在 CSS2.1 提出的，低版本的浏览器不支持。', 'D. @import 的权重高于 <link> 引入的样式权重。'], answer: 'D', explanation: '@import 的权重取决于其在样式表中的位置，通常会被后续的规则覆盖，本身没有特殊的高权重。' },
  { type: 'single', title: '以下哪种引入方式具有最高的 CSS 优先级（假设没有 !important）？', options: ['A. 外部样式表', 'B. 内部样式表', 'C. 内联样式', 'D. 用户代理样式'], answer: 'C', explanation: '内联样式（在 HTML 元素内使用 style 属性）的优先级高于内部样式和外部样式。' },
  { type: 'single', title: '在实施严格的内容安全策略（CSP）时，哪种样式引入方式默认会被阻止？', options: ['A. <link> 引入同源外部样式表', 'B. <link> 引入跨域外部样式表', 'C. <style> 标签内部样式和 style 属性内联样式', 'D. CSS Modules'], answer: 'C', explanation: '默认的 CSP default-src \'self\' 或 style-src \'self\' 会阻止执行内联脚本和应用内联样式（包括 <style> 块和 style 属性），以防范 XSS 攻击。' },
  { type: 'single', title: '关于预加载 CSS，正确的做法是？', options: ['A. <link rel="preload" href="style.css" as="style">', 'B. <link rel="prefetch" href="style.css" as="style">', 'C. <link rel="stylesheet" href="style.css" async>', 'D. <link rel="stylesheet" href="style.css" defer>'], answer: 'A', explanation: '使用 rel="preload" 可以强制浏览器尽快请求资源，as="style" 指定了资源类型以设置正确的优先级。' },
  { type: 'single', title: '使用 <link> 标签引入外部样式表时，哪个属性决定了样式表是否会在页面渲染前阻塞？', options: ['A. type="text/css"', 'B. href', 'C. rel="stylesheet"', 'D. media'], answer: 'D', explanation: '如果 media 属性的值与当前设备不匹配，浏览器仍会下载该样式表，但不会阻塞渲染。' },
  { type: 'single', title: '内联样式的缺点不包括以下哪一项？', options: ['A. 导致 HTML 代码臃肿', 'B. 无法实现样式复用', 'C. 增加额外的 HTTP 请求', 'D. 不利于后期的维护和修改'], answer: 'C', explanation: '内联样式直接写在 HTML 标签中，因此不需要像外部样式表那样发起额外的 HTTP 请求。' },
  { type: 'single', title: '在 HTML5 中，<link> 标签引入 CSS 时，可以省略的属性是？', options: ['A. rel', 'B. href', 'C. type', 'D. media'], answer: 'C', explanation: '在 HTML5 中，type="text/css" 是默认值，可以安全地省略。' },
  { type: 'single', title: '如何动态地通过 JavaScript 引入一个外部 CSS 文件？', options: ['A. document.createElement(\'style\').src = "style.css";', 'B. var link = document.createElement(\'link\'); link.rel = \'stylesheet\'; link.href = \'style.css\'; document.head.appendChild(link);', 'C. document.loadCSS(\'style.css\');', 'D. window.importCSS(\'style.css\');'], answer: 'B', explanation: '动态加载外部 CSS 需要创建一个 <link> 元素，设置其 rel 和 href 属性，然后将其追加到 <head> 中。' },
  { type: 'single', title: '如果同一个 HTML 元素同时被内部样式和外部样式命中，且选择器权重相同，哪一个生效？', options: ['A. 总是内部样式生效', 'B. 总是外部样式生效', 'C. 后声明的（在 HTML 结构中靠后的）生效', 'D. 先声明的生效'], answer: 'C', explanation: '当权重相同时，CSS 遵循就近原则/层叠规则，后定义的样式会覆盖先定义的样式。' },
  { type: 'single', title: '使用 @import 引入 CSS 的主要性能缺陷是什么？', options: ['A. 无法被浏览器缓存', 'B. 会导致并行的 HTTP 请求减少，串行加载阻塞渲染', 'C. 解析速度比 <link> 慢', 'D. 无法使用媒体查询'], answer: 'B', explanation: '浏览器在解析到含有 @import 的 CSS 文件时，才会去下载 @import 引用的文件，这会导致请求串行化，延迟页面的首次渲染。' },
  { type: 'single', title: '以下哪个场景最适合使用内部样式（<style> 标签）？', options: ['A. 网站的全局重置样式 (Reset CSS)', 'B. 包含大量复杂动画的关键帧定义，且多页面复用', 'C. 单页面应用 (SPA) 中的组件级作用域样式（例如 Vue 的 scoped style 编译结果）', 'D. 需要按需异步加载的庞大主题包'], answer: 'C', explanation: '内部样式适合单页面或者组件级别的样式隔离，Vue/React 等框架的组件作用域样式最终常以内部样式的形式注入。' },
  { type: 'single', title: '为什么通常建议将 <link> 标签放在 <head> 区域？', options: ['A. 因为放在 <body> 中会导致 HTML 语法错误', 'B. 为了避免文档渲染时出现 FOUC（无样式内容闪烁）现象', 'C. 因为浏览器只能在 <head> 中解析 <link> 标签', 'D. 为了减少 HTTP 请求次数'], answer: 'B', explanation: '将 CSS 放在头部可以确保在 DOM 树构建时样式已经准备好，避免页面先以无样式呈现，随后样式加载完毕后导致页面重绘和闪烁。' },
  { type: 'single', title: '内联样式中可以使用伪类（如 :hover）吗？', options: ['A. 可以，正常使用即可', 'B. 可以，但需要特定的语法', 'C. 不可以，内联样式无法定义伪类', 'D. 只有在配合 JS 时才可以'], answer: 'C', explanation: '标准的内联 style 属性无法表示选择器，因此无法直接在内联样式中使用 :hover、:before 等伪类和伪元素。' },
  { type: 'single', title: '关于 HTML 邮件中的 CSS 引入，目前最佳兼容实践是？', options: ['A. 外部样式表', 'B. 内部样式表', 'C. 内联样式', 'D. CSS Modules'], answer: 'C', explanation: '由于许多邮件客户端出于安全考虑会过滤掉 <link> 和 <style> 标签，内联样式是编写 HTML 邮件时最安全、兼容性最好的方式。' },
  { type: 'single', title: 'Alternate 样式表（rel="alternate stylesheet"）的作用是？', options: ['A. 作为主要样式表加载失败时的备用样式表', 'B. 提供可供用户选择的替换样式（如切换主题），默认不应用', 'C. 用于打印介质的特定样式', 'D. 用于移动端设备的特定样式'], answer: 'B', explanation: 'rel="alternate stylesheet" 结合 title 属性可以提供备用样式表，通常由用户在浏览器界面或通过 JS 激活以切换主题。' },
  { type: 'single', title: '在外部样式表文件 (style.css) 中，相对路径中引用的图片 (如 background: url("bg.png"))，其基准路径是？', options: ['A. 引用该 CSS 的 HTML 文件所在的路径', 'B. 该 CSS 文件本身所在的路径', 'C. 网站的根目录', 'D. 浏览器的缓存目录'], answer: 'B', explanation: '在 CSS 文件中使用的相对路径是相对于该 CSS 文件自身的位置，而不是相对于引用它的 HTML 文件。' },
  { type: 'single', title: '使用 <style scoped> 属性（HTML5 曾提议）的目的是什么？', options: ['A. 提升样式解析速度', 'B. 使样式仅应用于具有 scoped 属性的 <style> 元素的父元素及其子元素', 'C. 防止样式被内联样式覆盖', 'D. 强制浏览器缓存该样式'], answer: 'B', explanation: 'scoped 属性旨在提供样式封装，使其仅作用于局部 DOM 树。不过该特性已在主流浏览器中废弃，目前多由框架实现类似功能。' },
  { type: 'single', title: '在微前端架构中，解决不同子应用间 CSS 样式冲突，不依赖构建工具的最彻底方案是？', options: ['A. 使用 BEM 命名规范', 'B. 将所有样式使用内联方式编写', 'C. 使用 Shadow DOM 并将样式作为内部样式注入其中', 'D. 提高各子应用选择器的权重'], answer: 'C', explanation: 'Shadow DOM 提供了原生的样式隔离能力，其内部的样式不会泄漏到外部，外部的样式（除了继承的或自定义属性）也不会影响内部。' },
  { type: 'single', title: '以下哪种方式会阻塞 DOM 的解析？', options: ['A. <link rel="stylesheet">', 'B. <style>...</style>', 'C. 内联 style 属性', 'D. 以上都不会阻塞 DOM 解析，只会阻塞渲染'], answer: 'D', explanation: 'CSS 的加载和解析通常阻塞渲染（Render Tree 构建），但不会阻塞 DOM 树的解析（除非 CSS 后面紧跟了 JS 脚本，此时 JS 执行必须等待 CSSOM 构建完成，从而间接阻塞 DOM 解析）。' },
  { type: 'single', title: '关于 CSS 引入的性能优化，以下说法错误的是？', options: ['A. 尽量减少 HTTP 请求，可以考虑合并 CSS 文件', 'B. 关键路径的 CSS（Critical CSS）可以考虑直接内联到 <head> 中以加快首屏渲染', 'C. 将所有的 CSS 都写成内联样式是性能最优的选择', 'D. 利用浏览器的缓存机制，为外部 CSS 文件设置合理的 Cache-Control'], answer: 'C', explanation: '全部使用内联样式会导致 HTML 文档体积过大，且无法利用浏览器缓存机制，影响后续页面的加载性能和维护性。' },
  { type: 'code', title: '请使用纯 JavaScript 编写一个函数 loadStyle(url)，用于动态加载一个外部 CSS 文件。要求在 CSS 文件加载成功后返回一个 resolved 的 Promise，加载失败返回 rejected 的 Promise。', options: [], answer: 'function loadStyle(url) {\n  return new Promise((resolve, reject) => {\n    const link = document.createElement(\'link\');\n    link.rel = \'stylesheet\';\n    link.href = url;\n    link.onload = () => resolve(link);\n    link.onerror = () => reject(new Error(`Style load error for ${url}`));\n    document.head.appendChild(link);\n  });\n}', explanation: '考察动态创建 <link> 元素、事件监听（onload/onerror）以及 Promise 的封装。' },
  { type: 'code', title: '已知一个 HTML 结构如下：\n<div id="box" class="container" style="color: blue;">Text</div>\n在外部样式表中定义了 `#box { color: red !important; }`，\n内部样式表定义了 `.container { color: green; }`。\n请问最终文字的颜色是什么？为什么？', options: [], answer: '红色 (red)', explanation: '外部样式表中的 id 选择器配合 !important 具有极高的优先级，它覆盖了内联样式的 blue，内部样式的 green。!important 的优先级超越了一般的来源和权重规则。' },
  { type: 'code', title: '请简述 Critical CSS（关键 CSS）的概念，并说明如何通过构建工具或手动方式在页面中实施，以优化首屏渲染时间。', options: [], answer: 'Critical CSS 是指渲染首屏内容所必需的最小 CSS 集合。\n实施方式：\n1. 提取首屏 CSS：使用工具（如 critical, penthouse）分析页面，提取首屏可见元素的样式。\n2. 内联到 HTML：将这些提取出的 CSS 直接内联到页面的 <head> 的 <style> 标签中，消除阻塞渲染的额外网络请求。\n3. 异步加载剩余 CSS：将非首屏的 CSS 放在外部文件中，通过动态创建 <link>、使用 rel="preload" 配合 onload="this.rel=\'stylesheet\'" 等方式异步加载，不阻塞首屏渲染。', explanation: '考察对前端性能优化、CSS 渲染阻塞原理及实际解决方案的掌握。' },
  { type: 'code', title: '现有三个 CSS 文件：a.css、b.css、c.css。\n为了减少 HTTP 请求，能否在一个主文件 main.css 中使用 `@import url("a.css"); @import url("b.css");` 引入？这种做法有什么性能隐患？', options: [], answer: '可以，但不推荐。\n性能隐患：\n1. 串行请求：浏览器下载解析完 main.css 后，才会发现并去请求 a.css 和 b.css，增加了请求层级，导致明显的延迟。\n2. 阻塞渲染时间延长：CSS 资源的延迟获取会推迟 CSSOM 的构建完毕，进而严重阻塞页面的首次渲染（白屏时间变长）。通常推荐在 HTML 中直接使用多个 <link> 标签并行请求，或在构建阶段打包合并 CSS 文件。', explanation: '考察对 @import 加载机制及浏览器关键渲染路径的理解。' },
  { type: 'code', title: '编写一段 React 代码，展示如何在组件中安全地使用内联样式（应用动态背景色和宽度）。', options: [], answer: 'import React from \'react\';\n\nconst DynamicBox = ({ bgColor, widthPercentage }) => {\n  const dynamicStyles = {\n    backgroundColor: bgColor || \'#ccc\',\n    width: `${widthPercentage}%`,\n    height: \'100px\',\n    transition: \'all 0.3s ease\'\n  };\n\n  return (\n    <div style={dynamicStyles}>\n      动态盒子\n    </div>\n  );\n};\n\nexport default DynamicBox;', explanation: '在 React 等框架中，内联样式通常以对象的形式传入 style 属性中。属性名使用驼峰命名法（如 backgroundColor），React 会自动处理兼容性和安全性问题。' }
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
