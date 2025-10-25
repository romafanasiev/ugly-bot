'use client';

import { useEffect, useRef, useState } from 'react';
import { devilPhrases } from './devilPhrases';
import { AnimatePresence, motion } from 'motion/react';
import { Typography } from '@mui/material';

const getRandomDelay = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const SpamErrors = () => {
  const [phrase, setPhrase] = useState('');
  const intervalRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const startRandomInterval = () => {
      const delay = getRandomDelay(1000, 10000);
      const randomIndex = Math.floor(Math.random() * devilPhrases.length);
      const randomPhrase = devilPhrases[randomIndex];

      intervalRef.current = setTimeout(() => {
        if (phrase.length > 0) {
          setPhrase('');
          startRandomInterval();
          return;
        }

        setPhrase(randomPhrase);
        startRandomInterval();
      }, delay);
    };

    startRandomInterval();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-2 right-4">
      <AnimatePresence mode="wait">
        {phrase.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex max-w-[320px] gap-1"
            key={phrase}
          >
            <Typography className="bg-error rounded p-2">{phrase}</Typography>
            <img src="/devil_head.png" alt="devil" className="h-16" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpamErrors;
