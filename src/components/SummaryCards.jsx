import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"  // ✅ Supabase 연결

export default function SummaryCards() {
  const [data, setData] = useState({
    companyCount: 0,
    industryCount: 0,
    topIndustry: "-",
  })

  useEffect(() => {
    async function fetchData() {
      const { data: rows, error } = await supabase.from("emissions3").select("name, industry")

      if (error) {
        console.error("Supabase fetch error:", error)
        return
      }

      const companies = new Set()
      const industryMap = {}

      rows?.forEach((row) => {
        companies.add(row.name)
        industryMap[row.industry] = (industryMap[row.industry] || 0) + 1
      })

      const topIndustry = Object.entries(industryMap).sort((a, b) => b[1] - a[1])[0]?.[0]

      setData({
        companyCount: companies.size,
        industryCount: Object.keys(industryMap).length,
        topIndustry: topIndustry || "-",
      })
    }

    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-xl shadow text-left">
        <p className="text-sm text-gray-500">登録企業数</p>
        <h2 className="text-2xl font-bold text-green-700">{data.companyCount}社</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow text-left">
        <p className="text-sm text-gray-500">業種数</p>
        <h2 className="text-2xl font-bold text-green-700">{data.industryCount}種</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow text-left">
        <p className="text-sm text-gray-500">最多排出業種</p>
        <h2 className="text-2xl font-bold text-green-700">{data.topIndustry}</h2>
      </div>
    </div>
  )
}