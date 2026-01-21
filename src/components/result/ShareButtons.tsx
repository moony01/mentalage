'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { getXShareUrl, getFacebookShareUrl, copyToClipboard } from '../../lib/share';

interface ShareButtonsProps {
  mentalAge: number;
  shareUrl: string;
  onCopySuccess?: () => void;
}

export default function ShareButtons({ mentalAge, shareUrl, onCopySuccess }: ShareButtonsProps) {
  const tShare = useTranslations('share');
  const tResult = useTranslations('result');
  const [showToast, setShowToast] = useState(false);

  const shareText = tShare('shareText', { age: mentalAge });

  const handleXShare = () => {
    const url = getXShareUrl(shareText, shareUrl);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const url = getFacebookShareUrl(shareUrl);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setShowToast(true);
      if (onCopySuccess) onCopySuccess();
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  // 카카오톡 공유 - 임시 비활성화 (Kakao SDK 설정 필요)
  // const handleKakaoShare = () => {
  //   shareKakao(tResult('yourMentalAge'), shareText, shareUrl);
  // };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex flex-wrap justify-center gap-3">
        {/* 카카오톡 - 임시 숨김 (Kakao SDK 설정 필요) */}
        {/* <button
          onClick={handleKakaoShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FEE500] text-[#191919] hover:opacity-90 transition-all active:scale-95"
          aria-label={tShare('kakao')}
        >
          <span>💬</span>
          <span className="font-medium">{tShare('kakao')}</span>
        </button> */}

        <button
          onClick={handleXShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:opacity-80 transition-all active:scale-95"
          aria-label={tShare('twitter')}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="font-medium">{tShare('twitter')}</span>
        </button>

        <button
          onClick={handleFacebookShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-all active:scale-95"
          aria-label={tShare('facebook')}
        >
          <span>📘</span>
          <span className="font-medium">{tShare('facebook')}</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all active:scale-95"
          aria-label={tResult('copyLink')}
        >
          <span>🔗</span>
          <span className="font-medium">{tResult('copyLink')}</span>
        </button>
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm transition-opacity duration-300 ${
          showToast ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        ✅ {tShare('copySuccess')}
      </div>
    </div>
  );
}
