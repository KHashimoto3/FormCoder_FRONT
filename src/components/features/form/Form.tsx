import { FormProvider } from "./FormProvider";
import { FormData } from "../../types/formData";
import { useContext, useEffect, useState } from "react";
import { InputContext } from "./InputArrayProvider";

import { storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { Typography } from "@mui/material";

export const Form = () => {
  const { initInputArray } = useContext(InputContext);

  //フォームデータを格納するstate
  const [formData, setFormData] = useState<FormData[]>([]);

  useEffect(() => {
    //リクエストパラメータのフォーム名を取得し、フォームを取得する
    const url = new URL(window.location.href);
    const formName = url.searchParams.get("form");
    if (formName == null) {
      alert("フォームの種類が選択されていません。フォーム選択画面に戻ります。");
      window.location.href = "/learning";
    }

    //フォームデータの取得
    getFormData(formName);
    //入力テンプレートの取得
    getInputTmp(formName);
  }, []);

  const getFormData = (formName: string | null) => {
    const refUrl = "form/" + formName + ".json";
    getFormFileUrl(refUrl);
  };

  const getInputTmp = (formName: string | null) => {
    const refUrl = "form/" + formName + "_tmp.json";
    getTmpFileUrl(refUrl);
  };

  const getFormFileUrl = (refUrl: string) => {
    getDownloadURL(ref(storage, refUrl))
      .then((url) => {
        getFormFile(url);
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
              "このファイルへのアクセス権限がありません！フォーム選択画面に戻ります。",
            );
            window.location.href = "/learning";
            break;
          case "storage/canceled":
            alert(
              "ユーザーはアップロードをキャンセルしました。フォーム選択画面に戻ります。",
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

  const getTmpFileUrl = (refUrl: string) => {
    getDownloadURL(ref(storage, refUrl))
      .then((url) => {
        getTmpFile(url);
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
              "このファイルへのアクセス権限がありません！フォーム選択画面に戻ります。",
            );
            window.location.href = "/learning";
            break;
          case "storage/canceled":
            alert(
              "ユーザーはアップロードをキャンセルしました。フォーム選択画面に戻ります。",
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

  const getFormFile = async (url: string) => {
    await fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const data = json.formData;
        setFormData(data);
      });
  };

  const getTmpFile = async (url: string) => {
    await fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const data = json.tmpData;
        console.log("デバッグ" + data);
        initInputArray(data);
      });
  };

  return (
    <>
      <Typography variant="body1" sx={{ border: "0.5px solid #9e9e9e" }}>
        編集中：src/main.c
      </Typography>
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
                id={data.id}
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
    </>
  );
};
