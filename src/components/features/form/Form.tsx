import { FormProvider } from "./FormProvider";
import { FormData } from "../../types/formData";
import { inputData } from "../../types/inputData";
import { useContext, useEffect } from "react";
import { InputContext } from "./InputArrayProvider";

import { storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

export const Form = () => {
  const { initInputArray } = useContext(InputContext);

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
          inputIdx: 1,
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
      inputIdx: -1,
    },
  ];

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
    initInputArray(sampleInputData);
    getFormData("sampleForm");
  }, []);

  const getFormData = (formName: string) => {
    const refUrl = "form/" + formName + ".json";
    getFileUrl(refUrl);
  };

  const getFileUrl = (refUrl: string) => {
    getDownloadURL(ref(storage, refUrl))
      .then((url) => {
        getJsonFile(url);
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            alert("ファイルが見つかりません！");
            break;
          case "storage/unauthorized":
            alert("このファイルへのアクセス権限がありません！");
            break;
          case "storage/canceled":
            alert("ユーザーはアップロードをキャンセルしました。");
            break;
          case "storage/unknown":
            alert("不明なエラーが発生しました！");
            break;
        }
      });
  };

  const getJsonFile = (url: string) => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => console.log(json.formData))
      .catch(() => alert("エラーが発生しました。"));
  };

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
