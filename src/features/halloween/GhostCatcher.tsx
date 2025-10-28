'use client';

import { PrimaryButton } from '@/src/shared';
import { Typography } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';

interface Ghost {
  id: number;
  x: number;
  y: number;
  speed: number;
  emoji: string;
  size: number;
}

const GHOST_EMOJIS = ['👻', '🎃', '💀', '🕷️', '🦇', '😈', '🧟', '🧛'];

export default function GhostCatcher({ onContinue }: { onContinue: (score: number) => void }) {
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScore, setHighScore] = useState(0);
  const [lastComboTime, setLastComboTime] = useState(0);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ghostCatcherHighScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('ghostCatcherHighScore', score.toString());
    }
  }, [score, highScore]);

  // Spawn ghosts
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(
      () => {
        const newGhost: Ghost = {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: -10,
          speed: Math.random() * 2 + 1 + (timeLeft < 15 ? 1 : 0),
          emoji: GHOST_EMOJIS[Math.floor(Math.random() * GHOST_EMOJIS.length)],
          size: Math.random() * 20 + 40,
        };
        setGhosts((prev) => [...prev, newGhost]);
      },
      800 - (30 - timeLeft) * 20,
    );

    return () => clearInterval(interval);
  }, [gameActive, timeLeft]);

  // Move ghosts
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setGhosts((prev) =>
        prev.map((ghost) => ({ ...ghost, y: ghost.y + ghost.speed })).filter((ghost) => ghost.y < 110),
      );
    }, 50);

    return () => clearInterval(interval);
  }, [gameActive]);

  // Timer
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameActive]);

  // Combo reset
  useEffect(() => {
    if (!gameActive) return;

    const checkCombo = setInterval(() => {
      if (Date.now() - lastComboTime > 2000) {
        setCombo(0);
      }
    }, 100);

    return () => clearInterval(checkCombo);
  }, [gameActive, lastComboTime]);

  const catchGhost = useCallback(
    (id: number) => {
      setGhosts((prev) => prev.filter((g) => g.id !== id));
      const newCombo = combo + 1;
      setCombo(newCombo);
      setLastComboTime(Date.now());
      const points = 10 + (newCombo > 1 ? (newCombo - 1) * 10 : 0);
      setScore((prev) => prev + points);
    },
    [combo],
  );

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setCombo(0);
    setTimeLeft(30);
    setGhosts([]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-900 via-indigo-900 to-black">
      {/* Spooky background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-bounce text-6xl">🌙</div>
        <div className="absolute top-20 right-20 animate-pulse text-4xl">⭐</div>
        <div className="absolute bottom-20 left-1/4 animate-bounce text-5xl delay-100">🦇</div>
        <div className="absolute top-1/3 right-1/3 animate-pulse text-4xl delay-200">✨</div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <Typography
          variant="h1"
          className="font-horrorfind mb-4 text-center text-5xl text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]"
        >
          👻 Ghost Catcher 👻
        </Typography>

        <div className="flex justify-center gap-8 text-lg text-white">
          <Typography className="rounded-lg border border-orange-500/30 bg-black/50 px-6 py-3 text-lg backdrop-blur-sm">
            Score:{' '}
            <Typography className="text-lg font-bold text-orange-400" component="span">
              {score}
            </Typography>
          </Typography>
          {combo > 1 && (
            <div className="animate-pulse rounded-lg border border-orange-300 bg-orange-500/80 px-6 py-3 backdrop-blur-sm">
              🔥 Combo x{combo}!
            </div>
          )}
          <Typography className="rounded-lg border border-orange-500/30 bg-black/50 px-6 py-3 backdrop-blur-sm">
            Time:{' '}
            <Typography className="text-lg font-bold text-orange-400" component="span">
              {timeLeft}s
            </Typography>
          </Typography>
          <Typography className="rounded-lg border border-orange-500/30 bg-black/50 px-6 py-3 backdrop-blur-sm">
            High Score:{' '}
            <Typography className="text-lg font-bold text-orange-400" component="span">
              {highScore}
            </Typography>
          </Typography>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative mt-8 h-[70vh] w-full">
        {ghosts.map((ghost) => (
          <button
            key={ghost.id}
            onClick={ghost.emoji === '👻' ? () => catchGhost(ghost.id) : undefined}
            className="absolute cursor-pointer transition-transform hover:scale-110 active:scale-95"
            style={{
              left: `${ghost.x}%`,
              top: `${ghost.y}%`,
              fontSize: `${ghost.size}px`,
              transform: 'translate(-50%, -50%)',
              animation: 'float 2s ease-in-out infinite',
            }}
          >
            {ghost.emoji}
          </button>
        ))}

        {/* Start/Game Over Screen */}
        {!gameActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl border-4 border-orange-500/50 bg-black/50 p-12 text-center backdrop-blur-md">
              <Typography variant="h2" className="font-horrorfind mb-4 text-4xl font-bold text-orange-400">
                {score > 0 ? '🎃 Game Over! 🎃' : '🕸️ Ready to Hunt? 🕸️'}
              </Typography>
              {score > 0 && (
                <Typography className="font-horrorfind mb-4 text-2xl text-white">
                  Final Score: <span className="font-bold text-orange-400">{score}</span>
                </Typography>
              )}
              <div className="flex items-center justify-center gap-2">
                <PrimaryButton onClick={startGame} className="m-auto self-center">
                  {score > 0 ? 'Play Again' : 'Start Game'}
                </PrimaryButton>
                {score > 0 && (
                  <PrimaryButton
                    onClick={() => onContinue(score)}
                    disabled={score === 0}
                    className="m-auto self-center"
                  >
                    Continue
                  </PrimaryButton>
                )}
              </div>
              <Typography className="mt-6 text-sm text-gray-300">Click the ghosts before they escape!</Typography>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="relative z-10 pb-8 text-center text-gray-300">
        <Typography className="text-sm">💡 Catch ghosts quickly to build combos for bonus points!</Typography>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
