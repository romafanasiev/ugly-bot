'use client';

import { useUserStore } from '@/src/shared/store/hooks/useUserStore';

const Quiz = () => {
  const { name, soulPoints } = useUserStore((state) => state);

  return (
    <div>
      {name} soul points: {soulPoints}
    </div>
  );
};

export default Quiz;
