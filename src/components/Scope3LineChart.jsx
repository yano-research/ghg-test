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

      const scope3Data = data
        .filter((row) => row.total_emission != null)
        .sort((a, b) => b.year - a.year) // 최신순
        .slice(0, 5)
        .sort((a, b) => a.year - b.year) // 다시 오름차순

      if (scope3Data.length === 0) {
        setChartData(null)
        return
      }

      setChartData({
        labels: scope3Data.map((row) => `${row.year}年`),
        datasets: [
          {
            label: "Scope 3 排出量",
            data: scope3Data.map((row) => row.total_emission),
            borderColor: "#22c55e",
            backgroundColor: "#86efac",
            fill: false,
            tension: 0.3,
          },
        ],
      })
    }

    fetchData()
  }, [companyNumber])

  if (!chartData) {
    return (
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-center h-[250px]">
        <p className="text-sm text-gray-400">📉 データがありません</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Scope 3 排出量（t-CO₂）</h2>
      <div className="h-64">
        <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
      </div>
    </div>
  )
}
