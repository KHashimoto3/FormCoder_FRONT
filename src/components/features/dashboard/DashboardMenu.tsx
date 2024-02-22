import { Button, Stack } from "@mui/material";
import { DashboardMenuButton } from "./DashboardMenuButton";
import { DashboardMenuUser } from "./DashboardMenuUser";

type Props = {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  avatarImage: string;
};

export const DashboardMenu = (props: Props) => {
  const { selectedMenu, setSelectedMenu, avatarImage } = props;

  console.log(selectedMenu);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    console.log("menu: ", menu);
  };

  const logout = () => {
    console.log("ログアウト");
  };

  //メニューを追加する場合はここに追加する
  const menuList = ["学習", "編集", "学習履歴", "設定"];

  return (
    <div style={{ height: "500px" }}>
      <Stack spacing={1}>
        <DashboardMenuUser avatarImage={avatarImage} />
        {menuList.map((menu) => (
          <DashboardMenuButton
            key={menu}
            label={menu}
            selected={selectedMenu === menu ? true : false}
            onClick={() => handleMenuClick(menu)}
          />
        ))}
      </Stack>
      <Button
        variant="outlined"
        color="error"
        sx={{ width: "100%", marginTop: "30px" }}
        onClick={logout}
      >
        ログアウト
      </Button>
    </div>
  );
};
