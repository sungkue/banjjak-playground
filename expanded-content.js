// Five short questions make one level. Keep the original 300 questions and their saved IDs intact.
const newThings = [
  ["strawberry", "딸기", "STRAWBERRY", "🍓"], ["grape", "포도", "GRAPE", "🍇"],
  ["orange", "오렌지", "ORANGE", "🍊"], ["watermelon", "수박", "WATERMELON", "🍉"],
  ["carrot", "당근", "CARROT", "🥕"], ["tomato", "토마토", "TOMATO", "🍅"],
  ["potato", "감자", "POTATO", "🥔"], ["corn", "옥수수", "CORN", "🌽"],
  ["frog", "개구리", "FROG", "🐸"], ["lion", "사자", "LION", "🦁"],
  ["elephant", "코끼리", "ELEPHANT", "🐘"], ["monkey", "원숭이", "MONKEY", "🐵"],
  ["zebra", "얼룩말", "ZEBRA", "🦓"], ["cow", "소", "COW", "🐮"],
  ["sheep", "양", "SHEEP", "🐑"], ["horse", "말", "HORSE", "🐴"],
  ["penguin", "펭귄", "PENGUIN", "🐧"], ["whale", "고래", "WHALE", "🐳"],
  ["crab", "게", "CRAB", "🦀"], ["chicken", "닭", "CHICKEN", "🐔"],
  ["airplane", "비행기", "AIRPLANE", "✈️"], ["train", "기차", "TRAIN", "🚂"],
  ["boat", "배", "BOAT", "⛵"], ["bicycle", "자전거", "BICYCLE", "🚲"],
  ["drum", "북", "DRUM", "🥁"], ["guitar", "기타", "GUITAR", "🎸"],
  ["kite", "연", "KITE", "🪁"], ["balloon", "풍선", "BALLOON", "🎈"],
  ["chair", "의자", "CHAIR", "🪑"], ["bed", "침대", "BED", "🛏️"],
  ["spoon", "숟가락", "SPOON", "🥄"], ["cup", "컵", "CUP", "🥤"],
  ["plate", "접시", "PLATE", "🍽️"], ["toothbrush", "칫솔", "TOOTHBRUSH", "🪥"],
  ["soap", "비누", "SOAP", "🧼"], ["gift", "선물", "GIFT", "🎁"],
  ["umbrella", "우산", "UMBRELLA", "☂️"], ["key", "열쇠", "KEY", "🔑"],
  ["door", "문", "DOOR", "🚪"], ["window", "창문", "WINDOW", "🪟"],
  ["rocket", "로켓", "ROCKET", "🚀"], ["crown", "왕관", "CROWN", "👑"],
  ["rainbow", "무지개", "RAINBOW", "🌈"], ["heart", "하트", "HEART", "❤️"],
  ["snowman", "눈사람", "SNOWMAN", "⛄"], ["candle", "초", "CANDLE", "🕯️"],
  ["sandwich", "샌드위치", "SANDWICH", "🥪"], ["pizza", "피자", "PIZZA", "🍕"],
  ["cookie", "쿠키", "COOKIE", "🍪"], ["icecream", "아이스크림", "ICE CREAM", "🍦"],
];
export const MORE_OBJECTS = Object.fromEntries(newThings.map(([id, ko]) => [id, ko]));
export const MORE_EMOJI_ART = Object.fromEntries(newThings.map(([id, , , emoji]) => [id, emoji]));
const wordById = Object.fromEntries(newThings.map(([id, ko, en]) => [id, { ko, en }]));

const content = Object.fromEntries(["six", "seven"].map(age => [age, {
  levels: { hangul: [], math: [], english: [] }, questions: { hangul: [], math: [], english: [] },
}]));
const options = (answer, a, b, i) => [
  [answer, a, b], [a, answer, b], [a, b, answer],
][i % 3];
function q(prompt, answer, a, b, i, extra = {}) {
  return { prompt, options: options(answer, a, b, i), answer, ...extra };
}
function picture(prompt, answer, a, b, i, extra = {}) {
  return q(prompt, answer, a, b, i, { choiceKind: "picture", ...extra });
}
function add(age, subject, title, items, make) {
  if (items.length % 5) throw Error(`${age}/${subject}/${title}: levels need five questions`);
  const bucket = content[age];
  items.forEach((item, i) => {
    if (i % 5 === 0) bucket.levels[subject].push(`${title} ${i / 5 + 1}`);
    bucket.questions[subject].push(make(item, i));
  });
}

// Familiar-level extension: 200 new questions (70 Korean, 65 math, 65 English).
const sixBlanks = [
  ["딸□", "기", "지", "니", "strawberry"], ["포□", "도", "토", "고", "grape"],
  ["수□", "박", "밖", "밥", "watermelon"], ["당□", "근", "금", "큰", "carrot"],
  ["토마□", "토", "도", "고", "tomato"], ["개□리", "구", "고", "기", "frog"],
  ["코□리", "끼", "키", "기", "elephant"], ["원숭□", "이", "리", "기", "monkey"],
  ["펭□", "귄", "긴", "권", "penguin"], ["고□", "래", "레", "리", "whale"],
  ["비행□", "기", "지", "리", "airplane"], ["기□", "차", "자", "타", "train"],
  ["자전□", "거", "고", "구", "bicycle"], ["풍□", "선", "손", "순", "balloon"],
  ["의□", "자", "차", "사", "chair"], ["침□", "대", "태", "데", "bed"],
  ["숟가□", "락", "낙", "각", "spoon"], ["접□", "시", "치", "지", "plate"],
  ["칫□", "솔", "손", "술", "toothbrush"], ["무지□", "개", "게", "가", "rainbow"],
];
add("six", "hangul", "낱말 완성", sixBlanks, ([blank, answer, a, b, object], i) =>
  q(`${blank}에 들어갈 글자는?`, answer, a, b, i, { object }));
