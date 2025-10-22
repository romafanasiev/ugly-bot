import { twMerge } from 'tailwind-merge';

const GravestoneWrapper = ({ children, className }: { children: Readonly<React.ReactNode>; className?: string }) => {
  return (
    <div
      className={twMerge(
        'bg-bg-intro shadow-intro relative flex flex-col gap-6 rounded-xl bg-[url(/graveyard_bg.png)] p-3 lg:rounded-3xl lg:p-6',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default GravestoneWrapper;
