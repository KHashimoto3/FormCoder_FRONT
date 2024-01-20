import { Card, CardActions, CardContent, Skeleton } from "@mui/material";

export const FormCardSkelton = () => {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
        <CardContent>
          <div>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </div>
        </CardContent>
        <CardActions>
          <Skeleton animation="wave" height={10} width="80%" />
        </CardActions>
      </Card>
    </div>
  );
};
