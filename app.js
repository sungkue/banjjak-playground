import { EMOJI_ART, EXTRA_LEVELS, EXTRA_OBJECTS, EXTRA_QUESTIONS } from "./extra-content.js?v=2";

const ASSET = "./assets/";
const AUDIO = "./audio/";
const STORAGE_KEY = "banjjak-playground-v1";
const OUTFITS = [
  { id: "flower", label: "꽃 원피스" },
  { id: "fairy", label: "요정 원피스" },
  { id: "explorer", label: "탐험가" },
  { id: "sunshine", label: "햇살 원피스" },
];
const SCENES = [
  { id: "room", label: "방" },
  { id: "garden", label: "정원" },
  { id: "sky", label: "하늘" },
];
const SUBJECTS = {
  hangul: { label: "한글", title: "한글 놀이", art: "subject-hangul" },
  math: { label: "수학", title: "수학 놀이", art: "subject-math" },
  english: { label: "영어", title: "영어 놀이", art: "subject-english" },
};
const ROUND_SIZE = 5;
export const LEVELS = {
  hangul: ["첫소리 1", "첫소리 2", "그림 낱말", "빈칸 채우기", "첫 글자", "끝 글자"],
  math: ["1~5 세기", "6~10 세기", "더하기 1", "더하기 2", "빼기", "수의 순서"],
  english: ["쉬운 단어", "새 단어", "그림 찾기", "첫 알파벳", "색깔 단어", "인사말"],
};
const OBJECTS = {
  backpack: "가방", butterfly: "나비", apple: "사과", rabbit: "토끼",
  hat: "모자", duck: "오리", banana: "바나나", milk: "우유",
  cat: "고양이", dog: "강아지", sun: "해", flower: "꽃",
  ...EXTRA_OBJECTS,
};

