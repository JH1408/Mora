import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-white [a&]:hover:bg-primary-600',
        secondary:
          'border-transparent bg-secondary text-white [a&]:hover:bg-secondary-600',
        accent:
          'border-transparent bg-accent text-white [a&]:hover:bg-accent-600',
        destructive:
          'border-transparent bg-error text-white [a&]:hover:bg-error-dark focus-visible:ring-error/20 dark:focus-visible:ring-error/40',
        outline:
          'text-text-primary border-primary [a&]:hover:bg-primary-50 [a&]:hover:text-primary-700',
        success:
          'border-transparent bg-success text-white [a&]:hover:bg-success-dark',
        warning:
          'border-transparent bg-warning text-white [a&]:hover:bg-warning-dark',
        info: 'border-transparent bg-info text-white [a&]:hover:bg-info-dark',
        neutral:
          'border-transparent bg-neutral-6 text-white [a&]:hover:bg-neutral-7',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot='badge'
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
