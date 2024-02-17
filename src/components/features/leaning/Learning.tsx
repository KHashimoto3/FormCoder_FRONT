import { Box, Grid, Typography } from "@mui/material";
import { FormCard } from "./FormCard";
import { FormCardList } from "../../types/formCardList";
import { useEffect, useState } from "react";
import { FormCardSkelton } from "./FormCardSkelton";

export const Learning = () => {
  const apiBaseUrl = "https://form-coder-api.onrender.com";
  const [formList, setFormList] = useState<FormCardList[]>([]);

  const [skeltonShow, setSkeltonShow] = useState<boolean>(true);

  useEffect(() => {
    pullFormList();
  }, []);

  const sampleFormList: FormCardList[] = [
    {
      id: "aaaaaaa",
      title: "Experiment1",
      description: "実験用のフォーム1です。",
      url: "/form?form=experiment1",
      explanation: "実験用のフォーム1の問題文です。",
      inputExample: ["入力例1"],
      outputExample: ["出力例1"],
    },
    {
      id: "bbbbbbb",
      title: "Experiment2",
      description: "実験用のフォーム2です。",
      url: "/form?form=experiment2",
      explanation: "実験用のフォーム2の問題文です。",
      inputExample: ["入力例1"],
      outputExample: ["出力例1"],
    },
  ];

  const pullFormList = async () => {
    const url = `${apiBaseUrl}/form/list`;
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
        setFormList(data.formList);
        setSkeltonShow(false);
      });
    } catch (error) {
      alert("エラーが発生しました。" + error);
      alert("代わりにサンプルのリストを表示します。");
      console.log(error);
      setFormList(sampleFormList);
    }
  };

  return (
    <Box sx={{ height: "1000px", paddingTop: "160px" }}>
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        すべてのフォーム
      </Typography>
      {skeltonShow ? (
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <FormCardSkelton />
          </Grid>
          <Grid item xs={3}>
            <FormCardSkelton />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1}>
          {formList.map((form) => (
            <Grid item xs={3} key={form.id}>
              <FormCard
                id={form.id}
                title={form.title}
                description={form.description}
                url={form.url}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