export const QUESTIONS = {
  hangul: [
    { prompt: "‘가’로 시작하는 것은?", options: ["backpack", "butterfly", "apple"], answer: "backpack", choiceKind: "picture" },
    { prompt: "‘나’로 시작하는 것은?", options: ["rabbit", "butterfly", "hat"], answer: "butterfly", choiceKind: "picture" },
    { prompt: "‘사’로 시작하는 것은?", options: ["banana", "apple", "duck"], answer: "apple", choiceKind: "picture" },
    { prompt: "‘토’로 시작하는 것은?", options: ["rabbit", "milk", "backpack"], answer: "rabbit", choiceKind: "picture" },
    { prompt: "‘모’로 시작하는 것은?", options: ["flower", "sun", "hat"], answer: "hat", choiceKind: "picture" },
    { prompt: "‘고’로 시작하는 것은?", options: ["cat", "dog", "duck"], answer: "cat", choiceKind: "picture" },
    { prompt: "‘강’으로 시작하는 것은?", options: ["cat", "dog", "rabbit"], answer: "dog", choiceKind: "picture" },
    { prompt: "‘바’로 시작하는 것은?", options: ["banana", "backpack", "milk"], answer: "banana", choiceKind: "picture" },
    { prompt: "‘우’로 시작하는 것은?", options: ["duck", "milk", "hat"], answer: "milk", choiceKind: "picture" },
    { prompt: "‘오’로 시작하는 것은?", options: ["apple", "rabbit", "duck"], answer: "duck", choiceKind: "picture" },
    { prompt: "그림에 맞는 낱말은?", object: "apple", options: ["사과", "나비", "모자"], answer: "사과" },
    { prompt: "그림에 맞는 낱말은?", object: "rabbit", options: ["오리", "토끼", "고양이"], answer: "토끼" },
    { prompt: "그림에 맞는 낱말은?", object: "hat", options: ["모자", "가방", "우유"], answer: "모자" },
    { prompt: "그림에 맞는 낱말은?", object: "duck", options: ["나비", "강아지", "오리"], answer: "오리" },
    { prompt: "그림에 맞는 낱말은?", object: "milk", options: ["꽃", "우유", "사과"], answer: "우유" },
    { prompt: "가□을 완성해 볼까?", object: "backpack", options: ["비", "방", "과"], answer: "방" },
    { prompt: "나□를 완성해 볼까?", object: "butterfly", options: ["비", "방", "자"], answer: "비" },
    { prompt: "사□를 완성해 볼까?", object: "apple", options: ["자", "과", "끼"], answer: "과" },
    { prompt: "토□를 완성해 볼까?", object: "rabbit", options: ["리", "과", "끼"], answer: "끼" },
    { prompt: "모□를 완성해 볼까?", object: "hat", options: ["자", "유", "나"], answer: "자" },
    { prompt: "고양이의 첫 글자는?", object: "cat", options: ["강", "고", "가"], answer: "고" },
    { prompt: "강아지의 첫 글자는?", object: "dog", options: ["강", "고", "바"], answer: "강" },
    { prompt: "바나나의 첫 글자는?", object: "banana", options: ["나", "가", "바"], answer: "바" },
    { prompt: "우유의 첫 글자는?", object: "milk", options: ["오", "우", "아"], answer: "우" },
    { prompt: "오리의 첫 글자는?", object: "duck", options: ["토", "오", "우"], answer: "오" },
    { prompt: "사과의 끝 글자는?", object: "apple", options: ["가", "과", "자"], answer: "과" },
    { prompt: "토끼의 끝 글자는?", object: "rabbit", options: ["끼", "토", "리"], answer: "끼" },
    { prompt: "강아지의 끝 글자는?", object: "dog", options: ["강", "이", "지"], answer: "지" },
    { prompt: "우유의 끝 글자는?", object: "milk", options: ["우", "리", "유"], answer: "유" },
    { prompt: "바나나의 끝 글자는?", object: "banana", options: ["바", "과", "나"], answer: "나" },
  ],
  math: [
    { prompt: "사과가 몇 개일까?", object: "apple", count: 1, options: [2, 1, 3], answer: 1 },
    { prompt: "꽃이 몇 송이일까?", object: "flower", count: 2, options: [1, 3, 2], answer: 2 },
    { prompt: "나비가 몇 마리일까?", object: "butterfly", count: 3, options: [3, 4, 2], answer: 3 },
    { prompt: "오리가 몇 마리일까?", object: "duck", count: 4, options: [5, 3, 4], answer: 4 },
    { prompt: "해가 몇 개일까?", object: "sun", count: 5, options: [4, 5, 3], answer: 5 },
    { prompt: "토끼가 몇 마리일까?", object: "rabbit", count: 6, options: [6, 7, 5], answer: 6 },
    { prompt: "모자가 몇 개일까?", object: "hat", count: 7, options: [8, 7, 6], answer: 7 },
    { prompt: "사과가 몇 개일까?", object: "apple", count: 8, options: [7, 9, 8], answer: 8 },
    { prompt: "꽃이 몇 송이일까?", object: "flower", count: 9, options: [9, 10, 8], answer: 9 },
    { prompt: "나비가 몇 마리일까?", object: "butterfly", count: 10, options: [9, 10, 8], answer: 10 },
    { prompt: "사과 1개에 1개를 더하면?", equation: "1 + 1 = ?", left: 1, right: 1, operator: "+", options: [1, 2, 3], answer: 2 },
    { prompt: "꽃 2송이에 1송이를 더하면?", equation: "2 + 1 = ?", left: 2, right: 1, operator: "+", options: [2, 4, 3], answer: 3 },
    { prompt: "오리 2마리에 2마리를 더하면?", equation: "2 + 2 = ?", left: 2, right: 2, operator: "+", options: [4, 3, 5], answer: 4 },
    { prompt: "모자 3개에 2개를 더하면?", equation: "3 + 2 = ?", left: 3, right: 2, operator: "+", options: [4, 5, 6], answer: 5 },
    { prompt: "나비 1마리에 4마리를 더하면?", equation: "1 + 4 = ?", left: 1, right: 4, operator: "+", options: [6, 4, 5], answer: 5 },
    { prompt: "사과 4개에 2개를 더하면?", equation: "4 + 2 = ?", left: 4, right: 2, operator: "+", options: [5, 6, 7], answer: 6 },
    { prompt: "꽃 5송이에 3송이를 더하면?", equation: "5 + 3 = ?", left: 5, right: 3, operator: "+", options: [7, 9, 8], answer: 8 },
    { prompt: "오리 6마리에 1마리를 더하면?", equation: "6 + 1 = ?", left: 6, right: 1, operator: "+", options: [6, 7, 8], answer: 7 },
    { prompt: "모자 4개에 5개를 더하면?", equation: "4 + 5 = ?", left: 4, right: 5, operator: "+", options: [8, 9, 10], answer: 9 },
    { prompt: "나비 7마리에 3마리를 더하면?", equation: "7 + 3 = ?", left: 7, right: 3, operator: "+", options: [9, 10, 8], answer: 10 },
    { prompt: "사과 5개 중 2개를 먹으면?", equation: "5 − 2 = ?", left: 5, right: 2, operator: "-", options: [2, 3, 4], answer: 3 },
    { prompt: "꽃 6송이 중 1송이를 주면?", equation: "6 − 1 = ?", left: 6, right: 1, operator: "-", options: [5, 6, 4], answer: 5 },
    { prompt: "오리 7마리 중 3마리가 떠나면?", equation: "7 − 3 = ?", left: 7, right: 3, operator: "-", options: [5, 4, 3], answer: 4 },
    { prompt: "모자 8개 중 2개를 쓰고 남은 모자는?", equation: "8 − 2 = ?", left: 8, right: 2, operator: "-", options: [6, 7, 5], answer: 6 },
    { prompt: "나비 10마리 중 3마리가 날아가면?", equation: "10 − 3 = ?", left: 10, right: 3, operator: "-", options: [8, 7, 6], answer: 7 },
    { prompt: "4 다음 수는?", equation: "4 → ?", options: [3, 5, 6], answer: 5 },
    { prompt: "7 바로 앞 수는?", equation: "? → 7", options: [6, 8, 5], answer: 6 },
    { prompt: "가장 큰 수는?", options: [6, 9, 7], answer: 9 },
    { prompt: "가장 작은 수는?", options: [8, 5, 7], answer: 5 },
    { prompt: "빈칸에 들어갈 수는?", equation: "? → 8 → 9", options: [7, 6, 10], answer: 7 },
  ],
  english: [
    { prompt: "고양이는 영어로?", object: "cat", options: ["CAT", "DOG", "SUN"], answer: "CAT" },
    { prompt: "강아지는 영어로?", object: "dog", options: ["APPLE", "DOG", "CAT"], answer: "DOG" },
    { prompt: "사과는 영어로?", object: "apple", options: ["SUN", "CAT", "APPLE"], answer: "APPLE" },
    { prompt: "해는 영어로?", object: "sun", options: ["SUN", "DOG", "BANANA"], answer: "SUN" },
    { prompt: "바나나는 영어로?", object: "banana", options: ["APPLE", "BANANA", "SUN"], answer: "BANANA" },
    { prompt: "모자는 영어로?", object: "hat", options: ["HAT", "CAT", "MILK"], answer: "HAT" },
    { prompt: "우유는 영어로?", object: "milk", options: ["SUN", "MILK", "DOG"], answer: "MILK" },
    { prompt: "오리는 영어로?", object: "duck", options: ["CAT", "DUCK", "HAT"], answer: "DUCK" },
    { prompt: "토끼는 영어로?", object: "rabbit", options: ["FLOWER", "RABBIT", "HAT"], answer: "RABBIT" },
    { prompt: "꽃은 영어로?", object: "flower", options: ["BANANA", "RABBIT", "FLOWER"], answer: "FLOWER" },
    { prompt: "CAT은 어느 그림?", options: ["cat", "dog", "rabbit"], answer: "cat", choiceKind: "picture" },
    { prompt: "DOG은 어느 그림?", options: ["cat", "dog", "duck"], answer: "dog", choiceKind: "picture" },
    { prompt: "SUN은 어느 그림?", options: ["flower", "sun", "apple"], answer: "sun", choiceKind: "picture" },
    { prompt: "APPLE은 어느 그림?", options: ["banana", "hat", "apple"], answer: "apple", choiceKind: "picture" },
    { prompt: "HAT은 어느 그림?", options: ["hat", "milk", "backpack"], answer: "hat", choiceKind: "picture" },
    { prompt: "CAT의 첫 알파벳은?", object: "cat", options: ["C", "D", "S"], answer: "C" },
    { prompt: "DOG의 첫 알파벳은?", object: "dog", options: ["B", "D", "C"], answer: "D" },
    { prompt: "SUN의 첫 알파벳은?", object: "sun", options: ["S", "A", "M"], answer: "S" },
    { prompt: "APPLE의 첫 알파벳은?", object: "apple", options: ["B", "C", "A"], answer: "A" },
    { prompt: "HAT의 첫 알파벳은?", object: "hat", options: ["H", "M", "D"], answer: "H" },
    { prompt: "빨간색은 영어로?", color: "#e95465", options: ["RED", "BLUE", "GREEN"], answer: "RED" },
    { prompt: "파란색은 영어로?", color: "#4b93e8", options: ["YELLOW", "BLUE", "PINK"], answer: "BLUE" },
    { prompt: "노란색은 영어로?", color: "#ffd246", options: ["YELLOW", "RED", "GREEN"], answer: "YELLOW" },
    { prompt: "초록색은 영어로?", color: "#61bc70", options: ["BLUE", "GREEN", "PINK"], answer: "GREEN" },
    { prompt: "분홍색은 영어로?", color: "#f58db5", options: ["RED", "YELLOW", "PINK"], answer: "PINK" },
    { prompt: "‘안녕!’은 영어로?", options: ["HELLO", "BYE", "THANK YOU"], answer: "HELLO" },
    { prompt: "‘잘 가!’는 영어로?", options: ["HELLO", "GOOD NIGHT", "BYE"], answer: "BYE" },
    { prompt: "‘고마워!’는 영어로?", options: ["THANK YOU", "GOOD MORNING", "HELLO"], answer: "THANK YOU" },
    { prompt: "‘좋은 아침!’은 영어로?", options: ["GOOD NIGHT", "GOOD MORNING", "BYE"], answer: "GOOD MORNING" },
    { prompt: "‘잘 자!’는 영어로?", options: ["THANK YOU", "GOOD NIGHT", "GOOD MORNING"], answer: "GOOD NIGHT" },
  ],
};

