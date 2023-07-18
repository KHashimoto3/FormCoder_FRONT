import { FormData } from "../../types/formData";

import { Process } from "./formComponents/Process";
import { For } from "./formComponents/For";
import { While } from "./formComponents/While";
import { Function } from "./formComponents/Function";
import { Main } from "./formComponents/Main";
import { If } from "./formComponents/If";
import { Elseif } from "./formComponents/Elseif";
import { Else } from "./formComponents/Else";
import { IfEnd } from "./formComponents/IfEnd";
import { Struct } from "./formComponents/Struct";
import { Include } from "./formComponents/Include";
import { Define } from "./formComponents/Define";
import { Data } from "./formComponents/Data";
import { StrDec } from "./formComponents/StrDec";
import { Input } from "./formComponents/Input";
import { Output } from "./formComponents/Output";

type Props = {
  partType: string;
  explanation: string;
  childrenPart: string | FormData[];
  inputIdx: number;
};

export const FormProvider = (props: Props) => {
  const formData = props;
  //受け取ったpartTypeによって、表示するフォームを変更する
  if (formData.partType == "MAIN") {
    return (
      <Main
        partType={formData.partType}
        childrenPart={formData.childrenPart}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "PROC") {
    return (
      <Process
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "FOR") {
    return (
      <For
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "WHL") {
    return (
      <While
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "FUN") {
    return (
      <Function
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "IF") {
    return (
      <If
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "ELIF") {
    return (
      <Elseif
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "ELS") {
    return (
      <Else
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "IFE") {
    return <IfEnd />;
  } else if (formData.partType == "STRC") {
    return (
      <Struct
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "INC") {
    return (
      <Include
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "DEF") {
    return (
      <Define
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "DAT") {
    return (
      <Data
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "STRDC") {
    return (
      <StrDec
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "INP") {
    return (
      <Input
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "OUP") {
    return (
      <Output
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
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
        inputIdx={formData.inputIdx}
      />
    );
  }
};
