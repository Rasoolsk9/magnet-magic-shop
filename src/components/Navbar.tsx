import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthDialog } from './AuthDialog';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  { id: '#products', label: 'Products' },
  { id: '#events', label: 'Events' },
  { id: '#about', label: 'About' },
] as const;

export function Navbar() {
  const [cartCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = location.pathname;

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (currentPath !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(sectionId);
          if (element) {
            scrollToElement(element);
          }
        }, 100);
      } else {
        const element = document.querySelector(sectionId);
        if (element) {
          scrollToElement(element);
        }
      }
      setIsMenuOpen(false);
    },
    [currentPath, navigate]
  );

  const scrollToElement = useCallback((element: Element) => {
    const navHeight = 64;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navHeight;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }, []);

  const renderNavLink = (item: typeof NAV_ITEMS[number], className: string) => (
    <button
      key={item.id}
      onClick={() => scrollToSection(item.id)}
      className={className}
      aria-label={`Navigate to ${item.label.toLowerCase()} section`}
    >
      {item.label}
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
            <span className="font-bold text-xl gradient-text">QueensMagnet</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) =>
              renderNavLink(item, 'text-sm font-medium transition-colors hover:text-primary')
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative" aria-label="Shopping cart">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
            
            <div className="hidden md:block">
              <AuthDialog />
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] pt-16">
                <div className="flex flex-col gap-4">
                  {NAV_ITEMS.map((item) =>
                    renderNavLink(item, 'text-lg font-medium hover:text-primary transition-colors py-2 text-left')
                  )}
                  <div className="mt-4">
                    <AuthDialog />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}