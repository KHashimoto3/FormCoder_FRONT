import { cppLanguage } from "@codemirror/lang-cpp";
import ReactCodeMirror from "@uiw/react-codemirror";

type Props = {
  id: number;
  partType: string;
  explanation: string;
  inputIdx: number;
};

export const Static = (props: Props) => {
  const dispData = props.explanation;

  return (
    <ReactCodeMirror
      value={dispData}
      extensions={[cppLanguage]}
      style={{ fontSize: "16pt" }}
    ></ReactCodeMirror>
  );
};
