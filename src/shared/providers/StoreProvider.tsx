'use client';

import { type ReactNode, createContext, useRef } from 'react';

import { createUserStore, initUserStore } from '../store/user-store';

export type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreApi | undefined>(undefined);

export interface UserStoreProviderProps {
  children: ReactNode;
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const storeRef = useRef<UserStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createUserStore(initUserStore());
  }

  return <UserStoreContext.Provider value={storeRef.current}>{children}</UserStoreContext.Provider>;
};
