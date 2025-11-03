'use client';
import { Quiz } from '@/src/features/quiz/components/core';
import { useUserStore } from '@/src/shared/store/hooks/useUserStore';
import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/src/shared/constants/ROUTES';

export default function QuizPage() {
  const router = useRouter();
  const { name } = useUserStore((state) => state);

  useLayoutEffect(() => {
    if (name.length > 0) return;
    router.replace(ROUTES.HOME);
  }, []);

  if (name.length === 0) return null;

  return (
    <Quiz />
  )
}
