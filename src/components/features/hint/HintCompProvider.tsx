import { TypeA } from "./hintComponents/TypeA";
import { TypeB } from "./hintComponents/TypeB";
import { TypeC } from "./hintComponents/TypeC";

import { HintList } from "../../types/hintData";

type Props = {
  hint: HintList;
  partType: string;
};

export const HintCompProvider = (props: Props) => {
  const hint = props.hint;
  const partType = props.partType;

  if (hint.hintType == "A") {
    return <TypeA hintText={hint.hint} />;
  } else if (hint.hintType == "B") {
    return <TypeB partType={partType} />;
  } else if (hint.hintType == "C") {
    return <TypeC explanation={hint.hint} />;
  } else {
    alert(
      "データ不正エラー：無効なヒントタイプがヒントデータに使用されています。管理者に連絡してください。",
    );
    return <h1>エラー：管理者への連絡が必要です。</h1>;
  }
};
