/**
 * PWA 웹 앱 매니페스트
 * 정적 export 호환 - 빌드 시 manifest.json 생성
 */
import type { MetadataRoute } from 'next';

/** 정적 export를 위한 설정 */
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mental Age Test',
    short_name: 'MentalAge',
    description: 'Discover your mental age with fun questions',
    start_url: '/mentalage/ko/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#667eea',
    orientation: 'portrait',
    scope: '/mentalage/',
    icons: [
      {
        src: '/mentalage/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/mentalage/icon',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
