import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import DashboardPage from "./pages/DashboardPage"
import CompanyDetailPage from "./pages/CompanyDetailPage"
import IndustryListPage from "./pages/IndustryListPage" // ✅ 추가

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 flex-shrink-0 bg-white border-r">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-auto bg-[#f5f6fa]">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/company/:uuid" element={<CompanyDetailPage />} />
          <Route path="/industry" element={<IndustryListPage />} /> {/* ✅ 추가 */}
        </Routes>
      </main>
    </div>
  )
}