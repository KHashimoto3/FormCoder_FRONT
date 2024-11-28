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

import React from "react";
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

export const HorizoBarGraph = () => {
  const [forcasedSpeed, setForcasedSpeed] = React.useState<number | null>(null);
  const [forcasedBrankName, setForcasedBrankName] = React.useState<
    string | null
  >(null);

  const data = {
    labels: [
      "インクルード",
      "変数・配列宣言",
      "入力",
      "処理",
      "forループ",
      "出力",
    ],
    datasets: [
      {
        label: "打鍵速度",
        data: [1.5, 2.0, 3.0, 0.2, 2.2, 3.9],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "打鍵速度",
        },
      },
      y: {
        title: {
          display: true,
          text: "入力欄",
        },
      },
    },
    onHover: (_: any, activeElements: any) => {
      if (activeElements.length > 0) {
        const index = activeElements[0].index;
        setForcasedSpeed(data.datasets[0].data[index]);
        setForcasedBrankName(data.labels[index]);
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
        text: "入力欄ごとの分析",
      },
    },
  };

  return (
    <div>
      <Bar options={options} data={data} />
      <div style={{ marginBottom: "10px" }}>
        <Box sx={{ background: "#FFFDE7", borderRadius: 2, padding: "5px" }}>
          <Stack spacing={2} direction={"row"}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {forcasedBrankName ? forcasedBrankName : "--"}
            </Typography>
            <Typography variant="h6">
              速度：{forcasedSpeed ? forcasedSpeed : "--"}個/秒
            </Typography>
            <Typography variant="h6">前回比：+2.0個/秒</Typography>
            <Typography variant="h6">平均比：+2.0個/秒</Typography>
          </Stack>
        </Box>
      </div>
    </div>
  );
};
