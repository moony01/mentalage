import { useState, useCallback, useMemo, useEffect } from 'react';
import { Question, Answer, QuizResult } from '@/types';
import { generateQuizResult } from '@/lib/calculate';
import questionsData from '@/data/questions.json';

/** sessionStorage 키 */
const STORAGE_KEY = 'mentalage-result';

/** 저장할 결과 데이터 타입 */
interface SavedResult {
  result: QuizResult;
  realAge: number;
}

interface UseQuizReturn {
  // State
  currentIndex: number;
  answers: Answer[];
  realAge: number | null;
  result: QuizResult | null;
  isCompleted: boolean;
  isStarted: boolean;

  // Computed
  currentQuestion: Question | null;
  progress: number; // 0-100
  totalQuestions: number;

  // Actions
  start: () => void;
  setRealAge: (age: number) => void;
  submitAnswer: (optionId: string, score: number) => void;
  reset: () => void;
}

export function useQuiz(): UseQuizReturn {
  const [isStarted, setIsStarted] = useState(false);
  const [realAge, setRealAgeState] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // 페이지 로드 시 sessionStorage에서 결과 복원
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data: SavedResult = JSON.parse(saved);
        setResult(data.result);
        setRealAgeState(data.realAge);
        setIsCompleted(true);
        setIsStarted(true);
      }
    } catch (e) {
      console.error('Failed to restore result from sessionStorage:', e);
    }
  }, []);

  const questions = questionsData.questions as unknown as Question[];
  const totalQuestions = questions.length;

  const currentQuestion = useMemo(() => {
    if (currentIndex >= totalQuestions) return null;
    return questions[currentIndex];
  }, [currentIndex, questions, totalQuestions]);

  const progress = useMemo(() => {
    return Math.round((currentIndex / totalQuestions) * 100);
  }, [currentIndex, totalQuestions]);

  const start = useCallback(() => {
    setIsStarted(true);
  }, []);

  const setRealAge = useCallback((age: number) => {
    setRealAgeState(age);
  }, []);

  const submitAnswer = useCallback(
    (optionId: string, score: number) => {
      if (!currentQuestion) return;

      const newAnswer: Answer = {
        questionId: currentQuestion.id,
        optionId,
        score,
      };

      const newAnswers = [...answers, newAnswer];
      setAnswers(newAnswers);

      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsCompleted(true);
        if (realAge !== null) {
          const finalResult = generateQuizResult(newAnswers, realAge);
          setResult(finalResult);

          // 결과를 sessionStorage에 저장 (새로고침 시 유지)
          try {
            const dataToSave: SavedResult = {
              result: finalResult,
              realAge,
            };
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
          } catch (e) {
            console.error('Failed to save result to sessionStorage:', e);
          }
        }
      }
    },
    [answers, currentQuestion, currentIndex, totalQuestions, realAge],
  );

  const reset = useCallback(() => {
    setIsStarted(false);
    setRealAgeState(null);
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
    setIsCompleted(false);

    // sessionStorage 삭제
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to remove result from sessionStorage:', e);
    }
  }, []);

  return {
    currentIndex,
    answers,
    realAge,
    result,
    isCompleted,
    isStarted,
    currentQuestion,
    progress,
    totalQuestions,
    start,
    setRealAge,
    submitAnswer,
    reset,
  };
}
