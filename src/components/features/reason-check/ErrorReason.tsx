import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const ErrorReason = () => {
  return (
    <>
      <p>エラーが出てコンパイルができないまたは実行時に例外が発生する</p>
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
    </>
  );
};