const sixCategories = [
  ["딸기와 포도는?", "과일", "동물", "탈것"], ["사자와 코끼리는?", "동물", "과일", "가구"],
  ["기차와 비행기는?", "탈것", "음식", "옷"], ["의자와 침대는?", "가구", "과일", "동물"],
  ["숟가락과 접시는?", "식기", "탈것", "동물"], ["감자와 당근은?", "채소", "가구", "악기"],
  ["기타와 북은?", "악기", "과일", "탈것"], ["소와 양은?", "동물", "채소", "가구"],
  ["수박과 오렌지는?", "과일", "악기", "탈것"], ["자전거와 배는?", "탈것", "식기", "채소"],
];
add("six", "hangul", "같은 친구", sixCategories, ([prompt, answer, a, b], i) => q(prompt, answer, a, b, i));
const sixSentences = [
  ["토끼가 당근을 먹어요. 무엇을 먹을까?", "당근", "포도", "빵"],
  ["민지가 빨간 풍선을 들어요. 무엇을 들까?", "풍선", "우산", "책"],
  ["할머니가 모자를 썼어요. 무엇을 썼을까?", "모자", "신발", "장갑"],
  ["곰이 꿀을 먹어요. 누가 먹을까?", "곰", "토끼", "새"],
  ["새가 나무에 앉았어요. 어디에 앉았을까?", "나무", "바다", "집"],
  ["아빠가 문을 열어요. 무엇을 열까?", "문", "창문", "가방"],
  ["고래가 바다에서 헤엄쳐요. 어디에서 헤엄칠까?", "바다", "숲", "하늘"],
  ["누나가 책을 읽어요. 무엇을 읽을까?", "책", "지도", "편지"],
  ["아기가 침대에서 자요. 어디에서 잘까?", "침대", "의자", "버스"],
  ["기차가 역에 도착했어요. 무엇이 도착했을까?", "기차", "자동차", "자전거"],
  ["소라가 노란 우산을 폈어요. 무슨 색 우산일까?", "노란색", "빨간색", "파란색"],
  ["강아지가 공을 굴려요. 무엇을 굴릴까?", "공", "책", "컵"],
  ["엄마가 컵에 우유를 따랐어요. 무엇을 따랐을까?", "우유", "물", "주스"],
  ["친구가 꽃을 선물했어요. 무엇을 선물했을까?", "꽃", "책", "연필"],
  ["동생이 빨간 사과를 먹었어요. 무슨 색 사과일까?", "빨간색", "초록색", "노란색"],
  ["개구리가 연못으로 뛰었어요. 어디로 뛰었을까?", "연못", "교실", "산"],
  ["지수가 파란 신발을 신었어요. 무엇을 신었을까?", "신발", "모자", "양말"],
  ["요리사가 접시에 빵을 놓았어요. 무엇을 놓았을까?", "빵", "사과", "당근"],
  ["오리가 세 마리 걸어가요. 몇 마리일까?", "세 마리", "두 마리", "네 마리"],
  ["바람이 불어서 연이 날아요. 무엇이 날까?", "연", "배", "공"],
];
add("six", "hangul", "한 문장 읽기", sixSentences, ([prompt, answer, a, b], i) => q(prompt, answer, a, b, i));
const sixLengths = ["딸기", "포도", "코끼리", "원숭이", "비행기", "자전거", "숟가락", "무지개", "옥수수", "선물"];
add("six", "hangul", "글자 수 세기", sixLengths, (word, i) => {
  const answer = [...word].length;
  return q(`${word}는 몇 글자일까?`, answer, answer - 1, answer + 1, i);
});
const sixEdges = [
  ["딸기", "첫", "딸", "달", "기"], ["포도", "끝", "도", "포", "토"],
  ["개구리", "첫", "개", "게", "리"], ["코끼리", "끝", "리", "끼", "코"],
  ["비행기", "끝", "기", "비", "행"], ["자전거", "첫", "자", "차", "거"],
  ["풍선", "끝", "선", "손", "풍"], ["의자", "첫", "의", "이", "자"],
  ["접시", "끝", "시", "치", "접"], ["무지개", "첫", "무", "누", "개"],
];
add("six", "hangul", "처음과 끝", sixEdges, ([word, edge, answer, a, b], i) =>
  q(`${word}의 ${edge} 글자는?`, answer, a, b, i));

const sixOrder = Array.from({ length: 15 }, (_, i) => {
  const n = i + 4;
  const previous = i % 3 === 1;
  const between = i % 3 === 2;
  const answer = previous ? n - 1 : between ? n + 1 : n + 1;
  const prompt = previous ? `${n}에서 하나를 빼면?` : between ? `${n}보다 크고 ${n + 2}보다 작은 수는?` : `${n} 다음에 오는 수는?`;
  return { prompt, answer, equation: previous ? `? → ${n}` : between ? `${n} → ? → ${n + 2}` : `${n} → ?` };
});
add("six", "math", "수의 길", sixOrder, ({ prompt, answer, equation }, i) =>
  q(prompt, answer, answer - 1, answer + 1, i, { equation }));
const sixCompare = Array.from({ length: 10 }, (_, i) => {
  const numbers = [i + 8, i + 10, i + 9];
  const big = i % 2 === 0;
  return { numbers, big, answer: big ? Math.max(...numbers) : Math.min(...numbers) };
});
add("six", "math", "큰 수 작은 수", sixCompare, ({ numbers, big, answer }, i) =>
  q(`가장 ${big ? "큰" : "작은"} 수는?`, answer, ...numbers.filter(n => n !== answer), i, { equation: numbers.join(" · ") }));
const sixSums = [
  [4, 4, "+"], [5, 3, "+"], [6, 2, "+"], [7, 1, "+"], [5, 5, "+"],
  [6, 4, "+"], [7, 2, "+"], [8, 2, "+"], [9, 1, "+"], [4, 6, "+"],
  [9, 3, "-"], [10, 5, "-"], [8, 4, "-"], [7, 5, "-"], [10, 3, "-"],
  [9, 6, "-"], [8, 6, "-"], [10, 8, "-"], [7, 6, "-"], [6, 5, "-"],
];
add("six", "math", "더하고 빼기", sixSums, ([left, right, operator], i) => {
  const answer = operator === "+" ? left + right : left - right;
  return q(`${left} ${operator === "+" ? "더하기" : "빼기"} ${right}는 얼마일까?`,
    answer, answer - 1, answer + 1, i, { equation: `${left} ${operator === "+" ? "+" : "−"} ${right} = ?`, left, right, operator });
});
const sixMissing = [[3, 4], [2, 5], [6, 2], [4, 5], [1, 8], [5, 3], [7, 2], [4, 6], [3, 6], [5, 5]];
add("six", "math", "빈칸 수 찾기", sixMissing, ([a, b], i) =>
  q(`${a}에 얼마를 더하면 ${a + b}일까?`, b, b - 1, b + 1, i, { equation: `${a} + □ = ${a + b}` }));
