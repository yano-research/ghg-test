import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-green-800 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">CO₂ 대시보드</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:underline">대시보드</Link>
        {/* 앞으로 업종별 보기 추가 예정 */}
      </nav>
    </div>
  );
}