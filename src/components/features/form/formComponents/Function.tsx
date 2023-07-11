import { useContext } from "react";
import { FormData } from "../../../types/formData";
import { FormProvider } from "../FormProvider";
import { Process } from "./Process";
import { HintContext } from "../../hint/HintProvider";

type Props = {
  partType: string;
  explanation: string;
  childrenPart: string | FormData[];
};

export const Function = (props: Props) => {
  const { setCurrentPartType } = useContext(HintContext);
  const { setHintTypeC } = useContext(HintContext);

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
      "データ不正エラー：Functionフォームの中には、少なくとも１つの子要素が必要です。"
    );
    return <Process partType="PROC" explanation="" />;
  } else if (Array.isArray(props.childrenPart)) {
    const childrenPartArray: FormData[] = props.childrenPart;
    return (
      <>
        <pre style={preStyle}>
          <input
            style={inputStyle}
            type="text"
            size={5}
            onFocus={() => {
              setCurrentPartType(partType);
              setHintTypeC(explanation);
            }}
          />{" "}
          <input
            style={inputStyle}
            type="text"
            size={5}
            onFocus={() => {
              setCurrentPartType(partType);
              setHintTypeC(explanation);
            }}
          />{" "}
          {"(\n"}{" "}
          <input
            style={inputStyle}
            type="text"
            size={5}
            onFocus={() => {
              setCurrentPartType(partType);
              setHintTypeC(explanation);
            }}
          />{" "}
          <input
            style={inputStyle}
            type="text"
            size={5}
            onFocus={() => {
              setCurrentPartType(partType);
              setHintTypeC(explanation);
            }}
          />
          {",\n"} <input style={inputStyle} type="text" size={5} />{" "}
          <input
            style={inputStyle}
            type="text"
            size={5}
            onFocus={() => {
              setCurrentPartType(partType);
              setHintTypeC(explanation);
            }}
          />
          {",\n"}
          {") {\n"}
        </pre>
        <div style={{ marginLeft: "50px" }}>
          {childrenPartArray.map((childrenPart) => {
            return (
              <>
                <FormProvider
                  key={childrenPart.id}
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
