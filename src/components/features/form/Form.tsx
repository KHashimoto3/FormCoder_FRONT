import { FormProvider } from "./FormProvider";
import { FormData } from "../../types/formData";

export const Form = () => {
  //開発で使用するサンプルのフォームデータ
  const sampleFormData: FormData[] = [
    {
      id: 1,
      partType: "PROC",
      explanation: "パートの解説",
      childrenPart: "none",
      inputData: "入力される内容",
    },
    {
      id: 2,
      partType: "PROC",
      explanation: "パートの解説",
      childrenPart: "none",
      inputData: "入力される内容",
    },
    {
      id: 3,
      partType: "FOR",
      explanation: "パートの解説",
      childrenPart: {
        id: 1,
        partType: "PROC",
        explanation: "パートの解説",
        childrenPart: "none",
        inputData: "入力される内容",
      },
      inputData: "入力される内容",
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
              childrenPart={data.childrenPart}
              inputData={data.inputData}
            />
            <br />
          </>
        );
      })}
    </>
  );
};