for (const subject of Object.keys(LEVELS)) {
  LEVELS[subject].push(...EXTRA_LEVELS[subject]);
  QUESTIONS[subject].push(...EXTRA_QUESTIONS[subject]);
}

export function gradeAnswer(question, choice) {
  return question.options.includes(choice) && choice === question.answer;
}

export function answerProgress(question, choice, alreadyAnswered) {
  const correct = gradeAnswer(question, choice);
  return { correct, awardStar: correct && !alreadyAnswered };
}

function loadSaved() {
  const fallback = { stars: 0, completedStages: [], outfit: "flower", scene: "room", soundOn: true };
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!raw || typeof raw !== "object") return fallback;
    const completedStages = Array.isArray(raw.completedStages)
      ? raw.completedStages.filter(id => Object.keys(LEVELS).some(subject => LEVELS[subject].some((_, index) => id === `${subject}:${index}`)))
      : Array.isArray(raw.completed) ? raw.completed.filter(id => id in SUBJECTS).map(id => `${id}:0`) : [];
    return {
      stars: Number.isSafeInteger(raw.stars) && raw.stars >= 0 ? raw.stars : 0,
      completedStages: [...new Set(completedStages)],
      outfit: OUTFITS.some(item => item.id === raw.outfit) ? raw.outfit : "flower",
      scene: SCENES.some(item => item.id === raw.scene) ? raw.scene : "room",
      soundOn: typeof raw.soundOn === "boolean" ? raw.soundOn : true,
    };
  } catch { return fallback; }
}

