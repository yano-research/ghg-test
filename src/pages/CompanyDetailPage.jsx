import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function CompanyDetailPage() {
  const { uuid } = useParams()
  const [company, setCompany] = useState(null)
  const [govData, setGovData] = useState([])
  const [selfData, setSelfData] = useState([])
  const [activeTab, setActiveTab] = useState("gov")

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
      {/* 1행: 기업정보 */}
      <div className="bg-white rounded-xl shadow p-6 grid grid-cols-2 gap-4">
        <h2 className="text-lg font-bold col-span-2 mb-2">企業情報</h2>
        <div><span className="text-gray-500">事業者番号：</span>{company.company_number}</div>
        <div><span className="text-gray-500">所属：</span>{company.affiliate}</div>
        <div><span className="text-gray-500">工場：</span>{company.factory}</div>
        <div><span className="text-gray-500">業種：</span>{company.industry} / {company.industry2} / {company.industry3} / {company.industry4}</div>
        <div><span className="text-gray-500">地域：</span>{company.prefecture}</div>
        <div><span className="text-gray-500">PLC：</span>{company.PLC}</div>
        <div><span className="text-gray-500">時価総額：</span>{company.market_capitalization}</div>
        <div><span className="text-gray-500">排出削減目標：</span>{company.goal}</div>
      </div>

      {/* 2행: 탭 전환 */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 font-semibold ${activeTab === "gov" ? "border-b-2 border-green-600 text-green-700" : "text-gray-500"}`}
            onClick={() => setActiveTab("gov")}
          >
            政府データ (gov)
          </button>
          <button
            className={`ml-4 px-4 py-2 font-semibold ${activeTab === "self" ? "border-b-2 border-green-600 text-green-700" : "text-gray-500"}`}
            onClick={() => setActiveTab("self")}
          >
            自己申告データ (self)
          </button>
        </div>

        {activeTab === "gov" && (
          <>
            <p className="text-sm text-gray-500 mb-4">※ 調査地域: 国内</p>
            {govData.length === 0 ? (
              <p className="text-sm text-gray-400">データがありません</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-1">年度</th>
                    <th className="text-left py-1">スコープ</th>
                    <th className="text-right py-1">排出量</th>
                  </tr>
                </thead>
                <tbody>
                  {govData.map((row, i) => (
                    <tr key={i}>
                      <td>{row.year}</td>
                      <td>Scope {row.scope}</td>
                      <td className="text-right">{row.total_emission?.toLocaleString()} t-CO₂</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

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