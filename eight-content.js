// Five questions form a stage. Earlier age sets keep their saved IDs unchanged.
export const EIGHT_CONTENT = {
  levels: { hangul: [], math: [], english: [] },
  questions: { hangul: [], math: [], english: [] },
};
const options = (answer, a, b, index) => [
  [answer, a, b], [a, answer, b], [a, b, answer],
][index % 3];
const q = (prompt, answer, a, b, index, extra = {}) => ({
  prompt, options: options(answer, a, b, index), answer, ...extra,
});
function add(subject, title, items, make) {
  if (items.length % 5) throw Error(`${subject}/${title}: five questions per stage required`);
  items.forEach((item, index) => {
    if (index % 5 === 0) EIGHT_CONTENT.levels[subject].push(`${title} ${index / 5 + 1}`);
    EIGHT_CONTENT.questions[subject].push(make(item, index));
  });
}

// 8살 도전 · 한글 170문제: 낱말, 문장, 짧은 글을 차례로 읽는다.
const similarWords = [
  ["기쁘다", "즐겁다", "슬프다", "무섭다"], ["작다", "조그맣다", "크다", "길다"],
  ["크다", "커다랗다", "좁다", "짧다"], ["빠르다", "재빠르다", "느리다", "조용하다"],
  ["조용하다", "고요하다", "시끄럽다", "따뜻하다"], ["아름답다", "예쁘다", "무겁다", "낮다"],
  ["따뜻하다", "포근하다", "차갑다", "어둡다"], ["깨끗하다", "말끔하다", "더럽다", "시끄럽다"],
  ["어둡다", "컴컴하다", "환하다", "가볍다"], ["밝다", "환하다", "깊다", "작다"],
  ["무섭다", "두렵다", "즐겁다", "배부르다"], ["씩씩하다", "용감하다", "조용하다", "느리다"],
  ["걷다", "걸어가다", "날아가다", "헤엄치다"], ["달리다", "뛰다", "앉다", "멈추다"],
  ["바라보다", "쳐다보다", "감다", "숨다"], ["건네다", "주다", "숨기다", "버리다"],
  ["웃다", "미소 짓다", "울다", "화내다"], ["찾다", "발견하다", "잃다", "숨다"],
  ["도와주다", "거들다", "방해하다", "떠나다"], ["나누다", "함께 쓰다", "혼자 가지다", "감추다"],
];
add("hangul", "비슷한 말", similarWords, ([word, answer, a, b], i) =>
  q(`‘${word}’와 뜻이 비슷한 말은?`, answer, a, b, i));

const spellings = [
  ["배우는 곳의 이름", "학교", "학꾜", "학쿄"],
  ["함께 노는 사람", "친구", "칭구", "친규"],
  ["함께 사는 사람들", "가족", "가좃", "가쫏"],
  ["꼭 지키기로 한 말", "약속", "약쏙", "얃속"],
  ["계단을 오르내릴 때의 그 계단", "계단", "게단", "계딴"],
  ["날짜를 보는 종이", "달력", "달녁", "달역"],
  ["밥을 먹을 때 쓰는 도구", "숟가락", "숫가락", "숟갈악"],
  ["꽃의 잎", "꽃잎", "꼿잎", "꽃입"],
  ["책을 소리 내어 보는 행동", "읽어요", "일거요", "읽어여"],
  ["해가 비칠 때 보이는 빛", "햇빛", "해빛", "햇빋"],
  ["물에서 헤엄치는 동물", "물고기", "물꼬기", "물고끼"],
  ["나무에 달린 잎", "나뭇잎", "나무잎", "나뭇입"],
  ["우리를 가르쳐 주는 분", "선생님", "선쌩님", "선생닙"],
  ["자라고 있는 아이", "어린이", "어리니", "어리이"],
  ["밖에서 노는 장소", "놀이터", "노리터", "놀이털"],
  ["책을 빌리는 곳", "도서관", "도써관", "도서간"],
  ["새로 돋아난 작은 싹", "새싹", "새삭", "세싹"],
  ["하늘에서 떨어지는 비의 물방울", "빗방울", "비방울", "빋방울"],
  ["시간을 알려 주는 물건", "시계", "시게", "씨계"],
  ["글씨를 쓰는 도구", "연필", "연퓔", "언필"],
];
add("hangul", "바른 낱말", spellings, ([clue, answer, a, b], i) =>
  q(`${clue}. 바르게 쓴 낱말은?`, answer, a, b, i));

const particles = [
  ["사과□ 먹어요.", "를", "가", "에"], ["책□ 읽어요.", "을", "이", "에"],
  ["학교□ 가요.", "에", "를", "가"], ["집□ 돌아왔어요.", "에", "을", "이"],
  ["민지□ 웃어요.", "가", "를", "에"], ["아빠□ 요리해요.", "가", "를", "에"],
  ["우산□ 폈어요.", "을", "이", "에"], ["꽃□ 피었어요.", "이", "을", "에"],
  ["동생□ 편지를 줬어요.", "에게", "와", "를"], ["친구□ 손을 잡았어요.", "의", "가", "에"],
  ["연필을 책상□ 올려놓았어요.", "위에", "아래에", "밖에"],
  ["선생님□ 인사했어요.", "께", "가", "를"],
  ["컵□ 물을 담았어요.", "에", "를", "가"], ["나무□ 새가 앉았어요.", "에", "를", "가"],
  ["손□ 비누로 씻어요.", "을", "이", "에"], ["버스□ 내렸어요.", "에서", "에", "를"],
  ["동생□ 신발을 신겨 줬어요.", "에게", "를", "가"],
  ["종이□ 그림을 그렸어요.", "에", "를", "가"],
  ["문□ 열었어요.", "을", "이", "에"], ["빵□ 접시에 놓았어요.", "을", "이", "에"],
];
add("hangul", "문장 속 작은 말", particles, ([blank, answer, a, b], i) =>
  q(`${blank} 빈칸에 알맞은 말은?`, answer, a, b, i,
    { speechText: `${blank.replace("□", " 빈칸 ")} 빈칸에 알맞은 말을 골라 보자.` }));

