import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { AGE_LEVELS, AGE_QUESTIONS, gradeAnswer, answerProgress, answerFeedback } from "./app.js";
import { EMOJI_ART } from "./extra-content.js";
import { MORE_EMOJI_ART } from "./expanded-content.js";

const artExists = id => id in EMOJI_ART || id in MORE_EMOJI_ART || existsSync(new URL(`./assets/${id}.webp`, import.meta.url));
const soundExists = name => existsSync(new URL(`./audio/${name}.mp3`, import.meta.url));
const englishFile = choice => `en-${String(choice).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`;
const counts = { hangul: 170, math: 165, english: 165 };
const seen = new Set();

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
      assert.ok(gradeAnswer(question, question.answer));
      assert.equal(question.options.filter(choice => gradeAnswer(question, choice)).length, 1);
      for (const attempts of [0, 1, 2]) {
        const choice = attempts ? question.options.find(option => option !== question.answer) : question.answer;
        const feedback = answerFeedback(question, subject, choice, attempts, false, index);
        assert.ok(feedback.detail && !feedback.detail.includes("undefined"), `${age}/${subject}/${index}: feedback`);
      }
      assert.ok(soundExists(`q-${age === "seven" ? "seven-" : ""}${subject}-${index}`), `${age}/${subject}/${index}: narration`);
      if (question.object) assert.ok(artExists(question.object), `${age}/${subject}/${index}: art`);
      if (question.choiceKind === "picture") for (const choice of question.options) assert.ok(artExists(choice), `${age}/${subject}/${index}: choice art`);
      if (question.count) assert.equal(question.count, question.answer);
      if (question.operator) assert.equal(question.operator === "+" ? question.left + question.right : question.left - question.right, question.answer);
      if (subject === "math" && typeof question.answer === "number") assert.ok(question.answer >= 0 && question.answer <= 100);
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
assert.match(answerFeedback(AGE_QUESTIONS.seven.math[0], "math", 11, 0, false).detail, /2 \+ 9 = 11/);
assert.match(answerFeedback(AGE_QUESTIONS.seven.english[30], "english", "strawberry", 0, false).detail, /딸기/);
console.log("1,000문제, 200단계, 정답·그림·소리 확인 완료");
