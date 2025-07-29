import Spinner from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center'>
      <div className='text-center'>
        <Spinner className='mx-auto mb-4' />
      </div>
    </div>
  );
}
