import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Building2,
  Handshake,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';
import { SEO } from '@/components/shared/SEO';

const LOGO_URL = "/images/pdcon-logo.webp";
const API_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

const HIGHLIGHTS = [
  {
    icon: Building2,
    title: 'Property Development',
    text: 'End-to-end project management for residential and development sites across Melbourne.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Advisory',
    text: 'Strategic acquisition and feasibility guidance to maximise your returns.',
  },
  {
    icon: Handshake,
    title: 'Joint Ventures',
    text: 'Partnership opportunities that align capital, land, and expertise.',
  },
];

export default function ContactCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    if (!email?.trim() && !phone?.trim()) {
      toast.error('Please provide either an email address or phone number.');
      return;
    }

    setIsSubmitting(true);

    const data = {
      name: formData.get('name'),
      email,
      phone,
      projectType: 'Business Card Enquiry',
      budget: '',
      message: 'Enquiry submitted via business card contact page.',
    };

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success('Thanks — we will be in touch shortly.');
        (e.target as HTMLFormElement).reset();
        setSubmitted(true);
      } else {
        toast.error('Failed to send. Please try again.');
      }
    } catch {
      toast.error('Failed to send. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background">
      <SEO
        title="Connect with PDCON — Property Development Consultants Melbourne"
        url="/contact-2"
        description="Leave your details and PDCON will reach out. Expert property development, investment advisory, and joint venture consulting in Melbourne."
        keywords="PDCON contact, property development Melbourne, investment advisory, joint venture property, property consultant"
      />

      <section className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: About PDCON */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-accent" />
                  <img src={LOGO_URL} alt="PDCON" className="h-10 w-auto object-contain" />
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">
                  Let's Build <span className="text-accent">Together</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  PDCON is a Melbourne-based property development consultancy. We partner with
                  investors and landowners to unlock value across development, advisory, and joint
                  venture projects — guiding every step from feasibility to completion.
                </p>
              </div>

              <ul className="space-y-5">
                {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="block font-heading font-bold text-primary">{title}</span>
                      <span className="block text-sm text-muted-foreground leading-relaxed">{text}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 pt-2 border-t border-primary/10">
                <a href="tel:+61408255259" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                    <Phone size={16} />
                  </div>
                  <span className="text-primary font-bold group-hover:text-accent transition-colors">0408 255 259</span>
                </a>
                <a href="mailto:info@pdcon.com.au" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </div>
                  <span className="text-primary font-bold group-hover:text-accent transition-colors">info@pdcon.com.au</span>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                    <MapPin size={16} />
                  </div>
                  <span className="text-primary font-bold">7 Hammel Court, Hallam 3803, VIC</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-secondary/30 p-6 sm:p-10 border border-secondary shadow-2xl relative lg:sticky lg:top-28"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-accent/5 -z-10 rounded-bl-full" />

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto text-accent">
                    <CheckCircle2 size={32} />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-primary">Thank You</h2>
                  <p className="text-muted-foreground">
                    Your details are with us. A PDCON specialist will reach out shortly.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 mb-8">
                    <h2 className="text-2xl font-heading font-bold text-primary">Leave Your Details</h2>
                    <p className="text-sm text-muted-foreground">
                      Pop in your name and the best way to reach you — we'll do the rest.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-primary">Your Name</label>
                      <input
                        name="name"
                        required
                        placeholder="Jane Smith"
                        className="w-full bg-white border border-border p-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-primary">Phone</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+61 400 000 000"
                        className="w-full bg-white border border-border p-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="relative flex items-center gap-3">
                      <div className="flex-grow h-px bg-border" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">or</span>
                      <div className="flex-grow h-px bg-border" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-primary">Email</label>
                      <input
                        name="email"
                        type="email"
                        placeholder="jane@example.com"
                        className="w-full bg-white border border-border p-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-none bg-primary hover:bg-primary/95 text-white py-6 font-heading font-bold uppercase tracking-wider text-xs sm:text-sm h-auto flex gap-3"
                    >
                      {isSubmitting ? 'Sending...' : (
                        <>
                          Send <Send size={16} />
                        </>
                      )}
                    </Button>
                    <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                      Provide a phone number or email — whichever suits you best. 100% confidential.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
