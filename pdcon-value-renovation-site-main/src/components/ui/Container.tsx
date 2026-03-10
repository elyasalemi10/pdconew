import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  clean?: boolean;
}

export function Container({ children, className, clean = false, ...props }: ContainerProps) {
  return (
    <div 
      className={cn(
        "container mx-auto px-6 lg:px-12 xl:px-24",
        !clean && "py-24 lg:py-32 xl:py-48",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
