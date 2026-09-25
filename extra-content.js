// Later rounds keep the original 30 questions in each subject unchanged.
const things = [
  ["ball", "공", "BALL", "⚽"], ["car", "자동차", "CAR", "🚗"],
  ["book", "책", "BOOK", "📖"], ["fish", "물고기", "FISH", "🐟"],
  ["bird", "새", "BIRD", "🐦"], ["tree", "나무", "TREE", "🌳"],
  ["star", "별", "STAR", "⭐"], ["cake", "케이크", "CAKE", "🎂"],
  ["bear", "곰", "BEAR", "🐻"], ["house", "집", "HOUSE", "🏠"],
  ["moon", "달", "MOON", "🌙"], ["bus", "버스", "BUS", "🚌"],
  ["pencil", "연필", "PENCIL", "✏️"], ["bread", "빵", "BREAD", "🍞"],
  ["pear", "배", "PEAR", "🍐"], ["melon", "멜론", "MELON", "🍈"],
  ["turtle", "거북이", "TURTLE", "🐢"], ["bee", "벌", "BEE", "🐝"],
  ["clock", "시계", "CLOCK", "⏰"], ["shoe", "운동화", "SHOE", "👟"],
  ["run", "달리기", "RUN", "🏃"], ["jump", "점프", "JUMP", "🤸"],
  ["sleep", "잠자기", "SLEEP", "😴"], ["eat", "먹기", "EAT", "🍽️"],
  ["read", "읽기", "READ", "📚"], ["rainy", "비", "RAINY", "🌧️"],
  ["snowy", "눈", "SNOWY", "❄️"], ["sunny", "맑음", "SUNNY", "☀️"],
  ["cloudy", "흐림", "CLOUDY", "☁️"], ["windy", "바람", "WINDY", "🌬️"],
];
const thing = Object.fromEntries(things.map(([id, ko, en, emoji]) => [id, { ko, en, emoji }]));
export const EXTRA_OBJECTS = Object.fromEntries(things.map(([id, ko]) => [id, ko]));
export const EMOJI_ART = Object.fromEntries(things.map(([id, , , emoji]) => [id, emoji]));

// Rotate the right answer so it never sits in the same column for a whole round.
function three(answer, wrong1, wrong2, index) {
  return [
    [answer, wrong1, wrong2],
    [wrong1, answer, wrong2],
    [wrong1, wrong2, answer],
  ][index % 3];
}
const picture = (prompt, answer, wrong1, wrong2, index, extras = {}) => ({
  prompt, options: three(answer, wrong1, wrong2, index), answer, choiceKind: "picture", ...extras,
});
const text = (prompt, answer, wrong1, wrong2, index, extras = {}) => ({
  prompt, options: three(answer, wrong1, wrong2, index), answer, ...extras,
});

export const EXTRA_LEVELS = {
  hangul: ["새 첫소리 1", "새 첫소리 2", "낱말 찾기 1", "낱말 찾기 2", "빈칸 낱말 1", "빈칸 낱말 2", "처음과 끝 1", "처음과 끝 2", "몇 글자일까 1", "몇 글자일까 2", "초성 찾기 1", "초성 찾기 2", "짧은 이야기 1", "짧은 이야기 2"],
  math: ["11~15 세기", "16~20 세기", "빈칸 더하기 1", "빈칸 더하기 2", "더하기 3", "더하기 4", "빼기 2", "빼기 3", "큰 수·작은 수 1", "큰 수·작은 수 2", "수의 순서 2", "수의 순서 3", "무늬 찾기", "이야기 셈"],
  english: ["새 그림 단어 1", "새 그림 단어 2", "새 그림 단어 3", "새 그림 단어 4", "영어 듣고 찾기 1", "영어 듣고 찾기 2", "첫 알파벳 2", "첫 알파벳 3", "숫자 영어 1", "숫자 영어 2", "움직임 단어", "날씨 단어", "짧은 영어 듣기", "생활 영어"],
};

