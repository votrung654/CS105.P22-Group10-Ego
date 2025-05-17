import * as THREE from 'three';

// Kiểm tra va chạm giữa người dùng và các đối tượng trong bảo tàng
export const checkCollision = (position, objects, radius = 0.5) => {
  // Tạo ray từ vị trí hiện tại của camera
  const raycaster = new THREE.Raycaster();
  
  // Kiểm tra các hướng (trước, sau, trái, phải)
  const directions = [
    new THREE.Vector3(0, 0, 1),  // trước
    new THREE.Vector3(0, 0, -1), // sau
    new THREE.Vector3(-1, 0, 0), // trái
    new THREE.Vector3(1, 0, 0),  // phải
  ];
  
  for (let i = 0; i < directions.length; i++) {
    raycaster.set(position, directions[i]);
    const intersects = raycaster.intersectObjects(objects);
    
    if (intersects.length > 0 && intersects[0].distance < radius) {
      return {
        collision: true,
        distance: intersects[0].distance,
        direction: directions[i]
      };
    }
  }
  
  return { collision: false };
};

// Xử lý phản ứng va chạm
export const handleCollision = (position, collisionResult) => {
  if (collisionResult.collision) {
    // Tính toán vector đẩy lùi
    const pushBack = collisionResult.direction.clone().multiplyScalar(
      -(0.5 - collisionResult.distance)
    );
    
    // Áp dụng vector đẩy lùi vào vị trí
    position.add(pushBack);
  }
  
  return position;
};