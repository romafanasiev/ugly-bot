"use client";
import { useState } from "react";
import { PrimaryButton, Switch } from "@/src/shared";
import { useUserStore } from "@/src/shared/store/hooks/useUserStore";
import { SOUL_DELTA, SOUL_WORDS } from "../utils/constants";
import type { QuizMainProps } from "../utils/types";

export default function QuizMainOverlaySwitches({
  question,
  onNext,
  isLast,
  setLastDelta,
}: QuizMainProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [switches, setSwitches] = useState([false, false, false]);

  const increaseSoul = useUserStore((s) => s.increaseSoulPoints);
  const decreaseSoul = useUserStore((s) => s.decreaseSoulPoints);

  function toggleSwitch(idx: number) {
    setSwitches((prev) => {
      let newSwitches = [...prev];

      if (newSwitches[idx]) {
        newSwitches[idx] = false;
      } else {
        const active = prev.map((v, i) => (v ? i : -1)).filter((i) => i !== -1);

        if (active.length === 2) {
          if (idx === 0 && active.includes(1) && active.includes(2)) {
            newSwitches[1] = false;
          } else if (idx === 1 && active.includes(0) && active.includes(2)) {
            newSwitches[2] = false; 
          } else {
            newSwitches[active[0]] = false;
          }
        }

        newSwitches[idx] = true;
      }

      return newSwitches;
    });
  }

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
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full flex flex-col items-center z-0 mb-14">
        {switches.map((active, idx) => (
          <div
            key={idx}
            className={`
              absolute top-0 bottom-0 z-20 rounded-lg
              drop-shadow-[0_0_10px_rgba(0,0,0,0.7)]
              bg-cover bg-center flex flex-col items-center justify-between
              transition-opacity duration-800 
              ${active ? "opacity-0 pointer-events-none" : "opacity-100"}
            `}
            style={{
              left: `${idx * 33.6}%`,
              width: "32.8%",
              backgroundImage: "url('/marble_tile_white.png')",
            }}
          >
            <div className="flex-grow flex items-center justify-center">
              <span className="text-red-700 text-sm md:text-xl font-bold drop-shadow-[0_0_15px_rgba(255,0,0,0.7)] bg-black/30 px-4 py-1 rounded-lg tracking-wide uppercase mt-4">
                {SOUL_WORDS[idx]}
              </span>
            </div>

            <span className="text-gray-200 text-lg font-semibold bg-black/40 px-2 py-1 rounded mb-4">
              {idx === 0 && new Date().getDate()}
              {idx === 1 && new Date().toLocaleString("en-US", { month: "long" })}
              {idx === 2 && new Date().getFullYear()}
            </span>
          </div>
        ))}

        <p className="text-center mb-4 z-10 relative">{question.question}</p>

        <div className="flex flex-col gap-3 mb-6 w-full relative z-10">
          {question.answers.map((answer, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full py-2 rounded-lg border transition
                ${selected === i ? "bg-orange-400 text-white" : "bg-gray-200 text-gray-800 hover:bg-orange-200"}
              `}
            >
              {answer.text}
            </button>
          ))}
        </div>

        <PrimaryButton
          onClick={handleAnswer}
          disabled={selected === null}
          className="relative z-10"
        >
          {isLast ? "Finish" : "Confirm"}
        </PrimaryButton>
      </div>

      <div className="absolute bottom-0 w-full flex justify-center gap-8 bg-transparent z-30">
        {switches.map((active, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <Switch
              checked={active}
              onChange={() => toggleSwitch(idx)}
              color="warning"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
