import { Typography } from '@mui/material';

export const UserMessage = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <li className="bg-user-message w-full min-w-[50%] shrink-0 self-end rounded-xl rounded-br-none p-2 whitespace-pre-wrap">
      <Typography component="span">{children}</Typography>
    </li>
  );
};
