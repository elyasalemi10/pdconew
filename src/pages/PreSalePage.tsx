import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, CheckCircle2, TrendingUp, Sparkles, Home, Wallet, Hammer, Paintbrush, Ruler, Bath } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { SEO } from '@/components/ui/SEO';

export function PreSalePage() {
  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="Pre-Sale Renovations Melbourne | Renovate Before Selling" 
        description="Strategic pre-sale renovations designed to maximise your property's market value and buyer appeal. Expert renovation before selling in Melbourne, Berwick, and South East suburbs."
        canonical="/services/pre-sale"
        image="/projects/home/front.webp"
      />
      {/* Page Header */}
      <section className="bg-primary pt-24 sm:pt-32 pb-8 sm:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        </div>
        <Container className="relative z-10 flex flex-col gap-6 sm:gap-10 text-center items-center py-0 px-4 sm:px-6">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-secondary">Strategic Infrastructure</span>
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-display font-bold text-white max-w-5xl leading-[1.1] italic">
            Strategic <span className="text-gold underline decoration-secondary/20 underline-offset-8 sm:underline-offset-[16px]">Pre-Sale</span> Transformations
          </h1>
          <p className="text-base sm:text-2xl text-white/50 max-w-3xl leading-relaxed font-light px-2">
            Targeted upgrades designed to reposition your asset for the market, increase buyer appeal and strengthen final sale results.
          </p>
          <Button asChild size="lg" className="bg-secondary text-primary hover:bg-white font-bold rounded-none h-14 sm:h-20 px-8 sm:px-16 mt-4 sm:mt-8 transition-all duration-500 shadow-gold text-sm sm:text-base">
            <Link to="/consultation">Book Property Assessment</Link>
          </Button>
        </Container>
      </section>

      {/* Philosophy Section */}
      <section className="py-8 sm:py-12 bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-6 lg:gap-12">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-primary leading-tight italic">
              Our Methodology: <span className="text-gold">Value Creation</span>
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-light">
              We don't just renovate; we strategize. Our pre-sale transformation model focuses exclusively on improvements that deliver the highest return on investment. We identify the high-impact areas that buyers care about most and address them with professional precision.
            </p>
            <div className="flex flex-col gap-4 sm:gap-8">
              {[
                { title: "Strategic Market Repositioning", desc: "Aligning your property's presentation with high-end buyer expectations." },
                { title: "Neutral Architectural Palettes", desc: "Appealing to the broadest possible buyer demographic through sophisticated design." },
                { title: "Buyer Appeal Optimisation", desc: "Creating space, light and mood that moves buyers emotionally." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 sm:gap-8 items-start group">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-muted flex items-center justify-center shrink-0 border border-border group-hover:border-secondary transition-all duration-500 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 sm:w-7 sm:h-7 text-secondary" />
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <h4 className="text-base sm:text-xl font-bold font-heading text-primary italic">{item.title}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="/projects/home/pool.webp" 
              alt="Luxury Interior" 
              className="w-full aspect-square object-cover shadow-2xl"
            />
          </div>
        </Container>
      </section>

      {/* Service Scope Grid */}
      <section className="py-8 sm:py-12 bg-muted border-y border-border">
        <Container className="flex flex-col gap-8 sm:gap-12 px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4 sm:gap-6">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-primary">Comprehensive Market Readiness</h2>
            <p className="text-muted-foreground text-sm sm:text-lg">Typical improvements included in our pre-sale renovation packages.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {[
              { icon: Paintbrush, title: "Professional Painting", desc: "Full interior and exterior repainting with market-proven color schemes." },
              { icon: Ruler, title: "Flooring Upgrades", desc: "New engineered timber, premium carpets, or polished concrete." },
              { icon: Home, title: "Kitchen Refresh", desc: "Cabinetry resurfacing, new stone benchtops, and modern hardware." },
              { icon: Bath, title: "Bathroom Improvements", desc: "Grouting refresh, new vanities, and high-end fixture replacement." },
              { icon: Hammer, title: "Lighting & Hardware", desc: "Modern LED upgrades, architectural pendants, and sleek handles." },
              { icon: Sparkles, title: "Landscaping", desc: "Garden cleanup, new turf, and strategic planting for curb appeal." }
            ].map((service, i) => (
              <div key={i} className="bg-white p-4 sm:p-10 border border-border shadow-sm hover:border-secondary hover:shadow-xl transition-all duration-300">
                <service.icon className="w-6 h-6 sm:w-10 sm:h-10 text-secondary mb-3 sm:mb-6" />
                <h4 className="text-sm sm:text-xl font-bold font-heading mb-2 sm:mb-4">{service.title}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed hidden sm:block">{service.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Study Preview */}
      <section className="py-8 sm:py-12 bg-white overflow-hidden">
        <Container className="flex flex-col gap-6 sm:gap-10 px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-2 sm:gap-4">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary">The Transformation</span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-primary italic">Featured Case Study</h2>
          </div>
          <BeforeAfterSlider 
            beforeImage="/projects/home/old-front.webp"
            afterImage="/projects/home/front.webp"
            beforeLabel="Dated Presentation"
            afterLabel="Architectural Ready"
            className="h-[300px] sm:h-[400px] lg:h-[600px]"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 pt-4 sm:pt-8">
            <div className="flex flex-col gap-2 sm:gap-4">
              <h4 className="text-base sm:text-lg font-bold font-heading italic">The Strategy</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Strategic modernization of the interior and exterior to reposition the property for a premium market segment and maximize buyer appeal.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:gap-4">
              <h4 className="text-base sm:text-lg font-bold font-heading italic">The Outcome</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Achieved a significant value increase of $455,000, delivering a high-end presentation that exceeded all market expectations.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6 justify-center sm:col-span-2 lg:col-span-1">
              <Button asChild size="lg" className="bg-primary rounded-none h-12 sm:h-auto text-sm sm:text-base">
                <Link to="/past-projects">View More Transformations</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.05)_0%,transparent_70%)]" />
        <Container clean className="px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8 relative z-10 py-8 sm:py-12 border-y border-muted">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-secondary">Strategic Transformation</span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary max-w-4xl leading-tight italic">
              Thinking of Selling Your <span className="text-gold underline decoration-secondary/20 underline-offset-4 sm:underline-offset-[12px]">Property?</span>
            </h2>
            <p className="text-base sm:text-2xl text-muted-foreground font-medium max-w-2xl leading-relaxed italic px-2">
              A strategic renovation may significantly increase your property's market value and buyer appeal.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-16 py-6 sm:py-10 text-base sm:text-2xl font-bold rounded-none shadow-elegant group transition-all duration-500 hover:scale-105 active:scale-95">
              <Link to="/consultation" className="flex items-center gap-2 sm:gap-4">
                Book Consultation <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 group-hover:translate-x-3 transition-transform duration-500" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
