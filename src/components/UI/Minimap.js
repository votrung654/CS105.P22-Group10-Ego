import React, { useEffect, useRef } from 'react';
import './Minimap.css';

const Minimap = ({ mapData, playerPosition }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Kiểm tra xem mapData có tồn tại không trước khi sử dụng .map()
    if (mapData && Array.isArray(mapData)) {
      mapData.map(item => {
        // Vẽ các phần tử bản đồ
        ctx.fillStyle = item.color || '#444';
        ctx.fillRect(item.x, item.y, item.width, item.height);
      });
    } else {
      // Nếu không có dữ liệu bản đồ, vẽ một bản đồ mẫu đơn giản
      ctx.fillStyle = '#444';
      ctx.fillRect(10, 10, 180, 180);
    }
    
    // Vẽ vị trí người chơi nếu có
    if (playerPosition) {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(playerPosition.x, playerPosition.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [mapData, playerPosition]);

  return (
    <div className="minimap-container">
      <canvas 
        ref={canvasRef} 
        className="minimap-canvas"
        width="200" 
        height="200"
      />
    </div>
  );
};

export default Minimap;