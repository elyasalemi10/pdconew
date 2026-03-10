import React from 'react';
import { Link } from '@tanstack/react-router';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { ArrowRight, Filter, TrendingUp } from 'lucide-react';
import { SEO } from '@/components/ui/SEO';
import { cn } from '@/lib/utils';


export const projects = [
  {
    id: 'berwick-transformation',
    title: 'Berwick Property Transformation',
    suburb: 'Berwick',
    type: 'Strategic Pre-Sale Renovation',
    roi: '142%', // $355k increase on $250k investment
    image: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FAfter54-56Marisa3__82a95702.jpeg?alt=media&token=c2699878-809e-4952-a861-38e192c2f692',
    description: 'This Berwick property underwent a full strategic pre-sale renovation designed to reposition the home for the market and significantly improve buyer appeal.',
    overview: 'This project involved a full strategic renovation of a residential property in Berwick, Victoria. The home had strong underlying value but required substantial upgrades to align with modern buyer expectations and maximise its market potential.',
    challenge: 'The renovation strategy focused on delivering maximum presentation impact and improving the perceived value of the property.',
    strategy: 'The renovation strategy focused on improving presentation, functionality and buyer appeal through a complete transformation of the interior and external presentation.',
    scope: [
      'New flooring throughout the home',
      'New kitchen installation',
      'Full bathroom renovation',
      'New electrical lighting upgrades',
      'Landscaping improvements',
      'External rendering',
      'Interior presentation upgrades'
    ],
    duration: '14 Weeks',
    projectDuration: 'The renovation was completed over a 14-week period including planning, renovation works and final presentation improvements.',
    result: 'The renovation significantly improved the property\'s presentation and market positioning, resulting in a stronger sale outcome than originally anticipated.',
    metrics: [
      { label: 'Before renovation value', value: '$1,600,000' },
      { label: 'Renovation investment', value: '$250,000' },
      { label: 'Sale price achieved', value: '$2,105,000' },
      { label: 'Value increase', value: '$355,000', highlight: true }
    ],
    gallery: [
      {
        before: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FBefor__99df5e08.jpg?alt=media&token=42512108-8e68-45ec-9c44-59364998797f',
        after: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FJEEZGcyQ__b575a0c1.jpeg?alt=media&token=06b9fb2f-2888-498c-8e6e-54908421271f',
        label: 'Interior Transformation'
      }
    ]
  },
  {
    id: 'berwick-refresh',
    title: 'Berwick Property Refresh',
    suburb: 'Berwick',
    type: 'Cosmetic Upgrade',
    roi: '218%',
    image: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FAfter54-56Marisa3__82a95702.jpeg?alt=media&token=c2699878-809e-4952-a861-38e192c2f692',
    description: 'A targeted cosmetic upgrade strategy delivered with a renovation budget of $38,000 to resolve unfinished presentation items.',
    overview: 'This Berwick property had several presentation items remaining unfinished. Because of these incomplete improvements the owner struggled to achieve the desired sale result.',
    strategy: 'A targeted cosmetic upgrade strategy was delivered with a renovation budget of $38,000. These relatively small but strategic upgrades significantly improved the property\'s presentation and buyer appeal.',
    scope: [
      'Roof restoration and colour update',
      'Landscaping improvements',
      'Epoxy flooring throughout key areas',
      'External presentation improvements'
    ],
    duration: '3 Weeks',
    projectDuration: 'The cosmetic refresh was completed swiftly to meet the listing timeline.',
    result: 'The improvements significantly improved the property\'s presentation and buyer appeal, leading to a result that exceeded previous attempts.',
    metrics: [
      { label: 'Renovation investment', value: '$38,000' },
      { label: 'Additional value achieved', value: '$83,000+', highlight: true }
    ],
    gallery: []
  },
  {
    id: 'devon-meadows-transformation',
    title: 'Devon Meadows Property Transformation',
    suburb: 'Devon Meadows',
    type: 'Risk Recovery Renovation',
    roi: 'Stabilised',
    image: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FAfterDevonMeadows__827c3949.jpg?alt=media&token=778f3c7b-6ac1-497b-814d-db3966ea1e39',
    description: 'This project involved a property purchased in an unfinished condition after construction work by another party was abandoned.',
    overview: 'This project involved a property that had been purchased in an unfinished condition after construction work by another party was abandoned. The situation presented significant risk to the client.',
    strategy: 'Through specialist renovation management and careful planning the project was stabilised and completed. The experience highlighted that renovation is a specialised discipline requiring foresight, problem-solving and financial discipline.',
    scope: [
      'Project audit and stabilisation',
      'Completion of structural works',
      'Interior fit-out completion',
      'Quality assurance and certification'
    ],
    duration: 'Multi-Phase',
    projectDuration: 'Completion of a stalled project requiring extensive remedial work and project stabilisation.',
    result: 'Through strategic intervention and careful project management, the property was stabilised and completed. Key lesson: Never over-capitalise and do not renovate based on emotion.',
    metrics: [
      { label: 'Purchase price', value: '$945,000' },
      { label: 'Total renovation and project costs', value: '$450,000' }
    ],
    gallery: [
      {
        before: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2F5FisherisBefore__30f81d11.jpg?alt=media&token=6e440628-9844-469b-980b-9685387a2069',
        after: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FAfterDevonMeadows__827c3949.jpg?alt=media&token=778f3c7b-6ac1-497b-814d-db3966ea1e39',
        label: 'External Stabilisation'
      }
    ]
  },
  {
    id: 'beaconsfield-transformation',
    title: 'Beaconsfield Property Transformation',
    suburb: 'Beaconsfield',
    type: 'Auction Purchase Renovation',
    roi: '210%',
    image: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FAfterBeaconsfieldUpper__cb2bb43f.jpg?alt=media&token=1492bec1-31d9-4a20-baaa-16d4688d4d71',
    description: 'This project involved a major renovation following an auction purchase, focused on repositioning the property in the market.',
    overview: 'This project involved a major renovation following an auction purchase. The renovation focused on improving the presentation and repositioning the property in the market through a targeted upgrade strategy.',
    strategy: 'The renovation focused on improving the presentation and repositioning the property in the market through a targeted upgrade strategy.',
    scope: [
      'Full interior cosmetic renovation',
      'Kitchen upgrade',
      'Presentation refinements',
      'Landscaping'
    ],
    duration: '10 Weeks',
    projectDuration: 'A 10-week intensive renovation to prepare for market relaunch.',
    result: 'The property achieved a successful sale outcome of $800,000, validating the repositioning strategy.',
    metrics: [
      { label: 'Purchase price', value: '$570,000' },
      { label: 'Renovation investment', value: '$110,000' },
      { label: 'Sale price achieved', value: '$800,000', highlight: true }
    ],
    gallery: [
      {
        before: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FBeforBeaconsfiledupper__a6826761.jpg?alt=media&token=7593da9a-c960-4d7d-972c-03fd820c8158',
        after: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FAfterBeaconsfieldUpper__cb2bb43f.jpg?alt=media&token=1492bec1-31d9-4a20-baaa-16d4688d4d71',
        label: 'Facade Transformation'
      }
    ]
  },
  {
    id: 'duffy-court-transformation',
    title: 'Duffy Court Visual Transformation',
    suburb: 'Beaconsfield',
    type: 'Visual Transformation',
    roi: 'N/A',
    image: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FdWabIcrKixSdwUX9S0tZ3qjwI0M2%2FAfter12Duffy__1e75abc2.jpg?alt=media&token=ea56624a-6c5f-4031-bc9f-5acb8fe38463',
    description: 'This project focused on improving the property\'s overall presentation and buyer appeal through carefully selected visual upgrades.',
    overview: 'This project focused on improving the property\'s overall presentation and buyer appeal through carefully selected upgrades.',
    strategy: 'The transformation modernised the appearance of the home and strengthened its visual impact for the market, resulting in improved sale readiness and stronger buyer interest.',
    scope: [
      'Visual presentation upgrades',
      'Strategic lighting',
      'Curb appeal enhancements'
    ],
    duration: '4 Weeks',
    projectDuration: 'Focused aesthetic improvements completed for market launch.',
    result: 'Significantly strengthened visual impact and buyer enquiry levels.',
    metrics: []
  }
];

