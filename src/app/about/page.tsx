import LogoLink from '../../components/logo-link';
import Footer from '../_home/footer';

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className='text-xl leading-relaxed text-text-primary mb-6'>{children}</p>
);

const AboutPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-100 to-accent-100'>
      <LogoLink />

      <div className='px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-4xl mx-auto space-y-16 sm:space-y-18'>
        <section className='text-center'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-hero mb-6 sm:mb-18 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent'>
            About Mora
          </h1>

          <div className='max-w-4xl mx-auto text-justify'>
            <p className='text-2xl leading-relaxed text-text-primary mb-8'>
              Hi, I&apos;m Josy 👋
            </p>
            <Paragraph>
              Earlier this year (2025), I started learning Thai. To remember
              vocabulary, I was searching for a simple-to-use flashcard app, but
              everything I found was difficult to use, clunky, or didn’t have
              the features I needed.
            </Paragraph>

            <Paragraph>
              So I decided to build my own tool with the features I needed:{' '}
              <span className='font-semibold text-text-primary'>
                handwriting support
              </span>{' '}
              (since I wasn’t learning Thai script yet but used phonetic
              spelling with letters not on my keyboard),{' '}
              <span className='font-semibold text-text-primary'>
                audio output
              </span>{' '}
              (since Thai is a tonal language), and{' '}
              <span className='font-semibold text-text-primary'>
                spaced repetition
              </span>{' '}
              with front-to-back and back-to-front study modes.
            </Paragraph>

            <Paragraph>
              I figured if I was struggling to find the right tool, others might
              be too, so I made Mora to be something that’s easy to use and
              works the way language learners actually learn.
            </Paragraph>

            <Paragraph>
              Mora is still evolving, and I’d love to hear how you’re using it
              or what features would help you learn better.
            </Paragraph>

            <Paragraph>
              Thanks for trying Mora! I hope it makes your language learning
              journey a little easier and a lot more enjoyable. 💜
            </Paragraph>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
