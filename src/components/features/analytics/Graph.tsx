import { Typography } from "@mui/material";
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
      <Typography variant="h6">区間別分析</Typography>
      <Line width={200} height={100} data={graphData} options={options} />
    </div>
  );
};
