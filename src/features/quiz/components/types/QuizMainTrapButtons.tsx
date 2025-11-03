"use client";
import { useState, useMemo } from "react";
import { PrimaryButton } from "@/src/shared";
import { useUserStore } from "@/src/shared/store/hooks/useUserStore";
import { SOUL_DELTA } from "../utils/constants";
import type { QuizMainProps } from "../utils/types";

export default function QuizMainTrapButtons({
  question,
  onNext,
  isLast,
  setLastDelta,
}: QuizMainProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [disabledAnswers, setDisabledAnswers] = useState<boolean[]>(
    Array(question.answers.length).fill(false)
  );
  const [activeGates, setActiveGates] = useState([0, 1, 2]); 

  const increaseSoul = useUserStore((s) => s.increaseSoulPoints);
  const decreaseSoul = useUserStore((s) => s.decreaseSoulPoints);

  const correctGate = useMemo(
    () => Math.floor(Math.random() * activeGates.length), 
    []
  );

  function handleGateClick(gateIdx: number) {
    if (selected === null) return;

    if (gateIdx === correctGate) {
      if (question.answers[selected].isCorrect) {
        increaseSoul(SOUL_DELTA);
        setLastDelta("up");
      } else {
        decreaseSoul(SOUL_DELTA);
        setLastDelta("down");
      }

      onNext();
    } else {
      setActiveGates((prev) => prev.filter((i) => i !== gateIdx));
      setDisabledAnswers((prev) =>
        prev.map((d, i) => (i === selected ? true : d))
      );
      setSelected(null);
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-center mb-4">{question.question}</p>

      <div className="flex flex-col gap-3 mb-6 w-full">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            disabled={disabledAnswers[i]}
            onClick={() => setSelected(i)}
            className={`w-full py-2 rounded-lg border transition
              ${
                selected === i
                  ? "bg-orange-400 text-white"
                  : disabledAnswers[i]
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-gray-200 text-gray-800 hover:bg-orange-200"
              }
            `}
          >
            {answer.text}
          </button>
        ))}
      </div>

      <div className="flex w-full justify-center">
        {activeGates.map((idx) => (
          <PrimaryButton
            key={idx}
            onClick={() => handleGateClick(idx)}
            disabled={selected === null}
          >
            Gate {idx + 1}
          </PrimaryButton>
        ))}
      </div>
    </div>
  );
}
