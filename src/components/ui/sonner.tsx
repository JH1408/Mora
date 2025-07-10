'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      position='top-center'
      richColors
      style={
        {
          '--normal-bg': '#ffffff',
          '--normal-text': '#2b2d42',
          '--normal-border': '#e5e5e5',
          '--success-bg': '#48bb78',
          '--success-text': '#2b2d42',
          '--success-border': '#48bb78',
          '--error-bg': '#f56565',
          '--error-text': '#ffffff',
          '--error-border': '#f56565',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
