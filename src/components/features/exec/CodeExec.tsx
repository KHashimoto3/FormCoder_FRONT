import { Grid } from "@mui/material";
import { CodeCheckInput } from "./CodeCheckInput";
import { useContext, useEffect, useState } from "react";
import { ErrorResolve } from "../../types/errorResolve";
import { CheckMissResult } from "../../types/checkMissResult";
import { CodeCheckList } from "./CodeCheckList";
import { InputContext } from "../form/InputArrayProvider";
import { FormDataContext } from "../form/FormDataProvider";
import { CodeContext } from "./CodeProvider";

export const CodeExec = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

  const [codeInput, setCodeInput] = useState<string>("");
  const [codeResultStatus, setCodeResultStatus] = useState<string>("Ready");
  const [codeOutput, setCodeOutput] = useState<string>("");

  const [errorResolveList, setErrorResolveList] = useState<ErrorResolve[]>([]);
  const [foundMissList] = useState<CheckMissResult[]>([]);

  //コードを管理するコンテキスト
  const { code, setCode } = useContext(CodeContext);

  //入力データを管理するコンテキスト
  const { inputArray } = useContext(InputContext);
  //フォームデータを管理するコンテキスト
  const { formData } = useContext(FormDataContext);

  useEffect(() => {
    console.log("inputArray:", inputArray);
    console.log("formData:", formData);
    callConnectCodeApi();
  }, []);

  const callConnectCodeApi = async () => {
    const url1 = `${apiBaseUrl}/programm/connected-code`;
    const obj1 = {
      formData: formData,
      inputData: inputArray,
    };

    let connectedCode = "";

    try {
      await fetch(url1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj1),
      }).then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          const statusCode = res.status;
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Oops, we haven't got JSON!");
          }
          switch (statusCode) {
            case 500:
              throw new Error("Internal Server Error");
            default:
              throw new Error("Unknown Error");
          }
        }
        const data = await res.json();
        connectedCode = data.connectedCode.replace(/\\n/g, "\n");
      });
    } catch (error) {
      alert("コードの接続時にエラーが発生しました。");
      setCode("//エラー: コードの結合時に問題がおきました。");
    }

    const url2 = `${apiBaseUrl}/programm/format-code/`;
    const obj2 = {
      code: connectedCode,
    };

    //結合されたコードをフォーマットする
    try {
      await fetch(url2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj2),
      }).then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          const statusCode = res.status;
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Oops, we haven't got JSON!");
          }
          switch (statusCode) {
            case 500:
              throw new Error("Internal Server Error");
            default:
              throw new Error("Unknown Error");
          }
        }
        const data = await res.json();
        const code = data.result;
        const formattedConnectedCode = code.replace(/\\n/g, "\n");
        setCode(formattedConnectedCode);
      });
    } catch (error) {
      alert("コードのフォーマット中にエラーが発生しました");
      return;
    }
  };

  const [checkButtonDisabled, setCheckButtonDisabled] =
    useState<boolean>(false);

  const checkCode = async () => {
    setCheckButtonDisabled(true);
    console.log("チェックします：" + code);

    let errorResolve: ErrorResolve[];
    let input: string;
    let errors: string[] = [];

    if (code === "") {
      alert("コードが入力されていません");
      setCheckButtonDisabled(false);
      return;
    }

    const url = `${apiBaseUrl}/programm/exec-result`;
    if (codeInput === "") {
      input = "none";
    } else {
      input = codeInput;
    }

    const dataObj = {
      code: code,
      input: input,
    };

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
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
            case 500:
              throw new Error("Internal Server Error");
            default:
              throw new Error("Unknown Error");
          }
        }
        const data = await res.json();
        if (data.status === "success") {
          setCodeResultStatus(data.status);
          setCodeOutput(data.output);
        } else {
          setCodeResultStatus(data.status);
          setCodeOutput("<<エラーがあります。>>");
          errors = data.errors;
        }
        setCheckButtonDisabled(false);
      });
    } catch (error) {
      alert("コードの実行時にエラーが発生しました。catch");
      setCheckButtonDisabled(false);
      return;
    }

    if (errors.length >= 1) {
      //error-resolve apiに接続して、エラーの対処法を受け取る
      const url = `${apiBaseUrl}/programm/error/resolve`;
      const dataObj = {
        errors: errors,
      };

      try {
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataObj),
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
              case 500:
                throw new Error("Internal Server Error");
              default:
                throw new Error("Unknown Error");
            }
          }
          const data = await res.json();
          errorResolve = data;
          setErrorResolveList(errorResolve);
        });
      } catch (error) {
        alert("エラーの解決方法の取得時にエラーが発生しました。");
        return;
      }
    }
  };

  return (
    <div style={{ background: "#ffffff", zIndex: "9999" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflowX: "hidden",
          overflowY: "scroll",
          background: "#ffffff",
          padding: "10px",
          position: "fixed",
          zIndex: "999",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <CodeCheckInput
              code={code}
              setCode={setCode}
              codeInput={codeInput}
              setCodeInput={setCodeInput}
            />
          </Grid>
          <Grid item xs={6}>
            <CodeCheckList
              checkCode={checkCode}
              checkButtonDisabled={checkButtonDisabled}
              errorResolveList={errorResolveList}
              foundMissList={foundMissList}
              resultStatus={codeResultStatus}
              output={codeOutput}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
