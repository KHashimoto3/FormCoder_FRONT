import { Dispatch, SetStateAction, createContext, useState } from "react";

export const InputContext = createContext(
  {} as {
    inputArray: string[];
    setInputArray: Dispatch<SetStateAction<string[]>>;
    inputArrayCnt: number;
    setInputArrayCnt: Dispatch<SetStateAction<number>>;
    upDateInputArray: (idx: number, newStr: string) => void;
  }
);

export const inputArrayProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [inputArray, setInputArray] = useState<string[]>([]);
  const [inputArrayCnt, setInputArrayCnt] = useState<number>(0);

  const upDateInputArray = (idx: number, newStr: string) => {
    setInputArray(
      inputArray.map((input, index) => (index == idx ? newStr : input))
    );
  };

  return (
    <InputContext.Provider
      value={{
        inputArray,
        setInputArray,
        inputArrayCnt,
        setInputArrayCnt,
        upDateInputArray,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
