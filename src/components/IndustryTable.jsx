import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function IndustryTable() {
  const [industryData, setIndustryData] = useState([])

  useEffect(() => {
    async function fetchIndustryAverages() {
      const { data, error } = await supabase
        .from("emissions3")
        .select("industry, total_emission")
        .eq("year", 2021)
        .eq("source", "gov")  // 필요하다면 source 제한도 함께

      
      if (error) {
        console.error("Supabase fetch error:", error)
        return
      }

      // 업종별 평균 계산
      const industryMap = {}

      data.forEach((row) => {
        const { industry, total_emission } = row
        if (!industry || total_emission == null) return

        if (!industryMap[industry]) {
          industryMap[industry] = { total: 0, count: 0 }
        }
        industryMap[industry].total += total_emission
        industryMap[industry].count += 1
      })

      const result = Object.entries(industryMap).map(([industry, { total, count }]) => ({
        industry,
        avg: Math.round(total / count),
      }))

      // 평균 배출량 기준으로 정렬
      result.sort((a, b) => b.avg - a.avg)

      setIndustryData(result)
    }

    fetchIndustryAverages()
  }, [])

  return (
    <div className="bg-white rounded-xl shadow p-6 h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">業種別 平均GHG排出量</h2>
      <p className="text-sm text-gray-500 mb-4">※ 2021年度のデータに基づく</p>
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th className="text-left py-2">業種</th>
            <th className="text-right py-2">平均排出量（千tCO₂）</th>
          </tr>
        </thead>
        <tbody>
          {industryData.map((item) => (
            <tr key={item.industry}>
              <td className="py-2">{item.industry}</td>
              <td className="text-right">{item.avg.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}