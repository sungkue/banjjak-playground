const ASSET = "./assets/";
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
const OBJECTS = {
  backpack: "가방", butterfly: "나비", apple: "사과", rabbit: "토끼",
  hat: "모자", duck: "오리", banana: "바나나", milk: "우유",
  cat: "고양이", dog: "강아지", sun: "해", flower: "꽃",
};
const ENGLISH_ART = { CAT: "cat", DOG: "dog", SUN: "sun", APPLE: "apple", BANANA: "banana" };

export const QUESTIONS = {
  hangul: [
    { prompt: "‘가’로 시작하는 것은?", options: ["backpack", "butterfly", "apple"], answer: "backpack" },
    { prompt: "‘나’로 시작하는 것은?", options: ["rabbit", "butterfly", "hat"], answer: "butterfly" },
    { prompt: "‘사’로 시작하는 것은?", options: ["banana", "apple", "duck"], answer: "apple" },
    { prompt: "‘토’로 시작하는 것은?", options: ["rabbit", "milk", "backpack"], answer: "rabbit" },
    { prompt: "‘모’로 시작하는 것은?", options: ["flower", "sun", "hat"], answer: "hat" },
  ],
  math: [
    { prompt: "사과가 몇 개일까?", object: "apple", count: 1, options: [2, 1, 3], answer: 1 },
    { prompt: "꽃이 몇 송이일까?", object: "flower", count: 2, options: [1, 3, 2], answer: 2 },
    { prompt: "나비가 몇 마리일까?", object: "butterfly", count: 3, options: [3, 4, 2], answer: 3 },
    { prompt: "오리가 몇 마리일까?", object: "duck", count: 4, options: [5, 3, 4], answer: 4 },
    { prompt: "해가 몇 개일까?", object: "sun", count: 5, options: [4, 5, 3], answer: 5 },
  ],
  english: [
    { prompt: "고양이는 영어로?", object: "cat", options: ["CAT", "DOG", "SUN"], answer: "CAT" },
    { prompt: "강아지는 영어로?", object: "dog", options: ["APPLE", "DOG", "CAT"], answer: "DOG" },
    { prompt: "사과는 영어로?", object: "apple", options: ["SUN", "CAT", "APPLE"], answer: "APPLE" },
    { prompt: "해는 영어로?", object: "sun", options: ["SUN", "DOG", "BANANA"], answer: "SUN" },
    { prompt: "바나나는 영어로?", object: "banana", options: ["APPLE", "BANANA", "SUN"], answer: "BANANA" },
  ],
};

export function gradeAnswer(question, choice) {
  return question.options.includes(choice) && choice === question.answer;
}

function loadSaved() {
  const fallback = { stars: 0, completed: [], outfit: "flower", scene: "room", soundOn: true };
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!raw || typeof raw !== "object") return fallback;
    return {
      stars: Number.isSafeInteger(raw.stars) && raw.stars >= 0 ? raw.stars : 0,
      completed: Array.isArray(raw.completed) ? raw.completed.filter(id => id in SUBJECTS) : [],
      outfit: OUTFITS.some(item => item.id === raw.outfit) ? raw.outfit : "flower",
      scene: SCENES.some(item => item.id === raw.scene) ? raw.scene : "room",
      soundOn: typeof raw.soundOn === "boolean" ? raw.soundOn : true,
    };
  } catch { return fallback; }
}

const state = typeof document === "undefined" ? null : loadSaved();
const session = { view: "home", subject: null, index: 0, answered: false, wrongChoice: null, feedback: "" };

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Browsing can continue without storage. */ }
}

