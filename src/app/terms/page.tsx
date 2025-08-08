import LogoLink from '../../components/logo-link';
import Footer from '../_home/footer';

const TermsPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-100 to-accent-100'>
      <LogoLink />

      <div className='px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-4xl mx-auto space-y-8'>
        <section className='text-center'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-hero mb-6 sm:mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent'>
            Terms of Service
          </h1>
          <p className='text-lg text-muted-foreground mb-8'>
            Last updated: August 7, 2025
          </p>
        </section>

        <div className='prose prose-lg max-w-none text-text-primary space-y-8'>
          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Agreement to Terms
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of
              Mora, a language learning application operated by Josy Hartig
              (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;).
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              By accessing or using Mora, you agree to be bound by these Terms.
              If you disagree with any part of these terms, you may not access
              the service.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Description of Service
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              Mora is a flashcard application designed to help users learn
              languages through:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2 mb-6'>
              <li>Creating and studying flashcards</li>
              <li>Handwriting input for phonetic spelling and symbols</li>
              <li>Audio output for pronunciation</li>
              <li>Spaced repetition algorithms</li>
              <li>Progress tracking and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              User Accounts
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              To use certain features of Mora, you must create an account. You
              are responsible for:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2 mb-6'>
              <li>
                Maintaining the confidentiality of your account credentials
              </li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed'>
              You must be at least 13 years old to create an account.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Acceptable Use
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              You agree to use Mora only for lawful purposes and in accordance
              with these Terms. You agree not to:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2 mb-6'>
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>
                Upload or transmit harmful, offensive, or inappropriate content
              </li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Use automated systems to access the service</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              User Content
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              You retain ownership of the content you create in Mora
              (flashcards, notes, etc.). By using the service, you grant us a
              license to:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2 mb-6'>
              <li>Store and process your content to provide the service</li>
              <li>Use your content to improve our algorithms and features</li>
              <li>Back up your content for data protection</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed'>
              You are responsible for ensuring you have the right to use any
              content you upload.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Intellectual Property
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              Mora and its original content, features, and functionality are
              owned by Josy Hartig and are protected by international copyright,
              trademark, patent, trade secret, and other intellectual property
              laws.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              You may not copy, modify, distribute, sell, or lease any part of
              our service without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Privacy
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              Your privacy is important to us. Please review our Privacy Policy,
              which also governs your use of the service, to understand our
              practices.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Service Availability
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              We strive to provide a reliable service, but we do not guarantee
              that Mora will be available at all times. We may:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2 mb-6'>
              <li>Suspend or discontinue the service temporarily</li>
              <li>Perform maintenance and updates</li>
              <li>Modify or discontinue features</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed'>
              We will provide reasonable notice for planned maintenance and
              updates.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Limitation of Liability
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              To the maximum extent permitted by law, we shall not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages, including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Our total liability to you for any claims arising from your use of
              Mora shall not exceed the amount you paid us, if any, in the 12
              months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Disclaimer of Warranties
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              Mora is provided &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; without any warranties of any kind, either
              express or implied, including but not limited to:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2 mb-6'>
              <li>
                Warranties of merchantability or fitness for a particular
                purpose
              </li>
              <li>
                Warranties that the service will be uninterrupted or error-free
              </li>
              <li>
                Warranties regarding the accuracy or reliability of any
                information
              </li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Termination
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              We may terminate or suspend your account and access to Mora
              immediately, without prior notice, for any reason, including if
              you breach these Terms.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Upon termination, your right to use the service will cease
              immediately, and we may delete your account and data in accordance
              with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Governing Law
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction where Josy Hartig operates, without
              regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Changes to Terms
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              We reserve the right to modify these Terms at any time. We will
              notify users of any material changes by posting the new Terms on
              this page and updating the &ldquo;Last updated&rdquo; date. Your
              continued use of Mora after such modifications constitutes
              acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Contact Information
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              If you have any questions about these Terms of Service, please
              contact us at{' '}
              <a
                href='mailto:hello@usemora.co'
                className='text-primary-600 hover:text-primary-700 underline'
              >
                hello@usemora.co
              </a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;
