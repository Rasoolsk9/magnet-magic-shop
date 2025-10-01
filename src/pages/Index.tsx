import { lazy, Suspense, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { useLocation } from 'react-router-dom';

// Lazy load components with named exports
const Hero = lazy(() => 
  import('@/components/Hero').then(module => ({ default: module.Hero }))
);
const ProductGallery = lazy(() => 
  import('@/components/ProductGallery').then(module => ({ default: module.ProductGallery }))
);
const EventBooking = lazy(() => 
  import('@/components/EventBooking').then(module => ({ default: module.EventBooking })));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

import ErrorBoundary from '@/components/ErrorBoundary';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const navHeight = 64; // Height of the navbar
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="mb-24">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Hero />
            </Suspense>
          </ErrorBoundary>
        </section>

        {/* Products Section */}
        <section id="products" className="scroll-mt-24 mb-24">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <ProductGallery />
            </Suspense>
          </ErrorBoundary>
        </section>

        {/* Events Section */}
        <section id="events" className="scroll-mt-24 mb-24">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <EventBooking />
            </Suspense>
          </ErrorBoundary>
        </section>

        {/* About Section */}
        <section id="about" className="scroll-mt-24 mb-24">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <div className="container mx-auto max-w-5xl px-4 py-16 space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center">About MagnetCraft</h2>
                <div className="prose prose-lg dark:prose-invert mx-auto">
                  <p className="text-muted-foreground">
                    We transform your memories into beautiful custom magnets using premium materials and modern 3D design.
                    From fridge art to event souvenirs, our designs are crafted to last and made with love.
                  </p>
                  <p className="text-muted-foreground">
                    Our team of skilled designers and craftspeople work tirelessly to ensure each magnet tells your story
                    in the most beautiful way possible. We use state-of-the-art 3D design technology and high-quality
                    materials to create magnets that will stand the test of time.
                  </p>
                </div>
              </div>
            </Suspense>
          </ErrorBoundary>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-24 mb-24">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <div className="container mx-auto max-w-5xl px-4 py-16 space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center">Contact Us</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Get in Touch</h3>
                    <p className="text-muted-foreground">
                      Have questions about our products or services? We'd love to hear from you!
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        Hyderabad, India
                      </p>
                      <p className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                        contact@QueensMagnet.com
                      </p>
                      <p className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                        </svg>
                        +91 7993909809
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Business Hours</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Monday: Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-12 px-4 mt-20">
        <div className="container mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
            <span className="font-bold text-xl gradient-text">QueensMagnet</span>
          </div>
          <p className="text-muted-foreground">
            Making memories magnetic, one design at a time
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 QueensMagnet. All rights reserved to SHARUK.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
