'use client';

/**
 * components/faq/FaqSearch.tsx
 *
 * Reusable FAQ search + accordion component.
 * Used by:
 *   - app/(public)/page.tsx (homepage FAQ section)
 *   - app/(public)/faq/page.tsx (dedicated FAQ page)
 *
 * Behaviour:
 *   - Typing filters questions + answers (case-insensitive)
 *   - Matching accordion items auto-expand
 *   - Non-matching items are hidden
 *   - Complete matching words/phrases are highlighted (not individual chars)
 *   - When search is cleared, all items collapse back to default
 */

import { useState, useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
  /** If true, renders the search input inline (used on homepage sidebar) */
  showSearch?: boolean;
  /** Controlled search query — use when parent owns the search input */
  externalQuery?: string;
  className?: string;
};

/**
 * Escape a string so it can be safely used as a regex literal.
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Highlight all occurrences of `query` in `text`.
 * Only matches the full phrase, never individual characters.
 */
function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const escaped = escapeRegex(query.trim());
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase().trim() ? (
          <mark key={i} className="bg-primary/25 text-primary rounded-sm px-0.5 not-italic font-medium">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export function FaqSearch({ items, showSearch = false, externalQuery, className }: Props) {
  const [internalQuery, setInternalQuery] = useState('');
  const query = externalQuery !== undefined ? externalQuery : internalQuery;

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items.map((f, i) => ({ ...f, originalIndex: i }));
    const q = query.trim().toLowerCase();
    return items
      .map((f, i) => ({ ...f, originalIndex: i }))
      .filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
      );
  }, [items, query]);

  // Auto-expand all matching items when searching
  const expandedValues = useMemo(() => {
    if (!query.trim()) return [];
    return filteredItems.map((item) => `faq-item-${item.originalIndex}`);
  }, [filteredItems, query]);

  return (
    <div className={className}>
      {showSearch && externalQuery === undefined && (
        <div className="relative mb-8">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search questions..."
            value={internalQuery}
            onChange={(e) => setInternalQuery(e.target.value)}
            className="w-full bg-background border border-border px-12 py-4 text-sm focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
          />
          {internalQuery && (
            <button
              onClick={() => setInternalQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground font-mono text-sm border border-border bg-muted/5">
          No matching questions found for &ldquo;{query}&rdquo;.
        </div>
      ) : (
        <Accordion
          type="multiple"
          value={expandedValues}
          onValueChange={() => {
            /* Controlled: collapses reset when query clears */
          }}
          className="w-full"
        >
          {filteredItems.map((item) => (
            <AccordionItem
              key={item.originalIndex}
              value={`faq-item-${item.originalIndex}`}
              className="border-border"
            >
              <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-primary transition-colors duration-150 py-6 text-left">
                {highlightText(item.question, query)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pr-8 text-base">
                {highlightText(item.answer, query)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
