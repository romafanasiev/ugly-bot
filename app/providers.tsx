'use client';

import { NotificationProvider, StylesCacheProvider, ThemeProvider } from '@/src/shared';

const Providers = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <StylesCacheProvider>
      <ThemeProvider>
        {children}
        <NotificationProvider />
      </ThemeProvider>
    </StylesCacheProvider>
  );
};

export default Providers;
