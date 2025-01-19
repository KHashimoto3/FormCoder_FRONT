import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type AnalyzeResultList = {
  partType: string;
  analyzeResult: any;
};

type Props = {
  analyzeItemLabel: string;
  analyzeItemlabelEn: string;
  analyzeResultList: AnalyzeResultList[] | null;
  analyzeUnit: string;
};

export const HorizoBarGraph = (props: Props) => {
  const {
    analyzeItemLabel,
    analyzeItemlabelEn,
    analyzeResultList,
    analyzeUnit,
  } = props;
  const [forcasedSpeed, setForcasedSpeed] = React.useState<number | null>(null);
  const [forcasedBrankName, setForcasedBrankName] = React.useState<
    string | null
  >(null);

  const [graphData, setGraphData] = React.useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    //analyzeResultListがnullのとき
    if (analyzeResultList === null) {
      return;
    }

    const labels: string[] = [];
    const data: number[] = [];

    analyzeResultList.forEach((result: any) => {
      const label = result.partType;
      const labelJp = translateJapanaPartType(label);
      labels.push(labelJp);
      data.push(result.analyzeResult[analyzeItemlabelEn]);
    });

    setGraphData({
      labels: labels,
      datasets: [
        {
          label: analyzeItemLabel,
          data: data,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  }, [analyzeResultList, analyzeItemLabel, analyzeItemlabelEn]);

  const partTypeJpEnMap: { en: string; jp: string }[] = [
    {
      en: "INC",
      jp: "インクルード",
    },
    {
      en: "DEF",
      jp: "マクロ",
    },
    {
      en: "STRC",
      jp: "構造体定義",
    },
    {
      en: "FUN",
      jp: "関数定義",
    },
    {
      en: "PROC",
      jp: "計算・代入",
    },
    {
      en: "DAT",
      jp: "データ宣言（変数・配列）",
    },
    {
      en: "STRDC",
      jp: "構造体宣言",
    },
    {
      en: "FOR",
      jp: "繰り返しfor",
    },
    {
      en: "WHL",
      jp: "繰り返しwhile",
    },
    {
      en: "IF",
      jp: "条件分岐if",
    },
    {
      en: "ELIF",
      jp: "条件分岐else if",
    },
    {
      en: "ELS",
      jp: "条件分岐else",
    },
    {
      en: "INP",
      jp: "データの入力",
    },
    {
      en: "OUT",
      jp: "データの出力",
    },
    {
      en: "STRIN",
      jp: "文字列入力",
    },
    {
      en: "STRCIN",
      jp: "構造体入力",
    },
    {
      en: "STRCOU",
      jp: "構造体出力",
    },
    {
      en: "STRP",
      jp: "文字列処理",
    },
  ];

  //パートタイプの名前を日本語に変換
  const translateJapanaPartType = (partType: string) => {
    const target = partTypeJpEnMap.find((item) => item.en === partType);
    return target ? target.jp : "未登録パート";
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    scales: {
      y: {
        title: {
          display: true,
          text: "パート",
        },
      },
    },
    onHover: (_: any, activeElements: any) => {
      if (activeElements.length > 0) {
        const index = activeElements[0].index;
        setForcasedSpeed(graphData.datasets[0].data[index]);
        setForcasedBrankName(graphData.labels[index]);
      } else {
        setForcasedSpeed(null);
        setForcasedBrankName(null);
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "パートごとの分析",
      },
    },
  };

  return (
    <div>
      <Bar options={options} data={graphData} style={{ maxHeight: "400px" }} />
      <div style={{ marginBottom: "10px" }}>
        <Box sx={{ background: "#FFFDE7", borderRadius: 2, padding: "5px" }}>
          <Stack spacing={2} direction={"row"}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {forcasedBrankName ? forcasedBrankName : "--"}
            </Typography>
            <Typography variant="h6">
              全体：{forcasedSpeed ? forcasedSpeed : "--"}
              {analyzeUnit}
            </Typography>
            <Typography variant="h6">平均比：+2.0{analyzeUnit}</Typography>
            <Typography variant="h6">前回比：+2.0{analyzeUnit}</Typography>
          </Stack>
        </Box>
      </div>
    </div>
  );
};
