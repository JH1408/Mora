import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='text-center'>
        <div className='mb-16 flex justify-center'>
          <Link href='/'>
            <Image
              src='/images/mora_logo.png'
              alt='Mora Logo'
              width={200}
              height={200}
              className='h-20 w-auto'
            />
          </Link>
        </div>
        <h1 className='text-4xl font-bold mb-4'>404</h1>
        <p className='text-xl text-gray-600 mb-4'>
          Oops! We couldn&apos;t find that page.
        </p>
        <Link
          href='/'
          className='text-lg text-accent-600  hover:text-accent-700 underline'
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
