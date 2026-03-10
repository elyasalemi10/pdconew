import React from 'react';
import { Link } from '@tanstack/react-router';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Home, Sparkles, Layout, Palette, ArrowRight } from 'lucide-react';
import { SEO } from '@/components/ui/SEO';

export function ImprovementsPage() {
  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="Strategic Property Improvements" 
        description="Targeted cosmetic and structural improvements designed to increase the market value of your Melbourne property."
      />
      {/* Page Header */}
      <section className="bg-primary pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        </div>
        <Container className="relative z-10 flex flex-col gap-10 text-center items-center py-0">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">Strategic Presentation</span>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-white max-w-5xl leading-[1.1] italic">
            Strategic Property <span className="text-gold underline decoration-secondary/20 underline-offset-[16px]">Optimisation</span>
          </h1>
          <p className="text-2xl text-white/50 max-w-3xl leading-relaxed font-light">
            Targeted upgrades designed to refine your home's presentation, enhance interior flow, and drive a higher market value for sale.
          </p>
        </Container>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <img 
              src="/projects/home2/main.webp" 
              alt="Modern Living" 
              className="w-full aspect-[4/5] object-cover shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute -top-10 -left-10 bg-secondary p-12 text-primary shadow-2xl animate-reveal border border-secondary">
              <span className="text-5xl font-display font-bold">100%</span>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-tight mt-2">Strategic Focus for <br />Value Creation</p>
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-primary leading-tight italic">
              Refining Your Asset for the <span className="text-gold">Premium Market</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Property improvement is about identifying the friction points in your home's presentation and eliminating them. We focus on the high-visibility elements that transform a "property" into a "premium home" in the minds of potential buyers.
            </p>
            <div className="flex flex-col gap-10 pt-4">
              {[
                { icon: Palette, title: "Curated Architectural Palettes", desc: "Expert selection of neutral tones that enhance volume, space and light." },
                { icon: Layout, title: "Strategic Flow Refinements", desc: "Removing visual clutter and improving the connection between key living zones." },
                { icon: Sparkles, title: "Value-Add Hardware & Fixtures", desc: "Targeted improvements that signal high quality throughout the property." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 items-start group">
                  <div className="w-14 h-14 bg-muted flex items-center justify-center shrink-0 border border-border group-hover:border-secondary transition-all duration-500 shadow-sm">
                    <item.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xl font-bold font-heading text-primary italic">{item.title}</h4>
                    <p className="text-base text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Service Scope Grid */}
      <section className="py-12 bg-muted border-y border-border">
        <Container className="flex flex-col gap-12">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-6">
            <h2 className="text-4xl font-display font-bold text-primary italic">Comprehensive Property Refinement</h2>
            <p className="text-muted-foreground text-lg">Our improvement services cover all key interior and exterior zones.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: "Kitchen Facelifts", desc: "Cabinet resurfacing, handle upgrades, and new stone benchtops." },
              { title: "Lighting Overhauls", desc: "Replacement of dated light fittings with modern LED and designer fixtures." },
              { title: "Flooring Replacement", desc: "Premium timber flooring and high-end wool carpets for ultimate comfort." },
              { title: "Interior Styling Advice", desc: "Guidance on furniture placement and décor to maximize spatial perception." },
              { title: "Window Treatment Updates", desc: "Replacing heavy curtains with sleek blinds or architectural sheers." },
              { title: "External Presentation", desc: "Repainting, rendering touch-ups, and street-appeal enhancement." }
            ].map((service, i) => (
              <div key={i} className="flex flex-col gap-4 border-l-2 border-secondary pl-8 py-2">
                <h4 className="text-xl font-bold font-heading text-primary">{service.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Project Highlight */}
      <section className="bg-primary py-12 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary animate-marquee" />
        <Container clean className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="flex flex-col gap-8">
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">Transformation Profile</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight italic">Berwick Property Refresh</h2>
            <p className="text-xl text-white/60 leading-relaxed">
              A targeted cosmetic upgrade strategy delivered with a renovation budget of $38,000. The improvements focused on high-impact visual areas to significantly improve the property's presentation and buyer appeal.
            </p>
            <div className="flex gap-12">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-secondary">$83,000+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Value Achieved</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-secondary">21 Days</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Refresh Timeline</span>
              </div>
            </div>
            <Button asChild className="bg-secondary text-primary hover:bg-white rounded-none h-14 w-fit font-bold">
              <Link to="/past-projects/berwick-refresh">View Case Study</Link>
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-2xl">
              <img 
                src="/projects/home/main.webp" 
                alt="Berwick Property Refresh" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.05)_0%,transparent_70%)]" />
        <Container clean>
          <div className="flex flex-col items-center text-center gap-8 relative z-10 py-12 border-y border-muted">
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">Strategic Transformation</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary max-w-4xl leading-tight italic">
              Thinking of Selling Your <span className="text-gold underline decoration-secondary/20 underline-offset-[12px]">Property?</span>
            </h2>
            <p className="text-2xl text-muted-foreground font-medium max-w-2xl leading-relaxed italic">
              A strategic renovation may significantly increase your property's market value and buyer appeal.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-16 py-10 text-2xl font-bold rounded-none shadow-elegant group transition-all duration-500 hover:scale-105 active:scale-95">
              <Link to="/consultation" className="flex items-center gap-4">
                Book Property Improvement Consultation <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-500" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
