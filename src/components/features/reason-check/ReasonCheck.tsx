import { ErrorReason } from "./ErrorReason";
import { DifferenceReason } from "./DifferenceReason";

export const ReasonCheck = () => {
  return (
    <>
      <h1>原因チェックページです。</h1>
      <p>以下のチェック項目を元に、エラーや間違いを解消してみましょう！</p>
      <div>
        <h2>エラーが発生する場合</h2>
        <ErrorReason />
      </div>
      <div>
        <h2>実行結果が違う場合</h2>
        <DifferenceReason />
      </div>
    </>
  );
};
