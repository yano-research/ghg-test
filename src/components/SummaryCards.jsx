import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function SummaryCards() {
  const [data, setData] = useState({
    companyCount: 0,
    industryCount: 0,
    topIndustry: "-",
    latestYear: null,
  })

  useEffect(() => {
    async function fetchData() {
      const { data: selfRows, error } = await supabase
        .from("emissions3")
        .select("company_number, industry, year")
        .eq("source", "self")
        .eq("year", 2019)
  
      if (error) {
        console.error("Supabase fetch error:", error)
        return
      }
  
      // 🔍 최신 연도 구하기
      const years = selfRows.map((row) => row.year).filter(Boolean)
      const latestYear = Math.max(...years)
  
      // 🔍 최신 연도의 데이터만 필터링
      const filtered = selfRows.filter(row => row.year === latestYear)
  
      const uniqueCompanies = new Set()
      const industryMap = {}
  
      filtered.forEach((row) => {
        if (row.company_number) {
          uniqueCompanies.add(row.company_number)
        }
  
        const clean = row.industry?.trim()
        if (clean && clean !== "-" && clean !== "N/A" && clean.toLowerCase() !== "null") {
          industryMap[clean] = (industryMap[clean] || 0) + 1
        }
      })
  
      const topIndustry = Object.entries(industryMap).sort((a, b) => b[1] - a[1])[0]?.[0]
  
      setData({
        companyCount: uniqueCompanies.size,
        industryCount: Object.keys(industryMap).length,
        topIndustry: topIndustry || "-",
        latestYear,
      })
    }
  
    fetchData()
  }, [])
  

  return (
    <div>
      <p className="text-sm text-gray-500 mb-2">
    ※ {data.latestYear}年度のデータに基づく
  </p>
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-xl shadow text-left">
        <p className="text-sm text-gray-500">登録企業数</p>
        <h2 className="text-2xl font-bold text-green-700">{data.companyCount}社</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow text-left">
        <p className="text-sm text-gray-500">業種数</p>
        <h2 className="text-2xl font-bold text-green-700">{data.industryCount}種</h2>
      </div>
      <div className="bg-white p-6 rounded-xl shadow text-left">
        <p className="text-sm text-gray-500">最多排出業種</p>
        <h2 className="text-2xl font-bold text-green-700">{data.topIndustry}</h2>
      </div>
    </div>
    </div>
  )
}