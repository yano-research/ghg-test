import { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"
import { useNavigate } from "react-router-dom"

export default function TopBar() {
  const [keyword, setKeyword] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()

  // 🔍 자동완성 리스트 실시간 업데이트
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!keyword.trim()) {
        setSuggestions([])
        return
      }
  
      const { data, error } = await supabase
        .from("emissions3")
        .select("name, uuid, company_number")
        .ilike("name", `%${keyword.trim()}%`)
  
      if (!error && data) {
        // ✅ company_number 기준으로 중복 제거
        const unique = new Map()
        data.forEach((item) => {
          if (!unique.has(item.company_number)) {
            unique.set(item.company_number, item)
          }
        })
  
        setSuggestions(Array.from(unique.values()).slice(0, 5)) // 최대 5개만
      }
    }
  
    fetchSuggestions()
  }, [keyword])

  const handleSearch = async () => {
    if (!keyword.trim()) return

    const { data, error } = await supabase
      .from("emissions3")
      .select("id")
      .eq("name", keyword.trim())
      .limit(1)

    if (error || !data || data.length === 0) {
      setErrorMsg("企業が見つかりませんでした。")
      return
    }

    const companyId = data[0].id
    navigate(`/company/${companyId}`)
    setKeyword("") // 검색어 초기화
    setSuggestions([]) // 추천 초기화
  }

  const handleSelect = (company) => {
    navigate(`/company/${company.uuid}`)
    setKeyword("") // 검색어 초기화
    setSuggestions([]) // 추천 초기화
  }

  return (
    <div className="relative flex justify-between items-center mb-6 pb-4 border-b border-gray-300 bg-white px-8">
      <div className="w-1/3">
        <div className="relative">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="企業名を入力（例：トヨタ自動車）"
            className="w-full border border-gray-300 rounded px-4 py-2 text-sm bg-white text-gray-900 placeholder-gray-400 shadow-sm"
          />
          {/* 자동완성 리스트 */}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 shadow max-h-48 overflow-auto">
              {suggestions.map((company) => (
                <li
                  key={company.uuid}
                  onClick={() => handleSelect(company)}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                >
                  {company.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="ml-4 bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold"
      >
        検索
      </button>
      <button className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold ml-4">
        ログイン
      </button>
      {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
    </div>
  )
}