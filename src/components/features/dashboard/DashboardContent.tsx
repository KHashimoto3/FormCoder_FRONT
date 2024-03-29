import { DashboardContentProvider } from "./DashboardContentProvider";

type Props = {
  selectedMenu: string;
};

export const DashboardContent = (props: Props) => {
  const { selectedMenu } = props;
  return (
    <div style={{ height: "700px", width: "100%" }}>
      <DashboardContentProvider selectedMenu={selectedMenu} />
    </div>
  );
};
