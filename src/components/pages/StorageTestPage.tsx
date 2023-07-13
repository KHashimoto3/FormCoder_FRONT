import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

  const downloadFileTest = () => {
    getDownloadURL(ref(storage, "test/test.json"))
      .then((url) => {
        console.log(url);
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            alert("ファイルが見つかりません！");
            break;
          case "storage/unauthorized":
            alert("このファイルへのアクセス権限がありません！");
            break;
          case "storage/canceled":
            alert("ユーザーはアップロードをキャンセルしました。");
            break;
          case "storage/unknown":
            alert("不明なエラーが発生しました！");
            break;
        }
      });
  };

  return (
    <>
      <h1>Cloud Storage テスト用ページです。</h1>
      <button onClick={() => uploadFileTest("アップロード完了！")}>
        １度だけ押してください（アップロード）
      </button>
      <button onClick={() => downloadFileTest()}>ダウンロードします。</button>
    </>
  );
};
