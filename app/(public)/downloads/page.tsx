import { Container, Section, Grid } from '@/components/layout';
import IKIGAI2026_CONFIG from '@/config/event.config';
import { Fade, Scale, Hover } from '@/components/motion';
import { GlassCard } from '@/components/data-display/GlassCard';
import { Icons, IconType } from '@/components/constants/icons';
import { Button } from '@/components/primitives/button';

export const metadata = {
  title: 'Downloads | IKIGAI 2026',
  description: 'Download rulebook, problem statements, and other resources for IKIGAI 2026.',
};

export default function DownloadsPage() {
  return (
    <Section className="pt-32 min-h-screen">
      <Container>
        <Fade>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-display font-bold">Resources & Downloads</h1>
            <p className="text-body-l text-muted-foreground">
              Everything you need to prepare for {IKIGAI2026_CONFIG.branding.eventName}.
            </p>
          </div>
        </Fade>

        <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {IKIGAI2026_CONFIG.downloads.map((item, idx) => {
            const IconComp = Icons[item.icon as keyof typeof Icons] as IconType || Icons.fileText;
            
            return (
              <Scale key={idx} delay={idx * 0.1}>
                <Hover>
                  <GlassCard className="h-full flex flex-col group border-white/5 hover:border-primary/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:scale-110 transition-transform">
                        <IconComp className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-white/5 rounded-md text-muted-foreground uppercase">
                        {item.type} • {item.size}
                      </span>
                    </div>
                    <h3 className="text-heading-m mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground flex-1 mb-6">{item.description}</p>
                    
                    <Button asChild variant="outline" className="w-full mt-auto">
                      <a href={item.url} target="_blank" rel="noreferrer" aria-label={`Download ${item.title}`}>
                        <Icons.download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </GlassCard>
                </Hover>
              </Scale>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
