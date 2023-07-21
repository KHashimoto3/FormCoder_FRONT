import { useContext, useState } from "react";
import { FormData } from "../../../types/formData";
import { FormProvider } from "../FormProvider";
import { Process } from "./Process";
import { HintContext } from "../../hint/HintProvider";
import useInterval from "../hooks/useinterval";

type Props = {
  id: number;
  partType: string;
  explanation: string;
  childrenPart: string | FormData[];
  inputIdx: number;
};

export const For = (props: Props) => {
  const { setCurrentPartType } = useContext(HintContext);
  const { setHintTypeC } = useContext(HintContext);

  //タイマーに関する処理
  const [count, setCount] = useState<number>(0);
  const [delay, setDelay] = useState<number>(1000);
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

  const partType = props.partType;
  const explanation = props.explanation;

  const inputStyle = {
    fontSize: "16pt",
  };

  const preStyle = {
    fontSize: "16pt",
  };

  //子要素がなければエラーを出し、あればその子要素を表示する
  if (typeof props.childrenPart == "string") {
    alert(
      "データ不正エラー：Forフォームの中には、少なくとも１つの子要素が必要です。"
    );
    return <Process id={-1} partType="PROC" explanation="" inputIdx={-1} />;
  } else if (Array.isArray(props.childrenPart)) {
    const childrenPartArray: FormData[] = props.childrenPart;
    return (
      <>
        <pre style={preStyle}>
          for {"("}
          <input
            style={inputStyle}
            type="text"
            size={5}
            onFocus={() => {
              setCurrentPartType(partType);
              setHintTypeC(explanation);
              setIsRunning(true);
            }}
            onBlur={() => {
              setIsRunning(false);
            }}
          />
          {"; "}
          <input
            style={inputStyle}
            type="text"
            size={5}
            onFocus={() => {
              setCurrentPartType(partType);
              setHintTypeC(explanation);
              setIsRunning(true);
            }}
            onBlur={() => {
              setIsRunning(false);
            }}
          />
          {"; "}
          <input
            style={inputStyle}
            type="text"
            size={5}
            onFocus={() => {
              setCurrentPartType(partType);
              setHintTypeC(explanation);
              setIsRunning(true);
            }}
            onBlur={() => {
              setIsRunning(false);
            }}
          />
          {") {\n"}
        </pre>
        <div style={{ marginLeft: "50px" }}>
          {childrenPartArray.map((childrenPart) => {
            return (
              <>
                <FormProvider
                  key={childrenPart.id}
                  id={childrenPart.id}
                  partType={childrenPart.partType}
                  explanation={childrenPart.explanation}
                  childrenPart={childrenPart.childrenPart}
                  inputIdx={childrenPart.inputIdx}
                />
                <br />
              </>
            );
          })}
        </div>
        <pre style={preStyle}>{"}"}</pre>
      </>
    );
  }
};
