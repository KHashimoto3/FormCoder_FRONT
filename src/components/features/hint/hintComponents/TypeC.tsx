import { Typography } from "@mui/material";

type Props = {
  explanation: string;
};

export const TypeC = (props: Props) => {
  const explanation = props.explanation;
  return (
    <>
      <Typography variant="h6">解説</Typography>
      <Typography variant="body1">{explanation}</Typography>
    </>
  );
};
