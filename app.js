import { EMOJI_ART, EXTRA_LEVELS, EXTRA_OBJECTS, EXTRA_QUESTIONS } from "./extra-content.js?v=2";
import { EXPANDED_CONTENT, MORE_OBJECTS, MORE_EMOJI_ART } from "./expanded-content.js?v=5";
import { EIGHT_CONTENT } from "./eight-content.js?v=1";

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
const AGE_NAMES = { six: "기본 놀이", seven: "7살 도전", eight: "8살 도전" };
const AGE_STAR_GATE = { six: 0, seven: 75, eight: 200 };
const MISSIONS = [
  { icon: "🌷", title: "꽃밭 피우기", finish: "꽃밭을 활짝 피웠어!" },
  { icon: "🌈", title: "무지개 잇기", finish: "무지개가 완성됐어!" },
  { icon: "⭐", title: "별자리 만들기", finish: "별자리가 반짝여!" },
  { icon: "🐣", title: "숲 친구 만나기", finish: "숲 친구들이 모였어!" },
  { icon: "🎁", title: "보물 상자 채우기", finish: "보물 상자를 채웠어!" },
  { icon: "🧩", title: "퍼즐 완성하기", finish: "퍼즐을 완성했어!" },
  { icon: "🐟", title: "바다 친구 만나기", finish: "바다 친구들이 모였어!" },
  { icon: "🚀", title: "우주선 띄우기", finish: "우주선이 출발했어!" },
  { icon: "🍓", title: "과일 바구니 채우기", finish: "바구니를 채웠어!" },
  { icon: "🦄", title: "꿈의 길 만들기", finish: "꿈의 길을 완성했어!" },
];
const BADGES = [
  { icon: "✨", title: "첫 반짝", goal: "별 1개", earned: s => s.stars >= 1 },
  { icon: "📖", title: "한글 탐정", goal: "한글 1단계 완료", earned: s => s.completedStages.some(id => /^(?:seven:|eight:)?hangul:/.test(id)) },
  { icon: "🔢", title: "숫자 마법사", goal: "수학 1단계 완료", earned: s => s.completedStages.some(id => /^(?:seven:|eight:)?math:/.test(id)) },
  { icon: "🔤", title: "영어 친구", goal: "영어 1단계 완료", earned: s => s.completedStages.some(id => /^(?:seven:|eight:)?english:/.test(id)) },
  { icon: "🌱", title: "다시 해냈어", goal: "다시 생각해 맞히기", earned: s => s.retryWins.length >= 1 },
  { icon: "🧠", title: "기억 탐험가", goal: "기억 카드 1개 완료", earned: s => s.rememberedStages.length >= 1 },
  { icon: "🌼", title: "기억이 쑥쑥", goal: "복습 여행에서 3문제 스스로 해결", earned: s => (s.reviewedQuestions?.length || 0) >= 3 },
  { icon: "🌳", title: "튼튼한 기억", goal: "복습 여행에서 15문제 스스로 해결", earned: s => (s.reviewedQuestions?.length || 0) >= 15 },
  { icon: "🎒", title: "세상 탐험가", goal: "깜짝 탐험 3번 완료", earned: s => (s.adventures || 0) >= 3 },
  { icon: "⚡", title: "반짝 연속", goal: "3문제 연속 스스로 맞히기", earned: s => s.bestStreak >= 3 },
  { icon: "🌟", title: "별 스물다섯", goal: "별 25개", earned: s => s.stars >= 25 },
  { icon: "🧭", title: "열 걸음 탐험", goal: "10단계 완료", earned: s => s.completedStages.length >= 10 },
  { icon: "🦋", title: "새로운 도전", goal: "7살 도전 열기", earned: s => ageUnlocked("seven", s) },
  { icon: "💎", title: "별 이백", goal: "별 200개", earned: s => s.stars >= 200 },
  { icon: "🏰", title: "깊은 탐험", goal: "8살 도전 열기", earned: s => ageUnlocked("eight", s) },
  { icon: "🏆", title: "백 번의 놀이", goal: "100단계 완료", earned: s => s.completedStages.length >= 100 },
  { icon: "🌠", title: "별 천 개", goal: "별 1,000개", earned: s => s.stars >= 1000 },
];
export const LEVELS = {
  hangul: ["첫소리 1", "첫소리 2", "그림 낱말", "빈칸 채우기", "첫 글자", "끝 글자"],
  math: ["1~5 세기", "6~10 세기", "더하기 1", "더하기 2", "빼기", "수의 순서"],
  english: ["쉬운 단어", "새 단어", "그림 찾기", "첫 알파벳", "색깔 단어", "인사말"],
};
const OBJECTS = {
  backpack: "가방", butterfly: "나비", apple: "사과", rabbit: "토끼",
  hat: "모자", duck: "오리", banana: "바나나", milk: "우유",
  cat: "고양이", dog: "강아지", sun: "해", flower: "꽃",
  ...EXTRA_OBJECTS, ...MORE_OBJECTS,
};
const ART = { ...EMOJI_ART, ...MORE_EMOJI_ART };

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
  LEVELS[subject].push(...EXPANDED_CONTENT.six.levels[subject]);
  QUESTIONS[subject].push(...EXPANDED_CONTENT.six.questions[subject]);
}
export const AGE_LEVELS = { six: LEVELS, seven: EXPANDED_CONTENT.seven.levels, eight: EIGHT_CONTENT.levels };
export const AGE_QUESTIONS = { six: QUESTIONS, seven: EXPANDED_CONTENT.seven.questions, eight: EIGHT_CONTENT.questions };
const levelsFor = () => AGE_LEVELS[session.age][session.subject];
const questionsFor = () => AGE_QUESTIONS[session.age][session.subject];
const stageId = (subject, index, age) => `${age === "six" ? "" : `${age}:`}${subject}:${index}`;
const questionId = (subject, index, age) => `${age}:${subject}:${index}`;
export function questionFromId(id) {
  if (typeof id !== "string") return null;
  const match = /^(six|seven|eight):(hangul|math|english):(0|[1-9]\d*)$/.exec(id);
  if (!match) return null;
  const [, age, subject, value] = match;
  const index = Number(value);
  return AGE_QUESTIONS[age][subject][index] ? { age, subject, index } : null;
}
export const validQuestionIds = ids => Array.isArray(ids) ? [...new Set(ids.filter(id => questionFromId(id)))] : [];

