'use client';

import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'crossSiteNavSeen';
const SCROLL_THRESHOLD = 50;

/**
 * Cross-Site Navigation
 * Synced with: moony01.github.io/_includes/cross-site-nav.html
 * All units in px for consistency
 */
export default function Header() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [showPulse, setShowPulse] = useState(false);
  const lastScrollY = useRef(0);
  const initialized = useRef(false);

  // 토글 함수 (bounce 애니메이션 포함)
  const toggleMenu = (collapse: boolean) => {
    if (collapse === isCollapsed) return;

    setAnimationClass(collapse ? 'collapsing' : 'expanding');

    setTimeout(() => {
      setAnimationClass('');
      setIsCollapsed(collapse);
    }, 400);
  };

  // 초기화 및 스크롤 이벤트
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const hasSeenMenu = localStorage.getItem(STORAGE_KEY) === 'true';

    if (hasSeenMenu) {
      // 이미 본 사용자: 바로 접힌 상태
      setIsCollapsed(true);
    } else {
      // 첫 방문자: 메뉴 펼쳐진 상태 + pulse 효과
      setTimeout(() => {
        setShowPulse(true);
        setTimeout(() => setShowPulse(false), 1500);
      }, 500);
    }

    // 스크롤 감지
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 아래로 스크롤 + threshold 초과
      if (currentScrollY > lastScrollY.current && currentScrollY > SCROLL_THRESHOLD) {
        if (!isCollapsed) {
          toggleMenu(true);
          localStorage.setItem(STORAGE_KEY, 'true');
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isCollapsed]);

  // 토글 버튼 클릭 핸들러
  const handleToggleClick = () => {
    toggleMenu(!isCollapsed);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const headerClass = `cross-site-header ${isCollapsed ? 'collapsed' : ''} ${animationClass}`;
  const primaryClass = `cross-site-link primary ${showPulse ? 'pulse-once' : ''}`;

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
          className="cross-site-link cross-site-toggle"
          onClick={handleToggleClick}
          aria-label="메뉴 토글"
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
      `}</style>
    </>
  );
}
