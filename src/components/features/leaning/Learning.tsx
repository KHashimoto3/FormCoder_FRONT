import { Box, Grid, Typography } from "@mui/material";
import { FormCard } from "./FormCard";
import { FormCardList } from "../../types/formCardList";
import { useEffect, useState } from "react";

export const Learning = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  console.log(apiBaseUrl);
  const [formList, setFormList] = useState<FormCardList[]>([]);

  useEffect(() => {
    pullFormList();
  }, []);

  const sampleFormList: FormCardList[] = [
    {
      id: 1,
      title: "Experiment1",
      description: "実験用のフォーム1です。",
      url: "/form?form=experiment1",
    },
    {
      id: 2,
      title: "Experiment2",
      description: "実験用のフォーム2です。",
      url: "/form?form=experiment2",
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
        if (!res.ok) {
          const statusCode = res.status;
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
      });
    } catch (error) {
      alert("エラーが発生しました。" + error);
      alert("代わりにサンプルのリストを表示します。");
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
      <Grid container spacing={1}>
        {formList.map((form) => (
          <Grid item xs={3} key={form.id}>
            <FormCard
              title={form.title}
              description={form.description}
              url={form.url}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
