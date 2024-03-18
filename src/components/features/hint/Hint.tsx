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
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

  const { currentPartType } = useContext(HintContext);
  const { hintTypeC } = useContext(HintContext);

  const { currentHintStep } = useContext(HintContext);
  //ヒントのアコーディオン開閉状況を管理
  //const [expandFlags, setExpandFlags] = useState<Array<boolean>>([]);

  const { appendHintFBArray } = useContext(HintContext);

  const [hintData, setHintData] = useState<HintData[]>([]);

  const [snackOpen, setSnackOpen] = useState<boolean>(false);

  const handleClose = (reason?: string) => {
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
    getHintData();
  }, []);

  const getHintData = async () => {
    const url = `${apiBaseUrl}/hint`;
    try {
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          const statusCode = res.status;
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Oops, we haven't got JSON!");
          }
          switch (statusCode) {
            case 400:
              throw new Error("Bad Request");
            case 401:
              throw new Error("Unauthorized");
            case 404:
              throw new Error("Not Found");
            case 500:
              throw new Error("Internal Server Error");
            default:
              throw new Error("Unknown Error");
          }
        }
        const data = await res.json();
        setHintData(data.hintData);
        setCurrentHintData(data.hintData[0]);
      });
    } catch (error) {
      alert("エラーが発生しました。フォーム選択画面に戻ります。");
      console.log(error);
      window.location.href = "/learning";
    }
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
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => handleClose()}
      >
        <Alert
          onClose={() => handleClose()}
          severity="success"
          sx={{ width: "100%" }}
        >
          ヒントへのフィードバックを記録しました！
        </Alert>
      </Snackbar>
      <Typography variant="h4" data-testid="hint-title">
        {currentHintData.partTitle}
      </Typography>
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
