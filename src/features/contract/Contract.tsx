'use client';

import { faker } from '@faker-js/faker';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import RunAwayButton from '../runAwayButton/RunAwayButton';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/src/shared/constants/ROUTES';
import { useUserStore } from '@/src/shared/store/hooks/useUserStore';

const generateName = () => faker.person.fullName();

const Contract = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [isNameSelected, setIsNameSelected] = useState(false);
  const { setName: setUserName } = useUserStore((state) => state);

  useEffect(() => {
    if (name.length > 0) return;

    changeName();
  }, []);

  const changeName = () => {
    setName(generateName());
  };

  const selectName = () => {
    setUserName(name);
    setIsNameSelected(true);
  };

  const onAccept = () => {
    router.push(ROUTES.QUIZ);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <Typography component="h1" variant="h1">
        Hi, thats your name?
      </Typography>
      <Typography>{name.length > 0 ? name : <span className="opacity-0">Generating name...</span>}</Typography>
      <div className="flex justify-between gap-2">
        <Button onClick={changeName}>Change Name</Button>
        <Button onClick={selectName}>Select Name</Button>
      </div>
      <AnimatePresence>
        {isNameSelected && (
          <motion.div
            initial={{ opacity: 0, y: '-200dvh' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '200dvh' }}
            transition={{ duration: 2 }}
            className="absolute z-20 h-dvh w-dvw bg-red-500"
          >
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-2">
              <Typography className="font-horrorfind" variant="h3">
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
    </div>
  );
};

export default Contract;
