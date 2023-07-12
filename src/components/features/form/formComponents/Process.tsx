import { useContext } from "react";
import { HintContext } from "../../hint/HintProvider";
import { InputArrayProvider, InputContext } from "../InputArrayProvider";

type Props = {
  partType: string;
  explanation: string;
  inputIdx: number;
};

export const Process = (props: Props) => {
  const { setCurrentPartType } = useContext(HintContext);
  const { setHintTypeC } = useContext(HintContext);

  const { upDateInputArray } = useContext(InputContext);

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
