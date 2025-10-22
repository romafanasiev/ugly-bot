import { twMerge } from 'tailwind-merge';

type ButtonWrapperProps = {
  children: Readonly<React.ReactNode>;
  className?: string;
  isDisabled?: boolean;
};

export const ButtonWrapper = ({ children, className, isDisabled }: ButtonWrapperProps) => {
  return (
    <div
      className={twMerge(
        `group relative flex h-20 w-40 items-center justify-center ${isDisabled && 'grayscale'}`,
        className,
      )}
    >
      {children}
    </div>
  );
};
