type Props = {
  selectedMenu: string;
};

export const DashboardContent = (props: Props) => {
  const { selectedMenu } = props;
  return (
    <div style={{ background: "#f2f2f2", height: "100%" }}>
      <h1>{selectedMenu}の画面が表示されます。</h1>
    </div>
  );
};
