import { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '7xl';
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '7xl': 'max-w-7xl',
};

export const Header = ({
  children,
  maxWidth = '7xl',
  className = '',
}: HeaderProps) => {
  return (
    <header
      className={`bg-background-white border-b border-neutral-3 shadow-soft sticky top-0 z-40 ${className}`}
    >
      <div
        className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}
      >
        <div className='flex items-center justify-between h-16'>{children}</div>
      </div>
    </header>
  );
};

export const HeaderLeft = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`flex items-center space-x-3 ${className}`}>{children}</div>
);

export const HeaderCenter = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => <div className={`flex items-center ${className}`}>{children}</div>;

export const HeaderRight = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`flex items-center space-x-4 ${className}`}>{children}</div>
);

export const HeaderDivider = ({ className = '' }: { className?: string }) => (
  <div className={`h-6 w-px bg-neutral-3 ${className}`} />
);

export const HeaderTitle = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <h1
    className={`text-xl font-bold font-heading text-text-primary ${className}`}
  >
    {children}
  </h1>
);

export const HeaderSubtitle = ({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <p
    className={`text-sm text-text-muted ${
      onClick ? 'cursor-pointer' : ''
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </p>
);
