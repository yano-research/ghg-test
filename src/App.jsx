import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
// import CompanyDetailPage from "./pages/CompanyDetailPage";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            {/* <Route path="/company/:id" element={<CompanyDetailPage />} /> */}
          </Routes>
        </div> 
      </div>
      
    </BrowserRouter>
  );
}

export default App;