import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cửa hàng công nghệ",
  description:
    "Khám phá tai nghe không dây, bàn phím cơ và chuột không dây tại TechStore.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TechStore - Cửa hàng công nghệ",
    description:
      "Khám phá các sản phẩm công nghệ dành cho học tập và làm việc.",
    url: "/",
    siteName: "TechStore",
    locale: "vi_VN",
    type: "website",
  },
};

const sanPham = [
  {
    id: 1,
    ten: "Tai nghe không dây",
    danhMuc: "Phụ kiện",
    gia: 590000,
    bieuTuong: "🎧",
    mau: "bg-orange-100",
  },
  {
    id: 2,
    ten: "Bàn phím cơ",
    danhMuc: "Thiết bị máy tính",
    gia: 890000,
    bieuTuong: "⌨️",
    mau: "bg-blue-100",
  },
  {
    id: 3,
    ten: "Chuột không dây",
    danhMuc: "Phụ kiện",
    gia: 350000,
    bieuTuong: "🖱️",
    mau: "bg-purple-100",
  },
];

export default function TrangChu() {
  const duLieuCoCauTruc = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "TechStore",
    description:
      "Cửa hàng sản phẩm công nghệ phục vụ học tập và làm việc.",
    url: "http://localhost:3000/",
    priceRange: "₫₫",
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(duLieuCoCauTruc).replace(/</g, "\\u003c"),
        }}
      />

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold text-orange-600">
            TechStore
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-orange-600">
              Trang chủ
            </Link>
            <Link href="/products" className="hover:text-orange-600">
              Sản phẩm
            </Link>
            <Link href="/login" className="hover:text-orange-600">
              Đăng nhập
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl bg-orange-600 px-8 py-14 text-white md:px-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest">
            Website quản lý sản phẩm
          </p>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
            Khám phá công nghệ dành cho bạn
          </h1>

          <p className="mt-5 max-w-xl text-orange-50">
            Khám phá các thiết bị công nghệ chất lượng với thông tin sản phẩm
            rõ ràng và trải nghiệm mua sắm đơn giản.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-orange-700 hover:bg-orange-50"
          >
            Xem sản phẩm
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-orange-600">
              SẢN PHẨM NỔI BẬT
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              Khám phá sản phẩm
            </h2>
          </div>

          <Link
            href="/products"
            className="text-sm font-semibold text-orange-600 hover:underline"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sanPham.map((sp) => (
            <article
              key={sp.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`flex h-48 items-center justify-center text-7xl ${sp.mau}`}
              >
                {sp.bieuTuong}
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-500">{sp.danhMuc}</p>
                <h3 className="mt-2 text-xl font-bold">{sp.ten}</h3>

                <p className="mt-3 text-lg font-bold text-orange-600">
                  {sp.gia.toLocaleString("vi-VN")} ₫
                </p>

                <Link
                  href="/products"
                  className="mt-5 block rounded-xl border border-orange-600 py-3 text-center font-semibold text-orange-600 hover:bg-orange-50"
                >
                  Xem chi tiết
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-gray-500">
          © 2026 TechStore — Bài tập Lập trình Web nâng cao
        </div>
      </footer>
    </main>
  );
}
