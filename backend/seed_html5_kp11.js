import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第一章：HTML5',
  knowledge_point: '表格单元格合并',
  content: `### 表格单元格合并

在表格中，我们经常需要把多个单元格合并成一个大的单元格（类似于 Excel 中的合并单元格功能）。这需要用到 \`colspan\` 和 \`rowspan\` 属性。

**1. 跨列合并 (colspan)**
* 如果要将两个或多个**横向相邻（水平方向）**的单元格合并为一个，请使用 \`colspan\` 属性。
* 语法：\`<td colspan="合并的数量">...</td>\` 或 \`<th colspan="合并的数量">...</th>\`
* **注意**：合并后，该行原本多出来的后面的 \`<td>\` 标签必须被删掉，否则表格会被撑破变形。

**2. 跨行合并 (rowspan)**
* 如果要将两个或多个**纵向相邻（垂直方向）**的单元格合并为一个，请使用 \`rowspan\` 属性。
* 语法：\`<td rowspan="合并的数量">...</td>\` 或 \`<th rowspan="合并的数量">...</th>\`
* **注意**：合并后，**下一行（或下面几行）**对应的 \`<td>\` 标签必须被删掉。

**3. 合并原则总结**
* 先确定是跨行还是跨列。
* 找到目标单元格，写上合并属性 \`colspan=n\` 或 \`rowspan=n\`。
* 删除多余的单元格。跨列删除同行的，跨行删除下方行的。`
};

