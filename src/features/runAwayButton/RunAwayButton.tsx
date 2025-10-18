'use client';

import { Button } from '@mui/material';
import { useState } from 'react';

const RunawayButton = () => {
  const [position, setPosition] = useState({ top: '80%', left: '10%' });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();

    // Calculate a new position to move the button away from the cursor
    let newTop = Math.random() * (window.innerHeight - buttonRect.height);
    let newLeft = Math.random() * (window.innerWidth - buttonRect.width);

    // Ensure the button stays within the viewport
    newTop = Math.max(0, Math.min(newTop, window.innerHeight - buttonRect.height));
    newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - buttonRect.width));

    setPosition({ top: `${newTop}px`, left: `${newLeft}px` });
  };

  return (
    <Button
      onMouseEnter={handleMouseMove}
      sx={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        transition: 'all 0.3s ease-out',
        cursor: 'default',
      }}
      tabIndex={-1}
    >
      Decline
    </Button>
  );
};

export default RunawayButton;
