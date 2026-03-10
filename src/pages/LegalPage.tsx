import React from 'react';
import { Container } from '@/components/ui/Container';
import { SEO } from '@/components/ui/SEO';

export function LegalPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col w-full">
      <SEO title={title} />
      <section className="bg-primary pt-48 pb-24 relative overflow-hidden">
        <Container className="relative z-10 py-0">
          <h1 className="text-5xl font-display font-bold text-white leading-tight">
            {title}
          </h1>
        </Container>
      </section>
      <section className="py-32 bg-white">
        <Container clean>
          <div className="prose prose-lg text-muted-foreground max-w-3xl">
            <p>This is a placeholder for the {title} page. Content will be updated soon.</p>
            <p>PDCON is committed to maintaining the highest standards of professional conduct and data protection.</p>
          </div>
        </Container>
      </section>
    </div>
  );
}
