"use client";
import { useState, useEffect } from "react";
import { PrimaryButton } from "@/src/shared";
import { useUserStore } from "@/src/shared/store/hooks/useUserStore";
import { SOUL_DELTA } from "../utils/constants";
import type { QuizMainProps } from "../utils/types";

export default function QuizMainFadingAnswers({
  question,
  onNext,
  isLast,
  setLastDelta,
}: QuizMainProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [hidden, setHidden] = useState<boolean[]>(
    Array(question.answers.length).fill(false)
  );

  const increaseSoul = useUserStore((s) => s.increaseSoulPoints);
  const decreaseSoul = useUserStore((s) => s.decreaseSoulPoints);

  useEffect(() => {
    question.answers.forEach((_, i) => {
      setTimeout(() => {
        setHidden((prev) => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });
      }, (i + 1) * 4000);
    });
  }, [question.answers]);

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
        {question.answers.map((answer, i) => {
          const isSelected = selected === i;
          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative z-10 w-full min-h-[48px] py-2 rounded-lg border-2 overflow-hidden transition 
                ${isSelected
                  ? "border-orange-500 ring-2 ring-orange-300"
                  : "border-gray-300"
                }
                ${
                  isSelected
                    ? "bg-orange-400 text-white"
                    : hidden[i]
                    ? "bg-gray-300 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-orange-200"
                }`}
            >
              <span
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-2000 ${
                  hidden[i] ? "opacity-0" : "opacity-100"
                }`}
              >
                {answer.text}
              </span>

              <div
                className={`absolute inset-0 flex flex-col items-center justify-center bg-cover bg-center transition-opacity duration-2000 pointer-events-none z-0 ${
                  hidden[i] ? "opacity-100" : "opacity-0"
                }`}
                style={{ backgroundImage: "url('/marble_tile_white.png')" }}
              >
                <span className="text-gray-600 text-xl font-semibold drop-shadow-md">
                  Answer {i + 1}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <PrimaryButton onClick={handleAnswer} disabled={selected === null}>
        {isLast ? "Finish" : "Confirm"}
      </PrimaryButton>
    </div>
  );
}