export function activityFor(question, subject) {
  if (question.choiceKind === "picture") {
    if (subject === "english") return { kind: "listen", label: "👂 듣고 찾기", instruction: "영어 소리를 듣고 알맞은 그림을 눌러 봐!" };
    const name = OBJECTS[question.answer];
    return subject === "hangul" && /^[가-힣]{2,5}$/.test(name)
      ? { kind: "word", label: "🧩 그림 낱말", instruction: "그림의 이름을 글자로 이어 봐!", tokens: [...name], separator: "", answerText: name }
      : null;
  }
  const syllableCount = subject === "hangul" && question.prompt.match(/^([가-힣]{1,6})(?:는|은) 몇 글자일까/);
  if (syllableCount && Number.isInteger(question.answer)) return { kind: "count", label: "☝️ 글자 짚기", instruction: "글자를 하나씩 눌러 세어 봐!", items: [...syllableCount[1]] };
  if (subject === "math" && question.count && question.count <= 10) return { kind: "count", label: "☝️ 하나씩 세기", instruction: "그림을 하나씩 눌러 표시하고 모두 몇 개인지 확인해 봐!" };
  if (subject === "math" && question.options.every(Number.isInteger) && /가장 큰 수|가장 작은 수/.test(question.prompt)) {
    return { kind: "order", label: "↗️ 수 줄세우기", instruction: "작은 수부터 차례대로 놓고 답을 찾아 봐!", tokens: [...question.options].sort((a, b) => a - b), separator: " < " };
  }
  if (subject === "math" && question.operator && question.left <= 10 && question.right <= 2 && question.answer <= 12) {
    const start = Math.max(0, Math.min(question.left, question.answer) - 1);
    const end = Math.max(question.left, question.answer) + 1;
    return { kind: "line", label: "🐾 수직선 걷기", instruction: "시작 수에서 더하거나 빼서 도착하는 수를 눌러 봐!", tokens: Array.from({ length: end - start + 1 }, (_, index) => start + index) };
  }
  if (subject === "math" && Number.isInteger(question.answer) && question.answer >= 10 && question.answer < 100 && question.equation?.includes("=")) {
    return { kind: "place", label: "🧱 십과 일 만들기", instruction: "십의 묶음과 낱개를 차례로 놓아 답을 만들어 봐!", tokens: [Math.floor(question.answer / 10) * 10, question.answer % 10], separator: " + " };
  }
  if (subject === "math" && question.equation?.includes("?") && question.options.every(option => typeof option === "string" && [...option].length === 1)) {
    return { kind: "fill", label: "🧩 무늬 이어 붙이기", instruction: "반복되는 무늬의 다음 조각을 놓아 봐!", tokens: [String(question.answer)], separator: "", preview: question.equation };
  }
  if (subject === "math" && Number.isInteger(question.answer)) {
    return { kind: "number", label: "🔢 숫자 만들기", instruction: "숫자 버튼으로 답을 만들어 봐!" };
  }
  const answer = String(question.answer);
  const coda = subject === "hangul" && question.prompt.match(/^‘([^’]+)’의 받침은/);
  if (coda) return { kind: "fill", label: "✏️ 받침 넣기", instruction: "낱말의 받침을 빈칸에 놓아 봐!", tokens: [answer], separator: "", preview: `${coda[1]} → 받침 □` };
  const lowerCase = subject === "english" && question.prompt.match(/^큰 글자 ([A-Z])와 짝인 작은 글자는/);
  if (lowerCase) return { kind: "fill", label: "🔤 짝 글자 찾기", instruction: "큰 글자와 짝인 작은 글자를 놓아 봐!", tokens: [answer], separator: "", preview: `${lowerCase[1]} → □` };
  if (subject === "english" && Number.isInteger(question.answer)) return { kind: "number", label: "🔢 영어 숫자", instruction: "영어 낱말을 읽고 숫자로 답을 만들어 봐!" };
  if ((subject === "hangul" || subject === "english") && question.prompt.includes("□")) {
    return { kind: "fill", label: "✏️ 빈칸 완성", instruction: "빈칸에 들어갈 조각을 놓고 문장을 읽어 봐!", tokens: [answer], separator: "" };
  }
  const source = subject === "hangul" ? question.prompt.match(/^([가-힣]{2,6})의 (첫|끝) 글자는/) : question.prompt.match(/^(?:그림 단어 )?([A-Za-z]{2,10})의 첫 알파벳은/);
  if (source && [...source[1]].includes(answer)) {
    return { kind: "letter", label: subject === "hangul" ? "🔎 글자 찾기" : "🔤 첫 글자 찾기", instruction: subject === "hangul" ? "낱말을 나누어 보고 알맞은 글자를 눌러 봐!" : "영어 단어의 첫 글자를 눌러 봐!", tokens: [...source[1]] };
  }
  const storyEnd = question.prompt.lastIndexOf(". ");
  const passage = storyEnd > 30 ? question.prompt.slice(0, storyEnd + 1) : "";
  if (["hangul", "english"].includes(subject) && /^[가-힣]{1,8}$|^[A-Za-z]{2,12}$/.test(answer) && passage.toLowerCase().includes(answer.toLowerCase())) {
    return { kind: "evidence", label: "🕵️ 이야기 단서", instruction: "이야기에서 답의 단서가 되는 말을 먼저 눌러 봐!", passage, query: question.prompt.slice(storyEnd + 2), words: passage.split(/\s+/) };
  }
  if (subject === "hangul" && /^[가-힣\s,.!?]+$/.test(answer) && answer.trim().split(/\s+/).length >= 2 && answer.trim().split(/\s+/).length <= 6) {
    return { kind: "sentence", label: "🚂 문장 기차", instruction: "낱말을 차례로 눌러 문장을 이어 봐!", tokens: answer.split(" "), separator: " " };
  }
  if (subject === "english" && /^[A-Za-z ,.!?'-]+$/.test(answer) && answer.split(" ").length >= 2 && answer.split(" ").length <= 6) {
    return { kind: "sentence", label: "🚂 문장 기차", instruction: "낱말을 차례로 눌러 문장을 이어 봐!", tokens: answer.split(" "), separator: " " };
  }
  if (subject === "english" && /^[A-Za-z]{2,10}$/.test(answer) && (question.object || /영어 낱말|영어로/.test(question.prompt))
    || subject === "hangul" && /^[가-힣]{2,6}$/.test(answer)) {
    return { kind: "word", label: "🧩 글자 조립", instruction: "글자를 차례로 눌러 낱말을 만들어 봐!", tokens: [...answer], separator: "" };
  }
  return null;
}

export function activityTiles(question, activity) {
  if (!activity?.tokens) return [];
  if (activity.kind === "letter" || activity.kind === "line") return activity.tokens;
  if (activity.kind === "order") return activity.tokens;
  if (activity.kind === "place") {
    const parts = question.options.filter(option => option !== question.answer).flatMap(option => [Math.floor(option / 10) * 10, option % 10]);
    return [...activity.tokens, ...new Set(parts.filter(part => !activity.tokens.includes(part)))].slice(0, 4);
  }
  const distractors = question.options.filter(option => option !== question.answer)
    .flatMap(option => activity.kind === "fill" ? [String(option)] : activity.kind === "sentence" ? String(option).split(" ") : [...(activity.answerText ? OBJECTS[option] : String(option))])
    .filter(token => !activity.tokens.includes(token));
  return [...activity.tokens, ...new Set(distractors)].slice(0, activity.tokens.length + 2);
}

export function adventureQuestions(age, progress) {
  const subjects = Object.keys(SUBJECTS);
  const pools = Object.fromEntries(subjects.map(subject => [subject, AGE_QUESTIONS[age][subject]
    .map((_, index) => questionId(subject, index, age))
    .filter((_, index) => stageUnlocked(age, subject, Math.floor(index / ROUND_SIZE), progress))]));
  const result = [];
  for (let turn = 0; turn < ROUND_SIZE; turn++) {
    const pool = pools[subjects[(turn + (progress.adventures || 0)) % subjects.length]].filter(id => !result.includes(id));
    const fresh = pool.filter(id => !progress.earnedQuestions.includes(id));
    const candidates = fresh.length ? fresh : pool;
    if (candidates.length) result.push(candidates[Math.floor(Math.random() * candidates.length)]);
  }
  return result;
}

export function reviewAfterAnswer(ids, id, independent) {
  return [...ids.filter(item => item !== id), ...(independent ? [] : [id])];
}
const completedInAge = (age, progress) => progress.completedStages.filter(id =>
  Object.entries(AGE_LEVELS[age]).some(([subject, levels]) => levels.some((_, index) => id === stageId(subject, index, age)))).length;

export function ageUnlocked(age, progress) {
  if (!Object.hasOwn(AGE_STAR_GATE, age) || progress.stars < AGE_STAR_GATE[age]) return false;
  if (age === "seven") return Object.keys(SUBJECTS).some(subject => progress.completedStages.includes(stageId(subject, 9, "six")));
  if (age === "eight") return ageUnlocked("seven", progress) && Object.keys(SUBJECTS).some(subject => progress.completedStages.includes(stageId(subject, 14, "seven")));
  return true;
}

export function stageUnlocked(age, subject, index, progress) {
  if (!AGE_LEVELS[age]?.[subject]?.[index]) return false;
  if (progress.completedStages.includes(stageId(subject, index, age))) return true;
  return ageUnlocked(age, progress) && (!index || progress.completedStages.includes(stageId(subject, index - 1, age)))
    && progress.stars >= AGE_STAR_GATE[age] + index * ROUND_SIZE;
}

export function earnedBadges(progress) {
  return BADGES.filter(badge => badge.earned(progress));
}

function unlockNote(age, progress) {
  const missing = AGE_STAR_GATE[age] - progress.stars;
  if (missing > 0) return `별 ${missing}개 더`;
  if (age === "seven") return "기본 놀이 10단계 완료";
  if (age === "eight" && !ageUnlocked("seven", progress)) return "7살 도전 먼저 열기";
  if (age === "eight") return "7살 도전 15단계 완료";
  return "";
}

export function gradeAnswer(question, choice) {
  return question.options.includes(choice) && choice === question.answer;
}

export function answerProgress(question, choice, alreadyAnswered) {
  const correct = gradeAnswer(question, choice);
  return { correct, awardStar: correct && !alreadyAnswered };
}

const choiceLabel = (question, choice) => question.choiceKind === "picture" ? OBJECTS[choice] : String(choice);

export function answerFact(question, subject, solved = true) {
  const answer = choiceLabel(question, question.answer);
  const prompt = question.prompt;
  const quoted = prompt.match(/‘([^’]+)’/);
  const evidence = prompt.match(/[^.!?]+[.!]/g)?.map(line => line.trim()).find(line => line.includes(answer));
  if (subject === "hangul") {
    if (prompt.includes("몇 글자")) return `${answer}글자야.${solved ? " 하나씩 잘 세었어!" : ""}`;
    if (prompt.includes("첫 자음")) return `첫 자음은 ‘${answer}’이야.`;
    if (prompt.includes("첫 글자")) return `첫 글자는 ‘${answer}’야.`;
    if (prompt.includes("끝 글자")) return `끝 글자는 ‘${answer}’야.`;
    if (prompt.includes("받침")) return `받침은 ‘${answer}’이야.`;
    if (prompt.includes("반대말") && quoted) return `‘${quoted[1]}’ ↔ ‘${answer}’. 서로 반대되는 뜻이야.`;
    if (prompt.includes("비슷한 말") && quoted) return `‘${quoted[1]}’와 ‘${answer}’는 비슷한 뜻이야.`;
    if (prompt.includes("띄어 쓴")) return `‘${answer}’ 낱말 사이를 띄어 읽어 봐: ${answer.split(" ").join(" / ")}`;
    if (prompt.includes("□")) return `빈칸에는 ‘${answer}’! ${prompt.split(/[.!?]/)[0].replace("□", answer).replace(/ (빈칸|알맞은).*$/, "")} → 이어 읽어 봐.`;
    if (question.choiceKind === "picture") {
      const firstSound = prompt.match(/‘([^’]+)’(?:으)?로 시작/);
      if (firstSound) return `‘${answer}’의 첫소리는 ‘${firstSound[1]}’야.`;
      return `정답은 ‘${answer}’ 그림이야.${solved ? " 잘 찾았어!" : ""}`;
    }
    if (question.object && answer.length > 1) return `${[...answer].join(" · ")} → ${answer}. 글자를 이어서 읽어 봐.`;
    if (evidence) return `글 속 단서: ‘${evidence}’ 그래서 답은 ‘${answer}’야.`;
    return `정답은 ‘${answer}’!${solved ? " 글을 잘 살펴봤어." : ""}`;
  }
  if (subject === "math") {
    if (question.count) return `하나씩 세면 모두 ${answer}개야. 마지막으로 센 수가 전체 개수야.`;
    if (question.operator) {
      const { left, right, operator } = question;
      const equation = `${left} ${operator === "+" ? "+" : "−"} ${right} = ${answer}`;
      if (operator === "+" && left < 10 && right <= 10 && Number(answer) > 10) return `${left}에 ${10 - left}을 더해 10을 만들고, 남은 ${right - (10 - left)}을 더해 봐. ${equation}!`;
      if (operator === "-" && left > 10 && left < 20 && Number(answer) < 10) return `${left}에서 ${left - 10}을 빼면 10. 남은 ${right - (left - 10)}을 더 빼면 ${answer}! ${equation}`;
      if (right >= 10) return `${right}을 ${Math.floor(right / 10) * 10}과 ${right % 10}로 나누어 차례로 ${operator === "+" ? "더해" : "빼"} 봐. ${equation}!`;
      return `${left}에서 ${right}만큼 ${operator === "+" ? "더" : "거꾸로"} 세면 ${answer}. ${equation}!`;
    }
    if (prompt.includes("가장 큰 수") || prompt.includes("가장 작은 수")) return `작은 순서로 ${[...question.options].sort((a, b) => a - b).join(" < ")}. ${prompt.includes("큰") ? "맨 뒤" : "맨 앞"}의 ${answer}이야.`;
    const missing = question.equation?.match(/^(\d+)\s*([+−-])\s*□\s*=\s*(\d+)$/);
    if (missing) return `${missing[2] === "+" ? `${missing[3]} − ${missing[1]}` : `${missing[1]} − ${missing[3]}`} = ${answer}. 빈칸에 넣으면 ${question.equation.replace("□", answer)}!`;
    if (question.equation?.includes("?") || question.equation?.includes("□")) return `${question.equation.replace(/[?□]/, answer)}!${solved ? " 규칙을 잘 찾았어." : ""}`;
    return `정답은 ${answer}!${solved ? " 수와 모양을 잘 살펴봤어." : ""}`;
  }
  if (question.choiceKind === "picture") return `${String(question.answer).toUpperCase()} 소리는 ‘${answer}’ 그림이야.${solved ? " 영어 소리와 연결했어!" : ""}`;
  if (prompt.includes("첫 알파벳")) return `첫 알파벳은 ‘${answer}’야.`;
  if (prompt.includes("작은 글자")) return `짝이 되는 작은 글자는 ‘${answer}’야.`;
  if (question.object) return `${OBJECTS[question.object] || "이 그림"} = ${answer}!`;
  if (typeof question.answer === "number") return `영어 숫자는 ${answer}이야.`;
  if (prompt.includes("□")) return `‘${prompt.split(" 빈칸")[0].replace("□", answer)}’ 완성한 문장을 소리 내어 읽어 봐.`;
  if (quoted && /[가-힣]/.test(quoted[1])) return `${quoted[1]} → ${answer}${/[.!?]$/.test(answer) ? "" : "."} 소리를 듣고 따라 말해 봐.`;
  if (evidence) return `글 속 단서: ‘${evidence}’ 답은 ${answer}!`;
  return `정답은 ‘${answer}’! 소리를 듣고 따라 말해 봐.`;
}

function answerHint(question, subject) {
  const prompt = question.prompt;
  if (subject === "hangul") {
    if (prompt.includes("몇 글자")) return "글자를 손가락으로 하나씩 짚어 세어 봐.";
    if (prompt.includes("첫 자음") || prompt.includes("첫 글자") || prompt.includes("시작")) return "낱말의 맨 앞 소리를 천천히 들어 봐.";
    if (prompt.includes("끝 글자") || prompt.includes("받침")) return "낱말의 끝을 천천히 읽어 봐.";
    if (prompt.includes("□")) return "빈칸 앞뒤를 이어 읽어 봐.";
    if (prompt.includes("반대말")) return "반대되는 모습을 떠올려 봐.";
    if (prompt.includes("비슷한 말")) return "같은 느낌을 나타내는 말을 떠올려 봐.";
    if (prompt.includes("바르게 쓴")) return "글자 모양을 하나씩 비교해 봐.";
    if (prompt.includes("띄어 쓴")) return "낱말 사이의 빈칸을 살펴봐.";
    if (question.object) return "그림 이름을 소리 내어 말해 봐.";
    if (prompt.includes("누가") || prompt.includes("누구")) return "문장에서 누가 했는지 다시 찾아봐.";
    if (prompt.includes("어디")) return "문장에서 장소를 다시 찾아봐.";
    return "문장에서 물어본 단서를 다시 찾아봐.";
  }
  if (subject === "math") {
    if (question.count) return "그림을 손가락으로 하나씩 짚어 세어 봐.";
    if (question.equation && (question.equation.match(/[+−]/g) || []).length >= 2) return "앞의 두 수를 먼저 계산하고, 마지막 수를 더하거나 빼 봐.";
    if (question.operator && question.left > 10) return "십의 자리와 일의 자리를 나누어 계산해 봐.";
    if (question.operator === "+") return "왼쪽 수에서 시작해 오른쪽 수만큼 더 세어 봐.";
    if (question.operator === "-") return "왼쪽 수에서 오른쪽 수만큼 거꾸로 세어 봐.";
    if (question.equation?.includes("□")) return "빈칸에 수를 넣어 계산이 맞는지 봐.";
    if (question.equation?.includes("→")) return "화살표를 따라 바뀌는 순서를 살펴봐.";
    if (prompt.includes("가장")) return "보이는 수를 하나씩 비교해 봐.";
    if (prompt.includes("모서리")) return "모양의 뾰족한 곳을 하나씩 세어 봐.";
    if (prompt.includes("변이")) return "모양의 곧은 선을 하나씩 세어 봐.";
    if (prompt.includes("짧은 바늘")) return "시계의 짧은 바늘이 가리키는 수를 찾아봐.";
    if (prompt.includes("동전")) return "100원과 50원을 각각 세어 더해 봐.";
    if (prompt.includes("cm")) return "길이를 빼야 하는지 비교해야 하는지 살펴봐.";
    if (prompt.includes("십의 자리") || prompt.includes("백의 자리")) return "백, 십, 일의 자리를 나누어 봐.";
    return "수와 모양의 규칙을 다시 살펴봐.";
  }
  if (prompt.includes("첫 알파벳")) return "영어 단어 맨 앞 글자를 찾아봐.";
  if (prompt.includes("작은 글자")) return "큰 글자와 짝인 작은 글자를 찾아봐.";
  if (question.color) return "색을 보고 영어 이름을 떠올려 봐.";
  if (typeof question.answer === "number") return state && !state.soundOn ? "영어 숫자 낱말을 읽고 손가락으로 세어 봐." : "영어 숫자를 듣고 손가락으로 세어 봐.";
  if (state && !state.soundOn) return question.choiceKind === "picture" ? "문제의 영어 낱말을 읽고 알맞은 그림을 골라 봐." : "영어 글을 다시 읽고 답의 단서를 찾아봐.";
  if (question.choiceKind === "picture") return "위의 스피커를 눌러 다시 듣고 그림을 골라 봐.";
  if (question.object) return "그림을 보고 영어 이름을 떠올려 봐.";
  return "위의 스피커를 눌러 영어 표현을 다시 들어 봐.";
}

export function answerFeedback(question, subject, choice, wrongAttempts, alreadyAnswered, variation = 0, usedHint = false) {
  const firstTryTitles = {
    hangul: ["알맞은 답을 찾았어!", "한 문제 해결했어!", "한글 탐정 성공!", "이번에도 맞혔어!", "다음 탐험으로 출발!", "한글 별이 반짝!"],
    math: ["답을 찾아냈어!", "한 문제 해결했어!", "수학 탐정 성공!", "이번에도 맞혔어!", "반짝 정답이야!", "수학 한 걸음 성공!"],
    english: ["알맞은 답이야!", "영어 한 걸음 성공!", "영어 탐정 성공!", "이번에도 맞혔어!", "영어 별이 반짝!", "한 문제 해결했어!"],
  };
  if (gradeAnswer(question, choice)) return {
    kind: "good",
    title: wrongAttempts ? ["다시 생각해 해결했어!", "한 번 더 살펴보고 찾았어!", "끝까지 찾아냈어!", "새 단서를 써서 맞혔어!"][variation % 4]
      : usedHint ? ["도움을 써서 해결했어!", "단서를 활용해 찾았어!", "차근차근 확인했어!"][variation % 3]
      : firstTryTitles[subject][variation % firstTryTitles[subject].length],
    detail: answerFact(question, subject),
  };
  if (alreadyAnswered) return {
    kind: "explore", title: ["다른 카드도 살펴봤구나!", "비교해 보니 더 잘 알겠지?", "하나 더 확인했어!"][variation % 3],
    detail: `‘${choiceLabel(question, choice)}’도 보았어. ${answerFact(question, subject)}`,
  };
  if (wrongAttempts >= 2) return {
    kind: "reveal", title: ["이제 정답을 함께 찾아보자!", "단서를 모아 확인해 보자!", "정답을 눌러 마무리해 보자!"][variation % 3],
    detail: `${answerFact(question, subject, false)} 이제 직접 답을 완성해 봐.`,
  };
  return {
    kind: "hint", title: ["다른 단서를 찾아볼까?", "천천히 다시 볼까?", "한 가지씩 살펴보자!", "소리 내어 생각해 볼까?", "다른 방법으로 해 보자!"][variation % 5],
    detail: answerHint(question, subject),
  };
}

function loadSaved() {
  const fallback = { stars: 0, completedStages: [], earnedQuestions: [], retryWins: [], rememberedStages: [], reviewQuestions: [], reviewedQuestions: [], adventures: 0, bestStreak: 0, age: "six", outfit: "flower", scene: "room", soundOn: true };
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!raw || typeof raw !== "object") return fallback;
    const completedStages = Array.isArray(raw.completedStages)
      ? raw.completedStages.filter(id => Object.entries(AGE_LEVELS).some(([age, subjects]) =>
        Object.entries(subjects).some(([subject, levels]) => levels.some((_, index) => id === stageId(subject, index, age)))))
      : Array.isArray(raw.completed) ? raw.completed.filter(id => id in SUBJECTS).map(id => `${id}:0`) : [];
    const earnedQuestions = Array.isArray(raw.earnedQuestions)
      ? raw.earnedQuestions.filter(id => typeof id === "string")
      : completedStages.flatMap(id => {
        for (const age of Object.keys(AGE_LEVELS)) for (const subject of Object.keys(SUBJECTS)) {
          const prefix = age === "six" ? `${subject}:` : `${age}:${subject}:`;
          if (id.startsWith(prefix)) return Array.from({ length: ROUND_SIZE }, (_, index) =>
            questionId(subject, Number(id.slice(prefix.length)) * ROUND_SIZE + index, age));
        }
        return [];
      });
    const saved = {
      stars: Number.isSafeInteger(raw.stars) && raw.stars >= 0 ? raw.stars : 0,
      completedStages: [...new Set(completedStages)],
      earnedQuestions: [...new Set(earnedQuestions)],
      retryWins: Array.isArray(raw.retryWins) ? [...new Set(raw.retryWins.filter(id => typeof id === "string"))] : [],
      reviewQuestions: validQuestionIds(raw.reviewQuestions ?? raw.retryWins),
      reviewedQuestions: validQuestionIds(raw.reviewedQuestions),
      adventures: Number.isSafeInteger(raw.adventures) && raw.adventures >= 0 ? raw.adventures : 0,
      rememberedStages: Array.isArray(raw.rememberedStages) ? [...new Set(raw.rememberedStages.filter(id => completedStages.includes(id)))] : [],
      bestStreak: Number.isSafeInteger(raw.bestStreak) && raw.bestStreak >= 0 ? raw.bestStreak : 0,
      age: Object.hasOwn(AGE_LEVELS, raw.age) ? raw.age : "six",
      outfit: OUTFITS.some(item => item.id === raw.outfit) ? raw.outfit : "flower",
      scene: SCENES.some(item => item.id === raw.scene) ? raw.scene : "room",
      soundOn: typeof raw.soundOn === "boolean" ? raw.soundOn : true,
    };
    if (!ageUnlocked(saved.age, saved)) saved.age = "six";
    return saved;
  } catch { return fallback; }
}

