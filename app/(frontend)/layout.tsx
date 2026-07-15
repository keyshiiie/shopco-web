import type { Metadata } from "next";
import { Oswald, Poiret_One } from 'next/font/google';
import "./styles/globals.scss";

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-oswald',
});

const poiretOne = Poiret_One({
  subsets: ['latin', 'cyrillic'],
  weight: ['400'],
  variable: '--font-poiret-one',
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
    <html lang="ru" className={`${oswald.variable} ${poiretOne.variable}`}>
      <body>{children}</body>
    </html>
  );
}