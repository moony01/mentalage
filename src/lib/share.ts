/**
 * Share utility functions for social media and clipboard
 */

/**
 * X(구 트위터) 공유 URL 생성
 * @param text 공유할 텍스트
 * @param url 공유할 URL
 */
export function getXShareUrl(text: string, url: string): string {
  const params = new URLSearchParams({
    text: text,
    url: url,
  });
  return `https://x.com/intent/tweet?${params.toString()}`;
}

/**
 * 페이스북 공유 URL 생성
 * @param url 공유할 URL
 */
export function getFacebookShareUrl(url: string): string {
  const params = new URLSearchParams({
    u: url,
  });
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}

/**
 * 클립보드에 URL 복사
 * @param text 복사할 텍스트
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Web Share API 사용 (모바일)
 */
export async function nativeShare(data: {
  title: string;
  text: string;
  url: string;
}): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.share) {
    return false;
  }
  try {
    await navigator.share(data);
    return true;
  } catch (error) {
    // User cancelled share or other error
    if ((error as Error).name !== 'AbortError') {
      console.error('Failed to share:', error);
    }
    return false;
  }
}

/**
 * 공유 텍스트 생성
 * @param mentalAge 정신 연령
 * @param messageTemplate 메시지 템플릿 (e.g. "My mental age is {age}! Try it too 👉")
 */
export function generateShareText(mentalAge: number, messageTemplate: string): string {
  return messageTemplate.replace('{age}', mentalAge.toString());
}

/**
 * 카카오톡 공유 (Kakao SDK 사용)
 * @param title 공유 제목
 * @param description 공유 설명
 * @param url 공유 URL
 */
export function shareKakao(title: string, description: string, url: string): boolean {
  if (typeof window === 'undefined') return false;

  // Kakao SDK 타입 선언
  const kakao = (window as Window & { Kakao?: KakaoSDK }).Kakao;

  // Kakao SDK가 초기화되어 있으면 SDK 사용 (친구 선택 창 팝업)
  if (kakao?.Link) {
    try {
      const baseUrl = 'https://moony01.com/mentalage';
      kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description,
          imageUrl: `${baseUrl}/en/opengraph-image`,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      });
      return true;
    } catch (error) {
      console.error('Kakao Link share failed:', error);
      return false;
    }
  }

  // SDK 미로드 시 안내
  console.warn('Kakao SDK not loaded');
  return false;
}

/** Kakao SDK 타입 */
interface KakaoSDK {
  Link?: {
    sendDefault: (options: {
      objectType: string;
      content: {
        title: string;
        description: string;
        imageUrl: string;
        link: { mobileWebUrl: string; webUrl: string };
      };
      buttons?: Array<{
        title: string;
        link: { mobileWebUrl: string; webUrl: string };
      }>;
    }) => void;
  };
}
