import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }
    getSession()
  }, [])

  if (loading) return null
  return session ? children : <Navigate to="/login" />
}
