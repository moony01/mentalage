import './globals.css';
import type { Metadata, Viewport } from 'next';

/**
 * 사이트 기본 URL
 */
const siteUrl = 'https://moony01.com/mentalage';

/**
 * 기본 메타데이터 (루트 레벨) - SEO 필수!
 * Google이 /mentalage/ 를 크롤링할 때 이 메타데이터가 표시됨
 */
export const metadata: Metadata = {
  title: 'Mental Age Test - How Old Is Your Mind? Free Quiz | 정신연령 테스트',
  description:
    'Take this free mental age quiz to discover how old your mind really is! Answer fun questions and share your results with friends. 재미있는 질문에 답하고 당신의 정신연령을 알아보세요!',
  keywords: ['mental age test', '정신연령 테스트', 'quiz', '테스트', 'viral', '심리테스트'],
  metadataBase: new URL('https://moony01.com'),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Mental Age Test - How Old Is Your Mind? Free Quiz | 정신연령 테스트',
    description:
      'Take this free mental age quiz to discover how old your mind really is! Answer fun questions and share your results with friends.',
    url: siteUrl,
    siteName: 'Mental Age Test',
    type: 'website',
    locale: 'en',
    images: [
      {
        url: `${siteUrl}/en/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Mental Age Test',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mental Age Test - How Old Is Your Mind? Free Quiz | 정신연령 테스트',
    description:
      'Take this free mental age quiz to discover how old your mind really is! Answer fun questions and share your results with friends.',
    images: [`${siteUrl}/en/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' style='stop-color:%23667eea'/><stop offset='100%25' style='stop-color:%23764ba2'/></linearGradient></defs><rect width='100' height='100' rx='20' fill='url(%23g)'/><text x='50' y='70' font-size='60' text-anchor='middle'>🧠</text></svg>",
  },
};

/**
 * 뷰포트 설정
 */
export const viewport: Viewport = {
  themeColor: '#667eea',
  width: 'device-width',
  initialScale: 1,
};

/**
 * 루트 레이아웃 - Next.js 15에서는 html/body 필수
 * [locale]/layout.tsx에서 lang 속성을 동적으로 덮어씀
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
