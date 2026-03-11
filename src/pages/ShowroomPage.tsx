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
        title="Renovation Showroom Cranbourne | Kitchen & Bathroom Display" 
        description="Visit our renovation showroom at 214 High St, Cranbourne. Explore kitchens, bathrooms, flooring, lighting, and tapware options with expert guidance."
        canonical="/showroom"
        image="/showroom.webp"
      />
      
      {/* Page Header */}
      <section className="bg-primary pt-24 sm:pt-32 pb-8 sm:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        </div>
        <Container className="relative z-10 flex flex-col gap-6 sm:gap-10 text-center items-center py-0 px-4 sm:px-6">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-secondary">Material Excellence</span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white max-w-5xl leading-[1.1] italic">
            PDCON Renovation <span className="text-gold">Showroom</span>
          </h1>
          <p className="text-base sm:text-2xl text-white/50 max-w-3xl leading-relaxed font-light px-2">
            Expertly curated materials and finishes designed to deliver premium property presentation.
          </p>
        </Container>
      </section>

      {/* Intro Section */}
      <section className="py-8 sm:py-12 bg-white">
        <Container clean className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-6 sm:gap-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-primary leading-tight italic">
              Confidence Through Selection
            </h2>
            <div className="flex flex-col gap-4 sm:gap-6 text-sm sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                PDCON works closely with Builders Warehouse Australia, which operates as the renovation showroom for our projects.
              </p>
              <p>
                The showroom allows clients to explore renovation materials and finishes while receiving practical renovation guidance.
              </p>
              <p className="font-semibold text-primary">Clients can view and compare:</p>
              <ul className="flex flex-col gap-2 sm:gap-3">
                {[
                  "Kitchens",
                  "Bathroom fixtures",
                  "Flooring and tiles",
                  "Lighting options",
                  "Tapware and fittings"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="hidden sm:block">
                Showroom visits can include a brief renovation consultation to discuss property improvement strategies.
              </p>
              <p className="font-semibold text-primary text-sm sm:text-base">
                Visit us at: 214 High St, Cranbourne VIC 3977
              </p>
            </div>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-12 py-5 sm:py-8 text-sm sm:text-lg font-bold rounded-none shadow-elegant w-full sm:w-fit group">
              <a href="/consultation?type=showroom-booking" className="flex items-center justify-center gap-2 sm:gap-3">
                Book Showroom Visit <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
              </a>
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
      <section className="py-8 sm:py-12 bg-muted border-y border-border">
        <Container clean className="flex flex-col gap-8 sm:gap-12 px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4 sm:gap-6">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-secondary">Explore & Compare</span>
            <p className="text-base sm:text-xl text-muted-foreground">
              Clients can view and compare premium selections for every zone of the property.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {[
              { icon: Grid3X3, title: "Kitchens", desc: "View cabinetry finishes, stone benchtops, and modern hardware configurations." },
              { icon: Bath, title: "Bathroom Fixtures", desc: "Compare tapware, basins, and architectural shower systems." },
              { icon: Home, title: "Flooring & Tiles", desc: "Explore engineered timber, premium carpets, and designer tiling options." },
              { icon: Lightbulb, title: "Lighting Options", desc: "Modern LED solutions and architectural pendant lighting." },
              { icon: Hammer, title: "Tapware & Fittings", desc: "High-end finishes in matte black, brushed gold, and classic chrome." },
              { icon: CheckCircle2, title: "Expert Guidance", desc: "Showroom visits include a brief consultation to discuss improvement strategies." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 sm:p-10 border border-border hover:border-secondary transition-all duration-500 flex flex-col gap-3 sm:gap-6 group">
                <item.icon className="w-6 h-6 sm:w-10 sm:h-10 text-secondary" />
                <h3 className="text-sm sm:text-xl font-display font-bold text-primary">{item.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-base hidden sm:block">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.05)_0%,transparent_70%)]" />
        <Container clean className="px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8 relative z-10 py-8 sm:py-12 border-y border-muted">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-secondary">Strategic Preparation</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary max-w-4xl leading-tight italic">
              Visualise Your Property <span className="text-gold">Transformation</span>
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl px-2">
              Book a showroom visit to discuss your property improvement goals and explore high-end material options.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-16 py-6 sm:py-10 text-base sm:text-xl font-bold rounded-none shadow-elegant group transition-all duration-500 hover:scale-105">
              <a href="/consultation?type=showroom-booking" className="flex items-center gap-2 sm:gap-4">
                Book Showroom Visit <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
