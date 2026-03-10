import React from 'react';
import { Link } from '@tanstack/react-router';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Bath, Grid3X3, Lightbulb, Home, Hammer } from 'lucide-react';
import { SEO } from '@/components/ui/SEO';

export function ShowroomPage() {
  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="Renovation Showroom" 
        description="Explore premium renovation materials and finishes at the PDCON showroom, operated by Builders Warehouse Australia."
      />
      {/* Page Header */}
      <section className="bg-primary pt-60 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1556912177-c54030639a48?q=80&w=2070&auto=format&fit=crop" 
            alt="Renovation Showroom" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <Container className="relative z-10 flex flex-col gap-10 text-center items-center py-0">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">Material Excellence</span>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-white max-w-5xl leading-[1.1] italic">
            PDCON Renovation <br /><span className="text-gold underline decoration-secondary/20 underline-offset-[16px]">Showroom</span>
          </h1>
          <p className="text-2xl text-white/50 max-w-3xl leading-relaxed font-light">
            Expertly curated materials and finishes designed to deliver premium property presentation.
          </p>
        </Container>
      </section>

      {/* Intro Section */}
      <section className="py-40 bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="flex flex-col gap-12">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-primary leading-tight italic">
              Confidence Through <span className="text-gold">Selection</span>
            </h2>
            <div className="flex flex-col gap-8 text-xl text-muted-foreground leading-relaxed font-light">
              <p>
                PDCON works closely with <strong>Builders Warehouse Australia</strong>, which operates as the renovation showroom for our projects.
              </p>
              <p>
                The showroom allows clients to explore renovation materials and finishes while receiving practical renovation guidance.
              </p>
              <p>
                Clients can view and compare:
              </p>
              <ul className="flex flex-col gap-4 list-none">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> kitchens</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> bathroom fixtures</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> flooring and tiles</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> lighting options</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> tapware and fittings</li>
              </ul>
              <p>
                Showroom visits can include a brief renovation consultation to discuss property improvement strategies.
              </p>
              <p>
                The showroom helps clients make confident renovation decisions before construction begins.
              </p>
            </div>
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-none h-16 px-12 w-fit">
              <Link to="/consultation">Book Showroom Visit</Link>
            </Button>
          </div>
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
              alt="Showroom Materials" 
              className="w-full aspect-[4/5] object-cover shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute -top-10 -right-10 w-40 h-40 border-t border-r border-secondary/30 pointer-events-none" />
          </div>
        </Container>
      </section>

      {/* Selection Grid */}
      <section className="py-40 bg-muted border-y border-border">
        <Container clean className="flex flex-col gap-24">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary italic">Explore & Compare</h2>
            <p className="text-muted-foreground text-xl font-light">Clients can view and compare premium selections for every zone of the property.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Grid3X3, title: "Kitchens", desc: "View cabinetry finishes, stone benchtops, and modern hardware configurations." },
              { icon: Bath, title: "Bathroom Fixtures", desc: "Compare tapware, basins, and architectural shower systems." },
              { icon: Home, title: "Flooring & Tiles", desc: "Explore engineered timber, premium carpets, and designer tiling options." },
              { icon: Lightbulb, title: "Lighting Options", desc: "Modern LED solutions and architectural pendant lighting." },
              { icon: Hammer, title: "Tapware & Fittings", desc: "High-end finishes in matte black, brushed gold, and classic chrome." },
              { icon: CheckCircle2, title: "Expert Guidance", desc: "Showroom visits include a brief consultation to discuss improvement strategies." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-12 border border-border shadow-sm hover:border-secondary hover:shadow-xl transition-all duration-500 group">
                <item.icon className="w-12 h-12 text-secondary mb-8 group-hover:scale-110 transition-transform duration-500" />
                <h4 className="text-2xl font-bold font-heading text-primary mb-4 italic">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-32 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.05)_0%,transparent_70%)]" />
        <Container className="flex flex-col items-center text-center gap-12 relative z-10 py-24 border-y border-white/10">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">Strategic Preparation</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold max-w-3xl leading-tight italic">
            Visualise Your Property <br /><span className="text-gold">Transformation</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl leading-relaxed italic">
            Book a showroom visit to discuss your property improvement goals and explore high-end material options.
          </p>
          <Button asChild size="lg" className="bg-secondary text-primary hover:bg-white font-bold rounded-none h-16 px-12 text-lg">
            <Link to="/consultation" className="flex items-center gap-3">
              Request Showroom Appointment <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </Container>
      </section>
    </div>
  );
}
