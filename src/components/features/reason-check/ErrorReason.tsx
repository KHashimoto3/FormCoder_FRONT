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

export const ErrorReason = () => {
  const checkPoint = [
    "いずれかの行で、;（セミコロン）を書き忘れている（エディタ上で、赤線のエラーが出ていないか？）。",
    "ifやforといった制御の条件を書く部分の直後に、不要な ;（セミコロン）を書いている。",
    "変数名の綴りが間違っている。",
    "printfやscanfなどの関数名の綴りが違う。",
    "宣言していない変数名や関数名を使用しようとしている。",
    "カッコの対応が取れていない（カッコの閉じ忘れや開け忘れ）。",
    "基本のヘッダファイル（stdio.h）をインクルードしていない、あるいは綴りを間違っている。",
    "その他、必要なヘッダファイルをインクルードしていない（string.h、math.hなど）。",
    "配列を使う時、用意された範囲を超えて参照しようとしている。（例：５つしか要素を用意していないのに、６つ目の要素を参照しようとしている）。",
    "forやwhileのループで、終了条件が適切に設定されていないため、ループが永遠に続いてしまう。",
    "whileを使用する時、添え字（iやjなど）をインクリメント（増減）していない。",
    "Visual Studioで開発している場合、SDLチェックがオンになっている",
    "上記を確認したが、エラーは解消されていない。",
  ];

  return (
    <>
      <Typography variant="h6">
        エラーが出てコンパイルができないまたは実行時に例外が発生する
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
              <TableCell align="center">サンプル</TableCell>
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
                    <Button variant="contained">サンプル</Button>
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
