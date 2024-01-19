import { FormProvider } from "./FormProvider";
import { FormData } from "../../types/formData";
import { useContext, useEffect, useState } from "react";
import { InputContext } from "./InputArrayProvider";

import { storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { Typography } from "@mui/material";

type Props = {
  setLoading: (loading: boolean) => void;
};

export const Form = (props: Props) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const { setLoading } = props;

  const { initInputArray } = useContext(InputContext);

  //フォームデータを格納するstate
  const [formData, setFormData] = useState<FormData[]>([]);

  //待機を行う処理
  const sleep = (waitMsec: number) => {
    const startMsec = new Date().getTime();
    while (new Date().getTime() - startMsec < waitMsec);
  };

  useEffect(() => {
    //リクエストパラメータのフォーム名を取得し、フォームを取得する
    const url = new URL(window.location.href);
    const formName = url.searchParams.get("form");
    if (formName == null) {
      alert("フォームの種類が選択されていません。フォーム選択画面に戻ります。");
      window.location.href = "/learning";
      return;
    }

    console.log("ローディングモーダルを表示");
    //フォームデータの取得
    getFormData(formName);
    //入力テンプレートの取得
    getInputTmp(formName);

    //setLoading(false);
    console.log("ローディングモーダルを非表示");
  }, []);

  //formDataが更新されたら、setLoadingをfalseにする
  useEffect(() => {
    if (formData.length > 0) {
      sleep(1000);
      setLoading(false);
    }
  }, [formData]);

  //フォームデータの取得
  const getFormData = async (formName: string) => {
    const url = `${apiBaseUrl}/form?formName=${formName}`;
    try {
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          const statusCode = res.status;
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Oops, we haven't got JSON!");
          }
          switch (statusCode) {
            case 400:
              throw new Error("Bad Request");
            case 401:
              throw new Error("Unauthorized");
            case 404:
              throw new Error("Not Found");
            case 500:
              throw new Error("Internal Server Error");
            default:
              throw new Error("Unknown Error");
          }
        }
        const data = await res.json();
        setFormData(data.formData);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getInputTmp = (formName: string | null) => {
    const refUrl = "form/" + formName + "_tmp.json";
    getTmpFileUrl(refUrl);
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
