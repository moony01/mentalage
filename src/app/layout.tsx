import './globals.css';
import type { Metadata, Viewport } from 'next';

/**
 * 기본 메타데이터 (루트 레벨)
 */
export const metadata: Metadata = {
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
 * 루트 레이아웃 - html/body는 [locale]/layout.tsx에서 처리
 * 이 레이아웃은 children만 전달하는 pass-through 역할
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
