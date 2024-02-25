import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";

import { useUserData } from "../../common/hooks/useUserData";

type Props = {
  id: string;
  title: string;
  description: string;
  url: string;
};

export const FormCard = (props: Props) => {
  const { getUserData } = useUserData();

  const openFormWindow = () => {
    const url = props.url + "&formId=" + props.id;
    window.open(url, "_blank");
  };

  const [loginUser, setLoginUser] = useState<boolean>(false);

  useEffect(() => {
    const userData = getUserData();
    if (userData.userId !== undefined) {
      setLoginUser(true);
    }
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
          {loginUser ? (
            <Button size="medium" variant="contained" onClick={openFormWindow}>
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
