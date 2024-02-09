import { Grid } from "@mui/material";
import { CodeCheckInput } from "./CodeCheckInput";
import { useState } from "react";
import { ErrorResolve } from "../../types/errorResolve";
import { CheckMissResult } from "../../types/checkMissResult";
import { ExecResult } from "../../types/execResult";
import { CodeCheckList } from "./CodeCheckList";

export const CodeExec = () => {
  const apiBaseUrl = "https://form-coder-api.onrender.com";

  const [code, setCode] = useState<string>("");
  const [codeInput, setCodeInput] = useState<string>("");
  const [codeOutput, setCodeOutput] = useState<string>("");

  const [errorResolveList, setErrorResolveList] = useState<ErrorResolve[]>([]);
  const [foundMissList, setFoundMissList] = useState<CheckMissResult[]>([]);

  const [checkButtonDisabled, setCheckButtonDisabled] =
    useState<boolean>(false);

  const checkCode = async () => {
    setCheckButtonDisabled(true);
    console.log("チェックします：" + code);

    let execResult: ExecResult;
    let errorResolve: ErrorResolve[];
    let foundMisses: CheckMissResult[];
    let input: string;

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
        console.log(data);
        alert("コードの実行が完了しました");
        setCheckButtonDisabled(false);
      });
    } catch (error) {
      alert("コードの実行時にエラーが発生しました。catch");
      setCheckButtonDisabled(false);
      return;
    }

    /*
    //exec apiに接続して、codeとinputを送信する
    try {
      //codeが殻の場合はエラーを返す
      if (code === "") {
        alert("コードが入力されていません");
        setCheckButtonDisabled(false);
        return;
      }
      let dataObj = {
        code: code,
        input: codeInput,
      };
      //inputが殻の場合は、inputにnoneを入れる
      if (codeInput === "") {
        dataObj.input = "none";
      }
      const url = "https://form-coder-api.onrender.com/programm/exec-result";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });
      execResult = await response.json();
      
    } catch (error) {
      alert("コードの実行時にエラーが発生しました。catch");
      setCheckButtonDisabled(false);
      return;
    }*/

    /*if (execResult.error.length >= 1) {
      //error-resolve apiに接続して、エラーの対処法を受け取る
      try {
        const url =
          "https://form-coder-api.onrender.com/programm/error/resolve";
        const dataObj = {
          errors: execResult.error,
        };
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataObj),
        });
        const recieveData = await response.json();
        errorResolve = recieveData.resolve;
        console.log("エラーの解決法のリスト" + errorResolve);
        console.log(errorResolve);
      } catch (error) {
        alert("エラーの解決法の取得時にエラーが発生しました。");
        setCheckButtonDisabled(false);
        return;
      }
      setErrorResolveList(errorResolve);
    } else {
      setErrorResolveList([]);
    }
    */
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
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
