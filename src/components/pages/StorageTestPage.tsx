import { ref, uploadBytes } from "firebase/storage";

import { storage } from "../../firebase";

// Create a storage reference from our storage service
const storageRef = ref(storage, "test/test.json");

export const StorageTestPage = () => {
  const uploadFileTest = (text: string) => {
    const obj = { text: text };
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json",
    });
    uploadBytes(storageRef, blob).then(() => {
      alert("アップロード完了しました！");
    });
  };

  return (
    <>
      <h1>Cloud Storage テスト用ページです。</h1>
      <button onClick={() => uploadFileTest("アップロード完了！")}>
        １度だけ押してください（アップロード）
      </button>
    </>
  );
};
