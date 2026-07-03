'use client';

import { useState, useEffect } from 'react';
import { EvaluationCriterion } from '../types';

interface ScoreInputProps {
  criterion: EvaluationCriterion;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function ScoreInput({ criterion, value, onChange, disabled = false }: ScoreInputProps) {
  const [localValue, setLocalValue] = useState<string>(value.toString());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalValue(value.toString());
  }, [value]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    const parsed = parseFloat(e.target.value);
    
    // Only dispatch onChange if valid
    if (!isNaN(parsed) && parsed >= criterion.minScore && parsed <= criterion.maxScore) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    const parsed = parseFloat(localValue);
    if (isNaN(parsed)) {
      setLocalValue(criterion.minScore.toString());
      onChange(criterion.minScore);
    } else if (parsed < criterion.minScore) {
      setLocalValue(criterion.minScore.toString());
      onChange(criterion.minScore);
    } else if (parsed > criterion.maxScore) {
      setLocalValue(criterion.maxScore.toString());
      onChange(criterion.maxScore);
    }
  };

  return (
    <div className="flex flex-col gap-3 py-4 border-b border-white/5 last:border-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            {criterion.name}
            {criterion.weight !== 1.0 && (
              <span className="text-[10px] font-bold bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                {criterion.weight}x
              </span>
            )}
          </h4>
          {criterion.description && (
            <p className="text-xs text-muted-foreground mt-1 max-w-sm">
              {criterion.description}
            </p>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <input
            type="number"
            min={criterion.minScore}
            max={criterion.maxScore}
            step={0.5}
            value={localValue}
            onChange={handleNumberChange}
            onBlur={handleBlur}
            disabled={disabled}
            className="w-16 bg-black/20 border border-white/10 rounded-lg px-2 py-1.5 text-center text-sm font-bold focus:border-primary outline-none transition-colors disabled:opacity-50"
          />
          <span className="text-xs text-muted-foreground font-medium">/ {criterion.maxScore}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <span className="text-xs font-medium text-muted-foreground w-4">{criterion.minScore}</span>
        <input
          type="range"
          min={criterion.minScore}
          max={criterion.maxScore}
          step={0.5}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          disabled={disabled}
          className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 accent-primary"
        />
        <span className="text-xs font-medium text-muted-foreground w-4">{criterion.maxScore}</span>
      </div>
    </div>
  );
}
