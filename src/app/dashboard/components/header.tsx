import Image from 'next/image';

import { User, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Header as BaseHeader,
  HeaderLeft,
  HeaderRight,
} from '@/components/ui/header';
import paths from '@/utils/clientPaths';

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
    <BaseHeader maxWidth='7xl'>
      <HeaderLeft>
        <Image
          src='/images/mora_logo.png'
          alt='Mora Logo'
          width={0}
          height={0}
          sizes='100vw'
          className='h-10 w-auto'
          priority
        />
      </HeaderLeft>

      <HeaderRight>
        <div className='flex items-center space-x-2 text-sm text-text-secondary'>
          <User className='h-4 w-4' />
          <span>Welcome back, {userName || ''}!</span>
        </div>
        <Button variant='soft-secondary' size='sm' onClick={handleSignout}>
          <LogOut className='h-4 w-4 mr-0 sm:mr-2' />
          <span className='hidden sm:inline'>Logout</span>
        </Button>
      </HeaderRight>
    </BaseHeader>
  );
};

export default Header;
