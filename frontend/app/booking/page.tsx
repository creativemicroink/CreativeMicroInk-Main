import Link from 'next/link';

export default function BookingPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="container-main py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-dark mb-4">Book an Appointment</h1>
          <p className="text-muted max-w-2xl mx-auto">
            Select a service and choose a convenient time for your appointment.
            We look forward to enhancing your natural beauty!
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-rose-accent mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-dark">Flexible Scheduling</h3>
            <p className="text-sm text-muted mt-1">Choose from available time slots</p>
          </div>

          <div className="card text-center">
            <div className="text-rose-accent mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-dark">Instant Confirmation</h3>
            <p className="text-sm text-muted mt-1">Receive immediate booking confirmation</p>
          </div>

          <div className="card text-center">
            <div className="text-rose-accent mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-dark">Secure Payment</h3>
            <p className="text-sm text-muted mt-1">Powered by Square for security</p>
          </div>
        </div>

        {/* Booking Widget */}
        <div className="card p-0 overflow-hidden">
          <div className="bg-dark text-white px-6 py-4">
            <h2 className="text-lg font-semibold">Schedule Your Appointment</h2>
            <p className="text-sm text-gray-300">Select a service to view available times</p>
          </div>
          <div className="bg-white">
            <iframe
              src="https://app.squareup.com/appointments/book/mqg2qbsbetp3qk/LNT7960JWJJ0Z/start"
              title="Book an Appointment"
              className="booking-iframe"
              allow="payment"
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="font-semibold text-lg text-dark mb-4">Cancellation Policy</h3>
            <p className="text-muted text-sm leading-relaxed">
              We understand that plans can change. Please provide at least 24 hours notice
              for any cancellations or rescheduling. Late cancellations or no-shows may be
              subject to a fee.
            </p>
          </div>

          <div className="card">
            <h3 className="font-semibold text-lg text-dark mb-4">What to Expect</h3>
            <p className="text-muted text-sm leading-relaxed">
              Your appointment will begin with a consultation to discuss your desired look.
              We will customize the treatment to complement your unique features and preferences.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-muted mb-4">
            Have questions before booking? We are happy to help!
          </p>
          <Link href="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
