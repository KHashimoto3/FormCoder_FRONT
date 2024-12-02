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

  //それぞれの分析結果
  const [analyzeResultListInterval, setAnalyzeResultListInterval] =
    React.useState<any>(null);

  const handleOptionChange = (event: any, newValue: any) => {
    setSelectedOption(newValue);
  };

  const analyzedData = [
    {
      label: "打鍵速度",
      labelEn: "speed",
      data: [2.5, 3.0, 1.0, 4.2, 1.6, 2.0],
      borderColor: "rgb(75, 192, 192)",
    },
    {
      label: "削除率",
      labelEn: "delete-rate",
      data: [28, 48, 40, 19, 86, 27],
      borderColor: "rgb(255, 99, 132)",
    },
  ];

  useEffect(() => {
    //sequenceデータが変更され、データがnullでないとき
    if (sequence.length === 0) {
      return;
    }
    if (selectedOption === "time") {
      callAnalyzeApiWithInterval();
    }
  }, [sequence]);

  //指定した時間間隔で分析を行うAPIを呼び出す
  const callAnalyzeApiWithInterval = async () => {
    const url = `${apiBaseUrl}/sequence/analyze/interval`;

    const obj = {
      intervalTime: 10000,
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
        setAnalyzeResultListInterval(analyzeResultList);
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
      {selectedOption === "time" ? <BarGraph /> : <HorizoBarGraph />}
      <div>
        <Stack spacing={2} direction="row">
          <div>
            <Stack spacing={2} direction={"row"}>
              <Typography variant="h6">表示方法</Typography>
              <Select value={selectedOption} onChange={handleOptionChange}>
                <Option value="time">時間による推移</Option>
                <Option value="blank">空欄ごと</Option>
              </Select>
            </Stack>
          </div>
          <div>
            <Stack spacing={2} direction={"row"}>
              <Typography variant="h6">分析対象</Typography>
              <Select defaultValue={analyzedData[0].labelEn}>
                {analyzedData.map((data, index) => (
                  <Option key={index} value={data.labelEn}>
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
