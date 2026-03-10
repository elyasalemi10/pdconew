import React from 'react';
import { Link } from '@tanstack/react-router';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Phone, Mail, Clock, ShieldCheck, ArrowRight, Building2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { blink } from '@/lib/blink';
import { SEO } from '@/components/ui/SEO';

export function ConsultationPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);

    try {
      // Store in Blink DB
      await blink.db.consultations.create({
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        suburb: formData.get('suburb') as string,
        type: formData.get('type') as string || 'pre-sale',
        message: [
          formData.get('value') ? `Estimated value: ${formData.get('value')}` : '',
          formData.get('message') || ''
        ].filter(Boolean).join('. '),
        status: 'new',
        createdAt: new Date().toISOString()
      });

      toast.success('Consultation request sent successfully. We will contact you shortly.');
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
        title="Book Property Improvement Consultation" 
        description="Book a strategic property assessment with PDCON to identify renovations that will maximise your property's value."
      />
      {/* Page Header */}
      <section className="bg-primary pt-60 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        </div>
        <Container className="relative z-10 flex flex-col gap-10 text-center items-center py-0">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">Strategic Entry</span>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-white max-w-5xl leading-[1.1] italic">
            Request Property <br /><span className="text-gold underline decoration-secondary/20 underline-offset-[16px]">Assessment</span>
          </h1>
          <p className="text-2xl text-white/50 max-w-3xl leading-relaxed font-light">
            Unsure how to maximise your property's value? Start with a professional onsite assessment and a data-driven ROI strategy brief.
          </p>
        </Container>
      </section>

      {/* Form Section */}
      <section className="py-40 bg-white">
        <Container clean className="grid grid-cols-1 lg:grid-cols-12 gap-32">
          
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-16">
            <div className="flex flex-col gap-8">
              <h2 className="text-5xl font-display font-bold text-primary italic leading-tight">Strategic Property Consultation</h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                Our assessment provides a professional roadmap for your property's value creation and market preparation.
              </p>
            </div>

            <div className="flex flex-col gap-12">
              {[
                { title: "Physical Asset Analysis", desc: "A detailed physical analysis of your property's potential and buyer friction points." },
                { title: "Value-Add Strategy", desc: "Targeted improvement recommendations designed exclusively to drive higher ROI." },
                { title: "Market Positioning", desc: "Strategic insights into current buyer psychology and premium market expectations." },
                { title: "Infrastructure Brief", desc: "Clear project delivery schedule and precise investment modeling." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 items-start group">
                  <div className="w-14 h-14 bg-muted border border-border flex items-center justify-center shrink-0 group-hover:border-secondary transition-all duration-500 shadow-sm">
                    <CheckCircle2 className="w-7 h-7 text-secondary" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xl font-bold font-heading text-primary italic">{item.title}</h4>
                    <p className="text-base text-muted-foreground font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-16 border-t border-muted grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">General Enquiries</span>
                <a href="tel:0408255259" className="text-2xl font-bold text-primary hover:text-secondary transition-colors">0408 255 259</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Support</span>
                <a href="mailto:info@pdcon.com.au" className="text-2xl font-bold text-primary hover:text-secondary transition-colors">info@pdcon.com.au</a>
              </div>
            </div>
          </div>

          {/* Right Side: Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-16 bg-muted border border-border rounded-sm shadow-elegant relative overflow-hidden">
              {/* Form Backdrop */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 -translate-y-1/2 translate-x-1/2 blur-3xl rounded-full" />
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Full Name</label>
                    <Input name="name" placeholder="John Doe" required className="bg-white border-muted h-14 rounded-none focus:ring-secondary focus:border-secondary" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Phone Number</label>
                    <Input name="phone" placeholder="0400 000 000" required className="bg-white border-muted h-14 rounded-none focus:ring-secondary focus:border-secondary" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Email Address</label>
                    <Input name="email" type="email" placeholder="john@example.com" required className="bg-white border-muted h-14 rounded-none focus:ring-secondary focus:border-secondary" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Estimated Property Value</label>
                    <Input name="value" placeholder="e.g. $1.5M" required className="bg-white border-muted h-14 rounded-none focus:ring-secondary focus:border-secondary" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Property Suburb</label>
                    <Input name="suburb" placeholder="Berwick, VIC" required className="bg-white border-muted h-14 rounded-none focus:ring-secondary focus:border-secondary" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Project Type</label>
                    <select name="type" className="bg-white border border-muted h-14 px-4 rounded-none focus:ring-secondary focus:border-secondary outline-none text-sm font-medium">
                      <option value="pre-sale">Pre-Sale Renovation</option>
                      <option value="bathroom">Bathroom Renovation</option>
                      <option value="cosmetic">Cosmetic Upgrades</option>
                      <option value="other">Other / Development</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Brief Project Overview</label>
                  <Textarea name="message" placeholder="Tell us about your property goals..." className="bg-white border-muted min-h-[150px] rounded-none focus:ring-secondary focus:border-secondary" />
                </div>

                <div className="pt-8">
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-10 text-xl rounded-none shadow-elegant group transition-all">
                    {isSubmitting ? 'Sending Request...' : (
                      <span className="flex items-center gap-4">
                        Confirm Consultation Booking <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </span>
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-8 pt-8">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-secondary" /> Privacy Guaranteed
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <Clock className="w-4 h-4 text-secondary" /> 48h Response Time
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-muted border-t border-border">
        <Container clean className="flex flex-col items-center gap-12">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale contrast-125">
            <Building2 className="w-12 h-12" />
            <div className="text-2xl font-display font-bold">GHAN PROJECTS</div>
            <div className="text-2xl font-display font-bold">RENOVATION FINANCE</div>
            <Building2 className="w-12 h-12 rotate-45" />
          </div>
        </Container>
      </section>
    </div>
  );
}
