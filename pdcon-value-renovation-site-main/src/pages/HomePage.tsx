import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, CheckCircle2, TrendingUp, Home, Bath, Sparkles, Building2, Wallet, Paintbrush, Lightbulb, Grid3X3, Hammer, ClipboardCheck, LayoutDashboard, BadgeDollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/ui/SEO';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { blink } from '@/lib/blink';

export function HomePage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleAssessmentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);

    try {
      await blink.db.consultations.create({
        name: formData.get('name') as string,
        phone: formData.get('phone') as string || '',
        email: formData.get('email') as string,
        suburb: formData.get('suburb') as string,
        type: 'assessment',
        message: formData.get('value') ? `Estimated value: ${formData.get('value')}` : '',
        status: 'new',
        createdAt: new Date().toISOString()
      });

      toast.success('Assessment request sent. We will contact you shortly.');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="Strategic Property Value Improvement | PDCON Melbourne" 
        description="Melbourne's premier property value improvement specialists. Strategic pre-sale renovations designed to increase buyer appeal and achieve stronger sale results."
      />
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
            alt="Strategic Property Transformation" 
            className="w-full h-full object-cover brightness-[0.2] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-transparent to-primary" />
        </div>

        <Container className="relative z-10 text-center flex flex-col items-center">
          <span className="text-secondary font-bold uppercase tracking-[0.4em] text-xs mb-8 animate-reveal">
            Melbourne's Premier Property Value Specialists
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white mb-8 max-w-6xl leading-[1.05] animate-reveal stagger-1">
            Renovate Before Selling. <br />
            <span className="text-gold italic">Maximise Your Property Value.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mb-12 font-light leading-relaxed animate-reveal stagger-2">
            Strategic renovations designed to improve buyer appeal and achieve stronger property outcomes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 animate-reveal stagger-3 mb-20">
            <Button asChild size="lg" className="bg-secondary hover:bg-white text-primary px-12 py-8 text-lg font-bold rounded-none shadow-gold transition-all duration-300 group">
              <Link to="/consultation" className="flex items-center gap-3">
                Book Property Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-12 py-8 text-lg font-bold rounded-none backdrop-blur-sm transition-all duration-300">
              <Link to="/projects/berwick-transformation">View Case Study</Link>
            </Button>
          </div>

          {/* Trust Bar */}
          <div className="w-full max-w-5xl border-t border-white/10 pt-12 animate-reveal stagger-4">
            <div className="flex flex-wrap justify-center gap-8 md:gap-20 text-white/40 font-bold uppercase tracking-[0.3em] text-[11px]">
              <div className="flex items-center gap-3 hover:text-secondary transition-colors cursor-default">
                <span className="text-secondary">30+ Years</span> Construction Experience
              </div>
              <div className="flex items-center gap-3 hover:text-secondary transition-colors cursor-default">
                <span className="text-secondary">13+ Years</span> Property Development Experience
              </div>
              <div className="flex items-center gap-3 hover:text-secondary transition-colors cursor-default">
                <span className="text-secondary">$110M+</span> Property Transactions
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. FEATURED TRANSFORMATION */}
      <section className="bg-white py-40 border-b border-muted overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-muted" />
        <Container clean>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-8 text-center lg:text-left">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">Featured Property Transformation</span>
                <h2 className="text-5xl md:text-7xl font-display font-bold text-primary italic leading-[1.1]">Berwick Property <br />Transformation</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-muted border border-muted overflow-hidden">
                {[
                  { label: "Before renovation value", value: "$1,600,000" },
                  { label: "Renovation investment", value: "$250,000" },
                  { label: "Sale price achieved", value: "$2,105,000" },
                  { label: "Value increase", value: "$355,000", highlight: true }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-10 flex flex-col gap-3 group hover:bg-muted transition-colors duration-500">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">{stat.label}</span>
                    <span className={cn("text-4xl font-display font-bold", stat.highlight ? "text-secondary" : "text-primary")}>{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left">
                <div className="bg-primary text-white p-10 border-l-8 border-secondary shadow-2xl w-full animate-reveal">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-secondary/60 mb-2 block font-bold">Documented Result</span>
                  <p className="text-secondary font-display font-bold text-5xl md:text-6xl italic tracking-tighter uppercase">$355,000 VALUE INCREASE</p>
                </div>
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-bold rounded-none h-20 px-16 text-lg transition-all duration-500 shadow-elegant">
                  <Link to="/projects/berwick-transformation">View Full Case Study</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative group">
              <BeforeAfterSlider 
                beforeImage="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FBefor__99df5e08.jpg?alt=media&token=42512108-8e68-45ec-9c44-59364998797f"
                afterImage="https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FAfter12Duffy__1e75abc2.jpg?alt=media&token=ea56624a-6c5f-4031-bc9f-5acb8fe38463"
                beforeLabel="Original Presentation"
                afterLabel="PDCON Transformation"
                className="h-[500px] md:h-[700px] shadow-2xl border border-muted"
              />
              <div className="absolute -top-10 -right-10 w-40 h-40 border-t border-r border-secondary/30 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b border-l border-secondary/30 pointer-events-none" />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. SELLER DECISION GUIDE SECTION */}
      <section className="bg-muted py-40 overflow-hidden">
        <Container clean>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" 
                alt="Strategic Planning" 
                className="w-full aspect-square object-cover shadow-2xl grayscale brightness-75"
              />
              <div className="absolute inset-0 border-[30px] border-white/10 m-10" />
            </div>
            <div className="flex flex-col gap-12 order-1 lg:order-2">
              <div className="flex flex-col gap-8">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">Strategic Advice</span>
                <h2 className="text-5xl md:text-6xl font-display font-bold text-primary italic leading-tight">Should You Renovate <br />Before Selling?</h2>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                Not every property requires renovation before entering the market. However, strategic improvements can often increase buyer interest and perceived value.
              </p>
              <div className="flex flex-col gap-6 text-lg text-primary font-medium">
                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs mb-2">Your property may benefit from renovation if:</p>
                {[
                  "kitchens or bathrooms appear outdated",
                  "flooring or lighting reduces presentation",
                  "landscaping or exterior areas lack appeal",
                  "competing homes in the area appear more modern",
                  "buyers may factor renovation costs into their offers"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-3 shrink-0" />
                    <p className="italic">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed font-light italic border-l-2 border-secondary pl-8 py-2">
                In some situations renovation may not be necessary. Our goal is to provide honest advice about whether strategic renovation will improve the outcome of your property sale.
              </p>
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 h-16 px-12 rounded-none w-fit">
                <Link to="/consultation">Get Specialist Advice</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. PROPERTY VALUE SYSTEM */}
      <section className="bg-white py-40 border-y border-border overflow-hidden">
        <Container clean className="flex flex-col gap-32">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-8">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">The PDCON Ecosystem</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-primary italic">Our Property Value System</h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Strategy, renovation expertise, and showroom selections integrated into one coordinated property improvement system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {[
              { 
                step: "01", 
                title: "Property Strategy", 
                subtitle: "GHAN Projects",
                desc: "Development insight and market thinking." 
              },
              { 
                step: "02", 
                title: "Strategic Renovation", 
                subtitle: "PDCON",
                desc: "Renovation planning and execution." 
              },
              { 
                step: "03", 
                title: "Showroom Selections", 
                subtitle: "Builders Warehouse Australia",
                desc: "Renovation showroom and product selection." 
              },
              { 
                step: "04", 
                title: "Market Presentation", 
                subtitle: "The Final Asset",
                desc: "Improved buyer appeal and stronger sale outcomes." 
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-12 flex flex-col gap-8 hover:bg-muted transition-colors duration-500 group">
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">{item.step}</span>
                <div className="flex flex-col gap-2">
                  <h4 className="text-2xl font-display font-bold text-primary italic leading-tight">{item.title}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">{item.subtitle}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. PORTFOLIO SECTION */}
      <section className="bg-white py-40">
        <Container clean className="flex flex-col gap-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">Strategic Portfolio</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-primary italic leading-tight">Featured Property <br />Transformations</h2>
            </div>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none h-16 px-12 text-sm font-bold uppercase tracking-widest">
              <Link to="/projects">View Full Portfolio</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[
              {
                id: 'berwick-transformation',
                title: 'Berwick Property Transformation',
                suburb: 'Berwick',
                summary: 'Strategic pre-sale renovation focusing on high-impact zones.',
                metric: '$355,000 Value Increase',
                image: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FAfter54-56Marisa3__82a95702.jpeg?alt=media&token=c2699878-809e-4952-a861-38e192c2f692'
              },
              {
                id: 'berwick-refresh',
                title: 'Berwick Property Refresh',
                suburb: 'Berwick',
                summary: 'Swifter, targeted cosmetic refresh to solve market stalling.',
                metric: '$83,000+ Additional Value',
                image: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FJEEZGcyQ__b575a0c1.jpeg?alt=media&token=06b9fb2f-2888-498c-8e6e-54908421271f'
              },
              {
                id: 'beaconsfield-transformation',
                title: 'Beaconsfield Property Transformation',
                suburb: 'Beaconsfield',
                summary: 'Auction purchase renovation designed for market repositioning.',
                metric: '$800,000 Sale Result',
                image: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FAfterBeaconsfieldUpper__cb2bb43f.jpg?alt=media&token=1492bec1-31d9-4a20-baaa-16d4688d4d71'
              }
            ].map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`} className="group flex flex-col gap-10">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted border border-border shadow-elegant">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-primary/90 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-700 opacity-0 group-hover:opacity-100">
                    <span className="text-secondary font-display font-bold text-2xl italic">{project.metric}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{project.suburb}, VIC</span>
                    <span className="w-8 h-[1px] bg-muted" />
                  </div>
                  <h4 className="text-3xl font-display font-bold text-primary group-hover:text-secondary transition-colors italic leading-tight">{project.title}</h4>
                  <p className="text-muted-foreground text-sm font-light italic leading-relaxed">{project.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. CONSULTATION SECTION */}
      <section className="bg-primary text-white py-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 -translate-y-1/2 translate-x-1/2 blur-[100px] rounded-full" />
        <Container clean>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">Expert Consultation</span>
                <h2 className="text-5xl md:text-7xl font-display font-bold leading-tight italic">Property Improvement <br /><span className="text-gold">Consultation</span></h2>
              </div>
              <p className="text-white/60 text-xl leading-relaxed font-light italic">
                Our specialists provide expert analysis on buyer appeal and market positioning to identify the strategic improvements required to maximise your property's value.
              </p>
              <div className="flex flex-col gap-6">
                {[
                  "Strategic Value Analysis",
                  "Buyer Appeal Optimisation",
                  "ROI Focused Improvement Brief"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 text-base font-medium">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-16 border border-white/10 shadow-2xl relative z-10">
              <form onSubmit={handleAssessmentSubmit} className="flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Full Name</label>
                  <Input name="name" required placeholder="Name" className="bg-white/5 border-white/10 h-14 text-white focus:ring-secondary placeholder:text-white/20 rounded-none" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Email Address</label>
                  <Input name="email" type="email" required placeholder="email@address.com" className="bg-white/5 border-white/10 h-14 text-white focus:ring-secondary placeholder:text-white/20 rounded-none" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Suburb</label>
                    <Input name="suburb" required placeholder="Suburb" className="bg-white/5 border-white/10 h-14 text-white focus:ring-secondary placeholder:text-white/20 rounded-none" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/50">Estimated Property Value</label>
                    <Input name="value" placeholder="e.g. $1.6M" className="bg-white/5 border-white/10 h-14 text-white focus:ring-secondary placeholder:text-white/20 rounded-none" />
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting} className="bg-secondary text-primary hover:bg-white h-20 text-xl font-bold transition-all duration-500 shadow-gold mt-4 rounded-none">
                  {isSubmitting ? 'Processing...' : 'Request Consultation'}
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}