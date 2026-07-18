import type { Metadata } from "next";
import { Open_Sans, Alexandria } from 'next/font/google';
import "./styles/globals.scss";
import "./styles/_reset.scss";

const alexandria = Alexandria({
  subsets: ['latin', 'arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-alexandria',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

const openSans = Open_Sans({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Shop.co',
  description: 'Your favorite clothing store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${alexandria.variable} ${openSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}