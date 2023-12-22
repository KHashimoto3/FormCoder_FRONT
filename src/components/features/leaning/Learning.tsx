import { Box, Grid, Typography } from "@mui/material";
import { FormCard } from "./FormCard";
import { FormCardList } from "../../types/formCardList";

export const Learning = () => {
  const formCardList: FormCardList[] = [
    {
      id: 1,
      title: "Experiment1",
      description: "実験用のフォーム1です。",
      url: "/form?form=experiment1",
    },
    {
      id: 2,
      title: "Experiment2",
      description: "実験用のフォーム2です。",
      url: "/form?form=experiment2-2",
    },
  ];

  return (
    <Box sx={{ height: "1000px", paddingTop: "160px" }}>
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        すべてのフォーム
      </Typography>
      <Grid container spacing={1}>
        {formCardList.map((formCard) => (
          <Grid item xs={3} key={formCard.id}>
            <FormCard
              title={formCard.title}
              description={formCard.description}
              url={formCard.url}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
