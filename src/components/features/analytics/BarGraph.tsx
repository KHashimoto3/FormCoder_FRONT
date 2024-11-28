import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const BarGraph = () => {
  const [forcasedSpeed, setForcasedSpeed] = React.useState<number | null>(null);

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

  const labels = ["0", "60", "120", "150", "180", "210"];
  const graphData = {
    labels: labels,
    datasets: [
      {
        label: "打鍵速度",
        data: [2.5, 3.0, 1.0, 4.2, 1.6, 2.0],
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "打鍵速度推移",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
    },
    onHover: (_: any, activeElements: any) => {
      if (activeElements.length > 0) {
        const index = activeElements[0].index;
        setForcasedSpeed(graphData.datasets[0].data[index]);
      } else {
        setForcasedSpeed(null);
      }
    },
  };

  return (
    <div>
      <Line width={200} height={80} data={graphData} options={options} />
      <div style={{ marginBottom: "10px" }}>
        <Box sx={{ background: "#FFFDE7", borderRadius: 2, padding: "5px" }}>
          <Stack spacing={2} direction={"row"}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              変数・配列宣言
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
