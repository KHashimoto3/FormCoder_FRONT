import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { HintContext } from "../../hint/HintProvider";
import { InputContext } from "../InputArrayProvider";
import useInterval from "../hooks/useinterval";
import ReactCodeMirror from "@uiw/react-codemirror";
import { cppLanguage } from "@codemirror/lang-cpp";

import useTextDiff from "../../sequence/hooks/useTextDiff";
import { TimestampContext } from "../../sequence/TimestampProvider";

type Props = {
  id: number;
  partType: string;
  explanation: string;
  inputIdx: number;
};

export const Data = (props: Props) => {
  const { setCurrentPartType } = useContext(HintContext);
  const { setHintTypeC } = useContext(HintContext);
  const { setCurrentHintId } = useContext(HintContext);

  const { upDateInputArray } = useContext(InputContext);

  //シーケンス関連
  const { initInputIdAndType, textInput, setTextInput } = useTextDiff();
  const { recordTimestamp } = useContext(TimestampContext);

  useEffect(() => {
    initInputIdAndType(props.id, props.partType);
  }, []);

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
    isRunning ? delay : null,
  );

  //upDateInputArrayにstringの配列を渡す
  const updateInput = (idx: number, input: string) => {
    const str: string[] = [input];
    upDateInputArray(idx, str);
  };

  const onChange = useCallback(
    (val: SetStateAction<string>) => {
      recordTimestamp();
      setTextInput(val);
    },
    [setTextInput],
  );

  const formId = props.id;
  const partType = props.partType;
  const explanation = props.explanation;
  return (
    <ReactCodeMirror
      onFocus={() => {
        setCurrentHintId(formId);
        setCurrentPartType(partType);
        setHintTypeC(explanation);
        setIsRunning(true);
      }}
      value={textInput}
      extensions={[cppLanguage]}
      style={{ fontSize: "16pt" }}
      onChange={onChange}
      onBlur={() => {
        updateInput(props.inputIdx, textInput);
        setIsRunning(false);
      }}
    ></ReactCodeMirror>
  );
};
