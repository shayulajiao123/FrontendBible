import mysql from 'mysql2/promise';

const knowledgeDoc = {
  parent_title: '第二章：CSS3',
  knowledge_point: '动画',
  content: `### 动画 (Animation)\n\nCSS3 动画允许元素在没有 JavaScript 的情况下从一种样式平滑过渡到另一种样式。\n\n**1. @keyframes 规则**\n规定动画的行为。\n\`\`\`css\n@keyframes mymove {\n  from {top: 0px;}\n  to {top: 200px;}\n}\n\`\`\`\n\n**2. animation 属性**\n将动画绑定到选择器。\n\`animation: mymove 5s infinite;\``
};

const questions = [
  { type: 'single', title: '哪个属性用于将动画绑定到选择器？', options: ['A. animation-name', 'B. animation-bind', 'C. keyframes', 'D. transition'], answer: 'A', explanation: 'animation-name 属性用于指定应用的一系列动画的名称。' },
  { type: 'single', title: '当动画完成后，保持最后一个属性值（由最后一个关键帧定义），应该设置哪个属性？', options: ['A. animation-fill-mode: backwards;', 'B. animation-fill-mode: forwards;', 'C. animation-fill-mode: both;', 'D. animation-fill-mode: none;'], answer: 'B', explanation: 'forwards 会使元素保持动画最后一帧的样式。' },
  { type: 'single', title: '以下哪个值不是 animation-timing-function 的有效值？', options: ['A. ease', 'B. linear', 'C. step-start', 'D. smooth'], answer: 'D', explanation: 'smooth 不是一个有效的时间函数，常见的是 ease, linear, ease-in, ease-out, ease-in-out, steps() 等。' },
  { type: 'single', title: '如何使动画暂停？', options: ['A. animation-play-state: paused;', 'B. animation-status: paused;', 'C. animation-state: stop;', 'D. animation-stop: true;'], answer: 'A', explanation: 'animation-play-state 属性可以用来控制动画的播放（running）或暂停（paused）。' },
  { type: 'single', title: 'animation-iteration-count 的默认值是多少？', options: ['A. 0', 'B. 1', 'C. infinite', 'D. none'], answer: 'B', explanation: '默认值为 1，表示动画播放一次。' },
  { type: 'single', title: '哪个属性定义动画何时开始？', options: ['A. animation-start', 'B. animation-delay', 'C. animation-begin', 'D. transition-delay'], answer: 'B', explanation: 'animation-delay 属性定义动画开始前等待的时间。' },
  { type: 'single', title: 'animation-direction: alternate; 的作用是什么？', options: ['A. 动画反向播放', 'B. 动画交替反向运行，即正向然后反向', 'C. 动画无限次播放', 'D. 动画暂停'], answer: 'B', explanation: 'alternate 表示动画会在奇数次数（1、3、5 等）正常播放，而在偶数次数（2、4、6 等）向后播放。' },
  { type: 'single', title: '如何为一个元素定义多个动画？', options: ['A. 使用空格分隔的多个 animation 属性', 'B. 使用逗号分隔的多个 animation 值', 'C. 无法定义多个动画', 'D. 在 @keyframes 中写多个名称'], answer: 'B', explanation: '可以通过逗号分隔在 animation 属性中指定多个动画。' },
  { type: 'single', title: '如果 animation-duration 没有指定，会发生什么？', options: ['A. 默认使用 1s', 'B. 动画不会发生', 'C. 动画会无限慢', 'D. 默认使用 0.5s'], answer: 'B', explanation: '默认的 animation-duration 是 0s，这意味着没有任何动画效果。' },
  { type: 'single', title: '以下哪个属性通常不支持 CSS 动画平滑过渡？', options: ['A. width', 'B. opacity', 'C. display', 'D. background-color'], answer: 'C', explanation: 'display 属性通常不支持在动画中进行中间状态计算。' },
  { type: 'single', title: '关于 @keyframes，如果省略了 0% 或 from 会发生什么？', options: ['A. 动画无效', 'B. 浏览器会使用元素的计算样式作为初始状态', 'C. 会报错', 'D. 动画跳过第一帧'], answer: 'B', explanation: '如果没有指定 0% 的状态，浏览器将使用该元素当前的计算值作为起始状态。' },
  { type: 'single', title: '在 animation: fadeIn 2s 1s; 中，1s 代表什么？', options: ['A. animation-duration', 'B. animation-delay', 'C. animation-iteration-count', 'D. transition-delay'], answer: 'B', explanation: '简写属性中，第一个时间值是 duration，第二个是 delay。' },
  { type: 'single', title: '哪个时间函数表示动画从头到尾的速度是相同的？', options: ['A. linear', 'B. ease', 'C. ease-in', 'D. ease-in-out'], answer: 'A', explanation: 'linear 规定以相同速度开始至结束的过渡效果。' },
  { type: 'single', title: 'animation-direction: reverse; 表示什么？', options: ['A. 动画正向播放', 'B. 动画反向播放', 'C. 动画交替播放', 'D. 动画停止'], answer: 'B', explanation: 'reverse 表示动画反向播放。' },
  { type: 'single', title: '能在 @keyframes 中使用 !important 吗？', options: ['A. 可以，提高优先级', 'B. 规范中被忽略', 'C. 会导致整个动画失效', 'D. 只有在 from 中可以使用'], answer: 'B', explanation: '在 CSS 动画规范中，关键帧中的 !important 声明会被忽略。' },
  { type: 'single', title: 'steps(n, start) 和 steps(n, end) 的区别是？', options: ['A. 没有区别', 'B. start 在时间间隔起点发生阶跃，end 在终点发生阶跃', 'C. start 表示缓慢开始', 'D. end 表示无限循环'], answer: 'B', explanation: 'steps() 是阶跃函数，start 表示第一步在动画开始时立刻执行，end 表示在每一段结束时执行。' },
  { type: 'single', title: 'animation-fill-mode: both; 会怎么表现？', options: ['A. 结合了 forwards 和 backwards 的特点', 'B. 动画不播放', 'C. 无限次播放', 'D. 只应用第一帧'], answer: 'A', explanation: 'both 会在动画开始前应用第一帧样式（backwards），并在结束后保持最后一帧样式（forwards）。' },
  { type: 'single', title: '动画执行完毕后会触发哪个 JavaScript 事件？', options: ['A. transitionend', 'B. animationstart', 'C. animationend', 'D. animationiteration'], answer: 'C', explanation: '当 CSS 动画结束时，会触发 animationend 事件。' },
  { type: 'single', title: '如何让动画在鼠标悬停时暂停？', options: ['A. :hover { animation-stop: true; }', 'B. :hover { animation-play-state: paused; }', 'C. :hover { animation-pause: true; }', 'D. :hover { animation-halt: 1; }'], answer: 'B', explanation: '使用 animation-play-state: paused; 可以暂停动画。' },
  { type: 'single', title: 'CSS 动画与 Transition 的最大区别是什么？', options: ['A. 动画可以循环播放和精确控制中间帧', 'B. 动画需要 JS 触发', 'C. 动画性能更好', 'D. 动画不能改变颜色'], answer: 'A', explanation: 'Animation 提供了 @keyframes 来控制中间状态，并可以无限循环，而 transition 通常只能定义起始和结束状态。' },
  { type: 'code', title: '编写一个名为 rotate 的 @keyframes，实现元素从 0 度旋转到 360 度。', options: [], answer: '@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }', explanation: '使用 transform: rotate() 实现旋转。' },
  { type: 'code', title: '为一个元素应用名为 slide 的动画，时长 2 秒，匀速，并且无限次循环播放。使用简写属性。', options: [], answer: 'animation: slide 2s linear infinite;', explanation: 'animation 的简写顺序通常为 name duration timing-function iteration-count。' },
  { type: 'code', title: '编写一个名为 pulse 的 @keyframes，使得元素在 50% 时缩放为 1.2 倍，100% 时恢复原状（1倍）。假设初始已经是原状。', options: [], answer: '@keyframes pulse { 50% { transform: scale(1.2); } 100% { transform: scale(1); } }', explanation: '通过 50% 和 100% 关键帧控制缩放比例。' },
  { type: 'code', title: '使用 CSS 使得某个处于 running 状态的动画，在鼠标 hover 时暂停播放。', options: [], answer: '.element:hover { animation-play-state: paused; }', explanation: '利用 :hover 伪类改变 animation-play-state 属性。' },
  { type: 'code', title: '为一个元素设置动画 fadeOut，持续 1 秒，要求动画结束后元素保持透明（即保留最后一帧的样式）。', options: [], answer: 'animation: fadeOut 1s forwards;', explanation: '使用 animation-fill-mode: forwards 保持最后状态。' }
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
