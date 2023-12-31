import { Typography } from "@mui/material";

type Props = {
  hintText: string;
};

export const TypeA = (props: Props) => {
  const hintText = props.hintText;
  return (
    <>
      <Typography variant="h6">{hintText}</Typography>
    </>
  );
};