const state = typeof document === "undefined" ? null : loadSaved();
const session = { view: "home", subject: null, level: 0, index: 0, answered: false, wrongChoice: null, feedback: "" };
const CORRECT_EFFECTS = ["applause", "sparkle", "fanfare"];
const audio = typeof document === "undefined" ? null : {
  music: new Audio(`${AUDIO}music-variety.mp3?v=3`), voice: new Audio(), effect: new Audio(),
};
if (audio) {
  audio.music.loop = true;
  audio.music.volume = .28;
  audio.effect.volume = .55;
}

function currentQuestion() {
  return QUESTIONS[session.subject][session.level * ROUND_SIZE + session.index];
}

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Browsing can continue without storage. */ }
}

function audioFailure(error) {
  const status = document.querySelector("#audio-status");
  status.textContent = error?.name === "NotAllowedError"
    ? "소리를 켜려면 화면 위 스피커를 눌러 주세요."
    : "소리를 재생하지 못했어요. 다시 눌러 주세요.";
  status.hidden = false;
}
function playClip(player, file, onended) {
  if (!state.soundOn) return;
  player.pause();
  player.onended = onended || null;
  player.src = `${AUDIO}${file}.mp3?v=3`;
  player.currentTime = 0;
  player.play().then(() => { document.querySelector("#audio-status").hidden = true; }).catch(error => {
    audioFailure(error);
    if (onended) onended();
  });
}
function playMusic() {
  if (state.soundOn && !document.hidden && audio.music.paused) {
    audio.music.play().catch(audioFailure);
  }
}
function playQuestion() {
  playClip(audio.voice, `q-${session.subject}-${session.level * ROUND_SIZE + session.index}`);
}
function playEnglishChoice(choice, onended) {
  const key = String(choice).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");
  playClip(audio.voice, `en-${key}`, onended);
}
function stopAudio() {
  audio.voice.onended = null;
  for (const player of Object.values(audio)) { player.pause(); player.currentTime = 0; }
}

