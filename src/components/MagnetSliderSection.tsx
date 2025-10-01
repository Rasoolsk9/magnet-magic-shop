import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const thickMagnets = [
  'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
];

const thinMagnets = [
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
];

export function MagnetSliderSection() {
  const topSliderRef = useRef<HTMLDivElement>(null);
  const bottomSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topSlider = topSliderRef.current;
    const bottomSlider = bottomSliderRef.current;
    
    if (topSlider) {
      const scrollHeight = topSlider.scrollHeight / 2;
      topSlider.scrollTop = scrollHeight;
      
      let scrollTop = scrollHeight;
      const scrollInterval = setInterval(() => {
        scrollTop -= 1;
        if (scrollTop <= 0) scrollTop = scrollHeight;
        topSlider.scrollTop = scrollTop;
      }, 30);
      
      return () => clearInterval(scrollInterval);
    }
  }, []);

  useEffect(() => {
    const bottomSlider = bottomSliderRef.current;
    
    if (bottomSlider) {
      let scrollTop = 0;
      const scrollInterval = setInterval(() => {
        scrollTop += 1;
        if (scrollTop >= bottomSlider.scrollHeight / 2) scrollTop = 0;
        bottomSlider.scrollTop = scrollTop;
      }, 30);
      
      return () => clearInterval(scrollInterval);
    }
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Top Slider - Moving Up */}
          <div className="relative h-[500px] overflow-hidden rounded-2xl">
            <div 
              ref={topSliderRef}
              className="h-full overflow-y-scroll scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="space-y-4 pb-4">
                {[...thickMagnets, ...thickMagnets].map((img, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden glass-card">
                    <img 
                      src={img} 
                      alt={`Thick magnet ${idx + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <span className="text-white font-semibold">Thick Magnet</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle - Pricing Info */}
          <div className="text-center space-y-6 px-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Custom <span className="gradient-text">Rectangle Magnets</span>
            </h2>
            
            <div className="space-y-4">
              <div className="glass-card p-6 space-y-2">
                <h3 className="text-xl font-bold gradient-text">Thick Magnets</h3>
                <p className="text-2xl font-bold">₹299</p>
                <p className="text-sm text-muted-foreground">Min 3 magnets • ₹70 each</p>
              </div>
              
              <div className="glass-card p-6 space-y-2">
                <h3 className="text-xl font-bold gradient-text">Thin Magnets</h3>
                <p className="text-2xl font-bold">₹199</p>
                <p className="text-sm text-muted-foreground">Min 3 magnets • ₹50 each</p>
              </div>
            </div>

            <Button variant="hero" size="xl" className="group">
              Order Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Bottom Slider - Moving Down */}
          <div className="relative h-[500px] overflow-hidden rounded-2xl">
            <div 
              ref={bottomSliderRef}
              className="h-full overflow-y-scroll scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="space-y-4 pb-4">
                {[...thinMagnets, ...thinMagnets].map((img, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden glass-card">
                    <img 
                      src={img} 
                      alt={`Thin magnet ${idx + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <span className="text-white font-semibold">Thin Magnet</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
