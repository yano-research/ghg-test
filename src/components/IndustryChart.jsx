import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
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
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchChartData() {
      const { data, error } = await supabase
        .from("emissions3")
        .select("industry, year, scope, total_emission")
        .eq("source", "gov") // 정부 데이터만 사용
        .in("scope", [1, 2])  // Scope 1, 2만 사용
        .eq("year", 2021);    // 최신 연도 기준 (필요 시 변경 가능)

      if (error) {
        console.error("Supabase error:", error);
        return;
      }

      // 유효한 industry 및 배출량만 필터링
      const filtered = data.filter(
        (row) => row.industry && row.total_emission != null
      );

      // 업종별 평균 계산
      const map = {};
      filtered.forEach((row) => {
        if (!map[row.industry]) {
          map[row.industry] = { sum: 0, count: 0 };
        }
        map[row.industry].sum += row.total_emission;
        map[row.industry].count += 1;
      });

      const result = Object.entries(map)
        .map(([industry, { sum, count }]) => ({
          industry,
          average: Math.round(sum / count),
        }))
        .sort((a, b) => b.average - a.average) // 큰 순으로 정렬
        .slice(0, 6); // 상위 6개만 표시 (원하면 더 보여줄 수 있음)

      setChartData({
        labels: result.map((r) => r.industry),
        datasets: [
          {
            label: "平均GHG排出量（tCO₂）",
            data: result.map((r) => r.average),
            backgroundColor: "#22c55e",
            borderRadius: 4,
            barPercentage: 0.5,
          },
        ],
      });
    }

    fetchChartData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        平均GHG排出量（業種別）
        <p className="text-sm text-gray-400">上位6つの業種</p>
      </h2>
      
      <div className="h-64 w-full">
        {chartData ? <Bar data={chartData} options={options} /> : <p className="text-sm text-gray-400">読み込み中...</p>}
      </div>
    </div>
  );
}
