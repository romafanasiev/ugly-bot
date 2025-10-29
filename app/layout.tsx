import type { Metadata } from 'next';
import { Amarante } from 'next/font/google';
import { Typography } from "@mui/material";
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
     <body
        className={`${amarante.variable} ${horrorfind.variable} antialiased`}
      >
        <div className="relative flex min-h-dvh min-w-[340px] max-w-[1440px] flex-col justify-between mx-auto">
          
          <header className="flex-0 p-10 text-center text-2xl font-bold text-white z-10">
            <h1 className={`${horrorfind.className} text-2xl font-normal leading-[130%] tracking-[2px] text-[#F8F9F9]`}>
              Hell CHAT
            </h1>
          </header>

          <footer className="w-full flex justify-center overflow-hidden max-h-[70vh]">
            <img
              src="/underworld_footer.png"
              fetchPriority='high'
              alt="footer background"
              className="w-full h-auto object-contain 
                         max-[445px]:content-[url('/underworld_footer_m.png')]"
            />
          </footer>

          <div className="
            absolute z-20 top-[43px] left-[68px]
            max-[768px]:top-[96px] max-[768px]:left-[34px]
          ">
            <img
              src="/moon_bg.png"
              alt="moon"
              fetchPriority='high'
              className="w-[257px] rotate-[33deg]
                        max-[768px]:w-[185px]
                        max-[640px]:w-[125px]
                        max-[445px]:w-[96px]
                        filter 
                        brightness-70
                        contrast-125"
            />
          </div>

          <div className="absolute inset-0 z-30">
            <Providers>{children}</Providers>
          </div>
        </div>

      </body>
    </html>
  );
}
