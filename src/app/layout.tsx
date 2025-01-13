import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { BoardProvider } from '@/context/board-context/BoardContext';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Elizabeth React Project',
  description: 'Elizabeth React Project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased container`}>
        <div className="md:max-w-screen-xl mx-auto">
          <BoardProvider>{children}</BoardProvider>
        </div>
      </body>
    </html>
  );
}
