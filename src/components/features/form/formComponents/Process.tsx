import { useContext, useState } from "react";
import { HintContext } from "../../hint/HintProvider";
import { InputContext } from "../InputArrayProvider";
import useInterval from "../hooks/useinterval";

type Props = {
  id: number;
  partType: string;
  explanation: string;
  inputIdx: number;
};

export const Process = (props: Props) => {
  const { setCurrentPartType } = useContext(HintContext);
  const { setHintTypeC } = useContext(HintContext);
  const { setCurrentHintId } = useContext(HintContext);

  const { upDateInputArray } = useContext(InputContext);

  const [input, setInput] = useState<string>("");

  //タイマーに関する処理
  const [count, setCount] = useState<number>(0);
  const [delay] = useState<number>(1000);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const { setCurrentHintStep } = useContext(HintContext);

  //intervalを使うためのカスタムフック
  useInterval(
    () => {
      console.log("render:", count);
      setCount(count + 1);
      if (count < 6) {
        setCurrentHintStep(-1);
      } else if (count < 18) {
        setCurrentHintStep(0);
      } else if (count < 36) {
        setCurrentHintStep(1);
      } else if (count < 60) {
        setCurrentHintStep(2);
      } else if (count >= 60) {
        console.log("時間切れです！！");
        setCurrentHintStep(2);
      }
    },
    isRunning ? delay : null
  );

  //upDateInputArrayにstringの配列を渡す
  const updateInput = (idx: number, input: string) => {
    const str: string[] = [input];
    upDateInputArray(idx, str);
  };

  const formId = props.id;
  const partType = props.partType;
  const explanation = props.explanation;
  return (
    <textarea
      style={{
        fontSize: "16pt",
      }}
      cols={40}
      rows={4}
      onFocus={() => {
        setCurrentHintId(formId);
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
