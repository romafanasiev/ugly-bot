import { Typography } from '@mui/material';
import FireBackground from './FireBackground';

export const BotMessage = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <li className="group bg-secondary relative min-h-[120px] w-full min-w-[13rem] min-w-[50%] shrink-0 overflow-hidden rounded-xl rounded-bl-none p-2 whitespace-pre-wrap">
      <Typography component="span" className="relative z-10 blur-xs transition-all duration-300 hover:blur-none">
        {children}
      </Typography>
      <FireBackground />
    </li>
  );
};
