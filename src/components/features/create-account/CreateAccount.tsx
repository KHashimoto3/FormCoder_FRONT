import { Container, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const CreateAccount = () => {
  return (
    <div>
      <Container maxWidth="sm">
        <Typography
          variant="h6"
          component="div"
          onClick={() => {
            location.href = "/";
          }}
          sx={{ cursor: "pointer" }}
          gutterBottom
        >
          <ArrowBackIcon sx={{ marginRight: "10px" }} />
          ホームに戻る
        </Typography>
        <Typography variant="h4">アカウントの作成</Typography>
      </Container>
    </div>
  );
};
