import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      setIsSubmitting(true);
      const sheetsWebhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
      if (!sheetsWebhookUrl) {
        throw new Error("Missing VITE_GOOGLE_SHEETS_WEBHOOK_URL");
      }
      await fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "magnet-magic-shop",
          createdAt: new Date().toISOString(),
          ...payload,
        }),
      });
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Reach out for custom orders, event bookings, or any questions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Contact Information</h2>
              <div className="space-y-4">
                <a href="tel:+919876543210" className="flex items-center space-x-4 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>+91 98765 43210</span>
                </a>
                <a href="mailto:hello@magnetcraft.com" className="flex items-center space-x-4 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>hello@magnetcraft.com</span>
                </a>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>123 Creative Lane, Mumbai, India 400001</span>
                </div>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Quick Links</h2>
              <div className="space-y-4">
                <Button variant="link" className="text-muted-foreground hover:text-primary">FAQs</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Shipping Policy</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Returns & Refunds</Button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-card p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                  <Input id="firstName" name="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                  <Input id="lastName" name="lastName" placeholder="Doe" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea 
                  id="message" 
                  name="message"
                  placeholder="Tell us about your requirements..."
                  className="min-h-[150px]"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Send Message
            </Button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}