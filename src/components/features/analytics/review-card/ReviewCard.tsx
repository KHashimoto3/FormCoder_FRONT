import { Box, Button, Card, CardContent, Typography } from "@mui/joy";

type Props = {
  title: string;
  description: string;
  onClick: () => void;
};

export const ReviewCard = (props: Props) => {
  const { title, description, onClick } = props;
  return (
    <div>
      <Box
        sx={{
          width: "280px",
          maxWidth: 500,
          display: "flex",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 2,
        }}
      >
        <Card variant="outlined">
          <CardContent>
            <Typography fontWeight="bold" level="title-md">
              {title}
            </Typography>
            <Typography>{description}</Typography>
            <Button variant="solid" color="primary" onClick={onClick}>
              復習する
            </Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};
