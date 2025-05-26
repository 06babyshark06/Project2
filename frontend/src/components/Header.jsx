import React, { useEffect, useState, useRef } from 'react';
import VietNam_flag from '../assets/imgs/vietnam_flag.webp';
import { useNavigate } from 'react-router';
import { FaUserCircle, FaSignOutAlt, FaIdBadge, FaHome, FaNewspaper, FaQuestionCircle, FaTrafficLight } from 'react-icons/fa';
import logo from '../assets/imgs/logo.png'

const Header = () => {
    const [location, setLocation] = useState('Đang xác định...');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const formatVietnameseDate = (date) => {
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const dayName = days[date.getDay()];
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${dayName}, ${day}/${month}/${year}`;
    };

    const today = formatVietnameseDate(new Date());

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                    const data = await response.json();
                    const city = data.address.city || data.address.town || data.address.village || data.address.state || 'Không xác định';
                    setLocation(city);
                } catch (error) {
                    console.error('Lỗi lấy vị trí:', error);
                    setLocation('Không xác định');
                }
            }, (error) => {
                console.error('Không cho phép truy cập vị trí:', error);
                setLocation('Không xác định');
            });
        } else {
            setLocation('Trình duyệt không hỗ trợ định vị');
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handleLogout = () => {
        alert('Bạn đã đăng xuất');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="container mx-auto">
            {/* Header */}
            <header className="bg-yellow-300 px-8 py-4 flex justify-between items-center flex-wrap">
                <div className="flex items-center">
                    <a href="/"><img src={logo} alt="Logo" className="mr-2 h-12" /></a>
                    <h1 className="text-xl sm:text-2xl font-bold text-red-600 leading-tight">BỘ CÔNG AN<br />CỤC CẢNH SÁT GIAO THÔNG</h1> 
                </div>

                <div className="relative mt-2 sm:mt-0" ref={dropdownRef}>
                    {user ? (
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                            <span>Xin chào {user.name}</span>
                            <FaUserCircle className="text-2xl text-gray-700" />
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md z-10">
                                    <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-200">
                                        <FaIdBadge /> Thông tin cá nhân
                                    </a>
                                    <button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-200">
                                        <FaSignOutAlt /> Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex">
                            <a href="/register" className="text-blue-700 hover:underline pr-2.5 font-semibold border-r">Đăng ký</a>
                            <a href="/login" className="text-blue-700 hover:underline pl-2.5 font-semibold">Đăng nhập</a>
                        </div>
                    )}
                </div>
            </header>

            {/* Nav */}
            <nav className="bg-blue-800 text-white px-8 py-2">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex flex-wrap items-center py-1">
                        <a href="/" className="hover:underline flex px-2.5 items-center gap-2 border-r"><FaHome />Trang chủ</a>
                        <a href="#" className="hover:underline flex px-2.5 items-center gap-2 border-r"><FaNewspaper />Tin tức</a>
                        <a href="#" className="hover:underline flex px-2.5 items-center gap-2 border-r"><FaTrafficLight />An toàn giao thông</a>
                        <a href="#" className="hover:underline flex px-2.5 items-center gap-2"><FaQuestionCircle />Hỏi đáp</a>
                    </div>
                    <div className="text-sm text-white flex items-center">
                        <span>{location} - {today}</span>
                        <span className="ml-3 flex items-center">
                            <img src={VietNam_flag} alt="VN flag" className="h-4 w-6" />
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
