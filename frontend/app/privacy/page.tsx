'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="bg-cream min-h-screen pt-24">
      <div className="container-main py-12 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold text-dark mb-8">Privacy Policy</h1>
        <p className="text-muted mb-8">Last updated: January 2026</p>

        <div className="prose prose-lg max-w-none text-dark space-y-8">
          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">1. Introduction</h2>
            <p className="text-muted leading-relaxed">
              CreativeMicroInk (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed
              to protecting your personal information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">2. Information We Collect</h2>
            <p className="text-muted leading-relaxed mb-4">We may collect the following types of information:</p>

            <h3 className="text-xl font-semibold text-dark mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 text-muted space-y-2 mb-4">
              <li>Name, email address, phone number</li>
              <li>Mailing address</li>
              <li>Date of birth</li>
              <li>Payment information (processed securely through third-party providers)</li>
            </ul>

            <h3 className="text-xl font-semibold text-dark mb-2">Health Information</h3>
            <ul className="list-disc pl-6 text-muted space-y-2 mb-4">
              <li>Medical history relevant to cosmetic procedures</li>
              <li>Allergies and sensitivities</li>
              <li>Current medications</li>
              <li>Skin conditions</li>
            </ul>

            <h3 className="text-xl font-semibold text-dark mb-2">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-muted space-y-2">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address</li>
              <li>Pages visited and time spent on our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">3. How We Use Your Information</h2>
            <p className="text-muted leading-relaxed mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-muted space-y-2">
              <li>Schedule and manage appointments</li>
              <li>Provide safe and appropriate cosmetic services</li>
              <li>Process payments</li>
              <li>Communicate with you about appointments and services</li>
              <li>Send promotional materials (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">4. Protection of Health Information</h2>
            <p className="text-muted leading-relaxed">
              We treat your health information with the utmost confidentiality. Health information
              collected during consultations is used solely for the purpose of providing safe
              cosmetic services and is not shared with third parties except as required by law
              or with your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">5. Information Sharing</h2>
            <p className="text-muted leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share
              your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-muted space-y-2">
              <li>With service providers who assist in our operations (e.g., payment processors, booking systems)</li>
              <li>When required by law or to respond to legal process</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">6. Photos and Images</h2>
            <p className="text-muted leading-relaxed">
              Before and after photos are taken only with your explicit written consent. These photos
              may be used for our portfolio, website, and social media marketing. You have the right
              to request that your photos not be used or be removed at any time. Photos are stored
              securely and are not shared with third parties without your permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">7. Data Security</h2>
            <p className="text-muted leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction. However,
              no method of transmission over the Internet or electronic storage is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">8. Data Retention</h2>
            <p className="text-muted leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes
              outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and
              enforce our agreements. Client records related to procedures are retained for a minimum
              of 7 years as required for cosmetic service providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">9. Your Rights</h2>
            <p className="text-muted leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-muted space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal retention requirements)</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent for photo usage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">10. Cookies and Tracking</h2>
            <p className="text-muted leading-relaxed">
              Our website may use cookies and similar tracking technologies to enhance your browsing
              experience. You can set your browser to refuse cookies, but this may limit some features
              of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">11. Third-Party Links</h2>
            <p className="text-muted leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the
              privacy practices of these external sites. We encourage you to review the privacy
              policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">12. Children&apos;s Privacy</h2>
            <p className="text-muted leading-relaxed">
              Our services are not intended for individuals under 18 years of age. We do not knowingly
              collect personal information from minors. Services for individuals under 18 require
              parental or guardian consent and presence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">13. Changes to This Policy</h2>
            <p className="text-muted leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated revision date. Your continued use of our services after any
              changes indicates your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">14. Contact Us</h2>
            <p className="text-muted leading-relaxed">
              If you have questions about this Privacy Policy or wish to exercise your rights,
              please contact us at:{' '}
              <a href="mailto:Creativemicroink@gmail.com" className="text-gold hover:text-gold-dark">
                Creativemicroink@gmail.com
              </a>{' '}
              or call{' '}
              <a href="tel:7189545525" className="text-gold hover:text-gold-dark">
                (718) 954-5525
              </a>.
            </p>
            <p className="text-muted leading-relaxed mt-4">
              <strong>Mailing Address:</strong><br />
              CreativeMicroInk<br />
              1612 W Waters Ave Suite #103<br />
              Tampa, FL 33604
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-cream-300">
          <Link href="/" className="text-gold hover:text-gold-dark font-medium">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
