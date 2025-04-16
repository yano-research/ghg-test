// src/components/BarChart.jsx
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function BarChart({ data }) {
  const chartData = {
    labels: data.map(d => `Scope ${d.scope}`),
    datasets: [
      {
        label: "排出量 (t-CO₂)",
        data: data.map(d => d.total_emission),
        backgroundColor: "#4ade80"
      }
    ]
  }

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                return value.toLocaleString()
              }
            }
          }
        }
      }}
    />
  )
}