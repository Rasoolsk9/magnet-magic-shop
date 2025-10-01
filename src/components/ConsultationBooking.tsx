import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ConsultationBooking() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*New Consultation Request*\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nEvent Type: ${formData.eventType}\nMessage: ${formData.message}`;
    
    window.open(`https://wa.me/917993909809?text=${encodeURIComponent(message)}`, '_blank');
    
    toast({
      title: "Consultation request sent!",
      description: "We'll get back to you shortly on WhatsApp.",
    });
    
    setIsOpen(false);
    setFormData({ name: '', phone: '', email: '', eventType: '', message: '' });
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <Button
          variant="hero"
          size="lg"
          className="rounded-full shadow-2xl animate-pulse"
          onClick={() => setIsOpen(true)}
        >
          <Calendar className="w-5 h-5" />
          Schedule Consultation
        </Button>
        
        <Button
          variant="magnetic"
          size="lg"
          className="rounded-full shadow-2xl"
          onClick={() => window.open('https://wa.me/917993909809', '_blank')}
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp Us
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Schedule a Consultation</DialogTitle>
            <DialogDescription>
              Fill in your details and we'll contact you on WhatsApp
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type *</Label>
              <Input
                id="eventType"
                placeholder="Wedding, Birthday, Corporate, etc."
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Details</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
              />
            </div>

            <Button type="submit" variant="hero" className="w-full" size="lg">
              Send via WhatsApp
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
