import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
    "上記を確認したが、エラーは解消されていない。",
  ];
  return (
    <>
      <Typography variant="h6">
        エラーは出ないが、実行した結果の値が実行例と違う
      </Typography>
      <Typography variant="body1">
        該当するものがあったらチェックしてください。
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-aria-label="sample table">
          <TableHead>
            <TableRow>
              <TableCell align="center">該当チェック</TableCell>
              <TableCell align="center">チェック項目</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {checkPoint.map((point, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center">
                    <Checkbox {...label} />
                  </TableCell>
                  <TableCell>{point}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained">詳しく</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
