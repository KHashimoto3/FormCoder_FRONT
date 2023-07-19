import { Dispatch, SetStateAction, createContext, useState } from "react";

export const HintContext = createContext(
  {} as {
    currentPartType: string;
    setCurrentPartType: Dispatch<SetStateAction<string>>;
    currentHintStep: number;
    setCurrentHintStep: Dispatch<SetStateAction<number>>;
    hintTypeC: string;
    setHintTypeC: Dispatch<SetStateAction<string>>;
  }
);

export const HintProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [currentPartType, setCurrentPartType] = useState<string>("FOR");
  const [hintTypeC, setHintTypeC] = useState<string>("テストヒントC");
  const [currentHintStep, setCurrentHintStep] = useState<number>(-1);
  return (
    <HintContext.Provider
      value={{
        currentPartType,
        setCurrentPartType,
        currentHintStep,
        setCurrentHintStep,
        hintTypeC,
        setHintTypeC,
      }}
    >
      {children}
    </HintContext.Provider>
  );
};
