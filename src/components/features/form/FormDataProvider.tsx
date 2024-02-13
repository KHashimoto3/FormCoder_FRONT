import { Dispatch, SetStateAction, createContext, useState } from "react";
import { FormData } from "../../types/formData";

export const FormDataContext = createContext(
  {} as {
    formData: FormData[];
    setFormData: Dispatch<SetStateAction<FormData[]>>;
  }
);

export const FormDataProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [formData, setFormData] = useState<FormData[]>([]);
  return (
    <FormDataContext.Provider
      value={{
        formData,
        setFormData,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
