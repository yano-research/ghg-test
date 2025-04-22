import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useNavigate } from "react-router-dom" 


export default function IndustryListPage() {
  const [industries, setIndustries] = useState([])
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [companyData, setCompanyData] = useState([])
  const navigate = useNavigate()

  // 업종 리스트 불러오기
  useEffect(() => {
    async function fetchIndustries() {
      const { data, error } = await supabase
        .from("emissions3")
        .select("industry")
        .eq("source", "gov")

      const unique = [...new Set(data.map(row => row.industry))].filter(Boolean)
      setIndustries(unique.sort())
    }

    fetchIndustries()
  }, [])

  // 업종 선택 시 기업 데이터 불러오기
  useEffect(() => {
    if (!selectedIndustry) return

    async function fetchCompanies() {
        const { data, error } = await supabase
          .from("emissions3")
          .select("uuid,name, company_number, industry2, scope, total_emission")
          .eq("source", "gov")
          .eq("industry", selectedIndustry)
      
        if (!data || error) {
          console.error("データ取得失敗:", error)
          setCompanyData([])
          return
        }
      
        const grouped = data.reduce((acc, row) => {
          const key = row.company_number
          if (!acc[key]) {
            acc[key] = {
              name: row.name,
              industry2: row.industry2 || "",
              uuid: row.uuid, // ✅ uuid도 같이 저장!
              total: 0
            }            
          }
        
          if (row.scope === 1 || row.scope === 2) {
            const emission = Number(row.total_emission)
            if (!isNaN(emission)) {
              acc[key].total += emission
            }
          }
        
          return acc
        }, {})
        
        
      
        const sorted = Object.values(grouped).sort((a, b) => b.total - a.total) //올림차순:sort((a, b) => a.total - b.total)
        setCompanyData(sorted)
      }

    fetchCompanies()
  }, [selectedIndustry])

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-xl font-bold text-green-700">業種別リスト</h1>

      {/* 드롭다운 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">業種を選択</label>
        <select
          className="border rounded-md px-3 py-2 text-sm text-gray-700 bg-white"
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
        >
          <option value="">-- 選択してください --</option>
          {industries.map((industry, idx) => (
            <option key={idx} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      {/* 테이블 */}
      {selectedIndustry && (
        <div className="bg-white rounded-xl shadow p-6 mt-4">
          <h2 className="text-md font-semibold mb-4 text-emerald-600">{selectedIndustry} 業種の企業一覧</h2>
          {companyData.length === 0 ? (
            <p className="text-sm text-gray-500">データがありません</p>
          ) : (
            <table className="w-full text-sm">
            <table className="w-full text-sm">
  <thead>
    <tr>
      <th className="text-left py-2">企業名</th>
      <th className="text-left py-2">業種</th> {/* 추가 */}
      <th className="text-right py-2">Scope1 + 2 排出量</th>
    </tr>
  </thead>
  <tbody>
  {companyData.map((row, i) => (
    <tr key={i} className="border-t">
      <td
        className="py-1 cursor-pointer hover:text-green-400"
        onClick={() => navigate(`/company/${row.uuid}`)}
      >
        {row.name}
      </td>
      <td className="py-1">{row.industry2 || "ー"}</td>
      <td className="py-1 text-right">{Math.round(row.total).toLocaleString()} 千t-CO₂</td>
    </tr>
  ))}
</tbody>

</table>

            </table>
          )}
        </div>
      )}
    </div>
  )
}