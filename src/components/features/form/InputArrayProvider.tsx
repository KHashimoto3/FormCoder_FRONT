import { Dispatch, SetStateAction, createContext, useState } from "react";
import { inputData } from "../../types/inputData";

export const InputContext = createContext(
  {} as {
    inputArray: inputData[];
    setInputArray: Dispatch<SetStateAction<inputData[]>>;
    upDateInputArray: (idx: number, newInput: string[]) => void;
  }
);

export const inputArrayProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [inputArray, setInputArray] = useState<inputData[]>([]);

  const upDateInputArray = (idx: number, newInput: string[]) => {
    setInputArray(
      inputArray.map((input, index) =>
        index === idx ? { inputDataArray: newInput } : input
      )
    );
  };

  return (
    <InputContext.Provider
      value={{
        inputArray,
        setInputArray,
        upDateInputArray,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