const hangulFirst = [
  ["car", "자", "tree", "moon"], ["fish", "물", "bird", "ball"],
  ["tree", "나", "car", "bear"], ["cake", "케", "book", "house"],
  ["bus", "버", "bee", "moon"], ["pencil", "연", "pear", "fish"],
  ["melon", "멜", "moon", "ball"], ["turtle", "거", "car", "bee"],
  ["clock", "시", "shoe", "tree"], ["shoe", "운", "clock", "bird"],
].map(([id, syllable, a, b], i) => picture(`‘${syllable}’로 시작하는 것은?`, id, a, b, i));

const hangulWords = [
  ["ball", "별", "배"], ["book", "벌", "빵"], ["house", "곰", "공"],
  ["moon", "물고기", "모자"], ["pear", "별", "빵"],
  ["melon", "모자", "나무"], ["turtle", "자동차", "거미"],
  ["bee", "배", "별"], ["clock", "케이크", "신발"],
  ["shoe", "시계", "연필"],
].map(([id, a, b], i) => text("그림에 맞는 낱말은?", thing[id].ko, a, b, i, { object: id }));

const hangulBlanks = [
  ["car", "자□차", "동", "모", "고"], ["fish", "물□기", "고", "도", "나"],
  ["tree", "나□", "무", "비", "자"], ["cake", "케□크", "이", "오", "우"],
  ["bus", "버□", "스", "수", "리"], ["pencil", "연□", "필", "피", "플"],
  ["melon", "멜□", "론", "런", "린"], ["turtle", "거□이", "북", "보", "비"],
  ["clock", "시□", "계", "게", "개"], ["shoe", "운□화", "동", "돈", "통"],
].map(([id, blank, answer, a, b], i) => text(`${blank}를 완성해 볼까?`, answer, a, b, i, { object: id }));

const hangulEdges = [
  ["fish", "첫", "물", "고", "기"], ["car", "첫", "자", "동", "차"],
  ["pencil", "첫", "연", "필", "원"], ["turtle", "첫", "거", "북", "이"],
  ["melon", "첫", "멜", "론", "말"], ["car", "끝", "차", "자", "동"],
  ["turtle", "끝", "이", "거", "북"], ["pencil", "끝", "필", "연", "팔"],
  ["melon", "끝", "론", "멜", "런"], ["shoe", "끝", "화", "운", "동"],
].map(([id, edge, answer, a, b], i) => text(`${thing[id].ko}의 ${edge} 글자는?`, answer, a, b, i, { object: id }));

const hangulLengths = ["ball", "book", "star", "car", "turtle", "pencil", "cake", "melon", "clock", "bird"]
  .map((id, i) => text(`${thing[id].ko}는 몇 글자일까?`, [...thing[id].ko].length, ...[1, 2, 3].filter(n => n !== [...thing[id].ko].length), i, { object: id }));

const hangulConsonants = [
  ["ball", "ㄱ", "ㄴ", "ㅂ"], ["tree", "ㄴ", "ㄷ", "ㅁ"],
  ["car", "ㅈ", "ㅊ", "ㅂ"], ["moon", "ㄷ", "ㅁ", "ㅂ"],
  ["bus", "ㅂ", "ㅍ", "ㅅ"], ["fish", "ㅁ", "ㄴ", "ㅂ"],
  ["apple", "ㅅ", "ㅈ", "ㅊ"], ["pencil", "ㅇ", "ㅎ", "ㅁ"],
  ["rabbit", "ㅌ", "ㄷ", "ㅍ"], ["cake", "ㅋ", "ㄱ", "ㅌ"],
].map(([id, answer, a, b], i) => text(`${id === "apple" ? "사과" : id === "rabbit" ? "토끼" : thing[id].ko}의 첫 자음은?`, answer, a, b, i, { object: id }));

const hangulStories = [
  ["곰이 집으로 갔어요. 누가 갔을까?", "bear", "bird", "bee"],
  ["새가 하늘을 날아요. 누가 날까?", "bird", "bee", "bear"],
  ["벌이 꽃으로 왔어요. 누가 왔을까?", "bee", "bird", "turtle"],
  ["거북이가 천천히 걸어요. 누가 걸을까?", "turtle", "bear", "fish"],
  ["물고기가 물속을 헤엄쳐요. 누가 헤엄칠까?", "fish", "bird", "bee"],
  ["자동차가 길을 달려요. 무엇이 달릴까?", "car", "bus", "shoe"],
  ["버스가 정류장에 왔어요. 무엇이 왔을까?", "bus", "car", "house"],
  ["꽃이 활짝 피었어요. 무엇이 피었을까?", "flower", "tree", "star"],
  ["사과를 한 입 먹었어요. 무엇을 먹었을까?", "apple", "pear", "bread"],
  ["우유를 컵에 따랐어요. 무엇을 따랐을까?", "milk", "bread", "cake"],
].map(([prompt, id, a, b], i) => picture(prompt, id, a, b, i));

