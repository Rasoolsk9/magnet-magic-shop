import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomMagnet {
  id: string;
  shape: 'round' | 'rectangle' | 'heart';
  imageUrl: string;
  zoom: number;
  rotation: { x: number; y: number; z: number };
  quantity: number;
  price: number;
}

export function Cart() {
  const [cart, setCart] = useState<CustomMagnet[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadCart();
  }, [isOpen]);

  const loadCart = () => {
    const storedCart = localStorage.getItem('magnetCart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('magnetCart', JSON.stringify(updatedCart));
    toast({
      title: "Item removed",
      description: "Magnet removed from cart",
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('magnetCart');
    toast({
      title: "Cart cleared",
      description: "All items removed from cart",
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some magnets to your cart first",
        variant: "destructive",
      });
      return;
    }

    // For now, just show a success message
    // In production, this would redirect to payment/checkout
    toast({
      title: "Proceeding to checkout",
      description: "You'll be redirected to secure checkout",
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="lg" className="relative group">
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden md:inline ml-2">Go to Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Your Cart ({getTotalItems()} items)
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Start creating your custom magnets!
              </p>
              <Button variant="hero" onClick={() => setIsOpen(false)}>
                Create Magnet
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <Card key={item.id} className="p-4 glass-card">
                    <div className="flex gap-4">
                      {/* Preview Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                        <img
                          src={item.imageUrl}
                          alt="Magnet preview"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold capitalize">{item.shape} Magnet</h4>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-lg font-bold gradient-text">₹{item.price}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Subtotal:</span>
                  <span className="font-bold">₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Shipping:</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between items-center text-xl border-t pt-4">
                  <span className="font-bold">Total:</span>
                  <span className="text-2xl font-bold gradient-text">₹{getTotalPrice()}</span>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    variant="hero"
                    size="xl"
                    className="w-full"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
