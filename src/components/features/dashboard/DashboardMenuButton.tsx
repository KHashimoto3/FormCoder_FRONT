import { Button, ThemeProvider, createTheme } from "@mui/material";

type Props = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

export const DashboardMenuButton = (props: Props) => {
  const { label, selected, onClick } = props;
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="text"
        sx={{ background: selected ? "#f2f2f2" : "#ffffff" }}
        onClick={onClick}
      >
        {label}
      </Button>
    </ThemeProvider>
  );
};
