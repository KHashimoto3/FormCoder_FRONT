import { useState } from "react";
import { TypeA } from "./hintComponents/TypeA";
import { TypeB } from "./hintComponents/TypeB";
import { TypeC } from "./hintComponents/TypeC";

export const HintCompProvider = () => {
  const [formType] = useState<string>("C");
  if (formType == "A") {
    return <TypeA />;
  } else if (formType == "B") {
    return <TypeB />;
  } else if (formType == "C") {
    return <TypeC />;
  } else {
    alert(
      "データ不正エラー：無効なヒントタイプがヒントデータに使用されています。管理者に連絡してください。"
    );
    return <h1>エラー：管理者への連絡が必要です。</h1>;
  }
};
