import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container mx-auto min-h-150 flex flex-col items-center justify-center bg-gray-100 text-black text-center px-4">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6">Trang bạn tìm không tồn tại.</p>
            <Link to="/" className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white text-sm font-semibold">
                Quay lại Trang chủ
            </Link>
        </div>
    );
};

export default NotFound;
