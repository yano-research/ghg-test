import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js"
import { supabase } from "../lib/supabaseClient"

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

export default function Scope3LineChart({ companyNumber }) {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("emissions3")
        .select("year, scope, total_emission")
        .eq("company_number", companyNumber)
        .eq("source", "self")
        .eq("scope", 3)
        .order("year", { ascending: true })

      if (error) {
        console.error("Error fetching Scope 3:", error)
        return
      }

      // ✅ 연도별 배출량 합산
      const summedData = {}
      data.forEach((row) => {
        if (row.total_emission != null) {
          if (!summedData[row.year]) {
            summedData[row.year] = 0
          }
          summedData[row.year] += row.total_emission
        }
      })

      // ✅ 최신순으로 정렬 후 최대 5개
      const sortedYears = Object.keys(summedData)
        .map((year) => parseInt(year))
        .sort((a, b) => b - a)
        .slice(0, 5)
        .sort((a, b) => a - b)

      const finalData = sortedYears.map((year) => ({
        year,
        total: summedData[year],
      }))

      if (finalData.length === 0) {
        setChartData(null)
        return
      }

      setChartData({
        labels: finalData.map((row) => `${row.year}年`),
        datasets: [
          {
            label: "Scope 3 排出量",
            data: finalData.map((row) => Math.round(row.total)), // 소수점 제거
            borderColor: "#22c55e",
            backgroundColor: "#86efac",
            fill: false,
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      })
    }

    fetchData()
  }, [companyNumber])

  if (!chartData || chartData.labels.length < 2) {
    return (
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-center h-[250px]">
        <p className="text-sm text-gray-400">
          ⚠️ 比較できるデータが1件のため、グラフは表示されません
        </p>
      </div>
    )
  }
  

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Scope 3 排出量（t-CO₂）</h2>
      <div className="h-64">
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true },
            },
            scales: {
              y: {
                ticks: {
                  stepSize: 50000,
                },
              },
            },
          }}
        />
      </div>
    </div>
  )
}
