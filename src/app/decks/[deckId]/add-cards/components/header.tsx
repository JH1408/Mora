import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import paths from '@/utils/paths';

const Header = ({ deckName }: { deckName?: string }) => {
  return (
    <header className='bg-background-white border-b border-neutral-3 shadow-soft sticky top-0 z-40'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-4'>
            <Link href={paths.dashboard}>
              <Button variant='ghost' size='sm'>
                <ArrowLeft className='h-4 w-4 mr-2' />
                Back to Dashboard
              </Button>
            </Link>

            <div className='h-6 w-px bg-neutral-3' />
            <div>
              <h1 className='text-xl font-bold font-heading text-text-primary'>
                Manage Cards
              </h1>
              {deckName && (
                <p className='text-sm text-text-muted'>in {deckName}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
