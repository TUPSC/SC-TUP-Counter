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