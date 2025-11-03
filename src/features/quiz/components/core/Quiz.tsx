'use client';
import { useState, useEffect } from 'react';
import { GravestoneWrapper } from '@/src/shared';
import { motion } from 'framer-motion';
import { useUserStore } from '@/src/shared/store/hooks/useUserStore';
import { QuizMainDefault, QuizMainTimed, ScratchButtons, QuizMainConfirmFlood, QuizMainGuessButton, QuizMainOverlaySliders, QuizMainFadingAnswers } from '../types';
import type { QuestionType, Question } from '../utils/questions';
import { TOTAL_QUESTIONS } from "../utils/constants";
import { generateUniqueQuizSet } from '../utils/generateUniqueQuizSet';
import QuizHeader from './Header';
import QuizCompletedPopup from './QuizCompletedPopup' 

function renderMain(q: Question & { type: QuestionType }, props: any) {
  switch (q.type) {
    case "timed":
      return <QuizMainTimed question={q} {...props} />;
    case "scratch":
      return <ScratchButtons question={q} {...props} />; 
    case "confirm-flood":
      return <QuizMainConfirmFlood question={q} {...props} />; 
    case "guessbutton":
      return <QuizMainGuessButton  question={q} {...props} />;
    case "sliders":
      return <QuizMainOverlaySliders  question={q} {...props} />;
    case "fading":
      return <QuizMainFadingAnswers  question={q} {...props} />;
    default:
      return <QuizMainDefault question={q} {...props} />;
  }
}

const Quiz = () => {
  const { soulPoints } = useUserStore((state) => state);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [lastDelta, setLastDelta] = useState<null | "up" | "down">(null);
  const [userQuestions, setUserQuestions] = useState<(Question & { type: QuestionType })[]>([]);

  useEffect(() => {
    setUserQuestions(generateUniqueQuizSet(TOTAL_QUESTIONS));
  }, []);

    if (userQuestions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-300">
        <p>Loading your cursed questions...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: "-100vh" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 flex items-center justify-center bg-black/70 z-50"
      >
        <GravestoneWrapper className="max-w-md w-full p-8 flex flex-col items-center m-4">
           <QuizHeader
              soulPoints={soulPoints}
              currentQuestion={currentQuestion}
              totalQuestions={TOTAL_QUESTIONS}
              lastDelta={lastDelta}
            />
            {currentQuestion >= userQuestions.length ? (
            <QuizCompletedPopup soulPoints={soulPoints} />
            ) : (
              renderMain(userQuestions[currentQuestion], {
                onNext: () => setCurrentQuestion(q => q + 1),
                isLast: currentQuestion === userQuestions.length - 1,
                setLastDelta,
              })
            )}
        </GravestoneWrapper>
      </motion.div>
    </div>
  );
};

export default Quiz;
