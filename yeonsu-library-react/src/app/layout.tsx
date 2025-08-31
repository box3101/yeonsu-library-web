import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "연수구립도서관",
  description: "인천 연수구립도서관 공식 웹사이트 - 도서검색, 대출현황, 문화프로그램 안내",
  keywords: "연수구립도서관, 인천도서관, 도서검색, 대출, 문화프로그램, 송도도서관",
  openGraph: {
    title: "연수구립도서관",
    description: "인천 연수구립도서관 공식 웹사이트",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
