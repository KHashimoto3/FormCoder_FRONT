import { FormData } from "../../../types/formData";

type Props = {
  partType: string;
  explanation: string;
  childrenPart: string | FormData[];
  inputIdx: number;
};

export const IfEnd = (props: Props) => {
  const preStyle = {
    fontSize: "16pt",
  };

  return (
    <>
      <pre style={preStyle}>{"}\n"}</pre>
    </>
  );
};
