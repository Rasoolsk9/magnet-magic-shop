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
    name: 'Round Magnet',
    description: 'Classic circular design perfect for any photo',
    price: 299,
    shape: 'round' as const,
  },
  {
    id: 2,
    name: 'Rectangle Magnet',
    description: 'Modern rectangular style for landscape photos',
    price: 349,
    shape: 'rectangle' as const,
  },
  {
    id: 3,
    name: 'Heart Magnet',
    description: 'Romantic heart shape for special memories',
    price: 399,
    shape: 'heart' as const,
  },
];

export function ProductGallery() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [customText, setCustomText] = useState('');
  const [isCustomizing, setIsCustomizing] = useState(false);

  const handleCustomize = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsCustomizing(true);
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
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
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Base Price</span>
                  <span className="font-semibold">₹{selectedProduct?.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Quantity</span>
                  <div className="flex gap-2 items-center">
                    <Button variant="outline" size="sm">-</Button>
                    <span className="w-8 text-center font-semibold">1</span>
                    <Button variant="outline" size="sm">+</Button>
                  </div>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="text-2xl font-bold gradient-text">₹{selectedProduct?.price}</span>
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
