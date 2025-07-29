import { cn } from '@/utils/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn('bg-neutral-3 animate-pulse rounded-sm', className)}
      {...props}
    />
  );
}

export { Skeleton };
