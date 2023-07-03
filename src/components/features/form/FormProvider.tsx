import { FormData } from "../../types/formData";

import { Process } from "./formComponents/Process";
import { For } from "./formComponents/For";
import { While } from "./formComponents/While";
import { Function } from "./formComponents/Function";
import { Main } from "./formComponents/Main";
import { If } from "./formComponents/If";
import { Elseif } from "./formComponents/Elseif";
import { Else } from "./formComponents/Else";

type Props = {
  partType: string;
  explanation: string;
  childrenPart: string | FormData[];
  inputData: string;
};

export const FormProvider = (props: Props) => {
  const formData = props;
  //受け取ったpartTypeによって、表示するフォームを変更する
  if (formData.partType == "MAIN") {
    return (
      <Main partType={formData.partType} childrenPart={formData.childrenPart} />
    );
  } else if (formData.partType == "PROC") {
    return (
      <Process
        partType={formData.partType}
        explanation={formData.explanation}
      />
    );
  } else if (formData.partType == "FOR") {
    return (
      <For
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
      />
    );
  } else if (formData.partType == "WHL") {
    return (
      <While
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
      />
    );
  } else if (formData.partType == "FUN") {
    return (
      <Function
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
      />
    );
  } else if (formData.partType == "IF") {
    return (
      <If
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
      />
    );
  } else if (formData.partType == "ELIF") {
    return (
      <Elseif
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
      />
    );
  } else if (formData.partType == "ELS") {
    return (
      <Else
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
      />
    );
  } else {
    alert(
      "データエラー：存在しない種類のフォームを使用しようとしています。フォームデータを確認してください。"
    );
    return (
      <Process
        partType={formData.partType}
        explanation={formData.explanation}
      />
    );
  }
};
