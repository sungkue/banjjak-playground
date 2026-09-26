import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { AGE_LEVELS, AGE_QUESTIONS, gradeAnswer, answerProgress, answerFeedback, answerFact, ageUnlocked, stageUnlocked, earnedBadges, activityFor, activityTiles, questionFromId, validQuestionIds, adventureQuestions, reviewAfterAnswer } from "./app.js";
import { EMOJI_ART } from "./extra-content.js";
import { MORE_EMOJI_ART } from "./expanded-content.js";

const artExists = id => id in EMOJI_ART || id in MORE_EMOJI_ART || existsSync(new URL(`./assets/${id}.webp`, import.meta.url));
const soundExists = name => existsSync(new URL(`./audio/${name}.mp3`, import.meta.url));
const englishFile = choice => `en-${String(choice).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`;
const counts = { hangul: 170, math: 165, english: 165 };
const seen = new Set();
const activities = { word: 0, sentence: 0, number: 0 };

for (const [age, subjects] of Object.entries(AGE_QUESTIONS)) {
  for (const [subject, questions] of Object.entries(subjects)) {
    assert.equal(questions.length, counts[subject], `${age}/${subject}: question count`);
    assert.equal(AGE_LEVELS[age][subject].length * 5, questions.length, `${age}/${subject}: five per level`);
    for (const [index, question] of questions.entries()) {
      const key = JSON.stringify([subject, question.prompt, question.object, question.equation, question.count, [...question.options].sort()]);
      assert.ok(!seen.has(key), `${age}/${subject}/${index}: repeated question`);
      seen.add(key);
      assert.equal(question.options.length, 3);
      assert.equal(new Set(question.options).size, 3);
      assert.ok(question.options.includes(question.answer));
      assert.deepEqual(questionFromId(`${age}:${subject}:${index}`), { age, subject, index });
      const activity = activityFor(question, subject);
      if (activity) {
        activities[activity.kind] += 1;
        if (activity.tokens) {
          assert.equal(activity.tokens.join(activity.separator), question.answer);
          const tiles = activityTiles(question, activity);
          for (const token of activity.tokens) {
            const at = tiles.indexOf(token);
            assert.ok(at >= 0, `${age}/${subject}/${index}: every repeated letter has its own tile`);
            tiles.splice(at, 1);
          }
        } else assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 10000);
      }
      assert.ok(gradeAnswer(question, question.answer));
      assert.equal(question.options.filter(choice => gradeAnswer(question, choice)).length, 1);
      for (const attempts of [0, 1, 2]) {
        const choice = attempts ? question.options.find(option => option !== question.answer) : question.answer;
        const feedback = answerFeedback(question, subject, choice, attempts, false, index);
        assert.ok(feedback.detail && !feedback.detail.includes("undefined"), `${age}/${subject}/${index}: feedback`);
      }
      assert.ok(soundExists(`q-${age === "six" ? "" : `${age}-`}${subject}-${index}`), `${age}/${subject}/${index}: narration`);
      if (question.object) assert.ok(artExists(question.object), `${age}/${subject}/${index}: art`);
      if (question.choiceKind === "picture") for (const choice of question.options) assert.ok(artExists(choice), `${age}/${subject}/${index}: choice art`);
      if (question.count) assert.equal(question.count, question.answer);
      if (question.operator) assert.equal(question.operator === "+" ? question.left + question.right : question.left - question.right, question.answer);
      if (subject === "math" && typeof question.answer === "number") assert.ok(question.answer >= 0 && question.answer <= (age === "eight" ? 1000 : 100));
      if (subject === "english") for (const choice of question.options) assert.ok(soundExists(englishFile(choice)), `${age}/english/${index}: ${choice} sound`);
    }
  }
}
for (const name of ["music-variety", "applause", "sparkle", "fanfare", "try-again", "level-up", "dress-up", "praise", "praise-1", "praise-2", "praise-3", "retry", "retry-1", "retry-2", "reveal", "complete"]) assert.ok(soundExists(name));
const example = AGE_QUESTIONS.six.hangul[0];
assert.deepEqual(answerProgress(example, example.answer, false), { correct: true, awardStar: true });
assert.deepEqual(answerProgress(example, example.answer, true), { correct: true, awardStar: false });
assert.deepEqual(answerProgress(example, example.options.find(choice => choice !== example.answer), true), { correct: false, awardStar: false });
assert.match(answerFeedback(example, "hangul", "butterfly", 1, false).detail, /맨 앞 소리/);
assert.match(answerFeedback(example, "hangul", "apple", 2, false).detail, /가방/);
assert.match(answerFeedback(example, "hangul", example.answer, 1, false).detail, /가방/);
assert.notEqual(answerFeedback(example, "hangul", example.answer, 0, false).title, answerFeedback(example, "hangul", example.answer, 0, false, 1).title);
assert.match(answerFeedback(example, "hangul", example.answer, 0, false, 0, true).title, /도움/);
assert.match(answerFeedback(example, "hangul", "apple", 2, false).detail, /직접 답/);
assert.match(answerFeedback(AGE_QUESTIONS.seven.math[0], "math", 11, 0, false).detail, /2 \+ 9 = 11/);
assert.match(answerFeedback(AGE_QUESTIONS.seven.english[30], "english", "strawberry", 0, false).detail, /딸기/);
const twoStep = AGE_QUESTIONS.eight.math[140];
assert.match(answerFeedback(twoStep, "math", twoStep.options.find(choice => choice !== twoStep.answer), 1, false).detail, /앞의 두 수/);
const progress = { stars: 0, completedStages: [] };
assert.equal(ageUnlocked("__proto__", progress), false);
assert.equal(stageUnlocked("six", "hangul", 0, progress), true);
assert.equal(stageUnlocked("six", "hangul", 1, progress), false);
progress.stars = 5;
progress.completedStages.push("hangul:0");
assert.equal(stageUnlocked("six", "hangul", 1, progress), true);
progress.stars = 74;
progress.completedStages.push("hangul:9");
assert.equal(ageUnlocked("seven", progress), false);
progress.stars = 75;
assert.equal(ageUnlocked("seven", progress), true);
assert.equal(stageUnlocked("seven", "math", 0, progress), true);
progress.stars = 199;
progress.completedStages.push("seven:math:14");
assert.equal(ageUnlocked("eight", progress), false);
progress.stars = 200;
assert.equal(ageUnlocked("eight", progress), true);
assert.equal(ageUnlocked("eight", { stars: 200, completedStages: ["seven:math:14"] }), false);
assert.equal(stageUnlocked("eight", "english", 0, progress), true);
assert.equal(stageUnlocked("eight", "english", 1, progress), false);
progress.stars = 205;
progress.completedStages.push("eight:english:0");
assert.equal(stageUnlocked("eight", "english", 1, progress), true);
const badgeProgress = { stars: 0, completedStages: [], retryWins: [], rememberedStages: [], bestStreak: 0 };
assert.equal(earnedBadges(badgeProgress).length, 0);
badgeProgress.stars = 1;
badgeProgress.retryWins.push("six:hangul:0");
badgeProgress.rememberedStages.push("hangul:0");
badgeProgress.bestStreak = 3;
for (const title of ["첫 반짝", "다시 해냈어", "기억 탐험가", "반짝 연속"]) assert.ok(earnedBadges(badgeProgress).some(badge => badge.title === title));
badgeProgress.reviewedQuestions = ["six:math:0", "six:english:0", "six:english:4"];
badgeProgress.adventures = 3;
for (const title of ["기억이 쑥쑥", "세상 탐험가"]) assert.ok(earnedBadges(badgeProgress).some(badge => badge.title === title));
assert.equal(activityFor(AGE_QUESTIONS.six.math[27], "math"), null, "comparisons retain their essential choices");
assert.equal(activityFor(AGE_QUESTIONS.six.english[15], "english"), null, "single letter questions keep their choices");
assert.equal(activityFor(AGE_QUESTIONS.eight.english[30], "english").kind, "sentence");
assert.equal(activityTiles(AGE_QUESTIONS.six.english[2], activityFor(AGE_QUESTIONS.six.english[2], "english")).filter(token => token === "P").length, 2);
assert.deepEqual(validQuestionIds(["six:math:0", "six:math:0", "eight:english:164", "six:math:165", "__proto__:math:0", "six:math:-1", "six:math:01", null]), ["six:math:0", "eight:english:164"]);
assert.deepEqual(reviewAfterAnswer(["six:math:0", "six:english:0"], "six:math:0", true), ["six:english:0"]);
assert.deepEqual(reviewAfterAnswer(["six:math:0", "six:english:0"], "six:math:0", false), ["six:english:0", "six:math:0"]);
for (let turn = 0; turn < 20; turn++) {
  const beginner = { stars: 0, completedStages: [], earnedQuestions: ["six:math:0"], adventures: turn };
  const trip = adventureQuestions("six", beginner);
  assert.equal(trip.length, 5);
  assert.equal(new Set(trip).size, 5);
  assert.equal(new Set(trip.map(id => questionFromId(id).subject)).size, 3);
  assert.ok(trip.every(id => questionFromId(id).index < 5));
  assert.ok(!trip.includes("six:math:0"), "prefer unearned questions");
  assert.deepEqual(adventureQuestions("eight", beginner), [], "never bypass age locks");
}
assert.match(answerFact(AGE_QUESTIONS.seven.math[0], "math"), /10을 만들고/);
assert.match(answerFact(AGE_QUESTIONS.eight.hangul[110], "hangul"), /글 속 단서.*씨앗/);
assert.match(answerFact(AGE_QUESTIONS.eight.english[30], "english"), /나는 행복해.*I am happy/);
console.log("1,500문제, 300단계, 조립·수 만들기·탐험·복습·잠금·그림·소리 확인 완료", activities);