function starSvg() {
  return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="m24 3 6.3 13.2 14.5 2-10.4 10.1 2.5 14.4L24 35.8 11.1 42.7l2.5-14.4L3.2 18.2l14.5-2z" fill="#ffd14e" stroke="#ffbb34" stroke-width="2"/></svg>';
}
function homeSvg() {
  return '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3 2 15h4v14h8V19h5v10h8V15h4z"/></svg>';
}
function dressSvg() {
  return '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="m15 4 5 3 5-3 7 4-4 9-3-1-1 7 10 11c-8 5-20 5-28 0l10-11-1-7-3 1-4-9z"/></svg>';
}
function speakerSvg() {
  return '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M5 16h7l9-8v24l-9-8H5z"/><path d="M26 14c4 3 4 9 0 12m4-17c7 6 7 16 0 22" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
}
function avatar(className = "") {
  return `<img class="${className}" src="${ASSET}outfit-${state.outfit}.webp" alt="꾸민 모습의 별이" />`;
}
function art(id, className, decorative = false) {
  return id in EMOJI_ART
    ? `<span class="${className} emoji-art" ${decorative ? 'aria-hidden="true"' : `role="img" aria-label="${OBJECTS[id]}"`}>${EMOJI_ART[id]}</span>`
    : `<img class="${className}" src="${ASSET}${id}.webp" alt="${decorative ? "" : OBJECTS[id]}" />`;
}

function renderHome() {
  const done = state.completedStages.length;
  const total = Object.values(LEVELS).reduce((sum, levels) => sum + levels.length, 0);
  const subjectCards = Object.entries(SUBJECTS).map(([id, subject]) => `
    <button class="subject-tile ${id}" type="button" data-action="levels" data-subject="${id}" aria-label="${subject.label} 놀이 고르기">
      <img class="subject-art" src="${ASSET}${subject.art}.webp" alt="" />
      <span class="subject-name">${subject.label}</span>
      <span class="subject-count">${state.completedStages.filter(stage => stage.startsWith(`${id}:`)).length} / ${LEVELS[id].length}</span>
      <span class="subject-arrow" aria-hidden="true">→</span>
    </button>`).join("");
  return `<section class="home" aria-label="놀이 선택">
    <div class="home-left">
      <h1>오늘은 무엇을 배워볼까?</h1>
      <p class="audio-hint">${state.soundOn ? "화면을 누르면 음악이 시작돼요 🎵" : "위쪽 스피커를 눌러 소리를 켜요 🔊"}</p>
      <div class="subject-list">${subjectCards}</div>
      <div class="home-progress" aria-label="끝낸 놀이 ${done}개 중 ${total}개">
        <span class="progress-copy">끝낸 놀이</span>
        <span class="progress-track" aria-hidden="true"><span class="progress-fill" style="--fill:${done / total * 100}%"></span></span>
        <span class="progress-value">${starSvg()} ${done} / ${total}</span>
      </div>
    </div>
    <div class="home-stage">
      <span class="stage-sparkle one" aria-hidden="true">✦</span><span class="stage-sparkle two" aria-hidden="true">✦</span>
      ${avatar("home-avatar")}
      <button class="primary-button decorate-button" type="button" data-action="wardrobe">${dressSvg()} 꾸미기 <span aria-hidden="true">→</span></button>
    </div>
  </section>`;
}