export function ProjectsPage() {
  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="Featured Property Transformations | PDCON Melbourne" 
        description="Explore our portfolio of high-end property value improvements and strategic pre-sale renovations across Melbourne."
      />
      {/* Page Header */}
      <section className="bg-primary pt-60 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        </div>
        <Container className="relative z-10 flex flex-col gap-10 text-center items-center">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">Strategic Portfolio</span>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-white max-w-5xl leading-[1.1] italic">
            Featured Property <br /><span className="text-gold underline decoration-secondary/20 underline-offset-[16px]">Transformations</span>
          </h1>
          <p className="text-2xl text-white/50 max-w-3xl leading-relaxed font-light">
            A selection of strategic property value improvement projects delivered across Melbourne's premium residential markets.
          </p>
        </Container>
      </section>

      {/* Grid */}
      <section className="py-40 bg-white">
        <Container clean className="flex flex-col gap-32">
          <div className="grid grid-cols-1 gap-32">
            {projects.map((project, i) => (
              <div 
                key={project.id} 
                className={cn(
                  "flex flex-col lg:grid lg:grid-cols-12 gap-16 items-center group",
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "lg:col-span-7 relative overflow-hidden",
                  i % 2 === 1 ? "lg:order-2" : ""
                )}>
                  <Link to={`/projects/${project.id}`} className="block overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full aspect-[16/9] object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </Link>
                  {/* Case study indicator */}
                  <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 text-[10px] font-bold uppercase tracking-[0.4em] text-primary shadow-xl">
                    Transformation {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className={cn(
                  "lg:col-span-5 flex flex-col gap-8",
                  i % 2 === 1 ? "lg:order-1 lg:text-right lg:items-end" : ""
                )}>
                  <div className="flex flex-col gap-4">
                    <div className={cn("flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-secondary", i % 2 === 1 ? "justify-end" : "")}>
                      <span>{project.type}</span>
                      <span className="w-8 h-px bg-secondary/30" />
                      <span>{project.suburb}, VIC</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-primary leading-tight italic">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-xl text-muted-foreground leading-relaxed font-light italic">
                    {project.description}
                  </p>

                  <div className={cn("flex flex-wrap gap-12 py-8 border-y border-muted", i % 2 === 1 ? "justify-end" : "")}>
                    {project.metrics.slice(0, 2).map((metric, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{metric.label}</span>
                        <span className="text-2xl font-display font-bold text-primary">{metric.value}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild className="bg-primary text-white hover:bg-secondary hover:text-primary rounded-none h-16 px-12 text-sm font-bold tracking-widest uppercase transition-all duration-500 w-fit">
                    <Link to={`/projects/${project.id}`}>View Full Case Study</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-primary py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.05)_0%,transparent_70%)]" />
        <Container clean>
          <div className="flex flex-col items-center text-center gap-12 relative z-10 py-24 border-y border-white/10">
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-secondary">The Pathway to Maximum Value</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white max-w-4xl leading-tight italic">
              Ready to Transform Your <span className="text-gold underline decoration-secondary/20 underline-offset-[12px]">Property?</span>
            </h2>
            <p className="text-2xl text-white/60 font-medium max-w-2xl leading-relaxed">
              Our strategic renovations consistently deliver exceptional returns for vendors.
            </p>
            <Button asChild size="lg" className="bg-secondary hover:bg-white text-primary px-16 py-10 text-2xl font-bold rounded-none shadow-gold transition-all duration-500 hover:scale-105 active:scale-95">
              <Link to="/consultation" className="flex items-center gap-4">
                Book Property Assessment <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-500" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}