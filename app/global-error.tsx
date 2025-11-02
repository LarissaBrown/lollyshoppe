"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          minHeight: "100vh",
          padding: "20px",
          fontFamily: "system-ui, -apple-system, sans-serif"
        }}>
          <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>Something went wrong!</h1>
          <p style={{ marginBottom: "24px", color: "#666" }}>
            We apologize for the inconvenience. Please try again.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={reset}
              style={{
                padding: "10px 20px",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.href = "/"}
              style={{
                padding: "10px 20px",
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #ddd",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Go Home
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

