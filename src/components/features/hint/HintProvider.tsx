import { Dispatch, SetStateAction, createContext, useState } from "react";

export const HintContext = createContext(
  {} as {
    currentPartType: string;
    setCurrentPartType: Dispatch<SetStateAction<string>>;
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
  return (
    <HintContext.Provider
      value={{ currentPartType, setCurrentPartType, hintTypeC, setHintTypeC }}
    >
      {children}
    </HintContext.Provider>
  );
};
