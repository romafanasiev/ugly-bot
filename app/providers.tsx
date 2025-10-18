'use client';

import { NotificationProvider, StylesCacheProvider, ThemeProvider, UserStoreProvider } from '@/src/shared';

const Providers = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <UserStoreProvider>
      <StylesCacheProvider>
        <ThemeProvider>
          {children}
          <NotificationProvider />
        </ThemeProvider>
      </StylesCacheProvider>
    </UserStoreProvider>
  );
};

export default Providers;
