import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第一章：HTML5',
  knowledge_point: '列表标签之有序列表',
  content: `### 列表标签之有序列表

有序列表是一列项目，列表项目使用数字进行标记。
有序列表始于 \`<ol>\` 标签。每个列表项始于 \`<li>\` 标签。

**1. 基本语法**
\`\`\`html
<ol>
  <li>咖啡</li>
  <li>牛奶</li>
  <li>茶</li>
</ol>
\`\`\`
浏览器中显示如下：
1. 咖啡
2. 牛奶
3. 茶

**2. type 属性**
\`<ol>\` 的 type 属性用来设置列表项前面标记的类型：
* \`1\`：默认值，数字 (1, 2, 3...)
* \`A\`：大写字母 (A, B, C...)
* \`a\`：小写字母 (a, b, c...)
* \`I\`：大写罗马数字 (I, II, III...)
* \`i\`：小写罗马数字 (i, ii, iii...)

**3. 嵌套规则**
列表可以进行嵌套（即在一个列表项内部再包含一个新列表）。请注意，嵌套的新 \`<ol>\` 或 \`<ul>\` 必须被完全包裹在一个 \`<li>\` 标签的内部。`
};

const questions = [
  // 20 单选题
  {
    type: 'single',
    title: '在 HTML 中，定义“有序列表（Ordered List）”的最外层标签是？',
    options: ['A. <ul>', 'B. <ol>', 'C. <li>', 'D. <dl>'],
    answer: 'B',
    explanation: '<ol> 代表 Ordered List，即有序列表。<ul> 代表无序列表，而 <li> 代表列表中的单个项目。'
  },
  {
    type: 'single',
    title: '无论是有序列表 `<ol>` 还是无序列表 `<ul>`，用来定义其中“每一个列表项”的统一标签是？',
    options: ['A. <item>', 'B. <ol-item>', 'C. <li>', 'D. <list>'],
    answer: 'C',
    explanation: '<li> 代表 List Item，它是所有常规列表（有序和无序）中必须用来包裹每一行文字内容的标签。'
  },
  {
    type: 'single',
    title: '如果不给 `<ol>` 添加任何属性，浏览器默认使用哪种符号来对列表项进行排序？',
    options: ['A. 小黑圆点', 'B. 阿拉伯数字 (1, 2, 3...)', 'C. 大写英文字母 (A, B, C...)', 'D. 罗马数字 (I, II, III...)'],
    answer: 'B',
    explanation: '<ol> 的 type 属性默认值是 "1"，即默认使用阿拉伯数字进行递增排序。'
  },
  {
    type: 'single',
    title: '以下关于 `<ol>` 和 `<li>` 嵌套关系的说法中，绝对正确的是？',
    options: ['A. `<ol>` 标签内部的直接子元素只能是 `<li>`，不允许直接出现 `<div>`、`<p>` 等其他标签', 'B. `<li>` 标签内部只能放纯文本，不能套用其他 HTML 标签', 'C. `<ol>` 可以作为 `<li>` 的直接父标签，也可以把 `<ol>` 直接放在 `<p>` 标签里面', 'D. 可以在 `<ol>` 内部直接打文字，不需要 `<li>`'],
    answer: 'A',
    explanation: '这是 HTML 列表非常严格的嵌套规范。`<ol>` 和 `<ul>` 的直接子节点必须且只能是 `<li>`。绝不能在 `<ol>` 内部、`<li>` 外部随意丢弃文本或其他标签。'
  },
  {
    type: 'single',
    title: '如果要让一个有序列表以大写字母（A, B, C...）作为排序前缀，应该怎么写？',
    options: ['A. <ol style="A">', 'B. <ol list-type="A">', 'C. <ol type="A">', 'D. <ol sort="A">'],
    answer: 'C',
    explanation: '<ol> 标签内置了 type 属性，将其设置为 "A" 即可让序号显示为大写字母。'
  },
  {
    type: 'single',
    title: '如果要让一个有序列表的序号显示为：i, ii, iii, iv... 应该设置什么属性？',
    options: ['A. <ol type="i">', 'B. <ol type="I">', 'C. <ol type="a">', 'D. <ol type="1">'],
    answer: 'A',
    explanation: 'type="i" 代表小写罗马数字。而 type="I" 代表大写罗马数字。'
  },
  {
    type: 'single',
    title: '在有序列表中，如果你希望列表不要从 1 开始，而是从数字 5 开始编号（即 5, 6, 7...），你应该使用哪个属性？',
    options: ['A. begin="5"', 'B. start="5"', 'C. from="5"', 'D. index="5"'],
    answer: 'B',
    explanation: '<ol> 标签提供了一个非常实用的原生属性 `start`，用来规定列表排序的起始数字。写为 `<ol start="5">` 即可。'
  },
  {
    type: 'single',
    title: '假设你写了 `<ol type="A" start="3">`，那么列表的第一项前面显示的标号会是？',
    options: ['A. A', 'B. B', 'C. C', 'D. 3'],
    answer: 'C',
    explanation: 'type="A" 决定了使用大写字母体系，start="3" 决定了从该体系的第三个元素开始。A 是第一个，B 是第二个，C 是第三个。因此第一项是 C。'
  },
  {
    type: 'single',
    title: 'HTML5 中，`<ol>` 标签新增了一个布尔属性 `reversed`。它的作用是？',
    options: ['A. 让列表项的文字倒过来显示', 'B. 将列表的标号进行降序排列（如 3, 2, 1）', 'C. 把整个列表移到页面的右边', 'D. 取消所有的标号'],
    answer: 'B',
    explanation: 'reversed 是 HTML5 的新属性。加上它（如 `<ol reversed>`），列表项本身在 DOM 里的渲染顺序不变，但前面的序号会变成倒数（如从 3 倒数到 1）。'
  },
  {
    type: 'single',
    title: '在 `<li>` 标签内部，是否可以嵌套另一个 `<ol>` 以形成多级列表（例如类似 1.1, 1.2 的视觉缩进效果）？',
    options: ['A. 绝对不可以，会造成死循环', 'B. 可以，`<li>` 是一个纯粹的容器，它内部可以嵌套几乎任何块级或行内元素，包括完整的 `<ol>` 或 `<ul>`', 'C. 可以嵌套，但最多只能嵌套一层', 'D. 只能在 `<ol>` 直接嵌套 `<ol>`，不能套在 `<li>` 里面'],
    answer: 'B',
    explanation: '这是实现多级菜单和多级目录的标准做法。记住规则：新的列表必须完全被包裹在上一级列表的某个 `<li>` 内部。'
  },
  {
    type: 'single',
    title: '以下嵌套了多级列表的代码中，哪一个是**严重违反 HTML 规范**的？',
    options: ['A. `<ol><li>前端<ul><li>HTML</li></ul></li></ol>`', 'B. `<ol><li>第一项</li><ol><li>子项</li></ol></ol>`', 'C. `<ul><li>第一项<ol><li>子项</li></ol></li></ul>`', 'D. `<ol><li>第一项</li><li>第二项</li></ol>`'],
    answer: 'B',
    explanation: 'B 选项错在直接把内层的 `<ol>` 作为了外层 `<ol>` 的直接子元素。重申铁律：`<ol>` 的直接子元素只能是 `<li>`。内层 `<ol>` 必须放进某个 `<li>` 里面。'
  },
  {
    type: 'single',
    title: '`<ol>` 和 `<li>` 标签属于什么类型的元素？',
    options: ['A. 都是行内元素', 'B. 都是块级元素 (Block-level)', 'C. `<ol>` 是块级，`<li>` 是行内', 'D. `<ol>` 是行内，`<li>` 是块级'],
    answer: 'B',
    explanation: '它们都是典型的块级元素。它们默认都会独占一行，并且 `<ol>` 会自带上下 margin 和左侧 padding（为了腾出空间显示序号）。'
  },
  {
    type: 'single',
    title: '如果使用 CSS 将 `<li>` 的 `list-style-type` 设置为 `none`，页面上会发生什么？',
    options: ['A. 列表项内容完全消失', 'B. 列表项的前置标号（数字或字母）会被隐藏，只剩下内容', 'C. 列表项会变成水平排列', 'D. 列表会崩溃'],
    answer: 'B',
    explanation: '无论在 HTML 中是否使用了 `<ol>`，CSS 的 list-style-type: none; 都可以强制抹除前方的排序符号。这在现代网页导航栏开发中极其常用。'
  },
  {
    type: 'single',
    title: '我们在使用 Markdown 编写文档时，如果敲下 `1. 苹果` `2. 香蕉`，最终被转换为 HTML 后，它会被编译成什么标签？',
    options: ['A. <p>', 'B. <ul>', 'C. <ol>', 'D. <dl>'],
    answer: 'C',
    explanation: 'Markdown 中的带有数字前缀的语法，对应的正是 HTML 中的 Ordered List (<ol>)。'
  },
  {
    type: 'single',
    title: '在 `<li>` 标签上，存在一个名为 `value` 的属性（如 `<li value="10">`），它的作用是？',
    options: ['A. 设置该列表项文字的大小', 'B. 规定当前列表项的强制编号，它会改变后续列表项的排序基准', 'C. 给该项赋值，方便提交给后端', 'D. 设置该项的颜色'],
    answer: 'B',
    explanation: '如果 `<ol>` 中某个 `<li>` 使用了 value 属性，它会强制当前项变成指定的序号，并且紧随其后的 `<li>` 会接着这个新的数字继续递增。'
  },
  {
    type: 'single',
    title: '如果在一个 `<ol>` 列表中包含了 5 个 `<li>`，那么这 5 个 `<li>` 的排列方向默认是？',
    options: ['A. 垂直的，从上到下排列', 'B. 水平的，从左到右排列', 'C. 重叠在一起', 'D. 随机排列'],
    answer: 'A',
    explanation: '因为 <li> 是块级元素，默认遵循正常的文档流，即从上到下垂直堆叠。'
  },
  {
    type: 'single',
    title: '我们在代码编辑器中给一段连续的 `<li>` 标签增加了很多空格和缩进，这会对浏览器最终渲染的排版造成严重破坏吗？',
    options: ['A. 会，多余的缩进会让列表的圆点移位', 'B. 会，会导致换行错误', 'C. 不会，浏览器解析 HTML 时会自动折叠多余的空白字符和缩进', 'D. 会，页面会直接报错'],
    answer: 'C',
    explanation: '由于 HTML 默认的空白折叠机制，开发者可以在源代码中为了阅读美观随意使用 Tab 键给列表加上优美的层级缩进，这完全不影响浏览器最终的渲染位置。'
  },
  {
    type: 'single',
    title: '在不写任何 CSS 的情况下，`<ol>` 列表左侧显示的数字编号是渲染在哪个区域里的？',
    options: ['A. 渲染在 `<ol>` 的左内边距（padding-left）区域中', 'B. 渲染在每个 `<li>` 的文本内部', 'C. 渲染在 body 的边距上', 'D. 渲染在 `<ol>` 的外边距（margin-left）上'],
    answer: 'A',
    explanation: '这是一个经典的 CSS 面试题。浏览器默认会给 ul 和 ol 设置 padding-left（通常是 40px），专门用来放置数字标号或圆点（它们属于 marker 伪元素）。如果你把 padding-left 设为 0，标号就会被挤出版心。'
  },
  {
    type: 'single',
    title: '以下哪个场景**不适合**使用 `<ol>` 标签？',
    options: ['A. 菜谱的操作步骤（1. 洗菜 2. 切菜 3. 炒菜）', 'B. 考试成绩排名榜单（第一名、第二名、第三名）', 'C. 网站底部并列的几个外链导航（关于我们、联系我们、加入我们）', 'D. 音乐播放器中的“我的最爱 Top 10”'],
    answer: 'C',
    explanation: '<ol> 顾名思义是有序的，它的内容必须具有严格的先后顺序或等级关系。对于没有严格逻辑顺序的并列项（如底部导航），应当使用无序列表 <ul>。'
  },
  {
    type: 'single',
    title: '在 `<ol>` 列表中，如果某一个 `<li>` 里面的文字特别长导致了自动换行，第二行的文字会怎么对齐？',
    options: ['A. 会回到最左边，把数字序号包围起来', 'B. 会和第一行的文字左对齐，整体悬挂在数字序号的右侧（悬挂缩进）', 'C. 会居中显示', 'D. 会把前方的数字序号挤没'],
    answer: 'B',
    explanation: '原生列表自带“悬挂缩进”（hanging indent）效果。换行后的文本依然会与其第一行的文本对齐，而不会跑到左侧序号的正下方，这保证了列表极佳的阅读体验（list-style-position: outside 的功劳）。'
  },

  // 5 代码题
  {
    type: 'code',
    title: '请编写一段 HTML 代码，输出一个包含两步的说明书：第一步是“开机”，第二步是“关机”。要求使用正确的有序列表标签。',
    options: [],
    answer: '<ol>\n  <li>开机</li>\n  <li>关机</li>\n</ol>',
    explanation: '最基础的有序列表，使用一对 ol 标签包裹，内部使用两个 li 标签。'
  },
  {
    type: 'code',
    title: '请编写一段代码，生成一个有序列表，包含两个列表项：“前端”和“后端”。要求列表的序号不使用数字，而是使用**小写英文字母 (a, b)** 进行排序。',
    options: [],
    answer: '<ol type="a">\n  <li>前端</li>\n  <li>后端</li>\n</ol>',
    explanation: '在 ol 标签上增加 type="a" 属性即可将排序前缀改为小写字母。'
  },
  {
    type: 'code',
    title: '有一个活动名次清单，页面只需要展示从第 4 名到第 5 名的获奖者。分别是“李四”和“王五”。请使用一个有序列表，并要求前面的数字序号精确显示为 `4.` 和 `5.`。',
    options: [],
    answer: '<ol start="4">\n  <li>李四</li>\n  <li>王五</li>\n</ol>',
    explanation: '使用 start 属性可以直接干预有序列表的起始数字。'
  },
  {
    type: 'code',
    title: '请编写一段多级列表代码：建立一个外部大列表，第一项叫“中国”。在“中国”这一项的内部，再包含一个小列表（用数字排序），里面有两项：“北京”、“上海”。',
    options: [],
    answer: '<ol>\n  <li>中国\n    <ol>\n      <li>北京</li>\n      <li>上海</li>\n    </ol>\n  </li>\n</ol>',
    explanation: '这就是考察列表嵌套。重点在于：内层的 ol 必须放在外层的 li 标签结束（</li>）之前。'
  },
  {
    type: 'code',
    title: '请写出一个带有 3 个选项的有序列表。并在**第二个 `<li>` 标签上**使用一个特殊的内置属性，使其强制编号为 `10`。这会导致第三个列表项的编号自动变成 11。',
    options: [],
    answer: '<ol>\n  <li>选项一</li>\n  <li value="10">选项二</li>\n  <li>选项三</li>\n</ol>',
    explanation: '在特定的 li 标签上使用 value="10" 属性，可以强行中断原有的排序，并将当前的序号篡改为 10，后续随之递增。'
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