const mathCounts = Array.from({ length: 10 }, (_, i) => {
  const count = i + 11;
  return text(`점이 몇 개일까?`, count, count - 1, count === 20 ? 18 : count + 1, i, { count });
});
const missingPairs = [[2, 3], [1, 4], [3, 3], [4, 2], [5, 2], [2, 6], [4, 4], [3, 6], [5, 4], [7, 3]];
const mathMissing = missingPairs.map(([a, b], i) => text("빈칸에 들어갈 수는?", b, b - 1, b + 1, i, { equation: `${a} + □ = ${a + b}` }));
const addPairs = [[3, 1], [2, 3], [4, 1], [3, 3], [2, 5], [4, 3], [5, 2], [1, 7], [3, 5], [6, 3]];
const mathAdds = addPairs.map(([left, right], i) => text("더하면 몇 개일까?", left + right, left + right - 1, left + right + 1, i, {
  equation: `${left} + ${right} = ?`, left, right, operator: "+",
}));
const subtractPairs = [[5, 1], [6, 2], [7, 1], [8, 3], [9, 2], [10, 4], [7, 4], [9, 5], [10, 2], [8, 5]];
const mathSubtracts = subtractPairs.map(([left, right], i) => text("남는 것은 몇 개일까?", left - right, left - right + 1, left - right + 2, i, {
  equation: `${left} − ${right} = ?`, left, right, operator: "-",
}));
const compareSets = [
  ["큰", [8, 6, 7]], ["작은", [4, 6, 5]], ["큰", [10, 8, 9]],
  ["작은", [7, 9, 8]], ["큰", [12, 10, 11]], ["작은", [9, 11, 10]],
  ["큰", [15, 13, 14]], ["작은", [12, 14, 13]], ["큰", [18, 16, 17]],
  ["작은", [17, 19, 18]],
];
const mathCompare = compareSets.map(([kind, numbers], i) => {
  const answer = kind === "큰" ? Math.max(...numbers) : Math.min(...numbers);
  return text(`가장 ${kind} 수는?`, answer, ...numbers.filter(n => n !== answer), i);
});
const mathSequence = [
  ["5 다음 수는?", 6, "5 → ?"], ["9 바로 앞 수는?", 8, "? → 9"],
  ["6과 8 사이 수는?", 7, "6 → ? → 8"], ["11 다음 수는?", 12, "11 → ?"],
  ["14 바로 앞 수는?", 13, "? → 14"], ["15와 17 사이 수는?", 16, "15 → ? → 17"],
  ["17 다음 수는?", 18, "17 → ?"], ["20 바로 앞 수는?", 19, "? → 20"],
  ["12와 14 사이 수는?", 13, "12 → ? → 14"], ["18과 20 사이 수는?", 19, "18 → ? → 20"],
].map(([prompt, answer, equation], i) => text(prompt, answer, answer - 1, answer + 1, i, { equation }));
const mathPatterns = [
  ["○ △ ○ △ ○ ?", "△", "○", "□"], ["⭐ 🌙 ⭐ 🌙 ⭐ ?", "🌙", "⭐", "☀️"],
  ["■ ■ ● ■ ■ ?", "●", "■", "▲"], ["🍎 🍐 🍎 🍐 ?", "🍎", "🍐", "🍌"],
  ["▲ ● ▲ ● ▲ ?", "●", "▲", "■"],
].map(([equation, answer, a, b], i) => text("다음 무늬는 무엇일까?", answer, a, b, i, { equation }));
const mathStories = [
  ["사과 3개에 2개를 더 받았어. 모두 몇 개?", 3, 2, "+"],
  ["쿠키 7개 중 2개를 먹었어. 몇 개 남았을까?", 7, 2, "-"],
  ["꽃 4송이에 3송이를 더 꽂았어. 모두 몇 송이?", 4, 3, "+"],
  ["풍선 9개 중 4개가 날아갔어. 몇 개 남았을까?", 9, 4, "-"],
  ["연필 5자루에 4자루를 더 받았어. 모두 몇 자루?", 5, 4, "+"],
].map(([prompt, left, right, operator], i) => {
  const answer = operator === "+" ? left + right : left - right;
  return text(prompt, answer, answer - 1, answer + 1, i, {
    equation: `${left} ${operator === "+" ? "+" : "−"} ${right} = ?`, left, right, operator,
  });
});

