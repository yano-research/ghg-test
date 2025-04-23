import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { supabase } from "../lib/supabaseClient";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Scope3CategoryChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchCategoryData() {
      const { data, error } = await supabase
        .from("emissions3")
        .select("company_name, s3_c1, s3_c2, s3_c3, s3_c4, s3_c5, s3_c6, s3_c7, s3_c8, s3_c9, s3_c10, s3_c11, s3_c12, s3_c13, s3_c14, s3_c15")
        .eq("year", 2021); // 혹은 최신년도 기준으로 바꿔도 OK

      if (error) {
        console.error("Scope 3 Category fetch error:", error);
        return;
      }

      const companies = data.map((row) => row.company_name);
      const totals = data.map((row) => {
        let sum = 0;
        for (let i = 1; i <= 15; i++) {
          const val = Number(row[`s3_c${i}`]);
          if (!isNaN(val)) sum += val;
        }
        return Math.round(sum);
      });

      setChartData({
        labels: companies,
        datasets: [
          {
            label: "Scope 3 カテゴリ別排出量合計（t-CO₂）",
            data: totals,
            backgroundColor: "#4ade80",
          },
        ],
      });
    }

    fetchCategoryData();
  }, []);

  if (!chartData) {
    return (
      <div className="bg-white rounded-xl shadow p-6 h-[300px] flex items-center justify-center">
        <p className="text-sm text-gray-400">📊 Scope 3カテゴリデータがありません</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Scope 3カテゴリ別排出量（企業別）</h2>
      <div className="h-72">
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
      </div>
    </div>
  );
}