const spacedSentences = [
  ["나는 학교에 가요.", "나는학교에 가요.", "나는 학교에가요."],
  ["동생이 노래를 불러요.", "동생이노래를 불러요.", "동생이 노래를불러요."],
  ["우리는 공원에서 놀아요.", "우리는공원에서 놀아요.", "우리는 공원에서놀아요."],
  ["엄마와 시장에 갔어요.", "엄마와시장에 갔어요.", "엄마와 시장에갔어요."],
  ["친구가 책을 읽어요.", "친구가책을 읽어요.", "친구가 책을읽어요."],
  ["아빠가 빵을 구워요.", "아빠가빵을 구워요.", "아빠가 빵을구워요."],
  ["고양이가 창밖을 봐요.", "고양이가창밖을 봐요.", "고양이가 창밖을봐요."],
  ["햇빛이 방 안에 들어와요.", "햇빛이방 안에 들어와요.", "햇빛이 방안에 들어와요."],
  ["토끼는 당근을 좋아해요.", "토끼는당근을 좋아해요.", "토끼는 당근을좋아해요."],
  ["나비가 꽃 위에 앉아요.", "나비가꽃 위에 앉아요.", "나비가 꽃위에 앉아요."],
  ["우산을 들고 밖에 나가요.", "우산을들고 밖에 나가요.", "우산을 들고밖에 나가요."],
  ["우리 반에 새 친구가 왔어요.", "우리반에 새 친구가 왔어요.", "우리 반에 새친구가 왔어요."],
  ["할머니가 따뜻한 차를 주세요.", "할머니가따뜻한 차를 주세요.", "할머니가 따뜻한차를 주세요."],
  ["나는 빨간 사과를 먹었어요.", "나는빨간 사과를 먹었어요.", "나는 빨간사과를 먹었어요."],
  ["비가 그치고 무지개가 떴어요.", "비가그치고 무지개가 떴어요.", "비가 그치고무지개가 떴어요."],
  ["우리는 함께 그림을 그렸어요.", "우리는함께 그림을 그렸어요.", "우리는 함께그림을 그렸어요."],
  ["동생은 작은 배를 접었어요.", "동생은작은 배를 접었어요.", "동생은 작은배를 접었어요."],
  ["강아지가 꼬리를 흔들어요.", "강아지가꼬리를 흔들어요.", "강아지가 꼬리를흔들어요."],
  ["오늘은 바람이 많이 불어요.", "오늘은바람이 많이 불어요.", "오늘은 바람이많이 불어요."],
  ["우리는 도서관에서 책을 빌려요.", "우리는도서관에서 책을 빌려요.", "우리는 도서관에서책을 빌려요."],
];
add("hangul", "띄어 읽기", spacedSentences, ([answer, a, b], i) =>
  q("바르게 띄어 쓴 문장은?", answer, a, b, i,
    { speechText: "바르게 띄어 쓴 문장을 골라 보자." }));

const sentenceEndings = [
  ["비가 많이 왔어요. 그래서", "우산을 썼어요.", "창문을 열었어요.", "수영을 했어요."],
  ["손에 흙이 묻었어요. 그래서", "손을 씻었어요.", "신발을 신었어요.", "책을 덮었어요."],
  ["배가 고팠어요. 그래서", "밥을 먹었어요.", "잠을 잤어요.", "우산을 폈어요."],
  ["추운 바람이 불었어요. 그래서", "외투를 입었어요.", "선풍기를 켰어요.", "얼음을 먹었어요."],
  ["도서관에 갔어요. 그래서", "책을 빌렸어요.", "공을 찼어요.", "빵을 구웠어요."],
  ["어두운 밤이 되었어요. 그래서", "불을 켰어요.", "해를 그렸어요.", "꽃에 물을 줬어요."],
  ["연필 끝이 뭉툭해졌어요. 그래서", "연필을 깎았어요.", "편지를 보냈어요.", "컵을 씻었어요."],
  ["꽃이 시들어 보였어요. 그래서", "꽃에 물을 줬어요.", "꽃을 상자에 넣었어요.", "꽃을 밟았어요."],
  ["친구가 넘어졌어요. 그래서", "친구를 일으켜 줬어요.", "혼자 달아났어요.", "문을 닫았어요."],
  ["약속 시간에 늦을 것 같았어요. 그래서", "서둘러 걸었어요.", "더 오래 쉬었어요.", "그림을 그렸어요."],
  ["비눗방울을 불었어요. 그러자", "방울이 하늘로 떠올랐어요.", "책이 젖었어요.", "연필이 부러졌어요."],
  ["눈이 많이 내렸어요. 그러자", "길에 눈이 쌓였어요.", "바다가 말랐어요.", "꽃이 활짝 피었어요."],
  ["민지가 씨앗을 심었어요. 며칠 뒤", "작은 싹이 났어요.", "연필이 자랐어요.", "컵이 날아갔어요."],
  ["풍선에 바람을 넣었어요. 그러자", "풍선이 커졌어요.", "풍선이 작아졌어요.", "풍선이 젖었어요."],
  ["물을 얼음 틀에 넣고 냉동실에 두었어요. 다음 날", "얼음이 되었어요.", "빵이 되었어요.", "꽃이 피었어요."],
  ["아침에 해가 떠올랐어요. 그래서", "하늘이 밝아졌어요.", "달이 커졌어요.", "별이 더 잘 보였어요."],
  ["신발끈이 풀렸어요. 그래서", "끈을 다시 묶었어요.", "모자를 벗었어요.", "물을 마셨어요."],
  ["수아가 편지를 다 썼어요. 그래서", "봉투에 넣었어요.", "책상에 심었어요.", "물에 씻었어요."],
  ["장난감이 바닥에 흩어졌어요. 그래서", "상자에 정리했어요.", "창문을 열었어요.", "신발을 닦았어요."],
  ["양치할 시간이 되었어요. 그래서", "칫솔에 치약을 짰어요.", "빵을 구웠어요.", "공을 찼어요."],
  ["비가 그쳤어요. 그래서", "우산을 접었어요.", "우산을 더 폈어요.", "장갑을 샀어요."],
  ["그림을 다 그렸어요. 그래서", "색연필을 정리했어요.", "종이를 찢었어요.", "바다에 갔어요."],
  ["친구가 무거운 가방을 들고 있었어요. 그래서", "함께 들어 줬어요.", "더 무겁게 만들었어요.", "혼자 뛰어갔어요."],
  ["길을 건너기 전에 신호등을 봤어요. 초록불이 켜져서", "횡단보도를 건넜어요.", "눈을 감았어요.", "차도로 뛰어들었어요."],
  ["비행기 종이접기를 마쳤어요. 그래서", "종이비행기를 날렸어요.", "종이를 먹었어요.", "컵에 넣었어요."],
  ["감기에 걸려 몸이 아팠어요. 그래서", "충분히 쉬었어요.", "밤새 뛰었어요.", "차가운 물에 들어갔어요."],
  ["새 책을 빌렸어요. 집에 와서", "책장을 넘겨 읽었어요.", "책을 심었어요.", "책으로 물을 마셨어요."],
  ["모래성을 만들고 싶었어요. 그래서", "모래를 모았어요.", "꽃잎을 세었어요.", "창문을 닫았어요."],
  ["강아지가 목말라 보였어요. 그래서", "물그릇을 채웠어요.", "공을 숨겼어요.", "불을 껐어요."],
  ["빵이 뜨거웠어요. 그래서", "잠시 식혀 먹었어요.", "바로 손으로 꽉 잡았어요.", "창문을 그렸어요."],
];
add("hangul", "문장 이어 보기", sentenceEndings, ([start, answer, a, b], i) =>
  q(`${start} 알맞은 다음 말은?`, answer, a, b, i));

