import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useHistory } from "react-router-dom";

import systemImg from "../../../assets/system_img.png";

export const Top = () => {
  const history = useHistory();

  const backgroundStyle = {
    background:
      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(236,246,255,1) 100%)",
  };

  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  return (
    <>
      <Box
        sx={{ height: "auto", paddingBottom: "100px" }}
        style={backgroundStyle}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: "center", paddingTop: "200px" }}>
              <Stack spacing={3}>
                <Typography
                  data-testid="home-title"
                  variant="h3"
                  sx={{ fontWeight: "bold" }}
                >
                  フォームを使った
                  <br />
                  プログラミング学習
                </Typography>
                <Box>
                  <Button
                    style={buttonStyle}
                    size="large"
                    onClick={() => {
                      history.push("/learning");
                    }}
                  >
                    <PlayCircleOutlineIcon />
                    フォーム一覧へ
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: "center", paddingTop: "150px" }}>
              <img
                style={{ width: "95%" }}
                src={systemImg}
                alt="画面イメージ"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ height: "auto", paddingBottom: "100px" }}>
        <Box
          sx={{
            textAlign: "center",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              paddingTop: "100px",
              fontWeight: "bold",
            }}
          >
            Form Coderの主な特徴
          </Typography>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", paddingTop: "20px" }}
          >
            Form
            Coderでは、今までになかった以下のような特徴により、主に初心者の方々がプログラミングを学びやすくなるように工夫されています。
          </Typography>
        </Box>
        <Grid container spacing={1} sx={{ margin: "20px" }}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: "center", paddingTop: "50px" }}>
              <img
                style={{ width: "95%" }}
                src={systemImg}
                alt="画面イメージ"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                textAlign: "center",
                paddingTop: "50px",
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  1. フォームのUIによるコーディングの補助
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14pt",
                    textAlign: "left",
                  }}
                >
                  通常のエディタのような１つだけの入力欄ではなく、プログラムが大まかな構成ごとに分けられてフォームのように入力欄が提示することで、学習者のコーディングを進めやすくします。
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                textAlign: "center",
                paddingTop: "50px",
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  2. つまずきの原因に応じたヒントの提示
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14pt",
                    textAlign: "left",
                  }}
                >
                  従来のような１つだけのヒントではなく、学習者のつまずきの３つの原因に応じて、それぞれに合ったヒントの提示を行います。
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: "center", paddingTop: "50px" }}>
              <img
                style={{ width: "95%" }}
                src={systemImg}
                alt="画面イメージ"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: "center", paddingTop: "50px" }}>
              <img
                style={{ width: "95%" }}
                src={systemImg}
                alt="画面イメージ"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                textAlign: "center",
                paddingTop: "50px",
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  3. コンパイルエラーの解決策を提示
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14pt",
                    textAlign: "left",
                  }}
                >
                  コンパイルエラーがあった時には、エラーの原文に加えて、わかりやすくした日本語と、どのようにエラーを解決すれば良いのかの指示文を提示します。エラーが解らないことによるつまずきの解消に繋げます。
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                textAlign: "center",
                paddingTop: "50px",
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  4. プログラムの打ち方の様子を可視化
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14pt",
                    textAlign: "left",
                  }}
                >
                  プログラムのうまさは、「正しくコードを書けるか」だけではありません。Form
                  Coderでは、速度や書き間違いの割合など、プログラムを打つ時の様子を「コーディングシーケンス」として記録し、グラフを用いて可視化します。平均や過去の自分と比較して、どれだけ打ち方が上手かを確認できます。
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: "center", paddingTop: "50px" }}>
              <img
                style={{ width: "95%" }}
                src={systemImg}
                alt="画面イメージ"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
