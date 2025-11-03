'use client';
import { useState } from 'react';
import { PrimaryButton } from '@/src/shared';
import { useUserStore } from '@/src/shared/store/hooks/useUserStore';
import { SOUL_DELTA } from "../utils/constants";
import type { QuizMainProps } from "../utils/types";

export default function QuizMainDefault({ question, onNext, isLast , setLastDelta }: QuizMainProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const increaseSoul = useUserStore((s) => s.increaseSoulPoints);
  const decreaseSoul = useUserStore((s) => s.decreaseSoulPoints);
  
  function handleAnswer() {
    if (selected === null) return;

    if (question.answers[selected].isCorrect) {
      increaseSoul(SOUL_DELTA);
      setLastDelta("up");
    } else {
      decreaseSoul(SOUL_DELTA);
      setLastDelta("down");
    }
    setSelected(null);

    onNext();
  }

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-center mb-4">{question.question}</p>

      <div className="flex flex-col gap-3 mb-6 w-full">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full py-2 rounded-lg border transition
            ${
              selected === i
                ? 'bg-orange-400 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-orange-200 hover:shadow-md'
            }
          `}
          >
            {answer.text}
          </button>
        ))}
      </div>

      <PrimaryButton onClick={handleAnswer} disabled={selected === null}>
        {isLast ? 'Finish' : 'Confirm'}
      </PrimaryButton>
    </div>
  );
};

