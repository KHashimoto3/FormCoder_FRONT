import { Box, Stack, Typography } from "@mui/material";
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
import { Select, Option } from "@mui/joy";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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
};

export const Graph = () => {
  const labels = ["0", "60", "120", "150", "180", "210", "240"];
  const graphData = {
    labels: labels,
    datasets: [
      {
        label: "打鍵速度",
        data: [65, 59, 60, 81, 56, 55],
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return (
    <div>
      <Typography variant="h6" sx={{ color: "#ffffff", background: "#5F94D9" }}>
        区間別分析
      </Typography>
      <Line width={200} height={80} data={graphData} options={options} />
      <div style={{ marginBottom: "10px" }}>
        <Box sx={{ background: "#FFFDE7", borderRadius: 2, padding: "5px" }}>
          <Stack spacing={2} direction={"row"}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              変数・配列宣言
            </Typography>
            <Typography variant="h6">速度：3.6個/秒</Typography>
            <Typography variant="h6">前回比：+2.0個/秒</Typography>
            <Typography variant="h6">平均比：+2.0個/秒</Typography>
          </Stack>
        </Box>
      </div>

      <div>
        <Stack spacing={2} direction="row">
          <div>
            <Stack spacing={2} direction={"row"}>
              <Typography variant="h6">表示方法</Typography>
              <Select defaultValue="time">
                <Option value="time">時間による推移</Option>
                <Option value="blank">空欄ごと</Option>
              </Select>
            </Stack>
          </div>
          <div>
            <Stack spacing={2} direction={"row"}>
              <Typography variant="h6">分析対象</Typography>
              <Select defaultValue="speed">
                <Option value="speed">打鍵速度</Option>
                <Option value="delete-rate">削除率</Option>
              </Select>
            </Stack>
          </div>
        </Stack>
      </div>
    </div>
  );
};
