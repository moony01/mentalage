'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

const AUTO_COLLAPSE_DELAY = 3000; // 3초 후 자동 접힘

// 다국어 툴팁 메시지
const TOOLTIP_MESSAGES: Record<string, string> = {
  ko: '버튼을 클릭해서 다른 테스트를 체험해보세요',
  en: 'Click to explore other tests and apps',
  ja: 'クリックして他のテストを体験してください',
  zh: '点击体验其他测试和应用',
  vi: 'Nhấp để khám phá các bài test khác',
  id: 'Klik untuk menjelajahi tes lainnya',
};

/**
 * Cross-Site Navigation
 * Synced with: moony01.github.io/_includes/cross-site-nav.html
 * All units in px for consistency
 *
 * mentalage 전용: 풀스크린이라 스크롤 대신 3초 후 자동 접힘
 */
export default function Header() {
  const params = useParams();
  const locale = (params?.locale as string) || 'ko';
  const tooltipMessage = TOOLTIP_MESSAGES[locale] || TOOLTIP_MESSAGES['en'];

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [showPulse, setShowPulse] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const initialized = useRef(false);

  // 토글 함수 (bounce 애니메이션 포함)
  const toggleMenu = (collapse: boolean) => {
    if (collapse === isCollapsed) return;

    setAnimationClass(collapse ? 'collapsing' : 'expanding');

    setTimeout(() => {
      setAnimationClass('');
      setIsCollapsed(collapse);
      setShowTooltip(collapse);
    }, 400);
  };

  // 초기화: 항상 첫 방문자 UX (메뉴 펼침 + pulse + 3초 후 자동 접힘)
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // pulse 효과
    setTimeout(() => {
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 1500);
    }, 500);

    // 3초 후 자동 접힘
    setTimeout(() => {
      toggleMenu(true);
    }, AUTO_COLLAPSE_DELAY);
  }, []);

  // 토글 버튼 클릭 핸들러
  const handleToggleClick = () => {
    toggleMenu(!isCollapsed);
  };

  const headerClass = `cross-site-header ${isCollapsed ? 'collapsed' : ''} ${animationClass}`;
  const primaryClass = `cross-site-link primary ${showPulse ? 'pulse-once' : ''}`;
  const toggleClass = `cross-site-link cross-site-toggle ${showTooltip ? 'show-tooltip' : ''}`;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
      />

      <header className={headerClass}>
        {/* 토글 버튼 */}
        <button
          type="button"
          className={toggleClass}
          onClick={handleToggleClick}
          aria-label="메뉴 토글"
          title={tooltipMessage}
          data-tooltip={tooltipMessage}
        >
          <span className="link-icon toggle-open">☰</span>
          <span className="link-icon toggle-close">✕</span>
        </button>

        {/* 링크들 */}
        <div className="cross-site-links">
          {/* Plozen Blog */}
          <a href="/" className="cross-site-link" target="_blank" rel="noopener noreferrer">
            <span className="link-icon">
              <img src="/mentalage/images/blog-logo.svg" width={28} height={28} alt="Plozen Blog" />
            </span>
            <span className="link-label">Plozen Blog</span>
            <span className="link-label-mobile"></span>
          </a>

          {/* K-Pop Face Test */}
          <a
            href="/kpopface/"
            className="cross-site-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="link-icon">
              <img
                src="/mentalage/images/kft-logo.svg"
                width={28}
                height={28}
                alt="K-Pop Face Test"
              />
            </span>
            <span className="link-label">K-Pop Face Test</span>
            <span className="link-label-mobile"></span>
          </a>

          {/* Mental Age Test (현재 사이트 - Primary) */}
          <a href="/" className={primaryClass}>
            <span className="link-icon">🧠</span>
            <span className="link-label">Mental Age Test</span>
            <span className="link-label-mobile">Mental</span>
          </a>

          {/* KCL */}
          <a
            href="https://kclhq.com/"
            className="cross-site-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="link-icon">
              <img
                src="/mentalage/images/kcl-logo.svg"
                width={28}
                height={28}
                alt="K-Pop Company League"
              />
            </span>
            <span className="link-label">K-Pop Company League</span>
            <span className="link-label-mobile"></span>
          </a>

          {/* 상견례 얼굴상 테스트 */}
          <a
            href="/sanggyeonrye-test/"
            className="cross-site-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="link-icon">
              <img
                src="/mentalage/images/sgt-logo.svg"
                width={28}
                height={28}
                alt="상견례 얼굴상 테스트"
              />
            </span>
            <span className="link-label">상견례 얼굴상 테스트</span>
            <span className="link-label-mobile"></span>
          </a>
        </div>
      </header>

      <style jsx global>{`
        /**
         * Cross-Site Navigation - All px units
         */

        .cross-site-header {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: flex-end;
          font-family:
            'Pretendard Variable',
            Pretendard,
            -apple-system,
            BlinkMacSystemFont,
            system-ui,
            sans-serif;
          font-size: 16px;
        }

        .cross-site-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: flex-end;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .cross-site-header.collapsed .cross-site-links {
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
          max-height: 0;
          gap: 0;
          overflow: hidden;
        }

        .cross-site-header:not(.collapsed) .cross-site-links {
          opacity: 1;
          transform: translateY(0);
          max-height: 500px;
        }

        /* Bounce 효과를 위한 애니메이션 */
        @keyframes bounceCollapse {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-15px); opacity: 0.5; }
          75% { transform: translateY(-5px); opacity: 0.2; }
          100% { transform: translateY(-10px); opacity: 0; }
        }

        @keyframes bounceExpand {
          0% { transform: translateY(-10px); opacity: 0; }
          50% { transform: translateY(5px); opacity: 0.8; }
          75% { transform: translateY(-2px); opacity: 0.9; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .cross-site-header.collapsing .cross-site-links {
          animation: bounceCollapse 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .cross-site-header.expanding .cross-site-links {
          animation: bounceExpand 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Primary 메뉴 Pulse 효과 */
        @keyframes primaryPulse {
          0% { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1), 0 0 0 0 rgba(124, 58, 237, 0.7); }
          50% { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1), 0 0 0 12px rgba(124, 58, 237, 0); }
          100% { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1), 0 0 0 0 rgba(124, 58, 237, 0); }
        }

        .cross-site-link.primary.pulse-once {
          animation: primaryPulse 1.5s ease-out;
        }

        .cross-site-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          border-radius: 9999px;
          box-shadow:
            0 4px 6px -1px rgb(0 0 0 / 0.1),
            0 2px 4px -2px rgb(0 0 0 / 0.1);
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          text-decoration: none !important;
          cursor: pointer;
          border: none;
          background: rgba(255, 255, 255, 0.8);
          color: #374151 !important;
        }

        .cross-site-link:hover {
          transform: scale(1.05);
          box-shadow:
            0 20px 25px -5px rgb(0 0 0 / 0.1),
            0 8px 10px -6px rgb(0 0 0 / 0.1);
          background: rgba(255, 255, 255, 1);
          color: #000000 !important;
        }

        .cross-site-link.primary {
          background: linear-gradient(to right, rgba(124, 58, 237, 0.9), rgba(192, 38, 211, 0.9));
          color: white !important;
        }

        .cross-site-link.primary:hover {
          background: linear-gradient(to right, #7c3aed, #c026d3);
          color: white !important;
        }

        .link-icon {
          font-size: 28px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .link-icon svg,
        .link-icon img {
          width: 28px;
          height: 28px;
          border-radius: 4px;
        }

        .link-label {
          font-size: 14px;
          font-weight: 700;
          white-space: nowrap;
          display: none;
        }

        .link-label-mobile {
          font-size: 16px;
          font-weight: 700;
          white-space: nowrap;
          display: inline-block;
        }

        .cross-site-link:not(.primary) .link-label-mobile {
          display: none;
        }

        @media (min-width: 640px) {
          .link-label {
            display: inline-block;
          }
          .link-label-mobile {
            display: none;
          }
        }

        .cross-site-toggle {
          width: 48px;
          height: 48px;
          padding: 0;
          justify-content: center;
        }

        .cross-site-toggle .link-icon {
          font-size: 24px;
        }

        /* 기본 상태 (메뉴 펼쳐짐): 닫기 버튼 표시 */
        .toggle-open {
          display: none;
        }
        .toggle-close {
          display: inline-block;
        }

        /* collapsed 상태 (메뉴 접힘): 햄버거 메뉴 표시 */
        .cross-site-header.collapsed .toggle-open {
          display: inline-block;
        }
        .cross-site-header.collapsed .toggle-close {
          display: none;
        }

        .cross-site-link:active {
          transform: scale(0.98);
        }

        .cross-site-link:focus-visible {
          outline: 2px solid #8b5cf6;
          outline-offset: 2px;
        }

        /* 툴팁 스타일 */
        .cross-site-toggle {
          position: relative;
        }

        .cross-site-toggle::after {
          content: attr(data-tooltip);
          position: absolute;
          right: 0;
          top: 56px;
          transform: none;
          background: rgba(0, 0, 0, 0.85);
          color: white;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          white-space: normal;
          width: 120px;
          text-align: center;
          line-height: 1.4;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          pointer-events: none;
          z-index: 100;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .cross-site-toggle.show-tooltip::after {
          opacity: 1;
          visibility: visible;
        }

        /* 툴팁 애니메이션 */
        @keyframes tooltipPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .cross-site-toggle.show-tooltip::after {
          animation: tooltipPulse 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
