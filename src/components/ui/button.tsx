import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer touch-manipulation",
  {
    variants: {
      variant: {
        // Primary - Main call-to-action (Deep Plum)
        default:
          'bg-primary text-white shadow-sm hover:bg-primary-800 focus-visible:ring-primary-300 active:bg-primary-600 disabled:bg-primary-300',

        // Secondary - Alternative actions (Minty Aqua)
        secondary:
          'bg-secondary text-white shadow-sm hover:bg-secondary-700 focus-visible:ring-secondary-300 active:bg-secondary-800 disabled:bg-secondary-200',

        // Accent - Highlight actions (Sky Blue)
        accent:
          'bg-accent text-white shadow-sm hover:bg-accent-400 focus-visible:ring-accent-300 active:bg-accent-600 disabled:bg-accent-200',

        // Gradient - Gradient background
        gradient:
          'bg-gradient-to-r from-gradient-primary  to-gradient-secondary  text-white shadow-sm hover:from-primary-800 hover:to-secondary-800 focus-visible:ring-primary-300 active:from-primary-600 active:to-secondary-800 disabled:from-primary-300 disabled:to-secondary-200',

        // Destructive - Danger actions
        destructive:
          'bg-error text-white shadow-sm hover:bg-error-dark focus-visible:ring-error-300 active:bg-error-dark disabled:bg-error-200',

        // Outline Primary - Subtle primary action
        outline:
          'border-2 border-primary bg-transparent text-primary shadow-sm hover:bg-primary hover:text-white focus-visible:ring-primary-300 active:bg-primary-600 active:text-white disabled:border-primary-200 disabled:text-primary-300',

        // Outline Secondary - Subtle secondary action
        'outline-secondary':
          'border-2 border-secondary bg-transparent text-secondary shadow-sm hover:bg-secondary hover:text-white focus-visible:ring-secondary-300 active:bg-secondary-600 active:text-white disabled:border-secondary-200 disabled:text-secondary-300',

        // Outline Accent - Subtle accent action
        'outline-accent':
          'border-2 border-accent bg-transparent text-accent shadow-sm hover:bg-accent hover:text-white focus-visible:ring-accent-300 active:bg-accent-600 active:text-white disabled:border-accent-200 disabled:text-accent-300',

        // Ghost - Minimal interaction
        ghost:
          'bg-transparent text-primary-700 hover:bg-primary-50 hover:text-primary focus-visible:ring-primary-300 active:bg-primary-100 disabled:text-neutral-400',

        // Ghost Secondary - Minimal secondary interaction
        'ghost-secondary':
          'bg-transparent text-secondary-600 hover:bg-secondary-50 hover:text-secondary focus-visible:ring-secondary-300 active:bg-secondary-100 disabled:text-neutral-400',

        // Ghost Accent - Minimal accent interaction
        'ghost-accent':
          'bg-transparent text-accent-600 hover:bg-accent-50 hover:text-accent focus-visible:ring-accent-300 active:bg-accent-100 disabled:text-neutral-400',

        // Ghost Destructive - Minimal destructive interaction
        'ghost-destructive':
          'bg-transparent text-error-600 hover:bg-error-light hover:text-error focus-visible:ring-error-300 active:bg-error-100 disabled:text-neutral-400',

        // Link - Text links
        link: 'bg-transparent text-primary underline-offset-4 hover:underline focus-visible:ring-primary-300 disabled:text-primary-300',

        // Soft - Subtle colored background
        soft: 'bg-primary-100 text-primary-800 hover:bg-primary-200 focus-visible:ring-primary-300 active:bg-primary-300 disabled:bg-primary-50 disabled:text-primary-400',

        // Soft Secondary
        'soft-secondary':
          'bg-secondary-100 text-secondary-800 hover:bg-secondary-200 focus-visible:ring-secondary-300 active:bg-secondary-300 disabled:bg-secondary-50 disabled:text-secondary-400',

        // Soft Accent
        'soft-accent':
          'bg-accent-100 text-accent-800 hover:bg-accent-200 focus-visible:ring-accent-300 active:bg-accent-300 disabled:bg-accent-50 disabled:text-accent-400',

        // Soft Success
        'soft-success':
          'bg-success-light text-success hover:shadow-soft focus-visible:shadow-soft  disabled:bg-neutral-5 disabled:text-primary',

        // Soft Destructive
        'soft-destructive':
          'bg-error-light text-error hover:shadow-soft focus-visible:shadow-soft  disabled:bg-neutral-5 disabled:text-primary',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs rounded gap-1.5 has-[>svg]:px-2',
        sm: 'h-8 px-3 text-sm rounded-lg gap-1.5 has-[>svg]:px-2.5',
        default: 'h-9 px-4 py-2 rounded-lg has-[>svg]:px-3',
        lg: 'h-10 px-6 rounded-lg has-[>svg]:px-4',
        xl: 'h-11 px-8 text-base rounded-lg has-[>svg]:px-6',
        'xl-2': 'h-12 px-10 text-base rounded-lg has-[>svg]:px-8',
        'xl-3': 'h-14 px-12 text-base rounded-lg has-[>svg]:px-10',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      onPointerDown={(e) => {
        if (e.pointerType === 'pen') {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onPointerUp={(e) => {
        if (e.pointerType === 'pen') {
          e.preventDefault();
          e.stopPropagation();
          e.currentTarget.click();
        }
      }}
    />
  );
}

const StaticButton = ({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants, StaticButton };
