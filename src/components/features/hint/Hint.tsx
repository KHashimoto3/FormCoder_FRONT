import { useContext } from "react";
import { HintContext } from "./HintProvider";

import {
  Button,
  Container,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface HintList {
  hintTitle: string;
  hint: string;
}

interface HintData {
  partType: string;
  partTitle: string;
  hintList: HintList[];
}

export const Hint = () => {
  //ヒントのリスト（MainPageから渡された）
  const { partType } = useContext(HintContext);
  const { hintTypeC } = useContext(HintContext);

  let hintData: HintData[] = [
    {
      partType: "PROC",
      partTitle: "計算・代入",
      hintList: [
        {
          hintTitle: "何を書くパートなのかわからない",
          hint: "ここには、計算・代入の処理を記述します",
        },
        {
          hintTitle: "計算・代入の処理の書き方がわからない",
          hint: "文法の説明",
        },
        {
          hintTitle: "何を計算、代入したらいいかわからない",
          hint: "説明",
        },
      ],
    },
    {
      partType: "FOR",
      partTitle: "繰り返し（for）",
      hintList: [
        {
          hintTitle: "何を書くパートなのかわからない",
          hint: "ここには、繰り返し（for）を記述します",
        },
        {
          hintTitle: "繰り返し（for）の書き方がわからない",
          hint: "文法の説明",
        },
        {
          hintTitle: "どのような繰り返しの設定にしたらいいかわからない",
          hint: "説明",
        },
      ],
    },
    {
      partType: "FUN",
      partTitle: "関数定義",
      hintList: [
        {
          hintTitle: "何を書くパートなのかわからない",
          hint: "ここには、関数定義を記述します",
        },
        {
          hintTitle: "関数定義の書き方がわからない",
          hint: "文法の説明",
        },
        {
          hintTitle: "どのような関数を定義したらいいかわからない",
          hint: "説明",
        },
      ],
    },
  ];

  const grammerCodeStyle = {
    backgroundColor: "#363636",
    fontSize: "14pt",
    color: "#fff",
    width: "100%",
  };

  console.log(partType);
  console.log(hintTypeC);

  return (
    <Container maxWidth="md">
      <Typography variant="h4">STEP1: ステップ名</Typography>
      <Container maxWidth="md" sx={{ marginBottom: "30px" }}>
        <div>
          {hintList.map((hint, index) => {
            return (
              <Accordion key={hint.hint}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ backgroundColor: "#e3f4ff" }}
                >
                  <Typography variant="h5">
                    つまずき{index + 1}：{hint.hint}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="h6">for文の書き方</Typography>
                  <textarea style={grammerCodeStyle} cols={40} rows={4}>
                    {hint.explanation}
                  </textarea>
                  <br />
                  <Typography variant="body1">
                    カウンタ変数の初期化：何回目のループかをカウントする変数を初期化します。通常は0で初期化します。
                    <br />
                    継続条件：ループの中身に書く処理を、何の条件を満たす間行うかを条件式で設定します。
                    <br />
                    カウンタの増減：ループの中身の処理を一回実行した時に、カウンタ変数をどのように増減するかを設定します。通常は１つずつ増やすカウントアップを行います。
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
        <hr />
        <Stack spacing={2}>
          <Button size="small" variant="contained">
            知りたい情報はこの中にない
          </Button>
          <Button size="small" variant="contained">
            今はつまずいていない
          </Button>
        </Stack>
      </Container>
    </Container>
  );
};
