import { Typography } from "@mui/material";

type Props = {
  explanation: string;
};

export const TypeC = (props: Props) => {
  const explanation = props.explanation;
  return (
    <>
      <Typography variant="body1">{explanation}</Typography>
    </>
  );
};
