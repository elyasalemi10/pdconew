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
        title="PDCON Renovation Showroom | Builders Warehouse Australia" 
        description="Explore renovation materials and finishes at our showroom. View kitchens, bathrooms, flooring, lighting and more."
      />
      
      {/* Page Header */}
      <section className="bg-primary pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        </div>
        <Container className="relative z-10 flex flex-col gap-10 text-center items-center py-0">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">Material Excellence</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white max-w-5xl leading-[1.1] italic">
            PDCON Renovation <span className="text-gold">Showroom</span>
          </h1>
          <p className="text-2xl text-white/50 max-w-3xl leading-relaxed font-light">
            Expertly curated materials and finishes designed to deliver premium property presentation.
          </p>
        </Container>
      </section>

      {/* Intro Section */}
      <section className="py-12 bg-white">
        <Container clean className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary leading-tight italic">
              Confidence Through Selection
            </h2>
            <div className="flex flex-col gap-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                PDCON works closely with Builders Warehouse Australia, which operates as the renovation showroom for our projects.
              </p>
              <p>
                The showroom allows clients to explore renovation materials and finishes while receiving practical renovation guidance.
              </p>
              <p className="font-semibold text-primary">Clients can view and compare:</p>
              <ul className="flex flex-col gap-3">
                {[
                  "Kitchens",
                  "Bathroom fixtures",
                  "Flooring and tiles",
                  "Lighting options",
                  "Tapware and fittings"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Showroom visits can include a brief renovation consultation to discuss property improvement strategies.
              </p>
              <p>
                The showroom helps clients make confident renovation decisions before construction begins.
              </p>
              <p className="font-semibold text-primary">
                Visit us at: 214 High St, Cranbourne VIC 3977
              </p>
            </div>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-12 py-8 text-lg font-bold rounded-none shadow-elegant w-fit group">
              <Link to="/consultation" className="flex items-center gap-3">
                Book Showroom Visit <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <img 
              src="/showroom.webp" 
              alt="Renovation Showroom"
              className="w-full aspect-[4/5] object-cover shadow-2xl"
            />
          </div>
        </Container>
      </section>

      {/* Selection Grid */}
      <section className="py-12 bg-muted border-y border-border">
        <Container clean className="flex flex-col gap-12">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-6">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">Explore & Compare</span>
            <p className="text-xl text-muted-foreground">
              Clients can view and compare premium selections for every zone of the property.
            </p>
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
              <div key={i} className="bg-white p-10 border border-border hover:border-secondary transition-all duration-500 flex flex-col gap-6 group">
                <item.icon className="w-10 h-10 text-secondary" />
                <h3 className="text-xl font-display font-bold text-primary">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.05)_0%,transparent_70%)]" />
        <Container clean>
          <div className="flex flex-col items-center text-center gap-8 relative z-10 py-12 border-y border-muted">
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">Strategic Preparation</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary max-w-4xl leading-tight italic">
              Visualise Your Property <span className="text-gold">Transformation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Book a showroom visit to discuss your property improvement goals and explore high-end material options.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-16 py-10 text-xl font-bold rounded-none shadow-elegant group transition-all duration-500 hover:scale-105">
              <Link to="/consultation" className="flex items-center gap-4">
                Request Showroom Appointment <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
