import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X, ChevronDown, Building2 } from 'lucide-react';
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
  { label: 'Projects', href: '/projects' },
  { label: 'Showroom', href: '/showroom' },
  { label: 'Agents', href: '/agents' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkHeroPage = location.pathname === '/' || 
                         location.pathname.startsWith('/services/') || 
                         location.pathname === '/about' ||
                         location.pathname === '/consultation';

  const useWhiteText = !isScrolled && isDarkHeroPage;

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-elegant py-3" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className={cn(
            "w-12 h-12 relative overflow-hidden rounded-none flex items-center justify-center transition-all duration-500",
            isScrolled ? "bg-primary rotate-[45deg] scale-90" : "bg-white/5 backdrop-blur-md border border-white/10 group-hover:border-secondary/50 group-hover:bg-white/10"
          )}>
            <div className={cn(isScrolled && "rotate-[-45deg]")}>
              <Building2 className={cn("w-7 h-7 transition-colors", isScrolled ? "text-white" : "text-secondary")} />
            </div>
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "text-3xl font-display font-bold tracking-tighter transition-colors italic",
              useWhiteText ? "text-white" : "text-primary"
            )}>
              PDCON
            </span>
            <span className={cn(
              "text-[10px] uppercase tracking-[0.4em] font-bold transition-colors opacity-80",
              useWhiteText ? "text-secondary" : "text-secondary"
            )}>
              Strategic Property Value Improvement
            </span>
          </div>
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

        {/* Mobile Toggle */}
        <button 
          className={cn(
            "lg:hidden p-2 transition-colors",
            useWhiteText ? "text-white" : "text-primary"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={cn(
        "lg:hidden fixed inset-0 top-[72px] bg-white z-40 transition-transform duration-500 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col p-8 gap-6 h-full overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label} className="flex flex-col gap-4">
              {item.children ? (
                <>
                  <span className="text-xl font-bold font-heading text-primary/40 uppercase text-xs tracking-widest">{item.label}</span>
                  {item.children.map((child) => (
                    <Link 
                      key={child.label}
                      to={child.href}
                      className="text-2xl font-bold font-heading hover:text-secondary"
                      onClick={() => setIsOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </>
              ) : (
                <Link 
                  to={item.href}
                  className="text-4xl font-bold font-heading hover:text-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="mt-auto pt-8">
            <Button asChild className="w-full bg-primary py-8 text-xl rounded-none font-bold">
              <Link to="/consultation" onClick={() => setIsOpen(false)}>Book Property Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}