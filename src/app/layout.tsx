import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "TechStore - Cửa hàng công nghệ",
    template: "%s | TechStore",
  },
  description:
    "Khám phá các sản phẩm công nghệ tại TechStore. Thông tin sản phẩm rõ ràng, trải nghiệm đơn giản.",
  applicationName: "TechStore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
