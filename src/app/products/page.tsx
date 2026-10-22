import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description:
    "Khám phá danh sách sản phẩm công nghệ tại TechStore: tai nghe, bàn phím và chuột không dây.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Sản phẩm công nghệ | TechStore",
    description:
      "Khám phá các thiết bị công nghệ dành cho học tập và làm việc.",
    url: "/products",
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
    moTa: "Tai nghe không dây tiện lợi cho học tập và giải trí.",
    bieuTuong: "🎧",
  },
  {
    id: 2,
    ten: "Bàn phím cơ",
    danhMuc: "Thiết bị máy tính",
    gia: 890000,
    moTa: "Bàn phím cơ phù hợp cho lập trình và làm việc.",
    bieuTuong: "⌨️",
  },
  {
    id: 3,
    ten: "Chuột không dây",
    danhMuc: "Phụ kiện",
    gia: 350000,
    moTa: "Chuột không dây nhỏ gọn, dễ sử dụng.",
    bieuTuong: "🖱️",
  },
];

export default function ProductsPage() {
  const duLieuCoCauTruc = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Danh sách sản phẩm TechStore",
    numberOfItems: sanPham.length,
    itemListElement: sanPham.map((sp, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: sp.ten,
        description: sp.moTa,
        category: sp.danhMuc,
        offers: {
          "@type": "Offer",
          price: sp.gia,
          priceCurrency: "VND",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(duLieuCoCauTruc).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-6xl">
        <Link href="/" className="font-semibold text-orange-600">
          ← Trang chủ
        </Link>

        <h1 className="mt-6 text-4xl font-bold">
          Danh sách sản phẩm
        </h1>

        <p className="mt-3 text-gray-600">
          Khám phá các thiết bị công nghệ tại TechStore.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sanPham.map((sp) => (
            <article
              key={sp.id}
              className="overflow-hidden rounded-2xl border bg-white"
            >
              <div className="flex h-44 items-center justify-center bg-orange-100 text-7xl">
                {sp.bieuTuong}
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-500">{sp.danhMuc}</p>
                <h2 className="mt-2 text-xl font-bold">{sp.ten}</h2>
                <p className="mt-3 text-sm text-gray-600">{sp.moTa}</p>

                <p className="mt-4 text-lg font-bold text-orange-600">
                  {sp.gia.toLocaleString("vi-VN")} ₫
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
