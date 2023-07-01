import { Dispatch, SetStateAction, createContext, useState } from "react";

export const HintContext = createContext(
  {} as {
    partType: string;
    setPartType: Dispatch<SetStateAction<string>>;
    hintTypeC: string;
    setHintTypeC: Dispatch<SetStateAction<string>>;
  }
);

export const HintProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [partType, setPartType] = useState<string>("PROC");
  const [hintTypeC, setHintTypeC] = useState<string>("テストヒントC");
  return (
    <HintContext.Provider
      value={{ partType, setPartType, hintTypeC, setHintTypeC }}
    >
      {children}
    </HintContext.Provider>
  );
};