const stories = [
  ["민지는 화분에 해바라기 씨앗을 심었어요. 매일 물을 주자 일주일 뒤 새싹이 났어요.",
    ["누가 씨앗을 심었을까?", "민지", "준호", "수아"], ["어디에 심었을까?", "화분", "컵", "서랍"],
    ["무엇을 심었을까?", "해바라기 씨앗", "사과 씨앗", "나무 가지"], ["매일 무엇을 주었을까?", "물", "모래", "설탕"],
    ["새싹은 언제 났을까?", "일주일 뒤", "바로 그날", "한 달 전"]],
  ["준호는 도서관에서 공룡 책 두 권을 빌렸어요. 다 읽고 다음 주에 책을 돌려주었어요.",
    ["누가 책을 빌렸을까?", "준호", "민지", "태오"], ["어디에서 빌렸을까?", "도서관", "시장", "병원"],
    ["무슨 책이었을까?", "공룡 책", "요리 책", "꽃 책"], ["몇 권을 빌렸을까?", "두 권", "한 권", "세 권"],
    ["다 읽은 뒤 무엇을 했을까?", "책을 돌려주었어", "책을 버렸어", "책을 숨겼어"]],
  ["하린이는 아빠와 공원에 소풍을 갔어요. 돗자리를 펴고 점심으로 김밥을 먹었어요.",
    ["누구와 소풍을 갔을까?", "아빠", "엄마", "언니"], ["어디로 갔을까?", "공원", "도서관", "수영장"],
    ["무엇을 폈을까?", "돗자리", "우산", "책"], ["점심으로 무엇을 먹었을까?", "김밥", "국수", "사과"],
    ["돗자리는 무엇을 하려고 폈을까?", "앉아서 쉬려고", "비를 막으려고", "벽을 꾸미려고"]],
  ["지우는 놀이터에서 장갑 한 짝을 잃어버렸어요. 선생님이 미끄럼틀 옆에서 찾아 주셨어요.",
    ["누가 장갑을 잃어버렸을까?", "지우", "선생님", "민지"], ["어디에서 잃어버렸을까?", "놀이터", "집", "도서관"],
    ["무엇을 잃어버렸을까?", "장갑 한 짝", "모자", "책"], ["누가 찾아 주셨을까?", "선생님", "동생", "아빠"],
    ["장갑은 어디에 있었을까?", "미끄럼틀 옆", "그네 위", "교실 안"]],
  ["소라는 할머니와 밀가루 반죽을 했어요. 반죽을 오븐에 구워 따뜻한 빵을 가족과 나누었어요.",
    ["누구와 반죽을 했을까?", "할머니", "친구", "선생님"], ["무엇으로 반죽했을까?", "밀가루", "모래", "종이"],
    ["어디에 넣어 구웠을까?", "오븐", "냉장고", "서랍"], ["무엇을 만들었을까?", "빵", "국수", "사탕"],
    ["빵을 누구와 나누었을까?", "가족", "혼자", "옆집 고양이"]],
  ["예나는 바람 부는 날 공원에서 파란 연을 날렸어요. 줄이 끊어졌지만 아빠가 다시 묶어 주셨어요.",
    ["누가 연을 날렸을까?", "예나", "아빠", "소라"], ["연은 무슨 색일까?", "파란색", "빨간색", "노란색"],
    ["어디에서 날렸을까?", "공원", "교실", "부엌"], ["무엇이 끊어졌을까?", "연줄", "신발끈", "가방끈"],
    ["누가 다시 묶어 주셨을까?", "아빠", "선생님", "할머니"]],
  ["도윤이는 수족관에서 노란 물고기를 봤어요. 집에 돌아와 그 물고기를 그림으로 그렸어요.",
    ["누가 물고기를 봤을까?", "도윤", "준호", "민지"], ["어디에서 봤을까?", "수족관", "운동장", "빵집"],
    ["물고기는 무슨 색일까?", "노란색", "파란색", "초록색"], ["집에서 무엇을 했을까?", "물고기를 그렸어", "빵을 구웠어", "연을 날렸어"],
    ["무엇을 보고 그림을 그렸을까?", "본 물고기를 떠올려", "본 기차를 떠올려", "본 꽃을 떠올려"]],
  ["태오는 빈 플라스틱 병을 깨끗이 씻었어요. 뚜껑을 분리하고 재활용 상자에 넣었어요.",
    ["누가 병을 씻었을까?", "태오", "도윤", "지우"], ["어떤 병이었을까?", "플라스틱 병", "유리병", "종이컵"],
    ["병을 어떻게 했을까?", "깨끗이 씻었어", "색칠했어", "구웠어"], ["무엇을 분리했을까?", "뚜껑", "손잡이", "바퀴"],
    ["병을 어디에 넣었을까?", "재활용 상자", "책장", "옷장"]],
  ["가을이 되어 나뭇잎이 빨갛고 노랗게 변했어요. 은서는 잎을 주워 종이에 붙였어요.",
    ["어느 계절일까?", "가을", "봄", "여름"], ["무엇의 색이 변했을까?", "나뭇잎", "바닷물", "모래"],
    ["잎은 어떤 색일까?", "빨강과 노랑", "파랑과 초록", "검정과 하양"], ["누가 잎을 주웠을까?", "은서", "예나", "태오"],
    ["잎을 어디에 붙였을까?", "종이", "창문", "신발"]],
  ["수아는 목마른 강아지에게 물을 주었어요. 강아지는 물을 마신 뒤 그늘에서 쉬었어요.",
    ["누가 물을 주었을까?", "수아", "준호", "하린"], ["누구에게 주었을까?", "강아지", "고양이", "토끼"],
    ["강아지는 왜 물을 마셨을까?", "목이 말라서", "배가 불러서", "잠이 와서"], ["물을 마신 뒤 어디에서 쉬었을까?", "그늘", "햇볕", "물속"],
    ["먼저 한 일은 무엇일까?", "물을 주었어", "그림을 그렸어", "책을 읽었어"]],
  ["현우는 아침에 도시락을 가방에 넣었어요. 점심때 친구와 나란히 앉아 도시락을 먹었어요.",
    ["누가 도시락을 넣었을까?", "현우", "친구", "선생님"], ["언제 가방에 넣었을까?", "아침", "점심", "저녁"],
    ["어디에 넣었을까?", "가방", "신발장", "냉장고"], ["누구와 나란히 앉았을까?", "친구", "아빠", "할머니"],
    ["점심때 무엇을 먹었을까?", "도시락", "아이스크림", "국수"]],
  ["다연이는 노란 종이로 배를 접었어요. 작은 대야에 물을 담아 종이배를 띄웠어요.",
    ["누가 배를 접었을까?", "다연", "수아", "민지"], ["종이는 무슨 색일까?", "노란색", "파란색", "빨간색"],
    ["무엇을 접었을까?", "배", "학", "모자"], ["무엇에 물을 담았을까?", "대야", "컵", "화분"],
    ["종이배를 어디에 띄웠을까?", "물 위", "모래 위", "책상 위"]],
];
add("hangul", "짧은 글 읽기", stories.flatMap(([story, ...parts]) =>
  parts.map(([prompt, answer, a, b]) => [story, prompt, answer, a, b])),
([story, prompt, answer, a, b], i) => q(`${story} ${prompt}`, answer, a, b, i));

