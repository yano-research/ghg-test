import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import DashboardPage from "./pages/DashboardPage"
import CompanyDetailPage from "./pages/CompanyDetailPage"
import IndustryListPage from "./pages/IndustryListPage"
import LoginPage from "./pages/LoginPage"
import CategoryComparisonPage from "./pages/CategoryComparisonPage"
import Footer from "./components/Footer"

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f6fa]">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 bg-white border-r">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<DashboardPage />} />
            <Route path="/company/:uuid" element={<CompanyDetailPage />} />
            <Route path="/industry" element={<IndustryListPage />} />
            <Route path="/category-comparison" element={<CategoryComparisonPage />} />
          </Routes>
        </main>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  )
}