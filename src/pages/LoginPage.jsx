import { useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError("ログインに失敗しました")
    } else {
      navigate("/") // 로그인 성공 → 대시보드로
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center text-green-700">ログイン</h2>

        <input
          type="email"
          placeholder="メールアドレス"
          className="w-full border rounded px-4 py-2 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          className="w-full border rounded px-4 py-2 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-2 rounded text-sm hover:bg-green-700"
        >
          ログイン
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>
    </div>
  )
}
