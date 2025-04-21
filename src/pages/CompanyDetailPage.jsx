import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function CompanyDetailPage() {
  const { uuid } = useParams()
  const [company, setCompany] = useState(null)
  const [govData, setGovData] = useState([])
  const [selfData, setSelfData] = useState([])
  const [activeTab, setActiveTab] = useState("gov")
  const [selectedGovYear, setSelectedGovYear] = useState(2021)
  const [selectedSelfYear, setSelectedSelfYear] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const { data: companyData } = await supabase
        .from("emissions3")
        .select("*")
        .eq("uuid", uuid)
        .limit(1)

      const company = companyData?.[0]
      setCompany(company)

      if (!company) return

      const { data: allRows } = await supabase
        .from("emissions3")
        .select("year, scope, source, s2_base, total_emission")
        .eq("company_number", company.company_number)
        .order("year", { ascending: true })

      const govRows = allRows.filter(row => row.source === "gov")
      const selfRows = allRows.filter(row => row.source === "self")

      setGovData(govRows)
      setSelfData(selfRows)

      const validSelfYears = [...new Set(
        selfRows.filter(row => row.total_emission != null).map(row => row.year)
      )].sort((a, b) => a - b).slice(-5)

      if (validSelfYears.length > 0) setSelectedSelfYear(validSelfYears[0])
    }

    fetchData()
  }, [uuid])

  if (!company) {
    return <div className="p-10 text-red-500">企業データを読み込めませんでした。</div>
  }

  return (
    <div className="p-10 space-y-8">
      <button
        onClick={() => navigate("/")}
        className="border border-gray-300 text-gray-700 bg-green-100 hover:bg-green-300 px-4 py-2 rounded-md text-sm flex items-center w-fit"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        ダッシュボードへ戻る
      </button>

      <div className="bg-white rounded-xl shadow p-6 space-y-3">
      <h2 className="text-lg font-bold text-green-700 mb-4">{company.name}</h2>
  <div className="grid grid-cols-2 gap-4">
    {/* 왼쪽 열 */}
    <div className="space-y-2">
      <div>
        <span className="text-gray-500">所属：</span>
        {company.affiliate || "なし"}
      </div>
      <div>
        <span className="text-gray-500">業種：</span>
        {company.industry}
      </div>
      <div>
        <span className="text-gray-500">地域：</span>
        {company.prefecture}
      </div>
    </div>

    {/* 오른쪽 열 */}
    <div className="space-y-2">
    <div>
  <span className="text-gray-500">上場区分：</span>
  {company.market_capitalization ? "⭕️" : "❌"}
</div>
<div>
  <span className="text-gray-500">時価総額：</span>
  {company.market_capitalization
    ? `${company.market_capitalization.toLocaleString()} 億円`
    : "ー"}
</div>

      <div>
        <span className="text-gray-500">算定範囲：</span>
        {company.survey_area || "ー"}
      </div>
    </div>
  </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-md font-semibold text-green-700 mb-2">排出削減目標</h3>
        <p className="text-sm text-gray-800 whitespace-pre-line">
          {company.goal || "ー"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex border-b mb-4">
            <button
              className={`px-4 py-2 font-semibold ${activeTab === "gov" ? "border-b-2 border-green-600 text-green-700" : "text-gray-500"}`}
              onClick={() => setActiveTab("gov")}
            >
              温対法データ
            </button>
            <button
              className={`ml-4 px-4 py-2 font-semibold ${activeTab === "self" ? "border-b-2 border-green-600 text-green-700" : "text-gray-500"}`}
              onClick={() => setActiveTab("self")}
            >
              自己申告データ
            </button>
          </div>

          {activeTab === "gov" && (
            <>
              <p className="text-sm text-gray-500 mb-2">※ 調査地域: 国内</p>
              <div className="flex gap-2 mb-4">
                {[2019, 2020, 2021].map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedGovYear(year)}
                    className={`px-4 py-1 rounded-md border text-sm font-semibold ${selectedGovYear === year ? "bg-green-100 text-green-700 border-green-300" : "bg-white text-gray-600 border-gray-300"}`}
                  >
                    {year}年
                  </button>
                ))}
              </div>
              <table className="w-full text-sm border-t border-gray-200">
                <thead>
                  <tr className="text-gray-600 border-b border-gray-200">
                    <th className="text-left py-2 px-2">スコープ</th>
                    <th className="text-right py-2 px-2">排出量</th>
                  </tr>
                </thead>
                <tbody className="text-gray-900">
                  {[1, 2].map((scope) => {
                    const row = govData.find((r) => r.year === selectedGovYear && r.scope === scope && r.total_emission != null)
                    return row ? (
                      <tr key={scope} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                        <td className="py-2 px-2 font-medium">Scope {scope}</td>
                        <td className="py-2 px-2 text-right font-semibold text-green-700">{row.total_emission.toLocaleString()} t-CO₂</td>
                      </tr>
                    ) : null
                  })}
                </tbody>
              </table>
            </>
          )}

          {activeTab === "self" && (
            <>
              <p className="text-sm text-gray-500 mb-2">※ 調査地域: {company.survey_area || "ー"}</p>
              <div className="flex gap-2 mb-4">
                {[...new Set(selfData.filter(row => row.total_emission != null).map(row => row.year))]
                  .sort((a, b) => a - b)
                  .slice(-5)
                  .map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedSelfYear(year)}
                      className={`px-4 py-1 rounded-md border text-sm font-semibold ${selectedSelfYear === year ? "bg-green-100 text-green-700 border-green-300" : "bg-white text-gray-600 border-gray-300"}`}
                    >
                      {year}年
                    </button>
                  ))}
              </div>
              <table className="w-full text-sm border-t border-gray-200">
                <thead>
                  <tr className="text-gray-600 border-b border-gray-200">
                    <th className="text-left py-2 px-2">スコープ</th>
                    <th className="text-right py-2 px-2">排出量</th>
                  </tr>
                </thead>
                <tbody className="text-gray-900">
                  {[1, 2].map((scope) => {
                    const row = selfData.find((r) => r.year === selectedSelfYear && r.scope === scope && r.total_emission != null)
                    return row ? (
                      <tr key={scope} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                        <td className="py-2 px-2 font-medium">Scope {scope}{scope === 2 && row.s2_base ? ` (${row.s2_base})` : ""}</td>
                        <td className="py-2 px-2 text-right font-semibold text-green-700">{row.total_emission.toLocaleString()} t-CO₂</td>
                      </tr>
                    ) : null
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center justify-center min-h-[250px]">
          <p className="text-sm text-gray-400">📊 グラフがここに入る予定です</p>
        </div>
      </div>
    </div>
  )
}
