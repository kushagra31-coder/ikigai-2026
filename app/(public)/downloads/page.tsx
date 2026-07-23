'use client';

import { Container } from '@/components/layout';
import IKIGAI2026_CONFIG from '@/config/event.config';
import { Icons } from '@/components/constants/icons';

// Map file extension to a display-friendly type label and icon
function getFileIcon(type: string) {
  switch (type.toLowerCase()) {
    case 'pdf':
      return Icons.fileText;
    case 'pptx':
      return Icons.fileText;
    case 'docx':
      return Icons.fileText;
    default:
      return Icons.download;
  }
}

type DownloadState = 'available' | 'coming-soon' | 'restricted';

function getDownloadState(item: { url: string; visibility: string }): DownloadState {
  if (item.visibility === 'restricted') return 'restricted';
  if (!item.url || item.url === '#') return 'coming-soon';
  return 'available';
}

export default function DownloadsPage() {
  const downloads = IKIGAI2026_CONFIG.downloads;
  const categories = Array.from(new Set(downloads.map((d) => d.type)));

  return (
    <div className="min-h-screen bg-background text-foreground mt-20">
      {/* Hero */}
      <div className="bg-foreground text-background py-32 border-b border-border">
        <Container>
          <div className="max-w-4xl">
            <div className="text-[10px] font-mono uppercase tracking-widest text-background/50 mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-background/20" />
              Developer Resources
            </div>
            <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter mb-8 leading-[0.9]">
              Resource<br />Center
            </h1>
            <p className="text-2xl text-background/70 font-light leading-relaxed max-w-2xl">
              Official SDKs, design assets, and problem statements required for IKIGAI 2026 development.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-24">
        <div className="flex flex-col gap-24">
          {categories.map((category) => {
            const categoryDownloads = downloads.filter((d) => d.type === category);

            return (
              <section key={category}>
                <div className="flex items-center gap-6 mb-12 border-b border-border pb-4">
                  <h2 className="text-2xl font-semibold tracking-tighter uppercase">{category}</h2>
                  <span className="text-[10px] font-mono bg-muted/30 px-2 py-1 text-muted-foreground">
                    {categoryDownloads.length} Resource{categoryDownloads.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryDownloads.map((item, idx) => {
                    const state = getDownloadState({ url: item.url, visibility: item.visibility });
                    const FileIcon = getFileIcon(item.type);
                    const isAvailable = state === 'available';

                    const cardClasses = [
                      'group flex flex-col justify-between border border-border p-6 min-h-[220px] transition-all duration-200',
                      isAvailable
                        ? 'hover:border-primary/50 hover:bg-muted/5 cursor-pointer'
                        : 'opacity-70 cursor-not-allowed',
                    ].join(' ');

                    const CardWrapper = isAvailable ? 'a' : 'div';
                    const cardProps = isAvailable
                      ? { href: item.url, download: true, target: '_blank', rel: 'noopener noreferrer' }
                      : {};

                    return (
                      <CardWrapper key={idx} className={cardClasses} {...(cardProps as any)}>
                        {/* Icon + Type */}
                        <div>
                          <div
                            className={[
                              'w-10 h-10 flex items-center justify-center mb-6 border transition-colors',
                              isAvailable
                                ? 'text-muted-foreground group-hover:text-primary group-hover:border-primary/40 border-border'
                                : 'text-muted-foreground/50 border-border/50',
                            ].join(' ')}
                          >
                            <FileIcon className="w-5 h-5" />
                          </div>

                          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                            {item.type}
                          </div>

                          <h3 className="text-lg font-semibold tracking-tight mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {/* Footer — always visible state indicator */}
                        <div className="mt-8 pt-4 border-t border-border flex justify-between items-center">
                          <span className="text-xs font-mono text-muted-foreground">{item.size}</span>

                          {state === 'available' && (
                            <span className="flex items-center gap-2 text-xs font-mono font-semibold text-primary group-hover:gap-3 transition-all duration-200">
                              Download
                              <Icons.download className="w-3.5 h-3.5" />
                            </span>
                          )}

                          {state === 'coming-soon' && (
                            <span className="flex items-center gap-2 text-xs font-mono text-yellow-500">
                              <Icons.clock className="w-3.5 h-3.5" />
                              Coming Soon
                            </span>
                          )}

                          {state === 'restricted' && (
                            <span className="flex items-center gap-2 text-xs font-mono text-red-500/80">
                              <Icons.lock className="w-3.5 h-3.5" />
                              Restricted Access
                            </span>
                          )}
                        </div>
                      </CardWrapper>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
