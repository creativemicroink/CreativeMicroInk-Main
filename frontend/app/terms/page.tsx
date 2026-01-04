'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="bg-cream min-h-screen pt-24">
      <div className="container-main py-12 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold text-dark mb-8">Terms of Service</h1>
        <p className="text-muted mb-8">Last updated: January 2026</p>

        <div className="prose prose-lg max-w-none text-dark space-y-8">
          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted leading-relaxed">
              By accessing and using the services provided by CreativeMicroInk (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
              you agree to be bound by these Terms of Service. If you do not agree to these terms,
              please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">2. Services Description</h2>
            <p className="text-muted leading-relaxed">
              CreativeMicroInk provides permanent makeup services including but not limited to microblading,
              powder brows, ombre brows, lip blushing, and lash enhancement. These are cosmetic tattoo procedures
              that involve the implantation of pigment into the skin.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">3. Health & Safety Acknowledgment</h2>
            <p className="text-muted leading-relaxed mb-4">
              Permanent makeup procedures carry inherent risks. By booking an appointment, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 text-muted space-y-2">
              <li>You will disclose all relevant medical conditions, allergies, and medications during consultation</li>
              <li>You understand that results may vary based on individual skin type, lifestyle, and healing process</li>
              <li>You are not pregnant or nursing</li>
              <li>You do not have any skin conditions in the treatment area</li>
              <li>You have not had Botox or fillers in the treatment area within the past 2 weeks</li>
              <li>You are not currently undergoing chemotherapy or radiation treatment</li>
              <li>You do not have diabetes, bleeding disorders, or autoimmune conditions without medical clearance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">4. Results Disclaimer</h2>
            <p className="text-muted leading-relaxed">
              Individual results vary significantly based on skin type, skin condition, age, lifestyle factors,
              and adherence to aftercare instructions. We do not guarantee specific results. The final appearance
              of permanent makeup may differ from initial expectations and typically requires a touch-up appointment
              4-8 weeks after the initial procedure for optimal results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">5. Consultation Requirements</h2>
            <p className="text-muted leading-relaxed">
              A consultation is required before any permanent makeup procedure. During consultation, we will
              discuss your desired outcome, assess your skin, review your medical history, and determine if
              you are a suitable candidate for the procedure. We reserve the right to refuse service if we
              determine it is not in your best interest.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">6. Cancellation & Refund Policy</h2>
            <p className="text-muted leading-relaxed mb-4">
              Please provide at least 48 hours notice for cancellations or rescheduling. Deposits are
              non-refundable but may be applied to a rescheduled appointment within 30 days.
              No-shows forfeit their deposit. Refunds are not provided for completed procedures.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">7. Aftercare Responsibility</h2>
            <p className="text-muted leading-relaxed">
              Proper aftercare is essential for optimal results. You are responsible for following all
              aftercare instructions provided. Failure to follow aftercare instructions may result in
              poor healing, infection, or unsatisfactory results for which we cannot be held responsible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">8. Photo & Image Disclaimer</h2>
            <p className="text-muted leading-relaxed">
              Some images displayed on this website are stock photographs used for illustrative purposes
              and may not represent actual clients or results from our services. Before and after photos,
              when available, represent individual results and should not be considered a guarantee of
              similar outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">9. Photo Release</h2>
            <p className="text-muted leading-relaxed">
              With your written consent, we may photograph your procedure results for our portfolio,
              website, and social media. You may opt out of photo documentation at any time.
              Photos will not be used without your explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">10. Liability Limitation</h2>
            <p className="text-muted leading-relaxed">
              To the fullest extent permitted by law, CreativeMicroInk shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from or related
              to the use of our services. Our total liability shall not exceed the amount paid for the
              specific service in question.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">11. Modifications to Terms</h2>
            <p className="text-muted leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately
              upon posting to this website. Your continued use of our services constitutes acceptance of
              any modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-semibold text-dark mb-4">12. Contact Information</h2>
            <p className="text-muted leading-relaxed">
              For questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:Creativemicroink@gmail.com" className="text-gold hover:text-gold-dark">
                Creativemicroink@gmail.com
              </a>{' '}
              or call{' '}
              <a href="tel:7189545525" className="text-gold hover:text-gold-dark">
                (718) 954-5525
              </a>.
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
