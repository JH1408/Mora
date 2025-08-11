import LogoLink from '../../components/logo-link';
import Footer from '../_home/footer';

const PrivacyPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-100 to-accent-100'>
      <LogoLink />

      <div className='px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-4xl mx-auto space-y-8'>
        <section className='text-center'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-hero mb-6 sm:mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent leading-tight pb-2'>
            Privacy Policy
          </h1>
          <p className='text-lg text-muted-foreground mb-8'>
            Last updated: August 11, 2025
          </p>
        </section>

        <div className='prose prose-lg max-w-none text-text-primary space-y-8'>
          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Introduction
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              Mora (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, and safeguard your information when you use
              our language learning application.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              By using Mora, you agree to the collection and use of information
              in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Information We Collect
            </h2>

            <h3 className='text-xl font-medium text-text-primary mb-3'>
              Account Information
            </h3>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              When you create an account using Google Sign-In, we collect:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2 mb-6'>
              <li>Email address (from your Google account)</li>
              <li>Display name (from your Google account)</li>
              <li>Profile picture (from your Google account, optional)</li>
            </ul>

            <h3 className='text-xl font-medium text-text-primary mb-3'>
              Learning Data
            </h3>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              We collect data related to your learning activities:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2 mb-6'>
              <li>Flashcards you create and study</li>
              <li>Study progress and performance metrics</li>
              <li>Handwriting data (if you use handwriting features)</li>
            </ul>

            <h3 className='text-xl font-medium text-text-primary mb-3'>
              Usage Information
            </h3>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              We automatically collect certain information about your use of the
              app:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
              <li>Device information and browser type</li>
              <li>Usage patterns and study sessions</li>
              <li>App performance and error logs</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              How We Use Your Information
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              We use the collected information to:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2 mb-6'>
              <li>Provide and maintain the Mora service</li>
              <li>Personalize your learning experience</li>
              <li>Track your progress and provide spaced repetition</li>
              <li>Improve our app and develop new features</li>
              <li>Provide customer support</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Data Security
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              We implement appropriate security measures to protect your
              personal information:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2 mb-6'>
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication and authorization</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal data on a need-to-know basis</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Data Sharing
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information only in the following
              circumstances:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2 mb-6'>
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>
                With service providers who assist in operating our app (under
                strict confidentiality agreements)
              </li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Cookies
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              We use cookies to maintain your authentication session and improve
              your experience:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2 mb-6'>
              <li>
                <strong>Session Cookies:</strong> NextAuth.js uses HTTP-only
                cookies to maintain your login state and authentication session
              </li>
              <li>
                <strong>Duration:</strong> Session cookies expire after 7 days
                of inactivity
              </li>
              <li>
                <strong>Purpose:</strong> Authentication and session management
                only
              </li>
              <li>
                <strong>Third-party:</strong> No third-party cookies are used
              </li>
            </ul>
            <p className='text-muted-foreground leading-relaxed'>
              You can control cookies through your browser settings, though
              disabling session cookies will prevent you from staying logged in
              to the application.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Data Processors
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              We use the following third-party services to process your data:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2 mb-6'>
              <li>
                <strong>Google</strong> - For user authentication via Google
                Sign-In. Google processes your email address, display name, and
                profile picture to authenticate your account. Data is processed
                in the United States and other countries where Google operates.
                Please review{' '}
                <a
                  href='https://policies.google.com/privacy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary-600 hover:text-primary-700 underline'
                >
                  Google&apos;s Privacy Policy
                </a>{' '}
                for more information about how they handle your data.
              </li>
              <li>
                <strong>Google Fonts</strong> - For serving web fonts (Playfair
                Display, Poppins, Dancing Script, etc.). Google Fonts may
                collect your IP address and browser information to serve fonts
                efficiently. Data is processed in the United States and other
                countries where Google operates. Please review{' '}
                <a
                  href='https://policies.google.com/privacy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary-600 hover:text-primary-700 underline'
                >
                  Google&apos;s Privacy Policy
                </a>{' '}
                for more information.
              </li>
              <li>
                <strong>Vercel</strong> - For hosting and serving our
                application. Vercel processes your IP address and usage data to
                provide hosting services. Data is processed in the United States
                and other countries where Vercel operates. Please review{' '}
                <a
                  href='https://vercel.com/legal/privacy-policy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary-600 hover:text-primary-700 underline'
                >
                  Vercel&apos;s Privacy Policy
                </a>{' '}
                for more information.
              </li>
              <li>
                <strong>Vercel Analytics</strong> - For website analytics and
                performance monitoring. Vercel Analytics collects anonymous
                usage data including page views, performance metrics, and user
                interactions to help us improve the application. Data is
                processed in the United States and other countries where Vercel
                operates. Please review{' '}
                <a
                  href='https://vercel.com/legal/privacy-policy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary-600 hover:text-primary-700 underline'
                >
                  Vercel&apos;s Privacy Policy
                </a>{' '}
                for more information.
              </li>
              <li>
                <strong>Neon Database</strong> - For storing your account
                information, flashcards, study progress, and learning data in a
                PostgreSQL database. Neon processes your data in the United
                States and other countries where Neon operates. Please review{' '}
                <a
                  href='https://neon.tech/legal/privacy-policy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary-600 hover:text-primary-700 underline'
                >
                  Neon&apos;s Privacy Policy
                </a>{' '}
                for more information.
              </li>
              <li>
                <strong>GitHub</strong> - For hosting our source code and
                version control. GitHub may process metadata about our codebase
                and development activities. Please review{' '}
                <a
                  href='https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary-600 hover:text-primary-700 underline'
                >
                  GitHub&apos;s Privacy Statement
                </a>{' '}
                for more information.
              </li>
            </ul>
            <p className='text-muted-foreground leading-relaxed'>
              These processors are bound by contractual obligations to protect
              your data and may only process it as instructed by us.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Your Rights
            </h2>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              You have the right to:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2 mb-6'>
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Export your learning data</li>
              <li>Opt out of certain communications</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed'>
              To exercise these rights, please contact us at{' '}
              <a
                href='mailto:hello@usemora.co'
                className='text-primary-600 hover:text-primary-700 underline'
              >
                hello@usemora.co
              </a>
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Data Retention
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              We retain your personal information for as long as your account is
              active or as needed to provide you services. If you delete your
              account, we will delete your personal data within 30 days, except
              where we are required to retain it for legal or regulatory
              purposes.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Children&apos;s Privacy
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              Mora is not intended for children under 13 years of age. We do not
              knowingly collect personal information from children under 13. If
              you are a parent or guardian and believe your child has provided
              us with personal information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Changes to This Policy
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the &ldquo;Last updated&rdquo; date. We
              encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-text-primary mb-4'>
              Contact Us
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              If you have any questions about this Privacy Policy, please
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

export default PrivacyPage;
