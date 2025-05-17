// Dữ liệu mẫu về các hiện vật trong bảo tàng

const artifacts = [
    {
      id: 1,
      name: "Trống đồng Đông Sơn",
      description: "Trống đồng Đông Sơn là một hiện vật khảo cổ tiêu biểu của nền văn minh Đông Sơn, có niên đại từ khoảng 600 năm trước Công nguyên đến thế kỷ thứ 3 sau Công nguyên. Trống đồng là vật dụng được dùng trong các nghi lễ tôn giáo và sự kiện quan trọng của người Việt cổ.",
      modelPath: "/assets/models/artifacts/dong_son_drum.glb",
      imageUrl: "/assets/images/dong_son_drum.jpg",
      year: "600 TCN - 300 SCN",
      origin: "Văn hóa Đông Sơn, Việt Nam",
      dimensions: "Đường kính: 60-80cm, Cao: 40-60cm",
      materials: "Đồng, thiếc",
      audioGuide: "/assets/audio/dong_son_drum.mp3",
      position: { x: -10, y: 1.5, z: -10 }
    },
    {
      id: 2,
      name: "Tượng Phật Amitabha",
      description: "Tượng Phật A Di Đà (Amitabha) là một kiệt tác điêu khắc Phật giáo từ thời Lý (thế kỷ 11-13). Tượng được chạm khắc tinh xảo từ gỗ và được sơn son thếp vàng, thể hiện kỹ thuật điêu khắc đỉnh cao của nghệ nhân Việt Nam thời bấy giờ.",
      modelPath: "/assets/models/artifacts/amitabha_statue.glb",
      imageUrl: "/assets/images/amitabha_statue.jpg",
      year: "Thế kỷ 12",
      origin: "Triều Lý, Việt Nam",
      dimensions: "Cao: 120cm, Rộng: 60cm",
      materials: "Gỗ, sơn, vàng lá",
      audioGuide: "/assets/audio/amitabha_statue.mp3",
      position: { x: -10, y: 1.5, z: 0 }
    },
    {
      id: 3,
      name: "Bình gốm Bát Tràng",
      description: "Bình gốm Bát Tràng là sản phẩm tiêu biểu của làng nghề gốm sứ Bát Tràng, một làng nghề truyền thống có lịch sử hơn 700 năm ở Việt Nam. Bình được trang trí bằng họa tiết rồng phượng cùng hoa văn dân gian đặc trưng, phản ánh kỹ thuật tráng men và vẽ tay điêu luyện.",
      modelPath: "/assets/models/artifacts/bat_trang_vase.glb",
      imageUrl: "/assets/images/bat_trang_vase.jpg",
      year: "Thế kỷ 18",
      origin: "Bát Tràng, Việt Nam",
      dimensions: "Cao: 50cm, Đường kính: 30cm",
      materials: "Gốm sứ, men",
      audioGuide: "/assets/audio/bat_trang_vase.mp3",
      position: { x: -10, y: 1.5, z: 10 }
    },
    {
      id: 4,
      name: "Gươm báu Thăng Long",
      description: "Gươm báu Thăng Long, theo truyền thuyết, là thanh gươm thần mà vua Lê Lợi đã sử dụng để đánh đuổi quân Minh vào thế kỷ 15. Thanh gươm này được cho là do Rùa vàng ở Hồ Hoàn Kiếm trao tặng và sau đó lấy lại sau khi cuộc kháng chiến kết thúc.",
      modelPath: "/assets/models/artifacts/thang_long_sword.glb",
      imageUrl: "/assets/images/thang_long_sword.jpg",
      year: "Thế kỷ 15",
      origin: "Việt Nam",
      dimensions: "Dài: 80cm, Rộng: 5cm",
      materials: "Thép, vàng, ngọc",
      audioGuide: "/assets/audio/thang_long_sword.mp3",
      position: { x: 0, y: 1.5, z: -10 }
    },
    {
      id: 5,
      name: "Nón lá Việt Nam",
      description: "Nón lá là một biểu tượng văn hóa và là vật dụng truyền thống gắn liền với người dân Việt Nam. Được làm từ lá cọ và tre, nón lá không chỉ là vật dụng thực tiễn để che nắng mưa mà còn là một phần không thể thiếu trong trang phục dân tộc, đặc biệt là áo dài.",
      modelPath: "/assets/models/artifacts/vietnamese_hat.glb",
      imageUrl: "/assets/images/vietnamese_hat.jpg",
      year: "Văn hóa truyền thống",
      origin: "Việt Nam",
      dimensions: "Đường kính: 40-50cm",
      materials: "Lá cọ, tre, sợi",
      audioGuide: "/assets/audio/vietnamese_hat.mp3",
      position: { x: 0, y: 1.5, z: 10 }
    },
    {
      id: 6,
      name: "Tranh Đông Hồ",
      description: "Tranh Đông Hồ là một loại hình tranh dân gian truyền thống của Việt Nam, được làm tại làng Đông Hồ, Bắc Ninh. Tranh được in bằng kỹ thuật khắc gỗ truyền thống, sử dụng giấy điệp và màu tự nhiên. Nổi tiếng với các chủ đề dân gian như 'Đám cưới chuột', 'Vinh quy bái tổ', tranh Đông Hồ mang đậm tính văn hóa và triết lý dân gian Việt Nam.",
      modelPath: "/assets/models/artifacts/dong_ho_painting.glb",
      imageUrl: "/assets/images/dong_ho_painting.jpg",
      year: "Thế kỷ 16-20",
      origin: "Làng Đông Hồ, Bắc Ninh, Việt Nam",
      dimensions: "30x40cm",
      materials: "Giấy điệp, màu tự nhiên",
      audioGuide: "/assets/audio/dong_ho_painting.mp3",
      position: { x: 10, y: 1.5, z: -10 }
    },
    {
      id: 7,
      name: "Bộ trang phục triều Nguyễn",
      description: "Bộ trang phục hoàng gia của triều Nguyễn (1802-1945), triều đại phong kiến cuối cùng của Việt Nam. Bộ trang phục này bao gồm áo long bào, mũ miện và các phụ kiện khác, được thêu thùa tinh xảo với các biểu tượng quyền lực như rồng, phượng, và các hoa văn cung đình.",
      modelPath: "/assets/models/artifacts/nguyen_dynasty_costume.glb",
      imageUrl: "/assets/images/nguyen_dynasty_costume.jpg",
      year: "Đầu thế kỷ 19",
      origin: "Triều Nguyễn, Huế, Việt Nam",
      dimensions: "Áo dài: 140cm",
      materials: "Lụa, chỉ vàng, ngọc",
      audioGuide: "/assets/audio/nguyen_dynasty_costume.mp3",
      position: { x: 10, y: 1.5, z: 0 }
    },
    {
      id: 8,
      name: "Đàn T'rưng",
      description: "Đàn T'rưng là nhạc cụ truyền thống của người Việt, đặc biệt phổ biến trong cộng đồng các dân tộc ở Tây Nguyên. Được làm từ các ống tre có chiều dài khác nhau, đàn T'rưng tạo ra âm thanh trong trẻo và độc đáo. Nhạc cụ này thường được sử dụng trong các dịp lễ hội và biểu diễn văn nghệ dân gian.",
      modelPath: "/assets/models/artifacts/trung_instrument.glb",
      imageUrl: "/assets/images/trung_instrument.jpg",
      year: "Văn hóa truyền thống",
      origin: "Tây Nguyên, Việt Nam",
      dimensions: "Dài: 100cm, Rộng: 50cm",
      materials: "Tre, gỗ",
      audioGuide: "/assets/audio/trung_instrument.mp3",
      position: { x: 10, y: 1.5, z: 10 }
    }
  ];
  
  export default artifacts;