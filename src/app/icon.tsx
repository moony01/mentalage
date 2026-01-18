/**
 * PWA 아이콘 (512x512)
 * Next.js ImageResponse를 사용하여 빌드 타임에 PNG 생성
 * 그라데이션 배경 + 🧠 이모지 디자인
 */
import { ImageResponse } from 'next/og';

/** 정적 export를 위한 설정 */
export const dynamic = 'force-static';

/** 아이콘 크기 설정 (512x512) */
export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/png';

/**
 * 512x512 PWA 아이콘 생성
 * manifest.ts의 primary icon으로 사용
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20%',
        }}
      >
        <span style={{ fontSize: 280 }}>🧠</span>
      </div>
    ),
    { ...size },
  );
}
