import React from 'react';
import { Link } from '@tanstack/react-router';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SEO } from '@/components/ui/SEO';
import { cn } from '@/lib/utils';


export const projects = [
  {
    id: 'berwick-transformation',
    title: 'Berwick Property Transformation',
    suburb: 'Berwick',
    type: 'Pre-Sale Renovation',
    roi: '182%',
    image: '/projects/home/main.webp',
    description: 'This Berwick property underwent a full strategic pre-sale renovation designed to reposition the home for the market and significantly improve buyer appeal.',
    overview: 'This project involved a full strategic renovation of a residential property in Berwick, Victoria. The home had strong underlying value but required substantial upgrades to align with modern buyer expectations and maximise its market potential.',
    challenge: 'The project was delivered during a period of market uncertainty. Rising interest rates had reduced buyer confidence and the local property market had slowed. The renovation strategy therefore focused on delivering maximum presentation impact and improving the perceived value of the property.',
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
    result: 'Despite the challenging market conditions, the final result exceeded expectations. The renovation significantly improved the property\'s presentation and market positioning, resulting in a stronger sale outcome than originally anticipated.',
    metrics: [
      { label: 'Renovation investment', value: '$250,000' },
      { label: 'Value increase', value: '$455,000', highlight: true },
      { label: 'Estimated value before renovation', value: '$1,650,000' },
      { label: 'Sale price achieved', value: '$2,105,000' }
    ],
    gallery: [
      {
        before: '/projects/home/old.webp',
        after: '/projects/home/main.webp',
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
    image: '/projects/home2/main2.webp',
    description: 'A targeted cosmetic upgrade strategy delivered with a renovation budget of $38,000 to resolve unfinished presentation items.',
    overview: 'This Berwick property had been renovated approximately three years earlier, however several presentation items remained unfinished. Because of these incomplete improvements the owner struggled to achieve the desired sale result.',
    strategy: 'A targeted cosmetic upgrade strategy was delivered with a renovation budget of $38,000. These relatively small but strategic upgrades significantly improved the property\'s presentation and buyer appeal.',
    scope: [
      'Roof restoration and colour update',
      'Landscaping improvements',
      'Epoxy flooring throughout key areas',
      'External presentation improvements'
    ],
    duration: '3 Weeks',
    projectDuration: 'The cosmetic refresh was completed swiftly to meet the listing timeline.',
    result: 'The improvements significantly improved the property\'s presentation and buyer appeal, leading to a result that exceeded the previous stalled attempts.',
    metrics: [
      { label: 'Renovation investment', value: '$38,000' },
      { label: 'Additional value achieved', value: '$83,000+', highlight: true }
    ],
    gallery: [
      {
        before: '/projects/home2/after.webp',
        after: '/projects/home2/main2.webp',
        label: 'Property Refresh'
      }
    ]
  },
  {
    id: 'devon-meadows-transformation',
    title: 'Devon Meadows Property Transformation',
    suburb: 'Devon Meadows',
    type: 'Risk Recovery Renovation',
    roi: 'Stabilised',
    image: '/projects/home3/kitchen.webp',
    description: 'This project involved a property purchased in an unfinished condition after construction work by another party was abandoned. Sold $1,455,000.',
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
    result: 'Through strategic intervention and careful project management, the property was stabilised, completed, and sold for $1,455,000. Key lesson: Never over-capitalise. Do not renovate based on emotion.',
    metrics: [
      { label: 'Purchase price', value: '$945,000' },
      { label: 'Renovation investment', value: '$450,000' },
      { label: 'Sale price achieved', value: '$1,455,000', highlight: true }
    ],
    gallery: [
      {
        before: '/projects/home3/kitchen-before.webp',
        after: '/projects/home3/kitchen.webp',
        label: 'Kitchen Transformation'
      }
    ]
  },
  {
    id: 'beaconsfield-transformation',
    title: 'Beaconsfield Property Transformation',
    suburb: 'Beaconsfield',
    type: 'Auction Purchase Renovation',
    roi: '210%',
    image: '/projects/home4/main.webp',
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
      { label: 'Renovation investment', value: '$110,000' },
      { label: 'Value increase', value: '$230,000', highlight: true },
      { label: 'Purchase price', value: '$570,000' },
      { label: 'Sale price achieved', value: '$800,000' }
    ],
    gallery: [
      {
        before: '/projects/home4/before.webp',
        after: '/projects/home4/main.webp',
        label: 'Facade Transformation'
      }
    ]
  },
  {
    id: 'berwick-visual-transformation',
    title: 'Berwick Visual Transformation',
    suburb: 'Berwick',
    type: 'Visual Transformation',
    roi: '133%',
    image: '/projects/home5/after.webp',
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
    result: 'The property achieved a successful sale outcome of $1,030,000, significantly above the pre-renovation value.',
    metrics: [
      { label: 'Renovation investment', value: '$120,000' },
      { label: 'Value increase', value: '$280,000', highlight: true },
      { label: 'Value before renovation', value: '$750,000' },
      { label: 'Sale price achieved', value: '$1,030,000' }
    ],
    gallery: [
      {
        before: '/projects/home5/before.webp',
        after: '/projects/home5/after.webp',
        label: 'Visual Transformation'
      }
    ]
  }
];

export function ProjectsPage() {
  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="Renovation Case Studies | Property Transformation Portfolio" 
        description="Explore our portfolio of successful pre-sale renovations and property transformations across Melbourne. Real results including ROI, value increases, and before/after comparisons."
        canonical="/past-projects"
        image="/projects/home/main.webp"
      />
      {/* Page Header */}
      <section className="bg-primary pt-24 sm:pt-32 pb-8 sm:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        </div>
        <Container className="relative z-10 flex flex-col gap-6 sm:gap-10 text-center items-center px-4 sm:px-6">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-secondary">Strategic Portfolio</span>
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-display font-bold text-white max-w-5xl leading-[1.1] italic">
            Past <span className="text-gold underline decoration-secondary/20 underline-offset-8 sm:underline-offset-[16px]">Projects</span>
          </h1>
          <p className="text-base sm:text-2xl text-white/50 max-w-3xl leading-relaxed font-light px-2">
            A selection of strategic property value improvement projects delivered across Melbourne's premium residential markets.
          </p>
        </Container>
      </section>

      {/* Grid */}
      <section className="py-8 sm:py-12 bg-white">
        <Container clean className="flex flex-col gap-10 sm:gap-16 px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-10 sm:gap-16">
            {projects.map((project, i) => (
              <div 
                key={project.id} 
                className={cn(
                  "flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-16 items-center group",
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "lg:col-span-7 relative overflow-hidden",
                  i % 2 === 1 ? "lg:order-2" : ""
                )}>
                  <Link to={`/past-projects/${project.id}`} className="block overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full aspect-[16/9] object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </Link>
                  {/* Case study indicator */}
                  <div className="absolute top-4 left-4 sm:top-8 sm:left-8 bg-white/90 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-primary shadow-xl">
                    Transformation {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className={cn(
                  "lg:col-span-5 flex flex-col gap-4 sm:gap-8",
                  i % 2 === 1 ? "lg:order-1 lg:text-right lg:items-end" : ""
                )}>
                  <div className="flex flex-col gap-2 sm:gap-4">
                    <div className={cn("flex items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-secondary", i % 2 === 1 ? "justify-end" : "")}>
                      <span>{project.type}</span>
                      <span className="w-4 sm:w-8 h-px bg-secondary/30" />
                      <span>{project.suburb}, VIC</span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-primary leading-tight italic">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm sm:text-xl text-muted-foreground leading-relaxed font-light italic">
                    {project.description}
                  </p>

                  <div className={cn("flex flex-wrap gap-6 sm:gap-12 py-4 sm:py-8 border-y border-muted", i % 2 === 1 ? "justify-end" : "")}>
                    {project.metrics.slice(0, 2).map((metric, idx) => (
                      <div key={idx} className="flex flex-col gap-1 sm:gap-2">
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{metric.label}</span>
                        <span className="text-lg sm:text-2xl font-display font-bold text-primary">{metric.value}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild className="bg-primary text-white hover:bg-secondary hover:text-primary rounded-none h-12 sm:h-16 px-6 sm:px-12 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-500 w-full sm:w-fit">
                    <Link to={`/past-projects/${project.id}`}>View Full Case Study</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-white py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.05)_0%,transparent_70%)]" />
        <Container clean className="px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8 relative z-10 py-8 sm:py-12 border-y border-muted">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-secondary">Strategic Transformation</span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary max-w-4xl leading-tight italic">
              Thinking of Selling Your <span className="text-gold underline decoration-secondary/20 underline-offset-4 sm:underline-offset-[12px]">Property?</span>
            </h2>
            <p className="text-base sm:text-2xl text-muted-foreground font-medium max-w-2xl leading-relaxed italic px-2">
              A strategic renovation may significantly increase your property's market value and buyer appeal.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-16 py-6 sm:py-10 text-base sm:text-2xl font-bold rounded-none shadow-elegant group transition-all duration-500 hover:scale-105 active:scale-95">
              <Link to="/consultation" className="flex items-center gap-2 sm:gap-4">
                Book Consultation <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 group-hover:translate-x-3 transition-transform duration-500" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
