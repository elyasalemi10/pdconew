import React from 'react';
import { Link } from '@tanstack/react-router';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Building2, UserPlus, Zap, BarChart3, Clock } from 'lucide-react';
import { SEO } from '@/components/ui/SEO';

export function AgentsPage() {
  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="For Real Estate Agents | Property Renovation Partner Melbourne" 
        description="Partner with PDCON to prepare vendor properties for market. Strategic renovations that increase listing appraisals and buyer competition. Referral program for Melbourne real estate agents."
        canonical="/agents"
        image="/projects/home/main.webp"
      />
      {/* Page Header */}
      <section className="bg-primary pt-24 sm:pt-32 pb-8 sm:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        </div>
        <Container className="relative z-10 flex flex-col gap-6 sm:gap-10 text-center items-center py-0 px-4 sm:px-6">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-secondary">Strategic Partnership</span>
          <h1 className="text-2xl sm:text-5xl md:text-8xl font-display font-bold text-white max-w-5xl leading-[1.15] italic">
            Strategic Property <span className="text-gold italic">Value Improvement</span> Partner for Agents
          </h1>
          <p className="text-base sm:text-2xl text-white/50 max-w-3xl leading-relaxed font-light px-2">
            Empower your vendors with the professional infrastructure required to maximise property potential. We handle the transformation, you handle the sale.
          </p>
          <Button asChild size="lg" className="bg-secondary text-primary hover:bg-white font-bold rounded-none h-14 sm:h-20 px-8 sm:px-16 mt-4 sm:mt-8 transition-all duration-500 shadow-gold text-sm sm:text-base">
            <Link to="/consultation" className="flex items-center gap-2 sm:gap-4">Refer a Vendor <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" /></Link>
          </Button>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-8 sm:py-12 bg-white">
        <Container className="flex flex-col gap-8 lg:gap-16 px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="flex flex-col gap-6 lg:gap-12">
              <h2 className="text-2xl sm:text-5xl md:text-6xl font-display font-bold text-primary leading-tight italic">
                Why Melbourne's Elite Agents Partner with PDCON
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-light">
                As an agent, your goal is to achieve the best possible result for your client. PDCON provides the strategic infrastructure to make that happen through professional value creation.
              </p>
              <div className="grid grid-cols-2 gap-px bg-muted border border-muted overflow-hidden">
                {[
                  { icon: BarChart3, title: "Value Creation", desc: "Our strategic upgrades consistently increase listing appraisals and buyer competition." },
                  { icon: Clock, title: "Market Readiness", desc: "Move-in ready homes attract immediate interest and shorter listing durations." },
                  { icon: Zap, title: "Strategic Edge", desc: "We provide your vendors with a clear, professional path to market preparation." },
                  { icon: UserPlus, title: "Agency Advantage", desc: "Offer your clients a comprehensive value-add service that separates your agency." }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-3 sm:gap-6 p-4 sm:p-10 bg-white hover:bg-muted transition-all duration-500 group">
                    <item.icon className="w-6 h-6 sm:w-10 sm:h-10 text-secondary group-hover:scale-110 transition-transform duration-500" />
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <h4 className="font-bold font-heading text-sm sm:text-xl text-primary">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed hidden sm:block">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="/projects/home/main.webp" 
                alt="Real Estate Professional" 
                className="w-full aspect-[4/5] object-cover shadow-2xl rounded-sm"
              />
              <div className="absolute -bottom-4 sm:-bottom-10 -left-4 sm:-left-10 bg-primary p-6 sm:p-12 text-white shadow-2xl border border-white/10 max-w-[280px] sm:max-w-xs">
                <p className="text-sm sm:text-lg font-display italic leading-relaxed">
                  "PDCON transformed our listing in just two weeks. The result was a record sale for the street."
                </p>
                <div className="mt-4 sm:mt-6 flex flex-col">
                  <span className="font-bold text-secondary tracking-widest text-[9px] sm:text-[10px] uppercase">ROHULLAH</span>
                  <span className="text-xs sm:text-sm font-heading">LJ Hooker - Dandenong | Berwick</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Referral Process */}
      <section className="py-8 sm:py-12 bg-muted border-y border-border">
        <Container className="flex flex-col gap-8 sm:gap-16 px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4 sm:gap-8">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-secondary">Strategic Workflow</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-primary italic">A Seamless Partnership</h2>
            <p className="text-muted-foreground text-sm sm:text-xl font-light">Our methodology is designed to integrate perfectly with your listing timeline.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-16 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-[48px] left-0 w-full h-[1px] bg-border z-0" />
            
            {[
              { step: "01", title: "Assessment Referral", desc: "Refer your vendor for a strategic property improvement assessment during the pre-listing phase." },
              { step: "02", title: "Value Strategy", desc: "We provide a comprehensive onsite assessment and ROI-focused transformation strategy within 48 hours." },
              { step: "03", title: "Execution & Launch", desc: "We execute the transformation swiftly, delivering a market-ready asset for your premium photography." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 sm:gap-10 relative z-10">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-primary text-white flex items-center justify-center font-display font-bold text-2xl sm:text-4xl shadow-2xl relative">
                  <div className="absolute inset-0 border border-secondary/20 -m-1 sm:-m-2 -z-10" />
                  {item.step}
                </div>
                <div className="flex flex-col gap-2 sm:gap-4 px-2 sm:px-6">
                  <h4 className="text-lg sm:text-2xl font-bold font-heading text-primary italic">{item.title}</h4>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Integration Section */}
      <section className="py-8 sm:py-12 bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-6 sm:gap-8 order-2 lg:order-1">
            <div className="aspect-video bg-muted relative overflow-hidden rounded-sm shadow-xl">
              <img 
                src="/projects/home2/main2.webp" 
                alt="Office Presentation" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-secondary text-primary flex items-center justify-center shadow-gold">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 sm:gap-10 order-1 lg:order-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary">Expert Presentations</span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-primary leading-tight">In-Office Training & Value Sessions</h2>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">
              We provide agents with insights into property value improvement. Our team can attend your office meetings to explain renovation trends, ROI metrics, and how to position renovations to your vendors.
            </p>
            <div className="flex flex-col gap-3 sm:gap-4">
              {[
                "Current market-proven color palettes",
                "High-impact vs Low-impact renovation areas",
                "How to pitch pre-sale improvements to vendors",
                "Managing listing timelines with construction"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-primary font-semibold">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" /> {text}
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="bg-primary rounded-none h-12 sm:h-16 px-8 sm:px-12 w-full sm:w-fit text-sm sm:text-base">
              <Link to="/consultation">Book Office Briefing</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Agent Portal CTA */}
      <section className="bg-white py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.05)_0%,transparent_70%)]" />
        <Container clean className="px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8 relative z-10 py-8 sm:py-12 border-y border-muted">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-secondary">Strategic Partnership</span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary max-w-4xl leading-tight italic">
              Ready to Partner with <span className="text-gold underline decoration-secondary/20 underline-offset-4 sm:underline-offset-[12px]">PDCON?</span>
            </h2>
            <p className="text-base sm:text-2xl text-muted-foreground font-medium max-w-2xl leading-relaxed italic px-2">
              Unlock the full potential of your listings and provide your vendors with premium renovation infrastructure.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-16 py-6 sm:py-10 text-base sm:text-2xl font-bold rounded-none shadow-elegant group transition-all duration-500 hover:scale-105 active:scale-95">
              <Link to="/consultation" className="flex items-center gap-2 sm:gap-4">
                Contact Agency Team <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 group-hover:translate-x-3 transition-transform duration-500" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
