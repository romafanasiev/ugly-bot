'use client';

import { faker } from '@faker-js/faker';
import { Button, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import RunAwayButton from '../runAwayButton/RunAwayButton';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/src/shared/constants/ROUTES';
import { useUserStore } from '@/src/shared/store/hooks/useUserStore';
import { APP_CONFIG } from '@/src/shared/config';
import { GravestoneWrapper, PrimaryButton, SecondaryButton } from '@/src/shared';

const generateName = () => faker.person.fullName();

const STEPS = {
  INTRODUCTION: 'introduction',
  NAME: 'name',
  SELECTED_NAME: 'selected_name',
  CONTRACT: 'contract',
} as const;

const blockStyle = 'flex grow flex-col items-center justify-center gap-2';

const Contract = () => {
  const router = useRouter();

  const { setName: setUserName } = useUserStore((state) => state);

  const [name, setName] = useState('');
  const [isNameRegenerate, setIsNameRegenerate] = useState(false);
  const [currentStep, setCurrentStep] = useState<(typeof STEPS)[keyof typeof STEPS]>(STEPS.INTRODUCTION);

  const isIntroductionStep = currentStep === STEPS.INTRODUCTION;
  const isNameStep = currentStep === STEPS.NAME;
  const isContractStep = currentStep === STEPS.CONTRACT;
  const isSelectedNameStep = currentStep === STEPS.SELECTED_NAME;
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (name.length > 0) return;

    changeName(true);
  }, []);

  const changeName = (skip = false) => {
    setName(generateName());

    if (isNameRegenerate || skip) return;

    setIsNameRegenerate(true);
  };

  const selectName = () => {
    setUserName(name);
    setCurrentStep(STEPS.SELECTED_NAME);
  };

  const onAccept = async () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    await new Promise((resolve) => setTimeout(resolve, APP_CONFIG.LAUGH_AUDIO_DURATION - 1000));

    setCurrentStep(STEPS.INTRODUCTION);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <GravestoneWrapper className="w-full max-w-md shrink-0">
        {isIntroductionStep && (
          <div className={blockStyle}>
            <Typography className="text-center" variant="h2">
              Welcome to Hell Chat, lost soul.
            </Typography>
            <PrimaryButton onClick={() => setCurrentStep(STEPS.NAME)}>Hello</PrimaryButton>
          </div>
        )}
        {isNameStep && (
          <div className={blockStyle}>
            <Typography className="text-center" variant="h2">
              {!isNameRegenerate ? (
                <>
                  Let’s introduce ourselves.
                  <br />
                  I’m Devil. And your name must be:
                </>
              ) : (
                'You dare to tell me I made a mistake? Hah, lowly human! Okay, I’ll give you another try. So, your name is:'
              )}
            </Typography>

            <Typography className="bg-gray-light text-primary w-full rounded-full p-2 text-center">
              {name.length > 0 ? name : <span className="opacity-0">Generating name...</span>}
            </Typography>
            <div className="flex justify-center gap-2">
              <SecondaryButton onClick={() => changeName(false)}>No</SecondaryButton>
              <PrimaryButton onClick={selectName}>Yes</PrimaryButton>
            </div>
          </div>
        )}
        {(isSelectedNameStep || isContractStep) && (
          <div className={blockStyle}>
            <Typography className="text-center" variant="h2">
              Fantastic, I know I’m always right! Now let us proceed to the contract.
            </Typography>
            <PrimaryButton onClick={() => setCurrentStep(STEPS.CONTRACT)}>What??</PrimaryButton>
          </div>
        )}
      </GravestoneWrapper>
      <AnimatePresence>
        {isContractStep && (
          <motion.div
            initial={{ opacity: 0, y: '-200dvh' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '200dvh' }}
            transition={{ duration: 2 }}
            className="absolute z-20 h-dvh w-dvw bg-red-500"
          >
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-2">
              <Typography variant="h3" className="font-horrorfind rounded-full">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              </Typography>

              <RunAwayButton />
              <Button onClick={onAccept} sx={{ position: 'absolute', top: '80%', right: '10%' }}>
                Accept
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <audio src="/audio/laugh.mp3" ref={audioRef} onEnded={() => router.push(ROUTES.CHATBOT)} />
    </div>
  );
};

export default Contract;
