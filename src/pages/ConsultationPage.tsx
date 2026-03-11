import React from 'react';
import { Link, useSearch } from '@tanstack/react-router';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Clock, ShieldCheck, ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { SEO } from '@/components/ui/SEO';
import { sendContactEmail } from '@/lib/email';
import { cn } from '@/lib/utils';

function ShowroomBookingForm({ isSubmitting, onSubmit }: { isSubmitting: boolean; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };
  
  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
  
  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dayOfWeek = date.getDay();
    return date < today || dayOfWeek === 0 || dayOfWeek === 6;
  };
  
  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    return selectedDate.toISOString().split('T')[0];
  };
  
  const formatDisplayDate = () => {
    if (!selectedDate) return 'Select a date';
    return selectedDate.toLocaleDateString('en-AU', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };
  
  const monthYear = currentMonth.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
  
  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(prev);
    }
  };
  
  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };
  
  const canGoPrev = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    return prev >= new Date(today.getFullYear(), today.getMonth(), 1);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 relative z-10">
      <input type="hidden" name="preferred_date" value={formatSelectedDate()} />
      
      <div className="text-center mb-2">
        <Calendar className="w-10 h-10 text-secondary mx-auto mb-3" />
        <h3 className="text-2xl font-display font-bold text-primary">Schedule Your Visit</h3>
        <p className="text-muted-foreground mt-1 text-sm">214 High St, Cranbourne VIC 3977</p>
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Your Name</label>
        <Input name="name" placeholder="John Doe" required className="bg-white border-muted h-12 rounded-none focus:ring-secondary focus:border-secondary text-base" />
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Phone or Email</label>
        <Input name="phone" placeholder="0400 000 000 or email@example.com" required className="bg-white border-muted h-12 rounded-none focus:ring-secondary focus:border-secondary text-base" />
      </div>
      
      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Preferred Visit Date</label>
        
        <div className="bg-white border border-muted p-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              type="button"
              onClick={prevMonth}
              disabled={!canGoPrev()}
              className={cn(
                "p-2 hover:bg-muted rounded transition-colors",
                !canGoPrev() && "opacity-30 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-bold text-primary">{monthYear}</span>
            <button 
              type="button"
              onClick={nextMonth}
              className="p-2 hover:bg-muted rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-center text-[10px] font-bold text-muted-foreground py-1">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startingDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isDisabled = isDateDisabled(day);
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const isSelected = selectedDate?.toDateString() === date.toDateString();
              const isToday = date.toDateString() === today.toDateString();
              
              return (
                <button
                  key={day}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    "aspect-square flex items-center justify-center text-sm font-medium rounded transition-all",
                    isDisabled && "text-muted-foreground/30 cursor-not-allowed",
                    !isDisabled && !isSelected && "hover:bg-secondary/20 text-primary",
                    isSelected && "bg-secondary text-primary font-bold",
                    isToday && !isSelected && "ring-1 ring-secondary"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
        
        {selectedDate && (
          <div className="flex items-center gap-2 text-sm text-primary font-medium bg-secondary/10 px-4 py-3 border border-secondary/20">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            {formatDisplayDate()}
          </div>
        )}
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 text-base rounded-none shadow-elegant group transition-all">
          {isSubmitting ? 'Sending...' : (
            <span className="flex items-center justify-center gap-3">
              Confirm Showroom Visit <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
          )}
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        We'll confirm your appointment within 24 hours. Weekdays only.
      </p>
    </form>
  );
}

export function ConsultationPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const searchParams = new URLSearchParams(window.location.search);
  const isShowroomBooking = searchParams.get('type') === 'showroom-booking';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    let data;
    
    if (isShowroomBooking) {
      const preferredDate = formData.get('preferred_date') as string;
      data = {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string || '',
        email: formData.get('email') as string || '',
        suburb: '',
        type: 'Showroom Visit Booking',
        message: preferredDate ? `Preferred visit date: ${preferredDate}` : 'No date specified',
      };
    } else {
      const projectType = formData.get('type') as string || 'pre-sale';
      const estimatedValue = formData.get('value') as string;
      const userMessage = formData.get('message') as string;
      
      data = {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        suburb: formData.get('suburb') as string,
        type: `Consultation Request - ${projectType}`,
        message: [
          estimatedValue ? `Estimated value: ${estimatedValue}` : '',
          userMessage || ''
        ].filter(Boolean).join('\n\n'),
      };
    }

    try {
      const emailResult = await sendContactEmail(data);
      
      if (!emailResult.success) {
        throw new Error(emailResult.error);
      }

      toast.success(isShowroomBooking 
        ? 'Showroom visit request sent. We will confirm your appointment shortly.' 
        : 'Consultation request sent successfully. We will contact you shortly.'
      );
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
        title={isShowroomBooking ? "Book Showroom Visit | PDCON Cranbourne" : "Book Free Property Assessment | Renovation Consultation Melbourne"} 
        description={isShowroomBooking 
          ? "Book a visit to our renovation showroom at 214 High St, Cranbourne. View kitchens, bathrooms, flooring and more."
          : "Book a strategic property assessment with PDCON. Get a professional roadmap for your property's value creation and market preparation. Free consultation in Melbourne."
        }
        canonical="/consultation"
        image="/landing.webp"
      />
      {/* Page Header */}
      <section className="bg-primary pt-24 sm:pt-32 pb-8 sm:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        </div>
        <Container className="relative z-10 flex flex-col gap-6 sm:gap-10 text-center items-center py-0 px-4 sm:px-6">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-secondary">
            {isShowroomBooking ? 'Showroom Appointment' : 'Strategic Entry'}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-display font-bold text-white max-w-5xl leading-[1.1] italic">
            {isShowroomBooking ? (
              <>Book Showroom <br className="hidden sm:block" /><span className="text-gold underline decoration-secondary/20 underline-offset-8 sm:underline-offset-[16px]">Visit</span></>
            ) : (
              <>Request Property <br className="hidden sm:block" /><span className="text-gold underline decoration-secondary/20 underline-offset-8 sm:underline-offset-[16px]">Assessment</span></>
            )}
          </h1>
          <p className="text-base sm:text-2xl text-white/50 max-w-3xl leading-relaxed font-light px-2">
            {isShowroomBooking 
              ? "Visit our showroom at 214 High St, Cranbourne to explore premium renovation materials and finishes."
              : "Unsure how to maximise your property's value? Start with a professional onsite assessment and a data-driven ROI strategy brief."
            }
          </p>
        </Container>
      </section>

      {/* Form Section */}
      <section className="py-8 sm:py-12 bg-white">
        <Container clean className={`grid grid-cols-1 ${isShowroomBooking ? '' : 'lg:grid-cols-12'} gap-8 lg:gap-16 px-4 sm:px-6 lg:px-12`}>
          
          {/* Left Side: Contact Info - Only show for regular consultation */}
          {!isShowroomBooking && (
            <div className="lg:col-span-5 flex flex-col gap-8 lg:gap-16">
              <div className="flex flex-col gap-4 sm:gap-8">
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-primary italic leading-tight">Strategic Property Consultation</h2>
                <p className="text-base sm:text-xl text-muted-foreground leading-relaxed font-light">
                  Our assessment provides a professional roadmap for your property's value creation and market preparation.
                </p>
              </div>

              <div className="flex flex-col gap-6 lg:gap-12 hidden lg:flex">
                {[
                  { title: "Physical Asset Analysis", desc: "A detailed physical analysis of your property's potential and buyer friction points." },
                  { title: "Value-Add Strategy", desc: "Targeted improvement recommendations designed exclusively to drive higher ROI." },
                  { title: "Market Positioning", desc: "Strategic insights into current buyer psychology and premium market expectations." },
                  { title: "Infrastructure Brief", desc: "Clear project delivery schedule and precise investment modeling." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 lg:gap-8 items-start group">
                    <div className="w-10 h-10 lg:w-14 lg:h-14 bg-muted border border-border flex items-center justify-center shrink-0 group-hover:border-secondary transition-all duration-500 shadow-sm">
                      <CheckCircle2 className="w-5 h-5 lg:w-7 lg:h-7 text-secondary" />
                    </div>
                    <div className="flex flex-col gap-1 lg:gap-2">
                      <h4 className="text-base lg:text-xl font-bold font-heading text-primary italic">{item.title}</h4>
                      <p className="text-sm lg:text-base text-muted-foreground font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 lg:pt-16 border-t border-muted grid grid-cols-2 gap-4 lg:gap-12 hidden lg:grid">
                <div className="flex flex-col gap-2 lg:gap-3">
                  <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Call Us</span>
                  <a href="tel:0408255259" className="text-lg lg:text-2xl font-bold text-primary hover:text-secondary transition-colors">0408 255 259</a>
                </div>
                <div className="flex flex-col gap-2 lg:gap-3">
                  <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</span>
                  <a href="mailto:info@pdcon.com.au" className="text-lg lg:text-2xl font-bold text-primary hover:text-secondary transition-colors break-all">info@pdcon.com.au</a>
                </div>
              </div>
            </div>
          )}

          {/* Right Side: Booking Form */}
          <div className={isShowroomBooking ? 'max-w-2xl mx-auto w-full' : 'lg:col-span-7'}>
            <div className="p-6 sm:p-10 lg:p-16 bg-muted border border-border rounded-sm shadow-elegant relative overflow-hidden">
              {/* Form Backdrop */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 -translate-y-1/2 translate-x-1/2 blur-3xl rounded-full" />
              
              {isShowroomBooking ? (
                /* Showroom Booking Form - Simplified */
                <ShowroomBookingForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />
              ) : (
                /* Regular Consultation Form */
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Full Name</label>
                      <Input name="name" placeholder="John Doe" required className="bg-white border-muted h-12 sm:h-14 rounded-none focus:ring-secondary focus:border-secondary text-base" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Phone Number</label>
                      <Input name="phone" type="tel" placeholder="0400 000 000" required className="bg-white border-muted h-12 sm:h-14 rounded-none focus:ring-secondary focus:border-secondary text-base" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Email Address</label>
                      <Input name="email" type="email" placeholder="john@example.com" required className="bg-white border-muted h-12 sm:h-14 rounded-none focus:ring-secondary focus:border-secondary text-base" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Estimated Value</label>
                      <Input name="value" placeholder="e.g. $1.5M" required className="bg-white border-muted h-12 sm:h-14 rounded-none focus:ring-secondary focus:border-secondary text-base" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Property Suburb</label>
                      <Input name="suburb" placeholder="Berwick, VIC" required className="bg-white border-muted h-12 sm:h-14 rounded-none focus:ring-secondary focus:border-secondary text-base" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Project Type</label>
                      <select name="type" className="bg-white border border-muted h-12 sm:h-14 px-4 rounded-none focus:ring-secondary focus:border-secondary outline-none text-base font-medium">
                        <option value="pre-sale">Pre-Sale Renovation</option>
                        <option value="bathroom">Bathroom Renovation</option>
                        <option value="cosmetic">Cosmetic Upgrades</option>
                        <option value="other">Other / Development</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Brief Project Overview</label>
                    <Textarea name="message" placeholder="Tell us about your property goals..." className="bg-white border-muted min-h-[100px] sm:min-h-[120px] rounded-none focus:ring-secondary focus:border-secondary text-base" />
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 sm:py-6 text-base sm:text-lg rounded-none shadow-elegant group transition-all">
                      {isSubmitting ? 'Sending...' : (
                        <span className="flex items-center justify-center gap-2 sm:gap-3">
                          Submit Request <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-6 pt-2 sm:pt-4">
                    <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <ShieldCheck className="w-4 h-4 text-secondary shrink-0" /> <span className="whitespace-nowrap">Privacy</span>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <Clock className="w-4 h-4 text-secondary shrink-0" /> <span className="whitespace-nowrap">48h Response</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
            
            {/* Mobile Contact Info - Only show for regular consultation */}
            {!isShowroomBooking && (
              <div className="lg:hidden mt-8 p-6 bg-primary text-white rounded-sm">
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Contact Us Directly</span>
                  <a href="tel:0408255259" className="text-2xl font-bold hover:text-secondary transition-colors">0408 255 259</a>
                  <a href="mailto:info@pdcon.com.au" className="text-base text-white/70 hover:text-secondary transition-colors">info@pdcon.com.au</a>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

    </div>
  );
}
