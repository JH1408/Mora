import * as React from 'react';

import { cn } from '@/utils/utils';

function Input({
  className,
  type,
  icon,
  ...props
}: React.ComponentProps<'input'> & {
  icon?: React.ReactNode;
}) {
  return (
    <div className='relative'>
      <input
        type={type}
        data-slot='input'
        className={cn(
          'file:text-text-primary placeholder:text-text-secondary selection:bg-primary selection:text-white border-neutral-4 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-error/20 aria-invalid:border-error',
          icon ? 'pr-10' : '',
          className
        )}
        {...props}
      />
      {icon && (
        <div className='absolute inset-y-0 right-2 flex items-center'>
          {icon}
        </div>
      )}
    </div>
  );
}

export { Input };
