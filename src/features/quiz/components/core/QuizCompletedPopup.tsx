import { useRouter } from "next/navigation";
import { getMascotComments } from "../utils/mascotComments";
import { GravestoneWrapper, PrimaryButton } from '@/src/shared';

type Props = {
  soulPoints: number;
};

export default function QuizCompletedPopup({ soulPoints }: Props) {
  const router = useRouter();

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-40" />
      <GravestoneWrapper
        className="
          relative z-50 max-w-md w-full p-8 
          flex flex-col items-center justify-center text-center
          text-[#ffe6e6]
          rounded-2xl
        "
      >
        <h2 className="text-3xl font-extrabold mb-4 tracking-wide drop-shadow-[0_0_8px_rgba(255,0,0,0.9)]">
          Quiz Completed
        </h2>

        <p className="mb-2 text-lg">
          Soul Integrity:{" "}
          <span className="font-bold text-yellow-400 drop-shadow-[0_0_6px_rgba(255,255,0,0.7)]">
            {soulPoints}%
          </span>
        </p>

        <div
          className="
            relative mb-6 px-4 py-3 rounded-lg
            bg-black/40 
            shadow-[0_0_12px_2px_rgba(0,0,0,0.4)]
            max-w-sm
          "
          style={{
              backgroundImage: "url('/marble_tile_gray.jpg')",
              }}
        >
          <p className="italic sm:text-lg md:text-xl text-white-400">
            {getMascotComments(soulPoints)}
          </p>
        </div>

        <PrimaryButton
          onClick={() => router.push("/chatbot")}
        >
          Proceed to Chat
        </PrimaryButton>
      </GravestoneWrapper>
    </div>
  );
}
