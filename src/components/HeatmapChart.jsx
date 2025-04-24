import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js"
import { Chart } from "react-chartjs-2"
import { MatrixController, MatrixElement } from "chartjs-chart-matrix"
import chroma from "chroma-js"

ChartJS.register(
  MatrixController,
  MatrixElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

export default function HeatmapChart() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const dummy = [
      {
        industry: "製造業",
        categories: [1500, 900, 1200, 300, 600, 1000, 400, 700, 800, 500, 600, 750, 900, 100, 200],
      },
      {
        industry: "電気・ガス・水道",
        categories: [200, 100, 300, 50, 80, 120, 60, 110, 90, 40, 70, 130, 60, 20, 10],
      },
      {
        industry: "運輸・郵便",
        categories: [400, 300, 200, 100, 500, 600, 300, 250, 200, 150, 300, 350, 400, 50, 60],
      },
      {
        industry: "不動産",
        categories: [100, 50, 30, 20, 40, 60, 70, 90, 50, 30, 20, 80, 40, 20, 10],
      },
    ]

    const labelsY = dummy.map((row) => row.industry)
    const labelsX = Array.from({ length: 15 }, (_, i) => `C${i + 1}`)

    const flatData = []
    dummy.forEach((row, i) => {
      row.categories.forEach((value, j) => {
        flatData.push({ x: j, y: i, v: value })
      })
    })

    const max = Math.max(...flatData.map((d) => d.v))
    const colorScale = chroma.scale(["#dcfce7", "#22c55e"]).domain([0, max])

    setData({
      labels: { x: labelsX, y: labelsY },
      datasets: [
        {
          label: "Scope3カテゴリ別排出量",
          data: flatData,
          backgroundColor: (ctx) => {
            const v = ctx.raw.v
            return colorScale(v).hex()
          },
          width: ({ chart }) =>
            chart.chartArea ? chart.chartArea.width / labelsX.length - 4 : 10,
          height: ({ chart }) =>
            chart.chartArea ? chart.chartArea.height / labelsY.length - 4 : 10,
        },
      ],
    })
  }, [])

  if (!data) {
    return (
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-center h-[400px]">
        <p className="text-gray-500 text-sm">\ud83d\udcca データを読み込み中...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Scope3カテゴリ別排出量（業種別）
      </h2>
      <div className="h-[500px]">
        <Chart
          key={JSON.stringify(data)}
          type="matrix"
          data={data}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: {
                type: "category",
                labels: data.labels.x,
                offset: true,
                grid: { display: false },
              },
              y: {
                type: "category",
                labels: data.labels.y,
                offset: true,
                grid: { display: false },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  title: (items) => `カテゴリ: ${data.labels.x[items[0].raw.x]}`,
                  label: (item) =>
                    `${data.labels.y[item.raw.y]}: ${item.raw.v.toLocaleString()} t-CO₂`,
                },
              },
              legend: { display: false },
            },
          }}
        />
      </div>
    </div>
  )
}