const sixPatterns = [
  ["○ ● ○ ● ○ ?", "●", "○", "▲"], ["▲ ▲ ■ ▲ ▲ ?", "■", "▲", "●"],
  ["🍎 🍌 🍎 🍌 ?", "🍎", "🍌", "🍐"], ["★ ☆ ★ ☆ ★ ?", "☆", "★", "○"],
  ["■ ● ● ■ ● ● ?", "■", "●", "▲"], ["△ ○ △ ○ ?", "△", "○", "□"],
  ["1 → 3 → 5 → ?", 7, 6, 8], ["2 → 4 → 6 → ?", 8, 7, 9],
  ["10 → 9 → 8 → ?", 7, 6, 9], ["5 → 6 → 7 → ?", 8, 7, 9],
];
add("six", "math", "무늬와 수", sixPatterns, ([equation, answer, a, b], i) =>
  q("다음에는 무엇이 올까?", answer, a, b, i, { equation }));

const sixVocab = newThings.slice(0, 25);
add("six", "english", "새 그림 낱말", sixVocab, ([id, ko, en], i) => {
  const a = sixVocab[(i + 7) % sixVocab.length][2];
  const b = sixVocab[(i + 14) % sixVocab.length][2];
  return q(`그림 속 ${ko}는 영어로?`, en, a, b, i, { object: id });
});
const sixLetters = newThings.slice(25, 40);
add("six", "english", "첫 알파벳", sixLetters, ([id, , en], i) => {
  const first = en[0];
  const wrong = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].filter(c => c !== first);
  return q(`그림 단어 ${en}의 첫 알파벳은?`, first, wrong[(i * 3) % wrong.length], wrong[(i * 3 + 7) % wrong.length], i, { object: id });
});
const sixNumbers = ["ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN"];
add("six", "english", "숫자와 말", sixNumbers, (answer, i) =>
  q(`숫자 ${i + 11}은 영어로?`, answer, sixNumbers[(i + 1) % 5], sixNumbers[(i + 2) % 5], i,
    { equation: String(i + 11), speechText: `숫자 ${["십일", "십이", "십삼", "십사", "십오"][i]}은 영어로 어떻게 말할까?` }));
const sixPhrases = [
  ["‘잘 가’는 영어로?", "BYE", "HELLO", "PLEASE"], ["‘고마워’는 영어로?", "THANK YOU", "SORRY", "YES"],
  ["‘미안해’는 영어로?", "SORRY", "PLEASE", "BYE"], ["‘앉아’는 영어로?", "SIT DOWN", "STAND UP", "JUMP"],
  ["‘일어나’는 영어로?", "STAND UP", "SIT DOWN", "SLEEP"], ["‘안녕’은 영어로?", "HELLO", "BYE", "SORRY"],
  ["‘제발’은 영어로?", "PLEASE", "THANK YOU", "NO"], ["‘잘 자’는 영어로?", "GOOD NIGHT", "GOOD MORNING", "HELLO"],
  ["‘좋은 아침’은 영어로?", "GOOD MORNING", "GOOD NIGHT", "BYE"], ["‘잘했어’는 영어로?", "GOOD JOB", "GOOD NIGHT", "THANK YOU"],
  ["‘맞아요’는 영어로?", "YES", "NO", "BYE"], ["‘아니’는 영어로?", "NO", "YES", "HELLO"],
  ["‘뛰어’는 영어로?", "RUN", "SLEEP", "READ"], ["‘점프해’는 영어로?", "JUMP", "EAT", "SLEEP"],
  ["‘읽어’는 영어로?", "READ", "RUN", "JUMP"],
];
add("six", "english", "생활 영어", sixPhrases, ([prompt, answer, a, b], i) => q(prompt, answer, a, b, i));
const sixFind = ["frog", "lion", "train", "balloon", "strawberry"];
add("six", "english", "영어 듣고 그림", sixFind, (id, i) => picture(
  `Find the ${wordById[id].en.toLowerCase()}. 어느 그림?`, id,
  sixFind[(i + 1) % 5], sixFind[(i + 2) % 5], i,
  { speechText: `Find the ${wordById[id].en.toLowerCase()}.`, speechLang: "en-US" }));

// Next step: short reading, numbers to 100, and playful spoken English (170/165/165).
const sevenBlanks = [
  ["장□감", "난", "남", "단"], ["학□", "교", "규", "고"],
  ["연□깎이", "필", "플", "피"], ["도서□", "관", "간", "광"],
  ["친□", "구", "고", "기"], ["운동□", "장", "창", "잠"],
  ["선□님", "생", "샘", "성"], ["무지□", "개", "게", "기"],
  ["나□", "비", "피", "지"], ["그□책", "림", "린", "람"],
  ["바□", "다", "타", "라"], ["숲□", "속", "솟", "석"],
  ["햇□", "빛", "빗", "빚"], ["별□", "빛", "빗", "빛나"],
  ["달□", "빛", "빗", "빚"], ["새□", "싹", "삭", "쌍"],
  ["물□", "결", "걸", "겔"], ["꽃□", "잎", "입", "잇"],
  ["빗□", "방울", "방울이", "방울들"], ["눈□", "사람", "사자", "사과"],
  ["아침□", "밥", "밤", "방"], ["점심□", "밥", "밤", "방"],
  ["저녁□", "밥", "밤", "방"], ["주□", "말", "마", "물"],
  ["월□일", "요", "유", "여"], ["화□일", "요", "유", "여"],
  ["생□", "일", "이", "인"], ["기□일", "념", "녕", "면"],
  ["놀□터", "이", "리", "기"], ["놀□방", "이", "리", "기"],
];
add("seven", "hangul", "낱말 읽기", sevenBlanks, ([blank, answer, a, b], i) =>
  q(`${blank}의 빈칸에 들어갈 말은?`, answer, a, b, i,
    { speechText: `${blank.replace("□", " 빈칸 ")}. 빈칸에 들어갈 말을 골라 보자.` }));
