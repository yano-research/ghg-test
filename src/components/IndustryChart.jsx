import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function IndustryChart() {
  const data = {
    labels: ["総合化学メーカー", "製造業"],
    datasets: [
      {
        label: "平均GHG排出量（業種別）",
        data: [341333, 20000],
        backgroundColor: "#22c55e",
        borderRadius: 4,
        barPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ 카드에 꽉 차도록
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        平均GHG排出量（業種別）
      </h2>
      <div className="h-64 w-full"> {/* ✅ 높이 제한 박스 */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}