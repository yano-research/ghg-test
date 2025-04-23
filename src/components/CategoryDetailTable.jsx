export default function CategoryDetailTable() {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-3 py-2">企業名</th>
              {[...Array(15)].map((_, i) => (
                <th key={i} className="text-right px-3 py-2">C{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-3 py-2 text-gray-800">トヨタ自動車</td>
              {[...Array(15)].map((_, i) => (
                <td key={i} className="text-right px-3 py-2 text-gray-500">---</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  