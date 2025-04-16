export default function IndustryTable() {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-sm text-gray-500 mb-2">※ 2022年度のデータに基づく</p>
        <table className="w-full text-sm">
  <thead className="border-b">
    <tr>
      <th className="text-left py-2">業種</th>
      <th className="text-right py-2">平均排出量（tCO₂）</th>  {/* ✅ 오른쪽 정렬 */}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="py-2">総合化学メーカー</td>
      <td className="text-right">341,333</td>
    </tr>
    <tr>
      <td className="py-2">製造業</td>
      <td className="text-right">20,000</td>
    </tr>
  </tbody>
</table>
      </div>
    );
  }