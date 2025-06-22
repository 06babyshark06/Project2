import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login_img from "../assets/imgs/login_imgs.webp";
import { login } from "../services/authService.js";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(id, password, rememberMe);
      alert("Đăng nhập thành công");
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.error_description || "Đăng nhập thất bại. Vui lòng kiểm tra lại.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="absolute inset-0">
        <img
          src={login_img}
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Login form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white text-black px-6 md:px-10 py-10 md:py-12 rounded-md w-full max-w-[400px] shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Đăng Nhập</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 relative">
            <div className="text-base text-gray-700">Số định danh cá nhân</div>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Nhập số định danh cá nhân"
              className="text-black px-4 py-3 rounded border border-gray-500 focus:outline-none"
              pattern="\d{8,}"
              title="Vui lòng nhập ít nhất 8 chữ số"
              inputMode="numeric"
              required
            />

            <div className="text-base text-gray-700">Mật khẩu</div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full text-black px-4 py-3 rounded border border-gray-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>

            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}

            <button
              type="submit"
              className="bg-[#f6121d] text-white cursor-pointer py-3 rounded font-bold mt-2 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-700 underline hover:text-white cursor-pointer">
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>

          <div className="flex items-center mt-4 gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="accent-red-600"
            />
            <label htmlFor="remember">Ghi nhớ đăng nhập</label>
          </div>

          <div className="mt-6 text-sm text-gray-700">
            Bạn chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-[#f6121d] underline cursor-pointer"
            >
              Đăng ký.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
