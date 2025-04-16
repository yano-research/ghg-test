import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <div className="flex w-screen min-h-screen bg-[#f5f6fa]">
      <Sidebar />
      <main className="flex-1">
        <DashboardPage />
      </main>
    </div>
  );
}