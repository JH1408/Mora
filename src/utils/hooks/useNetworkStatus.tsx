import { useEffect } from 'react';

import { WifiOff, Wifi } from 'lucide-react';
import { toast } from 'sonner';

export const useNetworkStatus = () => {
  useEffect(() => {
    const setOnline = () => {
      toast('You are back online', {
        icon: <Wifi className='w-4 h-4 mr-2 ml-4' />,
        className: 'toast-online',
      });
    };

    const setOffline = () => {
      toast("You are offline. We can't save your progress.", {
        icon: <WifiOff className='w-4 h-4 mr-2' />,
        className: 'toast-offline',
      });
    };

    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);
};
