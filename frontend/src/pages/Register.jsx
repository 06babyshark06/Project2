// 📁 src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login_img from "../assets/imgs/login_imgs.webp";
import api from "../services/api.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await api.post("auth/register", {
        username: id,
        fullName: username,
        identityCard: id,
        phoneNumber: phone,
        email,
        password,
      });
      alert("Đăng ký thành công. Vui lòng đăng nhập.");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0">
        <img src={login_img} alt="Background" className="w-full h-full object-cover opacity-60" />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white text-black px-6 md:px-10 py-10 md:py-12 rounded-md w-full max-w-[400px] shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Đăng Ký</h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <label className="text-base text-gray-700">Tên người dùng</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nhập tên người dùng" className="text-black px-3 py-2 rounded border border-gray-500 focus:outline-none text-sm" required />

            <label className="text-base text-gray-700">Số định danh cá nhân / CMND / CCCD</label>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="Nhập số định danh" pattern="\d{8,}" title="Vui lòng nhập ít nhất 8 chữ số" inputMode="numeric" className="text-black px-3 py-2 rounded border border-gray-500 focus:outline-none text-sm" required />

            <label className="text-base text-gray-700">Số điện thoại</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nhập số điện thoại" className="text-black px-3 py-2 rounded border border-gray-500 focus:outline-none text-sm" required />

            <label className="text-base text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email" className="text-black px-3 py-2 rounded border border-gray-500 focus:outline-none text-sm" required />

            <label className="text-base text-gray-700">Mật khẩu</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu" className="text-black px-3 py-2 rounded border border-gray-500 focus:outline-none text-sm" required />

            <label className="text-base text-gray-700">Nhập lại mật khẩu</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu" className="text-black px-3 py-2 rounded border border-gray-500 focus:outline-none text-sm" required />

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <button type="submit" disabled={loading} className="bg-[#f6121d] text-white py-2 rounded font-bold mt-2 text-sm cursor-pointer disabled:opacity-50">
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-700 text-center">
            Đã có tài khoản? <Link to="/login" className="text-[#e50914] underline cursor-pointer">Đăng nhập.</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
