import { Link } from "react-router-dom"

const menu = [
  { label: "ダッシュボード", href: "/" },
  { label: "業種別リスト", href: "/industry" },
]

export default function Sidebar() {
  return (
    <div className="h-full p-6 bg-white border-r">
      <h1 className="text-xl font-bold text-green-700 mb-6">GHG Dashboard</h1>
      <ul className="space-y-4">
        {menu.map((item, i) => (
          <li key={i}>
            <Link
              to={item.href}
              className="flex items-center text-sm text-gray-700 hover:text-green-600"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}