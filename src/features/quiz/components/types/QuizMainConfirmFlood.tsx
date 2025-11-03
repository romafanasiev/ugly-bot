"use client";
import { useState } from "react";
import { PrimaryButton } from "@/src/shared";
import { useUserStore } from "@/src/shared/store/hooks/useUserStore";
import { SOUL_DELTA, POPUP_MESSAGES } from "../utils/constants";
import type { QuizMainProps } from "../utils/types";

export default function QuizMainConfirmFlood({
  question,
  onNext,
  isLast,
  setLastDelta,
}: QuizMainProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [popupStep, setPopupStep] = useState(0);

  const increaseSoul = useUserStore((s) => s.increaseSoulPoints);
  const decreaseSoul = useUserStore((s) => s.decreaseSoulPoints);

  const handleYes = () => {
    if (popupStep < POPUP_MESSAGES.length) {
      setPopupStep((s) => s + 1);
    } else {
      handleAnswer();
    }
  };

  const handleNo = () => {
    setPopupStep(0);
    setSelected(null);
  };

  function handleAnswer() {
    if (selected === null) return;

    if (question.answers[selected].isCorrect) {
      increaseSoul(SOUL_DELTA);
      setLastDelta("up");
    } else {
      decreaseSoul(SOUL_DELTA);
      setLastDelta("down");
    }

    setPopupStep(0);
    setSelected(null);

    onNext();
  }
  

  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="w-full p-3 flex flex-col items-center">
        <p className="text-center mb-4">{question.question}</p>

        {/* Відповіді */}
        <div className="flex flex-col gap-3 mb-6 w-full">
          {question.answers.map((answer, i) => (
            <button
              key={i}
              onClick={() => {
                setSelected(i);
              }}
              className={`w-full py-3 rounded-lg border transition
                ${
                  selected === i
                    ? "bg-orange-400 text-white" // вибрана — без hover
                    : "bg-gray-200 text-gray-800 hover:bg-orange-200 hover:shadow-md"
                }
              `}
            >
              {answer.text}
            </button>
          ))}
        </div>

        <PrimaryButton
          onClick={() => {
            if (selected !== null) {
              setPopupStep(1); // відкриває попап тільки після Confirm
            }
          }}
          disabled={selected === null}
        >
          {isLast ? "Finish" : "Confirm"}
        </PrimaryButton>
      </div>

      {/* Попап поверх */}
      {popupStep > 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-50 p-3">
          {/* затемнений фон */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl rounded-2xl z-40" />

          {/* сам попап */}
          <div className="
              relative z-50
              bg-gradient-to-b from-[#3a0000] to-[#660000]
              border-2 border-red-600
              shadow-[0_0_25px_5px_rgba(255,0,0,0.7)]
              p-6 rounded-xl text-center max-w-sm
              text-[#ffe6e6]
          ">
            <p className="mb-4 text-lg font-semibold">
              {POPUP_MESSAGES[popupStep - 1]}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleNo}
                className="px-4 py-2 rounded bg-red-700 text-white hover:bg-red-800 shadow-[0_0_10px_2px_rgba(255,80,0,0.7)]"
              >               
                No ❌
              </button>
              <button
                onClick={handleYes}
                className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800"      
              >
                Yes 🔥
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
