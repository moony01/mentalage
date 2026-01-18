/**
 * PWA 아이콘 192x192 Route
 * 정적 export에서 /icon-192 경로로 PNG 생성
 * manifest.ts의 maskable icon으로 사용
 */
import { ImageResponse } from 'next/og';

/** 정적 export를 위한 설정 */
export const dynamic = 'force-static';

/** 아이콘 크기 설정 (192x192) */
const size = {
  width: 192,
  height: 192,
};

/**
 * 192x192 PWA 아이콘 생성
 * GET /icon-192 요청 시 PNG 반환
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
        <span style={{ fontSize: 105 }}>🧠</span>
      </div>
    ),
    { ...size },
  );
}
