import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, CheckCircle2, TrendingUp, Sparkles, Home, Wallet, Hammer, Paintbrush, Ruler, Bath, Grid3X3, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { SEO } from '@/components/ui/SEO';
import { cn } from '@/lib/utils';

export function PreSalePage() {
  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="Pre-Sale Renovation Strategy" 
        description="Strategic pre-sale renovations designed to maximise your property's market value and buyer appeal in Melbourne."
      />
      {/* Page Header */}
      <section className="bg-primary pt-60 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        </div>
        <Container className="relative z-10 flex flex-col gap-10 text-center items-center py-0">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">Value Maximisation</span>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-white max-w-5xl leading-[1.1] italic">
            Pre-Sale <span className="text-gold underline decoration-secondary/20 underline-offset-[16px]">Renovation</span> Strategy
          </h1>
          <p className="text-2xl text-white/50 max-w-3xl leading-relaxed font-light">
            Positioning your property to perform better in the market through strategic presentation and targeted upgrades.
          </p>
        </Container>
      </section>

      {/* Intro Section */}
      <section className="py-40 bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="flex flex-col gap-12">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-primary leading-tight italic">
              Improving Buyer <span className="text-gold">Appeal</span>
            </h2>
            <div className="flex flex-col gap-8 text-xl text-muted-foreground leading-relaxed font-light">
              <p>
                Selling a property is often influenced by presentation and buyer perception.
              </p>
              <p>
                Strategic renovations before listing can improve buyer appeal and strengthen the final sale outcome.
              </p>
              <p>
                Typical improvements include:
              </p>
              <ul className="flex flex-col gap-4 list-none italic text-primary">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> new flooring</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> kitchen upgrades</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> bathroom updates</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> lighting improvements</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> fresh interior paint</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> landscaping</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> exterior presentation upgrades</li>
              </ul>
              <p>
                The goal is not simply renovation, but positioning the property to perform better in the market.
              </p>
            </div>
          </div>
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" 
              alt="Premium Living Space" 
              className="w-full aspect-square object-cover shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 border-[30px] border-secondary/10 m-10 pointer-events-none" />
          </div>
        </Container>
      </section>

      {/* Improvements Grid */}
      <section className="py-40 bg-muted border-y border-border">
        <Container clean className="flex flex-col gap-24">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary italic">Typical Improvements</h2>
            <p className="text-muted-foreground text-xl font-light">Targeted upgrades designed to refine the final presentation of the home.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Home, title: "New Flooring", desc: "Engineered timber, premium carpets, or polished concrete." },
              { icon: Grid3X3, title: "Kitchen Upgrades", desc: "Stone benchtops, modern cabinetry refreshes, and hardware." },
              { icon: Bath, title: "Bathroom Updates", desc: "High-end fixtures, re-grouting, and designer vanities." },
              { icon: Lightbulb, title: "Lighting Improvements", desc: "Modern LED configurations and architectural pendants." },
              { icon: Paintbrush, title: "Fresh Interior Paint", desc: "Curated neutral palettes that enhance light and space." },
              { icon: Sparkles, title: "Landscaping", desc: "Curb appeal enhancement and outdoor living presentation." },
              { icon: Ruler, title: "Exterior Presentation", desc: "Rendering, external painting, and entrance upgrades." },
              { icon: CheckCircle2, title: "Final Detailing", desc: "The finishing touches that complete the premium experience." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 border border-border shadow-sm hover:border-secondary transition-all duration-300">
                <item.icon className="w-10 h-10 text-secondary mb-6" />
                <h4 className="text-xl font-bold font-heading text-primary mb-4 italic">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Study Section */}
      <section className="py-40 bg-white overflow-hidden">
        <Container clean className="flex flex-col gap-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="flex flex-col gap-12">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">The Transformation</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-primary italic leading-tight">Berwick Property <br />Transformation</h2>
              <div className="grid grid-cols-2 gap-px bg-muted border border-muted overflow-hidden">
                {[
                  { label: "Before renovation value", value: "$1,600,000" },
                  { label: "Renovation investment", value: "$250,000" },
                  { label: "Sale price achieved", value: "$2,105,000" },
                  { label: "Value increase", value: "$355,000", highlight: true }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-10 flex flex-col gap-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">{stat.label}</span>
                    <span className={cn("text-3xl font-display font-bold", stat.highlight ? "text-secondary" : "text-primary")}>{stat.value}</span>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-none h-16 px-12 w-fit">
                <Link to="/projects/berwick-transformation">View Case Study</Link>
              </Button>
            </div>
            <div className="relative">
              <BeforeAfterSlider 
                beforeImage="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FBefor__99df5e08.jpg?alt=media&token=42512108-8e68-45ec-9c44-59364998797f"
                afterImage="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FAfter12Duffy__1e75abc2.jpg?alt=media&token=ea56624a-6c5f-4031-bc9f-5acb8fe38463"
                beforeLabel="Original State"
                afterLabel="PDCON Ready"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-32 text-white overflow-hidden relative">
        <Container className="flex flex-col items-center text-center gap-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold max-w-3xl leading-tight italic">
            Ready to strengthen your <br /><span className="text-gold">sale result?</span>
          </h2>
          <Button asChild size="lg" className="bg-secondary text-primary hover:bg-white font-bold rounded-none h-16 px-12 text-lg">
            <Link to="/consultation" className="flex items-center gap-3">
              Book Property Assessment <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </Container>
      </section>
    </div>
  );
}