// 8살 도전 · 수학 165문제: 두 자리 계산에서 생활 속 수학으로 넓힌다.
const additions = [
  [21, 13], [24, 12], [35, 14], [42, 16], [53, 25],
  [61, 18], [34, 23], [47, 21], [56, 32], [72, 17],
  [27, 15], [38, 24], [46, 17], [58, 16], [29, 33],
  [37, 28], [48, 27], [54, 29], [65, 18], [76, 15],
];
add("math", "두 자리 더하기", additions, ([left, right], i) => {
  const answer = left + right;
  return q(`${left}과 ${right}을 더하면 얼마일까?`, answer, answer - 1, answer + 1, i,
    { equation: `${left} + ${right} = ?`, left, right, operator: "+" });
});

const subtractions = [
  [54, 22], [68, 35], [79, 46], [87, 24], [96, 54],
  [45, 13], [62, 31], [73, 42], [88, 55], [94, 62],
  [42, 17], [53, 28], [61, 36], [74, 49], [82, 57],
  [95, 68], [63, 27], [71, 45], [84, 59], [92, 66],
];
add("math", "두 자리 빼기", subtractions, ([left, right], i) => {
  const answer = left - right;
  return q(`${left}에서 ${right}을 빼면 얼마일까?`, answer, answer - 1, answer + 1, i,
    { equation: `${left} − ${right} = ?`, left, right, operator: "-" });
});

const missingAdd = [[23, 14], [34, 15], [42, 16], [51, 17], [26, 28],
  [37, 25], [44, 19], [61, 18], [58, 24], [36, 37]];
const missingSubtract = [[52, 14], [63, 25], [74, 36], [85, 47], [96, 58],
  [71, 23], [83, 45], [62, 17], [94, 59], [75, 28]];
add("math", "숨은 수 찾기", [
  ...missingAdd.map(([left, answer]) => ({ left, answer, operator: "+" })),
  ...missingSubtract.map(([left, answer]) => ({ left, answer, operator: "-" })),
], ({ left, answer, operator }, i) => {
  const result = operator === "+" ? left + answer : left - answer;
  return q(`${left}에 얼마를 ${operator === "+" ? "더하면" : "빼면"} ${result}이 될까?`,
    answer, answer - 1, answer + 1, i, { equation: `${left} ${operator === "+" ? "+" : "−"} □ = ${result}` });
});

