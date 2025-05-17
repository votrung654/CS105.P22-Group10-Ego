import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ isLoading, loadingProgress }) => {
  const [fadeOut, setFadeOut] = useState(false);
  
  useEffect(() => {
    if (!isLoading && loadingProgress >= 100) {
      setFadeOut(true);
      
      // Xóa loading screen sau khi hoàn tất animation
      const timer = setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
          loadingScreen.style.display = 'none';
        }
      }, 1000); // 1 giây, khớp với thời gian transition trong CSS
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, loadingProgress]);
  
  if (!isLoading && loadingProgress >= 100 && fadeOut) {
    return null;
  }
  
  return (
    <div id="loading-screen" className={fadeOut ? 'fade-out' : ''}>
      <div className="loading-container">
        <h2>Đang tải bảo tàng 3D...</h2>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <p>{Math.round(loadingProgress)}%</p>
        <div className="loading-tips">
          <p>Mẹo: Sử dụng chuột để xoay và phóng to hiện vật.</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;