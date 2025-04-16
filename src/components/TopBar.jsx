export default function TopBar() {
  return (
    <div className="flex justify-between items-center mb-6">
      <input
        type="text"
        placeholder="企業名を入力（例：トヨタ自動車）"
        className="w-1/3 border border-gray-300 rounded-md px-4 py-2 text-sm bg-white text-gray-900 placeholder-gray-400 shadow-sm"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold">
        ログイン
      </button>
    </div>
  );
}