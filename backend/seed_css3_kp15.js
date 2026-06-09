import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '定位',
  content: `### 定位\n\nposition 属性用于指定一个元素在文档中的定位方式。\n\n**五种定位机制：**\n1. **static (默认)**：静态定位，处于正常文档流。\n2. **relative (相对定位)**：相对其正常位置进行定位。不脱离文档流。\n3. **absolute (绝对定位)**：相对于最近的非 static 祖先元素定位。脱离文档流。\n4. **fixed (固定定位)**：相对于浏览器窗口定位。脱离文档流。\n5. **sticky (粘性定位)**：基于用户滚动位置定位。`
};

const questions = [
  { type: 'single', title: 'position的默认值是什么？', options: ['A. absolute', 'B. relative', 'C. static', 'D. fixed'], answer: 'C', explanation: 'position的默认值是static，元素处于正常的文档流中。' },
  { type: 'single', title: '以下哪种定位方式会脱离文档流？', options: ['A. static', 'B. relative', 'C. absolute', 'D. inherit'], answer: 'C', explanation: 'absolute和fixed都会脱离正常文档流，而relative和static不会。' },
  { type: 'single', title: 'absolute定位是相对于哪个元素进行定位的？', options: ['A. 浏览器视口', 'B. 最近的块级祖先元素', 'C. 最近的非static祖先元素', 'D. 父元素'], answer: 'C', explanation: 'absolute是相对于最近的position值不为static的祖先元素进行定位的。' },
  { type: 'single', title: 'fixed定位默认是相对于什么定位的？', options: ['A. 包含块', 'B. 浏览器视口', 'C. body元素', 'D. html元素'], answer: 'B', explanation: 'fixed固定定位默认是相对于浏览器视口（viewport）定位的，滚动时位置不变。' },
  { type: 'single', title: '关于sticky定位，以下说法正确的是？', options: ['A. 完全脱离文档流', 'B. 表现类似relative和fixed的结合', 'C. 不需要设置top/bottom等阈值', 'D. 兼容性支持极佳，无需考虑老旧浏览器'], answer: 'B', explanation: 'sticky是基于用户滚动位置，在relative和fixed之间切换。必须指定top, right, bottom或left之一。' },
  { type: 'single', title: '如果一个fixed定位元素的祖先元素设置了transform属性，会发生什么？', options: ['A. 无影响', 'B. fixed定位失效，变为static', 'C. 该祖先元素会成为其包含块，相对于该祖先定位', 'D. fixed元素会隐藏'], answer: 'C', explanation: '当祖先元素的transform, perspective, filter等属性非none时，会作为absolute或fixed的包含块。' },
  { type: 'single', title: 'z-index属性在什么情况下才会生效？', options: ['A. 所有元素', 'B. 仅块级元素', 'C. 定位元素（position不为static）以及flex/grid子元素', 'D. 仅绝对定位元素'], answer: 'C', explanation: 'z-index仅对定位元素（relative, absolute, fixed, sticky）或Flex/Grid容器的子元素生效。' },
  { type: 'single', title: 'relative定位的元素使用top和left进行偏移后，它原本占据的空间会怎样？', options: ['A. 被周围元素挤占', 'B. 仍然保留原本的空间', 'C. 空间高度塌陷', 'D. 随偏移量改变大小'], answer: 'B', explanation: 'relative定位元素在进行视觉偏移后，在文档流中原本占据的空间依然保留，不会影响其他元素的布局。' },
  { type: 'single', title: 'absolute定位的元素的百分比宽高是相对于其包含块的什么计算的？', options: ['A. content-box', 'B. padding-box', 'C. border-box', 'D. margin-box'], answer: 'B', explanation: '绝对定位元素的包含块通常是离它最近的定位祖先元素的padding-box。' },
  { type: 'single', title: '如何利用absolute实现一个宽高已知元素的水平垂直居中？', options: ['A. top/left: 50%; margin负值为宽高一半', 'B. top/left: 0; margin: auto', 'C. 只能用flex实现', 'D. text-align: center; vertical-align: middle'], answer: 'A', explanation: '经典居中法：top: 50%; left: 50%; margin-top: -高度一半; margin-left: -宽度一半。' },
  { type: 'single', title: '利用absolute和transform实现未知宽高元素的居中，正确的CSS是？', options: ['A. transform: translate(50%, 50%)', 'B. transform: translate(-50%, -50%)', 'C. transform: scale(-50%)', 'D. margin: auto'], answer: 'B', explanation: '设置top: 50%; left: 50%; 再使用 transform: translate(-50%, -50%)，百分比相对于元素自身宽高。' },
  { type: 'single', title: '当两个同级定位元素发生重叠且都没有设置z-index时，谁在上面？', options: ['A. 前面的元素', 'B. 后面的元素', 'C. 随机', 'D. 都不显示'], answer: 'B', explanation: '同等条件下，DOM树中后出现的元素会覆盖前面的元素（后来居上）。' },
  { type: 'single', title: '如果父元素设置了overflow: hidden，子元素是absolute定位，子元素超出父元素部分会怎样？', options: ['A. 必然被裁剪', 'B. 必然不会被裁剪', 'C. 只有当父元素也是定位元素时才会被裁剪', 'D. 浏览器会崩溃'], answer: 'C', explanation: '绝对定位子元素的包含块如果是父元素（父有定位），overflow:hidden生效；如果父元素没定位，绝对定位元素参照更上层定位元素，此时父元素的overflow不会裁剪它。' },
  { type: 'single', title: '有关层叠上下文（Stacking Context），以下哪种情况不能创建新的层叠上下文？', options: ['A. html根元素', 'B. z-index不为auto的定位元素', 'C. opacity小于1的元素', 'D. 设置了margin的元素'], answer: 'D', explanation: 'margin不会创建层叠上下文。opacity<1, transform, filter非none等都会创建。' },
  { type: 'single', title: '在Flex布局中，将子元素设置为position: absolute会发生什么？', options: ['A. 仍然参与Flex布局分配', 'B. 脱离Flex布局，不再受Flex控制', 'C. 导致Flex容器高度塌陷', 'D. 忽略top/left属性'], answer: 'B', explanation: '绝对定位元素脱离文档流，不参与Flex容器的布局计算。' },
  { type: 'single', title: 'position: sticky的生效依赖于以下哪个条件？', options: ['A. 必须有具体的宽高', 'B. 父元素不能设置overflow: hidden/scroll/auto', 'C. 必须设置z-index', 'D. 必须配合JavaScript'], answer: 'B', explanation: '如果任一祖先元素设置了overflow: hidden/scroll/auto/overlay等属性且没有足够滚动空间，sticky通常会失效。' },
  { type: 'single', title: '包含块（Containing Block）对于static元素是指什么？', options: ['A. 最近的块级祖先元素的content-box', 'B. 视口', 'C. body', 'D. 最近的定位元素'], answer: 'A', explanation: '对于static或relative，包含块就是最近的块级框、表单元格或行内块祖先元素的content-box。' },
  { type: 'single', title: '下面关于z-index的说法错误的是？', options: ['A. 可以是负数', 'B. z-index越大越靠前', 'C. 子元素的z-index一定能覆盖外部其他元素的z-index', 'D. 默认值是auto'], answer: 'C', explanation: '如果在不同的层叠上下文中，子元素的z-index只在当前层叠上下文内部比较，无法突破父级层叠上下文去覆盖外部层叠等级更高的元素。' },
  { type: 'single', title: '绝对定位元素的margin: auto在什么情况下可以用来居中？', options: ['A. 不需要任何前提', 'B. 当设置了具体的宽高，并且top/left/bottom/right都为0时', 'C. 只有在IE浏览器中', 'D. 当父元素设置了flex时'], answer: 'B', explanation: '当绝对定位元素设置了对立方向上的值为0（如top:0, bottom:0, left:0, right:0）且有固定宽高时，margin:auto会分配剩余空间实现居中。' },
  { type: 'single', title: '一个内联元素（如span）被设置为position: absolute后，它的display表现相当于？', options: ['A. inline', 'B. block', 'C. inline-block', 'D. none'], answer: 'B', explanation: '浮动和绝对定位（含fixed）会触发元素的块级化（BFC），相当于display: block（某些情况下表现类似inline-block但计算值为block）。' },
  
  { type: 'code', title: '写出一段CSS，实现一个宽200px、高100px的元素在父元素中绝对定位水平垂直居中（使用margin负值法）。', options: [], answer: 'position: absolute;\ntop: 50%;\nleft: 50%;\nmargin-top: -50px;\nmargin-left: -100px;', explanation: 'top和left设置50%，使元素左上角居中。通过margin负值为宽高的一半，将元素拉回到真正居中的位置。' },
  { type: 'code', title: '写出一段CSS，利用transform实现未知宽高元素的绝对定位居中。', options: [], answer: 'position: absolute;\ntop: 50%;\nleft: 50%;\ntransform: translate(-50%, -50%);', explanation: 'transform: translate 的百分比参照的是元素本身的宽高，因此不需要固定尺寸。' },
  { type: 'code', title: '写出一段CSS，利用margin: auto实现固定大小（例如宽200px，高200px）的绝对定位居中。', options: [], answer: 'position: absolute;\ntop: 0;\nbottom: 0;\nleft: 0;\nright: 0;\nmargin: auto;\nwidth: 200px;\nheight: 200px;', explanation: '将四个方向的偏移都设为0，然后设置margin: auto让浏览器平分剩余空间来实现居中。' },
  { type: 'code', title: '写出一个具有粘性定位特性的导航栏CSS，要求距离顶部0px时固定。', options: [], answer: 'position: sticky;\ntop: 0;\nz-index: 100;', explanation: '设置position为sticky，并设置阈值top:0，使滚动到顶部时固定。通常也会加个z-index防止被覆盖。' },
  { type: 'code', title: '如果想让一个 fixed 元素不相对于视口，而是相对于一个特定的父元素定位，父元素应该加什么CSS属性？（写出一种即可）', options: [], answer: 'transform: translateZ(0); /* 或 transform: scale(1) 等非none值 */', explanation: '含有非none transform、perspective或filter属性的元素，将建立包含块，其内部的fixed定位元素将相对于该元素进行定位，而非视口。' }
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
    console.log('Success');
  } catch (error) { console.error(error); } finally { await connection.end(); }
}
run();