const threeDigits = [123, 145, 206, 238, 317, 405, 462, 509, 570, 684];
const composeDigits = [[1, 2, 3], [2, 4, 6], [3, 1, 8], [4, 5, 2], [5, 3, 7],
  [6, 8, 1], [7, 2, 9], [8, 6, 4], [9, 1, 5], [3, 7, 2]];
add("math", "백과 십과 일", [
  ...threeDigits.map(value => ({ value })),
  ...composeDigits.map(digits => ({ digits })),
], (item, i) => {
  if (item.value) {
    const answer = Math.floor(item.value / 100);
    return q(`${item.value}의 백의 자리 숫자는?`, answer, answer - 1, answer + 1, i,
      { equation: String(item.value) });
  }
  const [hundreds, tens, ones] = item.digits;
  const answer = hundreds * 100 + tens * 10 + ones;
  return q(`백의 자리 ${hundreds}, 십의 자리 ${tens}, 일의 자리 ${ones}이면?`, answer,
    tens * 100 + hundreds * 10 + ones, hundreds * 100 + ones * 10 + tens, i,
    { equation: `${hundreds * 100} + ${tens * 10} + ${ones} = ?` });
});

const numberPatterns = [
  ["12 → 17 → 22 → ?", 27, 25, 32], ["15 → 20 → 25 → ?", 30, 28, 35],
  ["24 → 29 → 34 → ?", 39, 38, 44], ["31 → 36 → 41 → ?", 46, 45, 51],
  ["45 → 50 → 55 → ?", 60, 58, 65], ["18 → 28 → 38 → ?", 48, 47, 58],
  ["22 → 32 → 42 → ?", 52, 50, 62], ["37 → 47 → 57 → ?", 67, 65, 77],
  ["54 → 64 → 74 → ?", 84, 82, 94], ["65 → 75 → 85 → ?", 95, 90, 100],
  ["80 → 75 → 70 → ?", 65, 60, 70], ["95 → 85 → 75 → ?", 65, 70, 55],
  ["76 → 66 → 56 → ?", 46, 50, 36], ["64 → 59 → 54 → ?", 49, 44, 54],
  ["100 → 90 → 80 → ?", 70, 75, 60], ["105 → 110 → 115 → ?", 120, 118, 125],
  ["120 → 130 → 140 → ?", 150, 145, 160], ["155 → 160 → 165 → ?", 170, 168, 175],
  ["180 → 170 → 160 → ?", 150, 155, 140], ["200 → 190 → 180 → ?", 170, 175, 160],
];
add("math", "수의 규칙", numberPatterns, ([equation, answer, a, b], i) =>
  q("빈칸에 들어갈 수를 찾아봐.", answer, a, b, i,
    { equation, speechText: `${equation.split("→").slice(0, -1).map(part => part.trim()).join(", ")}. 다음에 올 수를 찾아봐.` }));

const halfHours = Array.from({ length: 10 }, (_, i) => i + 1);
const coins = [[1, 1], [2, 1], [3, 1], [4, 1], [1, 2],
  [2, 2], [3, 2], [4, 2], [5, 1], [6, 1]];
add("math", "시계와 동전", [
  ...halfHours.map(hour => ({ hour })), ...coins.map(([hundreds, fifties]) => ({ hundreds, fifties })),
], (item, i) => {
  if (item.hour) return q(`긴 바늘이 6, 짧은 바늘이 ${item.hour}과 ${item.hour + 1} 사이면 몇 시?`,
    `${item.hour}시 30분`, `${item.hour}시`, `${item.hour + 1}시 30분`, i);
  const amount = item.hundreds * 100 + item.fifties * 50;
  return q(`100원 동전 ${item.hundreds}개와 50원 동전 ${item.fifties}개는 모두 얼마?`,
    `${amount}원`, `${amount - 50}원`, `${amount + 50}원`, i,
    { equation: `${item.hundreds * 100} + ${item.fifties * 50} = ?` });
});

const cutLengths = [[34, 12], [45, 13], [56, 24], [63, 21], [78, 35],
  [42, 17], [53, 28], [64, 39], [75, 46], [86, 57]];
const lengthPairs = [[23, 31], [42, 37], [56, 65], [74, 68], [35, 53],
  [61, 59], [48, 84], [72, 27], [39, 43], [85, 78]];
add("math", "길이 비교", [
  ...cutLengths.map(([whole, cut]) => ({ whole, cut })),
  ...lengthPairs.map(([first, second]) => ({ first, second })),
], (item, i) => {
  if (item.whole) {
    const answer = item.whole - item.cut;
    return q(`${item.whole}cm 끈에서 ${item.cut}cm를 잘랐어. 남은 길이는?`,
      answer, answer - 1, answer + 1, i, { equation: `${item.whole} − ${item.cut} = ? cm` });
  }
  const answer = Math.max(item.first, item.second);
  return q(`${item.first}cm 끈과 ${item.second}cm 끈 중 더 긴 길이는?`,
    `${answer}cm`, `${Math.min(item.first, item.second)}cm`, "같은 길이", i);
});

