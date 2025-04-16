import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function CompanyDetailPage() {
  const { uuid } = useParams()
  const [company, setCompany] = useState(null)
  const [govData, setGovData] = useState([])
  const [selfData, setSelfData] = useState([])
  const [activeTab, setActiveTab] = useState("gov")
  const [selectedGovYear, setSelectedGovYear] = useState(2021)

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

      setGovData(allRows.filter(row => row.source === "gov"))
      setSelfData(allRows.filter(row => row.source === "self"))
    }

    fetchData()
  }, [uuid])

  if (!company) {
    return <div className="p-10 text-red-500">企業データを読み込めませんでした。</div>
  }

  return (
    <div className="p-10 space-y-8">
      {/* 企業基本情報 */}
      <div className="bg-white rounded-xl shadow p-6 space-y-3">
        <h2 className="text-lg font-bold text-green-700 mb-2">{company.name}</h2>

        <div><span className="text-gray-500">所属：</span>{company.affiliate}</div>
        <div><span className="text-gray-500">業種：</span>{company.industry}</div>
        <div><span className="text-gray-500">地域：</span>{company.prefecture}</div>
        <div><span className="text-gray-500">PLC：</span>{company.PLC || "ー"}</div>
        <div><span className="text-gray-500">時価総額：</span>{company.market_capitalization?.toLocaleString()} 億円</div>
        <div><span className="text-gray-500">算定範囲：</span>{company.survey_area}</div>
    </div>

    {/* 감축 목표 카드 */}
        <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-md font-semibold text-green-700 mb-2">排出削減目標</h3>
        <p className="text-sm text-gray-800 whitespace-pre-line">
            {company.goal || "ー"}
        </p>
        </div>


      {/* データタブ */}
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

        {/* ----------------------------- govタブ ----------------------------- */}
        {activeTab === "gov" && (
          <>
            <p className="text-sm text-gray-500 mb-2">※ 調査地域: 国内</p>

            {/* 年度選択ボタン */}
            <div className="flex gap-2 mb-4">
              {[2019, 2020, 2021].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedGovYear(year)}
                  className={`px-4 py-1 rounded-md border text-sm font-semibold ${
                    selectedGovYear === year
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  {year}年
                </button>
              ))}
            </div>

            {/* 表示：選択された年度のScope1/2 */}
            {govData.filter((row) => row.year === selectedGovYear && (row.scope === 1 || row.scope === 2)).length === 0 ? (
              <p className="text-sm text-gray-400">データがありません</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-1">スコープ</th>
                    <th className="text-right py-1">排出量</th>
                  </tr>
                </thead>
                <tbody>
                  {govData
                    .filter((row) => row.year === selectedGovYear && (row.scope === 1 || row.scope === 2))
                    .map((row, i) => (
                      <tr key={i}>
                        <td>Scope {row.scope}</td>
                        <td className="text-right">{row.total_emission?.toLocaleString()} t-CO₂</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {/* ----------------------------- selfタブ ----------------------------- */}
        {activeTab === "self" && (
          <>
            <p className="text-sm text-gray-500 mb-4">※ 調査地域: {company.survey_area || "ー"}</p>
            {selfData.length === 0 ? (
              <p className="text-sm text-gray-400">データがありません</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-1">年度</th>
                    <th className="text-left py-1">スコープ</th>
                    <th className="text-left py-1">Base</th>
                    <th className="text-right py-1">排出量</th>
                  </tr>
                </thead>
                <tbody>
                  {selfData.map((row, i) => (
                    <tr key={i}>
                      <td>{row.year}</td>
                      <td>Scope {row.scope}</td>
                      <td>{row.s2_base || "-"}</td>
                      <td className="text-right">{row.total_emission?.toLocaleString()} t-CO₂</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  )
}