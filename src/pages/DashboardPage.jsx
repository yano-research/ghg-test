// import { companies } from "../lib/dummyData";
// import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import SummaryCards from "../components/SummaryCards";
import IndustryTable from "../components/IndustryTable";
import IndustryChart from "../components/IndustryChart";
import Footer from "../components/Footer";

export default function DashboardPage() {
  return (
    <div className="w-full h-full px-8 py-6 space-y-6">
      <TopBar />
      <SummaryCards />
      <div className="grid grid-cols-2 gap-6 items-stretch">
        <IndustryTable />
        <IndustryChart />
      </div>



    </div>
  );
}
