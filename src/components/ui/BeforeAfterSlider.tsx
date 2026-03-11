import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  beforeLabel = "Before", 
  afterLabel = "After",
  className 
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = clientX - left;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setPosition(percentage);
  }, []);

  // Document-level event listeners for mouse/touch to continue tracking even when cursor leaves
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.touches[0].clientX);
      }
    };
    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isDragging, handleMove]);

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-ew-resize select-none h-[400px] lg:h-[600px] group bg-primary touch-none", className)}
      onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
      onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
    >
      {/* After Image (Bottom layer) */}
      <img 
        src={afterImage} 
        alt="After Renovation" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute bottom-6 right-6 px-4 py-2 bg-secondary text-primary border border-secondary text-[10px] uppercase tracking-widest font-bold z-[5]">
        {afterLabel}
      </div>

      {/* Before Image (Top layer, clipped by position) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden border-r-2 border-white shadow-[0_0_20px_rgba(0,0,0,0.3)] z-10"
        style={{ width: `${position}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Before Renovation" 
          className="absolute top-0 left-0 h-full object-cover"
          style={{ width: containerWidth ? `${containerWidth}px` : '100%', maxWidth: 'none' }}
        />
        <div className="absolute bottom-6 left-6 px-4 py-2 bg-primary text-white border border-white/10 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
          {beforeLabel}
        </div>
      </div>

      {/* Handle */}
      <div 
        className="absolute top-0 bottom-0 z-20 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-lg -translate-x-1/2"
        style={{ left: `${position}%` }}
      >
        <div className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-secondary/50 hover:border-secondary transition-colors">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-secondary rounded-full" />
            <div className="w-0.5 h-4 bg-secondary rounded-full" />
            <div className="w-0.5 h-4 bg-secondary rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
