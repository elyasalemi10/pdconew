import React from 'react';
import { Link } from '@tanstack/react-router';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Building2, TrendingUp, HandCoins, ArrowDown, Sparkles } from 'lucide-react';
import { SEO } from '@/components/ui/SEO';

export function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="About PDCON" 
        description="Learn about PDCON's 30+ years of construction experience and our strategic focus on property value improvement in Melbourne."
      />
      {/* Page Header */}
      <section className="bg-primary pt-60 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        </div>
        <Container className="relative z-10 flex flex-col gap-10 text-center items-center py-0">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">About PDCON</span>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-white max-w-5xl leading-[1.1] italic">
            30+ Years Construction Experience <br />
            <span className="text-gold underline decoration-secondary/20 underline-offset-[16px]">13+ Years Property Development & Value Creation</span>
          </h1>
          <p className="text-2xl text-white/50 max-w-3xl leading-relaxed font-light">
            Delivering architectural quality and strong market outcomes through strategic renovation and construction.
          </p>
        </Container>
      </section>

      {/* History Section */}
      <section className="py-40 bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="flex flex-col gap-12">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-primary leading-tight italic">
              Strategic Property <span className="text-gold">Value Improvement</span>
            </h2>
            <div className="flex flex-col gap-8 text-xl text-muted-foreground leading-relaxed font-light">
              <p>
                PDCON (Perfect Design & Construction) was established with a singular focus: delivering architectural quality and strong market outcomes through strategic renovation and construction.
              </p>
              <p>
                With more than 30 years of combined construction experience and over 13 years of property development and value creation, our team understands both how buildings are constructed and how property value is created.
              </p>
              <p>
                What began as a boutique construction firm has evolved into a specialised property value improvement group based in Melbourne.
              </p>
              <p>
                Over the years we have participated in property transactions exceeding $110 million in total value.
              </p>
              <p>
                This year we have refined our focus to share our expertise through a dedicated strategic renovation system.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop" 
              alt="Architectural Construction" 
              className="w-full aspect-[4/5] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary flex flex-col items-center justify-center text-primary p-8 text-center gap-2 border border-secondary shadow-gold">
              <Building2 className="w-12 h-12 mb-2" />
              <h4 className="text-lg font-bold font-heading uppercase tracking-widest text-xs">Architectural Quality</h4>
            </div>
          </div>
        </Container>
      </section>

      {/* Ecosystem Section */}
      <section className="py-40 bg-muted border-y border-border">
        <Container clean>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
            <div className="flex flex-col gap-12">
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">The PDCON Ecosystem</h3>
              <div className="flex flex-col gap-8 text-xl text-muted-foreground leading-relaxed font-light">
                <p>
                  Through our close network of businesses — <strong>Ghan Homes</strong>, <strong>GHAN Projects</strong>, and <strong>Builders Warehouse Australia</strong> — we are able to provide more than renovation and construction.
                </p>
                <p>
                  Together these businesses create a property ecosystem that integrates development expertise, renovation strategy, market insight, and showroom product selection.
                </p>
                <p>
                  We position ourselves as strategic partners in the property journey — dedicated to increasing property value and presentation through planning, problem-solving, and professional project management.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-12 items-end">
              <div className="flex flex-col gap-2">
                <span className="text-6xl font-display font-bold text-primary">2013</span>
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">Year Established</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-6xl font-display font-bold text-primary">30+ Years</span>
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">Construction Experience</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-6xl font-display font-bold text-primary">$110M+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">Property Transactions</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <Container className="flex flex-col items-center text-center gap-12">
          <h2 className="text-4xl font-display font-bold text-primary max-w-2xl leading-tight italic">Ready to increase your property's value with our specialist group?</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button asChild size="lg" className="bg-primary rounded-none h-16 px-12 text-white">
              <Link to="/consultation">Book Property Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-muted rounded-none h-16 px-12">
              <Link to="/projects">View Success Stories</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
