import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { LEVELS, QUESTIONS, gradeAnswer, answerProgress } from "./app.js";
import { EMOJI_ART } from "./extra-content.js";

const artExists = id => id in EMOJI_ART || existsSync(new URL(`./assets/${id}.webp`, import.meta.url));
const soundExists = name => existsSync(new URL(`./audio/${name}.mp3`, import.meta.url));

for (const [subject, round] of Object.entries(QUESTIONS)) {
  assert.equal(LEVELS[subject].length, 20, `${subject}: 20단계`);
  assert.equal(round.length, 100, `${subject}: 100문제`);
  for (const [index, question] of round.entries()) {
    assert.equal(question.options.length, 3);
    assert.equal(new Set(question.options).size, 3);
    assert.ok(question.options.includes(question.answer));
    assert.ok(gradeAnswer(question, question.answer));
    assert.ok(question.options.filter(choice => gradeAnswer(question, choice)).length === 1);
    assert.ok(soundExists(`q-${subject}-${index}`), `${subject} ${index + 1}: 안내 음성`);
    if (question.object) assert.ok(artExists(question.object), `${subject} ${index + 1}: 그림`);
    if (question.choiceKind === "picture") {
      for (const choice of question.options) assert.ok(artExists(choice), `${subject} ${index + 1}: 선택 그림`);
    }
    if (question.count) assert.equal(question.count, question.answer);
    if (question.operator) assert.equal(question.operator === "+" ? question.left + question.right : question.left - question.right, question.answer);
    if (subject === "math" && typeof question.answer === "number") assert.ok(question.answer >= 1 && question.answer <= 20);
    if (subject === "english") for (const choice of question.options) {
      assert.ok(soundExists(`en-${String(choice).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`));
    }
  }
}
for (const name of ["music-variety", "applause", "sparkle", "fanfare", "try-again", "level-up", "dress-up", "praise", "retry", "complete"]) assert.ok(soundExists(name));
const example = QUESTIONS.hangul[0];
assert.deepEqual(answerProgress(example, example.answer, false), { correct: true, awardStar: true });
assert.deepEqual(answerProgress(example, example.answer, true), { correct: true, awardStar: false });
assert.deepEqual(answerProgress(example, example.options.find(choice => choice !== example.answer), true), { correct: false, awardStar: false });
console.log("학습 문제 300개, 60단계, 그림과 소리 파일 확인 완료");
