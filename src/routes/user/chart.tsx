import { FC } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);
ChartJS.defaults.scale.grid.display = false;

// {
//                   labels: [...attendanceDataset.keys()],
//                   datasets: [
//                     {
//                       label: "Events Attended",
//                       data: [...attendanceDataset.values()],
//                     },
//                   ],
//                 }
export const chartOptions = {
  width: 100,
  height: 30,
  options: {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
};

interface LineGraphProps {
  data: {
    labels: string[];
    datasets: { label: string; data: any[] }[];
  };
}

const LineGraph: FC<LineGraphProps> = ({ data }) => (
  <Line
    width={100}
    height={30}
    options={{
      responsive: true,
      scales: {
        y: {
          ticks: {
            stepSize: 1,
          },
          min: 0,
        },
      },
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    }}
    data={data}
  />
);

export default LineGraph;
