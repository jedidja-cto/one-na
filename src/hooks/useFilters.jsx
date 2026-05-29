import { useState } from 'react';
import { BIZ } from '../data/data.js';

export function useFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest');

  const clearRegion = () => setSelectedRegion(null);
  const clearSector = () => setSelectedSector(null);
  const clearSearch = () => setSearchQuery('');
  const clearAll = () => {
    setSearchQuery('');
    setSelectedRegion(null);
    setSelectedSector(null);
    setSortOrder('newest');
  };

  const filtered = BIZ.filter(b => {
    const matchesSearch = searchQuery === '' || 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRegion = selectedRegion === null || b.region === selectedRegion;
    const matchesSector = selectedSector === null || b.sector === selectedSector;
    return matchesSearch && matchesRegion && matchesSector;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'newest') return b.added - a.added;
    if (sortOrder === 'highest') return b.rating - a.rating;
    if (sortOrder === 'az') return a.name.localeCompare(b.name);
    return 0;
  });

  return {
    searchQuery, setSearchQuery,
    selectedRegion, setSelectedRegion,
    selectedSector, setSelectedSector,
    sortOrder, setSortOrder,
    clearRegion, clearSector, clearSearch, clearAll,
    filtered: sorted,
  };
}
