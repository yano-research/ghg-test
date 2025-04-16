import { companies } from "../lib/dummyData";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">등록된 기업 리스트</h1>
      <div className="grid gap-4">
        {companies.map((company) => (
          <Link
            key={company.id}
            to={`/company/${company.id}`}
            className="block p-4 bg-white rounded shadow hover:bg-green-50"
          >
            <h2 className="text-lg font-semibold text-green-700">{company.name}</h2>
            <p className="text-sm text-gray-600">
              {company.industry} - {company.prefecture}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}