function renderLevels() {
  const subject = SUBJECTS[session.subject];
  const levels = LEVELS[session.subject];
  const nextLevel = levels.findIndex((_, index) => !state.completedStages.includes(`${session.subject}:${index}`));
  const cards = levels.map((title, index) => {
    const done = state.completedStages.includes(`${session.subject}:${index}`);
    return `<button class="level-card ${done ? "finished" : ""}" type="button" data-action="start" data-level="${index}" aria-label="${index + 1}단계 ${title} 시작">
      <span class="level-number">${index + 1}</span><span class="level-title">${title}</span>
      <span class="level-note">${done ? "완료 ✓" : "5문제 놀이 →"}</span>
    </button>`;
  });
  const sections = [0, 1, 2, 3].map(group => `<section class="level-group" aria-label="${group * 5 + 1}단계부터 ${group * 5 + 5}단계">
    <h2>${group === 0 ? "시작하기" : group === 1 ? "익숙해지기" : group === 2 ? "한 걸음 더" : "도전하기"} <small>${group * 5 + 1}–${group * 5 + 5}단계</small></h2>
    <div class="level-grid">${cards.slice(group * 5, group * 5 + 5).join("")}</div>
  </section>`).join("");
  return `<section class="levels-screen" aria-label="${subject.label} 단계 고르기">
    <div class="subpage-top"><button class="back-button" type="button" data-action="home">${homeSvg()} 처음으로</button><h1 class="page-title">${subject.title}</h1></div>
    <p class="levels-intro">5문제씩 골라서 놀자! ✨</p>
    <button class="primary-button continue-button" type="button" data-action="start" data-level="${nextLevel < 0 ? 0 : nextLevel}">${nextLevel < 0 ? "1단계 다시 놀기" : `${nextLevel + 1}단계 이어서 놀기`} →</button>
    ${sections}
  </section>`;
}

function renderSteps() {
  let html = "";
  for (let index = 0; index < ROUND_SIZE; index++) {
    if (index) html += '<span class="step-line" aria-hidden="true"></span>';
    html += `<span class="step-dot ${index === session.index ? "current" : index < session.index ? "done" : ""}" aria-hidden="true">${index + 1}</span>`;
  }
  return `<div class="steps" aria-label="${session.index + 1}번째 문제, 전체 ${ROUND_SIZE}개">${html}<span class="step-caption">${session.index + 1} / ${ROUND_SIZE}</span></div>`;
}

