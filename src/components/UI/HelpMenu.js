import React from 'react';
import './HelpMenu.css';

const HelpMenu = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  
  return (
    <div className="help-menu">
      <div className="help-menu-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Hướng dẫn sử dụng</h2>
        
        <div className="help-section">
          <h3>Di chuyển</h3>
          <p>
            <span className="key">W</span>
            <span className="key">A</span>
            <span className="key">S</span>
            <span className="key">D</span> 
            hoặc 
            <span className="key">↑</span>
            <span className="key">←</span>
            <span className="key">↓</span>
            <span className="key">→</span>: Di chuyển
          </p>
          <p>Di chuyển <strong>chuột</strong>: Nhìn xung quanh</p>
          <p><strong>Chuột trái</strong>: Tương tác với hiện vật</p>
        </div>
        
        <div className="help-section">
          <h3>Tương tác với hiện vật</h3>
          <p>Di chuột lên hiện vật và nhấp để xem thông tin chi tiết</p>
          <p>Trong chế độ xem hiện vật, bạn có thể:</p>
          <ul>
            <li>Xoay quanh hiện vật để xem từ nhiều góc độ</li>
            <li>Phóng to/thu nhỏ bằng cuộn chuột</li>
            <li>Nghe thông tin bằng cách nhấn vào nút "Nghe thông tin"</li>
          </ul>
        </div>
        
        <div className="help-section">
          <h3>Giao diện</h3>
          <p>Bản đồ thu nhỏ ở góc màn hình giúp xác định vị trí của bạn</p>
          <p>Nhấn phím <span className="key">ESC</span> để thoát chế độ di chuyển</p>
          <p>Nhấn phím <span className="key">H</span> để mở/đóng menu trợ giúp này</p>
        </div>
      </div>
    </div>
  );
};

export default HelpMenu;