import { Dispatch, SetStateAction, createContext, useState } from "react";
import { HintFBData } from "../../types/hintFBData";

export const HintContext = createContext(
  {} as {
    currentPartType: string;
    setCurrentPartType: Dispatch<SetStateAction<string>>;
    currentHintId: number;
    setCurrentHintId: Dispatch<SetStateAction<number>>;
    currentHintStep: number;
    setCurrentHintStep: Dispatch<SetStateAction<number>>;
    hintTypeC: string;
    setHintTypeC: Dispatch<SetStateAction<string>>;
    hintFBArray: HintFBData[];
    setHintFBArray: Dispatch<SetStateAction<HintFBData[]>>;
    appendHintFBArray: (step: number) => void;
  }
);

export const HintProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [currentPartType, setCurrentPartType] = useState<string>("FOR");
  const [hintTypeC, setHintTypeC] = useState<string>("テストヒントC");
  const [currentHintId, setCurrentHintId] = useState<number>(1);
  const [currentHintStep, setCurrentHintStep] = useState<number>(-1);
  const [hintFBArray, setHintFBArray] = useState<HintFBData[]>([]);

  const appendHintFBArray = (step: number) => {
    //console.log("FB配列更新前: " + JSON.stringify(hintFBArray));
    const newHintFBData: HintFBData = {
      id: currentHintId,
      partType: currentPartType,
      hintStep: step,
    };
    setHintFBArray([...hintFBArray, newHintFBData]);
  };

  return (
    <HintContext.Provider
      value={{
        currentPartType,
        setCurrentPartType,
        currentHintId,
        setCurrentHintId,
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
