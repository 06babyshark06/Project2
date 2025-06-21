import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from "../assets/imgs/avatar.webp";
import { logout, getUserData, storeUserData, getAccessToken } from '../services/authService';
import axios from 'axios';

const BACKEND_URL = "http://localhost:8888/api/v1";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setUser(userData);
      setEditData(userData);
    }
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditData(prev => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`${BACKEND_URL}/users/${user.id}`, editData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setUser(res.data);
      setEditData(res.data);
      storeUserData(res.data, true);
      setIsEditing(false);
      window.dispatchEvent(new Event("storage"));
      alert("Thông tin đã được cập nhật!");
    } catch (err) {
      console.error("Lỗi khi cập nhật người dùng:", err);
      alert("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  const handleCancel = () => {
    setEditData(user);
    setIsEditing(false);
  };

  const handleLogout = () => {
    alert("Bạn đã đăng xuất");
    logout();
    navigate("/login");
  };

  if (!user || !editData) return <div className="p-4">Đang tải thông tin người dùng...</div>;

  return (
    <div className="container mx-auto bg-gray-100 py-6 px-4 min-h-150 md:p-12">
      <div className="">
        <div className="flex flex-col ">
          <img
            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
            src={editData.avatar || avatar}
            alt="Ảnh đại diện"
          />
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 block border w-50 p-1"
              />
              <p className="text-sm text-gray-500">Chọn ảnh đại diện mới</p>
            </>
          )}
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 text-gray-700">
          {[{ label: 'Số điện thoại', key: 'phoneNumber' },
            { label: 'Email', key: 'email' }].map(item => (
            <div key={item.key}>
              <label className="font-semibold text-xl block">{item.label}:</label>
              {isEditing ? (
                <input
                  type="text"
                  name={item.key}
                  value={editData[item.key] || ''}
                  onChange={handleEditChange}
                  className="border rounded px-2 py-1 w-full mt-1"
                />
              ) : (
                <p>{user[item.key]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">Lưu thay đổi</button>
              <button onClick={handleCancel} className="w-full sm:w-auto px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">Hủy</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Chỉnh sửa thông tin</button>
              <button onClick={handleLogout} className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">Đăng xuất</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
