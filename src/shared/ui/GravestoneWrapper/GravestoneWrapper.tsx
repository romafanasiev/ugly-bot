import { twMerge } from 'tailwind-merge';

const GravestoneWrapper = ({ children, className }: { children: Readonly<React.ReactNode>; className?: string }) => {
  return (
    <div
      className={twMerge(
        'bg-bg-intro shadow-intro relative m-auto flex max-w-[90dvw] flex-col gap-6 rounded-xl bg-[url(/graveyard_bg.png)] p-3 md:max-w-md md:rounded-3xl md:p-6',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default GravestoneWrapper;
