# CS105.P22-Group10-Ego

## 1. Tổng quan

Dự án 3D Museum Web tạo ra trải nghiệm bảo tàng ảo tương tác sử dụng Three.js và React. Người dùng có thể tham quan bảo tàng ảo theo cách nhìn góc nhìn thứ nhất, tương tác với các hiện vật và khám phá thông tin chi tiết về chúng.

## 2. Yêu cầu trước khi cài đặt

- Node.js (v14 hoặc cao hơn)
- npm (thường được cài đặt kèm Node.js)
- Trình duyệt web hiện đại hỗ trợ WebGL (Chrome, Firefox, Edge, Safari)

## 3. Cài đặt

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Cài đặt các dependencies:**
   ```bash
   npm install
   ```

3. **Kiểm tra cấu trúc thư mục:**
   Đảm bảo tất cả các thư mục assets đã được tạo, nếu chưa, hãy tạo chúng:
   ```bash
   mkdir -p src/assets/models/artifacts src/assets/models/environment src/assets/textures src/assets/audio src/assets/images
   ```

## 4. Chạy dự án

1. **Khởi động server development:**
   ```bash
   npm start
   ```

2. **Truy cập ứng dụng:**
   Ứng dụng sẽ chạy ở địa chỉ [http://localhost:9000](http://localhost:9000)

3. **Build phiên bản production:**
   ```bash
   npm run build
   ```
   Các file được build sẽ được đặt trong thư mục `dist/`

## 5. Hướng dẫn sử dụng

### Điều khiển cơ bản
- **Di chuyển**: Sử dụng phím W, A, S, D hoặc các phím mũi tên
- **Nhìn xung quanh**: Di chuyển chuột
- **Tương tác với hiện vật**: Click chuột vào hiện vật
- **Mở/đóng menu trợ giúp**: Nhấn phím H
- **Thoát chế độ di chuyển**: Nhấn ESC

### Các chức năng chính
- **Tham quan bảo tàng**: Di chuyển tự do trong không gian bảo tàng
- **Xem chi tiết hiện vật**: Click vào hiện vật để xem thông tin chi tiết
- **Nghe thông tin**: Nhấn nút "Nghe thông tin" để nghe mô tả về hiện vật
- **Bản đồ thu nhỏ**: Hiển thị vị trí của bạn trong bảo tàng
- **Menu trợ giúp**: Cung cấp thông tin về cách điều khiển và tương tác

## 6. Cấu trúc dự án

```
3d-museum-web/
├── docs/                    # Tài liệu dự án
├── public/                  # Static files
├── src/
│   ├── assets/              # Tài nguyên (models, textures, audio, images)
│   ├── components/
│   │   ├── Museum/          # Components liên quan đến môi trường bảo tàng
│   │   └── UI/              # Components giao diện người dùng
│   ├── controllers/         # Các controllers xử lý logic
│   ├── data/                # Dữ liệu (artifacts.js)
│   ├── services/            # Các service xử lý dữ liệu và logic nghiệp vụ
│   ├── utils/               # Các hàm tiện ích
│   ├── app.js               # Component chính
│   ├── index.html           # HTML template
│   └── styles.css           # Global CSS
├── webpack.config.js        # Cấu hình webpack
└── package.json             # Dependencies và scripts
```

## 7. Hướng dẫn phát triển cho nhóm

### Thành viên 1: Lead Developer & Three.js Expert
- Tập trung vào Scene.js, CameraController.js, và optimization.js
- Đảm bảo hiệu suất tốt và xử lý va chạm đúng

### Thành viên 2: UI & Interaction Developer
- Phát triển các components UI và tương tác
- Đảm bảo trải nghiệm người dùng tốt trên mọi thiết bị

### Thành viên 3: Assets & 3D Models Developer
- Tạo và tối ưu models 3D, textures, và âm thanh
- Triển khai hệ thống ánh sáng trong Lighting.js

### Thành viên 4: Project Manager & System Integration
- Quản lý và tích hợp công việc của các thành viên
- Đảm bảo dự án chạy trơn tru và đạt được mục tiêu

## 8. Quy trình thêm hiện vật mới

1. Thêm model 3D vào thư mục artifacts
2. Thêm thông tin hiện vật trong artifacts.js
3. Đảm bảo thêm hình ảnh vào images (nếu có)
4. Đảm bảo thêm file âm thanh vào audio (nếu có)

## 9. Giải quyết các vấn đề thường gặp

### Models không hiển thị
- Kiểm tra đường dẫn đến file model trong artifacts.js
- Kiểm tra xem model có định dạng GLTF/GLB hợp lệ không
- Kiểm tra console để xem lỗi cụ thể

### Vấn đề về hiệu suất
- Kiểm tra kích thước các models (nên tối ưu dưới 5MB)
- Kích hoạt Level of Detail (LOD) và Frustum Culling
- Giảm độ phức tạp của ánh sáng

### Lỗi khi build
- Kiểm tra đường dẫn import đúng format
- Cài đặt lại các dependencies (`npm install`)
- Xóa thư mục `node_modules` và package-lock.json rồi cài đặt lại

## 10. Các lệnh npm hữu ích

```bash
npm start           # Chạy server development
npm run build       # Build phiên bản production
npm test            # Chạy tests
npm run lint        # Kiểm tra lỗi code
```

---

Nếu có bất kỳ câu hỏi hoặc gặp vấn đề nào, vui lòng tạo issue trong repository GitHub hoặc liên hệ với team đã được phân công trong file TEAM_ROLES.md.

## License
MIT
