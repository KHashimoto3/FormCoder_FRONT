type Props = {
  partType: string;
  explanation: string;
};

export const Process = (props: Props) => {
  const partType = props.partType;
  console.log(partType); //理由：propsを受け取って使わないという事態を防ぐためにつけている
  return <textarea cols={40} rows={4}></textarea>;
};
