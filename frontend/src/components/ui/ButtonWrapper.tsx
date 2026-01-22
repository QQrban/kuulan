import { Button, buttonVariants } from '@/components/ui/button';
import { ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';

interface ButtonWrapperProps extends VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}

export function ButtonWrapper({
  icon,
  children,
  onClick,
  variant = 'brand',
  size = 'brand',
}: ButtonWrapperProps) {
  return (
    <Button variant={variant} size={size} onClick={onClick}>
      {icon && (
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20">
          {icon}
        </span>
      )}
      {children}
    </Button>
  );
}
