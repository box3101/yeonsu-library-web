'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700',
        secondary: 'bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700',
        tertiary: 'bg-white text-primary border border-primary hover:bg-primary-50 active:bg-primary-100',
        darkBlue: 'bg-secondary-800 text-white hover:bg-secondary-700 active:bg-secondary-600',
        darkGray: 'bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-600',
        text: 'text-primary hover:text-primary-600 active:text-primary-700 hover:underline',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        xsmall: 'h-7 px-2 text-xs',
        small: 'h-8 px-3 text-xs',
        medium: 'h-10 px-4 py-2',
        large: 'h-11 px-6 text-base',
        xlarge: 'h-12 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  text?: string;
  loading?: boolean;
  href?: string;
  target?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
  asChild?: boolean;
  // 모달 관련 데이터 속성
  'data-modal-open'?: string;
  'data-modal-close'?: boolean;
  'data-modal-confirm'?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      text,
      loading = false,
      href,
      target,
      icon,
      iconPosition = 'right',
      iconOnly = false,
      disabled,
      'data-modal-open': dataModalOpen,
      'data-modal-close': dataModalClose,
      'data-modal-confirm': dataModalConfirm,
      ...props
    },
    ref
  ) => {
    const buttonContent = text || children;
    const hasIcon = !!icon;
    const hasText = !!buttonContent && !iconOnly;

    const buttonProps = {
      ref,
      className: cn(
        buttonVariants({ variant, size, className }),
        iconOnly && 'aspect-square p-0',
        loading && 'cursor-not-allowed opacity-70'
      ),
      disabled: disabled || loading,
      ...(dataModalOpen && { 'data-modal-open': dataModalOpen }),
      ...(dataModalClose && { 'data-modal-close': '' }),
      ...(dataModalConfirm && { 'data-modal-confirm': '' }),
      ...props,
    };

    const content = (
      <>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {hasIcon && iconPosition === 'left' && !loading && (
          <span className="flex items-center justify-center">{icon}</span>
        )}
        {hasText && <span>{buttonContent}</span>}
        {hasIcon && iconPosition === 'right' && !loading && (
          <span className="flex items-center justify-center">{icon}</span>
        )}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          target={target}
          className={buttonProps.className}
          aria-disabled={disabled || loading}
        >
          {content}
        </a>
      );
    }

    return <button {...buttonProps}>{content}</button>;
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };