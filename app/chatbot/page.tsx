'use client';

import { SpamErrors } from '@/src/features';
import { useChat } from '@ai-sdk/react';
import { Button } from '@mui/material';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { APP_CONFIG } from '@/src/shared/config';

export default function Chatbot() {
  const [message, setMessage] = useState('');
  const { messages, sendMessage } = useChat();
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

  const handleSendMessage = () => {
    // sendMessage({ text: message });
    setMessage('');
    lastPressRef.current = null;
  };

  return (
    <div className="stretch mx-auto flex h-full w-full max-w-md grow flex-col py-24">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}
        </div>
      ))}

      {message.length > 0 && <div className="whitespace-pre-wrap">{message}</div>}

      <div className="mx-auto mt-auto">
        <Button type="button" data-values="1abcабвг" onClick={handleButtonClick}>
          1abcабвг
        </Button>
        <Button type="button" data-values="2defґдеє" onClick={handleButtonClick}>
          2defґдеє
        </Button>
        <Button type="button" data-values="3ghiжзиі" onClick={handleButtonClick}>
          3ghiжзиі
        </Button>
        <br />
        <Button type="button" data-values="4jklїйкл" onClick={handleButtonClick}>
          4jklїйкл
        </Button>
        <Button type="button" data-values="5mnoмноп" onClick={handleButtonClick}>
          5mnoмноп
        </Button>
        <Button type="button" data-values="6pqrрсту" onClick={handleButtonClick}>
          6pqrрсту
        </Button>
        <br />
        <Button type="button" data-values="7stuфхц" onClick={handleButtonClick}>
          7stuфхц
        </Button>
        <Button type="button" data-values="8vwxчшщ" onClick={handleButtonClick}>
          8vwxчшщ
        </Button>
        <Button type="button" data-values="9yzьюя" onClick={handleButtonClick}>
          9yzьюя
        </Button>
        <br />
        <Button type="button" data-values="*+()/%" onClick={handleButtonClick}>
          *+()/%
        </Button>
        <Button type="button" data-values="0 " onClick={handleButtonClick}>
          <div className="flex items-center gap-1">
            <span>0</span> <span className="relative top-[-12px] right-[-20px] scale-200">&#826;</span>
          </div>
        </Button>
        <Button type="button" data-values=".,-!?#" onClick={handleButtonClick}>
          .,-!?#
        </Button>
        <br />
        <Button type="button" className="m-auto" onClick={handleSendMessage} disabled={message.length === 0}>
          Send
        </Button>
      </div>
      {/* <audio src="/audio/background.mp3" autoPlay loop /> */}
    </div>
  );
}
