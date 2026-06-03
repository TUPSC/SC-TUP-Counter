export const metadata = {
  title: "TUPSC Dashboard",
  description: "Realtime Election Dashboard",
  viewport: "width=device-width, initial-scale=1",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
export const metadata = {
  title: "TUP Election 2026",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};