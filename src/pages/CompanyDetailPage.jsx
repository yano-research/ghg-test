import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function CompanyDetailPage() {
  const { id } = useParams()
  const [company, setCompany] = useState(null)

  useEffect(() => {
    async function fetchCompany() {
      const { data, error } = await supabase
        .from("emissions3")
        .select("*")
        .eq("id", id)
        .limit(1)

      if (error || !data || data.length === 0) {
        setCompany(null)
        return
      }

      setCompany(data[0])
    }

    fetchCompany()
  }, [id])

  if (!company) {
    return <div className="p-10 text-red-500">企業データを読み込めませんでした。</div>
  }

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold text-green-700">{company.name}</h1>
      <p>業種: {company.industry}</p>
      <p>排出量合計: {company.total_emission?.toLocaleString()} t-CO₂</p>
    </div>
  )
}