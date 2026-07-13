'use client';

import React from 'react';
import { Thermometer } from 'lucide-react';

interface UnitToggleProps {
  unit: 'metric' | 'imperial';
  onUnitChange: (unit: 'metric' | 'imperial') => void;
}

export const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onUnitChange }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-800">
          <Thermometer className="w-5 h-5 mr-2 text-blue-500" />
          <span className="font-medium">Temperature Unit</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onUnitChange('metric')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              unit === 'metric'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            °C (Metric)
          </button>
          <button
            onClick={() => onUnitChange('imperial')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              unit === 'imperial'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            °F (Imperial)
          </button>
        </div>
      </div>
    </div>
  );
};
