import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

type Props = {
  title: string;
  description: string;
  url: string;
};

export const FormCard = (props: Props) => {
  const [userLogin, setUserLogin] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("ログイン中");
        setUserLogin(true);
      } else {
        // User is signed out
        setUserLogin(false);
        console.log("ログアウト済みです。");
      }
    });
  }, []);

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140, backgroundColor: "#a1d43b" }}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
          {userLogin ? (
            <Button
              size="medium"
              variant="contained"
              onClick={() => window.open(props.url, "_blank")}
            >
              始める
            </Button>
          ) : (
            <div>
              <Typography variant="body2" sx={{ color: "#eb4034" }}>
                始めるにはログインが必要です。
              </Typography>
            </div>
          )}
        </CardActions>
      </Card>
    </div>
  );
};
