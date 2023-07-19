import { useContext, useEffect, useState } from "react";
import { HintContext } from "./HintProvider";

import {
  Button,
  Container,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

import { HintCompProvider } from "./HintCompProvider";

import { storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

import { HintData } from "../../types/hintData";

export const Hint = () => {
  const { currentPartType } = useContext(HintContext);
  const { hintTypeC } = useContext(HintContext);

  const { currentHintStep } = useContext(HintContext);
  //ヒントのアコーディオン開閉状況を管理
  const [expandFlags, setExpandFlags] = useState<Array<boolean>>([]);

  const [hintData, setHintData] = useState<HintData[]>([]);

  const damyHintData: HintData = {
    partType: "DAMY",
    partTitle: "ヒント読みこ中",
    hintList: [
      {
        hintType: "A",
        hintTitle: "つまずきに応じたヒントを出します",
        hint: "ヒントの説明",
      },
    ],
  };

  //TypeCのヒントを展開するためのIdx
  const [hintTypeCIdx, setHintTypeCIdx] = useState<number>(0);
  const [currentHintData, setCurrentHintData] =
    useState<HintData>(damyHintData);

  //partTypeの変更を検知し、それに合ったヒントをカレントなヒントデータとする
  useEffect(() => {
    getHintData("hintData");
  }, []);

  //ヒントデータが変わるか、ヒントのステップが変わった場合に、アコーディオンの開閉状況を変更
  useEffect(() => {
    const initialExpandFlags = currentHintData.hintList.map((_, idx) =>
      idx == currentHintStep ? true : false
    );
    setExpandFlags(initialExpandFlags);
  }, [currentHintData.hintList, currentHintStep]);

  const getHintData = (fileName: string) => {
    const refUrl = "hint/" + fileName + ".json";
    getFileUrl(refUrl);
  };

  const getFileUrl = (refUrl: string) => {
    getDownloadURL(ref(storage, refUrl))
      .then((url) => {
        getJsonFile(url);
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

  const getJsonFile = async (url: string) => {
    await fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const data = json.hintData;
        setHintData(data);
        setCurrentHintData(data[0]);
      });
  };

  //partTypeの変更を検知し、それに合ったヒントをカレントなヒントデータとする
  useEffect(() => {
    hintData.map((hint) => {
      if (hint.partType == currentPartType) {
        setCurrentHintData(hint);
      }
    });
  }, [currentPartType]);

  const changeExpandFlag = (idx: number) => {
    setExpandFlags((prevExpandFlags) => {
      const newExpandFlags = [...prevExpandFlags];
      newExpandFlags[idx] = !newExpandFlags[idx];
      return newExpandFlags;
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4">{currentHintData.partTitle}</Typography>
      <Container maxWidth="md" sx={{ marginBottom: "30px" }}>
        <div>
          {currentHintData.hintList.map((hint, index) => {
            if (hint.hint == "") {
              hint.hint = hintTypeC;
              setHintTypeCIdx(hintTypeCIdx + 1);
            }
            return (
              <Accordion key={hint.hint} expanded={expandFlags[index]}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ backgroundColor: "#e3f4ff" }}
                >
                  <Typography variant="h5">
                    つまずき{index + 1}：{hint.hintTitle}
                  </Typography>
                  <Button onClick={() => changeExpandFlag(index)}>
                    <UnfoldMoreIcon />
                  </Button>
                </AccordionSummary>
                <AccordionDetails>
                  <HintCompProvider
                    hint={hint}
                    partType={currentHintData.partType}
                  />
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
        <hr />
        <Stack spacing={2}>
          <Button size="small" variant="contained">
            知りたい情報はこの中にない
          </Button>
          <Button size="small" variant="contained">
            今はつまずいていない
          </Button>
        </Stack>
      </Container>
    </Container>
  );
};
