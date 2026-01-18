/**
 * PWA 아이콘 512x512 Route
 * 정적 export에서 /icon-512 경로로 PNG 생성
 * manifest.ts의 primary icon으로 사용
 */
import { ImageResponse } from 'next/og';

/** 정적 export를 위한 설정 */
export const dynamic = 'force-static';

/** 아이콘 크기 설정 (512x512) */
const size = {
  width: 512,
  height: 512,
};

/**
 * 512x512 PWA 아이콘 생성
 * GET /icon-512 요청 시 PNG 반환
 */
export async function GET() {
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
