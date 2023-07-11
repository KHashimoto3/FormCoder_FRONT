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
              inputIdx: 0,
            },
          ],
          inputIdx: 0,
        },
        {
          id: 5,
          partType: "IFE",
          explanation: "パートの解説",
          childrenPart: "none",
          inputIdx: 0,
        },
      ],
      inputIdx: 0,
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
