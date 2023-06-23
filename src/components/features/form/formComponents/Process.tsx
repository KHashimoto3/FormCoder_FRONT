type Props = {
  partType: string;
};

export const Process = (props: Props) => {
  const partType = props.partType;
  console.log(partType);
  return <textarea cols={40} rows={4}></textarea>;
};
