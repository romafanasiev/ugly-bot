'use client';

import { Button } from '@mui/material';
import { useState } from 'react';

const RunawayButton = () => {
  const [position, setPosition] = useState({ bottom: '5%', left: '10dvw' });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();

    // Calculate a new position to move the button away from the cursor
    let newTop = Math.random() * (window.innerHeight - buttonRect.height);
    let newLeft = Math.random() * (window.innerWidth - buttonRect.width);

    // Ensure the button stays within the viewport
    newTop = Math.max(0, Math.min(newTop, window.innerHeight - buttonRect.height));
    newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - buttonRect.width));

    setPosition({ bottom: `${newTop}px`, left: `${newLeft}px` });
  };

  return (
    <Button
      onMouseEnter={handleMouseMove}
      sx={{
        position: 'fixed',
        bottom: position.bottom,
        left: position.left,
        transition: 'all 0.3s ease-out',
        cursor: 'default',
      }}
      className="text-black hover:opacity-0"
      size="small"
      tabIndex={-1}
    >
      Decline
      <img src="/ghost_decline.gif" alt="Decline Button" className="absolute z-[-1] h-auto w-full opacity-75" />
    </Button>
  );
};

export default RunawayButton;
