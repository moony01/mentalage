/**
 * OG 이미지 동적 생성
 * Next.js ImageResponse를 사용하여 언어별 OG 이미지 생성
 * 정적 export 호환 (generateStaticParams 사용)
 */
import { ImageResponse } from 'next/og';
import { locales, type Locale } from '@/i18n/config';

/** OG 이미지 크기 설정 */
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

/** 언어별 타이틀 */
const titles: Record<Locale, string> = {
  ko: '정신연령 테스트',
  en: 'Mental Age Test',
  ja: '精神年齢テスト',
  zh: '心理年龄测试',
  es: 'Test de Edad Mental',
  de: 'Mentalalter-Test',
  fr: "Test d'Âge Mental",
  pt: 'Teste de Idade Mental',
  ru: 'Тест на Возраст',
  id: 'Tes Usia Mental',
  vi: 'Bài Kiểm Tra Tuổi',
  tr: 'Zihinsel Yaş Testi',
};

/** 언어별 부제목 */
const subtitles: Record<Locale, string> = {
  ko: '당신의 정신연령은?',
  en: 'What is Your Mental Age?',
  ja: 'あなたの精神年齢は?',
  zh: '你的心理年龄是多少?',
  es: '¿Cuál es tu edad mental?',
  de: 'Wie alt bist du im Kopf?',
  fr: 'Quel est votre âge mental?',
  pt: 'Qual é a sua idade mental?',
  ru: 'Какой твой возраст?',
  id: 'Berapa Usia Mentalmu?',
  vi: 'Tuổi Tâm Lý Của Bạn?',
  tr: 'Zihinsel Yaşınız Kaç?',
};

/**
 * 정적 export를 위한 모든 locale 경로 생성
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * OG 이미지 생성 함수
 */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = (locales.includes(locale as Locale) ? locale : 'en') as Locale;

  const title = titles[safeLocale];
  const subtitle = subtitles[safeLocale];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* 뇌 이모지 */}
        <div
          style={{
            fontSize: 120,
            marginBottom: 20,
          }}
        >
          🧠
        </div>

        {/* 타이틀 */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: 'white',
            textAlign: 'center',
            marginBottom: 16,
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          {title}
        </div>

        {/* 부제목 */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
          }}
        >
          {subtitle}
        </div>

        {/* 하단 URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 24,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          moony01.com/mentalage
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
