import { Chip } from "@mui/material";

type Props = {
  status: string;
};

export const ExecStatus = (props: Props) => {
  const { status } = props;
  if (status === "Ready") {
    return <Chip label="Ready" color="secondary" size="small" />;
  } else if (status === "success") {
    return <Chip label="success" color="success" size="small" />;
  } else {
    return <Chip label="error" color="error" size="small" />;
  }
};
