"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "./price.css"

interface TicketPrice {
  id: number
  type: string
  price: number
  description: string
  icon: string
}

const Price = () => {
  const [prices, setPrices] = useState<TicketPrice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock price data
    const mockPrices: TicketPrice[] = [
      {
        id: 1,
        type: "Vé Thường",
        price: 120000,
        description: "Vé tiêu chuẩn cho tất cả các suất chiếu",
        icon: "🎬",
      },
      {
        id: 2,
        type: "Vé Học Sinh / Sinh Viên",
        price: 90000,
        description: "Giảm giá đặc biệt cho học sinh và sinh viên (có CCCD sinh viên)",
        icon: "🎓",
      },
      {
        id: 3,
        type: "Vé Người Cao Tuổi",
        price: 100000,
        description: "Ưu đãi cho người từ 60 tuổi trở lên",
        icon: "👴",
      },
      {
        id: 4,
        type: "Vé Trẻ Em",
        price: 80000,
        description: "Vé dành cho trẻ em dưới 12 tuổi",
        icon: "👶",
      },
      {
        id: 5,
        type: "Vé VIP",
        price: 150000,
        description: "Ghế VIP với dịch vụ cao cấp và tầm nhìn tốt nhất",
        icon: "👑",
      },
      {
        id: 6,
        type: "Vé Nhóm (10+ vé)",
        price: 110000,
        description: "Giảm giá khi đặt 10 vé trở lên cùng một lúc",
        icon: "👥",
      },
    ]

    // Simulate API call
    setTimeout(() => {
      setPrices(mockPrices)
      setIsLoading(false)
    }, 500)
  }, [])

  if (isLoading) {
    return (
      <div className="price-page">
        <Header />
        <main className="price-container">
          <div className="loading">Đang tải giá vé...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="price-page">
      <Header />
      <main className="price-container">
        <section className="price-section">
          <div className="section-header">
            <h2>💰 Bảng Giá Vé</h2>
          </div>
          <div className="price-grid">
            {prices.map((item) => (
              <div key={item.id} className="price-card">
                <div className="price-icon">{item.icon}</div>
                <h3 className="price-type">{item.type}</h3>
                <p className="price-description">{item.description}</p>
                <div className="price-amount">
                  <span className="currency">₫</span>
                  <span className="amount">{item.price.toLocaleString("vi-VN")}</span>
                </div>
                <button className="book-ticket-btn">Đặt Vé Ngay</button>
              </div>
            ))}
          </div>

          {/* Additional information */}
          <div className="price-info">
            <h3>Lưu Ý Quan Trọng</h3>
            <ul>
              <li>📝 Vé trẻ em và người cao tuổi cần xuất trình giấy tờ chứng minh</li>
              <li>🎟️ Vé được đặt online có thể thanh toán tại quầy hoặc online</li>
              <li>🔄 Vé có thể hoàn đổi tối đa 24 giờ trước suất chiếu</li>
              <li>💳 Chúng tôi chấp nhận tất cả các hình thức thanh toán phổ biến</li>
              <li>🎁 Khách hàng VIP được tặng bỏng ngô và nước miễn phí</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Price
