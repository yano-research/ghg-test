import HeatmapChart from "../components/HeatmapChart"
import StackedBarChart from "../components/StackedBarChart"
import CategoryDetailTable from "../components/CategoryDetailTable"

export default function CategoryComparisonPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-xl font-bold text-green-700">Scope 3 カテゴリ別比較</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-md font-semibold mb-4 text-gray-700">業種 × カテゴリ ヒートマップ</h2>
        <HeatmapChart />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-md font-semibold mb-4 text-gray-700">業種別 カテゴリ排出量（積み上げ棒グラフ）</h2>
        <StackedBarChart />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-md font-semibold mb-4 text-gray-700">企業別 カテゴリ詳細</h2>
        <CategoryDetailTable />
      </div>
    </div>
  )
}
