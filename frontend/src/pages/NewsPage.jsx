import React from "react";
import news_2 from "../assets/imgs/news_2.jpg";

const NewsPage = () => {
    const mainNews = {
        title:
            "Triệt phá đường dây sản xuất, buôn bán nước hoa giả với số lượng đặc biệt lớn",
        img: news_2,
        source: "Công an Nhân dân",
        time: "33 phút",
        related: "250 liên quan",
    };

    const subHighlights = [
        {
            title:
                "Kết luận số 169-KL/TW: Hoàn thành và gửi 'cẩm nang công tác của cấp xã' cho các địa phương",
            img: news_2,
        },
        {
            title:
                "UAV Iran xuyên thủng phòng không Israel; Tel Aviv tuyên bố hạ thêm nhiều chỉ huy Tehran",
            img: news_2
        },
        {
            title:
                "Hoàng Đức, Văn Lâm giúp CLB Ninh Bình lập kỳ tích lịch sử",
            img: news_2
        },
    ];

    const sidebarNews = [
        {
            title:
                "Tổng Bí thư: Báo chí đúng cảm đấu tranh, loại bỏ cái xấu, cổ vũ cái mới, cái tiến bộ",
            source: "Tiền Phong",
            time: "8 giờ",
            related: "129 liên quan",
            img: news_2,
        },
        {
            title: "Thay đổi để thực hiện sứ mệnh trong kỷ nguyên mới",
            source: "Tiền Phong",
            time: "8 phút",
            related: "29 liên quan",
            img: news_2,
        },
        {
            title: "Lớn lên từ những chuyện nghề",
            source: "Tiền Phong",
            time: "4 phút",
            img: news_2,
        },
        {
            title: "Cháy quán karaoke, khách hát tử vong",
            source: "Người Lao Động",
            time: "6 phút",
            related: "6 liên quan",
            img: news_2,
        },
        {
            title:
                "Hải Phòng lập Tổ công tác đối chiếu, rà soát tiền thuê đất bị nhiều tổ chức, cá nhân 'nợ đọng'",
            source: "VnEconomy",
            time: "4 phút",
            related: "7 liên quan",
            img: news_2,
        },
    ];

    const bottomNews = [
        {
            title: "Ngọc Châu gợi cảm ở chung kết Hoa hậu Hoàn vũ Việt Nam",
            source: "ZNews",
            time: "27 phút",
            related: "6 liên quan",
            img: news_2
        },
        {
            title:
                "Tổng thống Putin đưa ra lời cảnh báo giữa lúc ông Trump cân nhắc tấn công Iran",
            source: "Vietnamnet",
            time: "2 giờ",
            related: "50 liên quan",
            img: news_2
        },
        {
            title:
                "Chân dung 'ông trùm' 30 tuổi và doanh nghiệp đứng sau vụ sữa giả HIUP",
            source: "ZNews",
            time: "3 giờ",
            related: "62 liên quan",
            img: news_2
        },
        {
            title: "Lãnh tụ Tối cao Iran chuẩn bị phương án tìm người kế nhiệm?",
            source: "Tiền Phong",
            time: "27 phút",
            related: "50 liên quan",
            img: news_2
        },
        {
            title:
                "Người dân vùng ngập sau mưa lũ ở Thái Nguyên hiện ra sao?",
            source: "Xây Dựng",
            time: "4 giờ",
            related: "5 liên quan",
            img: news_2
        },
        {
            title:
                "Tên lửa đạn đạo siêu nặng Iran lần đầu tấn công Israel: Đòn đánh tạo chấn động vượt khỏi Trung Đông",
            source: "VOV",
            time: "6 giờ",
            related: "12 liên quan",
            img: news_2,
        },
    ];

    return (
        <div className="container mx-auto bg-gray-100 py-6 px-4 min-h-150 md:p-12">
            <div className="text-2xl font-bold mb-4">Tin tức trong ngày</div>

            {/* Main section */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Main highlight */}
                <div className="md:col-span-2">
                    <img
                        src={mainNews.img}
                        alt="Main News"
                        className="w-full h-auto"
                    />
                    <h2 className="mt-4 text-2xl font-bold leading-snug">
                        {mainNews.title}
                    </h2>
                    <div className="text-gray-600 text-sm mt-1">
                        {mainNews.source} · {mainNews.time} · {mainNews.related}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                        {subHighlights.map((item, i) => (
                            <div key={i}>
                                <img src={item.img} alt="Sub" className="" />
                                <p className="mt-2 font-medium text-sm leading-snug">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {sidebarNews.map((item, i) => (
                        <div key={i} className="flex gap-3">
                            <img
                                src={item.img}
                                alt="sidebar"
                                className="w-20 h-16 object-cover "
                            />
                            <div>
                                <p className="font-medium text-base leading-snug hover:underline cursor-pointer">
                                    {item.title}
                                </p>
                                <div className="text-sm text-gray-500">
                                    {item.source} · {item.time} {item.related && `· ${item.related}`}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom section */}
            <div className="mt-10 grid gap-6">
                {bottomNews.map((news, i) => (
                    <div key={i} className="flex gap-4">
                        <img
                            src={news.img}
                            alt="thumb"
                            className="w-32 h-20 object-cover "
                        />
                        <div>
                            <p className="font-medium hover:underline cursor-pointer leading-snug">
                                {news.title}
                            </p>
                            <div className="text-sm text-gray-500">
                                {news.source} · {news.time} · {news.related}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
