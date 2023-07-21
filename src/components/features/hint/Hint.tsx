import { forwardRef, useContext, useEffect, useState } from "react";
import { HintContext } from "./HintProvider";

import {
  Button,
  Container,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

import { HintCompProvider } from "./HintCompProvider";

import { storage } from "../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

import { HintData } from "../../types/hintData";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Hint = () => {
  const { currentPartType } = useContext(HintContext);
  const { hintTypeC } = useContext(HintContext);

  const { currentHintStep } = useContext(HintContext);
  //ヒントのアコーディオン開閉状況を管理
  //const [expandFlags, setExpandFlags] = useState<Array<boolean>>([]);

  const { appendHintFBArray } = useContext(HintContext);

  const [hintData, setHintData] = useState<HintData[]>([]);

  const [snackOpen, setSnackOpen] = useState<boolean>(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const damyHintData: HintData = {
    partType: "DAMY",
    partTitle: "ヒント読みこ中",
    hintList: [
      {
        hintType: "A",
        hintTitle: "つまずきの種類が表示されます",
        hint: "つまずきに応じたヒントがここに表示されます。",
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

  /*ヒントデータが変わるか、ヒントのステップが変わった場合に、アコーディオンの開閉状況を変更
  useEffect(() => {
    const initialExpandFlags = currentHintData.hintList.map((_, idx) =>
      idx == currentHintStep ? true : false
    );
    console.log("配列" + initialExpandFlags);
    setExpandFlags(initialExpandFlags);
  }, [currentHintData.hintList, currentHintStep]);
*/

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

  /*const changeExpandFlag = (idx: number) => {
    setExpandFlags((prevExpandFlags) => {
      const newExpandFlags = [...prevExpandFlags];
      newExpandFlags[idx] = !newExpandFlags[idx];
      return newExpandFlags;
    });
  };*/

  return (
    <Container maxWidth="md">
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          ヒントへのフィードバックを記録しました！
        </Alert>
      </Snackbar>
      <Typography variant="h4">{currentHintData.partTitle}</Typography>
      <Container maxWidth="md" sx={{ marginBottom: "30px" }}>
        <div
          style={{
            width: "100%",
            height: "400px",
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          {currentHintData.hintList.map((hint, index) => {
            if (hint.hint == "") {
              hint.hint = hintTypeC;
              setHintTypeCIdx(hintTypeCIdx + 1);
            }

            return (
              <Accordion
                key={hint.hint}
                expanded={index <= currentHintStep ? true : false}
              >
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(215, 236, 251, 1))",
                  }}
                >
                  <Grid container spacing={0.5}>
                    <Grid
                      item
                      xs={2}
                      sx={{
                        textAlign: "center",
                        color: "#4293f5",
                        fontWeight: "bold",
                      }}
                    >
                      <Typography variant="h4">{index + 1}</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="h6">{hint.hintTitle}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Button
                        onClick={() => {
                          appendHintFBArray(index + 1);
                          setSnackOpen(true);
                        }}
                      >
                        <TipsAndUpdatesIcon />
                      </Button>
                    </Grid>
                  </Grid>
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
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              appendHintFBArray(-10);
              setSnackOpen(true);
            }}
          >
            知りたい情報はこの中にない
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              appendHintFBArray(-100);
              setSnackOpen(true);
            }}
          >
            今はつまずいていない
          </Button>
        </Stack>
      </Container>
    </Container>
  );
};
