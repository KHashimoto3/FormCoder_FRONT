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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { HintCompProvider } from "./HintCompProvider";

import { storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

import { HintData } from "../../types/hintData";

export const Hint = () => {
  const { currentPartType } = useContext(HintContext);
  const { hintTypeC } = useContext(HintContext);

  //TODO: GCPのFirestoreからヒントデータを取ってくる
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
              <Accordion key={hint.hint}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ backgroundColor: "#e3f4ff" }}
                >
                  <Typography variant="h5">
                    つまずき{index + 1}：{hint.hintTitle}
                  </Typography>
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
