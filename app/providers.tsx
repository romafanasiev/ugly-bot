'use client';

import { NotificationProvider } from '@/src/shared';

const Providers = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <>
      {children}
      <NotificationProvider />
    </>
  );
};

export default Providers;
