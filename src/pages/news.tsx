"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./news.css"

interface NewsItem {
  id: number
  title: string
  description: string
  date: string
  imageUrl?: string
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock news data
    const mockNews: NewsItem[] = [
      {
        id: 1,
        title: "Phim Mới Ra Mắt Tuần Này",
        description: "Những bộ phim mới nhất sắp được phát hành trên rạp chiếu phim của chúng tôi.",
        date: "2025-11-11",
        imageUrl: "https://via.placeholder.com/300x200/0b2545/ffffff?text=News+1",
      },
      {
        id: 2,
        title: "Ưu Đãi Đặc Biệt Cho Thành Viên",
        description: "Nhận chiết khấu 20% cho tất cả các vé phim khi bạn là thành viên VIP.",
        date: "2025-11-10",
        imageUrl: "https://via.placeholder.com/300x200/0b2545/ffffff?text=News+2",
      },
      {
        id: 3,
        title: "Khai Trương Rạp Chiếu Mới",
        description: "Rạp chiếu phim hiện đại với công nghệ IMAX sắp khai trương tại trung tâm thành phố.",
        date: "2025-11-09",
        imageUrl: "https://via.placeholder.com/300x200/0b2545/ffffff?text=News+3",
      },
      {
        id: 4,
        title: "Sự Kiện Gặp Gỡ Diễn Viên",
        description: "Cơ hội gặp gỡ và chụp ảnh cùng các diễn viên nổi tiếng vào cuối tuần này.",
        date: "2025-11-08",
        imageUrl: "https://via.placeholder.com/300x200/0b2545/ffffff?text=News+4",
      },
      {
        id: 5,
        title: "Lịch Chiếu Suất Chiếu Đêm",
        description: "Thêm các suất chiếu đêm muộn cho những người yêu thích xem phim vào tối hôm.",
        date: "2025-11-07",
        imageUrl: "https://via.placeholder.com/300x200/0b2545/ffffff?text=News+5",
      },
      {
        id: 6,
        title: "Công Nghệ Âm Thanh Dolby Atmos",
        description: "Trải nghiệm âm thanh vòm 3D với công nghệ Dolby Atmos tại rạp của chúng tôi.",
        date: "2025-11-06",
        imageUrl: "https://via.placeholder.com/300x200/0b2545/ffffff?text=News+6",
      },
    ]

    // Simulate API call
    setTimeout(() => {
      setNews(mockNews)
      setIsLoading(false)
    }, 500)
  }, [])

  if (isLoading) {
    return (
      <div className="news-page">
        <Header />
        <main className="news-container">
          <div className="loading">Đang tải tin tức...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="news-page">
      <Header />
      <main className="news-container">
        <section className="news-section">
          <div className="section-header">
            <h2>📰 Tin Tức Mới Nhất</h2>
          </div>
          <div className="news-grid">
            {news.map((item) => (
              <div key={item.id} className="news-card">
                {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="news-image" />}
                <div className="news-content">
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-date">{new Date(item.date).toLocaleDateString("vi-VN")}</p>
                  <p className="news-description">{item.description}</p>
                  <button className="read-more-btn">Đọc thêm →</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default News
