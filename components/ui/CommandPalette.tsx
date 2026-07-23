'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/constants/icons';

type SearchResult = {
  id: string;
  title: string;
  type: string;
  url: string;
  icon: keyof typeof Icons;
};

const MOCK_RESULTS: SearchResult[] = [];

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredResults = MOCK_RESULTS.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) || 
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : prev));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        router.push(filteredResults[selectedIndex].url);
        setIsOpen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-2xl bg-background border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center px-4 py-4 border-b border-border">
          <Icons.search className="w-5 h-5 text-muted-foreground mr-3" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search teams, tracks, judges, or pages..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground/50"
          />
          <div className="text-[10px] font-mono text-muted-foreground px-2 py-1 bg-muted/50 rounded border border-border">ESC</div>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredResults.length === 0 ? (
            <div className="py-14 text-center text-sm text-muted-foreground">
              No results found for "{search}"
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {filteredResults.map((result, index) => {
                const Icon = Icons[result.icon];
                return (
                  <div 
                    key={result.id}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                      index === selectedIndex ? 'bg-primary/10 text-primary' : 'hover:bg-muted/30 text-foreground/80'
                    }`}
                    onClick={() => {
                      router.push(result.url);
                      setIsOpen(false);
                    }}
                  >
                    <Icon className={`w-4 h-4 ${index === selectedIndex ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-medium text-sm">{result.title}</span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{result.type}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
