"use client";
import { useEffect, useState } from "react";
import { PrimaryButton, CountdownBar } from "@/src/shared";
import { useUserStore } from "@/src/shared/store/hooks/useUserStore";
import { SOUL_DELTA } from "../utils/constants";
import type { QuizMainProps } from "../utils/types";

export default function QuizMainTimed({ question, onNext, isLast, setLastDelta }: QuizMainProps) {
  const [selected, setSelected] = useState<number | null>(null); 
  const [finalChoice, setFinalChoice] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);

  const increaseSoul = useUserStore((s) => s.increaseSoulPoints);
  const decreaseSoul = useUserStore((s) => s.decreaseSoulPoints);

  useEffect(() => {
    if (timeLeft <= 0 && finalChoice === null) {
      triggerRandomAnswer();
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, finalChoice]);

  function triggerRandomAnswer() {
    const randomIndex = Math.floor(Math.random() * question.answers.length);
    setFinalChoice(randomIndex);
    setTimeout(() => {
      handleAnswer(randomIndex);
    }, 500);
  }

  function handleConfirm() {
    if (selected !== null) {
      setFinalChoice(selected);
      handleAnswer(selected);
    }
  }

  function handleAnswer(idx: number) {
    if (question.answers[idx].isCorrect) {
      increaseSoul(SOUL_DELTA);
      setLastDelta("up");
    } else {
      decreaseSoul(SOUL_DELTA);
      setLastDelta("down");
    }

    onNext();
  }

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-center mb-4">{question.question}</p>
      <p className="text-red-500 mb-2">Time left: {timeLeft}s</p>

      <div className="w-full mb-4">
        <CountdownBar />
      </div>

      <div className="flex flex-col gap-3 mb-6 w-full">
        {question.answers.map((a, i) => {
          const isUserChoice = selected === i;
          const isFinal = finalChoice === i;

          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              disabled={finalChoice !== null}
              className={`w-full py-2 rounded-lg border transition
                ${ 
                  isUserChoice
                    ? "bg-orange-500 text-white"
                    : isFinal 
                    ? "bg-gray-400 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-orange-200"}
              `}
            >
              {a.text}
            </button>
          );
        })}
      </div>

      <PrimaryButton
        onClick={handleConfirm}
        disabled={selected === null || finalChoice !== null}
      >
        {isLast ? "Finish" : "Confirm"}
      </PrimaryButton>
    </div>
  );
}
