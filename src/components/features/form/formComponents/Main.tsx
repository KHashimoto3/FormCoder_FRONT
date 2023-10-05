import { FormData } from "../../../types/formData";
import { FormProvider } from "../FormProvider";
import { Process } from "./Process";

type Props = {
  id: number;
  partType: string;
  childrenPart: string | FormData[];
  inputIdx: number;
};

export const Main = (props: Props) => {
  const preStyle = {
    fontSize: "16pt",
  };

  //子要素がなければエラーを出し、あればその子要素を表示する
  if (typeof props.childrenPart == "string") {
    alert(
      "データ不正エラー：Functionフォームの中には、少なくとも１つの子要素が必要です。",
    );
    return <Process id={-1} partType="PROC" explanation="" inputIdx={-1} />;
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
        <pre style={preStyle}>{"    return 0;\n}"}</pre>
      </>
    );
  }
};
