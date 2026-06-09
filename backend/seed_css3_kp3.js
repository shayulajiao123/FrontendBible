import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '选择器一',
  content: `### 选择器一\n\n**1. 全局选择器 (*)**\n匹配所有元素，优先级最低，一般做样式初始化。\n\`* { margin: 0; padding: 0; }\`\n\n**2. 元素选择器 (标签选择器)**\n直接使用标签名，如 p, div, a。描述共性。\n\`p { font-size: 14px; }\`\n\n**3. 类选择器 (.class)**\n使用圆点定义，针对所有设定了该 class 的标签。极其灵活，可复用，可多类名并列。\n\`.title { color: red; }\``
};

const questions = [
  { type: 'single', title: '关于全局选择器 (*)，下列说法中最准确的一项是？', options: ['A. 它会遍历DOM树中的每一个节点，包括伪元素，因此性能消耗极小', 'B. 它的优先级是0,0,0,0，会被所有其他基础选择器覆盖', 'C. 它只能单独使用，不能与其他选择器结合（如 *.class）', 'D. 在现代浏览器中，通配符选择器的性能开销已被彻底消除，可随意使用'], answer: 'B', explanation: '全局选择器的优先级为0,0,0,0（或无优先级，低于标签选择器的0,0,0,1）。虽然现代浏览器对通配符有优化，但层叠和重绘开销依然存在，且伪元素不一定会被通配符匹配（需单独指定）。' },
  { type: 'single', title: '在进行 CSS 样式初始化（Reset）时，以下哪种做法性能较优且最符合现代前端规范？', options: ['A. 使用 * { margin: 0; padding: 0; }', 'B. 使用 normalize.css 等保留有用默认值并重置特定样式的方案', 'C. 将所有可能用到的标签罗列出来（如 div, p, ul... { margin: 0; }）', 'D. 不做任何初始化，完全依赖浏览器默认样式'], answer: 'B', explanation: '全站使用 * { margin:0; padding:0; } 过于粗暴，可能会覆盖一些原本有用的表单或控件默认样式。normalize.css 采用针对性重置，性能更好，保留了合理的浏览器默认表现。' },
  { type: 'single', title: '以下哪种情况属于元素选择器的典型适用场景？', options: ['A. 为页面中某一个特定的警告框设置红色背景', 'B. 为全站所有的 <a> 标签设置基础的颜色和去除下划线', 'C. 为某个复杂的表格组件中的奇数行设置斑马纹', 'D. 为响应式布局中的手机端隐藏某些特定的内容块'], answer: 'B', explanation: '元素选择器用于描述全局共性，为特定的标签设定最基础的样式，如设置 <a> 标签的默认行为。' },
  { type: 'single', title: '如果在 CSS 中同时存在 div { color: red; } 和 .text { color: blue; }，且 HTML 为 <div class="text">Hello</div>，最终文本颜色是？', options: ['A. red，因为元素选择器更基础', 'B. red，因为 div 写在前面', 'C. blue，因为类选择器的优先级高于元素选择器', 'D. 黑色，因为发生了冲突，浏览器恢复默认'], answer: 'C', explanation: '类选择器的优先级（0,0,1,0）高于元素选择器（0,0,0,1）。' },
  { type: 'single', title: '关于类选择器的多类名并列（如 <div class="box active">），以下说法正确的是？', options: ['A. CSS 中必须写成 .box.active 才能匹配', 'B. CSS 中写 .box 或 .active 都能匹配到该元素', 'C. 在 CSS 中书写 .active.box 和 .box.active 匹配的元素不同', 'D. 多个类名之间在 HTML 中可以使用逗号分隔'], answer: 'B', explanation: 'HTML中多个类名用空格分隔，CSS中单独写 .box 或 .active 均可匹配。连写 .box.active 表示交集。' },
  { type: 'single', title: '假设 CSS 为：.a { color: red; } .b { color: green; }，HTML为 <p class="b a">Text</p>。最终颜色是？', options: ['A. red', 'B. green', 'C. 黑色', 'D. 取决于浏览器'], answer: 'B', explanation: 'CSS中 .b 在 .a 之后定义，同等优先级下，后定义的覆盖先定义的。HTML中类名的顺序不影响。' },
  { type: 'single', title: '以下选择器中，哪一个不包含类选择器？', options: ['A. .header', 'B. div.title', 'C. [class="content"]', 'D. .content .item'], answer: 'C', explanation: '[class="content"] 是属性选择器，虽然它匹配了 class 属性，但在选择器分类和优先级计算上属于属性选择器，而非标准的类选择器（即圆点语法）。' },
  { type: 'single', title: '在大型项目中，为了避免类名冲突，通常会采用什么策略？', options: ['A. 尽量使用元素选择器代替类选择器', 'B. 使用 BEM 命名规范或 CSS Modules/CSS-in-JS', 'C. 仅使用全局选择器', 'D. 在所有类名前加上 *'], answer: 'B', explanation: 'BEM规范和工程化手段（CSS Modules/CSS-in-JS）是解决类名冲突的主流方案。' },
  { type: 'single', title: '元素选择器在阴影 DOM（Shadow DOM）中的行为是怎样的？', options: ['A. 可以穿透 Shadow Boundary 影响内部元素', 'B. 默认情况下，外部的元素选择器无法影响 Shadow DOM 内部的元素', 'C. Shadow DOM 内不能使用元素选择器', 'D. Shadow DOM 会将所有元素选择器转换为类选择器'], answer: 'B', explanation: 'Shadow DOM 提供了样式封装，外部的基础选择器（包括元素、类选择器）默认无法越过 Shadow Boundary 影响内部。' },
  { type: 'single', title: '关于类选择器的大小写敏感性，以下说法正确的是？', options: ['A. 类选择器在 HTML5 中是大小写不敏感的', 'B. 类选择器在标准模式下是大小写敏感的，.Box 和 .box 是两个不同的类', 'C. 无论什么模式，类选择器都忽略大小写', 'D. CSS 规范要求所有类名必须小写'], answer: 'B', explanation: '在 HTML 和 CSS 的标准模式下，类名和类选择器是区分大小写的。' },
  { type: 'single', title: '如果要选择所有既是 p 标签，又拥有 class="intro" 的元素，应使用哪种选择器？', options: ['A. p .intro', 'B. p, .intro', 'C. p.intro', 'D. p > .intro'], answer: 'C', explanation: '交集选择器，直接将元素选择器和类选择器连写（中间无空格）。' },
  { type: 'single', title: '下列关于优先级权重的描述，哪项是正确的？', options: ['A. 1个类选择器 = 10个元素选择器', 'B. 权重的计算是基于位置系统（如0,0,1,0）的，不会因为数量发生进位', 'C. 100个通配符选择器的权重可以超过1个元素选择器', 'D. 通配符选择器会降低其所在的选择器组的总体权重'], answer: 'B', explanation: 'CSS 优先级是在不同级别（内联、ID、类/属性/伪类、元素/伪元素）上进行比较的，低级别的选择器数量再多也不会进位覆盖高级别。' },
  { type: 'single', title: '使用全局选择器 * { box-sizing: border-box; } 的主要目的是什么？', options: ['A. 让所有元素默认不显示边框', 'B. 统一盒模型，使元素的宽高包含 padding 和 border，便于布局计算', 'C. 提高页面的渲染速度', 'D. 清除所有元素的默认边距'], answer: 'B', explanation: '这是现代前端开发中极其常见的重置手法，用于统一盒模型为 border-box，简化尺寸计算。' },
  { type: 'single', title: 'HTML 为 <div class="a b c"></div>，以下哪个 CSS 规则优先级最高？', options: ['A. .a', 'B. .a.b', 'C. div.a', 'D. .c'], answer: 'B', explanation: '.a.b 包含两个类选择器，权重为 0,0,2,0。div.a 为 0,0,1,1。.a 和 .c 为 0,0,1,0。' },
  { type: 'single', title: '在 Vue 的 scoped CSS 中，.my-class 最终会被编译成类似什么形式以实现局部样式？', options: ['A. 增加一个父级 ID 选择器', 'B. 加上一个属性选择器，如 .my-class[data-v-xxx]', 'C. 将类名哈希化，如 .my-class_hash', 'D. 转换为内联样式'], answer: 'B', explanation: 'Vue Loader 在处理 scoped 样式时，会为元素添加一个自定义数据属性，并将选择器改写为包含该属性选择器的形式。' },
  { type: 'single', title: '如果需要对页面上所有元素应用一个渐变背景，最不推荐的做法是？', options: ['A. 在 body 标签上使用背景渐变', 'B. 在 html 标签上使用背景渐变', 'C. 使用 * { background: linear-gradient(...) }', 'D. 创建一个全屏的 div 作为背景层'], answer: 'C', explanation: '通配符选择器会对每一个节点应用渐变背景，导致巨大的性能问题和视觉上的混乱。' },
  { type: 'single', title: '对于选择器 .list li { color: red; }，浏览器的匹配过程是怎样的？', options: ['A. 从左到右，先找到 .list，再找内部的 li', 'B. 从右到左，先找到所有的 li，再判断其祖先是否包含 .list', 'C. 同时查找匹配', 'D. 随机查找'], answer: 'B', explanation: 'CSS 引擎在解析选择器时是从右向左匹配的（Right-to-Left），这有助于尽早过滤掉不符合条件的节点，提高匹配效率。' },
  { type: 'single', title: '当多个选择器指向同一个元素且优先级相同时，如何决定使用哪条规则？', options: ['A. 遵循 DOM 树的深度优先原则', 'B. 采用在 CSS 文件中最后定义的规则', 'C. 采用在 HTML 中类名排在后面的规则', 'D. 随机应用'], answer: 'B', explanation: '层叠样式表（CSS）的规则是：在优先级相同的情况下，后声明的规则会覆盖先声明的规则。' },
  { type: 'single', title: '关于类选择器，以下命名哪一个是不合法的？', options: ['A. ._nav', 'B. .-header', 'C. .1item', 'D. .item-1'], answer: 'C', explanation: 'CSS 类名不能以数字开头，也不能以连字符后紧跟数字开头（除非转义）。' },
  { type: 'single', title: '下列哪个选项完全等价于元素选择器 html？', options: ['A. :root', 'B. body', 'C. *', 'D. document'], answer: 'A', explanation: '在 HTML 文档中，:root 伪类匹配的是 html 元素。区别在于 :root 的优先级比元素选择器高（等同于类选择器）。' },
  { type: 'code', title: '编写一段 CSS，将所有 `<h1>` 标签的字体大小设置为 2em，同时将类名为 `highlight` 的元素的背景色设置为黄色。', options: [], answer: 'h1 { font-size: 2em; }\n.highlight { background-color: yellow; }', explanation: '考察基础的元素选择器和类选择器的语法。' },
  { type: 'code', title: '编写一段 CSS，匹配所有类名同时包含 `btn` 和 `btn-primary` 的元素，并将其文本颜色设为白色。', options: [], answer: '.btn.btn-primary { color: white; }', explanation: '考察多类名交集选择器的写法，类名之间不应有空格。' },
  { type: 'code', title: '已知有 `<button class="submit-btn default">提交</button>`，请使用一条 CSS 规则，仅通过标签和类名的结合，将该按钮边框设为 none。', options: [], answer: 'button.submit-btn.default { border: none; }', explanation: '考察元素与多个类的结合，权重更高。' },
  { type: 'code', title: '使用全局选择器，将页面所有元素的 `box-sizing` 属性设置为 `border-box`。', options: [], answer: '* { box-sizing: border-box; }', explanation: '最常见的全局选择器使用场景。' },
  { type: 'code', title: '假设你有两个类 `.text-dark` 和 `.bg-light`，请编写 CSS 使同时拥有这两个类的元素，`color` 为 `#333`，`background-color` 为 `#f8f9fa`。', options: [], answer: '.text-dark.bg-light {\n  color: #333;\n  background-color: #f8f9fa;\n}', explanation: '考察多类选择器定义多条样式规则。' }
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