function speak(text, lang = "ko-KR") {
  if (!state.soundOn || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = lang === "en-US" ? .82 : .94;
    window.speechSynthesis.speak(utterance);
  } catch { /* Text is always visible when speech is unavailable. */ }
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

function renderHome() {
  const done = new Set(state.completed).size;
  const subjectCards = Object.entries(SUBJECTS).map(([id, subject]) => `
    <button class="subject-tile ${id}" type="button" data-action="start" data-subject="${id}" aria-label="${subject.label} 놀이 시작">
      <img class="subject-art" src="${ASSET}${subject.art}.webp" alt="" />
      <span class="subject-name">${subject.label}</span>
      <span class="subject-arrow" aria-hidden="true">→</span>
    </button>`).join("");
  return `<section class="home" aria-label="놀이 선택">
    <div class="home-left">
      <h1>오늘은 무엇을 배워볼까?</h1>
      <div class="subject-list">${subjectCards}</div>
      <div class="home-progress" aria-label="끝낸 놀이 ${done}개 중 3개">
        <span class="progress-copy">끝낸 놀이</span>
        <span class="progress-track" aria-hidden="true"><span class="progress-fill" style="--fill:${done / 3 * 100}%"></span></span>
        <span class="progress-value">${starSvg()} ${done} / 3</span>
      </div>
    </div>
    <div class="home-stage">
      <span class="stage-sparkle one" aria-hidden="true">✦</span><span class="stage-sparkle two" aria-hidden="true">✦</span>
      ${avatar("home-avatar")}
      <button class="primary-button decorate-button" type="button" data-action="wardrobe">${dressSvg()} 꾸미기 <span aria-hidden="true">→</span></button>
    </div>
  </section>`;
}

function renderSteps() {
  let html = "";
  for (let index = 0; index < 5; index++) {
    if (index) html += '<span class="step-line" aria-hidden="true"></span>';
    html += `<span class="step-dot ${index === session.index ? "current" : index < session.index ? "done" : ""}" aria-hidden="true">${index + 1}</span>`;
  }
  return `<div class="steps" aria-label="${session.index + 1}번째 문제, 전체 5개">${html}<span class="step-caption">${session.index + 1} / 5</span></div>`;
}

function renderGame() {
  const subject = SUBJECTS[session.subject];
  const question = QUESTIONS[session.subject][session.index];
  let illustration = "";
  if (session.subject === "math") {
    illustration = `<div class="count-objects" style="--count:${question.count}" aria-hidden="true">${Array.from({ length: question.count }, () => `<img src="${ASSET}${question.object}.webp" alt="" />`).join("")}</div>`;
  } else if (session.subject === "english") {
    illustration = `<img class="question-image" src="${ASSET}${question.object}.webp" alt="${OBJECTS[question.object]}" />`;
  }
  const choices = question.options.map(choice => {
    const isNumber = session.subject === "math";
    const label = session.subject === "hangul" ? OBJECTS[choice] : choice;
    const artId = session.subject === "hangul" ? choice : session.subject === "english" ? ENGLISH_ART[choice] : null;
    const art = artId ? `<img class="choice-art" src="${ASSET}${artId}.webp" alt="" />` : "";
    const response = session.answered && choice === question.answer ? "correct" : session.wrongChoice === choice ? "wrong" : "";
    return `<button class="choice-card ${isNumber ? "number" : ""} ${response}" type="button" data-action="answer" data-value="${choice}" ${session.answered ? "disabled" : ""} aria-label="${label}">${art}<span class="choice-word">${label}</span></button>`;
  }).join("");
  const feedback = session.feedback
    ? `<p class="feedback-message ${session.answered ? "good" : ""}" role="status">${session.feedback}</p>`
    : '<p class="feedback-message" role="status">그림을 보고 골라보자!</p>';
  return `<section class="game-screen" aria-label="${subject.title}">
    <div class="subpage-top"><button class="back-button" type="button" data-action="home">${homeSvg()} 처음으로</button><h1 class="page-title">${subject.title}</h1>${renderSteps()}</div>
    <div class="game-layout">
      <div class="game-main">
        <div class="question-panel"><div class="question-content"><span class="question-text">${question.prompt}</span>${illustration}</div><button class="speak-button" type="button" data-action="speak-question" aria-label="문제 다시 듣기">${speakerSvg()}</button></div>
        <div class="choice-grid">${choices}</div>
        <div class="feedback-row">${feedback}${session.answered ? `<button class="primary-button next-button" type="button" data-action="next">${session.index === 4 ? "결과 보기" : "다음 문제"} →</button>` : ""}</div>
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
    <div class="result-copy">${starSvg()}<h1>우와, 다 해냈어!</h1><p>반짝 별 5개를 모았어. 정말 멋져!</p>
      <div class="result-actions"><button class="primary-button" type="button" data-action="replay">다시 놀기</button><button class="back-button" type="button" data-action="home">다른 놀이</button><button class="back-button" type="button" data-action="wardrobe">꾸미기</button></div>
    </div>${avatar("result-avatar")}
  </div></section>`;
}

function render() {
  const app = document.querySelector("#app");
  document.querySelector("#site-shell").style.setProperty("--scene", `url("${ASSET}background-${state.scene}.webp")`);
  document.querySelector("#star-count").textContent = state.stars;
  const soundButton = document.querySelector("#sound-toggle");
  soundButton.setAttribute("aria-pressed", String(state.soundOn));
  soundButton.setAttribute("aria-label", state.soundOn ? "소리 끄기" : "소리 켜기");
  app.innerHTML = session.view === "home" ? renderHome() : session.view === "game" ? renderGame() : session.view === "wardrobe" ? renderWardrobe() : renderResult();
}

function go(view) {
  session.view = view;
  render();
  window.scrollTo({ top: 0, behavior: "auto" });
}

function start(subject) {
  if (!(subject in SUBJECTS)) return;
  session.subject = subject;
  session.index = 0;
  session.answered = false;
  session.wrongChoice = null;
  session.feedback = "";
  go("game");
  speak(QUESTIONS[subject][0].prompt);
}

function answer(value) {
  if (session.view !== "game" || session.answered) return;
  const question = QUESTIONS[session.subject][session.index];
  const choice = session.subject === "math" ? Number(value) : value;
  if (session.subject === "english") speak(choice.toLowerCase(), "en-US");
  if (gradeAnswer(question, choice)) {
    session.answered = true;
    session.wrongChoice = null;
    session.feedback = "정답이야! 별 하나 반짝! ✨";
    state.stars += 1;
    save();
    if (session.subject !== "english") speak("정답이야! 정말 잘했어!");
  } else {
    session.wrongChoice = choice;
    session.feedback = "괜찮아! 다시 한번 찾아보자.";
    if (session.subject !== "english") speak("괜찮아, 다시 찾아보자.");
  }
  render();
}

function next() {
  if (!session.answered) return;
  if (session.index === 4) {
    if (!state.completed.includes(session.subject)) state.completed.push(session.subject);
    save();
    go("result");
    speak("우와, 다 해냈어! 정말 멋져!");
    return;
  }
  session.index += 1;
  session.answered = false;
  session.wrongChoice = null;
  session.feedback = "";
  render();
  speak(QUESTIONS[session.subject][session.index].prompt);
}

if (typeof document !== "undefined") {
  render();
  document.querySelector("#sound-toggle").addEventListener("click", () => {
    state.soundOn = !state.soundOn;
    if (!state.soundOn && "speechSynthesis" in window) window.speechSynthesis.cancel();
    save(); render();
  });
  document.querySelector(".brand").addEventListener("click", () => go("home"));
  document.querySelector("#app").addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    switch (button.dataset.action) {
      case "home": go("home"); break;
      case "wardrobe": go("wardrobe"); break;
      case "start": start(button.dataset.subject); break;
      case "answer": answer(button.dataset.value); break;
      case "next": next(); break;
      case "replay": start(session.subject); break;
      case "speak-question": speak(QUESTIONS[session.subject][session.index].prompt); break;
      case "outfit":
        if (OUTFITS.some(item => item.id === button.dataset.value)) { state.outfit = button.dataset.value; save(); render(); }
        break;
      case "scene":
        if (SCENES.some(item => item.id === button.dataset.value)) { state.scene = button.dataset.value; save(); render(); }
        break;
    }
  });
}