function renderGame() {
  const subject = SUBJECTS[session.subject];
  const question = currentQuestion();
  let illustration = "";
  if (question.count) {
    illustration = `<div class="count-objects ${question.object ? "" : "count-dots"}" aria-hidden="true">${Array.from({ length: question.count }, () => question.object ? art(question.object, "count-art", true) : '<i class="math-dot"></i>').join("")}</div>`;
  } else if (question.operator) {
    const dots = count => `<span class="dot-group">${Array.from({ length: count }, () => '<i class="math-dot"></i>').join("")}</span>`;
    illustration = `<div class="math-visual" aria-hidden="true">${dots(question.left)}<span class="math-symbol">${question.operator === "+" ? "+" : "−"}</span>${dots(question.right)}</div>`;
  } else if (question.object) {
    illustration = art(question.object, "question-image");
  } else if (question.color) {
    illustration = `<span class="color-swatch" style="--swatch:${question.color}" aria-hidden="true"></span>`;
  }
  if (question.equation) illustration += `<span class="equation" aria-hidden="true">${question.equation}</span>`;
  const choices = question.options.map(choice => {
    const isNumber = typeof choice === "number";
    const artId = question.choiceKind === "picture" ? choice : null;
    const label = artId ? OBJECTS[choice] : choice;
    const picture = artId ? art(artId, "choice-art", true) : "";
    const response = session.answered && choice === question.answer ? "correct" : session.wrongChoice === choice ? "wrong" : "";
    return `<button class="choice-card ${isNumber ? "number" : artId ? "picture" : "text"} ${response}" type="button" data-action="answer" data-value="${choice}" aria-label="${label}">${picture}<span class="choice-word">${label}</span></button>`;
  }).join("");
  const feedback = session.feedback
    ? `<p class="feedback-message ${session.answered && session.wrongChoice === null ? "good" : ""}" role="status">${session.feedback}</p>`
    : `<p class="feedback-message" role="status">${question.choiceKind === "picture" || question.count || question.operator || question.object || question.color ? "그림을 보고 골라보자!" : "천천히 생각해 보자!"}</p>`;
  return `<section class="game-screen" aria-label="${subject.title}">
    <div class="subpage-top"><button class="back-button" type="button" data-action="levels">${homeSvg()} 단계 고르기</button><div class="game-heading"><h1 class="page-title">${subject.title}</h1><span class="game-level">${session.level + 1}단계 · ${LEVELS[session.subject][session.level]}</span></div>${renderSteps()}</div>
    <div class="game-layout">
      <div class="game-main">
        <div class="question-panel"><div class="question-content"><span class="question-text">${question.prompt}</span>${illustration}</div><button class="speak-button" type="button" data-action="speak-question" aria-label="문제 다시 듣기">${speakerSvg()}</button></div>
        <div class="choice-grid">${choices}</div>
        <div class="feedback-row">${feedback}${session.answered ? `<button class="primary-button next-button" type="button" data-action="next">${session.index === ROUND_SIZE - 1 ? "결과 보기" : "다음 문제"} →</button>` : ""}</div>
      </div>
      <div class="game-side">${avatar("game-avatar")}<div class="game-speech">${session.answered ? "정말 멋져! ♥" : "천천히 골라봐! ♥"}</div></div>
    </div>
  </section>`;
}

function renderWardrobe() {
  const outfits = OUTFITS.map(outfit => `<button class="outfit-option ${state.outfit === outfit.id ? "selected" : ""}" type="button" data-action="outfit" data-value="${outfit.id}" aria-label="${outfit.label} 입기" aria-pressed="${state.outfit === outfit.id}">
    <img src="${ASSET}clothes-${outfit.id}.webp" alt="" /><span>${outfit.label}</span>${state.outfit === outfit.id ? '<span class="selected-check" aria-hidden="true">✓</span>' : ""}
  </button>`).join("");
  const scenes = SCENES.map(scene => `<button class="scene-option ${state.scene === scene.id ? "selected" : ""}" type="button" data-action="scene" data-value="${scene.id}" aria-label="${scene.label} 배경 선택" aria-pressed="${state.scene === scene.id}">
    <img src="${ASSET}background-${scene.id}.webp" alt="" /><span>${scene.label}</span>${state.scene === scene.id ? '<span class="selected-check" aria-hidden="true">✓</span>' : ""}
  </button>`).join("");
  return `<section class="wardrobe-screen" aria-label="별이 꾸미기">
    <div class="subpage-top"><button class="back-button" type="button" data-action="home">${homeSvg()} 홈으로 가기</button><h1 class="page-title">별이 꾸미기</h1></div>
    <div class="wardrobe"><div class="wardrobe-stage">${avatar("wardrobe-avatar")}</div>
      <div class="wardrobe-panel"><h2>옷 선택하기</h2><div class="outfit-grid">${outfits}</div>
        <h2 class="scene-heading">배경 선택하기</h2><div class="scene-grid">${scenes}</div>
        <button class="primary-button wardrobe-done" type="button" data-action="home">이대로 놀기 →</button>
      </div>
    </div>
  </section>`;
}

function renderResult() {
  return `<section class="result" aria-label="놀이 완료"><div class="result-panel">
    <div class="result-copy">${starSvg()}<h1>우와, 다 해냈어!</h1><p>${SUBJECTS[session.subject].label} ${session.level + 1}단계 완료! 반짝 별 5개를 모았어.</p>
      <div class="result-actions">${session.level + 1 < LEVELS[session.subject].length ? '<button class="primary-button" type="button" data-action="next-level">다음 단계 →</button>' : ''}<button class="back-button" type="button" data-action="replay">다시 놀기</button><button class="back-button" type="button" data-action="levels">단계 고르기</button><button class="back-button" type="button" data-action="wardrobe">꾸미기</button></div>
    </div>${avatar("result-avatar")}
  </div></section>`;
}

