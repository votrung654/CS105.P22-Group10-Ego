
## Thành Viên 1: Lead Developer & Three.js Expert

**Trách nhiệm chính:**
- Phụ trách các file chính liên quan đến Three.js và cơ sở hạ tầng 3D

**Công việc cụ thể:**
1. Hoàn thiện [Scene.js](d:/Downloads/CS105_project/3d-museum-web/src/components/Museum/Scene.js):
   - Tích hợp PointerLockControls cho di chuyển kiểu FPS
   - Cài đặt hệ thống phát hiện va chạm với tường/vật thể
   - Tối ưu render pipeline

2. Hoàn thiện [CameraController.js](d:/Downloads/CS105_project/3d-museum-web/src/controllers/CameraController.js):
   - Chuyển đổi giữa FPS mode và xem chi tiết hiện vật
   - Xử lý các giới hạn chuyển động camera

3. Triển khai [utils/optimization.js](d:/Downloads/CS105_project/3d-museum-web/src/utils/optimization.js):
   - Cài đặt Level of Detail (LOD)
   - Cài đặt Frustum Culling
   - Baking lightmaps

4. Tìm kiếm/tạo model 3D cho không gian bảo tàng cơ bản
- Cần đảm bảo rằng các đường dẫn import cho GLTFLoader, OrbitControls, và các class khác đều được chỉ định chính xác
- Tạo các file placeholder cho tài nguyên 3D để các thành viên khác có thể test mà không gặp lỗi loading
5. Giúp đỡ team debug các vấn đề liên quan đến Three.js
- Kiểm tra và sửa tất cả các import liên quan đến Three.js - đặc biệt là các loader và control từ thư mục examples

## Thành Viên 2: UI & Interaction Developer

**Trách nhiệm chính:**
- Phụ trách giao diện người dùng và tương tác

**Công việc cụ thể:**
1. Hoàn thiện [InteractionController.js](d:/Downloads/CS105_project/3d-museum-web/src/controllers/InteractionController.js):
   - Cài đặt hệ thống Raycasting để phát hiện click vào hiện vật
   - Kết nối thông tin hiện vật với InfoPanel

2. Hoàn thiện các component UI:
   - Cập nhật [InfoPanel.js](d:/Downloads/CS105_project/3d-museum-web/src/components/UI/InfoPanel.js) để hiển thị thông tin chi tiết
   - Tối ưu [Minimap.js](d:/Downloads/CS105_project/3d-museum-web/src/components/UI/Minimap.js) để hiển thị vị trí người dùng chính xác
   - Phát triển thêm component cho loading screen

3. Tạo CSS và styling cho UI:
   - Hoàn thiện [styles.css](d:/Downloads/CS105_project/3d-museum-web/src/styles.css)
   - Tạo responsive design cho các màn hình khác nhau

4. Cài đặt [speechService.js](d:/Downloads/CS105_project/3d-museum-web/src/services/speechService.js):
   - Tích hợp Speech Synthesis API để đọc thông tin hiện vật
5. Sau cùng:
- Đảm bảo rằng các component UI có thể hoạt động ngay cả khi không có model 3D (graceful degradation)
- Thêm trạng thái loading và error handling cho UI

## Thành Viên 3: Assets & 3D Models Developer

**Trách nhiệm chính:**
- Phụ trách tất cả assets 3D và multimedia

**Công việc cụ thể:**
1. Tạo/tìm kiếm models 3D cho hiện vật:
   - Tối thiểu 5-10 hiện vật chi tiết
   - Tối ưu các model (giảm polygon count)
   - Xuất models sang định dạng GLTF/GLB

2. Hoàn thiện [Lighting.js](d:/Downloads/CS105_project/3d-museum-web/src/components/Museum/Lighting.js):
   - Thiết lập hệ thống ánh sáng hợp lý cho bảo tàng
   - Tạo spotlight cho các hiện vật quan trọng
   - Cài đặt đổ bóng chất lượng cao

3. Hoàn thiện [loaders.js](d:/Downloads/CS105_project/3d-museum-web/src/utils/loaders.js):
   - Cài đặt lazy loading cho assets 3D
   - Thêm progress bar khi tải models lớn

4. Hoàn thiện [AudioController.js](d:/Downloads/CS105_project/3d-museum-web/src/controllers/AudioController.js):
   - Tạo/tìm kiếm âm thanh nền cho bảo tàng
   - Thêm hiệu ứng âm thanh khi tương tác với hiện vật

5. Chuẩn bị thông tin chi tiết (nội dung) về mỗi hiện vật
- Ưu tiên tạo một số model và texture mẫu trước để test
- Đảm bảo các model tương thích với Three.js phiên bản hiện tại
- Tạo file artifacts.js trong src/data nếu chưa có
## Thành Viên 4: Project Manager & System Integration

**Trách nhiệm chính:**
- Quản lý dự án, tích hợp hệ thống và testing

**Công việc cụ thể:**
1. Hoàn thiện [app.js](d:/Downloads/CS105_project/3d-museum-web/src/app.js):
   - Tích hợp các components từ team members
   - Xử lý state management (có thể dùng Context API)
   - Tối ưu performance

2. Hoàn thiện [artifactService.js](d:/Downloads/CS105_project/3d-museum-web/src/services/artifactService.js):
   - Tạo mock data hoặc API thật cho thông tin hiện vật
   - Xây dựng hệ thống quản lý thông tin hiện vật

3. Cập nhật [webpack.config.js](d:/Downloads/CS105_project/3d-museum-web/webpack.config.js):
   - Tối ưu build process
   - Thêm asset optimization

4. Kiểm tra và tối ưu package.json:
   - Cập nhật dependencies nếu cần
   - Thêm các script hữu ích cho development

5. Testing toàn diện:
   - Kiểm tra compatibility trên các trình duyệt
   - Kiểm tra performance
   - Tìm và fix bugs

6. Cập nhật documentation:
   - Cập nhật [TEAM_ROLES.md](d:/Downloads/CS105_project/3d-museum-web/docs/TEAM_ROLES.md)
   - Cập nhật [ARCHITECTURE.md](d:/Downloads/CS105_project/3d-museum-web/docs/ARCHITECTURE.md)
   - Cập nhật [SETUP.md](d:/Downloads/CS105_project/3d-museum-web/docs/SETUP.md)

7. Cập nhật package.json để thêm các dependency cần thiết:
- Tạo các file mẫu và placeholder cho các service còn thiếu
- Cập nhật tài liệu dự án để làm rõ các yêu cầu phụ thuộc
## Những file cần tạo thêm (cả nhóm xem xét và bổ sung chung):

1. **src/data/artifacts.js** - Chứa dữ liệu mẫu về các hiện vật
2. **src/components/Museum/Environment.js** - Quản lý cấu trúc môi trường bảo tàng
3. **src/components/UI/LoadingScreen.js** - Component cho màn hình loading
4. **src/components/UI/HelpMenu.js** - Menu trợ giúp cho người dùng
5. **src/utils/collision.js** - Xử lý va chạm trong bảo tàng
6. **src/controllers/AnimationController.js** - Quản lý animation cho hiện vật
7. Mở rộng số phòng bảo tàng (báo cáo tiến độ chỉ cần có 1 phòng là được, báo cáo đồ án tối đa 4 phòng, ít nhất 2 phòng)