'use client';

import { Icons } from '@/components/constants/icons';

export interface Session {
  id: string;
  name: string;
}

interface SessionSelectorProps {
  sessions: Session[];
  selectedId: string;
  onChange: (id: string) => void;
  disabled?: boolean;
}

export function SessionSelector({ sessions, selectedId, onChange, disabled = false }: SessionSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
        <Icons.clock className="w-4 h-4" /> Evaluation Session
      </label>
      <div className="relative">
        <select
          value={selectedId}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full appearance-none bg-background border border-white/10 rounded-lg px-4 py-2.5 text-sm font-medium focus:border-primary outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed pr-10"
        >
          {sessions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <Icons.more className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}
