import { useState, useCallback, useRef } from 'react';
import { MagnetViewer3D } from './MagnetViewer3D';
import { Cart } from './Cart';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Upload, RotateCw, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type MagnetShape = 'round' | 'rectangle' | 'heart';

interface CustomMagnet {
  id: string;
  shape: MagnetShape;
  imageUrl: string;
  zoom: number;
  rotation: { x: number; y: number; z: number };
  quantity: number;
  price: number;
}

export function MagnetCustomizer() {
  const [shape, setShape] = useState<MagnetShape>('rectangle');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [quantity, setQuantity] = useState(3);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageUrl(result);
        setAutoRotate(false);
        toast({
          title: "Image uploaded! 🎉",
          description: "Your magnet preview is ready",
        });
      };
      reader.readAsDataURL(file);
    }
  }, [toast]);

  const getPrice = () => {
    const basePrice = shape === 'rectangle' ? (quantity >= 3 ? 70 : 100) : 80;
    return basePrice * quantity;
  };

  const addToCart = () => {
    if (!imageUrl) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    const magnet: CustomMagnet = {
      id: Date.now().toString(),
      shape,
      imageUrl,
      zoom,
      rotation,
      quantity,
      price: getPrice(),
    };

    // Get existing cart
    const existingCart = localStorage.getItem('magnetCart');
    const cart = existingCart ? JSON.parse(existingCart) : [];
    
    // Add new magnet
    cart.push(magnet);
    localStorage.setItem('magnetCart', JSON.stringify(cart));

    // Confetti effect
    const confettiElement = document.createElement('div');
    confettiElement.innerHTML = '🎉';
    confettiElement.className = 'fixed top-1/2 left-1/2 text-6xl animate-bounce z-50';
    document.body.appendChild(confettiElement);
    setTimeout(() => confettiElement.remove(), 1000);

    toast({
      title: "Added to cart! 🎉",
      description: `${quantity} custom ${shape} magnet${quantity > 1 ? 's' : ''} added`,
    });

    // Reset form
    setImageUrl('');
    setZoom(1);
    setRotation({ x: 0, y: 0, z: 0 });
    setQuantity(3);
    setAutoRotate(true);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Create Your <span className="gradient-text">Perfect Magnet</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your photo, customize in 3D, and watch your memory come to life
          </p>
          <div className="flex justify-center pt-4">
            <Cart />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* 3D Preview */}
          <div className="space-y-4">
            <MagnetViewer3D
              shape={shape}
              imageUrl={imageUrl}
              autoRotate={autoRotate}
              zoom={zoom}
              rotation={rotation}
            />
            
            {imageUrl && (
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAutoRotate(!autoRotate)}
                >
                  <RotateCw className="w-4 h-4 mr-2" />
                  {autoRotate ? 'Stop' : 'Auto'} Rotate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setImageUrl('');
                    setAutoRotate(true);
                  }}
                >
                  Clear Image
                </Button>
              </div>
            )}
          </div>

          {/* Customization Panel */}
          <Card className="p-6 space-y-6 glass-card">
            {/* Upload Section */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Upload Your Photo</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                variant="hero"
                size="lg"
                className="w-full group"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {imageUrl ? 'Change Photo' : 'Upload Photo'}
              </Button>
            </div>

            {/* Shape Selection */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Choose Shape</Label>
              <RadioGroup value={shape} onValueChange={(value) => setShape(value as MagnetShape)}>
                <div className="grid grid-cols-3 gap-3">
                  <label className="relative cursor-pointer">
                    <RadioGroupItem value="rectangle" className="peer sr-only" />
                    <div className="glass-card p-4 text-center peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary transition-all hover:scale-105">
                      <div className="w-12 h-8 bg-gradient-to-br from-primary to-accent rounded-md mx-auto mb-2" />
                      <span className="text-sm font-medium">Rectangle</span>
                    </div>
                  </label>
                  <label className="relative cursor-pointer">
                    <RadioGroupItem value="round" className="peer sr-only" />
                    <div className="glass-card p-4 text-center peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary transition-all hover:scale-105">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-2" />
                      <span className="text-sm font-medium">Round</span>
                    </div>
                  </label>
                  <label className="relative cursor-pointer">
                    <RadioGroupItem value="heart" className="peer sr-only" />
                    <div className="glass-card p-4 text-center peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary transition-all hover:scale-105">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-2" />
                      <span className="text-sm font-medium">Heart</span>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </div>

            {/* Zoom Control */}
            {imageUrl && (
              <div className="space-y-3">
                <Label className="text-lg font-semibold">
                  Zoom Level
                </Label>
                <Slider
                  value={[zoom]}
                  onValueChange={(value) => setZoom(value[0])}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">{(zoom * 100).toFixed(0)}%</p>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Quantity</Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(3, quantity - 1))}
                  disabled={quantity <= 3}
                >
                  -
                </Button>
                <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Minimum order: 3 magnets
              </p>
            </div>

            {/* Price Display */}
            <div className="glass-card p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Price per magnet:</span>
                <span className="font-semibold">₹{quantity >= 3 ? 70 : 100}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Total:</span>
                <span className="text-2xl font-bold gradient-text">₹{getPrice()}</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              variant="hero"
              size="xl"
              className="w-full group"
              onClick={addToCart}
              disabled={!imageUrl}
            >
              Add to Cart
              <Sparkles className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
