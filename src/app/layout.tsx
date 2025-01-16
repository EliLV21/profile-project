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
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased container bg-[#a1a1aa] md:max-w-screen-xl mx-auto z-10`}
      >
        <BoardProvider>{children}</BoardProvider>
      </body>
    </html>
  );
}