const finalSounds = [
  ["달", "ㄹ", "ㄴ", "ㅁ"], ["밤", "ㅁ", "ㄹ", "ㄴ"], ["공", "ㅇ", "ㄴ", "ㅁ"],
  ["책", "ㄱ", "ㅁ", "ㄴ"], ["꽃", "ㅊ", "ㅈ", "ㅅ"], ["산", "ㄴ", "ㄹ", "ㅇ"],
  ["강", "ㅇ", "ㅁ", "ㄴ"], ["밥", "ㅂ", "ㅍ", "ㄱ"], ["눈", "ㄴ", "ㅁ", "ㅇ"],
  ["물", "ㄹ", "ㄴ", "ㅁ"], ["집", "ㅂ", "ㅁ", "ㄹ"], ["숲", "ㅍ", "ㅂ", "ㄹ"],
  ["손", "ㄴ", "ㅇ", "ㅁ"], ["별", "ㄹ", "ㄴ", "ㅁ"], ["길", "ㄹ", "ㄴ", "ㅇ"],
  ["입", "ㅂ", "ㅁ", "ㄴ"], ["곰", "ㅁ", "ㄴ", "ㅇ"], ["방", "ㅇ", "ㄴ", "ㅁ"],
  ["문", "ㄴ", "ㅁ", "ㅇ"], ["발", "ㄹ", "ㄴ", "ㅁ"],
];
add("seven", "hangul", "받침 찾기", finalSounds, ([word, answer, a, b], i) =>
  q(`‘${word}’의 받침은?`, answer, a, b, i));
const sevenMeanings = [
  ["‘크다’와 반대말은?", "작다", "길다", "높다"], ["‘높다’와 반대말은?", "낮다", "얇다", "짧다"],
  ["‘길다’와 반대말은?", "짧다", "낮다", "크다"], ["‘밝다’와 반대말은?", "어둡다", "맑다", "넓다"],
  ["‘빠르다’와 반대말은?", "느리다", "가볍다", "멀다"], ["‘무겁다’와 반대말은?", "가볍다", "조용하다", "차갑다"],
  ["‘따뜻하다’와 반대말은?", "차갑다", "좁다", "깊다"], ["‘깨끗하다’와 반대말은?", "더럽다", "높다", "넓다"],
  ["‘조용하다’와 반대말은?", "시끄럽다", "작다", "느리다"], ["‘열다’와 반대말은?", "닫다", "읽다", "잡다"],
  ["‘올라가다’와 반대말은?", "내려가다", "돌아가다", "달려가다"], ["‘시작’과 반대말은?", "끝", "앞", "옆"],
  ["‘안’과 반대말은?", "밖", "위", "앞"], ["‘위’와 반대말은?", "아래", "옆", "뒤"],
  ["‘앞’과 반대말은?", "뒤", "옆", "아래"],
  ["사과와 배를 묶으면?", "과일", "동물", "가구"], ["연필과 지우개를 묶으면?", "학용품", "채소", "탈것"],
  ["버스와 기차를 묶으면?", "탈것", "악기", "옷"], ["비누와 칫솔을 묶으면?", "씻을 때 쓰는 것", "먹는 것", "타는 것"],
  ["해와 달을 묶으면?", "하늘에서 보는 것", "먹는 것", "신는 것"],
  ["장미와 튤립을 묶으면?", "꽃", "과일", "동물"], ["개와 고양이를 묶으면?", "동물", "가구", "탈것"],
  ["빨강과 파랑을 묶으면?", "색", "모양", "숫자"], ["동그라미와 세모를 묶으면?", "모양", "맛", "색"],
  ["월요일과 화요일을 묶으면?", "요일", "계절", "음식"], ["봄과 여름을 묶으면?", "계절", "요일", "색"],
  ["엄마와 아빠를 묶으면?", "가족", "친구", "동물"], ["책과 신문을 묶으면?", "읽는 것", "타는 것", "먹는 것"],
  ["컵과 그릇을 묶으면?", "식기", "옷", "가구"], ["기타와 피아노를 묶으면?", "악기", "과일", "탈것"],
];
add("seven", "hangul", "말뜻 찾기", sevenMeanings, ([prompt, answer, a, b], i) =>
  q(prompt, answer, a, b, i));
