import { Button, Stack } from "@mui/material";
import { DashboardMenuButton } from "./DashboardMenuButton";
import { DashboardMenuUser } from "./DashboardMenuUser";

import { useUserData } from "../../common/hooks/useUserData";

type Props = {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
};

export const DashboardMenu = (props: Props) => {
  const { selectedMenu, setSelectedMenu } = props;

  const { removeUserData } = useUserData();

  console.log(selectedMenu);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    console.log("menu: ", menu);
  };

  const logout = () => {
    removeUserData();
    alert("ログアウトしました");
    window.location.href = "/";
  };

  //メニューを追加する場合はここに追加する
  const menuList = ["学習", "編集", "学習履歴", "設定"];

  return (
    <div style={{ height: "700px" }}>
      <Stack spacing={1}>
        <DashboardMenuUser />
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
