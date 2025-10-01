import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MagnetViewer3D } from './MagnetViewer3D';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Thick Rectangle Magnets',
    description: 'Premium thick magnets for lasting memories',
    minOrder: 3,
    minPrice: 299,
    singlePrice: 70,
    shape: 'rectangle' as const,
  },
  {
    id: 2,
    name: 'Thin Rectangle Magnets',
    description: 'Sleek thin design, perfect for any occasion',
    minOrder: 3,
    minPrice: 199,
    singlePrice: 50,
    shape: 'rectangle' as const,
  },
];

export function ProductGallery() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [customText, setCustomText] = useState('');
  const [quantity, setQuantity] = useState(3);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const handleCustomize = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setQuantity(product.minOrder);
    setIsCustomizing(true);
  };

  const calculatePrice = () => {
    if (!selectedProduct) return 0;
    if (quantity < selectedProduct.minOrder) return selectedProduct.minPrice;
    return quantity * selectedProduct.singlePrice;
  };

  return (
    <>
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Choose Your <span className="gradient-text">Style</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select from our premium collection and customize to perfection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                minPrice={product.minPrice}
                singlePrice={product.singlePrice}
                minOrder={product.minOrder}
                onCustomize={() => handleCustomize(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Customization Dialog */}
      <Dialog open={isCustomizing} onOpenChange={setIsCustomizing}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Customize Your {selectedProduct?.name}</DialogTitle>
            <DialogDescription>
              Preview your design in 3D and add your personal touch
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6 py-4">
            {/* 3D Preview */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Live Preview</h3>
              <MagnetViewer3D 
                shape={selectedProduct?.shape} 
                customText={customText}
              />
              <p className="text-sm text-muted-foreground text-center">
                Drag to rotate • Scroll to zoom
              </p>
            </div>

            {/* Customization Options */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Customize</h3>
              
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">Add Text</TabsTrigger>
                  <TabsTrigger value="image">Upload Image</TabsTrigger>
                </TabsList>
                
                <TabsContent value="text" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text">Your Text</Label>
                    <Input
                      id="text"
                      placeholder="Enter your text..."
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      maxLength={20}
                    />
                    <p className="text-xs text-muted-foreground">
                      {customText.length}/20 characters
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="image" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">Upload Photo</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                      <label htmlFor="image" className="cursor-pointer">
                        <div className="space-y-2">
                          <div className="text-4xl">📸</div>
                          <p className="text-sm">Click to upload image</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Pricing */}
              <div className="glass-card p-4 space-y-3">
                <div className="text-sm text-muted-foreground mb-2">
                  Min order: {selectedProduct?.minOrder} magnets = ₹{selectedProduct?.minPrice}
                  <br />
                  Single magnet: ₹{selectedProduct?.singlePrice} each
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Quantity</span>
                  <div className="flex gap-2 items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setQuantity(Math.max(selectedProduct?.minOrder || 3, quantity - 1))}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(selectedProduct?.minOrder || 3, parseInt(e.target.value) || selectedProduct?.minOrder || 3))}
                      className="w-16 text-center"
                      min={selectedProduct?.minOrder}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="text-2xl font-bold gradient-text">₹{calculatePrice()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="hero" className="flex-1 animate-snap" size="lg">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  Save Design
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
