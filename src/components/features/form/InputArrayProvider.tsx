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

export const InputArrayProvider: React.FC<{ children: React.ReactNode }> = ({
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
    console.log("入力するのは：" + newInput + "場所は：" + idx);
    inputArray[idx].inputDataArray = newInput;
    console.log("更新後：" + inputArray[idx]);
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
