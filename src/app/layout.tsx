import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MSWProvider } from "./providers";
import "./globals.css";

const geistSans = Geist( {
  variable: "--font-geist-sans",
  subsets: [ "latin" ],
} );

const geistMono = Geist_Mono( {
  variable: "--font-geist-mono",
  subsets: [ "latin" ],
} );

export const metadata: Metadata = {
  title: "SubscribeMaster - Subscription Management",
  description: "Manage and track all your subscriptions in one place",
};

export default function RootLayout( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <html
      lang="uz"
      className={ `${ geistSans.variable } ${ geistMono.variable } h-full antialiased` }
    >
      <body className="min-h-full flex flex-col">
        <MSWProvider>{ children }</MSWProvider>
      </body>
    </html>
  );
}
