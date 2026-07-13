'use client';

import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => Promise<void>;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      await onSearch(searchTerm.trim());
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a city..."
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-3 text-gray-400 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
};
