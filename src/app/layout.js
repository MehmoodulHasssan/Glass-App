import { SocketProvider } from '@/store/SocketContext';
import './globals.css';
import ContextProvider from '@/store/AuthSelectedContext';

export const metadata = {
  title: 'GlassApp',
  description: 'A Fast Messaging App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen">
        <ContextProvider>
          <SocketProvider>{children}</SocketProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
