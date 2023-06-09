import './globals.css';
import { Inter } from 'next/font/google';

import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { Header } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko-KR">
      <body className={inter.className}>
        <Header />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
