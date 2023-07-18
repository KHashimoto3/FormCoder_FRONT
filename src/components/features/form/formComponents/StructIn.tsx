import { useContext, useState } from "react";
import { HintContext } from "../../hint/HintProvider";
import { InputContext } from "../InputArrayProvider";

type Props = {
  partType: string;
  explanation: string;
  inputIdx: number;
};

export const StructIn = (props: Props) => {
  const { setCurrentPartType } = useContext(HintContext);
  const { setHintTypeC } = useContext(HintContext);

  const { upDateInputArray } = useContext(InputContext);

  const [input, setInput] = useState<string>("");

  //upDateInputArrayにstringの配列を渡す
  const updateInput = (idx: number, input: string) => {
    const str: string[] = [input];
    upDateInputArray(idx, str);
  };

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
      value={input}
      onChange={(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setInput(event.target.value);
      }}
      onBlur={() => updateInput(props.inputIdx, input)}
    ></textarea>
  );
};
