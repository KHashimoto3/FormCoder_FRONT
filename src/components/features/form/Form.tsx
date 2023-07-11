import { FormProvider } from "./FormProvider";
import { FormData } from "../../types/formData";
import { inputData } from "../../types/inputData";
import { useContext, useEffect } from "react";
import { InputContext } from "./InputArrayProvider";

export const Form = () => {
  const [inputArray, setInputArray] = useContext(InputContext);

  const sampleInputData: inputData[] = [
    {
      partType: "PROC",
      inputDataArray: [""],
    },
    {
      partType: "PROC",
      inputDataArray: [""],
    },
    {
      partType: "IF",
      inputDataArray: [""],
    },
    {
      partType: "PROC",
      inputDataArray: [""],
    },
    {
      partType: "IFE",
      inputDataArray: [""],
    },
  ];

  useEffect(() => {
    sampleInputData.map((input) => {
      setInputArray([...inputArray, input]);
    });
  }, []);

  //開発で使用するサンプルのフォームデータ
  const sampleFormData: FormData[] = [
    {
      id: 1,
      partType: "PROC",
      explanation: "パートの解説",
      childrenPart: "none",
      inputIdx: 0,
    },
    {
      id: 2,
      partType: "MAIN",
      explanation: "パートの解説",
      childrenPart: [
        {
          id: 2,
          partType: "PROC",
          explanation: "パートの解説",
          childrenPart: "none",
          inputIdx: 0,
        },
        {
          id: 3,
          partType: "IF",
          explanation: "パートの解説",
          childrenPart: [
            {
              id: 1,
              partType: "PROC",
              explanation: "パートの解説",
              childrenPart: "none",
              inputIdx: 3,
            },
          ],
          inputIdx: 2,
        },
        {
          id: 5,
          partType: "IFE",
          explanation: "パートの解説",
          childrenPart: "none",
          inputIdx: 4,
        },
      ],
      inputIdx: 1,
    },
  ];

  return (
    <>
      {sampleFormData.map((data) => {
        return (
          <>
            <FormProvider
              key={data.id}
              partType={data.partType}
              explanation={data.explanation}
              childrenPart={data.childrenPart}
              inputIdx={data.inputIdx}
            />
            <br />
          </>
        );
      })}
    </>
  );
};
