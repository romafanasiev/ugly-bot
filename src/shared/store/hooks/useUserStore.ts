'use client';

import { useStore } from 'zustand';

import { useContext } from 'react';
import type { UserStore } from '../user-store';
import { UserStoreContext } from '../../providers/StoreProvider';

export const useUserStore = <T>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useUserStore must be used within UserStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};
