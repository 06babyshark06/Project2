import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import news_1 from '../assets/imgs/news_1.jpg';

const Home = () => {
    const [licensePlate, setLicensePlate] = useState('');
    const [vehicleType, setVehicleType] = useState('Ô tô');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showNotFound, setShowNotFound] = useState(false);
    const [violations, setViolations] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    const fakeData = [
        {
            id: 1,
            owner: 'Nguyễn Văn A',
            plate: '30A12345',
            date: '20/05/2025',
            vehicleType: 'Xe máy',
            violate: 'Vượt đèn đỏ',
            paid: false,
        },
        {
            id: 1,
            owner: 'Nguyễn Văn A',
            plate: '30A12345',
            date: '20/05/2025',
            vehicleType: 'Xe máy',
            violate: 'Gây tai nạn bỏ trốn',
            paid: true,
        },
        {
            id: 2,
            owner: 'Trần Thị B',
            plate: '30A67890',
            date: '18/04/2025',
            vehicleType: 'Ô tô',
            violate: 'Lấn làn',
            paid: true,
        },
    ];

    const newsList = [
        {
            id: 1,
            title: 'Bảo đảm trật tự, an toàn giao thông trong tình hình mới',
            imageUrl: news_1,
        },
        {
            id: 2,
            title: 'Hơn 101.000 trường hợp bị xử lý sau 2 tuần thực hiện cao điểm an toàn giao thông',
            imageUrl: news_1,
        },
        {
            id: 3,
            title: 'Cầu vượt sông Đáy băng băng về đích, người dân chờ ngày thông xe',
            imageUrl: news_1,
        },
        {
            id: 4,
            title: 'Chính phủ chấp thuận chủ trương đầu tư hãng hàng không Sun PhuQuoc Airways',
            imageUrl: news_1,
        },
    ];

    const goToDetail = (violationId) => {
        navigate(`/detail/${violationId}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setShowNotFound(false);

        setTimeout(() => {
            setIsSubmitting(false);
            const matched = fakeData.filter(
                (v) =>
                    v.plate.toUpperCase() === licensePlate.trim().toUpperCase() && v.vehicleType === vehicleType
            );

            if (matched.length > 0) {
                setViolations(matched);
                setShowResults(true);
                setShowNotFound(false);
            } else {
                setViolations([]);
                setShowResults(false);
                setShowNotFound(true);
            }
        }, 1500);
    };

    return (
        <div className="container mx-auto min-h-150 bg-gray-100 py-6 px-10">
            <div className="p-6 rounded-md mx-auto max-w">
                <h2 className="text-xl font-semibold text-center text-blue-800 mb-6">TRA CỨU PHẠT TIỀN VI PHẠM GIAO THÔNG QUA HÌNH ẢNH</h2>

                {/* Search form */}
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
                    <div className="w-full max-w-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Biển kiểm soát</label>
                        <input
                            type="text"
                            value={licensePlate}
                            onChange={(e) => setLicensePlate(e.target.value)}
                            placeholder="VD: 30A12345"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="w-full max-w-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Loại phương tiện</label>
                        <select
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="Ô tô">Ô tô</option>
                            <option value="Xe máy">Xe máy</option>
                            <option value="Xe tải">Xe tải</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`py-3 px-4 rounded-md text-white font-medium ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                            } transition-colors`}
                    >
                        {isSubmitting ? 'Đang xử lý...' : 'Tra cứu'}
                    </button>
                </form>

                {showNotFound && (
                    <div className="text-red-600 text-center mt-4">Không tìm thấy kết quả phù hợp với biển số "{licensePlate}".</div>
                )}

                {/* Show result */}
                {showResults && (
                    <div className="mt-6 max-w-6xl mx-auto">
                        <h2 className="text-lg font-semibold mb-2">Kết quả vi phạm :</h2>
                        {violations.map((v) => (
                            <div
                                key={v.id}
                                onClick={() => goToDetail(v.id)}
                                className="bg-white p-4 mb-2 border rounded cursor-pointer hover:bg-gray-100 flex justify-between"
                            >
                                <div className="space-y-1">
                                    <p><strong>Chủ xe:</strong> {v.owner}</p>
                                    <p><strong>Biển số:</strong> {v.plate}</p>
                                    <p><strong>Loại phương tiện:</strong> {v.vehicleType}</p>
                                    <p><strong>Lỗi vi phạm:</strong> {v.violate}</p>
                                    <p><strong>Ngày vi phạm:</strong> {v.date}</p>
                                </div>

                                <div className="flex items-center pl-6">
                                    <p className={`font-semibold ${v.paid ? 'text-green-600' : 'text-red-600'}`}>
                                        {v.paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* information */}
                <div className="mt-10 p-6 text-gray-800 leading-relaxed">
                    <p>
                        Kể từ ngày <strong>01/01/2025</strong>, khi <strong>Nghị định 168/2024/NĐ-CP</strong> chính thức có hiệu lực, thì kèm với đó là nhiều hành vi vi phạm giao thông được tăng mạnh mức xử phạt từ vài lần cho đến thậm chí là vài chục lần.
                        Xem thông tin chi tiết về mức phạt vi phạm giao thông mới nhất theo Nghị định 168/2024/NĐ-CP đối với xe ô tô, xe máy.
                    </p>

                    <p className="mt-4">
                        🚚 <a href="https://thuvienphapluat.vn/phap-luat/ho-tro-phap-luat/muc-xu-phat-vi-pham-giao-thong-xe-may-o-to-2025-cac-loi-thuong-gap-moi-nhat-theo-nghi-dinh-168-999966-197118.html" className="text-blue-600 hover:underline font-bold">
                            Mức xử phạt vi phạm giao thông xe ô tô 2025
                        </a>
                        <br />
                        🛵 <a href="https://thuvienphapluat.vn/phap-luat/ho-tro-phap-luat/muc-xu-phat-vi-pham-giao-thong-xe-may-o-to-2025-cac-loi-thuong-gap-moi-nhat-theo-nghi-dinh-168-999966-197118.html" className="text-blue-600 hover:underline font-bold">
                            Mức xử phạt vi phạm giao thông xe máy 2025
                        </a>
                    </p>

                    <p className="mt-4">
                        Để tra cứu phạt nguội cho xe máy, quý khách hãy vào trang: 🛵 <a href="https://www.csgt.vn/tra-cuu-phuong-tien-vi-pham.html" target="_blank" rel="noreferrer" className="text-blue-600 underline">https://www.csgt.vn/tra-cuu-phuong-tien-vi-pham.html</a> để tra cứu thông tin phạt nguội mới nhất
                    </p>

                    <p className="mt-4">
                        🅿️ Phần mềm kiểm tra phạt nguội lỗi vi phạm giao thông mới nhất năm 2025 nhanh chóng và chính xác<br />
                        Cập nhật dữ liệu mới nhất từ cục cảnh sát giao thông<br />
                        Hãy chia sẻ phần mềm lên Facebook, Zalo... để mọi người cùng tra cứu quý vị nhé!<br />
                        Tra Phạt Nguội Tra Cứu Lỗi Vi Phạm Giao Thông từ csgt.vn<br />
                        Máy quét tự động biển số tra lỗi vi phạm giao thông mới nhất trên toàn quốc.
                    </p>

                    <p className="mt-4">
                        🚔 Thông tin từ ngày 01/06, tài xế toàn quốc có thể tự tra cứu vi phạm giao thông qua camera giám sát trên toàn quốc<br />
                        Tra lỗi vi phạm giao thông cho xe máy, ô tô, xe máy điện, xe tải, xe container<br />
                        Người dân có thể tra cứu lịch sử xử lý, vi phạm giao thông.
                    </p>
                </div>

                {/* News */}
                <div className="mt-10 max-w-6xl mx-auto">
                    <h2 className="mt-6 mb-2 text-lg font-semibold text-blue-700">Tin tức mới nhất</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {newsList.map((news) => (
                            <div key={news.id} className="bg-white shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                                <img src={news.imageUrl} alt={news.title} className="w-full h-32 object-cover" />
                                <div className="p-2">
                                    <h3 className="text-sm font-semi">{news.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