const sentenceBlanks = [
  ["비가 와요. □을 펴요.", "우산", "모자", "책"], ["해가 뜨면 □이 밝아져요.", "하늘", "바다", "숲"],
  ["추운 겨울에는 □을 입어요.", "외투", "수영복", "반팔"], ["양치할 때 □을 써요.", "칫솔", "숟가락", "빗"],
  ["책을 읽을 때 □를 넘겨요.", "책장", "문", "돌"], ["길을 건널 때 □을 봐요.", "신호등", "냉장고", "달"],
  ["꽃에 물을 주면 꽃이 □요.", "자라", "잠자", "달려"], ["배가 고프면 □을 먹어요.", "밥", "비누", "연필"],
  ["손을 씻을 때 □를 써요.", "비누", "풀", "색연필"], ["어두운 밤에는 □이 보여요.", "별", "무지개", "해"],
  ["기차를 타려면 □으로 가요.", "역", "병원", "도서관"], ["수영하려면 □로 가요.", "수영장", "운동장", "도서관"],
  ["아플 때는 □에 가요.", "병원", "놀이터", "빵집"], ["빵을 사려면 □에 가요.", "빵집", "약국", "우체국"],
  ["책을 빌리려면 □에 가요.", "도서관", "운동장", "꽃집"], ["공을 차려면 □로 가요.", "운동장", "도서관", "목욕탕"],
  ["꽃을 사려면 □에 가요.", "꽃집", "서점", "약국"], ["편지를 보내려면 □에 가요.", "우체국", "수영장", "빵집"],
  ["연필로 종이에 □을 써요.", "글씨", "노래", "물"], ["가위로 종이를 □요.", "잘라", "마셔", "불어"],
  ["빗으로 머리를 □요.", "빗어", "씻어", "읽어"], ["컵으로 물을 □요.", "마셔", "신어", "읽어"],
  ["신발을 발에 □요.", "신어", "써", "먹어"], ["모자를 머리에 □요.", "써", "신어", "마셔"],
  ["문을 열고 방으로 □요.", "들어가", "날아가", "헤엄쳐"], ["나비가 꽃 위로 □요.", "날아가", "헤엄쳐", "굴러가"],
  ["물고기는 물속에서 □요.", "헤엄쳐", "날아", "뛰어"], ["새는 하늘을 □요.", "날아", "헤엄쳐", "기어"],
  ["비가 그치면 우산을 □요.", "접어", "먹어", "신어"], ["잠잘 때 눈을 □요.", "감아", "읽어", "마셔"],
];
add("seven", "hangul", "문장 빈칸", sentenceBlanks, ([equation, answer, a, b], i) =>
  q(`${equation} 빈칸에 알맞은 말을 골라 보자.`, answer, a, b, i,
    { speechText: `${equation.replace("□", "빈칸")} 빈칸에 알맞은 말을 골라 보자.` }));

const miniStories = [
  ["민지는 공원에서 노란 꽃을 봤어요. 집에서 꽃 그림을 그렸어요.", ["누가 꽃을 봤을까?", "민지", "영수", "소라"], ["꽃은 무슨 색일까?", "노란색", "빨간색", "파란색"], ["집에서 무엇을 했을까?", "그림을 그렸어", "노래를 불렀어", "잠을 잤어"]],
  ["준호는 아침에 사과를 먹었어요. 그리고 학교에 걸어갔어요.", ["아침에 무엇을 먹었을까?", "사과", "빵", "바나나"], ["어디로 갔을까?", "학교", "병원", "공원"], ["어떻게 갔을까?", "걸어서", "버스로", "자전거로"]],
  ["수아는 도서관에서 동물 책을 빌렸어요. 집에서 엄마와 읽었어요.", ["어디에서 책을 빌렸을까?", "도서관", "꽃집", "운동장"], ["무슨 책일까?", "동물 책", "요리 책", "자동차 책"], ["누구와 읽었을까?", "엄마", "친구", "선생님"]],
  ["지호는 비 오는 날 파란 우산을 썼어요. 물웅덩이를 피해 걸었어요.", ["날씨는 어땠을까?", "비가 왔어", "눈이 왔어", "해가 났어"], ["우산은 무슨 색일까?", "파란색", "노란색", "초록색"], ["무엇을 피했을까?", "물웅덩이", "나무", "돌담"]],
  ["하린이는 딸기 세 개를 씻었어요. 두 개를 동생과 나누어 먹었어요.", ["무엇을 씻었을까?", "딸기", "포도", "사과"], ["처음에는 몇 개였을까?", "세 개", "두 개", "네 개"], ["누구와 나누었을까?", "동생", "친구", "엄마"]],
  ["현우는 토요일에 아빠와 기차를 탔어요. 바닷가에서 조개를 주웠어요.", ["언제 기차를 탔을까?", "토요일", "월요일", "금요일"], ["누구와 탔을까?", "아빠", "엄마", "할머니"], ["무엇을 주웠을까?", "조개", "돌", "나뭇잎"]],
  ["다연이는 화분에 물을 줬어요. 다음 날 작은 새싹을 발견했어요.", ["무엇에 물을 줬을까?", "화분", "컵", "의자"], ["언제 새싹을 봤을까?", "다음 날", "어제", "지난주"], ["무엇을 발견했을까?", "새싹", "조개", "열쇠"]],
  ["태오는 놀이터에서 친구와 그네를 탔어요. 집에 와서 손을 씻었어요.", ["어디에서 놀았을까?", "놀이터", "도서관", "병원"], ["무엇을 탔을까?", "그네", "기차", "자전거"], ["집에 와서 무엇을 했을까?", "손을 씻었어", "책을 빌렸어", "꽃을 샀어"]],
  ["예나는 빨간 리본을 머리에 달았어요. 거울을 보고 활짝 웃었어요.", ["리본은 무슨 색일까?", "빨간색", "파란색", "노란색"], ["리본을 어디에 달았을까?", "머리", "가방", "신발"], ["무엇을 보고 웃었을까?", "거울", "창문", "책"],
  ],
  ["서준이는 눈사람에게 당근 코를 달았어요. 빨간 목도리도 둘렀어요.", ["무엇을 만들었을까?", "눈사람", "모래성", "집"], ["코는 무엇으로 만들었을까?", "당근", "감자", "사과"], ["목도리는 무슨 색일까?", "빨간색", "파란색", "노란색"]],
  ["채원이는 작은 강아지에게 물을 줬어요. 강아지가 꼬리를 흔들었어요.", ["누구에게 물을 줬을까?", "강아지", "고양이", "토끼"], ["무엇을 줬을까?", "물", "우유", "주스"], ["강아지는 무엇을 흔들었을까?", "꼬리", "귀", "발"]],
  ["유진이는 아침에 빵을 구웠어요. 오빠와 따뜻한 빵을 먹었어요.", ["언제 빵을 구웠을까?", "아침", "점심", "저녁"], ["무엇을 구웠을까?", "빵", "쿠키", "피자"], ["누구와 먹었을까?", "오빠", "동생", "친구"]],
  ["지민이는 초록색 종이로 배를 접었어요. 물에 띄워 보았어요.", ["종이는 무슨 색일까?", "초록색", "분홍색", "파란색"], ["무엇을 접었을까?", "배", "비행기", "모자"], ["어디에 띄웠을까?", "물", "하늘", "모래"],
  ],
  ["도윤이는 할머니에게 편지를 썼어요. 우체통에 편지를 넣었어요.", ["누구에게 썼을까?", "할머니", "친구", "선생님"], ["무엇을 썼을까?", "편지", "일기", "책"], ["어디에 넣었을까?", "우체통", "책장", "서랍"]],
  ["은서는 바다에서 작은 게를 봤어요. 게는 모래 속으로 숨었어요.", ["어디에서 게를 봤을까?", "바다", "숲", "학교"], ["무엇을 봤을까?", "게", "고래", "물고기"], ["게는 어디로 숨었을까?", "모래 속", "나무 위", "구름 속"]],
  ["시우는 아빠와 감자를 캤어요. 집에 돌아와 감자 수프를 먹었어요.", ["누구와 감자를 캤을까?", "아빠", "엄마", "친구"], ["무엇을 캤을까?", "감자", "고구마", "당근"], ["무슨 수프를 먹었을까?", "감자", "토마토", "옥수수"]],
  ["나은이는 동생에게 노란 풍선을 줬어요. 동생은 풍선을 꼭 안았어요.", ["누구에게 줬을까?", "동생", "엄마", "친구"], ["풍선은 무슨 색일까?", "노란색", "초록색", "빨간색"], ["동생은 풍선을 어떻게 했을까?", "꼭 안았어", "터뜨렸어", "날렸어"]],
  ["건우는 운동장에서 공을 찼어요. 공은 골대 안으로 들어갔어요.", ["어디에서 놀았을까?", "운동장", "도서관", "수영장"], ["무엇을 찼을까?", "공", "돌", "모자"], ["공은 어디로 갔을까?", "골대 안", "강 속", "나무 위"]],
  ["소윤이는 밤하늘에서 둥근 달을 봤어요. 별도 반짝이고 있었어요.", ["언제 하늘을 봤을까?", "밤", "아침", "낮"], ["달은 어떤 모양일까?", "둥근", "세모난", "네모난"], ["무엇이 반짝였을까?", "별", "꽃", "새"]],
  ["민호는 시장에서 빨간 토마토를 샀어요. 집에 와서 깨끗이 씻었어요.", ["어디에서 샀을까?", "시장", "학교", "공원"], ["무엇을 샀을까?", "토마토", "딸기", "사과"], ["집에서 무엇을 했을까?", "씻었어", "구웠어", "그렸어"]],
];
add("seven", "hangul", "짧은 이야기", miniStories.flatMap(([story, ...parts]) => parts.map(part => [story, ...part])),
  ([story, question, answer, a, b], i) => q(`${story} ${question}`, answer, a, b, i));

