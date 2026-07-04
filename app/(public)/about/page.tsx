import { Container, Section } from '@/components/layout';
import { Fade, Slide } from '@/components/motion';
import { GlassCard } from '@/components/data-display/GlassCard';
import IKIGAI2026_CONFIG from '@/config/event.config';

export const metadata = {
  title: 'About | IKIGAI 2026',
  description: 'IKIGAI 2026 is a national-level hackathon bringing together innovators and problem-solvers from across India.',
};

const stats = [
  { value: '36H', label: 'Hackathon' },
  { value: '200+', label: 'Participants' },
  { value: '₹103K', label: 'Prize Pool' },
  { value: '20+', label: 'Mentors' },
];

export default function AboutPage() {
  return (
    <Section className="pt-32 min-h-screen">
      <Container className="max-w-5xl space-y-24">

        {/* Hero */}
        <Fade>
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">About IKIGAI 2026</p>
            <h1 className="text-display font-bold leading-tight">
              Innovation<br />
              <span className="text-primary">With Purpose</span>
            </h1>
            <p className="text-body-l text-muted-foreground leading-relaxed">
              IKIGAI 2026 is a national-level hackathon designed to bring together innovators, developers, designers,
              entrepreneurs, and problem-solvers from across India to build impactful technology solutions.
            </p>
            <p className="text-body-m text-muted-foreground leading-relaxed">
              Powered by collaboration, mentorship, and innovation, IKIGAI creates an environment where ideas become
              products and students become future leaders.
            </p>
          </div>
        </Fade>

        {/* Event Snapshot */}
        <Slide direction="up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <GlassCard key={idx} className="flex flex-col items-center justify-center text-center py-8 border-primary/20 hover:border-primary/50 transition-colors">
                <span className="text-4xl font-black text-primary mb-2">{stat.value}</span>
                <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</span>
              </GlassCard>
            ))}
          </div>
        </Slide>

        {/* What Is IKIGAI */}
        <Slide direction="up" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">About The Event</p>
                <h2 className="text-heading-l font-bold">What Is IKIGAI?</h2>
              </div>
              <p className="text-body-m text-muted-foreground leading-relaxed">
                IKIGAI represents purpose, passion, and impact. The hackathon encourages participants to build
                technology-driven solutions addressing real-world problems while fostering innovation, teamwork,
                and entrepreneurship.
              </p>
              <div>
                <h3 className="text-heading-s font-bold mb-3">Our Mission</h3>
                <p className="text-body-m text-muted-foreground leading-relaxed">
                  To create a platform where students can collaborate, innovate, experiment with emerging technologies,
                  and gain real-world problem-solving experience.
                </p>
                <p className="text-body-m text-muted-foreground leading-relaxed mt-3">
                  We aim to inspire the next generation of builders, founders, and technology leaders.
                </p>
              </div>
            </div>
            <GlassCard className="p-8 border-primary/20 space-y-4">
              <h3 className="text-heading-s font-bold text-primary">Why IKIGAI?</h3>
              <p className="text-body-m text-muted-foreground leading-relaxed">
                To provide students a platform for innovation, networking, mentorship, problem-solving, and
                transforming ideas into impactful solutions.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  '36 hours of non-stop innovation',
                  'Expert mentors across all tracks',
                  'Real-world problem statements',
                  'Networking with industry leaders',
                  'Cash prizes & certificates',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </Slide>

        {/* Organized By */}
        <Slide direction="up" delay={0.2}>
          <div className="space-y-8">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Organized By</p>
              <h2 className="text-heading-l font-bold">The Organizers</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard className="p-8 border-primary/20">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-xl font-black text-primary">A</span>
                </div>
                <h3 className="text-heading-s font-bold mb-3">Acropolis Institute of Technology & Research</h3>
                <p className="text-body-s text-muted-foreground leading-relaxed">
                  Acropolis Institute of Technology & Research (AITR), Indore is one of Central India's premier
                  institutions known for excellence in engineering education, innovation, entrepreneurship, and
                  industry-focused learning.
                </p>
                <p className="text-body-s text-muted-foreground leading-relaxed mt-3">
                  The institute actively promotes research, technical events, innovation ecosystems, startup culture,
                  and hands-on learning opportunities that prepare students for the future.
                </p>
              </GlassCard>

              <GlassCard className="p-8 border-accent/20">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                  <span className="text-xl font-black text-accent">CS</span>
                </div>
                <h3 className="text-heading-s font-bold mb-3">Department of CSIT</h3>
                <p className="text-body-s text-muted-foreground leading-relaxed">
                  The Department of Computer Science & Information Technology focuses on building strong technical
                  foundations while encouraging innovation, research, leadership, and industry engagement.
                </p>
              </GlassCard>
            </div>
          </div>
        </Slide>

      </Container>
    </Section>
  );
}
