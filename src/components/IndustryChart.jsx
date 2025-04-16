import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function IndustryChart() {
  const data = {
    labels: ["総合化学メーカー", "製造業"],
    datasets: [
      {
        label: "平均GHG排出量（業種別）",
        data: [341333, 20000],
        backgroundColor: "#22c55e",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <Bar data={data} />
    </div>
  );
}