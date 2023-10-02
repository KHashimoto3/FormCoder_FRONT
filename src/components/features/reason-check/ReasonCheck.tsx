import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const ReasonCheck = () => {
  return (
    <>
      <h1>原因チェックページです。</h1>
      <p>以下のチェック項目を元に、エラーや間違いを解消してみましょう！</p>
      <div>
        <h2>エラーが発生する場合</h2>
        <p>エラーが出てコンパイルができないまたは実行時に例外が発生する。</p>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="いずれかの行で、;（セミコロン）を書き忘れている"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="ifやforといった制御の条件の直後に、不要な ;（セミコロン）を書いている"
          />
        </FormGroup>
      </div>
      <div>
        <h2>実行結果が違う場合</h2>
        <p>エラーは出ないが、実行した結果の値が実行例と違う。</p>
      </div>
    </>
  );
};
