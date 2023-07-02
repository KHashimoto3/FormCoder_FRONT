import { useContext } from "react";
import { HintContext } from "../../hint/HintProvider";

type Props = {
  partType: string;
  explanation: string;
};

export const Process = (props: Props) => {
  const { setCurrentPartType } = useContext(HintContext);
  const { setHintTypeC } = useContext(HintContext);

  const partType = props.partType;
  const explanation = props.explanation;
  console.log(partType); //理由：propsを受け取って使わないという事態を防ぐためにつけている
  return (
    <textarea
      cols={40}
      rows={4}
      onFocus={() => {
        setCurrentPartType(partType);
        setHintTypeC(explanation);
        console.log("切り替えます！");
      }}
    ></textarea>
  );
};
