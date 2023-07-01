import { FormData } from "../../../types/formData";
import { FormProvider } from "../FormProvider";
import { Process } from "./Process";

type Props = {
  partType: string;
  explanation: string;
  childrenPart: string | FormData[];
};

export const For = (props: Props) => {
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
    return <Process partType="PROC" explanation="" />;
  } else if (Array.isArray(props.childrenPart)) {
    const childrenPartArray: FormData[] = props.childrenPart;
    return (
      <>
        <pre style={preStyle}>
          for {"("}
          <input style={inputStyle} type="text" size={5} />
          {"; "}
          <input style={inputStyle} type="text" size={5} />
          {"; "}
          <input style={inputStyle} type="text" size={5} />
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
                  inputData={childrenPart.inputData}
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