function render() {
  const app = document.querySelector("#app");
  document.querySelector("#site-shell").style.setProperty("--scene", `url("${ASSET}background-${state.scene}.webp")`);
  document.querySelector("#star-count").textContent = state.stars;
  const soundButton = document.querySelector("#sound-toggle");
  soundButton.setAttribute("aria-pressed", String(state.soundOn));
  soundButton.setAttribute("aria-label", state.soundOn ? "모든 소리 끄기" : "모든 소리 켜기");
  app.innerHTML = session.view === "home" ? renderHome() : session.view === "levels" ? renderLevels() : session.view === "game" ? renderGame() : session.view === "wardrobe" ? renderWardrobe() : renderResult();
}

function go(view) {
  session.view = view;
  render();
  window.scrollTo({ top: 0, behavior: "auto" });
}

function openLevels(subject) {
  if (!(subject in SUBJECTS)) return;
  session.subject = subject;
  go("levels");
}

function start(level) {
  if (!session.subject || !Number.isInteger(level) || level < 0 || level >= LEVELS[session.subject].length) return;
  session.level = level;
  session.index = 0;
  session.answered = false;
  session.wrongChoice = null;
  session.feedback = "";
  go("game");
  playQuestion();
}

function answer(value) {
  if (session.view !== "game") return;
  const question = currentQuestion();
  const choice = typeof question.answer === "number" ? Number(value) : value;
  const { correct, awardStar } = answerProgress(question, choice, session.answered);
  if (correct) {
    session.answered = true;
    session.wrongChoice = null;
    session.feedback = "정답이야! 다른 것도 눌러봐 ✨";
    if (awardStar) {
      state.stars += 1;
      save();
      playClip(audio.effect, CORRECT_EFFECTS[(session.level * ROUND_SIZE + session.index) % CORRECT_EFFECTS.length]);
    }
    if (session.subject === "english") playEnglishChoice(choice, () => playClip(audio.voice, "praise"));
    else playClip(audio.voice, "praise");
  } else {
    session.wrongChoice = choice;
    session.feedback = "괜찮아! 다시 한번 찾아보자.";
    playClip(audio.effect, "try-again");
    if (session.subject === "english") playEnglishChoice(choice);
    else playClip(audio.voice, "retry");
  }
  render();
}

function next() {
  if (!session.answered) return;
  audio.effect.pause();
  if (session.index === ROUND_SIZE - 1) {
    const stageId = `${session.subject}:${session.level}`;
    if (!state.completedStages.includes(stageId)) state.completedStages.push(stageId);
    save();
    go("result");
    playClip(audio.effect, "level-up");
    playClip(audio.voice, "complete");
    return;
  }
  session.index += 1;
  session.answered = false;
  session.wrongChoice = null;
  session.feedback = "";
  render();
  playQuestion();
}

if (typeof document !== "undefined") {
  render();
  document.querySelector("#sound-toggle").addEventListener("click", () => {
    state.soundOn = !state.soundOn;
    if (!state.soundOn) stopAudio();
    save(); render();
  });
  document.addEventListener("click", playMusic);
  document.addEventListener("visibilitychange", () => { if (document.hidden) stopAudio(); });
  document.querySelector(".brand").addEventListener("click", () => go("home"));
  document.querySelector("#app").addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    switch (button.dataset.action) {
      case "home": go("home"); break;
      case "wardrobe": go("wardrobe"); break;
      case "levels": openLevels(button.dataset.subject || session.subject); break;
      case "start": start(Number(button.dataset.level)); break;
      case "answer": answer(button.dataset.value); break;
      case "next": next(); break;
      case "next-level": start(session.level + 1); break;
      case "replay": start(session.level); break;
      case "speak-question": playQuestion(); break;
      case "outfit":
        if (OUTFITS.some(item => item.id === button.dataset.value)) { state.outfit = button.dataset.value; save(); render(); playClip(audio.effect, "dress-up"); }
        break;
      case "scene":
        if (SCENES.some(item => item.id === button.dataset.value)) { state.scene = button.dataset.value; save(); render(); playClip(audio.effect, "dress-up"); }
        break;
    }
  });
}