const englishWords = things.slice(0, 20).map(([id, ko, en], i) => text(`${ko}는 영어로?`, en,
  things[(i + 5) % 20][2], things[(i + 11) % 20][2], i, { object: id }));
const reverseIds = ["ball", "car", "book", "fish", "bird", "tree", "star", "cake", "bear", "house"];
const englishReverse = reverseIds.map((id, i) => picture(`${thing[id].en}은 어느 그림?`, id,
  reverseIds[(i + 3) % 10], reverseIds[(i + 6) % 10], i,
  { speechText: `Find the ${thing[id].en.toLowerCase()}.`, speechLang: "en-US" }));
const alphabet = [
  ["moon", "M", "N", "W"], ["bus", "B", "P", "D"], ["pencil", "P", "B", "F"],
  ["bread", "B", "D", "R"], ["pear", "P", "B", "R"], ["melon", "M", "N", "W"],
  ["turtle", "T", "D", "F"], ["bee", "B", "D", "P"], ["clock", "C", "G", "O"],
  ["shoe", "S", "C", "Z"],
].map(([id, answer, a, b], i) => text(`${thing[id].en}의 첫 알파벳은?`, answer, a, b, i, { object: id }));
const numberWords = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN"];
const englishNumbers = numberWords.map((answer, i) => text(`숫자 ${i + 1}, 영어로 뭐라고 할까?`, answer,
  numberWords[(i + 1) % 10], numberWords[(i + 3) % 10], i, { equation: String(i + 1) }));
const englishActions = ["run", "jump", "sleep", "eat", "read"].map((id, i, ids) => text(`그림의 동작은 영어로?`, thing[id].en,
  thing[ids[(i + 1) % 5]].en, thing[ids[(i + 2) % 5]].en, i, { object: id }));
const englishWeather = ["rainy", "snowy", "sunny", "cloudy", "windy"].map((id, i, ids) => text(`그림의 날씨는 영어로?`, thing[id].en,
  thing[ids[(i + 1) % 5]].en, thing[ids[(i + 2) % 5]].en, i, { object: id }));
const englishSentences = [
  ["I see a ball.", "ball", "book", "bird"], ["I see a tree.", "tree", "star", "house"],
  ["I see a fish.", "fish", "bird", "bear"], ["I see a bus.", "bus", "car", "shoe"],
  ["I see a cake.", "cake", "bread", "pear"],
].map(([speechText, id, a, b], i) => picture(`${speechText} 어느 그림?`, id, a, b, i, { speechText, speechLang: "en-US" }));
const englishExpressions = [
  ["‘제발’은 영어로?", "PLEASE", "SORRY", "HELLO"],
  ["‘미안해’는 영어로?", "SORRY", "PLEASE", "THANK YOU"],
  ["‘네’는 영어로?", "YES", "NO", "BYE"],
  ["‘아니요’는 영어로?", "NO", "YES", "HELLO"],
  ["‘잘했어!’는 영어로?", "GOOD JOB", "GOOD NIGHT", "GOOD MORNING"],
].map(([prompt, answer, a, b], i) => text(prompt, answer, a, b, i));

export const EXTRA_QUESTIONS = {
  hangul: [...hangulFirst, ...hangulWords, ...hangulBlanks, ...hangulEdges, ...hangulLengths, ...hangulConsonants, ...hangulStories],
  math: [...mathCounts, ...mathMissing, ...mathAdds, ...mathSubtracts, ...mathCompare, ...mathSequence, ...mathPatterns, ...mathStories],
  english: [...englishWords, ...englishReverse, ...alphabet, ...englishNumbers, ...englishActions, ...englishWeather, ...englishSentences, ...englishExpressions],
};
