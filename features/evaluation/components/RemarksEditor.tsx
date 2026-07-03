'use client';

import { Icons } from '@/components/constants/icons';

interface RemarksEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  maxLength?: number;
}

export function RemarksEditor({ value, onChange, disabled = false, maxLength = 2000 }: RemarksEditorProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold flex items-center gap-2">
          <Icons.info className="w-4 h-4 text-accent" /> Mentor Remarks
        </label>
        <span className={`text-xs ${value.length > maxLength * 0.9 ? 'text-warning' : 'text-muted-foreground'}`}>
          {value.length} / {maxLength}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        maxLength={maxLength}
        placeholder="Provide constructive feedback, areas of improvement, and justify your scoring..."
        className="w-full h-32 resize-y bg-black/20 border border-white/10 rounded-xl p-4 text-sm focus:border-primary outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <p className="text-xs text-muted-foreground">
        These remarks will be shared with the team along with their average score. Be constructive!
      </p>
    </div>
  );
}
