# BÁO CÁO THỰC HÀNH TUẦN 8

## Xây dựng xác thực, phân quyền và tối ưu SEO với Next.js

### 1. Mục tiêu thực hiện

Bài thực hành nhằm xây dựng ứng dụng Next.js có chức năng xác thực người dùng, phân quyền truy cập và tối ưu SEO cho các trang công khai.

Các yêu cầu chính:

- Tích hợp NextAuth.js với ít nhất một phương thức đăng nhập OAuth và đăng nhập bằng email/mật khẩu.
- Phân quyền người dùng theo hai vai trò `user` và `admin`.
- Bảo vệ các trang và thao tác quản trị bằng nhiều lớp kiểm tra.
- Khai báo kiểu dữ liệu Session bằng TypeScript.
- Cấu hình SEO cho ít nhất hai trang công khai.
- Đánh giá chất lượng trang web bằng Lighthouse.

### 2. Công nghệ sử dụng

- **Next.js 16:** xây dựng ứng dụng web.
- **TypeScript:** kiểm tra kiểu dữ liệu và hạn chế lỗi khi phát triển.
- **NextAuth.js:** xác thực và quản lý phiên đăng nhập.
- **GitHub OAuth:** đăng nhập bằng tài khoản GitHub.
- **Credentials:** đăng nhập bằng email/mật khẩu.
- **Lighthouse:** đánh giá hiệu suất, khả năng truy cập, thực hành tốt và SEO.

### 3. Xác thực và phân quyền

Ứng dụng sử dụng NextAuth.js để xác thực người dùng bằng GitHub OAuth và phương thức email/mật khẩu. Sau khi đăng nhập, người dùng được xác định vai trò `user` hoặc `admin`.

Hệ thống triển khai ba lớp bảo vệ chính:

**Lớp 1 – Proxy (`src/proxy.ts`):**

- Kiểm tra trạng thái đăng nhập khi truy cập `/dashboard` và `/admin`.
- Nếu chưa đăng nhập, chuyển hướng đến `/login`.
- Nếu đã đăng nhập nhưng không có quyền admin khi truy cập `/admin`, chuyển hướng đến `/403`.

**Lớp 2 – Trang quản trị (`src/app/admin/page.tsx`):**

- Gọi `auth()` để lấy session ở phía server.
- Chuyển người chưa đăng nhập về `/login`.
- Chuyển người không có vai trò `admin` đến `/403`.

**Lớp 3 – Server Action (`src/app/actions.ts`):**

- Tự kiểm tra session và vai trò trước khi thực hiện thao tác.
- Không chỉ dựa vào Proxy hoặc giao diện để bảo vệ chức năng quản trị.
- Hiện tại, thao tác `runAdminMaintenance` minh họa việc kiểm tra quyền và chuyển hướng sau khi hoàn tất; chưa thực hiện cập nhật dữ liệu nghiệp vụ thực tế.

#### Sơ đồ các lớp bảo vệ

```text
                    NGƯỜI DÙNG
                         |
                         v
               NEXTAUTH.JS - XÁC THỰC
                /                 \
         GitHub OAuth        Email/Mật khẩu
                \                 /
                         |
                         v
                PROXY - src/proxy.ts
                Kiểm tra đăng nhập
                         |
               +---------+---------+
               |                   |
        Chưa đăng nhập       Đã đăng nhập
               |                   |
               v                   v
            /login          Kiểm tra vai trò
                                   |
                         +---------+---------+
                         |                   |
                        user               admin
                         |                   |
                         v                   v
                       /403           TRANG QUẢN TRỊ
                                           |
                              +------------+------------+
                              |                         |
                              v                         v
                      Kiểm tra auth()           Kiểm tra quyền
                      tại trang Admin           trong Server Action
```

### 4. Khai báo kiểu dữ liệu TypeScript

File `src/types/next-auth.d.ts` mở rộng các kiểu dữ liệu của NextAuth.js:

- `UserRole`: giới hạn vai trò ở `user` hoặc `admin`.
- `Session`: bổ sung thuộc tính `role` vào thông tin người dùng trong session.
- `User`: bổ sung thuộc tính vai trò cho đối tượng người dùng.
- `JWT`: hỗ trợ lưu thuộc tính vai trò trong token.

Việc khai báo kiểu dữ liệu giúp TypeScript kiểm tra tính nhất quán khi truy cập thông tin người dùng và vai trò.

Lệnh kiểm tra đã thực hiện:

```powershell
npx.cmd tsc --noEmit
```

**Kết quả:** Không xuất hiện lỗi TypeScript.

### 5. Tối ưu SEO

Ứng dụng cấu hình SEO cho hai trang công khai: trang chủ và trang sản phẩm.

Các nội dung đã triển khai:

- **Canonical URL:** xác định URL chuẩn của từng trang.
- **Open Graph image:** tạo ảnh đại diện khi chia sẻ trang.
- **JSON-LD:** bổ sung dữ liệu có cấu trúc để công cụ tìm kiếm hiểu nội dung.
- **Metadata:** thiết lập tiêu đề và mô tả trang.
- **Robots metadata:** hạn chế lập chỉ mục đối với các trang như đăng nhập và quản trị.

Các tệp liên quan gồm:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/products/page.tsx`
- `src/app/opengraph-image.tsx`
- `src/app/products/opengraph-image.tsx`

### 6. Kết quả kiểm thử

Các lệnh kiểm tra đã thực hiện:

```powershell
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd run build
```

**Kết quả:** Cả ba lệnh đều chạy thành công, không báo lỗi. Quá trình build hoàn tất và các trang của ứng dụng được biên dịch thành công.

### 7. Kết quả đánh giá Lighthouse

Lighthouse được chạy trên Chrome DevTools ở chế độ Desktop. Các chỉ số gồm Performance, Accessibility, Best Practices và SEO.

| Trang được đánh giá          | Performance | Accessibility | Best Practices | SEO |
| ---------------------------- | ----------: | ------------: | -------------: | --: |
| Trang chủ (`/`)              |         100 |            95 |            100 | 100 |
| Trang sản phẩm (`/products`) |          96 |            95 |            100 | 100 |

#### Nhận xét kết quả

- **Performance:** Trang chủ đạt 100/100; trang sản phẩm đạt 96/100.
- **Accessibility:** Cả hai trang đạt 95/100; vẫn có thể tiếp tục cải thiện khả năng truy cập.
- **Best Practices:** Cả hai trang đạt 100/100.
- **SEO:** Cả hai trang đạt 100/100.

**Số liệu trước tối ưu:** Chưa lưu kết quả Lighthouse của phiên bản ban đầu nên chưa có dữ liệu để so sánh định lượng trước và sau. Báo cáo chỉ trình bày kết quả đã đo được, không tự ước lượng hoặc tạo số liệu ban đầu.

### 8. Kết luận

Bài thực hành đã triển khai các chức năng xác thực bằng NextAuth.js, đăng nhập qua GitHub OAuth và email/mật khẩu, phân quyền `user`/`admin`, cùng các lớp kiểm tra tại Proxy, trang quản trị và Server Action.

Các trang công khai được cấu hình canonical URL, Open Graph image, JSON-LD và metadata phục vụ SEO. Những bước kiểm tra TypeScript, lint và build đều hoàn thành thành công.

Kết quả Lighthouse cho thấy hai trang được đánh giá có điểm SEO và Best Practices đạt 100/100. Trang chủ đạt Performance 100/100, trang sản phẩm đạt 96/100.