const twoStepStories = [
  ["사과 23개를 갖고 12개를 더 샀다가 5개를 먹었어. 남은 사과는?", 23, 12, 5, "+-"],
  ["쿠키 25개를 굽고 14개를 더 구운 뒤 8개를 나눴어. 남은 쿠키는?", 25, 14, 8, "+-"],
  ["공 32개에 16개를 더 모아 7개를 친구에게 줬어. 남은 공은?", 32, 16, 7, "+-"],
  ["풍선 41개에 13개를 더 샀고 9개가 터졌어. 남은 풍선은?", 41, 13, 9, "+-"],
  ["구슬 34개에 25개를 더 받았고 6개를 잃었어. 남은 구슬은?", 34, 25, 6, "+-"],
  ["스티커 52장 중 14장을 붙이고 9장을 더 받았어. 지금 몇 장?", 52, 14, 9, "-+"],
  ["사탕 61개 중 23개를 나누고 12개를 더 받았어. 지금 몇 개?", 61, 23, 12, "-+"],
  ["블록 73개 중 25개를 치우고 17개를 더 꺼냈어. 밖에 몇 개?", 73, 25, 17, "-+"],
  ["종이컵 45개 중 18개를 쓰고 12개를 더 가져왔어. 지금 몇 개?", 45, 18, 12, "-+"],
  ["딸기 64개 중 27개를 팔고 15개를 더 땄어. 지금 몇 개?", 64, 27, 15, "-+"],
  ["귤 21개에 13개를 받고 다시 12개를 받았어. 모두 몇 개?", 21, 13, 12, "++"],
  ["장난감 32개에 15개를 더하고 11개를 더 모았어. 모두 몇 개?", 32, 15, 11, "++"],
  ["바나나 24개에 18개를 사고 13개를 더 샀어. 모두 몇 개?", 24, 18, 13, "++"],
  ["구슬 35개에 14개를 받고 16개를 더 받았어. 모두 몇 개?", 35, 14, 16, "++"],
  ["책 23권에 12권을 더 놓고 21권을 더 놓았어. 모두 몇 권?", 23, 12, 21, "++"],
  ["스티커 75장 중 14장을 쓰고 12장을 나눠 줬어. 남은 것은?", 75, 14, 12, "--"],
  ["사탕 68개 중 23개를 주고 15개를 먹었어. 남은 것은?", 68, 23, 15, "--"],
  ["연필 84자루 중 26자루를 주고 18자루를 썼어. 남은 것은?", 84, 26, 18, "--"],
  ["공 91개 중 37개를 보관하고 24개를 더 보관했어. 밖에 몇 개?", 91, 37, 24, "--"],
  ["쿠키 73개 중 18개를 나누고 25개를 먹었어. 남은 것은?", 73, 18, 25, "--"],
  ["사과 46개에 22개를 더 샀다가 17개를 팔았어. 남은 사과는?", 46, 22, 17, "+-"],
  ["풍선 57개 중 19개가 터지고 16개를 더 샀어. 지금 몇 개?", 57, 19, 16, "-+"],
  ["블록 28개에 17개를 받고 14개를 더 받았어. 모두 몇 개?", 28, 17, 14, "++"],
  ["카드 82장 중 29장을 주고 13장을 나누었어. 남은 것은?", 82, 29, 13, "--"],
  ["구슬 39개에 18개를 더 받고 21개를 썼어. 남은 구슬은?", 39, 18, 21, "+-"],
];
add("math", "두 번 생각하는 셈", twoStepStories, ([prompt, left, middle, right, operations], i) => {
  const first = operations[0] === "+" ? left + middle : left - middle;
  const answer = operations[1] === "+" ? first + right : first - right;
  return q(prompt, answer, answer - 1, answer + 1, i,
    { equation: `${left} ${operations[0] === "+" ? "+" : "−"} ${middle} ${operations[1] === "+" ? "+" : "−"} ${right} = ?` });
});

// 8살 도전 · 영어 165문제: 생활 낱말을 짧은 문장과 대화에서 알아본다.
const everydayWords = [
  ["교실", "classroom", "bedroom", "bathroom"], ["운동장", "playground", "classroom", "kitchen"],
  ["부엌", "kitchen", "garden", "bedroom"], ["정원", "garden", "library", "kitchen"],
  ["도서관", "library", "playground", "bathroom"], ["침실", "bedroom", "kitchen", "garden"],
  ["욕실", "bathroom", "classroom", "library"], ["의자", "chair", "table", "door"],
  ["탁자", "table", "chair", "window"], ["창문", "window", "door", "table"],
  ["문", "door", "window", "chair"], ["기차", "train", "plane", "boat"],
  ["비행기", "plane", "train", "boat"], ["배", "boat", "plane", "train"],
  ["강", "river", "mountain", "forest"], ["산", "mountain", "river", "forest"],
  ["숲", "forest", "river", "mountain"], ["비", "rain", "snow", "wind"],
  ["눈", "snow", "rain", "wind"], ["바람", "wind", "snow", "rain"],
  ["행복한", "happy", "sad", "angry"], ["슬픈", "sad", "happy", "angry"],
  ["화난", "angry", "happy", "sad"], ["배고픈", "hungry", "sleepy", "thirsty"],
  ["목마른", "thirsty", "hungry", "sleepy"], ["졸린", "sleepy", "thirsty", "hungry"],
  ["빠른", "fast", "slow", "quiet"], ["느린", "slow", "fast", "quiet"],
  ["조용한", "quiet", "fast", "slow"], ["깨끗한", "clean", "dirty", "quiet"],
];
add("english", "새 생활 낱말", everydayWords, ([korean, answer, a, b], i) =>
  q(`‘${korean}’의 영어 낱말은?`, answer, a, b, i));

