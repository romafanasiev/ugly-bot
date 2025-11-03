import { questions } from "./questions";
import type { Question, QuestionType } from "./questions";

const allTypes: QuestionType[] = [
  "timed",
  "scratch",
  "confirm-flood",
  "guessbutton",
  "sliders",
  "fading",
];

export function generateUniqueQuizSet(limit = 3): (Question & { type: QuestionType })[] {
  const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  const selected = shuffledQuestions.slice(0, limit);
  const shuffledTypes = [...allTypes].sort(() => Math.random() - 0.5);

  return selected.map((q, i) => ({
    ...q,
    type: shuffledTypes[i % shuffledTypes.length],
  }));
}
