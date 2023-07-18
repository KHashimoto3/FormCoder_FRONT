import { useContext, useState } from "react";
import { HintContext } from "../../hint/HintProvider";
import { InputContext } from "../InputArrayProvider";
import useInterval from "../hooks/useinterval";

type Props = {
  partType: string;
  explanation: string;
  inputIdx: number;
};

export const Process = (props: Props) => {
  const { setCurrentPartType } = useContext(HintContext);
  const { setHintTypeC } = useContext(HintContext);

  const { upDateInputArray } = useContext(InputContext);

  const [input, setInput] = useState<string>("");

  //interval
  const [count, setCount] = useState<number>(0);
  const [delay, setDelay] = useState<number>(1000);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  //intervalを使うためのカスタムフック
  useInterval(
    () => {
      console.log("render:", count);
      setCount(count + 1);
    },
    isRunning ? delay : null
  );

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
        setIsRunning(true);
      }}
      value={input}
      onChange={(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setInput(event.target.value);
      }}
      onBlur={() => {
        updateInput(props.inputIdx, input);
        setIsRunning(false);
      }}
    ></textarea>
  );
};