const state = typeof document === "undefined" ? null : loadSaved();
const session = { view: "home", age: state?.age || "six", subject: null, level: 0, index: 0, newStars: 0, firstTry: 0, recovered: 0, helped: 0, streak: 0, activities: [], missedIndices: [], badgesBefore: [], recall: false, recallReady: false, recallDone: false, trip: "", tripQuestions: [], tripPosition: 0, tripMastered: 0, mode: "choice", tiles: [], selectedTiles: [], draft: "", clueFound: false, clueMisses: [], supportUsed: false, countStep: 0, readStep: -1, choices: [], hintShown: false, answered: false, wrongChoice: null, wrongChoices: [], feedback: null, feedbackTurn: 0 };
const CORRECT_EFFECTS = ["applause", "sparkle", "fanfare"];
const PRAISE_VOICES = ["praise", "praise-1", "praise-2", "praise-3"];
const RETRY_VOICES = ["retry", "retry-1", "retry-2"];
const audio = typeof document === "undefined" ? null : {
  music: new Audio(`${AUDIO}music-variety.mp3?v=3`), voice: new Audio(), effect: new Audio(),
};
if (audio) {
  audio.music.loop = true;
  audio.music.volume = .28;
  audio.effect.volume = .55;
}

function currentQuestion() {
  return questionsFor()[session.level * ROUND_SIZE + session.index];
}

