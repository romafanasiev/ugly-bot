import { createStore } from 'zustand/vanilla';

export type UserState = {
  name: string;
  soulPoints: number;
};

export type UserActions = {
  setName: (name: string) => void;
  increaseSoulPoints: (soulPoints: number) => void;
  decreaseSoulPoints: (soulPoints: number) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  name: '',
  soulPoints: 50,
};

export const initUserStore = (): UserState => {
  return defaultInitState;
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setName: (name: string) => set((state) => ({ name: name })),
    increaseSoulPoints: (soulPoints: number) =>
      set((state) => {
        if (state.soulPoints + soulPoints > 100) {
          return { soulPoints: 100 };
        }

        return { soulPoints: state.soulPoints + soulPoints };
      }),
    decreaseSoulPoints: (soulPoints: number) =>
      set((state) => {
        if (state.soulPoints - soulPoints < 0) {
          return { soulPoints: 0 };
        }

        return { soulPoints: state.soulPoints - soulPoints };
      }),
  }));
};
