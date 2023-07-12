import { getStorage, ref, uploadBytes } from "firebase/storage";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

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
