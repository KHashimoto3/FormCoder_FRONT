import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Graph } from "./Graph";
import { ReviewAdovice } from "./ReviewAdvice";
import { General } from "./General";
import { TestResult } from "./TestResult";

import { useUserData } from "../../common/hooks/useUserData";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export const Analytics = () => {
  const { getUserData } = useUserData();
  const [userId, setUserId] = useState<string>("");

  //記録データのID
  const [recordId, setRecordId] = useState<string>("");
  const [recordData, setRecordData] = useState<any>({});

  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  const jumpToLearning = () => {
    const path = "/dashboard/" + userId;
    location.href = path;
  };

  const shareAnalytics = () => {
    //現在のページのURLを取得し、クリップボードにコピーする
    const url = location.href;
    navigator.clipboard.writeText(url);
    alert("このページのURLをコピーしました！");
  };

  useEffect(() => {
    const userData = getUserData();
    if (userData.userId !== undefined) {
      setUserId(userData.userId);
    }

    //クエリパラメータidを取得
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if (!id) {
      alert("不正なアクセスです。");
      location.href = "/";
      return;
    }
    setRecordId(id);

    //記録データの取得
    getRecordData(id);
  }, []);

  const getRecordData = async (id: string) => {
    const url = import.meta.env.VITE_API_BASE_URL + "/record?recordId=" + id;
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
        const recordData = data.recordData;
        setRecordData(recordData);
      });
    } catch (error) {
      alert("C: エラーが発生しました。ダッシュボードに戻ります。");
      console.log(error);
      window.location.href = "/dashboard/" + userId;
    }
  };

  //Generalコンポーネントに渡すサンプルデータ
  const sampleScore = 81;
  const sampleRank = {
    time: 13,
    speed: 21,
    accuracy: 14,
  };
  const sampleComment = "入力のミスが減ってきましたね！その調子です！";

  const sampleResultData = [
    {
      title: "基本テスト1",
      status: "正解",
      input: "1 2",
      output: "3",
      error: "",
    },
    {
      title: "基本テスト2",
      status: "正解",
      input: "2 3",
      output: "5",
      error: "",
    },
    {
      title: "エッジテスト1",
      status: "失敗",
      input: "3 4",
      output: "9",
      error: "違う出力結果",
    },
    {
      title: "エッジテスト2",
      status: "失敗",
      input: "9 1",
      output: "9",
      error: "違う出力結果",
    },
  ];

  const sampleReviewData = [
    {
      title: "繰り返し（for）",
      description:
        "for文の基本を復習します。配列の要素を一つずつ取り出す方法を確認してください。",
    },
    {
      title: "関数",
      description:
        "関数の作り方と使い方を復習します。引数や戻り値についても思い出してください。",
    },
    {
      title: "文字列処理",
      description:
        "文字列を扱う方法を復習します。文字列の長さを調べたり、特定の文字を見つける方法を確認してください。",
    },
  ];

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          background: "#fff",
          borderRadius: "10px",
          position: "fixed",
          marginTop: "-10px",
          zIndex: "1000",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#000",
                textDecoration: "none",
              }}
            >
              FormCoder
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Typography variant="h5" sx={{ color: "#000" }}>
                総合分析結果
              </Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 0.03,
                display: { xs: "none", md: "flex" },
              }}
            >
              <Stack spacing={1} direction="row">
                <Button
                  onClick={shareAnalytics}
                  color="primary"
                  variant="outlined"
                >
                  結果をシェア
                </Button>
                <Button onClick={jumpToLearning} style={buttonStyle}>
                  終了する
                </Button>
              </Stack>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }}>
                <PersonIcon fontSize="large" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div>
        <Box sx={{ paddingTop: "80px" }}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item xs={6}>
                  <Graph />
                </Grid>
                <Grid item xs={6}>
                  <ReviewAdovice reviewList={sampleReviewData} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item xs={6}>
                  <General
                    score={sampleScore}
                    rank={sampleRank}
                    comment={sampleComment}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TestResult resultData={sampleResultData} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
