import { Dispatch, SetStateAction, createContext, useState } from "react";
import { inputData } from "../../types/inputData";

export const InputContext = createContext(
  {} as {
    inputArray: inputData[];
    setInputArray: Dispatch<SetStateAction<inputData[]>>;
    initInputArray: (inputArray: inputData[]) => void;
    upDateInputArray: (idx: number, newInput: string[]) => void;
  }
);

export const inputArrayProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [inputArray, setInputArray] = useState<inputData[]>([]);

  const initInputArray = (inputArray: inputData[]) => {
    inputArray.map((inputData) => {
      setInputArray([...inputArray, inputData]);
    });
  };

  const upDateInputArray = (idx: number, newInput: string[]) => {
    setInputArray(
      inputArray.map((input, index) =>
        index === idx
          ? { partType: input.partType, inputDataArray: newInput }
          : input
      )
    );
  };

  return (
    <InputContext.Provider
      value={{
        inputArray,
        setInputArray,
        initInputArray,
        upDateInputArray,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
