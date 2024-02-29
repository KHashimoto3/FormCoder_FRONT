import { Typography } from "@mui/material";
import { QuestionData } from "../../types/questionData";
import { useEffect, useState } from "react";

export const Question = () => {
  const [questionData, setQuestionData] = useState<QuestionData>();
  const apiBaseUrl = "https://form-coder-api.onrender.com";

  const url = new URL(window.location.href);
  const formId = url.searchParams.get("formId");

  useEffect(() => {
    if (formId === "000000" || formId === null) {
      setQuestionData(sampleQuestionData);
    } else {
      getQuestionData();
    }
  }, []);

  const sampleQuestionData: QuestionData = {
    id: "000000",
    title: "サンプル問題",
    explanation: "サンプル問題の問題文です。",
    inputExample: ["入力例1"],
    outputExample: ["出力例1"],
  };

  const getQuestionData = async () => {
    const url = `${apiBaseUrl}/form/question?formId=${formId}`;
    try {
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          const contentType = res.headers.get("content-type");
          if (!res.ok) {
            const statusCode = res.status;
            if (!contentType || !contentType.includes("application/json")) {
              throw new Error("Oops, we haven't got JSON!");
            }
            switch (statusCode) {
              case 400:
                throw new Error("Bad Request");
              case 404:
                throw new Error("Not Found");
              case 500:
                throw new Error("Internal Server Error");
              default:
                throw new Error("Unknown Error");
            }
          }
          return res.json();
        })
        .then((data) => {
          setQuestionData(data.questionData);
        });
    } catch (error) {
      alert("問題の取得中にエラーが発生しました。");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" fontWeight={"bold"} gutterBottom>
        {questionData?.title}
      </Typography>
      <div style={{ background: "#ededed" }}>
        <Typography variant="h5" gutterBottom>
          問題:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {questionData?.explanation}
        </Typography>
      </div>
      {questionData?.inputExample.map((input, index) => {
        return (
          <div key={index}>
            <Typography variant="h5" gutterBottom>
              入力例{index + 1}:
            </Typography>
            <textarea
              rows={4}
              cols={20}
              value={input}
              style={{ fontSize: "16pt" }}
              readOnly
            />
          </div>
        );
      })}
      {questionData?.outputExample.map((output, index) => {
        return (
          <div key={index}>
            <Typography variant="h5" gutterBottom>
              出力例{index + 1}:
            </Typography>
            <textarea
              rows={4}
              cols={20}
              value={output}
              style={{ fontSize: "16pt" }}
              readOnly
            />
          </div>
        );
      })}
    </div>
  );
};
