import mysql from 'mysql2/promise';

const docs = [
  {
    category_id: 1, parent_title: "第一章：HTML5", knowledge_point: "前端工具的选择与安装",
    content: `### 前端常见开发者工具

工欲善其事必先利其器。
1. **浏览器**：我们最重要的合作伙伴。推荐使用**谷歌浏览器 (Chrome)**，原因：简洁大方响应快、拥有强大的开发者调试工具。
2. **开发者工具 (IDE)**：推荐选择 **VSCode**，原因：打开速度快、插件丰富使用方便。

**VSCode中文语言包安装：**
扩展 (Extensions) -> 搜索 Chinese -> 点击安装，然后重启 VSCode 即可汉化。`
  },
  {
    category_id: 1, parent_title: "第一章：HTML5", knowledge_point: "VScode开发者工具快捷键",
    content: `### VSCode 常见操作与快捷键

**打开与创建文件**
1. 选择文件夹。
2. 拖拽文件夹进入编辑器。

**HTML5 基础骨架快捷键**
\`! + 回车\` 或 \`! + Tab\` 可快速生成标准 HTML5 结构。

**常用快捷键列表**
1. 代码格式化：\`Shift+Alt+F\`
2. 向上或向下移动一行：\`Alt+Up\` 或 \`Alt+Down\`
3. 快速复制一行代码：\`Shift+Alt+Up\` 或 \`Shift+Alt+Down\`
4. 快速保存：\`Ctrl + S\`
5. 快速查找：\`Ctrl + F\`
6. 快速替换：\`Ctrl + H\``
  }
];