function shuffle(choices) {
  choices = [...choices];
  for (let index = choices.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [choices[index], choices[other]] = [choices[other], choices[index]];
  }
  return choices;
}

function currentMission() {
  if (session.trip === "review") return { icon: "🌱", title: "기억 새싹 키우기", finish: "기억 새싹이 자랐어!" };
  if (session.trip === "adventure") return { icon: "🧭", title: "세 과목 깜짝 탐험", finish: "세 과목 탐험 성공!" };
  return MISSIONS[(session.level + Object.keys(SUBJECTS).indexOf(session.subject) + Object.keys(AGE_LEVELS).indexOf(session.age)) % MISSIONS.length];
}

const currentId = () => questionId(session.subject, session.level * ROUND_SIZE + session.index, session.age);
const roundPosition = () => session.trip ? session.tripPosition : session.index;
const roundLength = () => session.trip ? session.tripQuestions.length : ROUND_SIZE;
const thinkingFirst = () => (session.recall || session.trip === "review") && !session.recallReady;
const availableReviews = () => state.reviewQuestions.filter(id => {
  const item = questionFromId(id);
  return item && stageUnlocked(item.age, item.subject, Math.floor(item.index / ROUND_SIZE), state);
});

function resetQuestion() {
  const question = currentQuestion();
  const activity = activityFor(question, session.subject);
  Object.assign(session, { answered: false, wrongChoice: null, wrongChoices: [], feedback: null, hintShown: false, recallReady: false,
    supportUsed: false, countStep: 0, readStep: -1, clueFound: false, clueMisses: [], choices: shuffle(question.options), draft: "", selectedTiles: [],
    tiles: shuffle(activityTiles(question, activity)), mode: activity && !session.recall && (activity.kind !== "listen" || state.soundOn) && (session.level * ROUND_SIZE + session.index + session.tripPosition) % 2 === 0 ? "build" : "choice" });
}

function queueReview() {
  const id = currentId();
  if (!state.reviewQuestions.includes(id)) { state.reviewQuestions.push(id); save(); }
  if (!session.recall && !session.missedIndices.includes(session.index)) session.missedIndices.push(session.index);
}

function loadTripQuestion() {
  const item = questionFromId(session.tripQuestions[session.tripPosition]);
  session.age = item.age;
  session.subject = item.subject;
  session.level = Math.floor(item.index / ROUND_SIZE);
  session.index = item.index % ROUND_SIZE;
  resetQuestion();
  go("game");
  playQuestion();
}

function startTrip(kind) {
  if (!["review", "adventure"].includes(kind)) return;
  const questions = kind === "review" ? availableReviews().slice(0, ROUND_SIZE) : adventureQuestions(state.age, state);
  if (!questions.length) return;
  Object.assign(session, { trip: kind, tripQuestions: questions, tripPosition: 0, tripMastered: 0,
    newStars: 0, firstTry: 0, recovered: 0, helped: 0, streak: 0, activities: [], missedIndices: [], recall: false, recallDone: false,
    badgesBefore: earnedBadges(state).map(badge => badge.title) });
  loadTripQuestion();
}

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Browsing can continue without storage. */ }
}

