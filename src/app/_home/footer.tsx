import Image from 'next/image';
import Link from 'next/link';

import { StaticButton } from '@/components/ui/button';

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

const supportLinks = [
  { href: 'mailto:hello@usemora.co', label: 'Contact Us' },
  {
    href: 'mailto:hello@usemora.co?subject=Feature Request',
    label: 'Request a Feature',
  },
];

const renderLinkList = (links: Array<{ href: string; label: string }>) => (
  <ul className='space-y-3'>
    {links.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          className='text-muted-foreground hover:text-primary-500 transition-colors duration-200'
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
);

const Footer = () => {
  return (
    <div className='px-4 sm:px-6 lg:px-8 pb-4'>
      <footer className='bg-gradient-to-br from-primary-50 to-accent-50 rounded-md shadow-md'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12'>
            <div className='md:col-span-2'>
              <div className='flex items-center mb-4'>
                <Image
                  src='/images/mora_logo.png'
                  alt='Mora Logo'
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='h-8 w-auto'
                />
              </div>
              <p className='text-muted-foreground mb-6 max-w-md leading-relaxed'>
                Built by language learners, for language learners. Mora helps
                you master new languages through handwriting, audio, and spaced
                repetition.
              </p>
              <div className='flex space-x-4'>
                <Link href='/signup'>
                  <StaticButton
                    variant='gradient'
                    size='sm'
                    className='text-sm px-6 py-2 rounded-lg'
                  >
                    Get Started
                  </StaticButton>
                </Link>
              </div>
            </div>

            <div>
              <h3 className='font-semibold text-text-primary mb-4'>Support</h3>
              {renderLinkList(supportLinks)}
            </div>

            <div>
              <h3 className='font-semibold text-text-primary mb-4'>Company</h3>
              {renderLinkList(companyLinks)}
            </div>
          </div>

          <div className='border-t border-primary-100 mt-12 pt-8'>
            <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
              <div className='flex items-center space-x-6 text-sm text-muted-foreground'>
                <span>&copy; 2025 Mora</span>
              </div>

              <div className='flex items-center space-x-4'>
                <span className='text-sm text-muted-foreground'>
                  Made with 💜 by language learners
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
