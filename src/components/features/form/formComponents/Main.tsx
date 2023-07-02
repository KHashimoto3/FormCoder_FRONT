import { FormData } from "../../../types/formData";
import { FormProvider } from "../FormProvider";
import { Process } from "./Process";

type Props = {
  partType: string;
  childrenPart: string | FormData[];
};

export const Main = (props: Props) => {
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
        <pre style={preStyle}>int main {"(void) {\n"}</pre>
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
        <pre style={preStyle}>{"    return 0;\n}"}</pre>
        <pre style={preStyle}>{"}"}</pre>
      </>
    );
  }
};