const usefulSentences = [
  ["나는 행복해.", "I am happy.", "I am sad.", "I am hungry."],
  ["나는 배고파.", "I am hungry.", "I am sleepy.", "I am happy."],
  ["나는 목말라.", "I am thirsty.", "I am hungry.", "I am tired."],
  ["나는 졸려.", "I am sleepy.", "I am thirsty.", "I am ready."],
  ["나는 준비됐어.", "I am ready.", "I am sleepy.", "I am sad."],
  ["이것은 내 책이야.", "This is my book.", "This is my bag.", "This is my hat."],
  ["이것은 내 가방이야.", "This is my bag.", "This is my book.", "This is my cup."],
  ["저것은 큰 나무야.", "That is a big tree.", "That is a small tree.", "That is a big house."],
  ["나는 사과를 좋아해.", "I like apples.", "I like bananas.", "I like oranges."],
  ["나는 고양이를 좋아해.", "I like cats.", "I like dogs.", "I like birds."],
  ["나는 물을 마셔.", "I drink water.", "I drink milk.", "I eat bread."],
  ["나는 우유를 마셔.", "I drink milk.", "I drink water.", "I eat rice."],
  ["나는 책을 읽어.", "I read a book.", "I draw a picture.", "I open a box."],
  ["나는 그림을 그려.", "I draw a picture.", "I read a book.", "I kick a ball."],
  ["나는 공을 차.", "I kick a ball.", "I draw a picture.", "I sing a song."],
  ["나는 노래를 불러.", "I sing a song.", "I read a book.", "I kick a ball."],
  ["나를 도와줄래?", "Can you help me?", "Can you see me?", "Can you hear me?"],
  ["들어와도 될까요?", "May I come in?", "May I sit down?", "May I go out?"],
  ["앉아도 될까요?", "May I sit down?", "May I come in?", "May I go out?"],
  ["다시 말해 주세요.", "Please say it again.", "Please open the door.", "Please sit down."],
  ["문을 열어 주세요.", "Please open the door.", "Please close the door.", "Please say it again."],
  ["문을 닫아 주세요.", "Please close the door.", "Please open the door.", "Please sit down."],
  ["오늘은 비가 와.", "It is rainy today.", "It is sunny today.", "It is snowy today."],
  ["오늘은 맑아.", "It is sunny today.", "It is rainy today.", "It is windy today."],
  ["오늘은 바람이 불어.", "It is windy today.", "It is sunny today.", "It is snowy today."],
  ["우리는 친구야.", "We are friends.", "We are teachers.", "We are sisters."],
  ["나는 학교에 가.", "I go to school.", "I go to the park.", "I go home."],
  ["나는 집에 가.", "I go home.", "I go to school.", "I go to the park."],
  ["만나서 반가워.", "Nice to meet you.", "See you tomorrow.", "Good night."],
  ["내일 보자.", "See you tomorrow.", "Nice to meet you.", "Good morning."],
];
add("english", "짧은 문장", usefulSentences, ([korean, answer, a, b], i) =>
  q(`‘${korean}’를 영어로 말하면?`, answer, a, b, i));

const missingWords = [
  ["I eat an □.", "apple", "book", "chair"], ["I read a □.", "book", "ball", "shoe"],
  ["I kick a □.", "ball", "book", "cup"], ["I drink □.", "water", "bread", "chair"],
  ["I wear a □.", "hat", "apple", "table"], ["I open the □.", "door", "milk", "sun"],
  ["I look out the □.", "window", "chair", "book"], ["I sit on a □.", "chair", "door", "rain"],
  ["I sleep in my □.", "bed", "bag", "boat"], ["I put books in my □.", "bag", "cup", "shoe"],
  ["The sun is □.", "bright", "hungry", "small"], ["The ice is □.", "cold", "hot", "loud"],
  ["The soup is □.", "hot", "cold", "quiet"], ["The mouse is □.", "small", "big", "tall"],
  ["The elephant is □.", "big", "small", "short"], ["The turtle is □.", "slow", "fast", "loud"],
  ["The rabbit is □.", "fast", "slow", "sleepy"], ["The library is □.", "quiet", "loud", "dirty"],
  ["My hands are □.", "clean", "hungry", "windy"], ["My shoes are □.", "dirty", "thirsty", "rainy"],
  ["A bird can □.", "fly", "swim", "read"], ["A fish can □.", "swim", "fly", "write"],
  ["A frog can □.", "jump", "read", "sing"], ["A bee can □.", "fly", "kick", "write"],
  ["A cat can □.", "run", "read", "write"], ["We see stars at □.", "night", "lunch", "noon"],
  ["We eat breakfast in the □.", "morning", "night", "evening"],
  ["We eat lunch at □.", "noon", "night", "morning"],
  ["We say hello to a □.", "friend", "window", "shoe"],
  ["We say thank you for a □.", "gift", "door", "rain"],
];
add("english", "빈칸 말 찾기", missingWords, ([sentence, answer, a, b], i) =>
  q(`${sentence} 빈칸에 알맞은 영어 낱말은?`, answer, a, b, i,
    { speechText: `${sentence.replace("□", "blank")}. Choose the missing word.`, speechLang: "en-US" }));

const englishStories = [
  ["Mina has a red bag. She puts a book in it. She goes to school.",
    ["가방 색은?", "red", "blue", "green"], ["가방에 넣은 것은?", "book", "ball", "hat"], ["어디로 갈까?", "school", "park", "home"]],
  ["Tom has a small dog. The dog runs in the park. Tom gives it water.",
    ["톰의 동물은?", "dog", "cat", "bird"], ["어디에서 달릴까?", "park", "school", "kitchen"], ["톰이 주는 것은?", "water", "milk", "bread"]],
  ["Sue sees a yellow bird. It is in a tree. The bird sings a song.",
    ["새의 색은?", "yellow", "red", "black"], ["새는 어디에 있을까?", "tree", "house", "boat"], ["새가 하는 것은?", "sing", "swim", "sleep"]],
  ["Ben eats an apple for lunch. He drinks milk. Then he reads a book.",
    ["점심으로 먹은 것은?", "apple", "banana", "orange"], ["마신 것은?", "milk", "water", "juice"], ["나중에 읽는 것은?", "book", "map", "letter"]],
  ["A girl has two blue shoes. She puts them on and runs to the playground.",
    ["신발은 몇 개일까?", "two", "one", "three"], ["신발의 색은?", "blue", "red", "green"], ["달려간 곳은?", "playground", "library", "bedroom"]],
  ["It is rainy. Dad opens a big umbrella. We walk home together.",
    ["날씨는?", "rainy", "sunny", "snowy"], ["아빠가 펴는 것은?", "umbrella", "window", "book"], ["함께 가는 곳은?", "home", "school", "garden"]],
  ["Amy plants a flower in the garden. She gives it water every day.",
    ["에이미가 심은 것은?", "flower", "tree", "apple"], ["심은 곳은?", "garden", "kitchen", "classroom"], ["매일 주는 것은?", "water", "milk", "juice"]],
  ["Leo has a toy train. It is green. He plays with his sister.",
    ["장난감은?", "train", "plane", "boat"], ["색은?", "green", "yellow", "blue"], ["함께 노는 사람은?", "sister", "brother", "teacher"]],
  ["The class goes to the library. May finds a storybook. She reads it quietly.",
    ["반 아이들이 간 곳은?", "library", "playground", "kitchen"], ["메이가 찾은 것은?", "storybook", "pencil", "ball"], ["어떻게 읽을까?", "quietly", "loudly", "quickly"]],
  ["It is a cold morning. Kim wears a warm coat and walks to school.",
    ["아침은 어떨까?", "cold", "hot", "rainy"], ["입은 것은?", "coat", "hat", "shoes"], ["걸어간 곳은?", "school", "park", "home"]],
];
add("english", "영어 이야기", englishStories.flatMap(([story, ...parts]) =>
  parts.map(([prompt, answer, a, b]) => [story, prompt, answer, a, b])),
([story, prompt, answer, a, b], i) => q(`${story} ${prompt}`, answer, a, b, i,
  { speechText: story, speechLang: "en-US" }));

