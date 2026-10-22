import { ImageResponse } from "next/og";

export const alt = "Danh sách sản phẩm TechStore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fff7ed",
          color: "#9a3412",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700 }}>TECHSTORE</div>
        <div style={{ fontSize: 66, fontWeight: 800, marginTop: 28 }}>
          Sản phẩm công nghệ
        </div>
        <div style={{ fontSize: 30, marginTop: 24 }}>
          Tai nghe · Bàn phím · Chuột không dây
        </div>
      </div>
    ),
    size,
  );
}

