import { ReactNode, createContext, useContext, useState } from "react";

type GlobalStateProviderProps = {
  children: ReactNode;
};

type GlobalStateContext = {
  setNavbarHtml: (html: string) => void;
  navbarHtml: string;
};

const GlobalStateContext = createContext({} as GlobalStateContext);

export function useGlobalState() {
  return useContext(GlobalStateContext);
}

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [navbarHtml, setNavbarHtml] = useState<string>("");

  return (
    <GlobalStateContext.Provider
      value={{
        setNavbarHtml,
        navbarHtml,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}
