import { Dispatch, SetStateAction, createContext, useState } from "react";

export const HintContext = createContext(
  {} as {
    hintListIdx: number;
    setHintListIdx: Dispatch<SetStateAction<number>>;
    hintTypeC: string;
    setHintTypeC: Dispatch<SetStateAction<string>>;
  }
);

export const HintProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [hintListIdx, setHintListIdx] = useState<number>(1);
  const [hintTypeC, setHintTypeC] = useState<string>("テストヒントC");
  return (
    <HintContext.Provider
      value={{ hintListIdx, setHintListIdx, hintTypeC, setHintTypeC }}
    >
      {children}
    </HintContext.Provider>
  );
};
