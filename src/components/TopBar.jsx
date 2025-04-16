import { useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useNavigate } from "react-router-dom"

export default function TopBar() {
  const [keyword, setKeyword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()

  const handleSearch = async () => {
    setErrorMsg("") // 에러 초기화
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
  }

  return (
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-300 bg-white px-8">
      <div className="w-1/3 flex gap-2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="企業名を入力（例：トヨタ自動車）"
          className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm bg-white text-gray-900 placeholder-gray-400 shadow-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold"
        >
          検索
        </button>
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold">
        ログイン
      </button>
      {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
    </div>
  )
}