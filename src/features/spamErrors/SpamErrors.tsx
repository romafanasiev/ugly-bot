'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { devilPhrases } from './devilPhrases';

const getRandomDelay = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const SpamErrors = () => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const startRandomInterval = () => {
      const delay = getRandomDelay(1000, 10000);
      const randomIndex = Math.floor(Math.random() * devilPhrases.length);
      const randomPhrase = devilPhrases[randomIndex];

      intervalRef.current = setTimeout(() => {
        setCount((prevCount) => prevCount + 1);

        toast.error(randomPhrase, {
          style: {
            background: 'var(--color-notification-background-error)',
            borderColor: 'transparent',
          },
          icon: false,
        });
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

  return <div>SpamErrors: {count}</div>;
};

export default SpamErrors;
