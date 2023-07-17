import { TypeA } from "./hintComponents/TypeA";
import { TypeB } from "./hintComponents/TypeB";
import { TypeC } from "./hintComponents/TypeC";

import { HintList } from "../../types/hintData";

type Props = {
  hint: HintList;
};

export const HintCompProvider = (props: Props) => {
  const hintType = props.hint.hintType;
  if (hintType == "A") {
    return <TypeA />;
  } else if (hintType == "B") {
    return <TypeB />;
  } else if (hintType == "C") {
    return <TypeC />;
  } else {
    alert(
      "データ不正エラー：無効なヒントタイプがヒントデータに使用されています。管理者に連絡してください。"
    );
    return <h1>エラー：管理者への連絡が必要です。</h1>;
  }
};
