import { Box, Button } from "@mui/material";

export const Learning = () => {
  return (
    <Box sx={{ height: "1000px", paddingTop: "100px" }}>
      <Button
        size="large"
        onClick={() => {
          window.open("/form?form=sampleForm", "_blank");
        }}
      >
        実験用フォーム1
      </Button>
      <Button
        size="large"
        onClick={() => {
          window.open("/form", "_blank");
        }}
      >
        実験用フォーム2
      </Button>
    </Box>
  );
};
