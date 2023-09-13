import * as React from 'react';

import { cn } from '~/libs/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border-none bg-background px-3 py-2 text-sm transition-shadow file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:shadow-border-focus shadow-border',
          'aria-[invalid=true]:shadow-border-invalid focus-visible:aria-[invalid=true]:shadow-border-invalid-focus aria-[invalid=true]:text-destructive aria-[invalid=true]:placeholder:text-destructive',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export interface InputContainerProps
  extends React.InputHTMLAttributes<HTMLDivElement> {}

const InputContainer = React.forwardRef<HTMLDivElement, InputContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-10 w-full items-center rounded-md border-none bg-background px-3 py-2 text-sm transition-shadow',
          'focus-within:shadow-border-focus shadow-border',
          '[&>input]:w-full [&>input]:outline-none [&>input]:placeholder:text-muted-foreground',
          'aria-[invalid=true]:shadow-border-invalid focus-within:aria-[invalid=true]:shadow-border-invalid-focus aria-[invalid=true]:text-destructive [&>input]:aria-[invalid=true]:placeholder:text-destructive',
          className,
        )}
        {...props}
      />
    );
  },
);
InputContainer.displayName = 'InputContainer';

export { Input, InputContainer };
