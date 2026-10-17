'use strict';
const stories = {
  home: { transcript: '“小时候住在河边。夏天的傍晚，奶奶会搬一把竹椅，坐在门口等我们回家吃饭。”', duration: '示例片段 / 00:18', title: '河边的家，门口的竹椅', body: '陈爷爷回忆儿时住在河边。夏天傍晚，奶奶会坐在门口的竹椅上，等孩子们回家吃饭。', tags: ['童年', '奶奶', '家的记忆'], question: '你小时候，奶奶会在哪里等你吃饭？', type: '原话 · 本人讲述', answer: '“奶奶会搬一把竹椅，坐在门口等我们回家吃饭。”', evidence: '示例来源：同一段本人讲述。回答直接引用故事中的原话，不添加新的情节。', route: 'original' },
  food: { transcript: '“我们家做红烧肉，总要加一点冰糖。你奶奶不爱太甜，我后来就放得少了。”', duration: '示例片段 / 00:15', title: '红烧肉里，藏着一家人的口味', body: '陈爷爷提到家里做红烧肉会加冰糖；因为奶奶不喜欢太甜，他后来减少了冰糖的用量。', tags: ['家常菜', '口味变化', '与家人相处'], question: '如果奶奶今天回来吃饭，你会怎么做红烧肉？', type: 'AI 推测 · 有来源，仍需本人确认', answer: '根据这段回忆，我猜他可能会少放一点冰糖，照顾奶奶不爱太甜的口味。这是推测，不是他对今天这顿饭的真实回答。', evidence: '示例依据：“你奶奶不爱太甜，我后来就放得少了。”过去的做法可以提供参考，但不能证明今天一定会这样选择。', route: 'simulation' },
  choice: { transcript: '“那年本来有机会去外地工作，但孩子还小。我和家里商量，最后还是留在了这里。”', duration: '示例片段 / 00:21', title: '那年，他选择留在家人身边', body: '面对去外地工作的机会，陈爷爷考虑到孩子年幼，与家人商量后决定留下。这是当时具体情境中的一次选择。', tags: ['工作选择', '家庭', '当时的决定'], question: '你当年为什么没有去外地工作？', type: '原话 · 本人讲述', answer: '“孩子还小。我和家里商量，最后还是留在了这里。”', evidence: '示例来源：当年工作选择的本人讲述。这只能解释当时的决定，不能扩展为“他永远把家庭放在工作之前”。', route: 'original' },
  unknown: { transcript: '“很多故事还没有讲。等下次见面，再慢慢说给你听。”', duration: '示例片段 / 00:09', title: '留一点空白，等你亲口讲', body: '现有片段没有包含具体的人生经历。Memory 保留这段表达，不把缺失的信息补写成事实。', tags: ['待补充', '保留未知'], question: '你和奶奶第一次见面，是在哪里？', type: '未知 · 暂时没有足够证据', answer: '这件事，他还没有在现有故事里讲过。我不知道答案。也许下次，可以请他亲口讲一讲。', evidence: '现有示例片段没有首次见面的时间、地点或情境。没有依据时，不编造一段听起来合理的往事。', route: 'unknown' }
};
let selectedStory = 'home';
const byId = id => document.getElementById(id);
function renderStory(key) {
  selectedStory = key;
  const story = stories[key];
  byId('demo-transcript').textContent = story.transcript;
  byId('demo-duration').textContent = story.duration;
  byId('memory-title').textContent = story.title;
  byId('memory-body').textContent = story.body;
  byId('memory-keywords').replaceChildren(...story.tags.map(tag => { const el = document.createElement('span'); el.textContent = tag; return el; }));
  byId('twin-question').textContent = story.question;
  byId('answer-type').textContent = story.type;
  byId('answer-type').className = `answer-type ${story.route}`;
  byId('twin-answer').textContent = story.answer;
  byId('source-detail').textContent = story.evidence;
  byId('source-detail').hidden = true;
  byId('source-toggle').setAttribute('aria-expanded', 'false');
  byId('source-toggle').lastElementChild.textContent = '＋';
  document.querySelectorAll('[data-story]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.story === key)));
}
document.querySelectorAll('[data-story]').forEach(button => button.addEventListener('click', () => renderStory(button.dataset.story)));
const demoTabs = [byId('memory-tab'), byId('twin-tab')];
function setDemoTab(index, focus = false) {
  demoTabs.forEach((button, i) => { button.setAttribute('aria-selected', String(i === index)); button.tabIndex = i === index ? 0 : -1; });
  byId('memory-panel').hidden = index !== 0;
  byId('twin-panel').hidden = index !== 1;
  if (focus) demoTabs[index].focus();
}
demoTabs.forEach((button, index) => {
  button.addEventListener('click', () => setDemoTab(index));
  button.addEventListener('keydown', event => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) { event.preventDefault(); setDemoTab(event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - index, true); } });
});
byId('source-toggle').addEventListener('click', () => {
  const show = byId('source-detail').hidden;
  byId('source-detail').hidden = !show;
  byId('source-toggle').setAttribute('aria-expanded', String(show));
  byId('source-toggle').lastElementChild.textContent = show ? '−' : '＋';
});
const waveform = document.querySelector('.waveform');
for (let i = 0; i < 63; i++) { const bar = document.createElement('i'); bar.style.height = `${8 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * .39)) * 42}px`; waveform.append(bar); }
const steps = [
 { title: '录音与设备', role: '讲述者 · 陈守义', alt: '陈守义的录音与录音豆设备弹窗界面示意', note: '界面示意 · 设备能力仍在验证', context: '从一次自然讲述开始，留住声音和故事的起点。此图为录音与设备连接的界面示意。' },
 { title: '核对文字', role: '讲述者 · 陈守义', alt: '陈守义核对教女儿骑车那段录音的文字界面', note: '基于真实 UI 的排版示意', context: '“我越喊，她越不肯蹬。”陈守义讲起教女儿骑车那天的争执，先核对文字，再保存到记忆。' },
 { title: '读取记忆', role: '讲述者 · 陈守义', alt: '教女儿骑车的记忆与核对文字依据界面', note: '基于真实 UI 的排版示意', context: '整理后的记忆保留核对文字依据，可回听完整原音。系统归纳与本人原话，在界面中分别呈现。' },
 { title: '花田可视化', role: '记忆在此汇合', alt: '陈守义的故事花田，两朵勿忘我分别承载不同记忆', note: '基于真实 UI 的排版示意', context: '“车没往前走，我先急了。”每段故事成为一朵花，沿着花径，可以重新走进那段往事。' },
 { title: 'Twin Agent', role: '倾听者 · 与 Twin 对话', alt: '新版 Twin 语音对话真实截图，回答标注 AI 根据记忆推测', note: '真实产品对话截图 · 内容为虚构人物示例', context: '带着新的问题与 Twin 对话。此图保留最新真实对话画面，以及“AI · 根据记忆推测”的明确标注。' },
 { title: '亲友多视角', role: '倾听者 · 女儿的补记', alt: '陈守义女儿署名补记学车经历的亲友原文界面', note: '基于真实 UI 的排版示意', context: '同一次学车，女儿记得的是害怕摔倒，也怕被嫌笨。她的署名补记保留自己的视角，不覆盖父亲的讲述。' },
 { title: '数字托付', role: '倾听者 · 女儿收信', alt: '陈守义留给女儿的信封与有声留言界面示意', note: '信封与录音示意 · 完整数字托付仍在规划中', context: '“我是真没记住。”一封留给女儿的有声信，收好没来得及说的话。此处展示专属留言，完整数字托付仍在规划中。' }
];
const journeyTabs = [...document.querySelectorAll('[data-step]')];
let currentStep = 0;
const screenDialog = byId('screen-dialog');
function selectStep(index, focus = false) {
  currentStep = (index + steps.length) % steps.length;
  index = currentStep;
  const step = steps[index];
  journeyTabs.forEach((button, i) => { button.setAttribute('aria-selected', String(i === index)); button.tabIndex = i === index ? 0 : -1; });
  byId('journey-view').setAttribute('aria-labelledby', `step-${index + 1}`);
  byId('journey-image').src = `assets/screen-${index + 1}.png`;
  byId('journey-image').alt = step.alt;
  byId('screen-open').setAttribute('aria-label', `放大查看：${step.title}界面`);
  byId('journey-caption').textContent = step.title;
  byId('journey-count').textContent = `0${index + 1} / 07`;
  byId('journey-role').textContent = step.role;
  byId('journey-context').textContent = step.context;
  byId('journey-note').textContent = step.note;
  byId('screen-dialog-title').textContent = `0${index + 1} / 07 · ${step.title}`;
  byId('screen-detail-image').src = `assets/screen-${index + 1}.png`;
  byId('screen-detail-image').alt = step.alt;
  byId('screen-detail-note').textContent = `${step.note} · 陈守义与亲友均为虚构演示内容`;
  byId('screen-detail-image').parentElement.scrollTop = 0;
  if (focus) journeyTabs[index].focus();
}
journeyTabs.forEach((button, index) => {
  button.addEventListener('click', () => selectStep(index));
  button.addEventListener('keydown', event => {
    if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 6 : (index + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : 6)) % 7;
      selectStep(next, true);
    }
  });
});
byId('screen-prev').addEventListener('click', () => selectStep(currentStep - 1));
byId('screen-next').addEventListener('click', () => selectStep(currentStep + 1));
function openScreen() { screenDialog.showModal(); document.body.classList.add('modal-open'); }
byId('screen-open').addEventListener('click', openScreen);
byId('screen-enlarge').addEventListener('click', openScreen);
byId('detail-prev').addEventListener('click', () => selectStep(currentStep - 1));
byId('detail-next').addEventListener('click', () => selectStep(currentStep + 1));
byId('screen-close').addEventListener('click', () => screenDialog.close());
screenDialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
screenDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); selectStep(currentStep + (event.key === 'ArrowRight' ? 1 : -1)); }
});
screenDialog.addEventListener('click', event => { if (event.target === screenDialog) screenDialog.close(); });
const dialog = byId('film-dialog');
const video = byId('product-video');
document.querySelectorAll('.open-film').forEach(button => button.addEventListener('click', () => { dialog.showModal(); document.body.classList.add('modal-open'); video.play().catch(() => {}); }));
byId('close-film').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { video.pause(); document.body.classList.remove('modal-open'); });
const menu = byId('mobile-menu');
const menuButton = document.querySelector('.menu-toggle');
menuButton.addEventListener('click', () => { menu.hidden = !menu.hidden; menuButton.setAttribute('aria-expanded', String(!menu.hidden)); menuButton.setAttribute('aria-label', menu.hidden ? '打开导航' : '关闭导航'); menuButton.textContent = menu.hidden ? '☰' : '✕'; });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', '打开导航'); menuButton.textContent = '☰'; }));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { menu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', '打开导航'); menuButton.textContent = '☰'; menuButton.focus(); } });
renderStory(selectedStory);
selectStep(0);
