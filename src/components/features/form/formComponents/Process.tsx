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
  return (
    <textarea
      cols={40}
      rows={4}
      onFocus={() => {
        setCurrentPartType(partType);
        setHintTypeC(explanation);
      }}
    ></textarea>
  );
};
