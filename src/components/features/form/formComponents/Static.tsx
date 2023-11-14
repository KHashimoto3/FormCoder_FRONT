type Props = {
  id: number;
  partType: string;
  explanation: string;
  inputIdx: number;
};

export const Static = (props: Props) => {
  const dispData = props.explanation;

  return (
    <textarea
      style={{
        fontSize: "16pt",
      }}
      cols={40}
      rows={4}
      value={dispData}
    ></textarea>
  );
};
