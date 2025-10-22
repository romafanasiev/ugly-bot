import Button, { type ButtonProps } from '@mui/material/Button';
import { ButtonWrapper } from '../components/ButtonWrapper';
import { twMerge } from 'tailwind-merge';

type SecondaryButtonProps = ButtonProps & {
  wrapperClassName?: string;
};

const SecondaryButton = ({ sx, children, disabled, className, wrapperClassName, ...props }: SecondaryButtonProps) => {
  return (
    <ButtonWrapper className={wrapperClassName} isDisabled={disabled}>
      <Button
        {...props}
        sx={{
          ...sx,
          position: 'relative',
          right: '2%',
          width: '68%',
          color: 'var(--color-primary)',
          zIndex: 10,
        }}
        className={twMerge(`transition-all duration-300 ${!disabled && 'group-hover:text-hover'}`, className)}
        disabled={disabled}
      >
        {children}
      </Button>
      <img
        src="/secondary_button.png"
        alt="Primary Button"
        className={`absolute top-0 left-0 h-full w-full transition-all duration-300 ${!disabled && 'group-hover:scale-105'}`}
      />
    </ButtonWrapper>
  );
};

export default SecondaryButton;
