import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X, ChevronDown, ChevronRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { 
    label: 'Services', 
    href: '#',
    children: [
      { label: 'Pre-Sale Renovations', href: '/services/pre-sale' },
      { label: 'Bathroom Renovations', href: '/services/bathroom' },
      { label: 'Property Improvements', href: '/services/improvements' },
    ]
  },
  { label: 'Past Projects', href: '/past-projects' },
  { label: 'Showroom', href: '/showroom' },
  { label: 'Agents', href: '/agents' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isDarkHeroPage = location.pathname === '/' || 
                         location.pathname.startsWith('/services/') || 
                         location.pathname === '/about' ||
                         location.pathname === '/showroom' ||
                         location.pathname === '/agents' ||
                         location.pathname === '/past-projects' ||
                         location.pathname === '/consultation';

  const useWhiteText = !isScrolled && isDarkHeroPage && !isOpen;

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isOpen ? "bg-white shadow-elegant py-3" : "bg-transparent py-4 md:py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group" onClick={() => setIsOpen(false)}>
          <img 
            src={useWhiteText ? "/pdcon-logo-white.webp" : "/pdcon-logo-dark.webp"} 
            alt="PDCON Logo" 
            className="h-10 md:h-12 w-auto transition-all duration-300"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              {item.children ? (
                <div className={cn(
                  "flex items-center gap-1 cursor-pointer py-2 transition-colors font-medium",
                  useWhiteText ? "text-white/80 hover:text-white" : "text-primary hover:text-secondary"
                )}>
                  {item.label} <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-sm py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-muted scale-95 group-hover:scale-100 origin-top-left">
                    {item.children.map((child) => (
                      <Link 
                        key={child.label}
                        to={child.href}
                        className="block px-6 py-2.5 text-sm text-primary hover:bg-muted hover:text-secondary transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  to={item.href}
                  className={cn(
                    "font-medium py-2 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all hover:after:w-full",
                    location.pathname === item.href 
                      ? "text-secondary after:w-full" 
                      : useWhiteText ? "text-white/80 hover:text-white" : "text-primary hover:text-secondary"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <Button asChild className={cn(
            "rounded-none px-8 font-semibold shadow-elegant transition-all",
            useWhiteText ? "bg-secondary text-primary hover:bg-white" : "bg-primary text-white hover:bg-primary/90"
          )}>
            <Link to="/consultation">Book Consultation</Link>
          </Button>
        </div>

        {/* Mobile: Book + Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <Button asChild size="sm" className="bg-secondary text-primary hover:bg-secondary/90 rounded-none px-4 h-9 text-xs font-bold">
            <Link to="/consultation">Book Now</Link>
          </Button>
          <button 
            className={cn(
              "p-2 transition-colors rounded-sm",
              useWhiteText ? "text-white" : "text-primary"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={cn(
        "lg:hidden fixed inset-0 top-[60px] bg-white z-40 transition-all duration-300",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}>
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex flex-col p-6 gap-2">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-muted last:border-0">
                {item.children ? (
                  <div>
                    <button 
                      className="w-full flex items-center justify-between py-4 text-lg font-bold text-primary"
                      onClick={() => setExpandedMenu(expandedMenu === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown className={cn(
                        "w-5 h-5 transition-transform",
                        expandedMenu === item.label && "rotate-180"
                      )} />
                    </button>
                    <div className={cn(
                      "overflow-hidden transition-all duration-300",
                      expandedMenu === item.label ? "max-h-48 pb-4" : "max-h-0"
                    )}>
                      {item.children.map((child) => (
                        <Link 
                          key={child.label}
                          to={child.href}
                          className="flex items-center gap-3 py-3 pl-4 text-muted-foreground hover:text-secondary"
                          onClick={() => setIsOpen(false)}
                        >
                          <ChevronRight className="w-4 h-4 text-secondary" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    to={item.href}
                    className={cn(
                      "block py-4 text-lg font-bold transition-colors",
                      location.pathname === item.href ? "text-secondary" : "text-primary hover:text-secondary"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-auto p-6 bg-muted border-t border-border">
            <Button asChild className="w-full bg-primary text-white py-6 text-base rounded-none font-bold mb-4">
              <Link to="/consultation" onClick={() => setIsOpen(false)}>Book Property Consultation</Link>
            </Button>
            <a href="tel:0408255259" className="flex items-center justify-center gap-3 py-3 text-primary font-medium">
              <Phone className="w-5 h-5 text-secondary" />
              0408 255 259
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}