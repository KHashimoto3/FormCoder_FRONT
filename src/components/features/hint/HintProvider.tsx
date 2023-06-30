import { createContext, useState } from "react";

export const HintContext = createContext({});

export const HintProvider = (props: { children: any }) => {
  const [hintListIdx, setHintListIdx] = useState(0);
  return (
    <HintContext.Provider value={{ hintListIdx, setHintListIdx }}>
      {props.children}
    </HintContext.Provider>
  );
};
