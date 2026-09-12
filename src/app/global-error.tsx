"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="vi">
      <body style={{ fontFamily: "sans-serif", margin: 0, padding: 24, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f8fafc", color: "#0f172a" }}>
        <div style={{ maxWidth: 480, textAlign: "center", background: "#ffffff", padding: 32, borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: "#dc2626" }}>Lỗi Ứng Dụng</h2>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.5, marginBottom: 24 }}>
            Đã xảy ra lỗi tải trang tổng thể. Hãy nhấn nút bên dưới để khởi động lại phiên làm việc.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{ padding: "10px 20px", background: "#b91c1c", color: "#ffffff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
          >
            Tải Lại Ứng Dụng
          </button>
        </div>
      </body>
    </html>
  );
}
