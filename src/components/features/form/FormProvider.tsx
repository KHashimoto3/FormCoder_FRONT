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
import { StrIn } from "./formComponents/StrIn";
import { StructOut } from "./formComponents/StructOut";
import { StructIn } from "./formComponents/StructIn";
import { StrPro } from "./formComponents/StrPro";

type Props = {
  id: number;
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
        id={formData.id}
        partType={formData.partType}
        childrenPart={formData.childrenPart}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "PROC") {
    return (
      <Process
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "FOR") {
    return (
      <For
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "WHL") {
    return (
      <While
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "FUN") {
    return (
      <Function
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "IF") {
    return (
      <If
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "ELIF") {
    return (
      <Elseif
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        childrenPart={formData.childrenPart}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "ELS") {
    return (
      <Else
        id={formData.id}
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
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "INC") {
    return (
      <Include
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "DEF") {
    return (
      <Define
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "DAT") {
    return (
      <Data
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "STRDC") {
    return (
      <StrDec
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "INP") {
    return (
      <Input
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "OUT") {
    return (
      <Output
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "STRIN") {
    return (
      <StrIn
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "STRCIN") {
    return (
      <StructIn
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "STRCOU") {
    return (
      <StructOut
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  } else if (formData.partType == "STRP") {
    return (
      <StrPro
        id={formData.id}
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
        id={formData.id}
        partType={formData.partType}
        explanation={formData.explanation}
        inputIdx={formData.inputIdx}
      />
    );
  }
};