const questions = [
  // --- 前端工具的选择与安装 (20单选 + 5实操) ---
  { kp: "前端工具的选择与安装", type: "single", title: "前端开发推荐使用哪款浏览器进行调试？", options: ["A. IE 浏览器", "B. 360 安全浏览器", "C. 谷歌浏览器 (Chrome)", "D. 搜狗浏览器"], answer: "C", explanation: "Chrome 拥有最强大的开发者工具 (DevTools) 以及非常快的 V8 引擎。" },
  { kp: "前端工具的选择与安装", type: "single", title: "为什么前端强烈推荐 Chrome 而不是 IE？", options: ["A. IE 界面太好看不习惯", "B. Chrome 拥有更完善的开发者调试工具和更好的标准支持", "C. IE 需要付费", "D. Chrome 是中国开发的"], answer: "B", explanation: "开发者工具是前端调试页面的核心，Chrome 的调试面板公认最强大。" },
  { kp: "前端工具的选择与安装", type: "single", title: "现代前端开发中，被最广泛推荐的代码编辑器是哪个？", options: ["A. 电脑自带记事本", "B. Word", "C. Visual Studio Code (VSCode)", "D. Eclipse"], answer: "C", explanation: "VSCode 打开极快，且插件生态无敌，是目前前端最火的轻量级编辑器。" },
  { kp: "前端工具的选择与安装", type: "single", title: "VSCode 全称是什么？", options: ["A. Visual Source Code", "B. Visual Studio Code", "C. Virtual Studio Code", "D. Vue Studio Code"], answer: "B", explanation: "这是微软开源的跨平台编辑器 Visual Studio Code。" },
  { kp: "前端工具的选择与安装", type: "single", title: "对于纯英文原版的 VSCode，如何将其变成中文界面？", options: ["A. 去官网下载中文特别版", "B. 在扩展里搜索 Chinese 并安装汉化包", "C. 无法变成中文", "D. 修改电脑系统语言为中文"], answer: "B", explanation: "VSCode 的语言是通过官方插件提供支持的，搜索 Chinese 安装即可。" },
  { kp: "前端工具的选择与安装", type: "single", title: "安装完 VSCode 中文语言包后，通常需要怎么做才能生效？", options: ["A. 重启电脑", "B. 重启 VSCode", "C. 卸载重装", "D. 拔掉网线"], answer: "B", explanation: "语言包插件安装后通常需要重启编辑器 (Restart) 来应用界面更新。" },
  { kp: "前端工具的选择与安装", type: "single", title: "使用 IDE 的最大优势是什么？", options: ["A. 能自动写出完美的业务代码", "B. 提供代码高亮、提示和格式化，极大提高开发效率", "C. 不用学习 HTML 也能做网页", "D. 能让电脑运行速度翻倍"], answer: "B", explanation: "IDE 相比记事本，核心优势在于提效，如语法高亮、自动补全等。" },
  { kp: "前端工具的选择与安装", type: "single", title: "在 VSCode 左侧边栏的图标中，四个小方块（其中一个分离）的图标代表什么功能？", options: ["A. 文件资源管理器", "B. 全局搜索", "C. 源代码管理", "D. 扩展 (Extensions) 管理"], answer: "D", explanation: "这是管理插件的地方，也就是安装 Chinese 语言包的入口。" },
  { kp: "前端工具的选择与安装", type: "single", title: "在 Chrome 浏览器中，最常用的打开开发者调试面板的方法是按哪个键？", options: ["A. F5", "B. F12", "C. F2", "D. F8"], answer: "B", explanation: "F12（或右键检查）是打开前端控制台最标准的方式。" },
  { kp: "前端工具的选择与安装", type: "single", title: "以下哪项不是 VSCode 受欢迎的原因？", options: ["A. 免费开源", "B. 插件丰富", "C. 重量级、功能复杂像航母", "D. 启动极快，占用资源相对少"], answer: "C", explanation: "VSCode 定位是轻量级代码编辑器，而非重量级全家桶 IDE。" },
  { kp: "前端工具的选择与安装", type: "single", title: "网页前端三剑客（HTML, CSS, JS）的代码，用哪种工具完全无法编写？", options: ["A. Sublime Text", "B. Photoshop", "C. VSCode", "D. Windows 记事本"], answer: "B", explanation: "PS 是图像处理软件，不能用来编写纯文本代码文件。" },
  { kp: "前端工具的选择与安装", type: "single", title: "在前端开发中，“浏览器”主要承担什么角色？", options: ["A. 编写代码", "B. 编译打包压缩", "C. 解析代码并渲染成可视化的用户界面", "D. 存储用户密码到数据库"], answer: "C", explanation: "浏览器的内核负责将 HTML/CSS/JS 解析为用户最终看到的网页排版。" },
  { kp: "前端工具的选择与安装", type: "single", title: "如果你在写 HTML 时，标签没有变色（没有高亮），最可能的原因是？", options: ["A. 电脑卡了", "B. 文件没有以 .html 为后缀保存，IDE 把它当成了普通文本", "C. 键盘坏了", "D. 浏览器不支持"], answer: "B", explanation: "编辑器是根据文件后缀名来决定使用哪种语言的语法高亮规则的。" },
  { kp: "前端工具的选择与安装", type: "single", title: "如果要开发一个完整的网站项目，在 VSCode 中最好的打开方式是？", options: ["A. 挨个双击打开 html 文件", "B. 直接把整个项目文件夹拖拽到 VSCode 中打开", "C. 每次新建一个窗口", "D. 压缩成 zip 再打开"], answer: "B", explanation: "以文件夹(工作区)形式打开，才能利用全局搜索、文件关联等高级功能。" },
  { kp: "前端工具的选择与安装", type: "single", title: "前端开发为什么需要不断刷新浏览器？", options: ["A. 防止电脑死机", "B. 浏览器有 Bug", "C. 重新加载并解析最新保存的代码文件", "D. 清理内存"], answer: "C", explanation: "静态 HTML 修改保存后，浏览器不会自动更新（除非使用热更新工具），需要手动刷新重新读取文件。" },
  { kp: "前端工具的选择与安装", type: "single", title: "在 Chrome 开发者工具中，哪个面板主要用来查看和实时修改 HTML 标签与 CSS 样式？", options: ["A. Console (控制台)", "B. Network (网络)", "C. Elements (元素)", "D. Sources (源代码)"], answer: "C", explanation: "Elements 面板展示了当前网页的 DOM 树和对应的样式。" },
  { kp: "前端工具的选择与安装", type: "single", title: "如果不小心关掉了 VSCode 的侧边栏，如何快速找回？", options: ["A. 重装软件", "B. 重启电脑", "C. 在菜单栏“查看(View)”中勾选外观相关选项，或使用快捷键 Ctrl+B", "D. 无法找回"], answer: "C", explanation: "Ctrl+B 是切换侧边栏显示/隐藏的默认快捷键。" },
  { kp: "前端工具的选择与安装", type: "single", title: "VSCode 相比 WebStorm 最大的不同点是？", options: ["A. VSCode 是收费的", "B. VSCode 默认更像一个轻量文本编辑器，复杂功能高度依赖按需安装插件", "C. VSCode 只能写前端", "D. VSCode 不支持代码高亮"], answer: "B", explanation: "WebStorm 是开箱即用的重型 IDE，而 VSCode 是插件化生态驱动的轻量级编辑器。" },
  { kp: "前端工具的选择与安装", type: "single", title: "在 VSCode 中安装大量无用插件会导致什么后果？", options: ["A. 电脑爆炸", "B. 编辑器启动变慢，占用大量内存", "C. 代码自动写完", "D. 没有任何影响"], answer: "B", explanation: "插件虽然好，但每个插件都会消耗内存和 CPU，安装过多会拖慢 VSCode 甚至导致卡顿。" },
  { kp: "前端工具的选择与安装", type: "single", title: "为什么新手学习推荐自己手敲代码，而不是完全依赖 IDE 的自动补全？", options: ["A. 自动补全全是错的", "B. IDE 补全要收费", "C. 手敲有助于形成肌肉记忆，真正掌握语法基础", "D. 手敲比较酷"], answer: "C", explanation: "对于核心语法，手写能避免后期脱离了 IDE 就完全不会写代码的尴尬境地。" },
  { kp: "前端工具的选择与安装", type: "code", title: "实操测试：如何在 VSCode 中快速打开插件管理面板以安装中文包？", options: [], answer: "点击左侧边栏由四个正方形组成的 'Extensions' (扩展) 图标，或者使用快捷键 Ctrl+Shift+X。", explanation: "进入扩展面板后，在搜索框输入 Chinese 即可。" },
  { kp: "前端工具的选择与安装", type: "code", title: "实操测试：如何在电脑上用最标准的方式把项目文件夹拖入 VSCode？", options: [], answer: "将整个项目文件夹从操作系统的文件管理器中拖动，并释放在 VSCode 编辑器的空白区域即可完整加载工作区。", explanation: "以工作区打开是开发大型项目的基础规范。" },
  { kp: "前端工具的选择与安装", type: "code", title: "实操测试：如何验证 Chrome 浏览器已经成功打开了开发者工具？", options: [], answer: "在网页任意位置点击右键，选择“检查 (Inspect)”，若页面侧边或底部弹出了包含 Elements、Console 标签的复杂面板即为成功。", explanation: "这是排查所有页面 Bug 的发源地。" },
  { kp: "前端工具的选择与安装", type: "code", title: "实操测试：若 VSCode 中出现提示需要 Reload Window (重载窗口)，应该怎么操作？", options: [], answer: "点击提示框上的 'Reload' 按钮，或者按 F1 调出命令面板，输入并选择 'Developer: Reload Window'。", explanation: "在安装新插件或修改深层配置后，常常需要重载窗口以使其生效。" },
  { kp: "前端工具的选择与安装", type: "code", title: "实操测试：请解释为什么很多老师上课用的 VSCode 背景是黑色，而新安装的可能是白色？如何调整？", options: [], answer: "这是因为 VSCode 支持色彩主题。可以通过左下角齿轮 -> Color Theme (颜色主题) 中切换为 Dark 系列主题。", explanation: "暗色主题长时间看代码不容易视觉疲劳，深受程序员喜爱。" },

  // --- VScode开发者工具快捷键 (20单选 + 5实操) ---
  { kp: "VScode开发者工具快捷键", type: "single", title: "在空的 HTML 文件中，快速生成基础骨架代码的快捷键组合是什么？", options: ["A. HTML + Tab", "B. ! + 回车 或 Tab", "C. Shift + H", "D. Ctrl + Enter"], answer: "B", explanation: "在 VSCode 中（依托内置的 Emmet 插件），输入英文叹号 `!` 并按回车或 Tab 即可瞬间生成网页骨架。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "写代码时缩进变得非常乱，快速格式化代码对齐的快捷键是？", options: ["A. Ctrl + S", "B. Alt + F4", "C. Shift + Alt + F", "D. Ctrl + C"], answer: "C", explanation: "Shift+Alt+F 是默认的代码格式化快捷键，能让乱七八糟的缩进瞬间变得规整。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "想把当前这一行代码移动到上面一行，需要按住哪个快捷键？", options: ["A. Ctrl + Up", "B. Alt + Up", "C. Shift + Up", "D. Space + Up"], answer: "B", explanation: "按住 Alt 键配合上下方向键，可以将当前行任意上下穿梭移动。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "快速复制当前行代码并在下方立刻粘贴出一模一样的一行的快捷键是？", options: ["A. Ctrl + C 然后 Ctrl + V", "B. Shift + Alt + Down", "C. Alt + Enter", "D. Ctrl + D"], answer: "B", explanation: "Shift + Alt + 向下键（或向上键）能够原地快速克隆整行代码，极其高效。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "前端写完代码后，必须按下什么快捷键保存，浏览器才能刷新出新内容？", options: ["A. Ctrl + P", "B. Ctrl + S", "C. Ctrl + B", "D. Ctrl + Z"], answer: "B", explanation: "Ctrl+S (Save) 是所有文档编辑类软件通用的保存快捷键。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "如果在一个 1000 行的文件里，想要快速找到关键词 `<img>`，应该按哪个快捷键调出查找框？", options: ["A. Ctrl + F", "B. Ctrl + H", "C. Ctrl + P", "D. Ctrl + G"], answer: "A", explanation: "Ctrl+F (Find) 是查找快捷键。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "如果你发现错把所有的 `<img>` 都写成了 `<images>`，想要一键全局替换，快捷键是？", options: ["A. Ctrl + F", "B. Ctrl + H", "C. Ctrl + R", "D. Ctrl + Alt + T"], answer: "B", explanation: "Ctrl+H 是替换 (Replace) 功能的快捷键，能够成批修正错误代码。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "在输入 `!` 试图生成骨架时，发现没有生效，最可能的原因是什么？", options: ["A. 键盘坏了", "B. 输入的是中文叹号 `！`", "C. 电脑没联网", "D. 浏览器卡了"], answer: "B", explanation: "VSCode 的 Emmet 语法严格要求所有的触发符号必须是英文半角状态（小叹号 `!`）。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "以下哪个操作会导致代码直接被删除？", options: ["A. 选中代码按 Backspace 或 Delete", "B. 选中代码按 Ctrl + X (剪切)", "C. 将代码移动到文件最底部", "D. A和B都有可能导致代码从屏幕上消失"], answer: "D", explanation: "剪切也会将代码从原位置移除，但这与直接删除的区别在于内容存入了剪贴板。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "在格式化代码 (Shift+Alt+F) 时如果提示找不到 Formatter，这意味着什么？", options: ["A. 代码写得太烂无法拯救", "B. 系统内存不足", "C. 当前文件类型尚未安装或配置对应的代码格式化插件", "D. 键盘坏了"], answer: "C", explanation: "有时候需要额外安装 Prettier 或其他语言专属的格式化插件才能提供更好的对齐支持。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "不小心删掉了一大段非常重要的代码，想要撤销上一步操作，按什么？", options: ["A. Ctrl + Z", "B. Ctrl + Y", "C. Ctrl + S", "D. Alt + Z"], answer: "A", explanation: "Ctrl+Z (Undo) 是天下程序员的后悔药。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "如果撤销 (Ctrl+Z) 撤销过头了，想恢复（取消撤销/重做），该按什么？", options: ["A. Ctrl + Shift + Z 或者 Ctrl + Y", "B. Ctrl + S", "C. Alt + Enter", "D. Ctrl + X"], answer: "A", explanation: "这是重做 (Redo) 快捷键，帮助在时间线中前进。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "当你按 Ctrl + S 时，文件标签卡上的某个特殊图标会消失，这个图标通常是？", options: ["A. 一个叉号 X", "B. 一个小圆点 ●", "C. 一个锁 🔒", "D. 一个星号 *"], answer: "B", explanation: "在 VSCode 中，文件名旁边出现实心小白点代表该文件被修改过但尚未保存。保存后圆点会变回叉号。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "在使用 Alt+Up/Down 移动代码块时，如果同时选中了多行，会发生什么？", options: ["A. 只有第一行移动", "B. 选中的所有行会作为一个整体上下移动", "C. 代码会报错", "D. 这些行会被自动折叠"], answer: "B", explanation: "这个快捷键完美支持多行同时选中并整体平移位置，非常适合调整 HTML 嵌套层级。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "在查找 (Ctrl+F) 时，如果想忽略大小写差异（让 A 和 a 视为一样），应该怎么做？", options: ["A. 这是默认行为，或者点击查找框里的 Aa 图标取消区分大小写", "B. 无法做到", "C. 必须使用正则表达式", "D. 按下 CapsLock 键"], answer: "A", explanation: "VSCode 查找默认不区分大小写，且提供了专门的开关按钮控制。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "如果不小心按到了键盘的 Insert 键，会导致输入时光标变成方块并且吃掉后面的字符（覆盖模式），如何退出？", options: ["A. 重启电脑", "B. 卸载重装", "C. 再次按一下键盘上的 Insert 键切换回插入模式", "D. 按下 Esc 键"], answer: "C", explanation: "Insert 键会在“插入模式”和“覆盖/改写模式”之间切换，很多新手会因此困扰。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "想在一行极长的代码中强制使其在屏幕边缘自动换行显示（只是视觉换行，不实际增加回车），按什么？", options: ["A. Alt + Z", "B. Enter", "C. Shift + Enter", "D. Ctrl + Z"], answer: "A", explanation: "Alt+Z (Toggle Word Wrap) 可以在超出屏幕宽度的长代码时开启自动折行，方便阅读。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "在编写 HTML 时，输入 `div*3` 然后按 Tab 会发生什么？", options: ["A. 插入文字 'div*3'", "B. 程序报错", "C. 瞬间生成 3 个相互独立的 `<div></div>` 标签", "D. 打开计算器"], answer: "C", explanation: "这也是 Emmet 语法的强大之处，支持乘号 `*` 快速批量生成重复的标签结构。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "在使用快捷键克隆代码 (Shift+Alt+Down) 时，如果没有选中任何内容而只把光标停在某一行，会克隆什么？", options: ["A. 什么都不发生", "B. 克隆整个文件", "C. 克隆光标所在的那一整行", "D. 程序卡死"], answer: "C", explanation: "即使不选中，VSCode 默认也会对光标所在的一整行执行复制。" },
  { kp: "VScode开发者工具快捷键", type: "single", title: "代码写到一半出现红波浪线，这通常暗示着什么？", options: ["A. 这是一条美丽的装饰线", "B. 你的系统遭到黑客攻击", "C. 此处存在语法错误或拼写错误", "D. 代码被保存了"], answer: "C", explanation: "编辑器内置了 Linter，会自动检测不符合语法的代码并用红色波浪线标出予以警告。" },
  { kp: "VScode开发者工具快捷键", type: "code", title: "实操测试：在空 HTML 文件中，请写出按下 `! + Tab` 后，自动生成的前3行基础骨架代码是什么？", options: [], answer: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>", explanation: "默认生成的会附带 lang=\"en\" 的语言属性声明。" },
  { kp: "VScode开发者工具快捷键", type: "code", title: "实操测试：如果你想把 <h1> 标签整体移动到 <h2> 标签的下方，在不使用鼠标的情况下，描述你的纯快捷键操作流程。", options: [], answer: "将光标停留在 <h1> 那一行，按住 Alt 键，连续按下方向键(Down)，直到 <h1> 行移动到了 <h2> 的下方再松开。", explanation: "这种移动方式比剪切再粘贴更高效更不容易出错。" },
  { kp: "VScode开发者工具快捷键", type: "code", title: "实操测试：如果你想生成 5 个平级的 `<p></p>` 段落标签，请写出可以一键展开的 Emmet 快捷缩写代码。", options: [], answer: "p*5", explanation: "输入 `p*5` 然后直接敲击 Tab 或者 Enter 键即可。" },
  { kp: "VScode开发者工具快捷键", type: "code", title: "实操测试：当你在编辑器写完一行长长的代码后，想快速另起新的一行（此时光标还在上一行的中间位置），你应该按什么组合键？", options: [], answer: "Ctrl + Enter", explanation: "Ctrl + Enter 可以无视当前光标位置，直接在下方开启并跳入一个崭新的空行。" },
  { kp: "VScode开发者工具快捷键", type: "code", title: "实操测试：如果你希望把文件里所有的 'oldClass' 字符串替换成 'newClass'，请写出完整的操作步骤。", options: [], answer: "1. 按下 Ctrl + H 调出替换面板；2. 在第一栏(Find)输入 oldClass；3. 在第二栏(Replace)输入 newClass；4. 点击 'Replace All' 图标（或按 Ctrl+Alt+Enter）。", explanation: "全局批量替换是重构代码的极简利器。" }
];

async function run() {
  const pool = mysql.createPool({ host: 'localhost', user: 'root', password: '', database: 'frontend_bible' });
  let [catRows] = await pool.query('SELECT id FROM categories WHERE name = ?', ['HTML5']);
  let categoryId = catRows[0].id;
  
  let qCount = 0;
  for (const doc of docs) {
     await pool.query(
       'INSERT INTO knowledge_docs (category_id, parent_title, knowledge_point, content, created_at) VALUES (?, ?, ?, ?, UNIX_TIMESTAMP())',
       [categoryId, doc.parent_title, doc.knowledge_point, doc.content]
     );
     
     const qs = questions.filter(q => q.kp === doc.knowledge_point);
     for (const q of qs) {
        let optionsStr = JSON.stringify(q.options || []);
        await pool.query(
          'INSERT INTO questions (category_id, knowledge_point, type, title, options, answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [categoryId, doc.knowledge_point, q.type, q.title, optionsStr, q.answer, q.explanation]
        );
        qCount++;
     }
  }
  console.log(`✅ 成功灌入剩余两个知识点与 ${qCount} 道题！`);
  process.exit(0);
}
run();
