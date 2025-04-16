import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import DashboardPage from "./pages/DashboardPage"
import CompanyDetailPage from "./pages/CompanyDetailPage"

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden"> {/* ✅ 화면 꽉 채움 */}
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[#f5f6fa]"> {/* ✅ 세로 스크롤 */}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/company/:uuid" element={<CompanyDetailPage />} />
        </Routes>
      </div>
    </div>
  )
}