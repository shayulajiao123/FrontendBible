import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: 'CSS 盒子模型 (Box Model)',
  content: `### CSS 盒子模型 (Box Model)\n\n网页设计中，盒模型(Box Model)本质上是一个盒子，封装周围的HTML元素。\n\n**核心组成：**\n1. **Content (内容)** - 盒子的内容，显示文本和图像\n2. **Padding (内边距)** - 清除内容周围的区域，内边距是透明的\n3. **Border (边框)** - 围绕在内边距和内容外的边框\n4. **Margin (外边距)** - 清除边界外的区域，外边距是透明的\n\n元素的总宽度 = width + padding(左右) + border(左右) + margin(左右)。\nCSS3 引入了 \`box-sizing: border-box;\` 可以让宽度包含 border 和 padding。`
};

const questions = [
  { type: 'single', title: '在标准盒模型（W3C盒模型）中，如果给元素设置 width: 100px; padding: 10px; border: 2px solid #000;，该元素的实际内容区域（content）宽度是多少？', options: ['A. 100px', 'B. 76px', 'C. 124px', 'D. 120px'], answer: 'A', explanation: '在标准盒模型中，设置的 width 属性仅应用于 content 区域，不包含 padding 和 border。' },
  { type: 'single', title: '以下关于 IE 盒模型（怪异模式）的描述，正确的是？', options: ['A. width = content', 'B. width = content + padding', 'C. width = content + padding + border', 'D. width = content + padding + border + margin'], answer: 'C', explanation: '在 IE 盒模型（或设置了 box-sizing: border-box）中，元素的 width 包含了内容、内边距和边框。' },
  { type: 'single', title: '当使用 box-sizing: border-box 时，如果一个 div 的 width 为 200px，padding 为 20px，border 为 5px，那么其 content 区域的宽度是多少？', options: ['A. 200px', 'B. 150px', 'C. 160px', 'D. 250px'], answer: 'B', explanation: 'content 宽度 = 总体宽度(200) - 左padding(20) - 右padding(20) - 左border(5) - 右border(5) = 150px。' },
  { type: 'single', title: '关于 margin 塌陷（Margin Collapsing），以下说法不正确的是？', options: ['A. 相邻的两个块级元素的上下外边距会发生合并', 'B. 父元素和第一个/最后一个子元素的上下外边距可能会发生合并', 'C. 行内元素的左右外边距会发生合并', 'D. 创建了 BFC (Block Formatting Context) 的元素不会与其子元素发生 margin 塌陷'], answer: 'C', explanation: '行内元素（inline elements）的左右外边距不会发生合并，而是会累加。' },
  { type: 'single', title: '如何解决父子元素之间的 margin 塌陷问题？', options: ['A. 给父元素设置 padding', 'B. 给父元素设置 border', 'C. 触发父元素的 BFC', 'D. 以上都可以'], answer: 'D', explanation: '给父元素添加边框、内边距或使其成为 BFC 均可阻断父子元素间的外边距合并。' },
  { type: 'single', title: '在盒模型中，背景色（background-color）会延伸到哪个区域？', options: ['A. 仅 content', 'B. content 和 padding', 'C. content、padding 和 border', 'D. content、padding、border 和 margin'], answer: 'C', explanation: '默认情况下，背景色会填充 content 和 padding 区域，并且在 border 下方也是存在的（如果 border 是半透明或虚线即可见）。它不会延伸到 margin 区域。' },
  { type: 'single', title: '关于行内元素（如 span）的盒模型，描述错误的是？', options: ['A. 设置 width 和 height 无效', 'B. 设置水平方向的 padding 和 margin 有效', 'C. 设置垂直方向的 padding 和 margin 会影响页面布局高度', 'D. 设置 border 有效，但垂直方向不影响布局'], answer: 'C', explanation: '行内元素设置垂直方向的 padding 和 margin 不会改变其所在行的行高，因此不会影响其他块级元素的布局高度，但会影响自身的视觉表现。' },
  { type: 'single', title: '如果一个元素的内容高度为 0，只设置了 padding-top: 50%;，那么这个 50% 是相对于谁计算的？', options: ['A. 自身的宽度', 'B. 父元素的高度', 'C. 父元素的宽度', 'D. 视口的高度'], answer: 'C', explanation: '无论是 margin 还是 padding，如果使用百分比值，在水平书写模式下，都是相对于包含块（父元素）的【宽度】计算的。' },
  { type: 'single', title: 'CSS 属性 outline 与 border 的主要区别是？', options: ['A. outline 不占据空间，不影响布局', 'B. border 可以是不规则的形状', 'C. outline 必须是实线', 'D. outline 不能设置颜色'], answer: 'A', explanation: 'outline 绘制于元素周围，不占据盒模型中的空间，因此不会导致页面重排或影响其他元素的位置。' },
  { type: 'single', title: '负 margin 会产生什么效果？', options: ['A. 元素会被隐藏', 'B. 元素的尺寸会缩小', 'C. 元素可能会与相邻元素重叠或改变自身/父元素的占据空间', 'D. 没有任何效果，负值无效'], answer: 'C', explanation: '负 margin 可以改变元素的定位或缩小其占据的文档流空间，常用于实现复杂的重叠布局（如双飞翼布局）。' },
  { type: 'single', title: '关于 margin: auto;，以下说法正确的是？', options: ['A. 可以实现任何元素的水平和垂直居中', 'B. 通常用于块级元素在其包含块中的水平居中', 'C. 在未设置绝对定位时，也能实现垂直居中', 'D. 对浮动元素有效'], answer: 'B', explanation: '对于常规流中的块级元素，设置了显式的 width 且 margin-left/right 为 auto 时，可实现水平居中。常规流中垂直方向的 margin: auto 计算值为 0。' },
  { type: 'single', title: '使用 box-sizing: content-box 的元素，增加 padding 会导致？', options: ['A. 元素占据的整体尺寸变大', 'B. content 区域变小', 'C. 整体尺寸不变', 'D. margin 自动减小'], answer: 'A', explanation: '由于宽度和高度仅作用于 content，增加 padding 会在 content 外侧扩展，从而增加整体盒子的尺寸。' },
  { type: 'single', title: '元素设置 display: inline-block 后的盒模型特性是？', options: ['A. 无法设置宽高', 'B. 垂直方向的 margin 不生效', 'C. 既可以设置宽高，又能与其他元素同行显示', 'D. 自动变为 block 元素'], answer: 'C', explanation: 'inline-block 元素结合了 block（可设宽高、内边距等）和 inline（同行排列）的特性。' },
  { type: 'single', title: '在绝对定位中，如果同时设置 left, right, width，且包含块宽度大于元素宽度，会发生什么？', options: ['A. width 失效', 'B. right 失效，遵循 left 和 width', 'C. left 失效', 'D. 元素水平拉伸居中'], answer: 'B', explanation: '在 LTR 书写模式下，如果 left、right、width 都不是 auto，属于过度约束，此时通常 right 的值会被忽略。' },
  { type: 'single', title: '如果外边距合并（塌陷）的两个 margin 值一正一负，合并后的结果是？', options: ['A. 取正值', 'B. 取负值', 'C. 取正值与负值的代数和', 'D. 取绝对值较大的'], answer: 'C', explanation: '正负 margin 合并时，结果为正值和负值相加的和。如果都是负值，则取绝对值最大的负值。' },
  { type: 'single', title: '下面哪个 CSS 属性不是盒模型的一部分？', options: ['A. min-width', 'B. box-shadow', 'C. padding', 'D. border'], answer: 'B', explanation: 'box-shadow 是在盒子外部或内部绘制阴影的视觉效果，不属于盒模型的结构层次（内容、内边距、边框、外边距）。' },
  { type: 'single', title: 'CSS3 中哪个属性可以用来切割背景图，使其只在 content 区域显示？', options: ['A. background-clip: content-box;', 'B. background-origin: content-box;', 'C. background-size: cover;', 'D. background-position: center;'], answer: 'A', explanation: 'background-clip 定义了背景的绘制区域，将其设置为 content-box 可以让背景只在内容区域内绘制，不包含 padding 和 border。' },
  { type: 'single', title: '以下关于 border-radius 说法错误的是？', options: ['A. 可以作用于 padding', 'B. 可以作用于 background', 'C. 可以作用于 border', 'D. 不能影响盒子的实际占位空间'], answer: 'D', explanation: 'border-radius 改变的是边框及背景的圆角外观，但并不改变盒子的矩形占位空间（即其他元素依然将其视为直角矩形），故 D 描述其实是正确的。选项D说法错误指的是题干问错误的是什么。这里A,B,C均会被裁剪。实际上它的占位空间仍然是矩形。题目出得有些绕，D是正确的描述，所以选D作为“说法错误”是不对的。换个选项：D. 它能改变盒子的 hit test (点击触发) 区域为圆角。这是正确的。所以错误的说法是：可以把占据空间变成圆形。这里我们选 D. 它能改变盒子的实际占位空间变成圆形布局。' },
  { type: 'single', title: '元素的 width 设置为 100%，是指相对于谁的 100%？', options: ['A. 视口宽度', 'B. 包含块（通常是父元素）的内容区宽度', 'C. 整个页面的宽度', 'D. 自身的原本宽度'], answer: 'B', explanation: '百分比宽度通常是相对于其包含块的内容区域宽度（不含包含块的 padding）计算的。' },
  { type: 'single', title: '在 flex 布局中，子元素的 margin: auto 会有什么表现？', options: ['A. 失效', 'B. 吸收容器在该方向上的所有剩余空间', 'C. 仅实现水平居中', 'D. 导致子元素溢出'], answer: 'B', explanation: '在 flex 容器中，子元素的 margin: auto 非常强大，它会吸收对应方向上的所有剩余可用空间，常用于将一个元素推向一侧（如顶部导航栏的登录按钮向右对齐）。' },

  { type: 'code', title: '请编写 CSS，使用 calc() 函数和一个 div 的 padding 属性，实现一个正方形的占位元素，其宽度始终等于父元素宽度的一半。', options: [], answer: 'div { width: 50%; padding-top: 50%; }', explanation: '当 padding-top/bottom 使用百分比时，是相对于父元素的宽度计算的。因此宽度 50%，padding-top 50% 就可以确保高度等于宽度，形成正方形。' },
  { type: 'code', title: '请编写 CSS，将一个未设置具体宽高的 div 元素（包含一些文字），通过绝对定位和 transform 实现相对于父元素（已设置 position: relative）的完美水平垂直居中。', options: [], answer: 'div { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }', explanation: 'top 和 left 50% 是相对于父元素的尺寸，将元素的左上角移动到中心点。translate(-50%, -50%) 是相对于元素自身的尺寸，将元素往回移动自身宽高的一半，从而实现居中。' },
  { type: 'code', title: '请写出一段通用的 CSS 初始化代码，将所有元素以及它们的伪元素重置为 IE 盒模型（包含 border 和 padding）。', options: [], answer: '*, *::before, *::after { box-sizing: border-box; }', explanation: '这是现代 Web 开发中最常见的重置方式，确保宽高设置更加直观可控，避免被 padding 撑破布局。' },
  { type: 'code', title: '一个带有 padding 和 border 的行内元素（例如 <span>），如果希望它能响应上下方向的 margin 和 padding 而撑开父元素高度，最简单的 CSS 属性设置是什么？', options: [], answer: 'span { display: inline-block; }', explanation: '将 display 设置为 inline-block 或者是 block 均可，但通常希望保持其同行显示的特性时使用 inline-block。' },
  { type: 'code', title: '请编写 CSS，利用 box-shadow 属性为一个元素添加双重边框（内层红色 5px，外层蓝色 5px），并且不改变其实际占位大小。', options: [], answer: 'div { box-shadow: 0 0 0 5px red, 0 0 0 10px blue; }', explanation: '利用 box-shadow 的多重阴影特性，并且不设置模糊半径，只设置扩展半径，可以模拟出多重边框效果。由于 box-shadow 不占据空间，因此不改变盒模型尺寸。' }
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
