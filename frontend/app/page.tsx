import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';

// Sample services for the preview
const featuredServices = [
  {
    id: '1',
    name: 'Powder Brows',
    description: 'Soft, filled-in, makeup-like look that enhances your natural brow shape.',
    price: 380,
    touchUpPrice: 150,
    duration: 120,
    imageUrl: '',
  },
  {
    id: '2',
    name: 'Microblading',
    description: 'Hair-like strokes for natural-looking fuller brows.',
    price: 450,
    touchUpPrice: 100,
    duration: 150,
    imageUrl: '',
  },
  {
    id: '3',
    name: 'Lip Blushing',
    description: 'Enhances lip color, symmetry, and fullness for a natural flush.',
    price: 400,
    touchUpPrice: 125,
    duration: 120,
    imageUrl: '',
  },
];

export default function Home() {
  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="container-main py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6">
          Enhance Your Natural Beauty
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8">
          Professional permanent makeup services to give you confidence and save time every day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/booking" className="btn-primary">
            Book Now
          </Link>
          <Link href="/services" className="btn-secondary">
            View Services
          </Link>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="container-main py-16">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Services</h2>
          <p className="text-muted max-w-xl mx-auto">
            Discover our range of professional permanent makeup services designed to enhance your natural features.
          </p>
        </div>

        <div className="services-grid">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/services" className="btn-secondary">
            View All Services
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="container-main text-center">
          <h2 className="section-title">Ready to Transform Your Look?</h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            Book your consultation today and take the first step towards effortless beauty.
          </p>
          <Link href="/booking" className="btn-primary text-lg px-8 py-4">
            Schedule Your Appointment
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container-main py-16">
        <h2 className="section-title text-center">Why Choose CreativeMicroInk?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="card text-center">
            <div className="w-16 h-16 bg-rose-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-rose-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-dark mb-2">Expert Technique</h3>
            <p className="text-muted text-sm">
              Years of experience delivering beautiful, natural-looking results.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-rose-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-rose-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-dark mb-2">Save Time Daily</h3>
            <p className="text-muted text-sm">
              Wake up with perfect brows and lips every single day.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-rose-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-rose-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-dark mb-2">Safe & Hygienic</h3>
            <p className="text-muted text-sm">
              Highest standards of cleanliness and safety for your peace of mind.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
