import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const eventPackages = [
  {
    name: 'Birthday Party',
    description: 'Make your birthday unforgettable with custom magnets for all guests',
    icon: '🎂',
    features: ['50 custom magnets', 'On-site design station', '2 hours service', 'Gift packaging'],
    price: 'Starting at ₹15,000',
  },
  {
    name: 'Wedding Event',
    description: 'Beautiful wedding favors your guests will cherish forever',
    icon: '💒',
    features: ['100+ custom magnets', 'Premium design options', '4 hours service', 'Elegant packaging'],
    price: 'Starting at ₹25,000',
  },
  {
    name: 'Corporate Event',
    description: 'Brand your event with custom magnets for attendees',
    icon: '🏢',
    features: ['150+ branded magnets', 'Custom designs', 'Full day service', 'Bulk discounts'],
    price: 'Starting at ₹30,000',
  },
];

export function EventBooking() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20">
        <div className="w-96 h-96 bg-success/30 rounded-full blur-3xl absolute top-20 left-20" />
        <div className="w-96 h-96 bg-accent/30 rounded-full blur-3xl absolute bottom-20 right-20" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Book Your <span className="gradient-text">Event</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Make your special occasions memorable with our custom magnet experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {eventPackages.map((pkg, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden group hover:shadow-2xl transition-all glass-card"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform" />
              
              <CardHeader>
                <div className="text-6xl mb-4">{pkg.icon}</div>
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4 border-t">
                  <p className="text-lg font-bold gradient-text mb-4">{pkg.price}</p>
                  <Button variant="hero" className="w-full">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Info */}
        <div className="max-w-3xl mx-auto glass-card p-8 space-y-6">
          <h3 className="text-2xl font-bold text-center mb-6">Get in Touch</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">Flexible Scheduling</p>
                <p className="text-sm text-muted-foreground">Book 2 weeks in advance</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">Quick Setup</p>
                <p className="text-sm text-muted-foreground">Ready in 30 minutes</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">Any Group Size</p>
                <p className="text-sm text-muted-foreground">From 20 to 500+ guests</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold">Pan-India Service</p>
                <p className="text-sm text-muted-foreground">We come to your venue</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6 text-center">
            <Button variant="magnetic" size="xl">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
