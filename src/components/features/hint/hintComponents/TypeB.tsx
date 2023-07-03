import { Typography } from "@mui/material";

export const TypeB = () => {
  const grammerCodeStyle = {
    backgroundColor: "#363636",
    fontSize: "14pt",
    color: "#fff",
    width: "100%",
  };

  const sampleCode =
    'for ("カウンタ変数の初期化"; "継続条件"; "カウンタの増減") {\n   //継続条件を満たす間繰り返す処理\n}';

  return (
    <>
      <Typography variant="h6">for文の書き方</Typography>
      <textarea style={grammerCodeStyle} cols={40} rows={4}>
        {sampleCode}
      </textarea>
      <br />
      <Typography variant="body1">
        カウンタ変数の初期化：何回目のループかをカウントする変数を初期化します。通常は0で初期化します。
        <br />
        継続条件：ループの中身に書く処理を、何の条件を満たす間行うかを条件式で設定します。
        <br />
        カウンタの増減：ループの中身の処理を一回実行した時に、カウンタ変数をどのように増減するかを設定します。通常は１つずつ増やすカウントアップを行います。
      </Typography>
    </>
  );
};
