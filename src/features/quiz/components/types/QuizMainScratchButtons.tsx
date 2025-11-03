"use client";
import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "@/src/shared";
import { useUserStore } from "@/src/shared/store/hooks/useUserStore";
import { SOUL_DELTA } from "../utils/constants";
import type { QuizMainProps } from "../utils/types";

export default function QuizMainScratchButtons({
  question,
  onNext,
  isLast,
  setLastDelta,
}: QuizMainProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [scratched, setScratched] = useState<boolean[]>(
    Array(question.answers.length).fill(false)
  );
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  const increaseSoul = useUserStore((s) => s.increaseSoulPoints);
  const decreaseSoul = useUserStore((s) => s.decreaseSoulPoints);

  useEffect(() => {
  const cleanupFns: (() => void)[] = [];

  question.answers.forEach((_, idx) => {
    const canvas = canvasRefs.current[idx];
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement as HTMLElement;
    const w = parent.offsetWidth;
    const h = parent.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, w, h);

    let isDrawing = false;

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY =
        "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
    };

    const start = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      scratch(e);
    };
    const stop = () => {
      isDrawing = false;
      checkCleared();
    };

    const checkCleared = () => {
      const pixels = ctx.getImageData(0, 0, w, h).data;
      let cleared = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) cleared++;
      }
      if (cleared / (w * h) > 0.7) {
        setScratched((prev) =>
          prev.map((val, j) => (j === idx ? true : val))
        );
      }
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", scratch);
    window.addEventListener("mouseup", stop);
    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchmove", scratch);
    window.addEventListener("touchend", stop);

    cleanupFns.push(() => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", scratch);
      window.removeEventListener("mouseup", stop);
      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", scratch);
      window.removeEventListener("touchend", stop);
    });
  });

    return () => cleanupFns.forEach((fn) => fn());
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
        {question.answers.map((answer, idx) => (
          <div key={idx} className="relative w-full">
            <button
              className={`w-full py-3 rounded-lg border transition-colors duration-300
                ${
                  selected === idx
                    ? "bg-orange-400 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-orange-200"
                }
                ${scratched[idx] ? "cursor-pointer" : "opacity-60 cursor-not-allowed"}
              `}
              onClick={() => scratched[idx] && setSelected(idx)}
            >
              {answer.text}
            </button>

            <canvas
              ref={(el) => {
                if (el) canvasRefs.current[idx] = el;
              }}
              className={`absolute inset-0 rounded-lg transition-opacity duration-500
                ${scratched[idx] ? "opacity-0 pointer-events-none" : "opacity-100"}
              `}
            />
          </div>
        ))}
      </div>

      <PrimaryButton onClick={handleAnswer} disabled={selected === null}>
        {isLast ? "Finish" : "Confirm"}
      </PrimaryButton>
    </div>
  );
}
