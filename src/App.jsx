import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import DashboardPage from "./pages/DashboardPage"
import CompanyDetailPage from "./pages/CompanyDetailPage"

export default function App() {
  return (
    <div className="flex w-screen min-h-screen bg-[#f5f6fa]">
      <Sidebar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/company/:id" element={<CompanyDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}