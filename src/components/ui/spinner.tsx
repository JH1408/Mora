import { cn } from '@/lib/utils';

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin',
        className
      )}
    ></div>
  );
};

export default Spinner;
