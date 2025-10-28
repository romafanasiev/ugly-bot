'use client';

import { StylesCacheProvider, ThemeProvider, UserStoreProvider } from '@/src/shared';

const Providers = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return (
    <UserStoreProvider>
      <StylesCacheProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </StylesCacheProvider>
    </UserStoreProvider>
  );
};

export default Providers;
