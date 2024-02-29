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

  const selectedButtonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
  };

  const unselectedButtonStyle = {
    color: "#000000",
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="text"
        style={selected ? selectedButtonStyle : unselectedButtonStyle}
        onClick={onClick}
      >
        {label}
      </Button>
    </ThemeProvider>
  );
};
