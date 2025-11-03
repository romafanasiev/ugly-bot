type Answer = {
  text: string;
  isCorrect: boolean;
};

type Question = {
  question: string;
  answers: Answer[];
};

export type QuizMainProps = {
  question: Question;
  onNext: () => void;
  isLast: boolean;
  setLastDelta: (value: "up" | "down") => void;
};