const addPairs7 = Array.from({ length: 30 }, (_, i) => {
  const sum = 11 + (i % 10);
  const left = 2 + (Math.floor(i / 10) * 3 + i) % Math.min(8, sum - 3);
  return [left, sum - left];
});
add("seven", "math", "20까지 더하기", addPairs7, ([left, right], i) =>
  q(`${left} 더하기 ${right}는 얼마일까?`, left + right, left + right - 1, left + right + 1, i,
    { equation: `${left} + ${right} = ?`, left, right, operator: "+" }));
const subtractPairs7 = Array.from({ length: 30 }, (_, i) => {
  const left = 11 + (i % 10);
  const right = 2 + (Math.floor(i / 10) * 3 + i) % 8;
  return [left, right];
});
add("seven", "math", "20까지 빼기", subtractPairs7, ([left, right], i) =>
  q(`${left} 빼기 ${right}는 얼마일까?`, left - right, left - right + 1, left - right + 2, i,
    { equation: `${left} − ${right} = ?`, left, right, operator: "-" }));
const missing7 = [
  [8, 4], [9, 5], [7, 6], [6, 7], [10, 4], [8, 5], [9, 6], [10, 7], [11, 3], [12, 2],
  [7, 8], [8, 7], [9, 7], [10, 8], [11, 5], [12, 4], [13, 3], [14, 2], [11, 6], [12, 5],
];
add("seven", "math", "숨은 수 찾기", missing7, ([left, answer], i) =>
  q(`${left}에 얼마를 더하면 ${left + answer}일까?`, answer, answer - 1, answer + 1, i,
    { equation: `${left} + □ = ${left + answer}` }));
const placeValue7 = Array.from({ length: 20 }, (_, i) => {
  const tens = 2 + Math.floor(i / 10) * 3 + (i % 5);
  const ones = (i * 3 + 1) % 10;
  return [tens, ones, i < 10];
});
add("seven", "math", "십과 일", placeValue7, ([tens, ones, read], i) => {
  const value = tens * 10 + ones;
  return read
    ? q(`${value}의 십의 자리 숫자는?`, tens, tens - 1, tens + 1, i, { equation: String(value) })
    : q(`십의 자리 ${tens}, 일의 자리 ${ones}이면 어떤 수?`, value, value - 10, value + 10 <= 100 ? value + 10 : value - 20, i,
      { equation: `${tens}0 + ${ones} = ?` });
});
const numberWay7 = Array.from({ length: 20 }, (_, i) => {
  const n = 21 + i * 3;
  return i < 10 ? { prompt: `${n} 다음 수는?`, answer: n + 1, equation: `${n} → ?` }
    : { prompt: `${n}보다 크고 ${n + 2}보다 작은 수는?`, answer: n + 1, equation: `${n} → ? → ${n + 2}` };
});
add("seven", "math", "100까지 수의 길", numberWay7, ({ prompt, answer, equation }, i) =>
  q(prompt, answer, answer - 1, answer + 1, i, { equation }));
