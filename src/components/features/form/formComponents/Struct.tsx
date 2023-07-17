import { useContext, useState } from "react";
import { HintContext } from "../../hint/HintProvider";
import { InputContext } from "../InputArrayProvider";

type Props = {
  partType: string;
  explanation: string;
  inputIdx: number;
};

export const Struct = (props: Props) => {
  const { setCurrentPartType } = useContext(HintContext);
  const { setHintTypeC } = useContext(HintContext);

  const [input, setInput] = useState<string>("");
  const { upDateInputArray } = useContext(InputContext);

  //upDateInputArrayにstringの配列を渡す
  const updateInput = (idx: number, input: string) => {
    const str: string[] = [input];
    upDateInputArray(idx, str);
  };

  const partType = props.partType;
  const explanation = props.explanation;

  const inputStyle = {
    fontSize: "16pt",
  };

  const preStyle = {
    fontSize: "16pt",
  };

  return (
    <>
      <pre style={preStyle}>
        struct{" "}
        <input
          style={inputStyle}
          type="text"
          size={5}
          onFocus={() => {
            setCurrentPartType(partType);
            setHintTypeC(explanation);
          }}
        />{" "}
        {"{\n"}
      </pre>
      <div style={{ marginLeft: "50px" }}>
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
      </div>
      <pre style={preStyle}>{"}"}</pre>
    </>
  );
};
