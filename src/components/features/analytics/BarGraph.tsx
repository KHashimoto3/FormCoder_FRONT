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
import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  analyzeItemLabel: string;
  analyzeItemlabelEn: string;
  analyzeResultList: any;
};

export const BarGraph = (props: Props) => {
  const { analyzeItemLabel, analyzeItemlabelEn, analyzeResultList } = props;
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
      const startTimestamp = result.startTimestamp / 1000;
      const endTimestamp = result.endTimestamp / 1000;
      const label = `${startTimestamp} - ${endTimestamp}`;
      labels.push(label);
      data.push(result[analyzeItemlabelEn]);
    });

    setGraphData({
      labels: labels,
      datasets: [
        {
          label: analyzeItemLabel,
          data: data,
          borderColor: "rgb(75, 192, 192)",
        },
      ],
    });
  }, [analyzeItemLabel, analyzeItemlabelEn, analyzeResultList]);

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
        text: "時間ごとの分析",
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
        setForcasedBrankName(graphData.labels[index]);
      } else {
        setForcasedSpeed(null);
        setForcasedBrankName(null);
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
              {forcasedBrankName ? forcasedBrankName : "--"} 秒
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
