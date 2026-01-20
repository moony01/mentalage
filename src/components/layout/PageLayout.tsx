'use client';

import Header from './Header';
import AdBanner from './AdBanner';

interface PageLayoutProps {
  children: React.ReactNode;
  /** 상단 광고 표시 여부 (기본: false) */
  showTopAd?: boolean;
  /** 하단 광고 표시 여부 (기본: true) */
  showBottomAd?: boolean;
  /** 추가 클래스 */
  className?: string;
}

/**
 * 공통 페이지 레이아웃
 * Header와 AdBanner를 포함한 일관된 레이아웃 제공
 */
export default function PageLayout({
  children,
  showTopAd = false,
  showBottomAd = true,
  className = '',
}: PageLayoutProps) {
  return (
    <>
      <Header />
      <main
        className={`relative flex min-h-screen flex-col items-center justify-center pt-16 pb-6 px-4 bg-background ${className}`}
      >
        {/* 상단 광고 (선택적) */}
        {showTopAd && <AdBanner className="mb-6 max-w-md w-full" />}

        {/* 메인 컨텐츠 */}
        {children}

        {/* 하단 광고 (기본 표시) */}
        {showBottomAd && <AdBanner className="mt-8 max-w-md w-full" />}
      </main>
    </>
  );
}
