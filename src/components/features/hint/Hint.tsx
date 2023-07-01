import { useContext, useEffect, useState } from "react";
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
  const { partType } = useContext(HintContext);
  const { hintTypeC } = useContext(HintContext);

  const hintData: HintData[] = [
    {
      partType: "DAMY",
      partTitle: "ヒント非表示",
      hintList: [
        {
          hintTitle: "つまずきに応じたヒントを出します",
          hint: "ヒントの説明",
        },
      ],
    },
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
          hint: "",
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
          hint: "",
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
          hint: "",
        },
      ],
    },
  ];

  //TypeCのヒントを展開するためのIdx
  const [hintTypeCIdx, setHintTypeCIdx] = useState<number>(0);
  const [currentHintData, setCurrentHintData] = useState<HintData>(hintData[0]);

  //partTypeの変更を検知し、それに合ったヒントをカレントなヒントデータとする
  useEffect(() => {
    hintData.map((hint) => {
      if (hint.partType == partType) {
        setCurrentHintData(hint);
      }
    });
  }, [hintTypeCIdx]);

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
          {currentHintData.hintList.map((hint, index) => {
            if (hint.hint == "") {
              hint.hint = hintTypeC;
              setHintTypeCIdx(hintTypeCIdx + 1);
            }
            return (
              <Accordion key={hint.hint}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ backgroundColor: "#e3f4ff" }}
                >
                  <Typography variant="h5">
                    つまずき{index + 1}：{hint.hintTitle}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="h6">{hint.hintTitle}</Typography>
                  <Typography variant="body1">{hint.hint}</Typography>
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