const patterns7 = [
  ["2 → 4 → 6 → ?", 8, 7, 10], ["3 → 5 → 7 → ?", 9, 8, 10],
  ["5 → 10 → 15 → ?", 20, 18, 25], ["10 → 20 → 30 → ?", 40, 35, 50],
  ["1 → 3 → 5 → 7 → ?", 9, 8, 10], ["4 → 6 → 8 → ?", 10, 9, 12],
  ["12 → 14 → 16 → ?", 18, 17, 20], ["20 → 18 → 16 → ?", 14, 15, 12],
  ["25 → 30 → 35 → ?", 40, 38, 45], ["50 → 40 → 30 → ?", 20, 25, 10],
  ["▲ ● ● ▲ ● ● ?", "▲", "●", "■"], ["■ ▲ ■ ▲ ■ ?", "▲", "■", "●"],
  ["○ ○ △ ○ ○ ?", "△", "○", "□"], ["★ ☆ ☆ ★ ☆ ☆ ?", "★", "☆", "○"],
  ["🍎 🍐 🍐 🍎 🍐 🍐 ?", "🍎", "🍐", "🍌"],
];
add("seven", "math", "수와 무늬", patterns7, ([equation, answer, a, b], i) =>
  q("다음에는 무엇이 올까?", answer, a, b, i, { equation }));
const shapeTime7 = [
  ["동그라미는 모서리가 몇 개일까?", 0, 1, 2], ["세모는 모서리가 몇 개일까?", 3, 2, 4],
  ["네모는 모서리가 몇 개일까?", 4, 3, 5], ["삼각형은 변이 몇 개일까?", 3, 2, 4],
  ["사각형은 변이 몇 개일까?", 4, 3, 5], ["모서리가 없는 모양은?", "동그라미", "세모", "네모"],
  ["변이 세 개인 모양은?", "세모", "네모", "동그라미"], ["변이 네 개인 모양은?", "네모", "세모", "동그라미"],
  ["시계의 긴 바늘이 12, 짧은 바늘이 3이면?", "3시", "2시", "4시"],
  ["시계의 긴 바늘이 12, 짧은 바늘이 6이면?", "6시", "5시", "7시"],
  ["시계의 긴 바늘이 12, 짧은 바늘이 9이면?", "9시", "8시", "10시"],
  ["오전 7시에 일어났어요. 시계의 짧은 바늘은?", "7", "6", "8"],
  ["오후 2시에 놀아요. 시계의 짧은 바늘은?", "2", "1", "3"],
  ["정오 12시의 짧은 바늘은?", "12", "11", "1"],
  ["오후 5시에 집에 가요. 시계의 짧은 바늘은?", "5", "4", "6"],
];
add("seven", "math", "모양과 시계", shapeTime7, ([prompt, answer, a, b], i) => q(prompt, answer, a, b, i));
const stories7 = [
  ["사과 8개에 5개를 더 샀어. 모두 몇 개?", 8, 5, "+"], ["딸기 7개에 6개를 더 땄어. 모두 몇 개?", 7, 6, "+"],
  ["연필 9자루에 4자루를 더 받았어. 모두 몇 자루?", 9, 4, "+"], ["꽃 6송이에 7송이를 더 꽂았어. 모두 몇 송이?", 6, 7, "+"],
  ["쿠키 5개에 8개를 더 구웠어. 모두 몇 개?", 5, 8, "+"], ["공 9개에 7개를 더 모았어. 모두 몇 개?", 9, 7, "+"],
  ["책 8권에 6권을 더 받았어. 모두 몇 권?", 8, 6, "+"], ["풍선 7개에 9개를 더 샀어. 모두 몇 개?", 7, 9, "+"],
  ["사탕 15개 중 6개를 나눠 줬어. 몇 개 남았을까?", 15, 6, "-"], ["장난감 14개 중 5개를 정리했어. 밖에 몇 개?", 14, 5, "-"],
  ["나비 13마리 중 4마리가 날아갔어. 몇 마리 남았을까?", 13, 4, "-"], ["쿠키 17개 중 8개를 먹었어. 몇 개 남았을까?", 17, 8, "-"],
  ["연필 16자루 중 7자루를 줬어. 몇 자루 남았을까?", 16, 7, "-"], ["공 18개 중 9개를 상자에 넣었어. 밖에 몇 개?", 18, 9, "-"],
  ["사과 20개 중 8개를 팔았어. 몇 개 남았을까?", 20, 8, "-"],
];
add("seven", "math", "이야기 셈", stories7, ([prompt, left, right, operator], i) => {
  const answer = operator === "+" ? left + right : left - right;
  return q(prompt, answer, answer - 1, answer + 1, i,
    { equation: `${left} ${operator === "+" ? "+" : "−"} ${right} = ?`, left, right, operator });
});

const sevenVocab = newThings.slice(20, 50);
add("seven", "english", "그림 단어 읽기", sevenVocab, ([id, ko, en], i) =>
  q(`그림 속 ${ko}는 영어로?`, en,
    sevenVocab[(i + 7) % 30][2], sevenVocab[(i + 15) % 30][2], i, { object: id }));
const sevenReverse = newThings.slice(0, 30);
add("seven", "english", "듣고 그림 찾기", sevenReverse, ([id, , en], i) => picture(
  `Find the ${en.toLowerCase()}. 어느 그림일까?`, id,
  sevenReverse[(i + 8) % 30][0], sevenReverse[(i + 16) % 30][0], i,
  { speechText: `Find the ${en.toLowerCase()}.`, speechLang: "en-US" }));
const pairedLetters = [..."ABCDEFGHIJKLMNOPQRST"];
add("seven", "english", "큰 글자 작은 글자", pairedLetters, (upper, i) => {
  const answer = upper.toLowerCase();
  return q(`큰 글자 ${upper}와 짝인 작은 글자는?`, answer,
    pairedLetters[(i + 5) % 20].toLowerCase(), pairedLetters[(i + 11) % 20].toLowerCase(), i);
});
const sevenNumbers = Array.from({ length: 15 }, (_, i) => i + 1);
const numberWords7 = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN"];
add("seven", "english", "숫자 영어 듣기", sevenNumbers, (n, i) =>
  q(`${numberWords7[i]}, 어떤 숫자일까?`, n, n === 1 ? 2 : n - 1, n === 1 ? 3 : n === 15 ? 13 : n + 1, i,
    { speechText: numberWords7[i].toLowerCase(), speechLang: "en-US" }));
