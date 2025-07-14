import { User, LogOut } from 'lucide-react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import paths from '@/utils/paths';

const Header = ({ userName }: { userName: string | null }) => {
  const handleSignout = async () => {
    try {
      await signOut({
        callbackUrl: paths.home,
      });
    } catch (error) {
      console.error(error);
      toast.error('Oops, we could not sign you out. Please try again.');
    }
  };
  return (
    <header className='bg-background-white border-b border-neutral-3 shadow-soft sticky top-0 z-40'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-3'>
            <div>
              <Image
                src='/images/mora_logo.png'
                alt='Mora Logo'
                width={100}
                height={100}
                className='h-10 w-auto'
              />
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2 text-sm text-text-secondary'>
              <User className='h-4 w-4' />
              <span>Welcome back, {userName || ''}!</span>
            </div>
            <Button variant='soft-secondary' size='sm' onClick={handleSignout}>
              <LogOut className='h-4 w-4 mr-2' />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