const questions = [
  // 20 单选题
  {
    type: 'single',
    title: '在 HTML 表格中，用于实现“水平方向（跨列）合并单元格”的属性是？',
    options: ['A. rowspan', 'B. colspan', 'C. merge-col', 'D. span-x'],
    answer: 'B',
    explanation: 'colspan 全称为 column span（列跨度），专用于横向合并同行内的多个列单元格。'
  },
  {
    type: 'single',
    title: '在 HTML 表格中，用于实现“垂直方向（跨行）合并单元格”的属性是？',
    options: ['A. colspan', 'B. merge-row', 'C. span-y', 'D. rowspan'],
    answer: 'D',
    explanation: 'rowspan 全称为 row span（行跨度），专用于纵向合并不同行之间的单元格。'
  },
  {
    type: 'single',
    title: '`colspan` 和 `rowspan` 属性应该添加在表格的哪个标签上？',
    options: ['A. 必须加在 <table> 上', 'B. 必须加在 <tr> 上', 'C. 只能加在 <td> 或 <th> 上', 'D. 可以加在表格的任何标签上'],
    answer: 'C',
    explanation: '合并单元格是对具体的“数据格子”进行操作，因此合并属性必须写在具体的 <td> 或表头 <th> 标签内部。'
  },
  {
    type: 'single',
    title: '如果写了 `<td colspan="3">`，这意味着什么？',
    options: ['A. 该单元格会横向吞并它右侧的 2 个单元格，使得它自己占据了原来 3 个单元格的宽度', 'B. 该单元格的高度会变成原来的 3 倍', 'C. 表格会增加 3 个新的列', 'D. 单元格内部最多只能输入 3 个字符'],
    answer: 'A',
    explanation: 'colspan="3" 表示该单元格自身的宽度跨越了 3 列的距离。'
  },
  {
    type: 'single',
    title: '当我们使用 `colspan="2"` 横向合并了第一行的前两个单元格后，必须紧接着做什么操作才能保证表格不破损？',
    options: ['A. 在 <table> 标签里写上 width="200%"', 'B. 把第一行原本的第二个 `<td>` 标签从代码中彻底删除', 'C. 给第二个单元格加上 display: none', 'D. 把第二行的单元格也删掉一个'],
    answer: 'B',
    explanation: '这是合并列的铁律：当你让一个单元格占据了 2 个位置时，它身后的那一个位置就被顶占了。为了保持整行格子总数不变，必须在源码中删掉那个多余的 <td>。'
  },
  {
    type: 'single',
    title: '当我们使用 `rowspan="2"` 纵向合并了第一行和第二行的第一个单元格后，必须做什么操作才能保证表格不破损？',
    options: ['A. 删掉第一行同级别的第二个单元格', 'B. 删掉第二行（紧接着的下一行）的第一个单元格', 'C. 用 CSS 隐藏第二行', 'D. 给第二行加一个空单元格'],
    answer: 'B',
    explanation: '这是合并行的铁律：第一行的格子向“下”伸长占据了第二行的位置，那么第二行原本位于该位置的 <td> 标签就变成了多余的，必须在源码中将其删除。'
  },
  {
    type: 'single',
    title: '已知一个 3 行 3 列的标准表格（总共 9 个 td）。现在你将第一行第一个格子设置了 `rowspan="3"`。那么在代码中，第二行和第三行分别应该剩下几个 td 标签？',
    options: ['A. 都剩 3 个', 'B. 第二行 3 个，第三行 2 个', 'C. 第二行 2 个，第三行 2 个', 'D. 第二行 1 个，第三行 1 个'],
    answer: 'C',
    explanation: '第一行的第一个格子垂直向下伸展了 3 行，它占据了第一、二、三行的第一列位置。因此，第二行和第三行的第一个 <td> 必须被删掉，它们各自只剩下后面 2 个 td。'
  },
  {
    type: 'single',
    title: '如果在一个标准的 2行 2列 的表格中，你在代码里写了这样的第一行：`<tr> <td colspan="2">A</td> <td>B</td> </tr>`。这会导致什么后果？',
    options: ['A. A 和 B 正常显示在一行，各占一半', 'B. 浏览器报错', 'C. 这一行的总宽度相当于 3 个单元格，会把表格原本 2 列的布局撑破，右侧凸出一块', 'D. B 会自动掉到第二行去'],
    answer: 'C',
    explanation: '原本规定是 2 列。你的 A 占据了 2 列，后面还跟着个占 1 列的 B，这一行总共就有了 3 列的宽度。这会导致表格的网格系统完全错乱。'
  },
  {
    type: 'single',
    title: '在合并单元格时，如果一个单元格同时需要跨越 2 行和 2 列（变成一个占用 4 个标准格子的大方块），正确的写法是？',
    options: ['A. <td span="4">', 'B. <td rowspan="2" colspan="2">', 'C. <td merge="2,2">', 'D. 不能同时跨行又跨列'],
    answer: 'B',
    explanation: '在 HTML 中，完全可以在同一个 td 上同时使用 rowspan 和 colspan，来实现区域性的块状合并。只要记住删掉对应的右侧 1 个和下侧 2 个相关 td 即可。'
  },
  {
    type: 'single',
    title: '“将表格的第一行的所有 4 个列单元格合并为一个巨大的表头总标题”。这需要用到哪个属性？',
    options: ['A. colspan="4"', 'B. rowspan="4"', 'C. colspan="1"', 'D. align="center"'],
    answer: 'A',
    explanation: '横向合并同一行内的多个列，使用的是 colspan。占据 4 列就是 colspan="4"。'
  },
  {
    type: 'single',
    title: '在一个 2 行 3 列的表格中，第一行代码为：`<tr><td>1</td><td rowspan="2">2</td><td>3</td></tr>`。那么第二行的正确代码应该是怎么样的？',
    options: ['A. <tr><td>4</td><td>5</td><td>6</td></tr>', 'B. <tr><td>4</td><td>6</td></tr>', 'C. <tr><td>4</td></tr>', 'D. <tr><td>5</td><td>6</td></tr>'],
    answer: 'B',
    explanation: '第一行的中间单元格（第 2 列）使用了 rowspan="2" 向下伸展，占据了第二行的第 2 列。因此第二行的代码只能保留第 1 列和第 3 列的单元格。'
  },
  {
    type: 'single',
    title: '如果我们想在 HTML 中合并两个原本不相邻的单元格（比如合并第 1 列和第 3 列，跳过第 2 列），使用 colspan 能够实现吗？',
    options: ['A. 能，写 colspan="1,3"', 'B. 不能，colspan 和 rowspan 只能合并相邻的物理单元格区块', 'C. 能，配合 CSS 可以实现', 'D. 能，使用 span-jump 属性'],
    answer: 'B',
    explanation: 'HTML 的表格合并机制基于连续的网格模型。你只能合并相邻的单元格形成一个连续的矩形区块。如果想要非相邻合并，只能通过复杂的嵌套子表格或者改变数据结构来模拟。'
  },
  {
    type: 'single',
    title: '在早期的 Web 开发中，为什么设计师经常疯狂地使用复杂的 colspan 和 rowspan？',
    options: ['A. 为了让文字变大', 'B. 因为当时没有 Flex 和 Grid 这样的 CSS 布局神器，只能通过切图和极其复杂的表格嵌套及合并来实现网页的整体版面排版', 'C. 为了提高网页的加载速度', 'D. 为了防止代码被别人抄袭'],
    answer: 'B',
    explanation: '这是前端发展史的一个缩影。当年著名的“Table 切图布局法”就是把一张大网页设计稿切成几十块，然后用表格合并的手段拼图一样拼起来。'
  },
  {
    type: 'single',
    title: '如果在一个普通的 `<td>` 上不小心写了 `colspan="0"`（在 HTML5 规范下），它通常意味着什么？',
    options: ['A. 隐藏这个单元格', 'B. 这个单元格将横跨该行剩下的所有列，一直延伸到行尾（尽管并非所有浏览器都完全支持）', 'C. 这个单元格会单独跑到下一行', 'D. 会立刻引发 JS 报错'],
    answer: 'B',
    explanation: '在 HTML5 规范中，colspan="0" 有一个特殊语义：指示浏览器让该单元格跨越当前列组中剩余的所有列。不过由于兼容性问题，实战中极少使用，通常都是直接写明确的数字。'
  },
  {
    type: 'single',
    title: '使用合并单元格后，对使用“屏幕阅读器”的盲人用户有什么潜在影响？',
    options: ['A. 没有任何影响，盲人软件非常智能', 'B. 会导致阅读器死机', 'C. 复杂的合并（特别是同时跨行跨列）会严重破坏阅读器对数据行列关系的解析，导致朗读顺序混乱，视障用户极难理解表格', 'D. 会让阅读器自动翻译成英文'],
    answer: 'C',
    explanation: '从无障碍（A11y）的角度看，尽量保持表格为简单的二维规则网格。如果必须合并，最好使用专门的表头关联属性（如 headers 和 scope 属性）来辅助屏幕阅读器。'
  },
  {
    type: 'single',
    title: '一个 3 行的表格，其中第 1 行和第 2 行使用了 rowspan。现在用 JavaScript 动态删除了第 1 行（移除了该 tr DOM 节点）。这时候会发生什么？',
    options: ['A. 第 2 行会自动补齐丢失的单元格', 'B. 整个表格直接崩溃不可见', 'C. 由于 rowspan 所依附的宿主单元格被删除了，被它原本跨越的第 2 行会出现空缺，导致表格结构完全错乱', 'D. 没有任何变化'],
    answer: 'C',
    explanation: '这是动态操作复杂表格的梦魇。rowspan 存在严重的强耦合性，删除了带有 rowspan 的上级节点，下级被占用的坑位就空出来了，必须用 JS 手动去补齐 <td> 才能恢复整齐。'
  },
  {
    type: 'single',
    title: '假设我们要展示一份包含“上午”和“下午”两大分类的日程表。“上午”分类下包含 3 节课。要在左侧显示“上午”二字并覆盖这 3 节课的高度，应该给“上午”这个 `<td>` 加上什么属性？',
    options: ['A. colspan="3"', 'B. rowspan="3"', 'C. height="3"', 'D. span="3"'],
    answer: 'B',
    explanation: '覆盖 3 节课的高度，意味着在垂直方向上跨越 3 行，因此绝对是 rowspan="3"。'
  },
  {
    type: 'single',
    title: '以下哪种情况**不需要**删除多余的 `<td>` 标签？',
    options: ['A. 使用 colspan 横向合并了 2 列', 'B. 使用 rowspan 纵向合并了 2 行', 'C. 将某个 td 内部的文字加粗了', 'D. A 和 B 都不需要'],
    answer: 'C',
    explanation: '只有发生了 colspan 或 rowspan 的跨网格合并行为时，才需要“杀掉”被挤占位置的其他单元格。纯粹的内容格式化不影响网格结构。'
  },
  {
    type: 'single',
    title: '如果我们给表格增加了一个 `<caption>`（表格标题），是否需要考虑用 colspan 让它横跨整个表格宽度？',
    options: ['A. 必须写 colspan，否则标题只会挤在第一列', 'B. 完全不需要，<caption> 不属于单元格网格的一部分，它天然就会在整个表格上方居中显示', 'C. 需要用 rowspan', 'D. 取决于浏览器的类型'],
    answer: 'B',
    explanation: '这是一个常见的认知误区。caption 不是 th 或 td，它不参与行列划分，因此根本不存在 colspan 这个概念，它会自动适应并跨越表格的整体宽度。'
  },
  {
    type: 'single',
    title: '如果代码写成 `<td colspan="1">内容</td>`，它的实际效果是？',
    options: ['A. 报错', 'B. 单元格消失', 'C. 和不写 colspan 完全一样，它只占据自己本身这 1 列的正常空间', 'D. 会合并它右边的一个格子'],
    answer: 'C',
    explanation: '所有单元格默认就是占据 1 行、1 列的。显式写 colspan="1" 是多此一举，没有任何特殊的合并效果。'
  },

  // 5 代码题
  {
    type: 'code',
    title: '已知有一个 1行 2列 的简单表格：`<tr> <td>左边</td> <td>右边</td> </tr>`。请重写这一行代码，将其两个单元格合并为一个，文字内容变为“大通栏”。',
    options: [],
    answer: '<tr>\n  <td colspan="2">大通栏</td>\n</tr>',
    explanation: '横向合并同行内的两个单元格，使用 colspan="2"，并且必须删掉原本的第二个 td 标签。'
  },
  {
    type: 'code',
    title: '有一个 2行 2列 的表格。我们要把**第一行的第 1 列**和**第二行的第 1 列**（即垂直方向的前两个格子）合并为一个写着“左侧合并”的单元格。右侧的两个格子分别保留“右上”和“右下”。请完整写出这 2 行的代码。',
    options: [],
    answer: '<tr>\n  <td rowspan="2">左侧合并</td>\n  <td>右上</td>\n</tr>\n<tr>\n  <td>右下</td>\n</tr>',
    explanation: '在第一行的第一个 td 上使用 rowspan="2" 向下伸展，然后来到第二行的代码时，必须删掉其原本的第一个 td（因为它已经被上方霸占了位置）。'
  },
  {
    type: 'code',
    title: '请写出一个 2行 2列 表格的完整 HTML 结构（不用写外层 table）。要求：将第一行完全合并为单个表头 `<th>`，显示“个人资料”。第二行保留两个普通的 `<td>`，分别显示“姓名”和“张三”。',
    options: [],
    answer: '<tr>\n  <th colspan="2">个人资料</th>\n</tr>\n<tr>\n  <td>姓名</td>\n  <td>张三</td>\n</tr>',
    explanation: '由于第二行有 2 个数据列，证明这是个两列的表格。第一行要通栏，就需要 th colspan="2" 跨越两列。'
  },
  {
    type: 'code',
    title: '已知一个表格有 3 行，每行 3 列。你在第一行第一列的元素上写了 `<td rowspan="3" colspan="3">核心</td>`。请写出这 3 行代码在完全优化合并后（删除所有被占坑的多余 td）的最终形态。',
    options: [],
    answer: '<tr>\n  <td rowspan="3" colspan="3">核心</td>\n</tr>\n<tr>\n</tr>\n<tr>\n</tr>',
    explanation: '由于它同时向下和向右各跨越了 3 格（霸占了整个 3x3 也就是全部 9 个格子的空间），那么第一行的后两个格子要删掉，第二行的三个格子全删，第三行的三个格子也全删，只剩下空荡荡的 tr 标签。'
  },
  {
    type: 'code',
    title: '请找茬并修改这段破损的合并代码：`<tr><td colspan="2">合并区域</td><td>多出来的数据</td></tr>`。（假设这是一个总宽度仅为 2 列的表格）',
    options: [],
    answer: '<tr>\n  <td colspan="2">合并区域</td>\n</tr>',
    explanation: '既然表格规定只有 2 列，而第一个 td 已经通过 colspan="2" 独占了这 2 列的宽度。那么它身后紧跟的那个 td 就会撑破表格，必须将其删除。'
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
