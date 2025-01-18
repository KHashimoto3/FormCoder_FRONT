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
  analyzeResultListGeneral: any;
  analyzeResultListAverage: any;
  analyzeUnit: string;
};

export const BarGraph = (props: Props) => {
  const {
    analyzeItemLabel,
    analyzeItemlabelEn,
    analyzeResultList,
    analyzeResultListGeneral,
    analyzeResultListAverage,
    analyzeUnit,
  } = props;

  const [compareWithAverage, setCompareWithAverage] =
    React.useState<string>("");

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

    //平均比を計算
    if (
      analyzeResultListGeneral !== null &&
      analyzeResultListAverage !== null
    ) {
      const average = analyzeResultListAverage[0][analyzeItemlabelEn];
      const general = analyzeResultListGeneral[0][analyzeItemlabelEn];
      const compareResult = general - average;
      //compareResultの結果を少数第２位までにする
      const compareResultFixed = compareResult.toFixed(1);
      setCompareWithAverage(compareResultFixed);
    }
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
  };

  return (
    <div>
      <Line width={200} height={80} data={graphData} options={options} />
      <div style={{ marginBottom: "10px" }}>
        <Box sx={{ background: "#FFFDE7", borderRadius: 2, padding: "5px" }}>
          <Stack spacing={2} direction={"row"}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {analyzeItemLabel} 全体
            </Typography>
            <Typography variant="h6">
              {analyzeResultListGeneral !== null
                ? analyzeResultListGeneral[0][analyzeItemlabelEn]
                : "-"}
              {analyzeUnit}
            </Typography>
            <Typography variant="h6">
              平均比：
              {Number(compareWithAverage) > 0 ? "+" : ""}
              {analyzeResultListGeneral !== null &&
              analyzeResultListAverage !== null
                ? compareWithAverage
                : "-"}
              {analyzeUnit}
            </Typography>
            <Typography variant="h6">前回比：+2.0{analyzeUnit}</Typography>
          </Stack>
        </Box>
      </div>
    </div>
  );
};
