import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const magnetImages = [
  'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=300&fit=crop',
];

export function MagnetSliderSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Custom <span className="gradient-text">Rectangle Magnets</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch your memories come to life — each magnet is crafted with care and printed with premium quality
          </p>
        </div>

        {/* First Row - Slides Left to Right */}
        <div className="relative mb-8 overflow-hidden">
          <div className="flex gap-6 animate-scroll-left hover:pause-animation">
            {[...magnetImages, ...magnetImages].map((img, idx) => (
              <div 
                key={`left-${idx}`}
                className="flex-shrink-0 w-64 h-64 rounded-2xl overflow-hidden glass-card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <img 
                  src={img} 
                  alt={`Custom magnet ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-semibold text-sm">Premium Quality</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-8 space-y-3 hover:shadow-xl transition-shadow duration-300 rounded-2xl">
              <h3 className="text-2xl font-bold gradient-text">Thick Magnets</h3>
              <p className="text-4xl font-bold">₹299</p>
              <p className="text-muted-foreground">Min 3 magnets • ₹70 each</p>
              <p className="text-sm text-muted-foreground">Premium thickness for durability</p>
            </div>
            
            <div className="glass-card p-8 space-y-3 hover:shadow-xl transition-shadow duration-300 rounded-2xl">
              <h3 className="text-2xl font-bold gradient-text">Thin Magnets</h3>
              <p className="text-4xl font-bold">₹199</p>
              <p className="text-muted-foreground">Min 3 magnets • ₹50 each</p>
              <p className="text-sm text-muted-foreground">Sleek & lightweight design</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button variant="hero" size="xl" className="group">
              Order Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Second Row - Slides Right to Left */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-scroll-right hover:pause-animation">
            {[...magnetImages, ...magnetImages].map((img, idx) => (
              <div 
                key={`right-${idx}`}
                className="flex-shrink-0 w-64 h-64 rounded-2xl overflow-hidden glass-card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <img 
                  src={img} 
                  alt={`Custom magnet ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-semibold text-sm">Your Memories</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
