import './globals.css';

export const metadata = {
  title: 'GlassApp',
  description: 'A Fast Messaging App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen">{children}</body>
    </html>
  );
}
