export default function SummaryCards() {
    return (
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">登録企業数</p>
          <h2 className="text-2xl font-bold text-green-700">0社</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">業種数</p>
          <h2 className="text-2xl font-bold text-green-700">3種</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">最多排出業種</p>
          <h2 className="text-2xl font-bold text-green-700">製造業</h2>
        </div>
      </div>
    );
  }