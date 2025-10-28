import { LinearProgress, Typography } from '@mui/material';

type SoulBarProps = {
  soulPoints: number;
};

const SoulBar = ({ soulPoints }: SoulBarProps) => {
  const getProgressBarColor = () => {
    if (soulPoints < 20) return 'error';

    if (soulPoints > 70) {
      return 'success';
    }

    return 'warning';
  };

  return (
    <div className="flex flex-col gap-2">
      <Typography className="font-horrorfind text-2xl">HELL CHAT</Typography>
      <div className="flex items-center gap-2">
        ⚰️
        <div className="relative">
          <LinearProgress
            variant="determinate"
            value={soulPoints}
            color={getProgressBarColor()}
            className="h-8 w-[320px] rounded-full"
          />
          <img
            src="/ghost.png"
            alt="ghost"
            style={{ left: `${soulPoints}%` }}
            className={`absolute -top-2 h-12 translate-x-[-50%] animate-[bounce_1.5s_ease-in-out_infinite]`}
          />
        </div>
      </div>
    </div>
  );
};

export default SoulBar;
