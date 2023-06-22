import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { Hint } from "./features/hint/Hint";
import { Form } from "./features/form/Form";

interface FormData {
  stepName: string;
  hintList: HintList[];
}

interface HintList {
  hint: string;
  explanation: string;
}

export const FormBase = () => {
  const [formDataIndex, setFormDataIndex] = useState<number>(0);

  const changeFormDataIndex = (index: number) => {
    setFormDataIndex(index);
  };

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
  ];

  return (
    <div>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Hint
              stepNo={formDataIndex + 1}
              stepName={formData[formDataIndex].stepName}
              hintList={formData[formDataIndex].hintList}
            />
          </Grid>
          <Grid item xs={7}>
            <Form changeFormDataIndex={changeFormDataIndex} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
