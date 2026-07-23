'use client';

import { Container } from '@/components/layout';
import { PUBLIC_CONTENT } from '@/components/constants/public-content';
import { Button } from '@/components/primitives/button';

export default function ContactPage() {
  const { contact } = PUBLIC_CONTENT;

  return (
    <div className="min-h-screen bg-background text-foreground mt-20">
      <div className="bg-foreground text-background py-32 border-b border-border">
        <Container>
          <div className="max-w-4xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-background/50 mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-background/20" />
              Support & Inquiries
            </div>
            <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter mb-8 leading-[0.9]">Contact<br/>Operations</h1>
            <p className="text-2xl text-background/70 font-light leading-relaxed max-w-2xl">
              Direct line to the competition management team. Expect a response within 24 hours.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          <div className="flex flex-col gap-16">
            <div>
              <h2 className="text-3xl font-semibold tracking-tighter mb-8 border-b border-border pb-4">Direct Channels</h2>
              <div className="flex flex-col gap-8">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Email Routing</div>
                  <a href={`mailto:${contact.email}`} className="text-2xl font-semibold hover:text-primary transition-colors">{contact.email}</a>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Emergency Phone</div>
                  <a href={`tel:${contact.phone}`} className="text-2xl font-semibold hover:text-primary transition-colors">{contact.phone}</a>
                </div>
              </div>
            </div>

            <div className="bg-muted/10 border border-border p-8">
              <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-4">Response Protocol</div>
              <ul className="text-sm text-muted-foreground flex flex-col gap-2">
                <li>• General Inquiries: 24h SLA</li>
                <li>• Technical Support: 12h SLA</li>
                <li>• Emergency Reports: Immediate routing</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold tracking-tighter mb-8 border-b border-border pb-4">Submit Ticket</h2>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Name</label>
                  <input type="text" className="w-full bg-transparent border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Email</label>
                  <input type="email" className="w-full bg-transparent border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Subject</label>
                <input type="text" className="w-full bg-transparent border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Regarding submission error..." />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea rows={6} className="w-full bg-transparent border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Please describe the issue in detail." />
              </div>
              <Button type="submit" size="lg" className="w-full h-14 rounded-none uppercase tracking-widest text-xs font-bold">Transmit Message</Button>
            </form>
          </div>

        </div>
      </Container>
    </div>
  );
}
