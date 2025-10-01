import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image?: string;
  onCustomize: () => void;
}

export function ProductCard({ name, description, price, image, onCustomize }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 glass-card">
      <CardHeader>
        <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 mb-4 overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transition-opacity duration-300" 
              loading="lazy"
              decoding="async"
              onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
              style={{ opacity: 0 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent animate-float" />
            </div>
          )}
        </div>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold gradient-text">₹{price}</span>
          <span className="text-sm text-muted-foreground">per magnet</span>
        </div>
      </CardContent>
      
      <CardFooter className="gap-2">
        <Button
          onClick={onCustomize}
          variant="hero"
          className="flex-1"
        >
          Customize
        </Button>
        <Button variant="outline" size="icon" className="btn-magnetic">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
