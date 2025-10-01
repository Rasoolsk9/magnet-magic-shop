import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const packages = {
  thick: [
    { magnets: 150, price: 19999 },
    { magnets: 300, price: 35000 },
    { magnets: 500, price: 49999 },
  ],
  thin: [
    { magnets: 150, price: 15000 },
    { magnets: 300, price: 25000 },
    { magnets: 500, price: 40000 },
  ],
};

const features = [
  'Customized magnets with live photo capture',
  'Live magnet making on-site',
  'Professional photographer included',
  'Instant delivery at event',
  'Custom branding available',
];

export function LiveStallPackages() {
  const handleBookStall = (type: string, pkg: { magnets: number; price: number }) => {
    const message = `Hi! I want to book a Live Magnet Stall:\n\nType: ${type === 'thick' ? 'Thick' : 'Thin'} Magnets\nPackage: ${pkg.magnets} magnets\nPrice: ₹${pkg.price.toLocaleString('en-IN')}\n\nPlease share more details.`;
    window.open(`https://wa.me/917993909809?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Live Magnet <span className="gradient-text">Stall Packages</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Make your event memorable with our live magnet-making experience
          </p>
        </div>

        {/* Thick Magnets Packages */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 gradient-text">
            Thick Rectangle Magnets
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.thick.map((pkg, idx) => (
              <div key={idx} className="glass-card p-8 space-y-6 hover:scale-105 transition-transform">
                <div className="text-center space-y-2">
                  <p className="text-5xl font-bold gradient-text">{pkg.magnets}</p>
                  <p className="text-muted-foreground">Magnets</p>
                </div>
                
                <div className="text-center">
                  <p className="text-3xl font-bold">₹{pkg.price.toLocaleString('en-IN')}</p>
                </div>

                <div className="space-y-3">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => handleBookStall('thick', pkg)}
                >
                  Book Now
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Thin Magnets Packages */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-8 gradient-text">
            Thin Rectangle Magnets
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.thin.map((pkg, idx) => (
              <div key={idx} className="glass-card p-8 space-y-6 hover:scale-105 transition-transform">
                <div className="text-center space-y-2">
                  <p className="text-5xl font-bold gradient-text">{pkg.magnets}</p>
                  <p className="text-muted-foreground">Magnets</p>
                </div>
                
                <div className="text-center">
                  <p className="text-3xl font-bold">₹{pkg.price.toLocaleString('en-IN')}</p>
                </div>

                <div className="space-y-3">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => handleBookStall('thin', pkg)}
                >
                  Book Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
