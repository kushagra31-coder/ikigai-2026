import { Container, Section } from '@/components/layout';
import { Fade, Slide } from '@/components/motion';
import { GlassCard } from '@/components/data-display/GlassCard';
import IKIGAI2026_CONFIG from '@/config/event.config';

export const metadata = {
  title: 'Timeline | IKIGAI 2026',
  description: 'From registration to the final demo day, here\'s everything that happens at IKIGAI 2026.',
};

const typeColors: Record<string, string> = {
  registration: 'text-green-400 bg-green-400/10 border-green-400/30',
  submission: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  evaluation: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  event: 'text-primary bg-primary/10 border-primary/30',
  presentation: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  ceremony: 'text-pink-400 bg-pink-400/10 border-pink-400/30',
};

const typeEmoji: Record<string, string> = {
  registration: '📋',
  submission: '📤',
  evaluation: '🔍',
  event: '⚡',
  presentation: '🎯',
  ceremony: '🏆',
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
}

export default function TimelinePage() {
  const timeline = IKIGAI2026_CONFIG.timeline;

  return (
    <Section className="pt-32 min-h-screen">
      <Container>
        <Fade>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-display font-bold">Event Timeline</h1>
            <p className="text-body-l text-muted-foreground">
              From registration to the final demo day, here&apos;s everything that happens at IKIGAI 2026.
            </p>
          </div>
        </Fade>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent md:-translate-x-1/2" />

          <div className="space-y-8">
            {timeline.map((item: any, idx: number) => {
              const isLeft = idx % 2 === 0;
              const colorClass = typeColors[item.type] || 'text-primary bg-primary/10 border-primary/30';
              const emoji = typeEmoji[item.type] || '📅';

              return (
                <Slide key={item.id} direction={isLeft ? 'right' : 'left'} delay={idx * 0.1}>
                  <div className={`relative flex items-start gap-4 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 w-5 h-5 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(124,58,237,0.5)] -translate-x-1/2 mt-5 z-10" />

                    {/* Content */}
                    <div className={`w-full pl-16 md:pl-0 md:w-[45%] ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                      <GlassCard className="p-6 hover:border-primary/40 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">{emoji}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${colorClass}`}>
                            {item.type.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-accent mb-1">{formatDate(item.start)}</p>
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        {item.notes?.length > 0 && (
                          <ul className="mt-3 space-y-1">
                            {item.notes.map((note: string, nIdx: number) => (
                              <li key={nIdx} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                {note}
                              </li>
                            ))}
                          </ul>
                        )}
                      </GlassCard>
                    </div>
                  </div>
                </Slide>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
