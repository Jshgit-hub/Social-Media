import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils'; // For tailwind-merge and clsx if using shadcn's cn utility
import Header from './components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Facebook Wall',
  description: 'A Facebook-like wall application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-gray-100')}>
        <Header />
        <main className="container mx-auto mt-4 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}