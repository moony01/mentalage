/**
 * Apple Touch 아이콘 (180x180)
 * iOS 홈 화면 추가 시 표시되는 아이콘
 * 그라데이션 배경 + 🧠 이모지 디자인
 */
import { ImageResponse } from 'next/og';

/** 정적 export를 위한 설정 */
export const dynamic = 'force-static';

/** Apple Touch 아이콘 크기 설정 (180x180) */
export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

/**
 * 180x180 Apple Touch 아이콘 생성
 * iOS Safari의 "홈 화면에 추가" 기능용
 */
export default function AppleIcon() {
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
        <span style={{ fontSize: 100 }}>🧠</span>
      </div>
    ),
    { ...size },
  );
}
