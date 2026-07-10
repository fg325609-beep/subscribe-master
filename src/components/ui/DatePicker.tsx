'use client';

import { cn } from '@/utils/cn';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  className?: string;
  min?: string;
  max?: string;
}

export function DatePicker({
  value,
  onChange,
  label,
  error,
  className,
  min,
  max,
}: DatePickerProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          className={cn(
            'block w-full rounded-lg border px-3 py-2 pl-10 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500',
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500',
            className
          )}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}