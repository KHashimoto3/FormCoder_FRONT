import { FormData } from "../../../types/formData";
import { FormProvider } from "../FormProvider";
import { Process } from "./Process";

type Props = {
  partType: string;
  childrenPart: string | FormData;
};

export const For = (props: Props) => {
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
        <h1>forの設定部分がきます。</h1>
        <FormProvider
          partType={childrenPart.partType}
          childrenPart={childrenPart.childrenPart}
          inputData={childrenPart.inputData}
        />
      </>
    );
  }
};