const sevenCommands = [
  ["‘앉아 주세요’는 영어로?", "SIT DOWN", "STAND UP", "COME HERE"],
  ["‘일어나 주세요’는 영어로?", "STAND UP", "SIT DOWN", "GO AWAY"],
  ["‘여기로 와’는 영어로?", "COME HERE", "GO AWAY", "SIT DOWN"],
  ["‘손뼉 쳐’는 영어로?", "CLAP YOUR HANDS", "WASH YOUR HANDS", "CLOSE YOUR EYES"],
  ["‘손 씻어’는 영어로?", "WASH YOUR HANDS", "CLAP YOUR HANDS", "OPEN THE DOOR"],
  ["‘문 열어’는 영어로?", "OPEN THE DOOR", "CLOSE THE DOOR", "OPEN THE BOOK"],
  ["‘문 닫아’는 영어로?", "CLOSE THE DOOR", "OPEN THE DOOR", "CLOSE YOUR EYES"],
  ["‘책 펴’는 영어로?", "OPEN THE BOOK", "CLOSE THE DOOR", "WASH YOUR HANDS"],
  ["‘눈 감아’는 영어로?", "CLOSE YOUR EYES", "OPEN YOUR EYES", "OPEN THE DOOR"],
  ["‘눈 떠’는 영어로?", "OPEN YOUR EYES", "CLOSE YOUR EYES", "OPEN THE BOOK"],
  ["‘위를 봐’는 영어로?", "LOOK UP", "LOOK DOWN", "LOOK LEFT"],
  ["‘아래를 봐’는 영어로?", "LOOK DOWN", "LOOK UP", "LOOK RIGHT"],
  ["‘천천히 걸어’는 영어로?", "WALK SLOWLY", "RUN FAST", "JUMP HIGH"],
  ["‘빨리 달려’는 영어로?", "RUN FAST", "WALK SLOWLY", "SIT DOWN"],
  ["‘높이 뛰어’는 영어로?", "JUMP HIGH", "WALK SLOWLY", "LOOK DOWN"],
  ["‘내 말을 들어’는 영어로?", "LISTEN TO ME", "LOOK AT ME", "COME HERE"],
  ["‘나를 봐’는 영어로?", "LOOK AT ME", "LISTEN TO ME", "GO AWAY"],
  ["‘줄 서’는 영어로?", "LINE UP", "SIT DOWN", "COME HERE"],
  ["‘기다려’는 영어로?", "WAIT", "RUN", "JUMP"],
  ["‘함께 놀자’는 영어로?", "LET'S PLAY", "GOOD NIGHT", "THANK YOU"],
];
add("seven", "english", "영어로 움직이기", sevenCommands, ([prompt, answer, a, b], i) =>
  q(prompt, answer, a, b, i));
const sevenPhrases = [
  ["‘내 이름은 민지야’는 영어로?", "MY NAME IS MINJI", "I AM HUNGRY", "GOOD NIGHT"],
  ["‘나는 행복해’는 영어로?", "I AM HAPPY", "I AM SAD", "I AM SLEEPY"],
  ["‘나는 배고파’는 영어로?", "I AM HUNGRY", "I AM HAPPY", "I AM COLD"],
  ["‘나는 졸려’는 영어로?", "I AM SLEEPY", "I AM HUNGRY", "I AM HAPPY"],
  ["‘나는 추워’는 영어로?", "I AM COLD", "I AM HOT", "I AM HAPPY"],
  ["‘나는 더워’는 영어로?", "I AM HOT", "I AM COLD", "I AM SAD"],
  ["‘만나서 반가워’는 영어로?", "NICE TO MEET YOU", "GOOD NIGHT", "I AM HUNGRY"],
  ["‘또 봐’는 영어로?", "SEE YOU LATER", "GOOD MORNING", "I AM COLD"],
  ["‘좋은 하루 보내’는 영어로?", "HAVE A NICE DAY", "GOOD NIGHT", "SIT DOWN"],
  ["‘도와줘’는 영어로?", "HELP ME", "THANK YOU", "I AM HAPPY"],
  ["‘물 주세요’는 영어로?", "WATER PLEASE", "MILK PLEASE", "GOOD JOB"],
  ["‘우유 주세요’는 영어로?", "MILK PLEASE", "WATER PLEASE", "GOOD NIGHT"],
  ["‘이것은 내 책이야’는 영어로?", "THIS IS MY BOOK", "THIS IS MY HAT", "THIS IS MY CUP"],
  ["‘이것은 내 모자야’는 영어로?", "THIS IS MY HAT", "THIS IS MY BOOK", "THIS IS MY CUP"],
  ["‘이것은 내 컵이야’는 영어로?", "THIS IS MY CUP", "THIS IS MY HAT", "THIS IS MY BOOK"],
  ["‘나는 사과를 좋아해’는 영어로?", "I LIKE APPLES", "I LIKE BANANAS", "I LIKE CATS"],
  ["‘나는 바나나를 좋아해’는 영어로?", "I LIKE BANANAS", "I LIKE APPLES", "I LIKE CATS"],
  ["‘나는 고양이를 좋아해’는 영어로?", "I LIKE CATS", "I LIKE DOGS", "I LIKE APPLES"],
  ["‘나는 강아지를 좋아해’는 영어로?", "I LIKE DOGS", "I LIKE CATS", "I LIKE BANANAS"],
  ["‘잘 자, 친구야’는 영어로?", "GOOD NIGHT FRIEND", "GOOD MORNING FRIEND", "HELLO FRIEND"],
];
add("seven", "english", "짧은 영어 말", sevenPhrases, ([prompt, answer, a, b], i) =>
  q(prompt, answer, a, b, i));
const sevenSentences = newThings.slice(0, 30);
add("seven", "english", "영어 문장 그림", sevenSentences, ([id, , en], i) => picture(
  `I see ${["orange", "elephant", "airplane"].includes(id) ? "an" : "a"} ${en.toLowerCase()}. 어느 그림?`, id,
  sevenSentences[(i + 9) % 30][0], sevenSentences[(i + 18) % 30][0], i,
  { speechText: `I see ${["orange", "elephant", "airplane"].includes(id) ? "an" : "a"} ${en.toLowerCase()}.`, speechLang: "en-US" }));

export const EXPANDED_CONTENT = content;
