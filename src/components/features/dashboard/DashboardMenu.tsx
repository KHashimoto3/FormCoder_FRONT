import { Button, Stack } from "@mui/material";

type Props = {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
};

export const DashboardMenu = (props: Props) => {
  const { selectedMenu, setSelectedMenu } = props;

  console.log(selectedMenu);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    console.log("menu: ", menu);
  };

  return (
    <div style={{ height: "100%" }}>
      <Stack spacing={1}>
        <Button variant="text" onClick={() => handleMenuClick("学習")}>
          学習
        </Button>
        <Button variant="text" onClick={() => handleMenuClick("編集")}>
          編集
        </Button>
        <Button variant="text" onClick={() => handleMenuClick("学習履歴")}>
          学習履歴
        </Button>
        <Button variant="text" onClick={() => handleMenuClick("設定")}>
          設定
        </Button>
      </Stack>
    </div>
  );
};
