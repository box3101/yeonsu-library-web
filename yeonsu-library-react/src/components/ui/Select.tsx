'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const selectVariants = cva(
  'relative flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input bg-white focus:ring-primary',
        ghost: 'border-0 bg-transparent focus:ring-primary shadow-none',
      },
      size: {
        xsmall: 'h-7 px-2 text-xs',
        small: 'h-8 px-2 text-xs',
        medium: 'h-10 px-3 text-sm',
        large: 'h-11 px-4 text-base',
        xlarge: 'h-12 px-4 text-lg',
      },
      width: {
        auto: 'w-auto',
        full: 'w-full',
        fit: 'w-fit',
      },
      state: {
        default: '',
        success: 'border-green-500 focus:ring-green-500',
        error: 'border-red-500 focus:ring-red-500',
        warning: 'border-yellow-500 focus:ring-yellow-500',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
      width: 'auto',
      state: 'default',
    },
  }
);

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  options: SelectOption[];
  containerClassName?: string;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      width,
      state,
      id,
      label,
      helperText,
      errorMessage,
      options = [],
      required,
      value,
      onChange,
      containerClassName,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [selectValue, setSelectValue] = useState(value || '');
    
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const hasLabel = !!label;
    const hasHelperText = !!helperText;
    const hasErrorMessage = !!errorMessage;
    const isError = state === 'error' || !!errorMessage;
    const isFilled = !!selectValue;

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      setSelectValue(newValue);
      onChange?.(e);
    };

    return (
      <div className={cn('ui-select-container', containerClassName)}>
        {hasLabel && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div
          className={cn(
            selectVariants({
              variant,
              size,
              width,
              state: isError ? 'error' : state,
            }),
            isFilled && 'text-gray-900',
            !isFilled && 'text-gray-500',
            className
          )}
        >
          <select
            ref={ref}
            id={selectId}
            value={selectValue}
            onChange={handleSelectChange}
            className="absolute inset-0 w-full appearance-none bg-transparent outline-none cursor-pointer"
            aria-invalid={isError}
            aria-describedby={
              hasHelperText || hasErrorMessage ? `${selectId}-help` : undefined
            }
            {...props}
          >
            {placeholder && (
              <option value="" disabled={required}>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <ChevronDown className="h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {(hasHelperText || hasErrorMessage) && (
          <div
            id={`${selectId}-help`}
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

Select.displayName = 'Select';

export { Select, selectVariants };