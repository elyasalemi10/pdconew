import React from 'react';
import { Link } from '@tanstack/react-router';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Bath, Droplets, Grid3X3, Sparkles, ArrowRight } from 'lucide-react';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { SEO } from '@/components/ui/SEO';

export function BathroomPage() {
  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="Premium Bathroom Renovations" 
        description="Bespoke bathroom makeovers and high-end property improvements designed for Melbourne homes."
      />
      {/* Page Header */}
      <section className="bg-primary pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        </div>
        <Container className="relative z-10 flex flex-col gap-10 text-center items-center py-0">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">Specialist Expertise</span>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-white max-w-5xl leading-[1.1] italic">
            Architectural <span className="text-gold underline decoration-secondary/20 underline-offset-[16px]">Bathroom</span> Transformations
          </h1>
          <p className="text-2xl text-white/50 max-w-3xl leading-relaxed font-light">
            High-impact bathroom transformations that improve buyer perception and add immediate value to your property's market positioning.
          </p>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-12">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-primary leading-tight italic">
              Strategy Meets <span className="text-gold">Precision</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              A bathroom is more than a functional space; it's a sanctuary. In the premium property market, a modern, clean, and architecturally designed bathroom is a primary driver of emotional buyer connection. PDCON specialises in delivering high-end finishes with industry-leading waterproofing and structural integrity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-muted border border-muted overflow-hidden">
              {[
                { icon: Droplets, title: "Waterproofing", desc: "Licensed specialists ensuring your investment is protected through certified systems." },
                { icon: Grid3X3, title: "Designer Tiling", desc: "Precision tiling patterns using premium materials and architectural finishes." },
                { icon: Bath, title: "Custom Vanities", desc: "Bespoke joinery solutions tailored to your space and market strategy." },
                { icon: Sparkles, title: "Premium Fixtures", desc: "High-end taps, mixers, and hardware from leading architectural designers." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-6 p-10 bg-white hover:bg-muted transition-all duration-500">
                  <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-bold font-heading text-xl text-primary italic">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <BeforeAfterSlider 
              beforeImage="/projects/home/old-bathroom.webp" 
              afterImage="/projects/home/new-bathroom.webp" 
              beforeLabel="Dated Bathroom"
              afterLabel="Modern Masterpiece"
              className="h-[500px] lg:h-[600px] shadow-2xl"
            />
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-muted border-y border-border">
        <Container className="flex flex-col gap-16">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary italic">Our Technical Scope</h2>
            <p className="text-muted-foreground text-xl font-light">Every PDCON bathroom transformation includes a comprehensive scope of works managed by our specialist group.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {[
              "Demolition & Strip-out",
              "Structural Plumbing & Electrical",
              "Wall Lining & Sheeting",
              "Advanced Waterproofing System",
              "Screeding & Leveling",
              "Floor-to-Ceiling Tiling",
              "Cabinetry & Joinery Install",
              "Final Fit-off & Sealing"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-6 p-10 bg-white hover:bg-muted transition-all duration-500 group">
                <div className="w-2 h-2 rounded-full bg-secondary shrink-0 group-hover:scale-150 transition-transform duration-500" />
                <span className="font-bold font-heading text-primary text-sm uppercase tracking-[0.2em] group-hover:text-secondary transition-colors duration-500">{text}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Project CTA */}
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
