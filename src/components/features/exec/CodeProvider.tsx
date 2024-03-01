import { Dispatch, SetStateAction, useState, createContext } from "react";

export const CodeContext = createContext(
  {} as {
    code: string;
    setCode: Dispatch<SetStateAction<string>>;
  }
);

export const CodeProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [code, setCode] = useState<string>("");

  return (
    <CodeContext.Provider
      value={{
        code,
        setCode,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};