const shortDialogues = [
  ["How are you?", "I am fine.", "It is a book.", "My name is Tom."],
  ["What is your name?", "My name is Mina.", "I am seven.", "It is red."],
  ["How old are you?", "I am eight.", "I am happy.", "I am here."],
  ["What color is the sun?", "It is yellow.", "It is blue.", "It is green."],
  ["What color is the grass?", "It is green.", "It is red.", "It is purple."],
  ["Where is my book? 책이 탁자 위에 있어.", "On the table.", "Under the bed.", "In the bag."],
  ["Where is my bag? 가방이 의자 아래에 있어.", "Under the chair.", "On the table.", "In the box."],
  ["Where is the cat? 고양이가 상자 안에 있어.", "In the box.", "On the roof.", "Under the chair."],
  ["Do you like apples? 좋아한다고 답해 봐.", "Yes, I do.", "No, I don't.", "I am an apple."],
  ["Do you like rain? 싫다고 답해 봐.", "No, I don't.", "Yes, I do.", "It is raining."],
  ["Can you swim? 할 수 있다고 답해 봐.", "Yes, I can.", "No, I can't.", "I am a fish."],
  ["Can you fly? 할 수 없다고 답해 봐.", "No, I can't.", "Yes, I can.", "I am a bird."],
  ["What do you want? 물을 달라고 답해 봐.", "Water, please.", "A book, please.", "A hat, please."],
  ["What do you want? 우유를 달라고 답해 봐.", "Milk, please.", "Water, please.", "Juice, please."],
  ["Thank you! 알맞은 대답은?", "You're welcome.", "Good night.", "I am hungry."],
  ["Good morning! 알맞은 대답은?", "Good morning!", "Good night!", "See you tomorrow!"],
  ["Good night! 알맞은 대답은?", "Good night!", "Good morning!", "Good afternoon!"],
  ["See you tomorrow! 알맞은 대답은?", "See you!", "Good morning!", "Thank you!"],
  ["I am sorry. 알맞은 대답은?", "That's okay.", "I am eight.", "It is red."],
  ["May I come in? 들어와도 된다고 답해 봐.", "Yes, come in.", "No, go out.", "I am here."],
  ["What time is it? 3시라고 답해 봐.", "It is three o'clock.", "It is five o'clock.", "It is noon."],
  ["What day is it? 월요일이라고 답해 봐.", "It is Monday.", "It is Friday.", "It is Sunday."],
  ["How is the weather? 맑다고 답해 봐.", "It is sunny.", "It is rainy.", "It is snowy."],
  ["How is the weather? 눈이 온다고 답해 봐.", "It is snowy.", "It is windy.", "It is sunny."],
  ["What is this? 연필이라고 답해 봐.", "It is a pencil.", "It is a ruler.", "It is a crayon."],
];
add("english", "대화 이어 가기", shortDialogues, ([prompt, answer, a, b], i) =>
  q(prompt.includes("알맞은 대답은?") ? prompt : `${prompt} 알맞은 대답은?`, answer, a, b, i));

const plurals = [
  ["사과 2개", "two apples", "two apple", "one apple"],
  ["책 3권", "three books", "three book", "two books"],
  ["고양이 2마리", "two cats", "two cat", "one cat"],
  ["강아지 4마리", "four dogs", "four dog", "three dogs"],
  ["연필 5자루", "five pencils", "five pencil", "four pencils"],
  ["공 3개", "three balls", "three ball", "two balls"],
  ["꽃 2송이", "two flowers", "two flower", "one flower"],
  ["모자 4개", "four hats", "four hat", "five hats"],
  ["컵 5개", "five cups", "five cup", "four cups"],
  ["별 3개", "three stars", "three star", "two stars"],
  ["새 2마리", "two birds", "two bird", "one bird"],
  ["상자 4개", "four boxes", "four box", "three boxes"],
  ["버스 2대", "two buses", "two bus", "one bus"],
  ["접시 3개", "three dishes", "three dish", "two dishes"],
  ["시계 2개", "two watches", "two watch", "one watch"],
  ["사과 6개", "six apples", "six apple", "five apples"],
  ["책 7권", "seven books", "seven book", "six books"],
  ["꽃 8송이", "eight flowers", "eight flower", "seven flowers"],
  ["공 9개", "nine balls", "nine ball", "eight balls"],
  ["별 10개", "ten stars", "ten star", "nine stars"],
];
add("english", "여러 개 말하기", plurals, ([korean, answer, a, b], i) =>
  q(`‘${korean}’에 알맞은 영어 표현은?`, answer, a, b, i));
