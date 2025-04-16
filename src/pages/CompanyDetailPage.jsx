import { useParams } from "react-router-dom";
import { companies } from "../lib/dummyData";

export default function CompanyDetailPage() {
  const { id } = useParams();
  const company = companies.find((c) => c.id === id);

  if (!company) return <div>기업을 찾을 수 없습니다.</div>;

  const scope1 = company.scopes.find((s) => s.scope === 1);
  const scope2s = company.scopes.filter((s) => s.scope === 2);
  const scope3 = company.scopes.find((s) => s.scope === 3);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-green-700">{company.name}</h1>
      <p className="text-gray-600">{company.industry} · {company.prefecture}</p>

      <div>
        <h2 className="text-xl font-semibold mt-4 mb-2">Scope 1</h2>
        <p>{scope1?.total_emission?.toLocaleString()} t-CO₂</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-4 mb-2">Scope 2</h2>
        <ul className="list-disc ml-6">
          {scope2s.map((s, i) => (
            <li key={i}>
              {s.s2_base}: {s.total_emission.toLocaleString()} t-CO₂
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-4 mb-2">Scope 3</h2>
        <p>총 배출량: {scope3?.total_emission?.toLocaleString()} t-CO₂</p>
        <h3 className="font-medium mt-2">세부 내역:</h3>
        <ul className="list-disc ml-6">
          {Object.entries(scope3?.s3_categories || {}).map(([key, value]) => (
            <li key={key}>
              {key.toUpperCase()}: {value.toLocaleString()} t-CO₂
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}