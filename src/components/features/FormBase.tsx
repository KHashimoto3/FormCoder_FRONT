import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Hint } from "./hint/Hint";
import { Form } from "./form/Form";

/*interface FormData {
  stepName: string;
  hintList: HintList[];
}

interface HintList {
  hint: string;
  explanation: string;
}*/

export const FormBase = () => {
  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  /*
  const formData: FormData[] = [
    {
      stepName: "ヘッダコメント",
      hintList: [
        {
          hint: "何を書くパートなのかわからない",
          explanation: "説明１",
        },
        {
          hint: "ヘッダコメントの書き方がわからない",
          explanation: "説明2",
        },
      ],
    },
    {
      stepName: "インクルード・マクロ定義",
      hintList: [
        {
          hint: "何を書くパートなのかわからない",
          explanation: "説明１",
        },
        {
          hint: "プロトタイプ宣言・インクルードの書き方がわからない",
          explanation: "説明2",
        },
        {
          hint: "何を宣言・インクルードすればよいのかわからない",
          explanation: "説明3",
        },
      ],
    },
    {
      stepName: "変数・配列の宣言",
      hintList: [
        {
          hint: "何を書くパートなのかわからない",
          explanation: "説明１",
        },
        {
          hint: "変数、配列、構造体の宣言の仕方がわからない",
          explanation: "説明2",
        },
        {
          hint: "何を宣言したらいいのかわからない",
          explanation: "説明3",
        },
      ],
    },
    {
      stepName: "繰り返し処理",
      hintList: [
        {
          hint: "何を書くパートなのかわからない",
          explanation: "説明１",
        },
        {
          hint: "forの書き方がわからない",
          explanation:
            "for (カウンタ変数の初期化; 継続条件; カウンタの増減) {\n\t//継続条件を満たす間繰り返す処理\n}",
        },
        {
          hint: "条件の書き方がわからない",
          explanation: "説明3",
        },
        {
          hint: "カウンタ変数の初期化; 継続条件; カウンタの増減に設定する値かわからない",
          explanation: "説明4",
        },
      ],
    },
    {
      stepName: "複数条件分岐",
      hintList: [
        {
          hint: "何を書くパートなのかわからない",
          explanation: "説明１",
        },
        {
          hint: "ifの書き方がわからない",
          explanation: "説明2",
        },
        {
          hint: "条件の書き方がわからない",
          explanation: "説明3",
        },
        {
          hint: "どのような条件にするのかわからない",
          explanation: "説明4",
        },
      ],
    },
  ];*/

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          background: "#fff",
          borderRadius: "10px",
          position: "fixed",
          marginTop: "15px",
          zIndex: "1000",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
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
                フォーム名
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0.03, display: { xs: "none", md: "flex" } }}>
              <Button style={buttonStyle}>保存して終了</Button>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }}>
                <PersonIcon fontSize="large" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Hint />
          </Grid>
          <Grid item xs={7}>
            <Form />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
