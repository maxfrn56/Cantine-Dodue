"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AppStateValue = {
  /** Passe à true quand le préloader a fini sa sortie : déclenche l'entrée du hero. */
  introDone: boolean;
  completeIntro: () => void;
};

const AppStateContext = createContext<AppStateValue>({
  introDone: true,
  completeIntro: () => {},
});

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  const completeIntro = useCallback(() => setIntroDone(true), []);
  const value = useMemo(
    () => ({ introDone, completeIntro }),
    [introDone, completeIntro],
  );

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}

export const useAppState = () => useContext(AppStateContext);
