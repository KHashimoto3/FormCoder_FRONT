import { useContext, useState } from "react";
import { HintContext } from "../../hint/HintProvider";
import { InputContext } from "../InputArrayProvider";
import useInterval from "../hooks/useinterval";
import { cppLanguage } from "@codemirror/lang-cpp";
import ReactCodeMirror from "@uiw/react-codemirror";

type Props = {
  id: number;
  partType: string;
  explanation: string;
  inputIdx: number;
};

export const Struct = (props: Props) => {
  const { setCurrentPartType } = useContext(HintContext);
  const { setHintTypeC } = useContext(HintContext);
  const { setCurrentHintId } = useContext(HintContext);

  //入力の記録に関する処理
  const { upDateInputArray } = useContext(InputContext);
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");

  const updateInput = (idx: number, input1: string, input2: string) => {
    const str: string[] = [input1, input2];
    upDateInputArray(idx, str);
  };

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

  const formId = props.id;
  const partType = props.partType;
  const explanation = props.explanation;

  const inputStyle = {
    fontSize: "16pt",
  };

  const preStyle = {
    fontSize: "16pt",
  };

  const onChange2 = (val: string) => {
    setInput2(val);
  };

  return (
    <>
      <pre style={preStyle}>
        struct{" "}
        <input
          style={inputStyle}
          type="text"
          size={5}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInput1(event.target.value);
          }}
          onFocus={() => {
            setCurrentHintId(formId);
            setCurrentPartType(partType);
            setHintTypeC(explanation);
            setIsRunning(true);
          }}
          onBlur={() => {
            updateInput(props.inputIdx, input1, input2);
            setIsRunning(false);
          }}
        />{" "}
        {"{\n"}
      </pre>
      <div style={{ marginLeft: "50px" }}>
        <ReactCodeMirror
          onFocus={() => {
            setCurrentHintId(formId);
            setCurrentPartType(partType);
            setHintTypeC(explanation);
            setIsRunning(true);
          }}
          value={input2}
          extensions={[cppLanguage]}
          style={{ fontSize: "16pt" }}
          onChange={onChange2}
          onBlur={() => {
            updateInput(props.inputIdx, input1, input2);
            setIsRunning(false);
          }}
        ></ReactCodeMirror>
      </div>
      <pre style={preStyle}>{"}"}</pre>
    </>
  );
};
