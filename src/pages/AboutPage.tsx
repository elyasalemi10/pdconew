import React from 'react';
import { Link } from '@tanstack/react-router';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Building2, TrendingUp, ArrowRight } from 'lucide-react';
import { SEO } from '@/components/ui/SEO';

export function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="About PDCON | 30+ Years Construction Experience" 
        description="PDCON delivers architectural quality and strong market outcomes through strategic renovation and construction. 30+ years experience, $110M+ in property transactions."
      />
      
      {/* Page Header */}
      <section className="bg-primary pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        </div>
        <Container className="relative z-10 flex flex-col gap-10 text-center items-center py-0">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">About PDCON</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white max-w-5xl leading-[1.1]">
            <span className="text-gold italic">30+</span> Years Construction Experience<br />
            <span className="text-gold italic">13+</span> Years Property Development & Value Creation
          </h1>
          <p className="text-2xl text-white/50 max-w-3xl leading-relaxed font-light">
            Delivering architectural quality and strong market outcomes through strategic renovation and construction.
          </p>
        </Container>
      </section>

      {/* History Section */}
      <section className="py-12 bg-white">
        <Container clean className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary leading-tight italic">
              Strategic Property Value Improvement
            </h2>
            <div className="flex flex-col gap-6 text-lg text-muted-foreground leading-relaxed">
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
              src="/projects/home/main.webp" 
              alt="PDCON Property Transformation"
              className="w-full aspect-[4/5] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-10 -left-10 bg-secondary p-10 text-primary shadow-2xl">
              <Building2 className="w-10 h-10 mb-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Our Standard</span>
              <p className="text-2xl font-display font-bold mt-2">Architectural Quality</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Ecosystem Section */}
      <section className="py-12 bg-muted border-y border-border">
        <Container clean className="flex flex-col gap-12">
          <div className="max-w-3xl flex flex-col gap-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary leading-tight italic">
              The PDCON Ecosystem
            </h2>
            <div className="flex flex-col gap-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Through our close network of businesses — Ghan Homes, GHAN Projects, and Builders Warehouse Australia — we are able to provide more than renovation and construction.
              </p>
              <p>
                Together these businesses create a property ecosystem that integrates development expertise, renovation strategy, market insight, and showroom product selection.
              </p>
              <p>
                We position ourselves as strategic partners in the property journey — dedicated to increasing property value and presentation through planning, problem-solving, and professional project management.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 border border-border flex flex-col gap-4 text-center">
              <span className="text-5xl font-display font-bold text-secondary">2013</span>
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Year Established</span>
            </div>
            <div className="bg-white p-10 border border-border flex flex-col gap-4 text-center">
              <span className="text-5xl font-display font-bold text-secondary">30+</span>
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Years Construction Experience</span>
            </div>
            <div className="bg-white p-10 border border-border flex flex-col gap-4 text-center">
              <span className="text-5xl font-display font-bold text-secondary">$110M+</span>
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Property Transactions</span>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.05)_0%,transparent_70%)]" />
        <Container clean>
          <div className="flex flex-col items-center text-center gap-8 relative z-10 py-12 border-y border-muted">
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">Get Started</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary max-w-4xl leading-tight italic">
              Ready to increase your property's value with our specialist group?
            </h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-12 py-8 text-lg font-bold rounded-none shadow-elegant group">
                <Link to="/consultation" className="flex items-center gap-3">
                  Book Property Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white px-12 py-8 text-lg font-bold rounded-none">
                <Link to="/past-projects">View Success Stories</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
