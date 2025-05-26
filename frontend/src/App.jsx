import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ViolationDetail from "./pages/ViolationDetail"
import Header from "./pages/Header"
import Footer from "./pages/Footer"
import UserProfile from "./pages/UserProfile"
import NotFound from "./pages/NotFound"

function App() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:id" element={<ViolationDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  )
}

export default App;
