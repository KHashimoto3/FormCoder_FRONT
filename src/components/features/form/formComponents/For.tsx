import { FormData } from "../../../types/formData";
import { FormProvider } from "../FormProvider";
import { Process } from "./Process";

type Props = {
  partType: string;
  childrenPart: string | FormData;
};

export const For = (props: Props) => {
  const inputStyle = {
    fontSize: "16pt",
  };

  const preStyle = {
    fontSize: "16pt",
  };

  if (typeof props.childrenPart == "string") {
    alert(
      "データ不正エラー：Forフォームの中には、少なくとも１つの子要素が必要です。"
    );
    return <Process partType="PROC" />;
  } else if (typeof props.childrenPart == "object") {
    const childrenPart: FormData = props.childrenPart;
    console.log("forの設定部分がきます。");
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
          <FormProvider
            partType={childrenPart.partType}
            childrenPart={childrenPart.childrenPart}
            inputData={childrenPart.inputData}
          />
        </div>
      </>
    );
  }
};
