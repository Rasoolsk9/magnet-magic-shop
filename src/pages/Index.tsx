import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductGallery } from '@/components/ProductGallery';
import { EventBooking } from '@/components/EventBooking';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <div id="products">
          <ProductGallery />
        </div>
        <div id="events">
          <EventBooking />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-12 px-4 mt-20">
        <div className="container mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
            <span className="font-bold text-xl gradient-text">MagnetCraft</span>
          </div>
          <p className="text-muted-foreground">
            Making memories magnetic, one design at a time
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 MagnetCraft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
