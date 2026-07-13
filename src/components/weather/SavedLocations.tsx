'use client';

import React from 'react';
import { SavedLocation } from '@/types/weather.types';
import { Trash2, MapPin } from 'lucide-react';

interface SavedLocationsProps {
  locations: SavedLocation[];
  onSelect: (location: SavedLocation) => void;
  onRemove: (id: string) => void;
  currentIndex: number;
}

export const SavedLocations: React.FC<SavedLocationsProps> = ({
  locations,
  onSelect,
  onRemove,
  currentIndex,
}) => {
  if (locations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-blue-500" />
        Saved Locations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {locations.map((location, index) => (
          <div
            key={location.id}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
              index === currentIndex
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-gray-100 border-2 border-transparent hover:bg-gray-200'
            }`}
            onClick={() => onSelect(location)}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{location.name}</p>
              <p className="text-xs text-gray-600">{location.country}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(location.id);
              }}
              className="ml-2 p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
              title="Remove location"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
