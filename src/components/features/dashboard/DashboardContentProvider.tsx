import { DBEdit } from "./dashboardContents/DBEdit";
import { DBHistory } from "./dashboardContents/DBHistory";
import { DBLearn } from "./dashboardContents/DBLearn";
import { DBSetting } from "./dashboardContents/DBSetting";

type Props = {
  selectedMenu: string;
};

export const DashboardContentProvider = (props: Props) => {
  const { selectedMenu } = props;
  if (selectedMenu === "学習") {
    return <DBLearn />;
  } else if (selectedMenu === "編集") {
    return <DBEdit />;
  } else if (selectedMenu === "学習履歴") {
    return <DBHistory />;
  } else if (selectedMenu === "設定") {
    return <DBSetting />;
  } else {
    return <div>コンテンツが見つかりません</div>;
  }
};
