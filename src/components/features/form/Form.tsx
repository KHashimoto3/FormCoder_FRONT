import { FormProvider } from "./FormProvider";
import { FormData } from "../../types/formData";

export const Form = () => {
  //開発で使用するサンプルのフォームデータ
  const sampleFormData: FormData[] = [
    {
      id: 1,
      partType: "0",
      explanation: "パートの解説",
      childrenPart: "none",
      inputData: "入力される内容",
    },
    {
      id: 2,
      partType: "0",
      explanation: "パートの解説",
      childrenPart: "none",
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
