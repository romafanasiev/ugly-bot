import type { Metadata } from 'next';
import { Amarante } from 'next/font/google';
import localFont from 'next/font/local';
import './styles/globals.css';
import Providers from './providers';

const horrorfind = localFont({
  src: '../public/fonts/Horrorfind.ttf',
  variable: '--font-horrorfind',
});

const amarante = Amarante({
  variable: '--font-amarante',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ugly Bot',
  description: 'Sign contract first',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${amarante.variable} ${horrorfind.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
