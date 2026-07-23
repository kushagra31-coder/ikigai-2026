'use client';

import { Container } from '@/components/layout';
import IKIGAI2026_CONFIG from '@/config/event.config';
import { motion, useScroll, useSpring } from 'framer-motion';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export default function TimelinePage() {
  const timeline = IKIGAI2026_CONFIG.timeline;
  
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground mt-20">
      <div className="bg-foreground text-background py-24 border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-background/50 mb-6">Operations Roadmap</div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-6">Mission Timeline</h1>
            <p className="text-xl text-background/70 font-light leading-relaxed">
              The strategic sequence of events for IKIGAI 2026. All times are displayed in IST and strictly enforced.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-24 relative">
        <div className="hidden lg:block absolute left-[50%] top-24 bottom-24 w-px bg-border -translate-x-1/2">
          <motion.div className="w-full bg-primary origin-top" style={{ scaleY }} />
        </div>

        <div className="flex flex-col gap-0 max-w-5xl mx-auto">
          {timeline.map((item: any, idx: number) => {
            // Simulated status for visual distinction based on index
            const status = idx === 0 ? 'completed' : idx === 1 ? 'active' : 'upcoming';
            const isLeft = idx % 2 === 0;

            return (
              <div key={item.id} className="relative flex flex-col lg:flex-row items-center w-full min-h-[300px]">
                
                {/* Left Side (Data) */}
                <div className={`w-full lg:w-1/2 flex ${isLeft ? 'lg:justify-end lg:pr-16' : 'lg:justify-end lg:pr-16 lg:order-2 lg:text-left'} order-1 mb-8 lg:mb-0 text-left ${isLeft ? 'lg:text-right' : ''}`}>
                  <div className={`flex flex-col ${isLeft ? 'lg:items-end' : 'lg:items-start'} max-w-sm`}>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4 border border-border px-3 py-1 bg-muted/10">
                      Phase 0{idx + 1}
                    </div>
                    <h3 className={`text-3xl font-semibold tracking-tight mb-4 ${status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                    {item.notes?.length > 0 && (
                      <div className={`flex flex-col gap-2 ${isLeft ? 'lg:items-end' : 'lg:items-start'}`}>
                        {item.notes.map((note: string, nIdx: number) => (
                          <div key={nIdx} className="text-xs font-mono text-muted-foreground bg-muted/20 px-2 py-1 border border-border">
                            {note}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Center Node (Progress Line indicator, but no dots as requested - just structural connection) */}
                <div className="hidden lg:flex w-[2px] h-full items-center justify-center relative order-2 z-10" />

                {/* Right Side (Timing) */}
                <div className={`w-full lg:w-1/2 flex ${isLeft ? 'lg:justify-start lg:pl-16' : 'lg:justify-start lg:pl-16 lg:order-1 lg:justify-end lg:pr-16'} order-3`}>
                  <div className={`bg-card border ${status === 'active' ? 'border-primary' : 'border-border'} p-8 w-full max-w-sm flex flex-col justify-center`}>
                    <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Status</span>
                      <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                        status === 'active' ? 'text-primary animate-pulse' :
                        status === 'completed' ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {status}
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-1 mb-6">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Date</div>
                      <div className="text-2xl font-semibold tracking-tight">{formatDate(item.start)}</div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Time Window</div>
                      <div className="text-lg font-mono text-muted-foreground">
                        {formatTime(item.start)} — {formatTime(item.end)}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
