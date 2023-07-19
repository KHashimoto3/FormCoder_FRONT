import { FormProvider } from "./FormProvider";
import { FormData } from "../../types/formData";
import { inputData } from "../../types/inputData";
import { useContext, useEffect, useState } from "react";
import { InputContext } from "./InputArrayProvider";

import { storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

export const Form = () => {
  const { initInputArray } = useContext(InputContext);

  //フォームデータを格納するstate
  const [formData, setFormData] = useState<FormData[]>([]);

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

    //リクエストパラメータのフォーム名を取得し、フォームを取得する
    const url = new URL(window.location.href);
    const formName = url.searchParams.get("form");
    if (formName == null) {
      alert("フォームの種類が選択されていません。フォーム選択画面に戻ります。");
      window.location.href = "/learning";
    }
    getFormData(formName);
  }, []);

  const getFormData = (formName: string | null) => {
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
            alert("ファイルが見つかりません！フォーム選択画面に戻ります。");
            window.location.href = "/learning";
            break;
          case "storage/unauthorized":
            alert(
              "このファイルへのアクセス権限がありません！フォーム選択画面に戻ります。"
            );
            window.location.href = "/learning";
            break;
          case "storage/canceled":
            alert(
              "ユーザーはアップロードをキャンセルしました。フォーム選択画面に戻ります。"
            );
            window.location.href = "/learning";
            break;
          case "storage/unknown":
            alert("不明なエラーが発生しました！フォーム選択画面に戻ります。");
            window.location.href = "/learning";
            break;
        }
      });
  };

  const getJsonFile = async (url: string) => {
    await fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const data = json.formData;
        setFormData(data);
      });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        overflowX: "hidden",
        overflowY: "scroll",
        border: "0.5px solid #9e9e9e",
        padding: "10px",
      }}
    >
      {formData.map((data) => {
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
    </div>
  );
};
