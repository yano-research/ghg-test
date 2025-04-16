import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"   // ✅ 이거 추가

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>    {/* ✅ 꼭 감싸야 useNavigate 작동함 */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
)