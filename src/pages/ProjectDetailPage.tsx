import React from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { ArrowLeft, TrendingUp, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { projects } from './ProjectsPage';
import { SEO } from '@/components/ui/SEO';

export function ProjectDetailPage() {
  const {projectId} = useParams({ from: '/past-projects/$projectId' });
  const project = projects.find(p => p.id === projectId);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="flex flex-col w-full">
      <SEO
        title={`${project.title} | Case Study`}
        description={`Detailed case study of this strategic ${project.type} project in ${project.suburb}, Victoria.`}
      />
      {/* Back Button */}
      <div className="bg-white pt-32 pb-8 border-b border-muted">
        <Container clean className="flex items-center">
          <Link to="/past-projects" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-secondary transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>
        </Container>
      </div>

      {/* Project Header */}
      <section className="py-16 bg-white">
        <Container clean className="flex flex-col gap-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">{project.type}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{project.suburb}, VIC</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-primary leading-tight">
                {project.title}
              </h1>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-muted">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ROI</span>
                  <div className="flex items-center gap-2 text-lg font-bold text-primary">
                    <TrendingUp className="w-4 h-4 text-secondary shrink-0" /> {project.roi}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Duration</span>
                  <div className="flex items-center gap-2 text-lg font-bold text-primary">
                    <Clock className="w-4 h-4 text-secondary shrink-0" /> {project.duration || '2–3 Weeks'}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Result</span>
                  <div className="flex items-center gap-2 text-lg font-bold text-primary">
                    <Target className="w-4 h-4 text-secondary shrink-0" /> Sold
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="text-xl text-muted-foreground leading-relaxed font-medium italic border-l-4 border-secondary pl-8 py-4">
                "{project.description}"
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Before/After Section */}
      <section className="py-12 bg-white overflow-hidden">
        <Container clean>
          <div className="flex flex-col gap-24">
            {project.gallery && project.gallery.length > 0 ? (
              project.gallery.map((item, i) => (
                <div key={i} className="flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <h2 className="text-3xl font-display font-bold text-primary italic">{item.label}</h2>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Slide to compare transformation</p>
                  </div>
                  <BeforeAfterSlider
                    beforeImage={item.before}
                    afterImage={item.after}
                    beforeLabel="Original State"
                    afterLabel="Strategic Transformation"
                    className="h-[500px] lg:h-[800px] shadow-2xl rounded-sm border border-muted"
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                  <h2 className="text-3xl font-display font-bold text-primary">The Visual Transformation</h2>
                </div>
                <div className="relative overflow-hidden shadow-2xl rounded-sm">
                  <img 
                    src={project.image} 
                    alt={`${project.title} - Transformation Result`}
                    className="w-full aspect-[16/9] object-cover"
                  />
                  <div className="absolute bottom-6 right-6 px-4 py-2 bg-secondary text-primary text-[10px] uppercase tracking-widest font-bold">
                    Completed Transformation
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Detailed Content */}
      <section className="py-12 bg-white">
        <Container clean className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 flex flex-col gap-24">
            <div className="flex flex-col gap-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">Project Overview</h3>
              <div className="text-xl md:text-2xl text-muted-foreground max-w-none font-light leading-relaxed italic">
                <p>
                  {project.overview || project.description}
                </p>
              </div>
            </div>

            {project.challenge && (
              <div className="flex flex-col gap-10">
                <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">The Challenge</h3>
                <div className="text-lg md:text-xl text-muted-foreground max-w-none font-light leading-relaxed">
                  <p>{project.challenge}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">Renovation Strategy</h3>
              <div className="text-lg md:text-xl text-muted-foreground max-w-none font-light leading-relaxed">
                <p>
                  {project.strategy || `Our strategic renovation focused on the high-impact areas that drive buyer emotion and maximise sale price.`}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">Renovation Scope</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-muted border border-muted overflow-hidden">
                {(Array.isArray(project.scope) ? project.scope : []).map((item, i, arr) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex items-center gap-6 p-10 bg-white group hover:bg-muted transition-colors duration-500",
                      arr.length % 2 === 1 && i === arr.length - 1 && "md:col-span-2"
                    )}
                  >
                    <div className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                    <span className="text-lg font-bold font-heading text-primary group-hover:text-secondary transition-colors duration-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {project.projectDuration && (
              <div className="flex flex-col gap-10">
                <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">Project Duration</h3>
                <div className="text-lg md:text-xl text-muted-foreground max-w-none font-light leading-relaxed italic">
                  <p>{project.projectDuration}</p>
                </div>
              </div>
            )}

            {project.result && (
              <div className="flex flex-col gap-10">
                <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-secondary">The Result</h3>
                <div className="text-lg md:text-xl text-muted-foreground max-w-none font-light leading-relaxed">
                  <p>{project.result}</p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 flex flex-col gap-8 bg-primary text-white p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 -translate-y-1/2 translate-x-1/2 blur-[80px] rounded-full" />

              <div className="flex flex-col gap-4 relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">Financial Outcome</span>
                <h3 className="text-2xl font-display font-bold italic leading-tight">Project Metrics</h3>
              </div>

              <div className="flex flex-col gap-6 relative z-10">
                {(project.metrics || []).map((stat, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{stat.label}</span>
                    <span className={cn("text-2xl font-display font-bold", stat.highlight ? "text-secondary" : "text-white")}>{stat.value}</span>
                  </div>
                ))}

                {project.id === 'berwick-transformation' && (
                  <div className="pt-6 border-t border-white/10 mt-2">
                    <div className="text-4xl font-display font-bold text-secondary mb-2">$455,000</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-white/60">Value Increase</div>
                  </div>
                )}

                {project.id === 'berwick-refresh' && (
                  <div className="pt-6 border-t border-white/10 mt-2">
                    <div className="text-4xl font-display font-bold text-secondary mb-2">$83,000+</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-white/60">Additional Value</div>
                  </div>
                )}

                {project.id === 'devon-meadows-transformation' && (
                  <div className="pt-6 border-t border-white/10 mt-2">
                    <div className="text-4xl font-display font-bold text-secondary mb-2">$1,455,000</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-white/60">Sale Price</div>
                  </div>
                )}
              </div>

              <Button asChild className="w-full bg-secondary text-primary font-bold hover:bg-white h-14 text-sm transition-all duration-500 relative z-10 shadow-gold">
                <Link to="/consultation">Request Assessment</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Projects */}
      <section className="py-12 bg-muted border-t border-border">
        <Container clean>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <h2 className="text-3xl font-display font-bold text-primary">Other Success Stories</h2>
              <Button asChild variant="link" className="text-secondary p-0 text-xs font-bold uppercase tracking-widest hover:text-primary">
                <Link to="/past-projects">View Full Portfolio <ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.filter(p => p.id !== projectId).slice(0, 3).map((p) => (
                <Link key={p.id} to={`/past-projects/${p.id}`} className="group flex flex-col gap-6">
                  <div className="aspect-video overflow-hidden rounded-sm bg-white border border-border shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{p.suburb}</span>
                    <h4 className="text-xl font-display font-bold text-primary group-hover:text-secondary transition-colors">{p.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
