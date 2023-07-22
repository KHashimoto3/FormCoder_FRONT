import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../../firebase";
import { useEffect, useState } from "react";

type Props = {
  partType: string;
};

export const TypeB = (props: Props) => {
  const partType = props.partType;
  const [imgUrl, setImgUrl] = useState<string>("");

  //partTypeの変更を検知し、それに合ったヒントをカレントなヒントデータとする
  useEffect(() => {
    getHintData(partType);
  }, [partType]);

  const getHintData = (fileName: string) => {
    const refUrl = "hint/partB/" + fileName + ".png";
    console.log("partBデータの取得：" + refUrl);
    getFileUrl(refUrl);
  };

  const getFileUrl = (refUrl: string) => {
    getDownloadURL(ref(storage, refUrl))
      .then((url) => {
        setImgUrl(url);
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            getHintData("nothing");
            break;
          case "storage/unauthorized":
            alert("このファイルへのアクセス権限がありません！");
            getHintData("nothing");
            break;
          case "storage/canceled":
            alert("ユーザーはアップロードをキャンセルしました。");
            getHintData("nothing");
            break;
          case "storage/unknown":
            alert("不明なエラーが発生しました！");
            getHintData("nothing");
            break;
        }
      });
  };

  return (
    <>
      <img src={imgUrl} style={{ width: "90%" }} alt="解説画像" />
    </>
  );
};
