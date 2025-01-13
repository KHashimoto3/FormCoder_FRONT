import { Stack, Typography } from "@mui/material";
import { Select, Option } from "@mui/joy";
import { BarGraph } from "./BarGraph";
import React, { useEffect } from "react";
import { HorizoBarGraph } from "./HorizoBarGraph";
import { SequenceData } from "../../types/sequenceData";

type Props = {
  sequence: SequenceData[];
};

export const Graph = (props: Props) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;
  const { sequence } = props;

  const [selectedOption, setSelectedOption] = React.useState("time");
  const [selectedAnalyzedItem, setSelectedAnalyzedItem] = React.useState(0);

  //それぞれの分析結果
  const [analyzeResultListInterval, setAnalyzeResultListInterval] =
    React.useState<any>(null);
  const [analyzeResultListGeneral, setAnalyzeResultListGeneral] =
    React.useState<any>(null);
  const [analyzeResultListPart, setAnalyzeResultListPart] =
    React.useState<any>(null);

  const handleOptionChange = (_: any, newValue: any) => {
    setSelectedOption(newValue);
  };

  const handleAnalyzedItemChange = (_: any, newValue: any) => {
    setSelectedAnalyzedItem(newValue);
  };

  const analyzeItemList = [
    {
      label: "データ数",
      labelEn: "datasCount",
      unit: "個",
    },
    {
      label: "入力文字数",
      labelEn: "inputCharLength",
      unit: "文字",
    },
    {
      label: "削除文字数",
      labelEn: "removedCharLength",
      unit: "文字",
    },
    {
      label: "入力データ数",
      labelEn: "inputDataCount",
      unit: "個",
    },
    {
      label: "削除データ数",
      labelEn: "removedDataCount",
      unit: "個",
    },
    {
      label: "入力ミス率",
      labelEn: "missTypeRate",
      unit: "%",
    },
    {
      label: "打鍵速度",
      labelEn: "typePerSec",
      unit: "回/秒",
    },
    {
      label: "書き直し数",
      labelEn: "totalReInputCnt",
      unit: "回",
    },
    {
      label: "合計書き直し時間",
      labelEn: "totalReInputTime",
      unit: "秒",
    },
    {
      label: "書き直し率",
      labelEn: "reInputRate",
      unit: "%",
    },
    {
      label: "平均書き直し時間",
      labelEn: "averageReInputTime",
      unit: "秒",
    },
  ];

  useEffect(() => {
    //sequenceデータが変更され、データがnullでないとき
    if (sequence.length === 0) {
      return;
    }
    if (selectedOption === "time") {
      callAnalyzeApiWithInterval(10000, false);
      const endTimestamp = sequence.at(-1)?.timestamp;
      if (endTimestamp === undefined) {
        return;
      }
      //全体の時間で分析を行う
      callAnalyzeApiWithInterval(endTimestamp, true);
    } else if (selectedOption === "blank") {
      callAnalyzeApiWithPart();
    }
  }, [sequence, selectedOption]);

  //指定した時間間隔で分析を行うAPIを呼び出す
  const callAnalyzeApiWithInterval = async (
    intervalTime: number,
    isGeneral: boolean
  ) => {
    const url = `${apiBaseUrl}/sequence/analyze/interval`;

    const obj = {
      intervalTime: intervalTime,
      sequence: sequence,
    };

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }).then(async (res) => {
        if (!res.ok) {
          const statusCode = res.status;
          switch (statusCode) {
            case 400:
              throw new Error("Bad Request");
            case 500:
              throw new Error("Internal Server Error");
            default:
              throw new Error("Unknown Error");
          }
        }
        const data = await res.json();
        const analyzeResultList = data.analyzeResultList;
        if (!isGeneral) {
          setAnalyzeResultListInterval(analyzeResultList);
          return;
        }
        setAnalyzeResultListGeneral(analyzeResultList);
      });
    } catch (error) {
      alert("D: エラーが発生しました。");
      console.log(error);
    }
  };

  //パートごとで分析を行うAPIを呼び出す
  const callAnalyzeApiWithPart = async () => {
    const url = `${apiBaseUrl}/sequence/analyze/part`;

    const obj = {
      sequence: sequence,
    };

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }).then(async (res) => {
        if (!res.ok) {
          const statusCode = res.status;
          switch (statusCode) {
            case 400:
              throw new Error("Bad Request");
            case 500:
              throw new Error("Internal Server Error");
            default:
              throw new Error("Unknown Error");
          }
        }
        const data = await res.json();
        const analyzeResultList = data.analyzeResultList;
        setAnalyzeResultListPart(analyzeResultList);
      });
    } catch (error) {
      alert("D: エラーが発生しました。");
      console.log(error);
    }
  };

  return (
    <div>
      <Typography variant="h6" sx={{ color: "#ffffff", background: "#5F94D9" }}>
        区間別分析
      </Typography>
      {selectedOption === "time" ? (
        <BarGraph
          analyzeItemLabel={analyzeItemList[selectedAnalyzedItem].label}
          analyzeItemlabelEn={analyzeItemList[selectedAnalyzedItem].labelEn}
          analyzeResultList={analyzeResultListInterval}
          analyzeResultListGeneral={analyzeResultListGeneral}
          analyzeUnit={analyzeItemList[selectedAnalyzedItem].unit}
        />
      ) : (
        <HorizoBarGraph
          analyzeItemLabel={analyzeItemList[selectedAnalyzedItem].label}
          analyzeItemlabelEn={analyzeItemList[selectedAnalyzedItem].labelEn}
          analyzeResultList={analyzeResultListPart}
        />
      )}
      <div>
        <Stack spacing={2} direction="row">
          <div>
            <Stack spacing={2} direction={"row"}>
              <Typography variant="h6">表示方法</Typography>
              <Select value={selectedOption} onChange={handleOptionChange}>
                <Option value="time">時間による推移</Option>
                <Option value="blank">パートごと</Option>
              </Select>
            </Stack>
          </div>
          <div>
            <Stack spacing={2} direction={"row"}>
              <Typography variant="h6">分析対象</Typography>
              <Select
                value={selectedAnalyzedItem}
                onChange={handleAnalyzedItemChange}
              >
                {analyzeItemList.map((data, index) => (
                  <Option key={index} value={index}>
                    {data.label}
                  </Option>
                ))}
              </Select>
            </Stack>
          </div>
        </Stack>
      </div>
    </div>
  );
};
