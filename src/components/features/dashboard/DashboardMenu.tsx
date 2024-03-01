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
    <div style={{ height: "700px", borderRight: "1px solid #dbdbdb" }}>
      <Stack spacing={1} alignItems={"center"}>
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
      <Stack alignItems={"center"} sx={{ marginTop: "30px" }}>
        <Button
          variant="outlined"
          color="error"
          sx={{ width: "90%" }}
          onClick={logout}
        >
          ログアウト
        </Button>
      </Stack>
    </div>
  );
};
