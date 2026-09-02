# AGENTS.md - Quy Tắc & Kim Chỉ Nam Cho Dự Án "Nhật Minh Bé Ngoan"

Tài liệu này định hình tư duy thiết kế, nguyên tắc code và tiêu chuẩn kỹ thuật cho toàn bộ dự án web game giáo dục sớm dành cho bé **Nhật Minh**.

---

## 1. Bối Cảnh Dự Án & Người Dùng Mục Tiêu

- **Người dùng chính:** Bé Nhật Minh (sinh 01/04/2024, ~2.5 tuổi).
- **Sở thích của bé:** Khám phá thế giới thực, xe cộ (ô tô, xe cứu hỏa, tàu hỏa...), con vật (chó, mèo, sư tử, khủng long...), máy móc (máy xúc, cần cẩu...), âm thanh thiên nhiên.
- **Mục tiêu giáo dục:**
  1. Thay thế nội dung xem thụ động trên YouTube/Tiktok bằng **tương tác 2 chiều chủ động**.
  2. Rèn luyện phản xạ nhân - quả (*"Chạm vào xe -> Xe nổ máy chạy -> Còi kêu Bim Bim"*).
  3. Mở rộng vốn từ vựng tiếng Việt (kèm tiếng Anh) và rèn luyện vận động tinh (Fine Motor Skills).

---

## 2. Bốn Nguyên Tắc Cốt Lõi (Kế thừa từ Andrej Karpathy Framework)

### Nguyên Tắc 1: Think Before Coding (Thấu hiểu & Trao đổi trước khi code)
- **Hỏi rõ trước khi làm:** Khi nhận yêu cầu mới, nếu có sự mơ hồ về trải nghiệm của bé hoặc mặt kỹ thuật, AI phải làm rõ và nêu giải pháp/đánh đổi thay vì tự đoán ngầm.
- **Đồng hành cùng Ba Mẹ:** Giải thích giải pháp một cách trực quan, dễ hiểu, tập trung vào giá trị mang lại cho bé Nhật Minh.

### Nguyên Tắc 2: Simplicity First (Đơn giản là sức mạnh tối thượng)
- **Tập trung đúng yêu cầu:** Không tự ý thêm tính năng rườm rà, menu điều hướng phức tạp, hoặc hệ số điểm số/phạt.
- **Quy tắc cho bé 2.5 tuổi:**
  - Không có màn hình "Game Over" hay thua cuộc. Mọi tương tác đều mang tính khích lệ, vui vẻ.
  - Nút bấm và vùng chạm **siêu to (Big Touch Targets ≥ 80px - 120px)**.
  - Hiệu ứng âm thanh và hoạt ảnh phản hồi **ngay lập tức** (< 50ms).

### Nguyên Tắc 3: Touch Only What You Must (Thay đổi tinh gọn, chính xác)
- **Bảo toàn tính ổn định:** Chỉ chỉnh sửa đúng file và module liên quan đến tính năng đang làm.
- **Không phá vỡ cái cũ:** Giữ cấu trúc dự án sạch sẽ, gọn gàng, chia nhỏ components để dễ bảo trì.

### Nguyên Tắc 4: Goal-Driven Execution & Deployment Ready (Thực thi chuẩn chỉ cho Tenten.vn)
- **Tương thích hoàn hảo với Hosting Tenten.vn:**
  - Build chuẩn static Vite/SPA hoặc Node.js server độc lập không phụ thuộc môi trường bên ngoài.
  - Không dùng các thư viện cồng kềnh, ưu tiên Web Audio API và Web Speech API bản địa của trình duyệt để chạy siêu nhẹ, không phụ thuộc mạng.
- **Kiểm tra trước khi bàn giao:** Mọi lần cập nhật code đều phải đảm bảo `npm run build` thành công, không có lỗi TypeScript hay cú pháp.

---

## 3. Tiêu Chuẩn Thiết Kế UX/UI Cho Bé (Toddler-Friendly Guidelines)

1. **Âm thanh chân thực:** Tiếng động cơ xe thật, tiếng còi xe, tiếng kêu động vật rõ ràng, giọng đọc tiếng Việt ấm áp/vui tươi. Âm thanh hiệu ứng giới hạn tối đa 1.8s có fade-out.
2. **Khóa thao tác ngoài ý muốn:**
   - Hỗ trợ `touch-action: manipulation` (chặn phóng to đúp màn hình).
   - Chặn kéo thả trang vô tình (prevent pull-to-refresh).
   - Nút cài đặt dành cho Bố/Mẹ (Parental Gate - ví dụ: giữ 1.5 - 3 giây hoặc giải phép tính đơn giản).
3. **Màu sắc & Hình ảnh:**
   - Tone màu tươi sáng, tương phản cao, hình minh họa rõ nét, thân thiện và đáng yêu.

---

## 4. Kiến Trúc Đa Trò Chơi & Quản Lý Tài Nguyên Dùng Chung (Multi-Game Scalability)

1. **Kho Dữ Liệu & Assets Tập Trung (Single Source of Truth):**
   - Mọi hình ảnh (emoji/SVG/ảnh), từ điển từ vựng (Tiếng Việt - English), và âm thanh thực tế (`/public/sounds/`) được quản lý tập trung tại `/src/data/gameData.ts` & `/src/utils/audio.ts`.
   - Các mini-game sau này (ví dụ: *Nối hình con vật, Tìm bóng xe cộ, Đua xe vượt chướng ngại vật...*) sẽ tái sử dụng trực tiếp các modules dữ liệu này, **tuyệt đối không duplicate file hoặc copy paste dữ liệu rải rác**.
2. **Kiến Trúc Điều Hướng Thân Thiện Với Bé:**
   - Luồng khởi động: Màn hình chào mừng / Chọn trò chơi kute -> Điền tên bé (có avatar đáng yêu, lưu tên bé vào `localStorage`) -> Nút to bấm vào chơi ngay.
   - Luôn có nút "Về Menu chọn game" (Home button) to rõ, kèm xác thực nhẹ cho bố mẹ để bé không bấm nhầm thoát game lúc đang chơi vui vẻ.
