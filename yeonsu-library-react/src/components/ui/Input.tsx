'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { X, Eye, EyeOff } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-white transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input bg-white focus-visible:ring-primary',
        filled: 'border-border bg-gray-50 focus-visible:ring-primary',
        outlined: 'border-2 border-primary bg-white focus-visible:ring-primary-500',
        ghost: 'border-0 bg-transparent focus-visible:ring-primary shadow-none',
      },
      size: {
        xsmall: 'h-7 px-2 text-xs',
        small: 'h-8 px-2 text-xs',
        medium: 'h-10 px-3 text-sm',
        large: 'h-11 px-4 text-base',
        xlarge: 'h-12 px-4 text-lg',
      },
      state: {
        default: '',
        success: 'border-green-500 focus-visible:ring-green-500',
        error: 'border-red-500 focus-visible:ring-red-500',
        warning: 'border-yellow-500 focus-visible:ring-yellow-500',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      state: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  clearable?: boolean;
  showPasswordToggle?: boolean;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      state,
      type = 'text',
      id,
      label,
      helperText,
      errorMessage,
      icon,
      iconPosition = 'left',
      clearable = false,
      showPasswordToggle = false,
      required,
      value,
      onChange,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState(value || '');
    
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasIcon = !!icon;
    const hasLabel = !!label;
    const hasHelperText = !!helperText;
    const hasErrorMessage = !!errorMessage;
    const isError = state === 'error' || !!errorMessage;
    const actualType = type === 'password' && showPassword ? 'text' : type;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange?.(e);
    };

    const handleClear = () => {
      setInputValue('');
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={cn('ui-input-container', containerClassName)}>
        {hasLabel && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {hasIcon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={actualType}
            id={inputId}
            value={inputValue}
            onChange={handleInputChange}
            className={cn(
              inputVariants({ variant, size, state: isError ? 'error' : state }),
              hasIcon && iconPosition === 'left' && 'pl-10',
              (hasIcon && iconPosition === 'right') || clearable || showPasswordToggle
                ? 'pr-10'
                : '',
              className
            )}
            aria-invalid={isError}
            aria-describedby={
              hasHelperText || hasErrorMessage ? `${inputId}-help` : undefined
            }
            {...props}
          />

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {hasIcon && iconPosition === 'right' && !clearable && !showPasswordToggle && (
              <div className="text-gray-400">{icon}</div>
            )}

            {type === 'password' && showPasswordToggle && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}

            {clearable && inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                tabIndex={-1}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {(hasHelperText || hasErrorMessage) && (
          <div
            id={`${inputId}-help`}
            className={cn(
              'mt-1 text-xs',
              isError ? 'text-red-500' : 'text-gray-500'
            )}
          >
            {isError && hasErrorMessage ? errorMessage : helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };