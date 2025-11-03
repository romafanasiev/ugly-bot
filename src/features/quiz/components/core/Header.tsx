'use client';

import localFont from 'next/font/local';

const horrorfind = localFont({
  src: '../../../../../public/fonts/Horrorfind.ttf',
  variable: '--font-horrorfind',
});

type QuizHeaderProps = {
  soulPoints: number;
  currentQuestion: number;
  totalQuestions: number;
 lastDelta: "up" | "down" | null;
};

export default function QuizHeader({
  soulPoints,
  currentQuestion,
  totalQuestions,
  lastDelta,
}: QuizHeaderProps) {
  return (
    <header className="relative flex items-center justify-between w-full text-[24px]">
        <div className="transition-colors duration-500">
            Soul:{" "}
            <span
                className={`
                ${lastDelta === "up" ? "text-green-400" : ""}
                ${lastDelta === "down" ? "text-red-400" : ""}
                `}
            >
                {soulPoints}%
            </span>
        </div>

      <h1
        className={`${horrorfind.className} text-[32px] font-normal leading-[130%] tracking-[2px] text-[#F8F9F9] absolute left-1/2 -translate-x-1/2 flex-1 text-center`}
      >
        Quiz
      </h1>

      <div className="flex gap-2">
        {[...Array(totalQuestions)].map((_, i) => (
          <span
            key={i}
            className={`transition ${
              i < currentQuestion
                ? 'opacity-40'
                : 'opacity-100 drop-shadow-[0_0_10px_orange]'
            }`}
          >
            🕯️
          </span>
        ))}
      </div>
    </header>
  );
}
