import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, CheckCircle2, TrendingUp, Home, Sparkles, Building2, Paintbrush, Lightbulb, Grid3X3, Hammer, ClipboardCheck, LayoutDashboard, BadgeDollarSign, Users, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/ui/SEO';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { sendContactEmail } from '@/lib/email';

const PRELOAD_IMAGES = [
  '/landing.webp',
  '/projects/home/main.webp',
  '/projects/home/pool.webp',
  '/projects/home/bedroom.webp',
  '/projects/home2/main.webp',
];

export function HomePage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  React.useEffect(() => {
    let loadedCount = 0;
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === PRELOAD_IMAGES.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === PRELOAD_IMAGES.length) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string || '',
      email: formData.get('email') as string,
      suburb: formData.get('suburb') as string || '',
      message: formData.get('message') as string || '',
      type: 'Contact Form',
    };

    try {
      const emailResult = await sendContactEmail(data);
      
      if (!emailResult.success) {
        throw new Error(emailResult.error);
      }

      toast.success('Message sent successfully. We will contact you shortly.');
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
        title="Renovate Before Selling | PDCON Melbourne Property Value Specialists" 
        description="Melbourne's premier property value specialists. Strategic renovations designed to improve buyer appeal and achieve stronger property outcomes."
      />
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img 
            src="/landing.webp" 
            alt="Property Value Improvement Specialists" 
            className={cn(
              "w-full h-full object-cover brightness-[0.3] transition-opacity duration-700",
              imagesLoaded ? "opacity-100" : "opacity-0"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-transparent to-primary" />
        </div>

        <Container className="relative z-10 text-center flex flex-col items-center">
          <span className="text-secondary font-bold uppercase tracking-[0.4em] text-xs mb-8 animate-reveal stagger-1">
            Melbourne's Premier Property Value Specialists
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 max-w-6xl leading-[1.05] animate-reveal stagger-2">
            Renovate Before Selling. <br /><span className="text-gold italic">Maximise Your Property Value.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mb-12 font-medium leading-relaxed animate-reveal stagger-3">
            Strategic renovations designed to improve buyer appeal and achieve stronger property outcomes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 animate-reveal stagger-4 mb-20">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-primary px-12 py-8 text-lg font-bold rounded-none shadow-gold transition-all duration-300 group">
              <Link to="/consultation" className="flex items-center gap-3">
                Book Property Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white/30 text-white hover:bg-white/5 hover:border-white/50 px-12 py-8 text-lg font-bold rounded-none backdrop-blur-sm transition-colors duration-200">
              <Link to="/past-projects">View Case Study</Link>
            </Button>
          </div>

          {/* Trust Bar */}
          <div className="w-full max-w-5xl border-t border-white/10 pt-12 animate-reveal stagger-5">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">
              <div className="flex items-center gap-3">
                <span className="text-secondary">30+</span> Years Construction Experience
              </div>
              <div className="flex items-center gap-3">
                <span className="text-secondary">13+</span> Years Property Development Experience
              </div>
              <div className="flex items-center gap-3">
                <span className="text-secondary">$110M+</span> Property Transactions
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. FEATURED TRANSFORMATION */}
      <section className="bg-white py-12 overflow-hidden relative border-b border-muted">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-muted" />
        <Container clean>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
                  <p className="text-secondary font-display font-bold text-4xl md:text-5xl italic tracking-tight">$355,000 Value Increase</p>
                </div>
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-bold rounded-none h-20 px-16 text-lg transition-all duration-500 shadow-elegant">
                  <Link to="/past-projects/berwick-transformation">View Full Case Study</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative group">
              <BeforeAfterSlider 
                beforeImage="/projects/home/before.webp"
                afterImage="/projects/home/main.webp"
                beforeLabel="Original Presentation"
                afterLabel="PDCON Transformation"
                className="h-[500px] md:h-[700px] shadow-2xl border border-muted"
              />
              <div className="absolute -top-10 -right-10 w-40 h-40 border-t border-r border-secondary/30 pointer-events-none hidden lg:block" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b border-l border-secondary/30 pointer-events-none hidden lg:block" />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. SELLER DECISION GUIDE */}
      <section className="bg-muted py-12 overflow-hidden">
        <Container clean>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <img 
                src="/projects/home2/main.webp" 
                alt="Strategic Planning" 
                className={cn(
                  "w-full aspect-square object-cover shadow-2xl transition-opacity duration-700",
                  imagesLoaded ? "opacity-100" : "opacity-0"
                )}
              />
            </div>
            <div className="flex flex-col gap-12 order-1 lg:order-2">
              <div className="flex flex-col gap-8">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">Strategic Advice</span>
                <h2 className="text-5xl md:text-6xl font-display font-bold text-primary italic leading-tight">
                  Should You Renovate <br />Before Selling?
                </h2>
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
      <section className="bg-white py-12 border-y border-border overflow-hidden">
        <Container clean className="flex flex-col gap-16">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-8">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">The PDCON Ecosystem</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-primary italic">Our Property Value System</h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Strategy, renovation expertise, and showroom selections integrated into one coordinated property improvement system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {[
              { step: "01", title: "Property Strategy", subtitle: "GHAN Projects", desc: "Development insight and market thinking." },
              { step: "02", title: "Strategic Renovation", subtitle: "PDCON", desc: "Renovation planning and execution." },
              { step: "03", title: "Showroom Selections", subtitle: "Builders Warehouse Australia", desc: "Renovation showroom and product selection." },
              { step: "04", title: "Market Presentation", subtitle: "The Final Asset", desc: "Improved buyer appeal and stronger sale outcomes." }
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
      <section className="bg-white py-12">
        <Container clean className="flex flex-col gap-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">Strategic Portfolio</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-primary italic leading-tight">Featured Property <br />Transformations</h2>
            </div>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none h-16 px-12 text-sm font-bold uppercase tracking-widest">
              <Link to="/past-projects">View Full Portfolio</Link>
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
                image: '/projects/home/main.webp'
              },
              {
                id: 'berwick-refresh',
                title: 'Berwick Property Refresh',
                suburb: 'Berwick',
                summary: 'Swifter, targeted cosmetic refresh to solve market stalling.',
                metric: '$83,000+ Additional Value',
                image: '/projects/home2/main.webp'
              },
              {
                id: 'beaconsfield-transformation',
                title: 'Beaconsfield Property Transformation',
                suburb: 'Beaconsfield',
                summary: 'Auction purchase renovation designed for market repositioning.',
                metric: '$800,000 Sale Result',
                image: '/projects/home3/kitchen.webp'
              }
            ].map((project) => (
              <Link key={project.id} to={`/past-projects/${project.id}`} className="group flex flex-col gap-10">
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
      <section className="bg-primary py-12">
        <Container clean>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">Expert Consultation</span>
                <h2 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight italic">
                  Property Improvement <span className="text-gold">Consultation</span>
                </h2>
              </div>
              <p className="text-xl text-white/60 leading-relaxed font-light">
                Our specialists provide expert analysis on buyer appeal and market positioning to identify the strategic improvements required to maximise your property's value.
              </p>
              
              <div className="flex flex-col gap-6">
                {[
                  "Strategic Value Analysis",
                  "Buyer Appeal Optimisation",
                  "ROI Focused Improvement Brief"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 text-white font-medium">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-8 pt-8">
                <a href="tel:0408255259" className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary transition-all duration-300">
                    <Phone className="w-6 h-6 text-secondary group-hover:text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Phone</span>
                    <span className="text-xl font-semibold text-white">0408 255 259</span>
                  </div>
                </a>
                <a href="mailto:info@pdcon.com.au" className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary transition-all duration-300">
                    <Mail className="w-6 h-6 text-secondary group-hover:text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Email</span>
                    <span className="text-xl font-semibold text-white">info@pdcon.com.au</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white p-10 md:p-14 shadow-2xl">
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name *</label>
                  <Input name="name" required placeholder="Your name" className="rounded-none border-muted h-14 focus:border-secondary" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address *</label>
                    <Input name="email" type="email" required placeholder="email@address.com" className="rounded-none border-muted h-14 focus:border-secondary" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone Number *</label>
                    <Input name="phone" type="tel" required placeholder="0400 000 000" className="rounded-none border-muted h-14 focus:border-secondary" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Property Suburb</label>
                  <Input name="suburb" placeholder="e.g. Berwick, Narre Warren" className="rounded-none border-muted h-14 focus:border-secondary" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea 
                    name="message" 
                    rows={4} 
                    placeholder="Tell us about your property..."
                    className="w-full rounded-none border border-muted px-4 py-3 text-sm focus:outline-none focus:border-secondary resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="bg-primary text-white hover:bg-secondary hover:text-primary h-16 text-sm font-bold uppercase tracking-widest transition-all duration-500 rounded-none mt-4"
                >
                  {isSubmitting ? 'Sending...' : 'Request Consultation'}
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