function audioFailure(error) {
  if (error?.name === "AbortError") return;
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
    if (error?.name === "AbortError") return;
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
  if (session.mode === "build" && activityFor(currentQuestion(), session.subject)?.kind === "listen") {
    playEnglishChoice(currentQuestion().answer);
    return;
  }
  playClip(audio.voice, `q-${session.age === "six" ? "" : `${session.age}-`}${session.subject}-${session.level * ROUND_SIZE + session.index}`);
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
function avatar(className = "", decorative = false) {
  return `<img class="${className}" src="${ASSET}outfit-${state.outfit}.webp" alt="${decorative ? "" : "꾸민 모습의 별이"}" />`;
}
function art(id, className, decorative = false) {
  return id in ART
    ? `<span class="${className} emoji-art" ${decorative ? 'aria-hidden="true"' : `role="img" aria-label="${OBJECTS[id]}"`}>${ART[id]}</span>`
    : `<img class="${className}" src="${ASSET}${id}.webp" alt="${decorative ? "" : OBJECTS[id]}" />`;
}

function renderHome() {
  const done = completedInAge(session.age, state);
  const total = Object.values(AGE_LEVELS[session.age]).reduce((sum, levels) => sum + levels.length, 0);
  const allQuestions = Object.values(AGE_QUESTIONS).flatMap(subjects => Object.values(subjects)).reduce((sum, questions) => sum + questions.length, 0);
  const collected = earnedBadges(state);
  const subjectCards = Object.entries(SUBJECTS).map(([id, subject]) => `
    <button class="subject-tile ${id}" type="button" data-action="levels" data-subject="${id}" aria-label="${subject.label} 놀이 고르기" aria-describedby="${id}-count ${id}-completed">
      <img class="subject-art" src="${ASSET}${subject.art}.webp" alt="" />
      <span class="subject-name"><span>${subject.label}</span><small id="${id}-completed">${AGE_LEVELS[session.age][id].filter((_, index) => state.completedStages.includes(stageId(id, index, session.age))).length}단계 완료</small></span>
      <span class="subject-count" id="${id}-count">${AGE_QUESTIONS[session.age][id].length}문제 · ${AGE_LEVELS[session.age][id].length}단계</span>
      <span class="subject-arrow" aria-hidden="true">→</span>
    </button>`).join("");
  const ages = Object.keys(AGE_LEVELS).map(age => {
    const locked = !ageUnlocked(age, state);
    return `<button type="button" data-action="age" data-age="${age}" aria-pressed="${session.age === age}" ${locked ? "disabled" : ""} aria-label="${AGE_NAMES[age]}${locked ? ` 잠김, ${unlockNote(age, state)}` : ""}"><span>${AGE_NAMES[age]}</span><small>${locked ? `🔒 ${unlockNote(age, state)}` : "500문제"}</small></button>`;
  }).join("");
  const nextAge = session.age === "six" ? "seven" : session.age === "seven" ? "eight" : null;
  return `<section class="home" aria-label="놀이 선택">
    <div class="home-left">
      <h1>오늘은 무엇을 배워볼까?</h1>
      <p class="audio-hint">${state.soundOn ? "화면을 누르면 음악이 시작돼요 🎵" : "위쪽 스피커를 눌러 소리를 켜요 🔊"}</p>
      <p class="content-summary">전체 ${allQuestions.toLocaleString("ko-KR")}문제 · 한 단계에 ${ROUND_SIZE}문제</p>
      <div class="age-switch" role="group" aria-label="놀이 난이도">${ages}</div>
      ${nextAge && !ageUnlocked(nextAge, state) ? `<p class="unlock-hint">다음 도전은 별 ${AGE_STAR_GATE[nextAge]}개와 ${nextAge === "seven" ? "기본 놀이 10단계" : "7살 도전 15단계"}를 끝내면 열려요.</p>` : ""}
      <div class="subject-list">${subjectCards}</div>
      <div class="trip-list">
        <button class="trip-card adventure" type="button" data-action="adventure"><span aria-hidden="true">🎒</span><span><strong>깜짝 탐험</strong><small>세 과목을 섞어 5문제 · 매번 새롭게!</small></span><b aria-hidden="true">→</b></button>
        <button class="trip-card review" type="button" data-action="review" ${availableReviews().length ? "" : "disabled"}><span aria-hidden="true">🌱</span><span><strong>복습 여행 ${availableReviews().length ? `· ${availableReviews().length}개` : ""}</strong><small>${availableReviews().length ? "전에 어려웠던 문제, 다시 만나 볼까?" : "도움받은 문제가 생기면 여기 모여요"}</small></span><b aria-hidden="true">→</b></button>
      </div>
      <div class="home-progress" aria-label="전체 ${total}단계 중 ${done}단계 완료">
        <span class="progress-copy">끝낸 단계</span>
        <span class="progress-track" aria-hidden="true"><span class="progress-fill" style="--fill:${done / total * 100}%"></span></span>
        <span class="progress-value">${starSvg()} ${done} / ${total}</span>
      </div>
      <button class="sticker-teaser" type="button" data-action="stickers"><span class="sticker-teaser-icons" aria-hidden="true">${(collected.length ? collected.slice(-3) : BADGES.slice(0, 3)).map(badge => badge.icon).join(" ")}</span><span><strong>내 스티커북</strong><small>${collected.length} / ${BADGES.length}개 모았어 · 눌러서 보기</small></span><span aria-hidden="true">→</span></button>
    </div>
    <div class="home-stage">
      <span class="stage-sparkle one" aria-hidden="true">✦</span><span class="stage-sparkle two" aria-hidden="true">✦</span>
      ${avatar("home-avatar")}
      <button class="primary-button decorate-button" type="button" data-action="wardrobe">${dressSvg()} 꾸미기 <span aria-hidden="true">→</span></button>
    </div>
  </section>`;
}

function renderStickers() {
  const earned = earnedBadges(state).length;
  const cards = BADGES.map(badge => `<div class="sticker-card ${badge.earned(state) ? "earned" : "locked"}" aria-label="${badge.title}, ${badge.earned(state) ? "얻었어" : `모으려면 ${badge.goal}`}"><span class="sticker-icon" aria-hidden="true">${badge.earned(state) ? badge.icon : "?"}</span><strong>${badge.title}</strong><small>${badge.earned(state) ? "모았어!" : badge.goal}</small></div>`).join("");
  return `<section class="sticker-screen" aria-label="내 스티커북"><div class="subpage-top"><button class="back-button" type="button" data-action="home">${homeSvg()} 처음으로</button><h1 class="page-title">내 스티커북</h1></div><p class="sticker-intro">스티커 ${earned} / ${BADGES.length}개 모았어</p><div class="sticker-grid">${cards}</div></section>`;
}

function renderLevels() {
  const subject = SUBJECTS[session.subject];
  const levels = levelsFor();
  const nextLevel = levels.findIndex((_, index) => !state.completedStages.includes(stageId(session.subject, index, session.age)) && stageUnlocked(session.age, session.subject, index, state));
  const allDone = levels.every((_, index) => state.completedStages.includes(stageId(session.subject, index, session.age)));
  const cards = levels.map((title, index) => {
    const done = state.completedStages.includes(stageId(session.subject, index, session.age));
    const locked = !stageUnlocked(session.age, session.subject, index, state);
    const note = done ? "완료 ✓" : locked ? !state.completedStages.includes(stageId(session.subject, index - 1, session.age)) ? "🔒 앞 단계부터" : `🔒 별 ${AGE_STAR_GATE[session.age] + index * ROUND_SIZE - state.stars}개 더` : "5문제 놀이 →";
    return `<button class="level-card ${done ? "finished" : ""} ${locked ? "locked" : ""}" type="button" data-action="start" data-level="${index}" ${locked ? "disabled" : ""} aria-label="${index + 1}단계 ${title} ${note}">
      <span class="level-number">${index + 1}</span><span class="level-title">${title}</span>
      <span class="level-note">${note}</span>
    </button>`;
  });
  const sections = Array.from({ length: Math.ceil(levels.length / 5) }, (_, group) => `<section class="level-group" aria-label="${group * 5 + 1}단계부터 ${Math.min(group * 5 + 5, levels.length)}단계">
    <h2>${["시작하기", "익숙해지기", "한 걸음 더", "도전하기"][group] || "계속 놀기"} <small>${group * 5 + 1}–${Math.min(group * 5 + 5, levels.length)}단계</small></h2>
    <div class="level-grid">${cards.slice(group * 5, group * 5 + 5).join("")}</div>
  </section>`).join("");
  return `<section class="levels-screen" aria-label="${subject.label} 단계 고르기">
    <div class="subpage-top"><button class="back-button" type="button" data-action="home">${homeSvg()} 처음으로</button><h1 class="page-title">${subject.title}</h1></div><p class="age-caption">${AGE_NAMES[session.age]} · ${levels.length * ROUND_SIZE}문제</p>
    <p class="levels-intro">한 단계에 ${ROUND_SIZE}문제! 별을 모으고 앞 단계를 끝내면 다음 단계가 열려요 ✨</p>
    <button class="primary-button continue-button" type="button" data-action="${nextLevel < 0 && !allDone ? "home" : "start"}" data-level="${nextLevel < 0 ? 0 : nextLevel}">${nextLevel < 0 ? allDone ? "1단계 다시 놀기" : "다른 놀이에서 별 모으기" : `${nextLevel + 1}단계 이어서 놀기`} →</button>
    ${sections}
  </section>`;
}

function renderSteps() {
  if (session.recall) return '<div class="steps recall-step" aria-label="기억 카드 한 문제">🧠 기억 카드</div>';
  let html = "";
  for (let index = 0; index < roundLength(); index++) {
    if (index) html += '<span class="step-line" aria-hidden="true"></span>';
    html += `<span class="step-dot ${index === roundPosition() ? "current" : index < roundPosition() ? "done" : ""}" aria-hidden="true">${index + 1}</span>`;
  }
  return `<div class="steps" aria-label="${roundPosition() + 1}번째 문제, 전체 ${roundLength()}개">${html}<span class="step-caption">${roundPosition() + 1} / ${roundLength()}</span></div>`;
}

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

function renderActivity(activity) {
  const question = currentQuestion();
  if (activity.kind === "evidence") return `<div class="activity-board evidence ${session.answered ? "solved" : ""}">
    <p class="activity-instruction">${session.clueFound ? "🔎 단서를 찾았어! 이제 아래에서 답을 골라 봐." : activity.instruction}</p>
    <div class="evidence-words" role="group" aria-label="이야기에서 단서 찾기">${activity.words.map((word, index) => `<button type="button" class="evidence-word ${session.clueMisses.includes(index) ? "wrong" : word.toLowerCase().includes(String(question.answer).toLowerCase()) && (session.clueFound ? "found" : session.clueMisses.length >= 2 ? "answer-hint" : "")}" data-action="find-clue" data-value="${index}" ${session.clueFound || session.answered || session.clueMisses.includes(index) ? "disabled" : ""}>${escapeHtml(word)}</button>`).join(" ")}</div>
  </div>`;
  if (activity.kind === "letter" || activity.kind === "line") {
    return `<div class="activity-board ${activity.kind} ${session.answered ? "solved" : ""}">
      <p class="activity-instruction">${session.answered ? "✨ 찾았어! 알맞은 글자와 수를 살펴봐." : activity.instruction}</p>
      ${activity.kind === "line" ? `<p class="line-start">${question.left}에서 ${question.operator === "+" ? `+${question.right}` : `−${question.right}`}만큼 이동 🐾</p>` : ""}
      <div class="tap-grid ${activity.kind}" role="group" aria-label="${activity.kind === "line" ? "도착한 수 고르기" : "낱말의 글자 고르기"}">${activity.tokens.map(item => `<button type="button" class="build-tile ${activity.kind === "line" && item === question.left ? "start" : ""} ${session.answered && item === question.answer ? "picked" : session.wrongChoices.includes(item) ? "wrong" : session.wrongChoices.length >= 2 && item === question.answer ? "answer-hint" : ""}" data-action="activity-answer" data-value="${escapeHtml(item)}" aria-label="${activity.kind === "line" && item === question.left ? "출발 " : ""}${escapeHtml(item)}${activity.kind === "line" ? "에서 멈추기" : " 글자 고르기"}" ${session.answered || session.wrongChoices.includes(item) ? "disabled" : ""}>${escapeHtml(item)}${activity.kind === "line" && item === question.left ? '<small>출발</small>' : ""}</button>`).join("")}</div>
    </div>`;
  }
  if (activity.kind === "count") {
    const selected = session.selectedTiles.filter(Number.isInteger).length;
    const pieces = activity.items || Array.from({ length: question.count }, () => null);
    return `<div class="activity-board count ${session.answered ? "solved" : ""}">
      <p class="activity-instruction">${session.answered ? "✨ 모두 세었어!" : activity.instruction}</p>
      <div class="count-tray" role="group" aria-label="하나씩 세어 표시하기">${pieces.map((piece, index) => `<button type="button" class="count-piece ${session.selectedTiles.includes(index) || session.answered ? "picked" : ""}" data-action="count-item" data-value="${index}" aria-label="${index + 1}번째 ${piece || (question.object ? OBJECTS[question.object] : "점")} ${session.selectedTiles.includes(index) ? "표시 해제" : "표시"}" ${session.answered ? "disabled" : ""}>${piece ? `<span class="count-letter">${piece}</span>` : question.object ? art(question.object, "count-art", true) : '<i class="math-dot"></i>'}<small>${session.selectedTiles.includes(index) || session.answered ? "✓" : "○"}</small></button>`).join("")}</div>
      <output class="count-total" aria-live="polite">${activity.items ? "짚은 글자" : "표시한 그림"} ${session.answered ? question.answer : selected}개</output>
      ${session.answered ? "" : `<div class="build-actions"><button class="primary-button check-button" type="button" data-action="check-answer" ${selected ? "" : "disabled"}>이만큼! 확인 ✓</button></div>`}
    </div>`;
  }
  const number = activity.kind === "number";
  const ready = number ? session.draft.length > 0 : session.selectedTiles.filter(Number.isInteger).length === activity.tokens.length;
  const answer = number ? `<output class="number-draft" aria-label="만든 수">${session.draft || "?"}</output>`
    : `<div class="answer-slots ${activity.kind}" role="group" aria-label="만든 답, 눌러서 빼기">${activity.tokens.map((_, index) => {
      const token = session.tiles[session.selectedTiles[index]];
      return token === undefined ? '<span class="answer-slot empty" aria-hidden="true">·</span>'
        : `<button class="answer-slot filled" type="button" data-action="remove-tile" data-value="${index}" aria-label="${index + 1}번째 ${escapeHtml(token)} 빼기" ${session.answered ? "disabled" : ""}>${escapeHtml(token)}</button>`;
    }).join("")}</div>`;
  const keys = number ? Array.from({ length: 10 }, (_, index) => (index + 1) % 10) : session.tiles;
  return `<div class="activity-board ${activity.kind} ${session.answered ? "solved" : ""}">
    <p class="activity-instruction">${session.answered ? "✨ 완성했어! 소리 내어 답을 읽어 봐." : activity.instruction}</p>
    ${activity.kind === "fill" ? `<p class="fill-preview">${escapeHtml((activity.preview || question.prompt.split(/[.!?]/)[0].replace(/ (?:완성|빈칸).*$/, "")).replace(activity.preview?.includes("?") ? "?" : "□", session.draft || "□"))}</p>` : ""}
    ${activity.kind === "place" ? '<p class="line-start">십의 묶음 + 낱개</p>' : ""}
    ${answer}
    ${!session.answered ? `<div class="tile-tray ${number ? "number-pad" : ""}" role="group" aria-label="${number ? "숫자 버튼" : "조립할 조각"}">${keys.map((key, index) => `<button type="button" class="build-tile" data-action="${number ? "digit" : "tile"}" data-value="${number ? key : index}" aria-label="${escapeHtml(key)} ${number ? "입력" : "추가"}" ${number ? session.draft.length >= 4 ? "disabled" : "" : session.selectedTiles.includes(index) || ready ? "disabled" : ""}>${escapeHtml(key)}</button>`).join("")}</div>
    <div class="build-actions"><button class="undo-button" type="button" data-action="undo" ${session.draft ? "" : "disabled"}>↶ 하나 지우기</button><button class="primary-button check-button" type="button" data-action="check-answer" ${ready ? "" : "disabled"}>완성! 확인 ✓</button></div>` : ""}
  </div>`;
}

function renderGame() {
  const subject = SUBJECTS[session.subject];
  const question = currentQuestion();
  const activity = activityFor(question, session.subject);
  const mission = currentMission();
  const words = question.prompt.split(/\s+/);
  const listenMode = session.mode === "build" && activity?.kind === "listen";
  const questionText = listenMode && !session.answered ? "영어 소리를 듣고 그림을 골라 봐!" : session.mode === "build" && activity?.kind === "evidence" ? escapeHtml(activity.query) : session.subject === "hangul" ? words.map((word, index) => `<span class="reading-word ${index === session.readStep ? "active" : ""}">${word}</span>`).join(" ") : question.prompt;
  let illustration = "";
  if (question.count && session.mode === "build" && activity?.kind === "count") {
    illustration = "";
  } else if (question.count) {
    illustration = `<div class="count-objects ${question.object ? "" : "count-dots"}" role="img" aria-label="${question.count}개의 ${question.object ? OBJECTS[question.object] : "점"}">${Array.from({ length: question.count }, (_, index) => question.object ? art(question.object, `count-art ${index < session.countStep ? "counted" : ""}`, true) : `<i class="math-dot ${index < session.countStep ? "counted" : ""}"></i>`).join("")}</div>`;
  } else if (question.operator && question.left <= 10 && question.right <= 10) {
    const dots = count => `<span class="dot-group">${Array.from({ length: count }, () => '<i class="math-dot"></i>').join("")}</span>`;
    illustration = `<div class="math-visual" aria-hidden="true">${dots(question.left)}<span class="math-symbol">${question.operator === "+" ? "+" : "−"}</span>${dots(question.right)}</div>`;
  } else if (question.object) {
    illustration = art(question.object, "question-image");
  } else if (question.choiceKind === "picture" && session.mode === "build" && session.subject === "hangul") {
    illustration = art(question.answer, "question-image");
  } else if (question.color) {
    illustration = `<span class="color-swatch" style="--swatch:${question.color}" aria-hidden="true"></span>`;
  }
  if (question.equation) illustration += `<span class="equation">${question.equation}</span>`;
  const choices = session.choices.map(choice => {
    const isNumber = typeof choice === "number";
    const artId = question.choiceKind === "picture" ? choice : null;
    const label = artId ? OBJECTS[choice] : choice;
    const picture = artId ? art(artId, "choice-art", true) : "";
    const isWrong = session.answered ? session.wrongChoice === choice : session.wrongChoices.includes(choice);
    const response = session.answered && choice === question.answer ? "correct" : isWrong ? "wrong" : !session.answered && session.wrongChoices.length >= 2 && choice === question.answer ? "answer-hint" : "";
    const mark = response === "correct" ? "✓" : response === "answer-hint" ? "💡" : response === "wrong" ? "↻" : "";
    return `<div class="choice-wrap"><button class="choice-card ${isNumber ? "number" : artId ? "picture" : "text"} ${isNumber && String(label).length >= 3 ? "triple-number" : ""} ${/^[A-Z]{7,}$/.test(String(label)) ? "long-word" : ""} ${response}" type="button" data-action="answer" data-value="${choice}" aria-label="${label}">${mark ? `<span class="choice-mark" aria-hidden="true">${mark}</span>` : ""}${picture}<span class="choice-word">${label}</span></button>${session.subject === "english" && state.soundOn ? `<button class="choice-listen" type="button" data-action="listen-choice" data-value="${choice}" aria-label="${label} 소리 듣기">🔊</button>` : ""}</div>`;
  }).join("");
  const response = session.feedback || (thinkingFirst()
    ? { kind: "idle", title: "먼저 답을 떠올려 봐!", detail: "생각이 끝나면 보기를 열어 보자." }
    : { kind: "idle", title: session.mode === "build" ? activity.instruction : question.operator && question.left > 10 ? "차근차근 계산해 보자!" : question.choiceKind === "picture" || question.count || question.operator || question.object || question.color ? "그림을 보고 골라보자!" : "천천히 생각해 보자!", detail: "" });
  const icon = { idle: "👀", good: "✨", hint: "💡", reveal: "🔎", explore: "🌱" }[response.kind];
  const feedback = `<div class="feedback-message ${response.kind}" role="status"><span class="feedback-icon" aria-hidden="true">${icon}</span>${avatar("feedback-avatar", true)}<span class="feedback-copy"><strong>${response.title}</strong>${response.detail ? `<span>${response.detail}</span>` : ""}</span></div>`;
  const countMax = question.count && question.count <= 10 ? question.count : question.operator && question.left <= 20 && question.right <= 10 ? question.right : 0;
  const countValue = question.count ? session.countStep : question.left + (question.operator === "+" ? session.countStep : -session.countStep);
  const countTool = countMax && !session.answered && !(session.mode === "build" && activity?.kind === "count") ? `<div class="count-tool"><span>${session.countStep ? `지금 ${countValue}${session.countStep === countMax ? " · 답을 완성해 봐!" : ""}` : question.count ? "그림을 하나씩 세어 봐" : `${question.left}부터 ${question.operator === "+" ? "더해" : "빼"} 보자`}</span><button type="button" data-action="count-step" ${session.countStep === countMax ? "disabled" : ""}>${question.count ? "하나 세기" : question.operator === "+" ? "+1 해 보기" : "−1 해 보기"}</button></div>` : "";
  const readTool = session.subject === "hangul" && !session.answered && !(session.mode === "build" && activity?.kind === "evidence") ? `<div class="read-tool"><span>${session.readStep < 0 ? "문장을 나눠 읽어 봐" : `‘${words[session.readStep]}’ 읽어 볼까?`}</span><button type="button" data-action="read-step">${session.readStep < 0 ? "한 마디씩 읽기" : "다음 말 보기"}</button></div>` : "";
  const tools = !thinkingFirst() ? `<div class="learning-tools">${!session.answered && !session.hintShown ? '<button type="button" data-action="hint">💡 힌트 보기</button>' : ""}${countTool}${readTool}</div>` : "";
  const progress = Array.from({ length: roundLength() }, (_, index) => `<span class="${index < roundPosition() + Number(session.answered) ? "filled" : ""}" aria-hidden="true">${index < roundPosition() + Number(session.answered) ? mission.icon : "○"}</span>`).join("");
  const modeBar = activity ? `<div class="activity-mode"><strong>${session.mode === "build" ? activity.label : "🔎 보기 탐정"}</strong><button type="button" data-action="switch-mode" ${activity.kind === "listen" && !state.soundOn && session.mode === "choice" ? "disabled" : ""}>${session.mode === "build" ? session.answered ? "다른 보기도 살펴보기" : "보기로 풀기" : `${activity.label.slice(3)} 도전`}</button>${session.mode === "build" && session.subject === "english" && state.soundOn ? `<button class="activity-listen" type="button" data-action="listen-choice" data-value="${escapeHtml(question.answer)}" aria-label="답 소리 다시 듣기">🔊<span> 다시 듣기</span></button>` : ""}</div>` : "";
  return `<section class="game-screen" aria-label="${subject.title}">
    <div class="subpage-top"><button class="back-button" type="button" data-action="${session.trip ? "home" : "levels"}">${homeSvg()} ${session.trip ? "홈으로 가기" : "단계 고르기"}</button><div class="game-heading"><h1 class="page-title">${session.trip === "review" ? "복습 여행" : session.trip ? "깜짝 탐험" : subject.title}</h1><span class="game-level">${session.trip ? `${subject.label} · ` : ""}${session.age === "six" ? "" : `${AGE_NAMES[session.age]} · `}${session.level + 1}단계 · ${levelsFor()[session.level]}</span></div>${renderSteps()}</div>
    <div class="game-layout">
      <div class="game-main">
        ${session.recall ? '<div class="mission-strip memory">보기를 보기 전에 답을 말해 봐!</div>' : `<div class="mission-strip"><strong>${mission.icon} ${mission.title}</strong><span class="mission-progress" aria-label="${roundPosition() + Number(session.answered)}개 완료, 전체 ${roundLength()}개">${progress}</span>${session.streak >= 2 ? `<small>✨ 연속 ${session.streak}번</small>` : ""}</div>`}
        <div class="question-panel ${question.prompt.length > 38 ? "long-question" : ""}"><div class="question-content"><span class="question-text">${questionText}</span>${illustration}</div><button class="speak-button" type="button" data-action="speak-question" aria-label="${state.soundOn ? "문제 다시 듣기" : "소리가 꺼져 있어요"}" ${state.soundOn ? "" : "disabled"}>${speakerSvg()}</button></div>
        ${thinkingFirst() ? '<button class="primary-button recall-reveal" type="button" data-action="reveal-choices">생각했어! 답 만들기 →</button>' : `${modeBar}${listenMode ? `<div class="listen-prompt"><button type="button" data-action="speak-question" aria-label="영어 단어 다시 듣기">🔊 영어 단어 다시 듣기</button></div>` : ""}${session.mode === "build" && activity && !listenMode ? renderActivity(activity) : ""}${session.mode !== "build" || listenMode || activity?.kind === "evidence" && session.clueFound ? `<div class="choice-grid ${question.options.some(choice => String(choice).length > 18) ? "long-choices" : ""}">${choices}</div>` : ""}`}
        ${tools}
        <div class="feedback-row">${feedback}${session.answered ? `<button class="primary-button next-button" type="button" data-action="next">${session.recall ? "기억 카드 마치기" : roundPosition() === roundLength() - 1 ? "결과 보기" : "다음 문제"} →</button>` : ""}</div>
      </div>
      <div class="game-side">${avatar("game-avatar")}<div class="game-speech">${session.feedback?.title || "천천히 골라봐! ♥"}</div></div>
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
  const nextLevel = session.level + 1;
  const hasNext = nextLevel < levelsFor().length;
  const nextOpen = !session.trip && hasNext && stageUnlocked(session.age, session.subject, nextLevel, state);
  const mission = currentMission();
  const newBadges = earnedBadges(state).filter(badge => !session.badgesBefore.includes(badge.title));
  return `<section class="result" aria-label="놀이 완료"><div class="result-panel">
    <div class="result-copy">${starSvg()}<h1>${mission.finish}</h1><p>${session.trip ? `${roundLength()}문제 탐험 완료!` : `${SUBJECTS[session.subject].label} ${session.level + 1}단계 완료!`} ${session.newStars ? `새로운 반짝 별 ${session.newStars}개를 모았어.` : "다시 풀며 연습했어."}</p>
      <div class="round-recap">${session.firstTry ? `<span>✨ 스스로 찾기 ${session.firstTry}</span>` : ""}${session.helped ? `<span>💡 도움 활용 ${session.helped}</span>` : ""}${session.recovered ? `<span>🌱 다시 성공 ${session.recovered}</span>` : ""}</div>
      ${session.activities.length ? `<p class="activity-recap">이번에 해본 놀이: ${[...new Set(session.activities)].join(" · ")}</p>` : ""}
      ${session.trip ? `<p class="recall-done">${session.trip === "review" ? `🌱 ${session.tripMastered}문제를 스스로 해결해서 복습 목록에서 졸업했어!` : "한글·수학·영어를 두루 만나 봤어!"}</p><p class="recall-invite">잠깐 몸을 쭉 펴고 쉬어도 좋아.</p>` : session.recallDone ? '<p class="recall-done">🧠 기억 카드도 완성했어!</p>' : '<p class="recall-invite">🧠 기억 카드: 보기 전에 답을 떠올려 볼까?</p>'}
      ${newBadges.length ? `<div class="new-stickers"><strong>새 스티커를 모았어!</strong><span>${newBadges.map(badge => `${badge.icon} ${badge.title}`).join(" · ")}</span></div>` : ""}
      ${!session.trip && hasNext && !nextOpen ? `<p class="result-unlock">다음 단계는 별 ${AGE_STAR_GATE[session.age] + nextLevel * ROUND_SIZE - state.stars}개를 더 모으면 열려요.</p>` : ""}
      <div class="result-actions">${session.trip ? '<button class="primary-button" type="button" data-action="home">다음 놀이 고르기 →</button>' : `${!session.recallDone ? '<button class="primary-button" type="button" data-action="recall">기억 카드 도전 →</button>' : ""}${nextOpen ? '<button class="primary-button" type="button" data-action="next-level">다음 단계 →</button>' : ''}<button class="back-button" type="button" data-action="adventure">세 과목 깜짝 탐험 🧭</button><button class="back-button" type="button" data-action="replay">다시 놀기</button>`}<button class="back-button" type="button" data-action="levels">단계 고르기</button><button class="back-button" type="button" data-action="stickers">스티커북</button><button class="back-button" type="button" data-action="wardrobe">꾸미기</button></div>
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
  app.innerHTML = session.view === "home" ? renderHome() : session.view === "levels" ? renderLevels() : session.view === "game" ? renderGame() : session.view === "wardrobe" ? renderWardrobe() : session.view === "stickers" ? renderStickers() : renderResult();
}

function go(view) {
  if (view === "home") { session.age = state.age; session.trip = ""; session.recall = false; }
  session.view = view;
  render();
  window.scrollTo({ top: 0, behavior: "auto" });
}

function openLevels(subject) {
  if (!(subject in SUBJECTS) || !ageUnlocked(session.age, state)) return;
  session.trip = "";
  session.subject = subject;
  go("levels");
}

function start(level) {
  if (!session.subject || !Number.isInteger(level) || !stageUnlocked(session.age, session.subject, level, state)) return;
  session.level = level;
  session.trip = "";
  session.tripPosition = 0;
  session.index = 0;
  session.newStars = 0;
  session.firstTry = 0;
  session.recovered = 0;
  session.helped = 0;
  session.streak = 0;
  session.activities = [];
  session.missedIndices = [];
  session.badgesBefore = earnedBadges(state).map(badge => badge.title);
  session.recall = false;
  session.recallReady = false;
  session.recallDone = false;
  resetQuestion();
  go("game");
  playQuestion();
}

function startRecall() {
  if (session.view !== "result" || session.trip) return;
  session.badgesBefore = earnedBadges(state).map(badge => badge.title);
  session.index = session.missedIndices[0] ?? session.level % ROUND_SIZE;
  session.recall = true;
  session.recallReady = false;
  resetQuestion();
  go("game");
  playQuestion();
}

function showHint() {
  if (session.view !== "game" || session.answered || session.hintShown || thinkingFirst()) return;
  session.hintShown = true;
  session.supportUsed = true;
  queueReview();
  session.feedback = { kind: "hint", title: ["단서를 찾아보자!", "이렇게 해 볼까?", "한 걸음씩 풀어 보자!"][(session.level + session.index) % 3], detail: answerHint(currentQuestion(), session.subject) };
  render();
}

function countStep() {
  if (session.view !== "game" || session.answered || session.subject !== "math") return;
  const question = currentQuestion();
  const max = question.count && question.count <= 10 ? question.count : question.operator && question.left <= 20 && question.right <= 10 ? question.right : 0;
  if (!max || session.countStep >= max) return;
  session.supportUsed = true;
  queueReview();
  session.countStep += 1;
  render();
}

function readStep() {
  if (session.view !== "game" || session.answered || session.subject !== "hangul") return;
  session.readStep = (session.readStep + 1) % currentQuestion().prompt.split(/\s+/).length;
  render();
}

function editActivity(action, value) {
  if (session.view !== "game" || session.mode !== "build" || session.answered || thinkingFirst()) return;
  const activity = activityFor(currentQuestion(), session.subject);
  if (!activity) return;
  if (activity.kind === "count") {
    const index = Number(value);
    if (action !== "count-item" || !Number.isInteger(index) || index < 0 || index >= (activity.items?.length || currentQuestion().count)) return;
    session.selectedTiles = session.selectedTiles.includes(index) ? session.selectedTiles.filter(item => item !== index) : [...session.selectedTiles, index];
    session.draft = String(session.selectedTiles.length);
  } else if (activity.kind === "number") {
    if (action === "digit" && /^\d$/.test(value) && session.draft.length < 4) session.draft += value;
    if (action === "undo") session.draft = session.draft.slice(0, -1);
  } else {
    const index = Number(value);
    if (action === "tile" && Number.isInteger(index) && session.tiles[index] !== undefined && !session.selectedTiles.includes(index) && session.selectedTiles.filter(Number.isInteger).length < activity.tokens.length) {
      const empty = session.selectedTiles.indexOf(null);
      if (empty >= 0) session.selectedTiles[empty] = index;
      else session.selectedTiles.push(index);
    }
    if (action === "remove-tile" && Number.isInteger(index) && index >= 0 && index < session.selectedTiles.length) session.selectedTiles[index] = null;
    if (action === "undo") {
      while (session.selectedTiles.at(-1) === null) session.selectedTiles.pop();
      session.selectedTiles.pop();
    }
    session.draft = session.selectedTiles.map(tile => session.tiles[tile]).join(activity.separator);
  }
  render();
  document.querySelector(activity.kind === "count" ? `[data-action="count-item"][data-value="${value}"]` : activity.kind === "number" ? `[data-action="${action === "undo" ? "undo" : "digit"}"]:not(:disabled)` : '.build-tile:not(:disabled), [data-action="check-answer"]:not(:disabled)')?.focus({ preventScroll: true });
}

function findClue(value) {
  if (session.view !== "game" || session.mode !== "build" || session.answered || thinkingFirst()) return;
  const activity = activityFor(currentQuestion(), session.subject);
  const index = Number(value);
  if (activity?.kind !== "evidence" || session.clueFound || !Number.isInteger(index) || !activity.words[index] || session.clueMisses.includes(index)) return;
  if (activity.words[index].toLowerCase().includes(String(currentQuestion().answer).toLowerCase())) {
    session.clueFound = true;
    session.feedback = { kind: "hint", title: "이야기 속 단서를 찾았어!", detail: "이제 질문에 맞는 답을 골라 봐." };
    playClip(audio.effect, "sparkle");
  } else {
    session.clueMisses.push(index);
    if (session.clueMisses.length >= 2) { session.supportUsed = true; queueReview(); }
    session.feedback = session.clueMisses.length >= 2
      ? { kind: "reveal", title: "노란 단서를 찾아보자!", detail: "노란 낱말을 누른 뒤 질문의 답을 골라 봐." }
      : { kind: "hint", title: "다른 곳도 살펴볼까?", detail: "질문에서 묻는 말이 나오는 부분을 다시 찾아봐." };
  }
  render();
}

function switchMode() {
  if (session.view !== "game" || thinkingFirst()) return;
  const activity = activityFor(currentQuestion(), session.subject);
  if (!activity || activity.kind === "listen" && !state.soundOn && session.mode === "choice") return;
  if (session.mode === "build" && !session.answered) { session.supportUsed = true; queueReview(); }
  session.mode = session.mode === "build" ? "choice" : "build";
  if (session.answered) {
    if (activity.kind === "evidence") session.clueFound = true;
    session.draft = activity.answerText || String(currentQuestion().answer);
    session.selectedTiles = [];
    if (activity.kind === "count") session.selectedTiles = Array.from({ length: activity.items?.length || currentQuestion().count }, (_, index) => index);
    else if (!["letter", "line"].includes(activity.kind)) for (const token of activity.tokens || []) session.selectedTiles.push(session.tiles.findIndex((tile, index) => tile === token && !session.selectedTiles.includes(index)));
  }
  render();
}

function answer(value, fromActivity = false) {
  if (session.view !== "game" || thinkingFirst()) return;
  const question = currentQuestion();
  const activity = activityFor(question, session.subject);
  if (fromActivity) {
    if (session.mode !== "build" || !activity || session.answered) return;
    if (["letter", "line"].includes(activity.kind)) {
      if (!activity.tokens.some(token => String(token) === String(value))) return;
    } else {
      if (value !== session.draft || !value) return;
      if (activity.kind === "number" ? !/^\d{1,4}$/.test(value) : activity.kind === "count" ? !session.selectedTiles.length : session.selectedTiles.filter(Number.isInteger).length !== activity.tokens.length) return;
    }
  } else if (!question.options.includes(typeof question.answer === "number" ? Number(value) : value)) return;
  const completedBuild = fromActivity && (["order", "place"].includes(activity.kind) && value === activity.tokens.join(activity.separator) || activity.answerText && value === activity.answerText);
  const choice = completedBuild ? question.answer : typeof question.answer === "number" ? Number(value) : value;
  const questionIndex = session.level * ROUND_SIZE + session.index;
  const variation = questionIndex + session.feedbackTurn++ + (session.age === "six" ? 0 : session.age === "seven" ? 500 : 1000);
  const earnedId = questionId(session.subject, questionIndex, session.age);
  const { correct, awardStar } = answerProgress(question, choice, session.answered || state.earnedQuestions.includes(earnedId));
  if (correct && session.answered) {
    session.wrongChoice = null;
    session.feedback = answerFeedback(question, session.subject, choice, session.wrongChoices.length, true, variation, session.supportUsed);
    render();
    document.querySelector(".feedback-row").scrollIntoView({ block: "nearest" });
    if (session.subject === "english") playEnglishChoice(choice);
    return;
  }
  if (correct) {
    session.answered = true;
    session.wrongChoice = null;
    session.feedback = answerFeedback(question, session.subject, choice, session.wrongChoices.length, false, variation, session.supportUsed);
    if (session.mode === "build" && activity && !session.wrongChoices.length && !session.supportUsed) {
      const titles = {
        sentence: ["낱말 기차 완성! 출발!", "낱말이 모여 문장이 됐어!", "알맞은 순서로 이어 줬어!", "문장을 직접 만들었어!"],
        number: ["수를 직접 만들어 해결했어!", "숫자 버튼으로 정답 완성!", "만든 수가 딱 맞아!", "숫자 미션 성공!"],
        word: ["글자 조각을 이어 완성했어!", "낱말 퍼즐 완성!", "글자가 모여 낱말이 됐어!", "알맞은 글자를 이어 줬어!"],
        fill: ["빈칸에 알맞은 말을 넣었어!", "문장을 완성했어!", "앞뒤를 이어 읽고 찾았어!", "빈칸 탐정 성공!"],
        letter: ["낱말 속 글자를 찾았어!", "첫 글자를 콕 찾았어!", "글자를 나누어 보니 보였어!", "글자 탐정 성공!"],
        count: ["그림을 하나씩 세었어!", "모두 빠짐없이 세었어!", "마지막 수를 찾아냈어!", "그림 세기 성공!"],
        order: ["수의 순서를 맞췄어!", "작은 수부터 잘 놓았어!", "수 줄세우기 성공!", "수들을 비교해 찾았어!"],
        line: ["수직선에서 도착점을 찾았어!", "수를 따라 걸어 답을 찾았어!", "도착한 수가 딱 맞아!", "수직선 탐험 성공!"],
        place: ["십과 일을 나누어 만들었어!", "십의 묶음과 낱개가 딱 맞아!", "수의 자리를 찾아냈어!", "십과 일 만들기 성공!"],
        listen: ["영어 소리를 듣고 그림을 찾았어!", "소리와 그림을 연결했어!", "듣기 탐정 성공!", "영어 소리를 알아들었어!"],
        evidence: ["이야기 단서로 답을 찾았어!", "글 속 힌트를 짚어냈어!", "단서를 보고 답을 골랐어!", "이야기 탐정 성공!"],
      };
      session.feedback.title = titles[activity.kind][variation % 4];
      if (activity.kind === "count" && activity.items) session.feedback.title = ["글자를 하나씩 짚었어!", "낱말의 글자를 모두 세었어!", "몇 글자인지 찾아냈어!", "글자 세기 성공!"][variation % 4];
    }
    if (session.recall) {
      const id = stageId(session.subject, session.level, session.age);
      if (!state.rememberedStages.includes(id)) { state.rememberedStages.push(id); save(); }
      session.feedback.title = session.wrongChoices.length ? "다시 생각해 기억해 냈어!" : "기억 카드를 해결했어!";
    } else {
      session.activities.push(session.mode === "build" && activity ? activity.label : "🔎 보기 탐정");
      if (session.wrongChoices.length) {
        session.recovered += 1;
        session.streak = 0;
        if (!state.retryWins.includes(earnedId)) state.retryWins.push(earnedId);
      } else if (session.supportUsed) {
        session.helped += 1;
        session.streak = 0;
      } else {
        session.firstTry += 1;
        session.streak += 1;
        state.bestStreak = Math.max(state.bestStreak, session.streak);
      }
      if (awardStar) {
        state.stars += 1;
        state.earnedQuestions.push(earnedId);
        session.newStars += 1;
      }
      if (session.trip === "review") {
        const independent = !session.wrongChoices.length && !session.supportUsed;
        state.reviewQuestions = reviewAfterAnswer(state.reviewQuestions, earnedId, independent);
        if (independent) {
          session.tripMastered += 1;
          if (!state.reviewedQuestions.includes(earnedId)) state.reviewedQuestions.push(earnedId);
          session.feedback.title = "전에 어려웠던 문제, 이번엔 스스로 해냈어!";
        } else session.feedback.detail += " 다음 여행에서 한 번 더 만나 보자.";
      }
      save();
    }
    playClip(audio.effect, CORRECT_EFFECTS[variation % CORRECT_EFFECTS.length]);
    const praise = session.wrongChoices.length ? "praise-3" : PRAISE_VOICES[variation % PRAISE_VOICES.length];
    if (session.subject === "english") playEnglishChoice(choice, () => playClip(audio.voice, praise));
    else playClip(audio.voice, praise);
  } else {
    session.wrongChoice = choice;
    if (!session.answered && !session.wrongChoices.includes(choice)) {
      session.wrongChoices.push(choice);
      queueReview();
      session.streak = 0;
    }
    session.feedback = answerFeedback(question, session.subject, choice, session.wrongChoices.length, session.answered, variation);
    if (fromActivity && session.wrongChoices.length < 2) {
      if (activity.kind === "count") session.feedback.detail = `${session.selectedTiles.length}개를 ${activity.items ? "짚었어. 낱말의 글자를" : "표시했어. 그림을"} 하나씩 다시 살펴봐.`;
      else if (activity.kind === "line") session.feedback.detail = `${question.left}에서 ${question.operator === "+" ? "오른쪽" : "왼쪽"}으로 ${question.right}만큼 움직여 봐.`;
      else if (activity.kind === "letter") session.feedback.detail = question.prompt.includes("끝 글자") ? "낱말의 맨 끝 글자를 눌러 봐." : "낱말의 맨 앞 글자를 눌러 봐.";
      else if (activity.kind === "order") {
        const ordered = session.selectedTiles.map(index => session.tiles[index]);
        const pair = ordered.findIndex((number, index) => index < ordered.length - 1 && number > ordered[index + 1]);
        session.feedback.detail = pair < 0 ? "작은 수부터 다시 놓아 봐." : `${ordered[pair]}와 ${ordered[pair + 1]}를 비교해 봐. 작은 수를 왼쪽에 놓아 봐.`;
      } else if (activity.kind === "place") {
        const parts = session.selectedTiles.map(index => session.tiles[index]);
        session.feedback.detail = `${parts.join(" + ")} = ${parts.reduce((sum, part) => sum + part, 0)}이야. 식의 답과 비교해 봐.`;
      }
      else if (activity.kind === "fill") session.feedback.detail = `${activity.preview ? answerHint(question, session.subject) : "빈칸 앞뒤를 이어 읽어 봐."} 조각을 누르면 뺄 수 있어.`;
      else if (activity.tokens) {
        const mismatch = activity.tokens.findIndex((token, index) => token !== session.tiles[session.selectedTiles[index]]);
        session.feedback.detail = `${mismatch + 1}번째 ${activity.kind === "sentence" ? "낱말" : "글자"}부터 다시 살펴봐. 조각을 누르면 뺄 수 있어. ${answerHint(question, session.subject)}`;
      } else session.feedback.detail = `만든 수 ${choice}은 답보다 ${choice > question.answer ? "커" : "작아"}. ${answerHint(question, session.subject)}`;
    }
    if (!session.answered) playClip(audio.effect, "try-again");
    const voice = session.answered ? null : session.wrongChoices.length >= 2 ? "reveal" : RETRY_VOICES[variation % RETRY_VOICES.length];
    if (session.subject === "english" && (question.options.includes(choice) || session.wrongChoices.length >= 2)) playEnglishChoice(session.wrongChoices.length >= 2 && !session.answered ? question.answer : choice, voice ? () => playClip(audio.voice, voice) : null);
    else if (voice) playClip(audio.voice, voice);
  }
  render();
  document.querySelector(".feedback-row").scrollIntoView({ block: "nearest" });
}

function next() {
  if (session.view !== "game" || !session.answered) return;
  audio.effect.pause();
  if (session.trip) {
    if (session.tripPosition < session.tripQuestions.length - 1) {
      session.tripPosition += 1;
      loadTripQuestion();
    } else {
      if (session.trip === "adventure") state.adventures += 1;
      save();
      go("result");
      playClip(audio.effect, "level-up");
      playClip(audio.voice, "complete");
    }
    return;
  }
  if (session.recall) {
    session.recall = false;
    session.recallDone = true;
    go("result");
    return;
  }
  if (session.index === ROUND_SIZE - 1) {
    const completedId = stageId(session.subject, session.level, session.age);
    if (!state.completedStages.includes(completedId)) state.completedStages.push(completedId);
    save();
    go("result");
    playClip(audio.effect, "level-up");
    playClip(audio.voice, "complete");
    return;
  }
  session.index += 1;
  resetQuestion();
  go("game");
  playQuestion();
}

if (typeof document !== "undefined") {
  render();
  document.querySelector("#sound-toggle").addEventListener("click", () => {
    state.soundOn = !state.soundOn;
    if (!state.soundOn) {
      stopAudio();
      if (session.view === "game" && session.mode === "build" && activityFor(currentQuestion(), session.subject)?.kind === "listen") session.mode = "choice";
    }
    save(); render();
  });
  document.addEventListener("click", playMusic);
  document.addEventListener("visibilitychange", () => { if (document.hidden) stopAudio(); });
  document.querySelector(".brand").addEventListener("click", () => go("home"));
  document.querySelector("#app").addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    switch (button.dataset.action) {
      case "age":
        if (ageUnlocked(button.dataset.age, state)) { session.age = button.dataset.age; state.age = session.age; save(); render(); }
        break;
      case "home": go("home"); break;
      case "wardrobe": go("wardrobe"); break;
      case "stickers": go("stickers"); break;
      case "levels": openLevels(button.dataset.subject || session.subject); break;
      case "start": start(Number(button.dataset.level)); break;
      case "adventure": startTrip("adventure"); break;
      case "review": startTrip("review"); break;
      case "switch-mode": switchMode(); break;
      case "tile": case "digit": case "count-item": case "remove-tile": case "undo": editActivity(button.dataset.action, button.dataset.value); break;
      case "activity-answer": answer(button.dataset.value, true); break;
      case "find-clue": findClue(button.dataset.value); break;
      case "check-answer": answer(session.draft, true); break;
      case "answer": answer(button.dataset.value); break;
      case "hint": showHint(); break;
      case "count-step": countStep(); break;
      case "read-step": readStep(); break;
      case "listen-choice":
        if (session.view === "game" && session.subject === "english" && currentQuestion().options.includes(button.dataset.value)) playEnglishChoice(button.dataset.value);
        break;
      case "reveal-choices":
        if (session.view === "game" && thinkingFirst()) { session.recallReady = true; render(); }
        break;
      case "next": next(); break;
      case "recall": startRecall(); break;
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
