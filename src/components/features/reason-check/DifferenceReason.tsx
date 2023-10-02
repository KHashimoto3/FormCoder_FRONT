import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

export const DifferenceReason = () => {
  const checkPoint = [
    "変数の値が初期化されていない。",
    "変数の値が更新されていない。",
    "表示したい変数や値の型と、printf内で指定したフォーマット（「%d」や「%f」など）が異なっている。",
    "ifにおいて”等しい”かを確認する条件の時、条件式の「==」が「=」になっている。",
    "ifにおいて、より大きいなのか以上なのかの条件指定が違う（例： <=とすべきところを、<としてしまっている）。",
    "ifにおいて、より小さいなのか以下なのかの条件指定が違う（例： >=とすべきところを、>としてしまっている）。",
    "ifにおいて、条件として判断すべき変数や関数が違う。",
    "ポインタのアドレスを表示するとき、フォーマットが%pになっていない。",
    "ポインタが指す内容を表示するとき、ポインタ名の前に * （アスタリスク）がついていない。",
    "宣言したポインタに、変数のアドレスを格納していない（初期化していない）。",
  ];
  return (
    <>
      <Typography variant="h6">
        エラーは出ないが、実行した結果の値が実行例と違う
      </Typography>
      <Typography variant="body1">
        該当するものがあったらチェックしてください。
      </Typography>
      <FormGroup>
        {checkPoint.map((point, index) => {
          return (
            <>
              <FormControlLabel
                key={index}
                control={<Checkbox />}
                label={point}
              />
            </>
          );
        })}
      </FormGroup>
    </>
  );
};
