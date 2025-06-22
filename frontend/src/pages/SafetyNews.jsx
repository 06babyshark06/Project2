import React, { useEffect, useState } from 'react';
import news_2 from "../assets/imgs/news_2.jpg";


const sampleArticles = [
  {
    title: "Sử dụng điện thoại khi lái xe trên cao tốc, tuyệt đối không",
    date: "19/06/2025",
    image: news_2,
    summary: "Lực lượng CSGT đã phát hiện, xử lý 28.175 trường hợp vi phạm sử dụng điện thoại khi điều khiển xe...",
  },
  {
    title: "Cục CSGT: Có sự cố trên cao tốc phải báo ngay lực lượng chức năng",
    date: "19/06/2025",
    image: news_2,
    summary: "Để đảm bảo an toàn, khi xe gặp sự cố cần nhanh chóng rời khỏi xe và di chuyển ra khỏi làn dừng...",
  },
  {
    title: "Tăng cường kiểm tra, xử lý phương tiện lắp thiết bị bơm, hút cát, sỏi",
    date: "19/06/2025",
    image: news_2,
    summary: "Tiếp tục triển khai thực hiện chỉ đaọ của Bộ Công an và Cục CSGT về tổng kiểm soát phương tiện có gắn thiết bị bơm, hút cát sỏi và phương tiện vận chuyển cát, sỏi trên đường thuỷ. Phòng Cảnh sát giao thông Công an tỉnh Bắc Giang tăng cường công tác tuyên truyền,...",
  },
  {
    title: "Cục CSGT thực hiện phong trào thi đua Lực lượng CAND tiên phong đi đầu trong đổi mới sáng tạo",
    date: "19/06/2025",
    image: news_2,
    summary: "Thực hiện chỉ đạo của Bộ Công an, Cục CSGT đã xây dựng kế hoạch triển khai thực hiện phong trào thi đua “Lực lượng CAND tiên phong đi đầu trong đổi mới sáng tạo và chuyển đổi số",
  },
  {
    title: "Tăn cường tuyên truyền, xử lý mạnh tay với các shipper, xe ôm công nghệ vi phạm an toàn giao thông.",
    date: "19/06/2025",
    image: news_2,
    summary: "Lực lượng CSGT toàn quốc đã tổ chức tuyên truyền, phối hợp với một số báo đài đưa tin về việc tăng cường công tác TTKS, XLVP tập trung vào các Shipper và tài xế xe công nghệ vi phạm trật tự an toàn giao thông.",
  },
  {
    title: "Bắt giữ qua tang đối tượng vận chuyển 48kg thuốc nổ trái phép tại Yên Bái",
    date: "19/06/2025",
    image: news_2,
    summary: "Ngày 15/06/2025, lực lượng Cảnh sát giao thông đường thuỷ, Công an tỉnh Yên Bái kiểm tra, bắt quả tang đối tượng vận chuyển 48kg thuốc nổ trái phép.",
  },
  
];

const SafetyNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(sampleArticles);

  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">An toàn giao thông</h2>
      {articles.map((article, index) => (
        <div key={index} className="mb-6 border-b pb-4 flex flex-col md:flex-row gap-4">
          <img src={article.image} alt="Thumbnail" className="w-full md:w-48 h-32 object-cover rounded" />
          <div>
            <h3 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">{article.title}</h3>
            <p className="text-sm text-gray-500 mb-1">Ngày đăng: {article.date}</p>
            <p className="text-gray-700">{article.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SafetyNews;
