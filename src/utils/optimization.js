import * as THREE from 'three';

// Tạo và quản lý Level of Detail (LOD) cho các model
export const createLOD = (model, distances = [0, 50, 150]) => {
  const lod = new THREE.LOD();
  
  // Tạo các bản copy với độ chi tiết giảm dần
  const highDetail = model.clone();
  const mediumDetail = simplifyModel(model.clone(), 0.5); // 50% chi tiết
  const lowDetail = simplifyModel(model.clone(), 0.2); // 20% chi tiết
  
  // Thêm vào LOD với các khoảng cách tương ứng
  lod.addLevel(highDetail, distances[0]);
  lod.addLevel(mediumDetail, distances[1]);
  lod.addLevel(lowDetail, distances[2]);
  
  return lod;
};

// Giả lập việc đơn giản hóa model (trong thực tế cần được thực hiện trong modeling software)
const simplifyModel = (model, factor) => {
  // Giả lập bằng cách giảm kích thước (thực tế cần thuật toán phức tạp hơn)
  model.scale.multiplyScalar(0.99);
  return model;
};

// Thực hiện Frustum Culling
export const applyFrustumCulling = (camera, objects) => {
  // Tạo frustum từ camera
  const frustum = new THREE.Frustum();
  const matrix = new THREE.Matrix4().multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  );
  frustum.setFromProjectionMatrix(matrix);
  
  // Kiểm tra và ẩn các đối tượng ngoài frustum
  objects.forEach(object => {
    if (object.userData.boundingSphere) {
      // Nếu đã có bounding sphere
      const sphere = object.userData.boundingSphere.clone();
      sphere.applyMatrix4(object.matrixWorld);
      
      if (!frustum.intersectsSphere(sphere)) {
        object.visible = false;
      } else {
        object.visible = true;
      }
    } else {
      // Tạo bounding sphere mới
      const box = new THREE.Box3().setFromObject(object);
      const boundingSphere = box.getBoundingSphere(new THREE.Sphere());
      object.userData.boundingSphere = boundingSphere;
      
      if (!frustum.intersectsSphere(boundingSphere)) {
        object.visible = false;
      } else {
        object.visible = true;
      }
    }
  });
};

// Tiền tính toán đổ bóng (Lightmaps)
export const bakeLightmaps = (scene, renderer, dirLight) => {
  // Tạo texture để lưu lightmap
  const resolution = 1024;
  const lightMap = new THREE.WebGLRenderTarget(resolution, resolution);
  
  // Lưu trạng thái hiện tại
  const originalCameraPosition = scene.camera ? scene.camera.position.clone() : null;
  const originalBackground = scene.background;
  
  // Thiết lập scene để render lightmap
  scene.background = new THREE.Color(0x000000);
  
  // Lưu cấu hình ban đầu của renderer
  const originalRenderTarget = renderer.getRenderTarget();
  
  // Render lightmap
  renderer.setRenderTarget(lightMap);
  renderer.render(scene, new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 100));
  
  // Khôi phục trạng thái
  renderer.setRenderTarget(originalRenderTarget);
  scene.background = originalBackground;
  if (originalCameraPosition && scene.camera) {
    scene.camera.position.copy(originalCameraPosition);
  }
  
  return lightMap.texture;
};

// Theo dõi hiệu suất
export const setupPerformanceMetrics = () => {
  const stats = {
    fps: 0,
    ms: 0,
    lastTime: performance.now(),
    frames: 0
  };
  
  // Cập nhật thống kê mỗi giây
  setInterval(() => {
    const currentTime = performance.now();
    const delta = currentTime - stats.lastTime;
    
    stats.fps = Math.round((stats.frames * 1000) / delta);
    stats.ms = delta / stats.frames;
    
    stats.lastTime = currentTime;
    stats.frames = 0;
    
    console.log(`FPS: ${stats.fps} | MS: ${stats.ms.toFixed(2)}ms`);
  }, 1000);
  
  // Hàm được gọi trong animation loop
  const update = () => {
    stats.frames++;
  };
  
  return { update, stats };
};