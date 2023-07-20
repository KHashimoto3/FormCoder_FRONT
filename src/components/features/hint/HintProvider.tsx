import { Dispatch, SetStateAction, createContext, useState } from "react";
import { HintFBData } from "../../types/hintFBData";

export const HintContext = createContext(
  {} as {
    currentPartType: string;
    setCurrentPartType: Dispatch<SetStateAction<string>>;
    currentHintStep: number;
    setCurrentHintStep: Dispatch<SetStateAction<number>>;
    hintTypeC: string;
    setHintTypeC: Dispatch<SetStateAction<string>>;
    hintFBArray: HintFBData[];
    setHintFBArray: Dispatch<SetStateAction<HintFBData[]>>;
    appendHintFBArray: () => void;
  }
);

export const HintProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [currentPartType, setCurrentPartType] = useState<string>("FOR");
  const [hintTypeC, setHintTypeC] = useState<string>("テストヒントC");
  const [currentHintStep, setCurrentHintStep] = useState<number>(-1);
  const [hintFBArray, setHintFBArray] = useState<HintFBData[]>([]);

  const appendHintFBArray = () => {
    //console.log("FB配列更新前: " + JSON.stringify(hintFBArray));
    const newHintFBData: HintFBData = {
      id: 0,
      partType: currentPartType,
      hintStep: currentHintStep,
    };
    setHintFBArray([...hintFBArray, newHintFBData]);
  };

  return (
    <HintContext.Provider
      value={{
        currentPartType,
        setCurrentPartType,
        currentHintStep,
        setCurrentHintStep,
        hintTypeC,
        setHintTypeC,
        hintFBArray,
        setHintFBArray,
        appendHintFBArray,
      }}
    >
      {children}
    </HintContext.Provider>
  );
};
