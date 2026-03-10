import React from 'react';
import { Link } from '@tanstack/react-router';
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook, ChevronRight, Building2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  services: [
    { label: 'Pre-Sale Renovations', href: '/services/pre-sale' },
    { label: 'Bathroom Renovations', href: '/services/bathroom' },
    { label: 'Property Improvements', href: '/services/improvements' },
    { label: 'Cosmetic Upgrades', href: '/services/cosmetic' },
  ],
  company: [
    { label: 'About PDCON', href: '/about' },
    { label: 'Projects Portfolio', href: '/projects' },
    { label: 'Renovation Showroom', href: '/showroom' },
    { label: 'For Real Estate Agents', href: '/agents' },
    { label: 'Consultation Booking', href: '/consultation' },
  ],
  locations: [
    'Berwick', 'Narre Warren', 'Clyde', 'Officer', 'Beaconsfield', 'Cranbourne', 'South East Melbourne'
  ]
};

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-16 h-16 relative overflow-hidden bg-white/5 rounded-none flex items-center justify-center border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-all duration-500">
                <Building2 className="w-10 h-10 text-secondary" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-display font-bold tracking-tighter italic">PDCON</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary">Strategic Property Value Improvement</span>
              </div>
            </Link>
            <p className="text-white/50 leading-relaxed max-w-sm font-light italic">
              Melbourne's leading specialists for strategic property value improvement. We reposition residential assets for the market through professional transformation and premium presentation. Est. 2013.
            </p>
            <div className="flex gap-4">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Service Links */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <h4 className="text-lg font-bold font-heading uppercase text-secondary tracking-widest text-xs">Services</h4>
            <ul className="flex flex-col gap-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-3 h-3 text-secondary opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <h4 className="text-lg font-bold font-heading uppercase text-secondary tracking-widest text-xs">Company</h4>
            <ul className="flex flex-col gap-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-3 h-3 text-secondary opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 flex flex-col gap-8 bg-white/5 p-8 border border-white/5 backdrop-blur-sm rounded-sm">
            <h4 className="text-lg font-bold font-heading uppercase text-secondary tracking-widest text-xs">Direct Contact</h4>
            <div className="flex flex-col gap-6">
              <a href="tel:0408255259" className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                  <Phone className="w-5 h-5 text-secondary group-hover:text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/40 uppercase tracking-widest">Call Us</span>
                  <span className="text-lg font-semibold">0408 255 259</span>
                </div>
              </a>
              <a href="mailto:info@pdcon.com.au" className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                  <Mail className="w-5 h-5 text-secondary group-hover:text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/40 uppercase tracking-widest">Email Us</span>
                  <span className="text-lg font-semibold">info@pdcon.com.au</span>
                </div>
              </a>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/40 uppercase tracking-widest">Office</span>
                  <span className="text-lg font-semibold text-balance leading-tight">South East Melbourne, VIC</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold rounded-none h-12 text-base">
                <Link to="/consultation">Book Property Consultation</Link>
              </Button>
            </div>
          </div>

        </div>

        {/* Locations Bar */}
        <div className="py-8 border-y border-white/5 mb-8 overflow-hidden">
          <div className="flex gap-8 items-center whitespace-nowrap animate-marquee">
            {Array(4).fill(0).map((_, i) => (
              <React.Fragment key={i}>
                {footerLinks.locations.map((loc) => (
                  <span key={loc} className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/30 hover:text-secondary transition-colors cursor-default">
                    {loc}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white/30 text-[9px] uppercase tracking-[0.2em] font-bold">
          <p>© {new Date().getFullYear()} PDCON PROPERTY VALUE IMPROVEMENT SPECIALISTS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Strategy</Link>
            <a href="https://ghanprojects.com.au" className="hover:text-white transition-colors text-secondary underline decoration-secondary/30 underline-offset-8">Ghan Projects Group</a>
          </div>
        </div>
      </div>
    </footer>
  );
}