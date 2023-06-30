import { Dispatch, SetStateAction, createContext, useState } from "react";

export const HintContext = createContext(
  {} as {
    hintListIdx: number;
    setHintListIdx: Dispatch<SetStateAction<number>>;
  }
);

export const HintProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hintListIdx, setHintListIdx] = useState<number>(1);
  return (
    <HintContext.Provider value={{ hintListIdx, setHintListIdx }}>
      {children}
    </HintContext.Provider>
  );
};
