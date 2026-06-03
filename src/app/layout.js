export const metadata = {
  title: "TUP Election 2026",
  description: "Realtime Election Dashboard",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      style={{
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        background: "#f4f5f7",
      }}
    >
      <body
        style={{
          margin: 0,
          padding: 0,
          overflowX: "hidden",
          background: "#f4f5f7",
        }}
      >
        {children}
      </body>
    </html>
  );
}