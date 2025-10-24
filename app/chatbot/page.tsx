'use client';

import { SpamErrors } from '@/src/features';
import { useChat } from '@ai-sdk/react';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { APP_CONFIG } from '@/src/shared/config';
import { PrimaryButton, SecondaryButton } from '@/src/shared';
import FireBackground from './FireBackground';
import { Typography } from '@mui/material';
import { useUserStore } from '@/src/shared/store/hooks/useUserStore';
import { faker } from '@faker-js/faker';

const buttonStyles = 'flex gap-2';
const buttonContainerStyles = 'flex gap-1';

const generateRandomNumber = () => {
  return faker.number.int({ min: 2, max: 5 });
};
const initialRandomNumber = generateRandomNumber();
export default function Chatbot() {
  const [message, setMessage] = useState('');
  const [pressLeft, setPressLeft] = useState(initialRandomNumber);

  const { messages, sendMessage } = useChat();

  const { soulPoints } = useUserStore((state) => state);
  const randomNumberRef = useRef<number>(initialRandomNumber);
  const lastPressRef = useRef<string>(null);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const values = e.currentTarget.dataset.values;

    if (!values || values.length === 0) return;

    if (message.length === 0) {
      setMessage(values[0]);
      return;
    }

    const lastSymbol = message[message.length - 1];
    const lastSymbolIndex = values.split('').findIndex((symbol) => symbol === lastSymbol);
    const newPressDate = dayjs().toISOString();

    if (lastSymbolIndex === -1) {
      setMessage(message + values[0]);
      return;
    }

    const prevText = message.slice(0, -1);
    const timeDiff = dayjs().diff(lastPressRef.current, 'ms');

    if (timeDiff > APP_CONFIG.DELAY_BETWEEN_PRESS) {
      setMessage(message + values[0]);
      lastPressRef.current = newPressDate;
      return;
    }

    lastPressRef.current = newPressDate;

    if (lastSymbolIndex === values.length - 1) {
      setMessage(prevText + values[0]);
      return;
    }

    setMessage(prevText + values[lastSymbolIndex + 1]);
  };

  const handleRemove = () => {
    setMessage(message.slice(0, -1));
  };

  const handleSendMessage = () => {
    // sendMessage({ text: message });
    setMessage('');
    lastPressRef.current = null;
  };

  const decreasePressLeft = () => {
    if (pressLeft === 0) return;
    console.log('decreasePressLeft', pressLeft);
    setPressLeft((prev) => prev - 1);
  };

  return (
    <div className="bg-primary fixed top-0 right-0 bottom-0 left-0 h-dvh w-dvw overflow-hidden">
      <div className={`fixed flex h-[200dvh] w-dvw flex-col`} style={{ top: `-${soulPoints * 2}dvh` }}>
        <div className="bg-blood h-full w-full" />
        <img src="/blood.png" alt="blood drop" className="h-auto w-full" />
      </div>
      <div className="relative top-0 right-0 bottom-0 left-0 z-200 h-full w-full">
        <div className="h-20 border-b">Header</div>
        <div className="stretch mx-auto flex h-full w-full grow flex-col">
          <ul className="scrollbar-hidden mx-auto flex w-full max-w-md grow flex-col items-start gap-4 overflow-scroll p-2 lg:p-4">
            {messages.map((message) => (
              <li key={message.id} className="whitespace-pre-wrap">
                {message.role === 'user' ? 'User: ' : 'AI: '}
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return <div key={`${message.id}-${i}`}>{part.text}</div>;
                  }
                })}
              </li>
            ))}

            {message.length > 0 && (
              <li className="group bg-secondary relative min-h-[120px] w-full min-w-[13rem] min-w-[50%] shrink-0 overflow-hidden rounded-xl rounded-bl-none p-2 whitespace-pre-wrap">
                <Typography
                  component="span"
                  className="relative z-10 blur-xs transition-all duration-300 hover:blur-none"
                >
                  {message}
                </Typography>{' '}
                <FireBackground />
              </li>
            )}
            {message.length > 0 && (
              <li className="bg-user-message w-full min-w-[50%] shrink-0 self-end rounded-xl rounded-br-none p-2 whitespace-pre-wrap">
                <Typography component="span">{message}</Typography>
              </li>
            )}
          </ul>

          <div className="relative bottom-[20px] mx-auto h-[350px] w-[300px] scale-50 md:h-[400px] md:w-[480px] md:scale-70">
            <div className={buttonContainerStyles}>
              <SecondaryButton
                type="button"
                className={buttonStyles}
                data-values="1abcабвг"
                onClick={handleButtonClick}
              >
                <span className="text-2xl">1</span>
                <span className="text-xs">
                  abc
                  <br />
                  абвг
                </span>
              </SecondaryButton>
              <SecondaryButton
                type="button"
                className={buttonStyles}
                data-values="2defґдеє"
                onClick={handleButtonClick}
              >
                <span className="text-2xl">2</span>
                <span className="text-xs">
                  def
                  <br />
                  ґдеє
                </span>
              </SecondaryButton>
              <SecondaryButton
                type="button"
                className={buttonStyles}
                data-values="3ghiжзиі"
                onClick={handleButtonClick}
              >
                <span className="text-2xl">3</span>
                <span className="text-xs">
                  ghi
                  <br />
                  жзиі
                </span>
              </SecondaryButton>
            </div>
            <div className={buttonContainerStyles}>
              <SecondaryButton
                type="button"
                className={buttonStyles}
                data-values="4jklїйкл"
                onClick={handleButtonClick}
              >
                <span className="text-2xl">4</span>
                <span className="text-xs">
                  jkl
                  <br />
                  їйкл
                </span>
              </SecondaryButton>
              <SecondaryButton
                type="button"
                className={buttonStyles}
                data-values="5mnoмноп"
                onClick={handleButtonClick}
              >
                <span className="text-2xl">5</span>
                <span className="text-xs">
                  mno
                  <br />
                  мноп
                </span>
              </SecondaryButton>
              <SecondaryButton
                type="button"
                className={buttonStyles}
                data-values="6pqrрсту"
                onClick={handleButtonClick}
              >
                <span className="text-2xl">6</span>
                <span className="text-xs">
                  pqr
                  <br />
                  рсту
                </span>
              </SecondaryButton>
            </div>
            <div className={buttonContainerStyles}>
              <SecondaryButton type="button" className={buttonStyles} data-values="7stuфхц" onClick={handleButtonClick}>
                <span className="text-2xl">7</span>
                <span className="text-xs">
                  stu
                  <br />
                  фхц
                </span>
              </SecondaryButton>
              <SecondaryButton type="button" className={buttonStyles} data-values="8vwxчшщ" onClick={handleButtonClick}>
                <span className="text-2xl">8</span>
                <span className="text-xs">
                  vwx
                  <br />
                  чшщ
                </span>
              </SecondaryButton>
              <SecondaryButton type="button" className={buttonStyles} data-values="9yzьюя" onClick={handleButtonClick}>
                <span className="text-2xl">9</span>
                <span className="text-xs">
                  yz
                  <br />
                  ьюя
                </span>
              </SecondaryButton>
            </div>
            <div className={buttonContainerStyles}>
              <SecondaryButton type="button" data-values="*+()/%" onClick={handleButtonClick}>
                *+()/%
              </SecondaryButton>
              <SecondaryButton type="button" data-values="0 " onClick={handleButtonClick}>
                <div className="flex items-center gap-1">
                  <span>0</span> <span className="relative top-[-12px] right-[-5px] scale-200">&#826;</span>
                </div>
              </SecondaryButton>
              <SecondaryButton type="button" data-values=".,-!?#" onClick={handleButtonClick}>
                .,-!?#
              </SecondaryButton>
            </div>

            <div className="flex justify-between">
              <SecondaryButton type="button" data-values=".,-!?#" onClick={handleRemove}>
                &#8592;
              </SecondaryButton>
              <div className="relative">
                <PrimaryButton
                  type="button"
                  onClick={handleSendMessage}
                  disabled={message.length === 0 || pressLeft > 0}
                >
                  Send
                </PrimaryButton>
                {pressLeft > 0 && (
                  <div
                    onClick={decreasePressLeft}
                    role="button"
                    className={`absolute top-[20px] right-0 bottom-0 left-[30px] z-10 h-[40px] w-[100px] cursor-pointer bg-[url('/glass.png')] bg-center object-scale-down ${pressLeft === randomNumberRef.current && 'opacity-0'}`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <audio src="/audio/background.mp3" autoPlay loop /> */}
    </div>
  );
}
