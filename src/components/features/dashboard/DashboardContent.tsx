import { DashboardContentProvider } from "./DashboardContentProvider";

type Props = {
  selectedMenu: string;
};

export const DashboardContent = (props: Props) => {
  const { selectedMenu } = props;
  return (
    <div style={{ background: "#f2f2f2", height: "700px" }}>
      <DashboardContentProvider selectedMenu={selectedMenu} />
    </div>
  );
};