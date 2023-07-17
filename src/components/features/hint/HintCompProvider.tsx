import { TypeA } from "./hintComponents/TypeA";
import { TypeB } from "./hintComponents/TypeB";
import { TypeC } from "./hintComponents/TypeC";

type Props = {
  hintData: HintData;
  hintType: string;
};

interface HintData {
  partType: string;
  partTitle: string;
  hintList: HintList[];
}

interface HintList {
  hintType: string;
  hintTitle: string;
  hint: string;
}

export const HintCompProvider = (props: Props) => {
  const hintType = props.hintType;
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
